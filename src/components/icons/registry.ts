/** Site icon ids — rendered via Material Symbols (outlined). */
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
