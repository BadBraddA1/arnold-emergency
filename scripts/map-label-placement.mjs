/** Pick a YOU ARE HERE label position that clears the evacuation route. */

const LABEL_W = 144;
const LABEL_H = 26;

const CANDIDATES = [
	{ dx: 0, dy: -40 },
	{ dx: 0, dy: 50 },
	{ dx: -102, dy: 0 },
	{ dx: 102, dy: 0 },
	{ dx: -82, dy: -36 },
	{ dx: 82, dy: -36 },
	{ dx: -82, dy: 40 },
	{ dx: 82, dy: 40 },
	{ dx: 0, dy: -64 },
	{ dx: 0, dy: 76 },
	{ dx: -120, dy: -20 },
	{ dx: 120, dy: -20 },
];

export function distPointToSegment(px, py, x1, y1, x2, y2) {
	const dx = x2 - x1;
	const dy = y2 - y1;
	const len2 = dx * dx + dy * dy;
	if (len2 === 0) return Math.hypot(px - x1, py - y1);
	let t = ((px - x1) * dx + (py - y1) * dy) / len2;
	t = Math.max(0, Math.min(1, t));
	return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

export function segmentsFromPoints(points) {
	const segments = [];
	for (let i = 0; i < points.length - 1; i++) {
		segments.push({
			x1: points[i].x,
			y1: points[i].y,
			x2: points[i + 1].x,
			y2: points[i + 1].y,
		});
	}
	return segments;
}

function boxSamplePoints(box) {
	const { x, y, w, h } = box;
	const pts = [];
	for (let i = 0; i <= 4; i++) {
		const t = i / 4;
		pts.push({ x: x + t * w, y });
		pts.push({ x: x + t * w, y: y + h });
		pts.push({ x, y: y + t * h });
		pts.push({ x: x + w, y: y + t * h });
	}
	return pts;
}

function minClearance(box, segments) {
	if (!segments.length) return Infinity;
	let min = Infinity;
	for (const seg of segments) {
		for (const pt of boxSamplePoints(box)) {
			min = Math.min(
				min,
				distPointToSegment(pt.x, pt.y, seg.x1, seg.y1, seg.x2, seg.y2),
			);
		}
	}
	return min;
}

function candidatePlacement(pin, c, labelW, labelH) {
	const cx = pin.x + c.dx;
	const cy = pin.y + c.dy;
	return {
		cx,
		cy,
		dx: c.dx,
		dy: c.dy,
		box: { x: cx - labelW / 2, y: cy - labelH / 2, w: labelW, h: labelH },
	};
}

function inBounds(box, width, height, margin) {
	return (
		box.x >= margin &&
		box.y >= margin &&
		box.x + box.w <= width - margin &&
		box.y + box.h <= height - margin
	);
}

/**
 * @param {{ pin: {x:number,y:number}, routePoints: {x:number,y:number}[], width: number, height: number, labelW?: number, labelH?: number, clearance?: number }}
 */
export function pickPinLabelPlacement({
	pin,
	routePoints,
	width,
	height,
	labelW = LABEL_W,
	labelH = LABEL_H,
	clearance = 16,
}) {
	const segments = segmentsFromPoints(routePoints);
	const margin = 8;
	let best = null;
	let fallback = null;

	for (const c of CANDIDATES) {
		const placement = candidatePlacement(pin, c, labelW, labelH);
		if (!inBounds(placement.box, width, height, margin)) continue;

		const clear = minClearance(placement.box, segments);
		const score = clear - Math.hypot(c.dx, c.dy) * 0.03;
		const entry = { ...placement, clearance: clear, score };

		if (!fallback || clear > fallback.clearance) fallback = entry;
		if (clear >= clearance && (!best || score > best.score)) best = entry;
	}

	if (best) return best;

	if (fallback) return fallback;

	const cx = pin.x;
	const cy = pin.y - 40;
	return {
		cx,
		cy,
		dx: 0,
		dy: -40,
		clearance: 0,
		box: { x: cx - labelW / 2, y: cy - labelH / 2, w: labelW, h: labelH },
	};
}

export function pinLabelLeaderSvg(pin, placement) {
	if (Math.hypot(placement.dx, placement.dy) <= 24) return '';
	return `<line x1="${pin.x}" y1="${pin.y}" x2="${placement.cx}" y2="${placement.cy}" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.75"/>`;
}

export function pinLabelBadgeSvg(placement, { variant = 'poster' } = {}) {
	const { box, cx } = placement;
	const textY = box.y + 18;

	if (variant === 'preview') {
		return `<text x="${cx}" y="${textY}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#111827">YOU ARE HERE</text>`;
	}

	return `<rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" rx="6" fill="#111827" opacity="0.92"/>
  <text x="${cx}" y="${textY}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="700" fill="#ffffff">YOU ARE HERE</text>`;
}
