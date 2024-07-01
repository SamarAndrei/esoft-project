class ProdService {
    constructor(prodModel) {
        this.prodModel = prodModel;
    }

    async createProdItem(prodData) {
        const newProdData = {
            brand: prodData.brand,
            size: prodData.size,
            type: prodData.type,
            description: prodData.description,
            img: prodData.img,
            price: prodData.price,
            stock_quantity: prodData.stock_quantity,
        };
        return this.prodModel.create(newProdData);
    }

    async getAllProd(offset, limit) {
        return this.prodModel.getAll(offset, limit);
    }

    async getProdItemById(prod_id) {
        return this.prodModel.getById(prod_id);
    }

    async updateProdItem(prod_id, prodData) {
        const newProdData = Object.assign(
            {},
            prodData.brand && { brand: prodData.brand },
            prodData.size && { size: prodData.size },
            prodData.type && { type: prodData.type },
            prodData.description && { description: prodData.description },
            prodData.img && { img: prodData.img },
            prodData.price && { price: prodData.price },
            prodData.stock_quantity && {
                stock_quantity: prodData.stock_quantity,
            },
        );
        return this.prodModel.update(prod_id, newProdData);
    }
}

module.exports = ProdService;
