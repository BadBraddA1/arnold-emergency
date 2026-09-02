/**
 * Room read tracking — views + “I’ve reviewed” acknowledgments.
 * KV binding: ROOM_READS
 * Env: ROOM_STATS_PIN (staff PIN for GET stats)
 */

/** @typedef {{ views: number, acks: number, devices: Record<string, { ack?: boolean, name?: string, lastView?: string, lastAck?: string }>, recentAcks: { name: string, at: string, deviceId: string }[] }} RoomStats */

/**
 * @param {EventContext<{ ROOM_READS: KVNamespace, ROOM_STATS_PIN?: string }, any, Record<string, unknown>>} context
 */
export async function onRequest(context) {
	const { request, env } = context;
	if (request.method === 'OPTIONS') {
		return new Response(null, { status: 204, headers: corsHeaders() });
	}

	if (request.method === 'GET') {
		return handleGet(request, env);
	}
	if (request.method === 'POST') {
		return handlePost(request, env);
	}
	return json({ error: 'Method not allowed' }, 405);
}

/** @param {Request} request @param {{ ROOM_READS: KVNamespace, ROOM_STATS_PIN?: string }} env */
async function handleGet(request, env) {
	const url = new URL(request.url);
	const pin = url.searchParams.get('pin') || request.headers.get('x-room-stats-pin') || '';
	const expected = env.ROOM_STATS_PIN || '';
	if (!expected || pin !== expected) {
		return json({ error: 'Unauthorized' }, 401);
	}

	const list = await env.ROOM_READS.list({ prefix: 'room:' });
	/** @type {Record<string, { views: number, acks: number, recentAcks: { name: string, at: string }[] }>} */
	const rooms = {};
	for (const key of list.keys) {
		const roomId = key.name.slice('room:'.length);
		const raw = await env.ROOM_READS.get(key.name, 'json');
		if (!raw) continue;
		rooms[roomId] = {
			views: raw.views || 0,
			acks: raw.acks || 0,
			recentAcks: (raw.recentAcks || []).slice(0, 12).map((a) => ({
				name: a.name || 'Staff',
				at: a.at,
			})),
		};
	}
	return json({ rooms, updatedAt: new Date().toISOString() });
}

/** @param {Request} request @param {{ ROOM_READS: KVNamespace }} env */
async function handlePost(request, env) {
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON' }, 400);
	}

	const action = body.action === 'ack' ? 'ack' : 'view';
	const roomId = String(body.roomId || '')
		.trim()
		.slice(0, 40);
	const deviceId = String(body.deviceId || '')
		.trim()
		.slice(0, 80);
	const name = String(body.name || '')
		.trim()
		.slice(0, 80);

	if (!roomId || !/^[a-zA-Z0-9_-]+$/.test(roomId)) {
		return json({ error: 'Invalid roomId' }, 400);
	}
	if (!deviceId || deviceId.length < 8) {
		return json({ error: 'Invalid deviceId' }, 400);
	}

	const key = `room:${roomId}`;
	/** @type {RoomStats} */
	const stats = (await env.ROOM_READS.get(key, 'json')) || {
		views: 0,
		acks: 0,
		devices: {},
		recentAcks: [],
	};
	if (!stats.devices) stats.devices = {};
	if (!stats.recentAcks) stats.recentAcks = [];

	const now = new Date().toISOString();
	const device = stats.devices[deviceId] || {};

	if (action === 'view') {
		const already = device.lastView && Date.now() - Date.parse(device.lastView) < 1000 * 60 * 60 * 6;
		if (!already) {
			stats.views += 1;
			device.lastView = now;
			stats.devices[deviceId] = device;
		}
	} else {
		const alreadyAcked = Boolean(device.ack);
		if (!alreadyAcked) {
			stats.acks += 1;
			device.ack = true;
			device.lastAck = now;
			if (name) device.name = name;
			stats.devices[deviceId] = device;
			stats.recentAcks.unshift({
				name: name || 'Staff',
				at: now,
				deviceId,
			});
			stats.recentAcks = stats.recentAcks.slice(0, 40);
		} else if (name && name !== device.name) {
			device.name = name;
			stats.devices[deviceId] = device;
		}
	}

	await env.ROOM_READS.put(key, JSON.stringify(stats));

	return json({
		ok: true,
		roomId,
		views: stats.views,
		acks: stats.acks,
		acked: Boolean(stats.devices[deviceId]?.ack),
	});
}

function corsHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, x-room-stats-pin',
	};
}

/** @param {unknown} data @param {number} [status] */
function json(data, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders(),
		},
	});
}
