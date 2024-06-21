import dotenv from "dotenv";
dotenv.config();

const { findUserByToken } = require('../controllers/auth.js');

const isAuthenticated = async (req, res, next) => {
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

module.exports = {
    isAuthenticated,
};