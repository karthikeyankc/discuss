import defaultDb from '../db/index.js';

export function buildCorsMiddleware(db) {
    return function dynamicCors(req, res, next) {
        const origin = req.headers.origin;

        if (!origin) {
            return next();
        }

        try {
            let hostname;
            try {
                hostname = new URL(origin).hostname;
            } catch {
                hostname = origin;
            }

            const domain = db.prepare('SELECT allowed_origins FROM domains WHERE domain = ?').get(hostname);

            if (domain) {
                res.header('Access-Control-Allow-Origin', origin);
            } else {
                const extra = db.prepare('SELECT allowed_origins FROM domains WHERE allowed_origins IS NOT NULL').all();
                const allowed = extra.some(row =>
                    row.allowed_origins.split('\n').map(s => s.trim()).filter(Boolean).includes(origin)
                );
                if (allowed) res.header('Access-Control-Allow-Origin', origin);
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
    };
}

export const dynamicCors = buildCorsMiddleware(defaultDb);
