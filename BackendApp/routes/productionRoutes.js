const express = require('express');
const authorizeRole = require('../middleware/roleMiddleware.ts'); /** только для ролей */

module.exports = (prodContoller) => {
    const router = express.Router();

    router.post('/production',  authorizeRole(['admin']), prodContoller.createProdItem);
    router.get('/production', prodContoller.getAllProd);
    router.get('/production/:prod_id', prodContoller.getProdItemById);
    router.put('/production/:prod_id',  authorizeRole(['admin']), prodContoller.updateProdItem);

    return router;
};