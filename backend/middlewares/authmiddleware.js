import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import BaseUser from '../models/BaseUser.js';

export const authenticateToken = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: 'Access Denied: Invalid Token' });

        }

        const user = await BaseUser.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Access Denied: User Not Found' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Access Denied: Invalid Token' });
    }
}