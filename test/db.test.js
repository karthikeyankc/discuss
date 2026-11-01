import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import Database from 'better-sqlite3';
import fs from 'fs';
import os from 'os';
import path from 'path';

// src/db/index.js opens its database when imported, so DB_PATH must point at a
// temporary file before the import below.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'discuss-db-'));
const dbPath = path.join(dir, 'discuss.db');
process.env.DB_PATH = dbPath;

// A database whose rows sit only in its -wal file, as a process that exits
// without closing the database leaves it. This connection stays open, so its
// own close can't fold the rows in.
const previousRun = new Database(dbPath);
previousRun.pragma('journal_mode = WAL');
previousRun.exec('CREATE TABLE leftover (id INTEGER PRIMARY KEY)');
previousRun.prepare('INSERT INTO leftover DEFAULT VALUES').run();
assert.ok(fs.statSync(`${dbPath}-wal`).size > 0);

const { default: db } = await import('../src/db/index.js');

after(() => {
    db.close();
    previousRun.close();
    fs.rmSync(dir, { recursive: true, force: true });
});

test('opens the database at DB_PATH', () => {
    assert.equal(db.name, dbPath);
});

test('folds a previous run\'s -wal file into the database file on start', () => {
    assert.equal(fs.statSync(`${dbPath}-wal`).size, 0);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM leftover').get().n, 1);
});
