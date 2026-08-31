/**
 * Paint over room name labels on master floor-plan art (numbers stay).
 * Used when generating evacuation posters.
 */

const LUM_THRESHOLD = 215;

function luminance(data, width, x, y) {
	const i = (y * width + x) * 4;
	return data[i] + data[i + 1] + data[i + 2];
}

function darkRowsInBox(data, width, x0, x1, y0, y1) {
	const rows = [];
	const span = x1 - x0 + 1;
	const innerPad = Math.floor(span * 0.18);
	const ix0 = x0 + innerPad;
	const ix1 = x1 - innerPad;
	for (let y = y0; y <= y1; y++) {
		let dark = 0;
		for (let x = ix0; x <= ix1; x++) {
			if (luminance(data, width, x, y) < LUM_THRESHOLD) dark++;
		}
		// Ignore wall lines — require localized text, not a full-width stroke
		if (dark >= 3 && dark < span * 0.55) rows.push(y);
	}
	return rows;
}

/** @param {number[]} rows */
function clusterRows(rows, gap = 10) {
	if (!rows.length) return [];
	const sorted = [...new Set(rows)].sort((a, b) => a - b);
	const clusters = [[sorted[0]]];
	for (let i = 1; i < sorted.length; i++) {
		const y = sorted[i];
		const last = clusters[clusters.length - 1];
		if (y - last[last.length - 1] <= gap) last.push(y);
		else clusters.push([y]);
	}
	return clusters;
}

/**
 * @param {{ x: number, y: number }} pin
 * @param {string} roomId
 * @param {Uint8Array} data
 * @param {number} width
 * @param {number} height
 */
export function maskRectForRoom(pin, roomId, data, width, height) {
	const padX = 68;
	const padTop = 92;
	const padBottom = 52;
	const x0 = Math.max(0, Math.round(pin.x - padX));
	const x1 = Math.min(width - 1, Math.round(pin.x + padX));
	const y0 = Math.max(0, Math.round(pin.y - padTop));
	const y1 = Math.min(height - 1, Math.round(pin.y + padBottom));

	const rows = darkRowsInBox(data, width, x0, x1, y0, y1);
	const clusters = clusterRows(rows);
	if (!clusters.length) return null;

	const numeric = /^\d+$/.test(roomId);
	let maskTop;
	let maskBottom;

	if (numeric) {
		if (clusters.length >= 2) {
			maskTop = clusters[0][clusters[0].length - 1] + 3;
			maskBottom = clusters[clusters.length - 1][clusters[clusters.length - 1].length - 1] + 4;
		} else if (clusters.length === 1) {
			const only = clusters[0];
			if (only.length <= 18) return null;
			maskTop = only[Math.floor(only.length * 0.42)] + 2;
			maskBottom = only[only.length - 1] + 4;
		} else {
			maskTop = pin.y - 42;
			maskBottom = pin.y + 10;
		}
	} else {
		// Name-only rooms (nursery, foyer, etc.) — blank the label area entirely
		maskTop = pin.y - 58;
		maskBottom = pin.y + 26;
	}

	const h = maskBottom - maskTop;
	if (h < 6) return null;

	return {
		x: x0,
		y: maskTop,
		width: x1 - x0 + 1,
		height: h,
	};
}

export function buildRoomNameMaskRects({ width, height, data, rooms }) {
	const rects = [];
	for (const [roomId, placement] of Object.entries(rooms ?? {})) {
		if (!placement?.pin) continue;
		const rect = maskRectForRoom(placement.pin, roomId, data, width, height);
		if (rect) rects.push(rect);
	}
	return rects;
}

/**
 * @param {{ width: number, height: number, data: Uint8Array, rooms: Record<string, { pin: { x: number, y: number } }> }} opts
 */
export function buildRoomNameMaskSvg(opts) {
	const rects = buildRoomNameMaskRects(opts);
	if (!rects.length) return '';
	const { width, height } = opts;
	const body = rects
		.map(
			(r) =>
				`<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" fill="#ffffff"/>`,
		)
		.join('\n  ');
	return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">\n  ${body}\n</svg>`;
}

/**
 * @param {import('sharp').Sharp} master
 * @param {Record<string, { pin: { x: number, y: number } }>} rooms
 * @param {Array<{ x: number, y: number, width: number, height: number }>} [staticRects]
 */
export async function stripRoomNamesFromMaster(master, rooms, staticRects = []) {
	const { data, info } = await master
		.clone()
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });

	const rects = [
		...buildRoomNameMaskRects({
			width: info.width,
			height: info.height,
			data,
			rooms,
		}),
		...staticRects,
	];

	if (!rects.length) return master;

	const body = rects
		.map(
			(r) =>
				`<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" fill="#ffffff"/>`,
		)
		.join('\n  ');

	const svg = `<svg width="${info.width}" height="${info.height}" xmlns="http://www.w3.org/2000/svg">\n  ${body}\n</svg>`;

	return master.composite([{ input: Buffer.from(svg), top: 0, left: 0 }]);
}
