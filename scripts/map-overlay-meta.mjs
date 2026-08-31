/** @param {string | undefined} iso */
export function formatMapUpdatedAt(iso) {
	if (!iso) return null;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return null;
	return d.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'America/Chicago',
	});
}

/** @param {string | undefined} iso */
export function formatMapUpdatedAtLong(iso) {
	if (!iso) return null;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return null;
	return d.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		timeZone: 'America/Chicago',
	});
}

/** @param {Record<string, unknown>} overlay */
export function stampOverlay(overlay) {
	overlay.updatedAt = new Date().toISOString();
	return overlay;
}
