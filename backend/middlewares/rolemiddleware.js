import dotenv from 'dotenv';
dotenv.config();

export const checkRole = (role) => {
    return async (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });

        }
        next();
    }
}