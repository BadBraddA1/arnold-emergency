#!/usr/bin/env node
/**
 * Generate a per-room classroom handout from the template.
 *
 * Usage:
 *   pnpm run generate:classroom -- --room "Room 101" --exit "..." --assembly "..."
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

function slug(s) {
	return s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
		.slice(0, 48);
}

function parseArgs(argv) {
	const out = {
		room: 'Room ___',
		exit: '_[primary exit route]_',
		assembly: '_[assembly area]_',
		outDir: 'generated',
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--room') out.room = argv[++i] ?? out.room;
		else if (a === '--exit') out.exit = argv[++i] ?? out.exit;
		else if (a === '--assembly') out.assembly = argv[++i] ?? out.assembly;
		else if (a === '--out') out.outDir = argv[++i] ?? out.outDir;
	}
	return out;
}

const args = parseArgs(process.argv);
const templatePath = join(
	import.meta.dirname,
	'..',
	'templates',
	'classroom',
	'handout.md',
);
const template = await readFile(templatePath, 'utf8');
const body = template
	.replaceAll('{{ROOM}}', args.room)
	.replaceAll('{{EXIT}}', args.exit)
	.replaceAll('{{ASSEMBLY}}', args.assembly);

await mkdir(args.outDir, { recursive: true });
const file = join(args.outDir, `${slug(args.room) || 'room'}.md`);
await writeFile(file, body, 'utf8');
console.log(`Wrote ${file}`);
