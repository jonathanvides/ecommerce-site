const express = require('express');
const router = express('router');

const {
    addCartItem,
    fetchAllCarts,
    fetchCartById,
    updateCartItem,
    fetchCartItemsById,
    deleteCartItem,
} = require('../controllers/cart.js');

const { cartCheckout } = require('../controllers/checkout.js');

const {
    isAuthenticatedUser,
    isAuthenticatedAdmin,
} = require('../middleware/authMiddleware.js');

router.get('/', async (req, res, next) => {
    try {
        const carts = await fetchAllCarts();
        res.json(carts);
    } catch (error) {
        next(error);
    }
});

router.get('/users/:id/cart', async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await fetchCartById(id);
        res.json(cart);
    } catch (error) {
        next(error);
    }
});

router.get('/:cart_id/items', async (req, res, next) => {
    try {
        const { cart_id } = req.params;
        const cartItems = await fetchCartItemsById(cart_id);
        res.json(cartItems);
    } catch (error) {
        next(error);
    }
});

router.post('/:cart_id/items', async (req, res, next) => {
    try {
        const { cart_id } = req.params;
        const { product_id, quantity } = req.body;

        const newCartItem = await addCartItem({
            cart_id,
            product_id,
            quantity,
        });
        res.status(201).json(newCartItem);
    } catch (error) {
        next(error);
    }
});

router.put('/items/:id', isAuthenticatedUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const cartItem = await updateCartItem({ id, quantity });
        res.json(cartItem);
    } catch (error) {
        next(error);
    }
});

router.post('/:user_id/carts/:cart_id/checkout', isAuthenticatedUser, async (req, res, next) => {
    try {
        const { user_id, cart_id } = req.params;
        const checkout = await cartCheckout(user_id, cart_id);
        res.status(201).json(checkout);
    } catch (error) {
        console.error('Checkout error:', error);
        next(error);
    }
}
);

router.delete('/items/:id', isAuthenticatedUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteCartItem({ id });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;