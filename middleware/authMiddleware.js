import dotenv from "dotenv";
dotenv.config();

const { findUserByToken, findAdminByToken } = require('../controllers/auth.js');

const isAuthenticatedUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error('Not Authorized.');
        }
        const token = req.headers.authorization.split(' ')[1];
        const user = await findUserByToken(token);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not Authorized.' });
    }
};

const isAuthenticatedAdmin = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error('Not Authorized.');
        }
        const token = req.headers.authorization.split(' ')[1];
        const user = await findAdminByToken(token);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not Authorized.' });
    }
};

module.exports = {
    isAuthenticatedUser,
    isAuthenticatedAdmin,
};