/** SVG markers for AED and first aid kits on floor-plan overlays. */

export const MEDICAL_TYPES = {
	aed: { fill: '#059669', stroke: '#047857', tag: 'AED' },
	firstAid: { fill: '#dc2626', stroke: '#b91c1c', tag: 'FA' },
};

function escapeXml(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function shortId(id) {
	return String(id).replace(/^L\d-/, '').replace(/-/g, ' ');
}

/**
 * @param {'aed' | 'firstAid'} type
 * @param {string} id
 * @param {{ x: number, y: number, note?: string }} pt
 */
export function medicalMarkerSvg(type, id, pt, { selected = false } = {}) {
	const style = MEDICAL_TYPES[type];
	const tag = type === 'aed' ? 'AED' : 'FA';
	const w = type === 'aed' ? 40 : 34;
	const h = type === 'aed' ? 26 : 34;
	const x = pt.x - w / 2;
	const y = pt.y - h / 2;
	const note = pt.note?.trim();
	const noteLine = note
		? `<text x="${pt.x}" y="${pt.y + h / 2 + 14}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="9" fill="#334155">${escapeXml(note)}</text>`
		: '';

	if (type === 'firstAid') {
		return `<g opacity="${selected ? 1 : 0.95}">
  <circle cx="${pt.x}" cy="${pt.y}" r="${selected ? 15 : 13}" fill="${style.fill}" stroke="#fff" stroke-width="${selected ? 3 : 2}"/>
  <text x="${pt.x}" y="${pt.y + 4}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="11" font-weight="700" fill="#ffffff">+</text>
  <rect x="${pt.x - 34}" y="${pt.y + 16}" width="68" height="18" rx="4" fill="#7f1d1d" opacity="0.9"/>
  <text x="${pt.x}" y="${pt.y + 29}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="9" font-weight="700" fill="#ffffff">${escapeXml(shortId(id))}</text>
  ${noteLine}
</g>`;
	}

	return `<g opacity="${selected ? 1 : 0.95}">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${style.fill}" stroke="#fff" stroke-width="${selected ? 3 : 2}"/>
  <text x="${pt.x}" y="${pt.y + 5}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="12" font-weight="700" fill="#ffffff">${tag}</text>
  <rect x="${pt.x - 34}" y="${pt.y + 16}" width="68" height="18" rx="4" fill="#064e3b" opacity="0.9"/>
  <text x="${pt.x}" y="${pt.y + 29}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="9" font-weight="700" fill="#ffffff">${escapeXml(shortId(id))}</text>
  ${note ? `<text x="${pt.x}" y="${pt.y + 42}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="9" fill="#334155">${escapeXml(note)}</text>` : ''}
</g>`;
}

/** @param {{ aed?: Record<string, object>, firstAid?: Record<string, object> }} floorData */
export function buildMedicalMarkersSvg(floorData, { showAed = true, showFirstAid = true } = {}) {
	const parts = [];
	if (showAed) {
		for (const [id, pt] of Object.entries(floorData?.aed ?? {})) {
			if (pt?.x == null) continue;
			parts.push(medicalMarkerSvg('aed', id, pt));
		}
	}
	if (showFirstAid) {
		for (const [id, pt] of Object.entries(floorData?.firstAid ?? {})) {
			if (pt?.x == null) continue;
			parts.push(medicalMarkerSvg('firstAid', id, pt));
		}
	}
	return parts.join('\n  ');
}

export function nearestMedical(pin, items) {
	return Object.entries(items ?? {})
		.filter(([, pt]) => pt?.x != null && pt?.y != null)
		.map(([id, pt]) => ({
			id,
			pt,
			dist: Math.hypot(pt.x - pin.x, pt.y - pin.y),
			note: pt.note,
		}))
		.sort((a, b) => a.dist - b.dist)[0];
}
