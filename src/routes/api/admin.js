import express from 'express';
import argon2 from 'argon2';
import db from '../../db/index.js';
import { authenticateAdmin, generateToken } from '../../middleware/auth.js';

const router = express.Router();

// --- Auth Routes ---
router.post('/login', async (req, res) => {
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

// --- Domain Management ---
router.get('/domains', (req, res) => {
    try {
        const domains = db.prepare('SELECT * FROM domains WHERE admin_id = ?').all(req.adminId);
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

// --- Comment Moderation ---
router.get('/comments', (req, res) => {
    const { domain_id } = req.query;
    try {
        // Only fetch comments for domains owned by this admin
        let query = `
            SELECT c.*, d.domain 
            FROM comments c
            JOIN domains d ON c.domain_id = d.id
            WHERE d.admin_id = ?
        `;
        const params = [req.adminId];

        if (domain_id) {
            query += ' AND d.id = ?';
            params.push(domain_id);
        }

        query += ' ORDER BY c.created_at DESC LIMIT 100';

        const comments = db.prepare(query).all(...params);
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch comments' });
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

export default router;
