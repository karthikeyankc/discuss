import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize database
const dbPath = path.join(__dirname, '../../discuss.db');
const db = new Database(dbPath);

// Enable WAL mode and foreign keys
db.pragma('journal_mode = WAL');
db.pragma('busy_timeout = 5000');
db.pragma('foreign_keys = ON');

// Initialize schema if not exists
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

// Migrations
try { db.exec('ALTER TABLE domains ADD COLUMN primary_color TEXT'); } catch {}
try { db.exec('ALTER TABLE domains ADD COLUMN blocked_words TEXT'); } catch {}
try { db.exec('ALTER TABLE comments ADD COLUMN content_raw TEXT'); } catch {}
// Backfill: existing rows get content (rendered HTML) as their raw value — not ideal
// but recoverable; any admin edit will replace it with true markdown going forward.
try { db.exec("UPDATE comments SET content_raw = content WHERE content_raw IS NULL"); } catch {}

// Backfill comments that were written before domain_id was wired up (domain_id = 0).
// Assigns them to the first domain in the database so they show up in the admin.
// Safe to run repeatedly — only touches rows where domain_id is 0 or orphaned.
try {
    const firstDomain = db.prepare('SELECT id FROM domains ORDER BY id ASC LIMIT 1').get();
    if (firstDomain) {
        db.prepare(`
            UPDATE comments SET domain_id = ?
            WHERE domain_id = 0
               OR domain_id NOT IN (SELECT id FROM domains)
        `).run(firstDomain.id);
    }
} catch {}

export default db;
