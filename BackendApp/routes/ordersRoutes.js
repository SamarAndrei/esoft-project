const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware.ts');
const authorizeRole = require('../middleware/roleMiddleware.ts');

module.exports = ordersController => {
    const router = express.Router();

    router.post('/orders', authenticateJWT, ordersController.createOrder);
    router.get('/orders', authenticateJWT, ordersController.getAllOrders);
    router.get(
        '/orders/:order_id',
        authenticateJWT,
        ordersController.getOrderById,
    );

    return router;
};
