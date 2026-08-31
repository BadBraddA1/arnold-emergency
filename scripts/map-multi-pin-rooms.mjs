/** Rooms large enough to need a second YOU ARE HERE dot on one poster. */

export const MULTI_PIN_ROOMS = new Set(['fellowship-hall']);

export function extraPinLabel(roomId, index) {
	if (roomId === 'fellowship-hall') {
		return index === 2 ? 'YOU ARE HERE (east)' : 'YOU ARE HERE (west)';
	}
	return index === 2 ? 'YOU ARE HERE (2)' : 'YOU ARE HERE';
}
