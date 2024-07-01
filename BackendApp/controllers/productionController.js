const ApiError = require('../exceptions/api_error');

class ProdController {
    constructor(prodService) {
        this.prodService = prodService;
    }

    getAllProd = async (req, res, next) => {
        try {
            const prod = await this.prodService.getAllProd(
                req.body.offset,
                req.body.limit,
            );
            res.status(200).json(prod);
        } catch (e) {
            next(e);
        }
    };

    getProdItemById = async (req, res, next) => {
        try {
            const prod_id = parseInt(req.params.prod_id, 10);
            const prodItem = await this.prodService.getProdItemById(prod_id);

            if (prodItem) {
                res.status(200).json(prodItem);
            } else {
                throw ApiError.NotFound(`Продукт не найден`);
            }
        } catch (e) {
            next(e);
        }
    };

    createProdItem = async (req, res, next) => {
        try {
            const newProdItem = await this.prodService.createProdItem(req.body);
            res.status(200).json(newProdItem);
        } catch (e) {
            next(e);
        }
    };

    updateProdItem = async (req, res, next) => {
        try {
            const prod_id = parseInt(req.params.prod_id, 10);
            const updatedProdItem = await this.prodService.updateProdItem(
                prod_id,
                req.body,
            );

            if (updatedProdItem) {
                res.status(200).json(updatedProdItem);
            } else {
                throw ApiError.NotFound(`Продукт не найден`);
            }
        } catch (e) {
            next(e);
        }
    };
}

module.exports = ProdController;
