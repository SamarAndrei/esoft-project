const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware.ts');

module.exports = (cart_itemsContoller) => {
    const router = express.Router();

    router.post('/production/:prod_id/cart',authenticateJWT, cart_itemsContoller.addCartItem);
    router.get('/cart', authenticateJWT, cart_itemsContoller.getCartById);
    router.delete('/production/:prod_id/cart',authenticateJWT, cart_itemsContoller.deleteCartItem);

    return router;
};
