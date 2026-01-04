import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'ADMIN_DASHBOARD_SECRET_KEY';

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

export const generateToken = (payload, JWT_EXPIRES_IN) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
}