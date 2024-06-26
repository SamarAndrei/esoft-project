const { validationResult } = require('express-validator');


class UserController {
    constructor(userService) {
        this.userService = userService;
    };

    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers(req.body.offset);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    getUserById = async (req, res) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(userId);
    
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('Пользователь не найден');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    registration = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }

            const newUser = await this.userService.registration(req.body);
            res.status(200).json(newUser);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    login = async (req, res) => {
        try {
            const user = await this.userService.login(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    updateUser = async (req, res) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const updatedUser = await this.userService.updateUser(userId, req.body);
    
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).send('Пользователь не найден');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
}

module.exports = UserController;