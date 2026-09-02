/**
 * Room read tracking — name check-in; Alert PIN (System Admin) for stats only.
 * Verifies 6-digit PINs against alarm.arnoldcoc.org (/api/auth/verify).
 *
 * KV: ROOM_READS
 * Env: EMERGENCY_VERIFY_SECRET, ALARM_VERIFY_URL (optional)
 */

/** @typedef {{ views: number, acks: number, devices: Record<string, { ack?: boolean, name?: string, lastView?: string, lastAck?: string }>, recentAcks: { name: string, at: string }[] }} RoomStats */

/**
 * @param {EventContext<{ ROOM_READS: KVNamespace, EMERGENCY_VERIFY_SECRET?: string, ALARM_VERIFY_URL?: string }, any, Record<string, unknown>>} context
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

/** @param {Request} request @param {{ ROOM_READS: KVNamespace, EMERGENCY_VERIFY_SECRET?: string, ALARM_VERIFY_URL?: string }} env */
async function handleGet(request, env) {
	const url = new URL(request.url);
	const pin = (url.searchParams.get('pin') || request.headers.get('x-alert-pin') || '').replace(
		/\D/g,
		'',
	);
	const verified = await verifyAlertPin(env, pin, clientIp(request));
	if (!verified.ok) {
		return json({ error: verified.error || 'Unauthorized' }, verified.status || 401);
	}
	if (!verified.scopes?.includes('admin')) {
		return json({ error: 'System Admin PIN required to view check-in stats.' }, 403);
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
				name: a.name || 'Someone',
				at: a.at,
			})),
		};
	}
	return json({
		rooms,
		viewer: { label: verified.label, scopes: verified.scopes },
		updatedAt: new Date().toISOString(),
	});
}

/** @param {Request} request @param {{ ROOM_READS: KVNamespace, EMERGENCY_VERIFY_SECRET?: string, ALARM_VERIFY_URL?: string }} env */
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

	if (!roomId || !/^[a-zA-Z0-9_-]+$/.test(roomId)) {
		return json({ error: 'Invalid roomId' }, 400);
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

	if (action === 'view') {
		// Anonymous page open — one count per IP bucket every 6 hours.
		const viewKey = `ip:${hashIp(clientIp(request))}`;
		const device = stats.devices[viewKey] || {};
		const already = device.lastView && Date.now() - Date.parse(device.lastView) < 1000 * 60 * 60 * 6;
		if (!already) {
			stats.views += 1;
			device.lastView = now;
			stats.devices[viewKey] = device;
			await env.ROOM_READS.put(key, JSON.stringify(stats));
		}
		return json({ ok: true, roomId, views: stats.views, acks: stats.acks });
	}

	// Check-in: typed name only (no staff PIN).
	const name = String(body.name || '')
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, 60);
	if (name.length < 2) {
		return json({ error: 'Enter your name (at least 2 characters).' }, 400);
	}

	const nameKey = `name:${name.toLowerCase()}`;
	const device = stats.devices[nameKey] || {};
	const alreadyAcked = Boolean(device.ack);
	if (!alreadyAcked) {
		stats.acks += 1;
		device.ack = true;
		device.lastAck = now;
		device.name = name;
		stats.devices[nameKey] = device;
		stats.recentAcks.unshift({ name, at: now });
		stats.recentAcks = stats.recentAcks.slice(0, 40);
	} else {
		device.name = name;
		device.lastAck = now;
		stats.devices[nameKey] = device;
	}

	await env.ROOM_READS.put(key, JSON.stringify(stats));

	return json({
		ok: true,
		roomId,
		views: stats.views,
		acks: stats.acks,
		acked: true,
		label: name,
	});
}

/**
 * @param {{ EMERGENCY_VERIFY_SECRET?: string, ALARM_VERIFY_URL?: string }} env
 * @param {string} pin
 * @param {string} ip
 */
async function verifyAlertPin(env, pin, ip) {
	if (!/^\d{6}$/.test(pin)) {
		return { ok: false, error: 'Enter your 6-digit Arnold Alert PIN.', status: 400 };
	}
	const secret = env.EMERGENCY_VERIFY_SECRET;
	if (!secret) {
		return { ok: false, error: 'PIN verify not configured on this site.', status: 503 };
	}
	const url = env.ALARM_VERIFY_URL || 'https://alarm.arnoldcoc.org/api/auth/verify';
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${secret}`,
				'Content-Type': 'application/json',
				'x-emergency-client-ip': ip,
			},
			body: JSON.stringify({ pin }),
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok) {
			return {
				ok: false,
				error: data.error || 'Incorrect PIN.',
				status: res.status === 429 ? 429 : res.status === 401 ? 401 : 400,
			};
		}
		return {
			ok: true,
			pinId: data.pinId,
			label: data.label,
			scopes: data.scopes || [],
			mustChangePin: !!data.mustChangePin,
		};
	} catch {
		return { ok: false, error: 'Could not reach Arnold Alert to verify PIN.', status: 502 };
	}
}

/** @param {Request} request */
function clientIp(request) {
	return (
		request.headers.get('cf-connecting-ip') ||
		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		'unknown'
	);
}

/** @param {string} ip */
function hashIp(ip) {
	let h = 0;
	for (let i = 0; i < ip.length; i++) h = (h * 31 + ip.charCodeAt(i)) >>> 0;
	return h.toString(36);
}

function corsHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, x-alert-pin',
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
