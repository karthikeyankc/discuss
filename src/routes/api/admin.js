import express from 'express';
import argon2 from 'argon2';
import { rateLimit } from 'express-rate-limit';
import { renderMarkdown } from '../../lib/render.js';
import defaultDb from '../../db/index.js';
import { authenticateAdmin, generateToken } from '../../middleware/auth.js';

const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many login attempts. Please try again later.' },
});

export function buildAdminRouter(db) {
const router = express.Router();

// --- Auth Routes ---
router.post('/login', loginRateLimit, async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await argon2.verify(admin.password, password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(admin.id);
        db.prepare('UPDATE admins SET last_login = ? WHERE id = ?').run(Date.now(), admin.id);

        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        // JS-readable session indicator — contains no auth material.
        // Lets the frontend show the correct screen without a network round-trip.
        // If spoofed, all API calls still 401 (real auth is the httpOnly JWT above).
        res.cookie('admin_hint', '1', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: 'Logged in successfully', username: admin.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.clearCookie('admin_hint');  // clear indicator too
    res.json({ message: 'Logged out successfully' });
});

// Protect all routes below this middleware
router.use(authenticateAdmin);

// --- Me ---
router.get('/me', (req, res) => {
    try {
        const admin = db.prepare('SELECT id, username FROM admins WHERE id = ?').get(req.adminId);
        if (!admin) return res.status(404).json({ error: 'Not found' });
        res.json({ id: admin.id, username: admin.username });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Stats ---
router.get('/stats', (req, res) => {
    try {
        const stats = db.prepare(`
            SELECT
                COUNT(CASE WHEN c.is_deleted = 0 THEN 1 END)                          AS total_comments,
                COUNT(CASE WHEN c.is_approved = 0 AND c.is_deleted = 0 THEN 1 END)    AS pending_comments,
                COUNT(CASE WHEN c.is_approved = 1 AND c.is_deleted = 0 THEN 1 END)    AS approved_comments
            FROM comments c
            JOIN domains d ON c.domain_id = d.id
            WHERE d.admin_id = ?
        `).get(req.adminId);
        const domainCount = db.prepare('SELECT COUNT(*) AS count FROM domains WHERE admin_id = ?').get(req.adminId);
        res.json({ ...stats, domain_count: domainCount.count });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// --- Domain Management ---
router.get('/domains', (req, res) => {
    try {
        const domains = db.prepare(`
            SELECT d.*,
                COUNT(CASE WHEN c.is_approved = 0 AND c.is_deleted = 0 THEN 1 END) AS pending_count,
                COUNT(CASE WHEN c.is_deleted = 0 THEN 1 END)                        AS total_count
            FROM domains d
            LEFT JOIN comments c ON c.domain_id = d.id
            WHERE d.admin_id = ?
            GROUP BY d.id
        `).all(req.adminId);
        res.json(domains);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch domains' });
    }
});

router.post('/domains', (req, res) => {
    const { domain, site_name, honeypot_question, honeypot_answer } = req.body;
    if (!domain || !site_name) {
        return res.status(400).json({ error: 'Domain and site name are required' });
    }

    try {
        const now = Date.now();
        const info = db.prepare(`
            INSERT INTO domains (domain, site_name, honeypot_question, honeypot_answer, admin_id, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(domain, site_name, honeypot_question, honeypot_answer, req.adminId, now, now);

        res.status(201).json({ id: info.lastInsertRowid, domain, site_name });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Domain already exists' });
        }
        res.status(500).json({ error: 'Failed to add domain' });
    }
});

router.get('/domains/:id', (req, res) => {
    try {
        const domain = db.prepare('SELECT * FROM domains WHERE id = ? AND admin_id = ?').get(req.params.id, req.adminId);
        if (!domain) return res.status(404).json({ error: 'Domain not found or unauthorized' });
        res.json(domain);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch domain' });
    }
});

router.patch('/domains/:id', (req, res) => {
    const { domain, site_name, honeypot_question, primary_color, blocked_words } = req.body;
    if (!domain || !site_name) {
        return res.status(400).json({ error: 'Domain and site name are required' });
    }

    const blockedJson = Array.isArray(blocked_words) && blocked_words.length > 0
        ? JSON.stringify(blocked_words.map(w => w.toLowerCase().trim()).filter(Boolean))
        : null;

    try {
        const now = Date.now();
        const info = db.prepare(`
            UPDATE domains
            SET domain = ?, site_name = ?, honeypot_question = ?, primary_color = ?, blocked_words = ?, updated_at = ?
            WHERE id = ? AND admin_id = ?
        `).run(domain.trim(), site_name.trim(), honeypot_question || null, primary_color || null, blockedJson, now, req.params.id, req.adminId);

        if (info.changes === 0) {
            return res.status(404).json({ error: 'Domain not found or unauthorized' });
        }
        res.json({ message: 'Domain updated successfully' });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Domain already exists' });
        }
        res.status(500).json({ error: 'Failed to update domain' });
    }
});

router.delete('/domains/:id', (req, res) => {
    try {
        const info = db.prepare('DELETE FROM domains WHERE id = ? AND admin_id = ?').run(req.params.id, req.adminId);
        if (info.changes === 0) {
            return res.status(404).json({ error: 'Domain not found or unauthorized' });
        }
        res.json({ message: 'Domain deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete domain' });
    }
});

router.get('/domains/:id/posts', (req, res) => {
    try {
        // Ensure the domain belongs to the admin
        const domain = db.prepare('SELECT id, domain FROM domains WHERE id = ? AND admin_id = ?').get(req.params.id, req.adminId);
        if (!domain) {
            return res.status(404).json({ error: 'Domain not found or unauthorized' });
        }

        const posts = db.prepare(`
            SELECT post_url, count(*) as comment_count, max(created_at) as last_comment_at
            FROM comments
            WHERE domain_id = ? AND is_deleted = 0
            GROUP BY post_url
            ORDER BY last_comment_at DESC
        `).all(domain.id);
        
        res.json({ domain: domain.domain, posts });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// --- Comment Moderation ---
router.get('/comments', (req, res) => {
    const { domain_id, post_url, status } = req.query;
    try {
        let query = `
            SELECT c.*, d.domain
            FROM comments c
            JOIN domains d ON c.domain_id = d.id
            WHERE d.admin_id = ?
        `;
        const params = [req.adminId];

        if (domain_id) { query += ' AND d.id = ?'; params.push(domain_id); }
        if (post_url)   { query += ' AND c.post_url = ?'; params.push(post_url); }

        if (status === 'pending')  query += ' AND c.is_approved = 0 AND c.is_deleted = 0';
        else if (status === 'approved') query += ' AND c.is_approved = 1 AND c.is_deleted = 0';
        else if (status === 'deleted')  query += ' AND c.is_deleted = 1';
        else query += ' AND c.is_deleted = 0'; // default: all non-deleted

        query += ' ORDER BY c.created_at DESC';

        const comments = db.prepare(query).all(...params);
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

router.patch('/comments/:id', (req, res) => {
    const { name, email, content, created_at } = req.body;
    if (!name || !content) {
        return res.status(400).json({ error: 'Name and content are required' });
    }

    try {
        const cleanHtml = renderMarkdown(content);
        const now = Date.now();
        const ts = created_at ? parseInt(created_at) : null;
        const nameVal  = name.trim();
        const emailVal = email ? email.trim() : '';

        let info;
        if (ts) {
            info = db.prepare(`
                UPDATE comments
                SET name = ?, email = ?, content = ?, content_raw = ?, created_at = ?, updated_at = ?
                WHERE id = ? AND domain_id IN (SELECT id FROM domains WHERE admin_id = ?)
            `).run(nameVal, emailVal, cleanHtml, content, ts, now, req.params.id, req.adminId);
        } else {
            info = db.prepare(`
                UPDATE comments
                SET name = ?, email = ?, content = ?, content_raw = ?, updated_at = ?
                WHERE id = ? AND domain_id IN (SELECT id FROM domains WHERE admin_id = ?)
            `).run(nameVal, emailVal, cleanHtml, content, now, req.params.id, req.adminId);
        }

        if (info.changes === 0) return res.status(404).json({ error: 'Comment not found or unauthorized' });
        res.json({ message: 'Comment updated', content: cleanHtml });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update comment' });
    }
});

router.patch('/comments/:id/approve', (req, res) => {
    const { is_approved } = req.body;
    try {
        // Ensure comment belongs to a domain owned by admin
        const info = db.prepare(`
            UPDATE comments 
            SET is_approved = ?, updated_at = ? 
            WHERE id = ? AND domain_id IN (SELECT id FROM domains WHERE admin_id = ?)
        `).run(is_approved ? 1 : 0, Date.now(), req.params.id, req.adminId);

        if (info.changes === 0) {
            return res.status(404).json({ error: 'Comment not found or unauthorized' });
        }
        res.json({ message: 'Comment approval status updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
});

router.patch('/comments/:id/pin', (req, res) => {
    const { is_pinned } = req.body;
    try {
        const info = db.prepare(`
            UPDATE comments 
            SET is_pinned = ?, updated_at = ? 
            WHERE id = ? AND domain_id IN (SELECT id FROM domains WHERE admin_id = ?)
        `).run(is_pinned ? 1 : 0, Date.now(), req.params.id, req.adminId);

        if (info.changes === 0) {
            return res.status(404).json({ error: 'Comment not found or unauthorized' });
        }
        res.json({ message: 'Comment pin status updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
});

router.delete('/comments/:id', (req, res) => {
    try {
        // Soft delete
        const info = db.prepare(`
            UPDATE comments 
            SET is_deleted = 1, updated_at = ? 
            WHERE id = ? AND domain_id IN (SELECT id FROM domains WHERE admin_id = ?)
        `).run(Date.now(), req.params.id, req.adminId);

        if (info.changes === 0) {
            return res.status(404).json({ error: 'Comment not found or unauthorized' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

return router;
}

export default buildAdminRouter(defaultDb);
