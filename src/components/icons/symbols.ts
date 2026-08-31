import type { EmergencyIconId } from './registry';

/** Material Symbols (outlined) — same set as creatorsrepo.com/icons?system=material */
export const iconToSymbol: Record<EmergencyIconId, string> = {
	'code-red': 'local_fire_department',
	'code-blue': 'shield',
	'all-clear': 'check_circle',
	horns: 'volume_up',
	medical: 'medical_services',
	'quick-ref': 'list_alt',
	roles: 'groups',
	communication: 'forum',
	training: 'school',
	'post-incident': 'fact_check',
	approval: 'task_alt',
	'alert-system': 'warning',
	terminology: 'menu_book',
	triggers: 'bolt',
	classroom: 'school',
	contributing: 'edit',
	overview: 'dashboard',
	'arm-standby': 'pause_circle',
	limits: 'block',
	naming: 'label',
	playbook: 'description',
	'medical-draft': 'medical_information',
	mobile: 'mobile',
	desk: 'desktop_windows',
	fob: 'key',
	bell: 'notifications',
};

import block from '@material-symbols/svg-400/outlined/block.svg?raw';
import bolt from '@material-symbols/svg-400/outlined/bolt.svg?raw';
import checkCircle from '@material-symbols/svg-400/outlined/check_circle.svg?raw';
import dashboard from '@material-symbols/svg-400/outlined/dashboard.svg?raw';
import description from '@material-symbols/svg-400/outlined/description.svg?raw';
import desktopWindows from '@material-symbols/svg-400/outlined/desktop_windows.svg?raw';
import edit from '@material-symbols/svg-400/outlined/edit.svg?raw';
import factCheck from '@material-symbols/svg-400/outlined/fact_check.svg?raw';
import forum from '@material-symbols/svg-400/outlined/forum.svg?raw';
import groups from '@material-symbols/svg-400/outlined/groups.svg?raw';
import key from '@material-symbols/svg-400/outlined/key.svg?raw';
import label from '@material-symbols/svg-400/outlined/label.svg?raw';
import listAlt from '@material-symbols/svg-400/outlined/list_alt.svg?raw';
import localFireDepartment from '@material-symbols/svg-400/outlined/local_fire_department.svg?raw';
import medicalInformation from '@material-symbols/svg-400/outlined/medical_information.svg?raw';
import medicalServices from '@material-symbols/svg-400/outlined/medical_services.svg?raw';
import menuBook from '@material-symbols/svg-400/outlined/menu_book.svg?raw';
import mobile from '@material-symbols/svg-400/outlined/mobile.svg?raw';
import notifications from '@material-symbols/svg-400/outlined/notifications.svg?raw';
import pauseCircle from '@material-symbols/svg-400/outlined/pause_circle.svg?raw';
import school from '@material-symbols/svg-400/outlined/school.svg?raw';
import shield from '@material-symbols/svg-400/outlined/shield.svg?raw';
import taskAlt from '@material-symbols/svg-400/outlined/task_alt.svg?raw';
import volumeUp from '@material-symbols/svg-400/outlined/volume_up.svg?raw';
import warning from '@material-symbols/svg-400/outlined/warning.svg?raw';

export const symbolSvg: Record<string, string> = {
	block,
	bolt,
	check_circle: checkCircle,
	dashboard,
	description,
	desktop_windows: desktopWindows,
	edit,
	fact_check: factCheck,
	forum,
	groups,
	key,
	label,
	list_alt: listAlt,
	local_fire_department: localFireDepartment,
	medical_information: medicalInformation,
	medical_services: medicalServices,
	menu_book: menuBook,
	mobile,
	notifications,
	pause_circle: pauseCircle,
	school,
	shield,
	task_alt: taskAlt,
	volume_up: volumeUp,
	warning,
};

export function parseMaterialSvg(raw: string): { viewBox: string; inner: string } {
	const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1] ?? '0 -960 960 960';
	const inner = raw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
	return { viewBox, inner };
}
