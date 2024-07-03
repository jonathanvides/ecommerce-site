const express = require('express');
const router = express('router');

const {
    fetchAllOrders,
    fetchOrdersById,
    fetchOrderDetailsByID,
    updateOrderStatus,
    deleteOrder,
    deleteOrderDetails,
} = require('../controllers/order.js');

const {
    isAuthenticatedUser,
    isAuthenticatedAdmin,
} = require('../middleware/authMiddleware.js');

router.get('/orders', async (req, res, next) => {
    try {
        const orders = await fetchAllOrders();
        if (!orders) {
            return res.status(404).json({ message: 'Order Not Found.' });
        }
        res.json(orders);
    } catch (error) {
        next(error);
    }
});

router.get('/users/:user_id/orders', async (req, res, next) => {
    try {
        const userId = req.params.user_id;
        const userOrders = await fetchOrdersById({ userId });

        if (!userOrders) {
            return res.status(404).json({ message: 'Order Not Found.' });
        }
        res.json(userOrders);
    } catch (error) {
        next(error);
    }
}
);

router.get('/orders/:order_id/items', async (req, res, next) => {
    try {
        const orderId = req.params.order_id;
        const orderDetails = await fetchOrderDetailsByID({ orderId });

        if (!orderDetails) {
            return res.status(404).json({ message: 'Item Not Found.' });
        }
        res.json(orderDetails);
    } catch (error) {
        next(error);
    }
}
);

router.put('/orders/:id', async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const newOrderStatus = req.body;

        const updatedOrder = await updateOrderStatus({
            orderId,
            newOrderStatus,
        });

        res.status(201).json(updatedOrder);
    } catch (error) {
        next(error);
    }
}
);

router.delete('/orders/:id', async (req, res, next) => {
    try {
        const orderId = req.params.id;
        await deleteOrder({ orderId });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

router.delete('/orders/:order_id/items/:item_id', async (req, res, next) => {
        try {
            const orderId = req.params.order_id;
            const itemId = req.params.item_id;

            await deleteOrderDetails({ orderId, itemId });
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;