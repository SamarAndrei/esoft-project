const { comment } = require('../db');

class CommService {
    constructor(commModel) {
        this.commModel = commModel;
    }

    async getAllComms(offset, limit) {
        return this.commModel.getAll(offset, limit);
    }

    async getCommsById(prod_id) {
        return this.commModel.getById(prod_id);
    }

    async createComm(commData, prod_id, user_id) {
        const newCommData = {
            user_id: user_id,
            prod_id: prod_id,
            comment: commData.comment,
            rating: commData.rating,
        };
        return this.commModel.create(newCommData);
    }
}

module.exports = CommService;
