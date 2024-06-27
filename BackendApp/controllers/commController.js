const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api_error');

class CommController {
    constructor(commService) {
        this.commService = commService;
    };

    getAllComms = async (req, res, next) => {
        try {
            const users = await this.commService.getAllComms(req.body.offset, req.body.limit);
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    };
    
    getCommsById = async (req, res, next) => {
        try {
            const prod_id = parseInt(req.params.prod_id, 10);
            const comms = await this.commService.getCommsById(prod_id);
    
            if (comms) {
                res.status(200).json(comms);
            } else {
                throw ApiError.NotFound(`Комментарии не найдены`);                
            }
        } catch (e) {
            next(e);
        }
    };
    
    createComm = async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }

            const user_id = parseInt(req.user.id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const newComm = await this.commService.createComm(req.body, prod_id, user_id);
            res.status(200).json(newComm);
        } catch (e) {
            next(e);
        }
    };
}

module.exports = CommController;