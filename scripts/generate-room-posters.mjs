#!/usr/bin/env node
/**
 * Generate per-room emergency posters with YOU ARE HERE pin + route to nearest exit.
 *
 *   pnpm run map:generate              # all rooms with overlay data
 *   pnpm run map:generate -- --room 107
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import {
	pickPinLabelPlacement,
	pinLabelBadgeSvg,
	pinLabelLeaderSvg,
} from './map-label-placement.mjs';
import { buildMedicalMarkersSvg } from './map-medical-markers.mjs';

const ROOT = join(import.meta.dirname, '..');

function parseArgs(argv) {
	const out = { room: null, outDir: join(ROOT, 'generated/posters') };
	for (let i = 2; i < argv.length; i++) {
		if (argv[i] === '--room') out.room = argv[++i];
		else if (argv[i] === '--out') out.outDir = argv[++i];
	}
	return out;
}

function escapeXml(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function buildOverlaySvg({ width, height, pin, route, exit, exitKey, roomLabel, floorData }) {
	const points = [{ x: pin.x, y: pin.y }, ...route, { x: exit.x, y: exit.y }];
	const poly = points.map((p) => `${p.x},${p.y}`).join(' ');
	const medical = buildMedicalMarkersSvg(floorData);

	const last = points[points.length - 2] ?? pin;
	const dx = exit.x - last.x;
	const dy = exit.y - last.y;
	const len = Math.hypot(dx, dy) || 1;
	const ux = dx / len;
	const uy = dy / len;
	const ax = exit.x - ux * 14;
	const ay = exit.y - uy * 14;
	const px = -uy;
	const py = ux;
	const arrow = `${exit.x},${exit.y} ${ax + px * 8},${ay + py * 8} ${ax - px * 8},${ay - py * 8}`;
	const exitShort = exitKey ? String(exitKey).replace(/^L\d-/, '') : 'EXIT';
	const labelPlacement = pickPinLabelPlacement({
		pin,
		routePoints: points,
		width,
		height,
	});

	return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  ${medical}
  <polyline points="${poly}" fill="none" stroke="#16a34a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>
  <polygon points="${arrow}" fill="#16a34a"/>
  <circle cx="${exit.x}" cy="${exit.y}" r="11" fill="#2563eb" stroke="#fff" stroke-width="2"/>
  <rect x="${exit.x - 58}" y="${exit.y + 12}" width="116" height="22" rx="5" fill="#1e3a5f" opacity="0.92"/>
  <text x="${exit.x}" y="${exit.y + 27}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="11" font-weight="700" fill="#ffffff">${escapeXml(exitShort)}</text>
  ${pinLabelLeaderSvg(pin, labelPlacement)}
  <circle cx="${pin.x}" cy="${pin.y}" r="16" fill="#dc2626" stroke="#fff" stroke-width="3"/>
  <circle cx="${pin.x}" cy="${pin.y}" r="5" fill="#fff"/>
  ${pinLabelBadgeSvg(labelPlacement)}
  <rect x="40" y="118" width="320" height="34" rx="8" fill="#4c1d95" opacity="0.9"/>
  <text x="52" y="141" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="700" fill="#ffffff">${escapeXml(roomLabel)}</text>
</svg>`;
}

const args = parseArgs(process.argv);
const routes = JSON.parse(await readFile(join(ROOT, 'data/room-routes.json'), 'utf8'));
const overlay = JSON.parse(await readFile(join(ROOT, 'data/room-map-overlay.json'), 'utf8'));

const roomMeta = new Map(routes.rooms.map((r) => [r.id, r]));
const toGenerate = args.room
	? [args.room]
	: Object.keys(overlay.rooms);

await mkdir(args.outDir, { recursive: true });

let ok = 0;
let skipped = 0;

for (const roomId of toGenerate) {
	const placement = overlay.rooms[roomId];
	const meta = roomMeta.get(roomId);
	if (!placement) {
		console.warn(`Skip ${roomId}: no pin/route in room-map-overlay.json`);
		skipped++;
		continue;
	}
	if (!meta) {
		console.warn(`Skip ${roomId}: unknown in room-routes.json`);
		skipped++;
		continue;
	}

	const floor = overlay.floors[String(placement.floor)];
	const exitKey = placement.exit ?? meta.nearestExit;
	const exit = floor.exits[exitKey];
	if (!exit) {
		console.warn(`Skip ${roomId}: exit ${exitKey} not found`);
		skipped++;
		continue;
	}

	const masterPath = join(ROOT, floor.master);
	const { width, height } = overlay.imageSize;
	const roomLabel = `Room ${roomId} — ${meta.name}`;
	const svg = buildOverlaySvg({
		width,
		height,
		pin: placement.pin,
		route: placement.route ?? [],
		exit,
		exitKey,
		roomLabel,
		floorData: floor,
	});

	const outFile = join(args.outDir, `room-${roomId}.png`);
	await sharp(masterPath)
		.composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
		.png()
		.toFile(outFile);

	console.log(`Wrote ${outFile}`);
	ok++;
}

console.log(`Done: ${ok} poster(s), ${skipped} skipped.`);
if (skipped && !args.room) {
	console.log('Place pins: pnpm run map:place — then merge JSON into data/room-map-overlay.json');
}
