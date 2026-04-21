import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dynamicCors } from './middleware/cors.js';

// Route imports
import commentsRoutes from './routes/api/comments.js';
import adminRoutes from './routes/api/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers middleware (replacing helmet)
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.removeHeader('X-Powered-By');
    next();
});

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dynamic CORS for API routes
app.use('/api', dynamicCors);

// Cache control for GET requests (can be refined per route if needed)
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api/')) {
        // Apply cache control mostly for public reads and static files
        res.setHeader('Cache-Control', 'public, max-age=60');
    } else if (req.method === 'GET' && req.path.startsWith('/api/')) {
        // Prevent caching for API routes to ensure fresh comments
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }
    next();
});

// API Routes
app.use('/api/comments', commentsRoutes);
app.use('/api/admin', adminRoutes);

// SPA entry-point: intercept admin routes before static files to handle SPA paths
app.use('/admin', (req, res, next) => {
    // If request is for a file (contains a dot), skip to static middleware
    if (req.url.includes('.')) return next();
    
    const adminIndex = path.join(__dirname, '../public/admin/index.html');
    res.setHeader('Cache-Control', 'no-store');
    res.sendFile(adminIndex, (err) => {
        if (err) {
            console.error('Error sending admin index:', err);
            next();
        }
    });
});

// Static files
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log(`Discuss server running on http://localhost:${PORT}`);
});
