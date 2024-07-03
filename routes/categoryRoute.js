const express = require('express');
const router = express('router');

const {
    createCategory,
    fetchAllCategories,
    fetchCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/category.js');

const {
    isAuthenticatedUser,
    isAuthenticatedAdmin,
} = require('../middleware/authMiddleware.js');

router.post('/categories', async (req, res, next) => {
    try {
        const { name } = req.body;
        const newCategory = await createCategory({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
});

router.get('/categories', async (req, res, next) => {
    try {
        const categories = await fetchAllCategories();

        if (!categories) {
            return res.status(404).json({ message: 'No categories found.' });
        }

        res.json(categories);
    } catch (error) {
        next(error);
    }
}
);

router.get('/categories/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await fetchCategoryById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        res.json(category);
    } catch (error) {
        next(error);
    }
});

router.put('/categories/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedCategory = await updateCategory({
            id,
            name,
        });
        res.status(200).json(updatedCategory);
    } catch (error) {
        next(error);
    }
}
);

router.delete('/categories/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteCategory({ id });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router; 