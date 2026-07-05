import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { resolve, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
};

const server = createServer((req, res) => {
    const url = req.url.split('?')[0];

    if (url === '/health') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('ok');
        return;
    }

    if (url === '/api/comments/config') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ primary_color: null, honeypot_question: null }));
        return;
    }

    if (url === '/api/comments' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([]));
        return;
    }

    const filePath = resolve(root, '.' + url);
    if (existsSync(filePath) && !filePath.includes('..') && statSync(filePath).isFile()) {
        const mime = MIME[extname(filePath)] ?? 'text/plain';
        res.writeHead(200, { 'Content-Type': mime });
        res.end(readFileSync(filePath));
        return;
    }

    res.writeHead(404);
    res.end('Not found');
});

server.listen(9876, '127.0.0.1', () => process.stdout.write('Browser test server ready on 9876\n'));
