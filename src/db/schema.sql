CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    avatar_url TEXT,
    role TEXT DEFAULT 'admin',
    last_login INTEGER
);

CREATE TABLE IF NOT EXISTS domains (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT UNIQUE NOT NULL,
    site_name TEXT NOT NULL,
    honeypot_question TEXT,
    honeypot_answer TEXT,
    admin_id INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    FOREIGN KEY(admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    avatar TEXT,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    parent_id INTEGER DEFAULT 0,
    permalink TEXT,
    fav_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    post_url TEXT NOT NULL,
    is_spam INTEGER DEFAULT 0,
    is_deleted INTEGER DEFAULT 0,
    is_pinned INTEGER DEFAULT 0,
    is_approved INTEGER DEFAULT 1,
    is_author INTEGER DEFAULT 0,
    domain_id INTEGER NOT NULL,
    FOREIGN KEY(domain_id) REFERENCES domains(id) ON DELETE CASCADE
);
