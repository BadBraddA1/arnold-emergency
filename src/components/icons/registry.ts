/** Custom Arnold Emergency icons — 24×24 viewBox, `currentColor` fill paths. */
export type EmergencyIconId =
	| 'code-red'
	| 'code-blue'
	| 'all-clear'
	| 'horns'
	| 'medical'
	| 'quick-ref'
	| 'roles'
	| 'communication'
	| 'training'
	| 'post-incident'
	| 'approval'
	| 'alert-system'
	| 'terminology'
	| 'triggers'
	| 'classroom'
	| 'contributing'
	| 'overview'
	| 'arm-standby'
	| 'limits'
	| 'naming'
	| 'playbook'
	| 'medical-draft'
	| 'mobile'
	| 'desk'
	| 'fob'
	| 'bell';

export const emergencyIconPaths: Record<EmergencyIconId, string> = {
	'code-red':
		'<path d="M5 4h8a2 2 0 0 1 2 2v3h2.5a1 1 0 0 1 .7 1.7l-4.5 4.2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v13h8v-4.1a1 1 0 0 1 .7-.95l2.3-.77H13V6H5Zm11.3 9.2 2.8-2.6H14v2.6h2.3Z"/><path d="M18.3 3.3a1 1 0 0 1 1.4 0l2 2a1 1 0 0 1-1.4 1.4L19 5.4l-1.3 1.3a1 1 0 0 1-1.4-1.4l2-2Z"/>',
	'code-blue':
		'<path d="M12 2 4 5v6c0 4.4 3.1 8.5 8 9.9 4.9-1.4 8-5.5 8-9.9V5l-8-3Zm0 2.2 6 2.25V11c0 3.2-2.2 6.2-6 7.45C8.2 17.2 6 14.2 6 11V6.45l6-2.25Z"/><path d="M10 10a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1v-1Zm2 0v1h2v-1h-2Zm-2 3v3h6v-3h-6Z"/>',
	'all-clear':
		'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z"/><path d="m16.7 8.7-5.8 5.8-2.2-2.2a1 1 0 0 0-1.4 1.4l3 3a1 1 0 0 0 1.4 0l6.5-6.5a1 1 0 1 0-1.5-1.5Z"/>',
	horns:
		'<path d="M5 9v6h2l4 3V6L7 9H5Zm11.5-.8a1 1 0 0 1 1.4 0 6.5 6.5 0 0 1 0 9.2 1 1 0 0 1-1.4-1.4 4.5 4.5 0 0 0 0-6.4 1 1 0 0 1 0-1.4Zm2.8-2.8a1 1 0 0 1 1.4 0 9.5 9.5 0 0 1 0 13.4 1 1 0 0 1-1.4-1.4 7.5 7.5 0 0 0 0-10.6 1 1 0 0 1 0-1.4Z"/>',
	medical:
		'<path d="M12 2a6 6 0 0 0-6 6v1H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a6 6 0 0 0 12 0v-1h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2V8a6 6 0 0 0-6-6Zm0 2a4 4 0 0 1 4 4v1H8V8a4 4 0 0 1 4-4Zm-4 9v1a4 4 0 0 0 8 0v-1h-1.1a1 1 0 0 1-.9-1V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-.9 1H16v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1Z"/>',
	'quick-ref':
		'<path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v14h10V5H7Zm2 3h6v2H9V8Zm0 4h6v2H9v-2Zm0 4h4v2H9v-2Z"/>',
	roles:
		'<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 19a5 5 0 0 1 10 0v1H3v-1Zm11 1v-1a4 4 0 0 1 3.5-3.97A3.5 3.5 0 0 1 21 19v1h-7Z"/>',
	communication:
		'<path d="M4 8a2 2 0 0 1 2-2h9l3 3v7a2 2 0 0 1-2 2h-1.2l-2.8 2.1a1 1 0 0 1-1.6-.8V18H6a2 2 0 0 1-2-2V8Zm2 0v8h7v2.3l1.5-1.1H15V9h-2V6H6Zm12-1.6V6h-5v2h4v2.4Z"/><path d="M8 10h6v2H8v-2Z"/>',
	training:
		'<path d="M7 4h10v2H7V4Zm-2 4h14v2H5V8Zm2 4h10v2H7v-2Zm-2 4h14v2H5v-2Z"/><path d="M18 10.5 20 12l-2 1.5V10.5Z"/>',
	'post-incident':
		'<path d="M8 3h8l2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v14h8V7h-2V5H8Zm2 4h6v2h-6v-2Zm0 4h6v2h-6v-2Z"/><path d="m10.3 15.7 1.4-1.4 1 1 2.3-2.3 1.4 1.4-3.7 3.7-2.4-2.4Z"/>',
	approval:
		'<path d="M4 5h12v2H4V5Zm0 4h8v2H4V9Zm0 4h5v2H4v-2Zm11.5-6.5 3 3-6 6H9v-3l6-6Zm-1.4 1.4L11 15.4v1.3h1.3l5.1-5.1-1.3-1.3Z"/>',
	'alert-system':
		'<path d="M12 3a1 1 0 0 1 .9.55l7 14A1 1 0 0 1 19 19H5a1 1 0 0 1-.9-1.45l7-14A1 1 0 0 1 12 3Zm0 3.2L7.2 17h9.6L12 6.2ZM11 9h2v4h-2V9Zm0 6h2v2h-2v-2Z"/>',
	terminology:
		'<path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v12h12V6H6Zm2 2h8v2H8V8Zm0 4h8v2H8v-2Zm0 4h5v2H8v-2Z"/><path d="M9 5.5h1v13H9v-13Z"/>',
	triggers:
		'<path d="M8 4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h1v-2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3h2V8a4 4 0 0 0-4-4H8Zm7 7h5l-2 2 2 2h-5v-4Z"/>',
	classroom:
		'<path d="M5 4h14v16H5V4Zm2 2v12h10V6H7Zm2 2h6v2H9V8Zm0 4h4v2H9v-2Z"/><path d="M11 16h2v2h-2v-2Z"/>',
	contributing:
		'<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"/>',
	overview:
		'<path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"/>',
	'arm-standby':
		'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z"/><path d="M9 8h6v2h-2v6H9v-2h2V8H9Z"/>',
	limits:
		'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.54 13.46-1.08 1.08L12 13.08l-2.46 2.46-1.08-1.08L10.92 12 8.46 9.54l1.08-1.08L12 10.92l2.46-2.46 1.08 1.08L13.08 12l2.46 2.46Z"/>',
	naming:
		'<path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-9-5-9 5Zm9-3.2 7 3.89V17H5V7.69l7-3.89ZM9 11h6v2H9v-2Z"/>',
	playbook:
		'<path d="M6 3h9l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm8 1.5V7h2.5L14 4.5ZM8 9h8v2H8V9Zm0 4h8v2H8v-2Zm0 4h5v2H8v-2Z"/>',
	'medical-draft':
		'<path d="M12 3a5 5 0 0 0-5 5v1H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1v1a5 5 0 0 0 10 0v-1h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-1V8a5 5 0 0 0-5-5Zm0 2a3 3 0 0 1 3 3v1H9V8a3 3 0 0 1 3-3Zm-3 8h6v1a3 3 0 0 1-6 0v-1Z"/><path d="M11 2h2v2h-2V2Z" opacity=".55"/>',
	mobile:
		'<path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v14h8V5H8Zm4 15a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"/>',
	desk:
		'<path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9H4V5Zm2 11h12v2H6v-2Zm-1 4h14v2H5v-2Z"/>',
	fob:
		'<path d="M8 3h8a3 3 0 0 1 3 3v5a5 5 0 0 1-5 5 3 3 0 0 1-6 0 5 5 0 0 1-5-5V6a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v5a3 3 0 0 0 6 0V6a1 1 0 0 0-1-1H8Zm3 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>',
	bell:
		'<path d="M12 3a1 1 0 0 1 1 1v.15A5 5 0 0 1 17 9v4l1.7 3.4a1 1 0 0 1-.9 1.45H6.2a1 1 0 0 1-.9-1.45L7 13V9a5 5 0 0 1 4-4.85V4a1 1 0 0 1 1-1Zm0 17a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 20Z"/>',
};

/** Map site paths → icon id for site map and nav helpers. */
export const pathIconMap: Record<string, EmergencyIconId> = {
	'/system/campus-audio/': 'horns',
	'/quick-reference/': 'quick-ref',
	'/terminology/': 'terminology',
	'/codes/overview/': 'overview',
	'/codes/code-red/': 'code-red',
	'/codes/code-blue/': 'code-blue',
	'/codes/all-clear/': 'all-clear',
	'/roles/': 'roles',
	'/triggers/': 'triggers',
	'/medical-emergency/': 'medical-draft',
	'/communication/': 'communication',
	'/training/': 'training',
	'/post-incident/': 'post-incident',
	'/approval/': 'approval',
	'/system/arnold-alert/': 'alert-system',
	'/system/arm-standby/': 'arm-standby',
	'/system/limits/': 'limits',
	'/system/naming/': 'naming',
	'/classroom/handout-template/': 'classroom',
	'/contributing/': 'contributing',
};

/** Glossary term slug → icon (terminology A–Z pages). */
export const termIconMap: Record<string, EmergencyIconId> = {
	'arnold-alert': 'alert-system',
	'arnold-emergency': 'playbook',
	'alert-mobile': 'mobile',
	'alert-desk': 'desk',
	'alert-emergency': 'code-red',
	'alert-bells': 'bell',
	'alert-control': 'triggers',
	'alert-fob-link': 'fob',
	'code-red': 'code-red',
	'code-blue': 'code-blue',
	'all-clear': 'all-clear',
	'medical-emergency': 'medical-draft',
	'alert-codes': 'overview',
	'alert-countdown': 'arm-standby',
	'incident-commander': 'roles',
	'campus-horns': 'horns',
	'campus-audio': 'horns',
	'alert-fobs': 'fob',
	'fob-arm': 'fob',
	'alert-line': 'communication',
	'alert-page': 'alert-system',
	'alert-line-codes': 'code-red',
	'quick-page': 'quick-ref',
	'alert-check': 'approval',
	'alert-notify': 'communication',
	'system-armed': 'arm-standby',
	'system-standby': 'limits',
	'queued-standby': 'arm-standby',
	'code-red-active': 'code-red',
	'code-blue-active': 'code-blue',
	'bell-ringer': 'bell',
	'code-leader': 'roles',
	'system-admin': 'roles',
	'remote-operator': 'mobile',
	'alert-pin': 'fob',
	'desk-activity': 'post-incident',
	'first-bell': 'bell',
	'second-bell': 'bell',
	spokesperson: 'communication',
	'alert-gateway': 'alert-system',
	'system-arm': 'arm-standby',
};

export function iconForTerm(slug: string): EmergencyIconId | undefined {
	return termIconMap[slug];
}

export function iconForPath(href: string): EmergencyIconId | undefined {
	const normalized = href.endsWith('/') ? href : `${href}/`;
	if (pathIconMap[normalized]) return pathIconMap[normalized];
	const termMatch = normalized.match(/^\/terminology\/terms\/([^/]+)\/$/);
	if (termMatch) return iconForTerm(termMatch[1]);
	return undefined;
}
