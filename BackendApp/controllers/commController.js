const { validationResult } = require('express-validator')


class CommController {
    constructor(commService) {
        this.commService = commService;
    };

    getAllComms = async (req, res) => {
        try {
            const users = await this.commService.getAllComms(req.body.offset);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    getCommsById = async (req, res) => {
        try {
            const prod_id = parseInt(req.params.prod_id, 10);
            const comms = await this.commService.getCommsById(prod_id);
    
            if (comms) {
                res.status(200).json(comms);
            } else {
                res.status(404).send('Комменты не найдены');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    createComm = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при создании комментария", errors})
            }

            const user_id = parseInt(req.params.user_id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const newComm = await this.commService.createComm(req.body, prod_id, user_id);
            res.status(200).json(newComm);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
}

module.exports = CommController;