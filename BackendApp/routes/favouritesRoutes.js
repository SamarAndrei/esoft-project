const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware.ts');

module.exports = (favouritesContoller) => {
    const router = express.Router();

    router.post('/users/:user_id/production/:prod_id/favourites',authenticateJWT, favouritesContoller.addFavouriteItem);
    router.get('/users/:user_id/favourites', authenticateJWT, favouritesContoller.getFavouritesById);
    router.delete('/users/:user_id/production/:prod_id/favourites',authenticateJWT, favouritesContoller.deleteFavouriteItem);

    return router;
};