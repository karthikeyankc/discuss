import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import argon2 from 'argon2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schema = fs.readFileSync(path.join(__dirname, '../../src/db/schema.sql'), 'utf8');

export function createTestDb() {
    const db = new Database(':memory:');
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.exec(schema);
    return db;
}

export async function seedTestDb(db) {
    const now = Date.now();
    const hash = await argon2.hash('password123');

    const admin = db.prepare(
        'INSERT INTO admins (username, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
    ).run('testadmin', 'admin@test.com', hash, now, now);

    const domain = db.prepare(
        'INSERT INTO domains (domain, site_name, admin_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)'
    ).run('example.com', 'Test Site', admin.lastInsertRowid, now, now);

    return { adminId: admin.lastInsertRowid, domainId: domain.lastInsertRowid };
}
