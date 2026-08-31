#!/usr/bin/env node
/**
 * Generate per-room map poster copy (footer text only — you add the floor plan art).
 *
 * Usage:
 *   pnpm run generate:classroom-map -- --number 107 --name Classroom --assembly "South lot — flagpole"
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
		number: '___',
		name: 'Room',
		assembly: '_[assembly area]_',
		outDir: 'generated/maps',
	};
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--number') out.number = argv[++i] ?? out.number;
		else if (a === '--name') out.name = argv[++i] ?? out.name;
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
	'room-map-poster-body.md',
);
const template = await readFile(templatePath, 'utf8');
const body = template
	.replaceAll('{{ROOM_NUMBER}}', args.number)
	.replaceAll('{{ROOM_NAME}}', args.name)
	.replaceAll('{{ASSEMBLY}}', args.assembly);

await mkdir(args.outDir, { recursive: true });
const file = join(args.outDir, `room-${slug(String(args.number))}-${slug(args.name)}.md`);
await writeFile(file, body, 'utf8');
console.log(`Wrote ${file}`);
