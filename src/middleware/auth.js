import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export function authenticateAdmin(req, res, next) {
    const token = req.cookies.admin_token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}

export function generateToken(adminId) {
    return jwt.sign({ id: adminId }, JWT_SECRET, { expiresIn: '1d' });
}
