const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware.ts');

module.exports = (cart_itemsContoller) => {
    const router = express.Router();

    router.post('/users/:user_id/production/:prod_id/cart',authenticateJWT, cart_itemsContoller.addCartItem);
    router.get('/users/:user_id/cart', authenticateJWT, cart_itemsContoller.getCartById);
    router.delete('/users/:user_id/production/:prod_id/cart',authenticateJWT, cart_itemsContoller.deleteCartItem);

    return router;
};
