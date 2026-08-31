/** @param {string} id @param {string} name */
export function formatRoomLabel(id, name) {
	return /^\d+$/.test(id) ? `Room ${id} — ${name}` : name;
}

/** @param {{ id: string, floor: number }} a @param {{ id: string, floor: number }} b */
export function sortRoomsByFloor(a, b) {
	if (a.floor !== b.floor) return a.floor - b.floor;
	const aNum = /^\d+$/.test(a.id);
	const bNum = /^\d+$/.test(b.id);
	if (aNum && bNum) return Number(a.id) - Number(b.id);
	if (aNum) return -1;
	if (bNum) return 1;
	return a.id.localeCompare(b.id);
}
