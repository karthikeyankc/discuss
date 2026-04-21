import db from '../db/index.js';

export function dynamicCors(req, res, next) {
    const origin = req.headers.origin;

    // Allow requests with no origin (like mobile apps or curl requests)
    // Or we could strictly require it. For embedded scripts, origin is sent.
    // We also need to allow the admin dashboard to work, which might be same-origin (no origin header or matches host)
    
    if (!origin) {
        return next();
    }

    try {
        const stmt = db.prepare('SELECT id FROM domains WHERE domain = ?');
        // Extract hostname from origin (e.g. https://example.com -> example.com)
        let domainToMatch;
        try {
            const url = new URL(origin);
            domainToMatch = url.hostname;
        } catch(e) {
            domainToMatch = origin;
        }

        const domain = stmt.get(domainToMatch);

        if (domain) {
            res.header('Access-Control-Allow-Origin', origin);
        } else {
            // Optional: allow localhost for testing
            if (domainToMatch === 'localhost' || domainToMatch === '127.0.0.1') {
                res.header('Access-Control-Allow-Origin', origin);
            }
        }
    } catch (err) {
        console.error('CORS DB Error:', err);
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PATCH, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
}
