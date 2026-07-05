#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const zlib = require('zlib');
const path = require('path');

const root  = path.join(__dirname, '..');
const files = ['public/client.js', 'public/client.css'];

function gzipSize(buf) {
    return zlib.gzipSync(buf, { level: 9 }).length;
}

function toKB(n) {
    return (n / 1024).toFixed(2);
}

const rows = files.map(f => {
    const buf  = fs.readFileSync(path.join(root, f));
    return { file: path.basename(f), raw: buf.length, gz: gzipSize(buf) };
});

const totalRaw = rows.reduce((s, r) => s + r.raw, 0);
const totalGz  = rows.reduce((s, r) => s + r.gz, 0);

const col = (s, w) => s.padEnd(w);

console.log('');
console.log('Bundle size');
console.log('─'.repeat(44));
console.log(`${col('File', 14)}${col('Raw', 12)}${col('Gzip', 12)}`);
console.log('─'.repeat(44));
for (const r of rows) {
    console.log(`${col(r.file, 14)}${col(toKB(r.raw) + ' KB', 12)}${col(toKB(r.gz) + ' KB', 12)}`);
}
console.log('─'.repeat(44));
console.log(`${col('Total', 14)}${col(toKB(totalRaw) + ' KB', 12)}${col(toKB(totalGz) + ' KB', 12)}`);
console.log('');
