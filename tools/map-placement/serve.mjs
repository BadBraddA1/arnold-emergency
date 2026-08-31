#!/usr/bin/env node
/** Serve map placement tool at http://localhost:3456 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = join(import.meta.dirname, '../..');
const PORT = 3456;

const MIME = {
	'.html': 'text/html',
	'.png': 'image/png',
	'.json': 'application/json',
	'.pdf': 'application/pdf',
};

const server = createServer(async (req, res) => {
	try {
		let path = req.url?.split('?')[0] ?? '/';
		if (path === '/') path = '/tools/map-placement/index.html';
		if (path === '/maps/master-level-1.png') path = '/templates/classroom/maps/master-level-1.png';
		if (path === '/maps/master-level-2.png') path = '/templates/classroom/maps/master-level-2.png';
		if (path === '/data/room-map-overlay.json') path = '/data/room-map-overlay.json';

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
	console.log('Click pin → route waypoints → save each room → download JSON');
});
