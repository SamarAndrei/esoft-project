const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware.ts');

module.exports = (favouritesContoller) => {
    const router = express.Router();

    router.post('/production/:prod_id/favourites',authenticateJWT, favouritesContoller.addFavouriteItem);
    router.get('/favourites', authenticateJWT, favouritesContoller.getFavouritesById);
    router.delete('/production/:prod_id/favourites',authenticateJWT, favouritesContoller.deleteFavouriteItem);

    return router;
};