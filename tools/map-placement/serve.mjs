#!/usr/bin/env node
/** Serve map placement tool at http://localhost:3456 */
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = join(import.meta.dirname, '../..');
const PORT = 3456;
const OVERLAY_FILE = join(ROOT, 'data/room-map-overlay.json');

const MIME = {
	'.html': 'text/html',
	'.png': 'image/png',
	'.json': 'application/json',
	'.pdf': 'application/pdf',
};

const server = createServer(async (req, res) => {
	try {
		let path = req.url?.split('?')[0] ?? '/';

		if (req.method === 'POST' && path === '/api/overlay') {
			const chunks = [];
			for await (const chunk of req) chunks.push(chunk);
			const overlay = JSON.parse(Buffer.concat(chunks).toString('utf8'));
			await writeFile(OVERLAY_FILE, `${JSON.stringify(overlay, null, 2)}\n`);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(
				JSON.stringify({
					ok: true,
					rooms: Object.keys(overlay.rooms ?? {}).length,
				}),
			);
			return;
		}

		if (path === '/') path = '/tools/map-placement/index.html';
		if (path === '/maps/master-level-1.png') path = '/templates/classroom/maps/master-level-1.png';
		if (path === '/maps/master-level-2.png') path = '/templates/classroom/maps/master-level-2.png';
		if (path === '/data/room-map-overlay.json') path = '/data/room-map-overlay.json';
		if (path === '/data/room-routes.json') path = '/data/room-routes.json';
		if (path === '/scripts/map-label-placement.mjs') path = '/scripts/map-label-placement.mjs';

		const filePath = join(ROOT, path.replace(/^\//, ''));
		const body = await readFile(filePath);
		const ext = extname(filePath);
		res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
		res.end(body);
	} catch {
		res.writeHead(404);
		res.end('Not found');
	}
});

server.listen(PORT, () => {
	console.log(`Map placement tool: http://localhost:${PORT}`);
	console.log('Edits autosave to localStorage + data/room-map-overlay.json');
});
