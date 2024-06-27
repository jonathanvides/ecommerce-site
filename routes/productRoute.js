const express = require('express');
const router = express('router');

const {
    createProduct,
    fetchProducts,
    fetchProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/product.js');

const {
    isAuthenticatedAdmin,
} = require('../middleware/authMiddleware.js');

router.post('/', isAuthenticatedAdmin, async (req, res, next) => {
    try {
        const { name, description, quantity, price, image, category_id } = req.body;
        const admin_id = req.admin.id;
        const newProduct = await createProduct({
            name,
            description,
            quantity,
            price,
            image,
            category_id,
            admin_id,
        });
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
}
);

router.get('/', async (req, res, next) => {
    try {
        const product = await fetchProducts();
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await fetchProductById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', isAuthenticatedAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, quantity, price, image, category_id } = req.body;
        const admin_id = req.admin.id;
        const updatedProduct = await updateProduct({
            id,
            name,
            description,
            quantity,
            price,
            image,
            category_id,
            admin_id,
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
}
);

router.delete('/:id', isAuthenticatedAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteProduct({ id });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;