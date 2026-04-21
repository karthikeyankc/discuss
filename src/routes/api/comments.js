import express from 'express';
import db from '../../db/index.js';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';

const router = express.Router();
const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
});

// Helper to get domain by origin or return error
function getDomainOrError(req, res) {
    const origin = req.headers.origin;
    if (!origin) {
        return null; // Local testing might not have origin, but in production we want it.
    }
    
    let domainToMatch;
    try {
        const url = new URL(origin);
        domainToMatch = url.hostname;
    } catch(e) {
        domainToMatch = origin;
    }
    
    const domain = db.prepare('SELECT * FROM domains WHERE domain = ?').get(domainToMatch);
    return domain || null;
}

// Generate Gravatar URL
function getGravatarUrl(email) {
    const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

router.get('/', (req, res) => {
    const { post_url } = req.query;
    if (!post_url) {
        return res.status(400).json({ error: 'post_url is required' });
    }

    // In a strict setup, we should filter by domain too.
    // For now, we'll fetch approved comments for the post_url that are not deleted.
    try {
        const comments = db.prepare(`
            SELECT id, name, avatar, content, created_at, parent_id, fav_count, reply_count, is_pinned, is_author 
            FROM comments 
            WHERE post_url = ? AND is_approved = 1 AND is_deleted = 0
            ORDER BY is_pinned DESC, created_at ASC
        `).all(post_url);

        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

router.post('/', (req, res) => {
    const { name, email, content, post_url, parent_id, honeypot_answer_given, honeypot_field } = req.body;

    if (!name || !email || !content || !post_url) {
        return res.status(400).json({ error: 'Name, email, content, and post_url are required' });
    }

    // Simple Honeypot: A hidden field that bots might fill
    if (honeypot_field) {
        return res.status(400).json({ error: 'Spam detected' });
    }

    // Domain validation
    const domain = getDomainOrError(req, res);
    if (!domain) {
        // If testing locally without origin, we can skip or block. Let's block if no domain matched, 
        // unless they pass a specific header for testing? Let's just use localhost in domains table.
        return res.status(403).json({ error: 'Unauthorized domain' });
    }

    // Custom Honeypot Question check (acts as a honeypot, shouldn't be filled by human)
    if (domain.honeypot_question) {
        const given = honeypot_answer_given || '';
        if (given.trim() !== '') {
            return res.status(400).json({ error: 'Spam detected' });
        }
    }

    try {
        // Render markdown and sanitize
        const rawHtml = md.render(content);
        const cleanHtml = sanitizeHtml(rawHtml, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'code', 'pre' ],
            allowedAttributes: {
                'a': [ 'href' ]
            }
        });

        const avatar = getGravatarUrl(email);
        const now = Date.now();
        const pId = parent_id ? parseInt(parent_id) : 0;

        const info = db.prepare(`
            INSERT INTO comments (name, email, avatar, content, created_at, updated_at, parent_id, post_url, domain_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(name, email, avatar, cleanHtml, now, now, pId, post_url, domain.id);

        // If parent_id, update reply count
        if (pId > 0) {
            db.prepare('UPDATE comments SET reply_count = reply_count + 1 WHERE id = ?').run(pId);
        }

        res.status(201).json({ message: 'Comment posted successfully', id: info.lastInsertRowid });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to post comment' });
    }
});

// Needs a route to get the honeypot question for the domain
router.get('/config', (req, res) => {
    const domain = getDomainOrError(req, res);
    if (!domain) {
        return res.status(403).json({ error: 'Unauthorized domain' });
    }

    res.json({
        honeypot_question: domain.honeypot_question || null
    });
});

export default router;
