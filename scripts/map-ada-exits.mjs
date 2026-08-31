/** ADA-accessible exit IDs — keep in sync with data/room-routes.json adaExits */

export const ADA_EXIT_IDS = ['L1-EAST-UPPER', 'L1-EAST-LOWER', 'L2-WEST-LOWER'];

export const ADA_EXIT_NOTE =
	'Only ADA-accessible exits: Level 1 — east upper and east lower; Level 2 — west lower.';

export function isAdaExit(id) {
	return ADA_EXIT_IDS.includes(id);
}

export function adaExitBadgeSvg(x, y, { below = true } = {}) {
	const ty = below ? y + 42 : y - 8;
	return `<rect x="${x - 22}" y="${ty - 12}" width="44" height="16" rx="4" fill="#7c3aed" opacity="0.95"/>
  <text x="${x}" y="${ty}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="9" font-weight="700" fill="#ffffff">ADA</text>`;
}
