const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware.ts');
const authorizeRole = require('../middleware/roleMiddleware.ts'); /** только для ролей */

module.exports = ordersContoller => {
    const router = express.Router();

    router.post('/orders', authenticateJWT, ordersContoller.createOrder);
    router.get('/orders', authenticateJWT, ordersContoller.getAllOrders);
    router.get(
        '/orders/order_id',
        authenticateJWT,
        ordersContoller.getOrderById,
    ); //и вернуть заказ о отсортировать order_items по order_id

    return router;
};
