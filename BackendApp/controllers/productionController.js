class ProdController {
    constructor(prodService) {
        this.prodService = prodService;
    };

    getAllProd = async (req, res) => {
        try {
            const prod = await this.prodService.getAllProd(req.body.offset);
            res.status(200).json(prod);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    getProdItemById = async (req, res) => {
        try {
            const prod_id = parseInt(req.params.prod_id, 10);
            const prodItem = await this.prodService.getProdItemById(prod_id);
    
            if (prodItem) {
                res.status(200).json(prodItem);
            } else {
                res.status(404).send('Продукт не найден');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    
    createProdItem = async (req, res) => {
        try {
            const newProdItem = await this.prodService.createProdItem(req.body);
            res.status(200).json(newProdItem);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

   

    updateProdItem = async (req, res) => {
        try {
            const prod_id = parseInt(req.params.prod_id, 10);
            const updatedProdItem = await this.prodService.updateProdItem(prod_id, req.body);
    
            if (updatedProdItem) {
                res.status(200).json(updatedProdItem);
            } else {
                res.status(404).send('Продукт не найден');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
};

module.exports = ProdController;