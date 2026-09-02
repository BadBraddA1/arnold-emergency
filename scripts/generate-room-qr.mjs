#!/usr/bin/env node
/**
 * Generate per-room QR codes → public/qr/rooms/{id}.svg
 * Points to https://emergency.arnoldcoc.org/rooms/{id}/
 */
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = join(import.meta.dirname, '..');
const outDir = join(root, 'public/qr/rooms');
const routes = JSON.parse(await readFile(join(root, 'data/room-routes.json'), 'utf8'));
const base = 'https://emergency.arnoldcoc.org/rooms';

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

let ok = 0;
for (const room of routes.rooms) {
	const url = `${base}/${room.id}/`;
	const out = join(outDir, `${room.id}.svg`);
	const result = spawnSync(
		'npx',
		['--yes', 'qrcode@1.5.4', '-o', out, '-t', 'svg', '-w', '192', '-m', '1', url],
		{ cwd: root, encoding: 'utf8' },
	);
	if (result.status !== 0) {
		console.error(result.stderr || result.stdout);
		process.exit(1);
	}
	ok += 1;
}

console.log(`Generated ${ok} room QR codes → public/qr/rooms/`);
