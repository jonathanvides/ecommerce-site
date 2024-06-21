const express = require('express');
const router = express('router');

const {
    createUser,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
} = require('../controllers/user.js');

const {
    authenticateUser,
} = require('../controllers/auth.js')

const {
    isAuthenticated,
} = require('../middleware/authMiddleware.js');

router.post('/signup', async (req, res, next) => {
    try {
        const { username, email, password, first_name, last_name, phone_number } = req.body;
        const newUser = await createUser({
            username,
            email,
            password,
            first_name,
            last_name,
            phone_number,
        });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        res.send(await authenticateUser(req.body));
    } catch (error) {
        next(error);
    }
});

router.get('/me', isAuthenticated, async (req, res, next) => {
    try {
        const user = await fetchUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', isAuthenticated, async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await fetchUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found.' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.get('/', isAuthenticated, async (req, res, next) => {
    try {
        const users = await fetchUsers();
        if (!users) {
            return res.status(404).json({ message: 'User Not Found.' });
        }
        res.json(users);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', isAuthenticated, async (req, res, next) => {
    try {
        const { id } = req.params;
        const userNewData = req.body;
        const updatedUser = await updateUser(id, userNewData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User Not Found.' });
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', isAuthenticated, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;