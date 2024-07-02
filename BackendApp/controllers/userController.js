const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api_error');

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    getAllUsers = async (req, res, next) => {
        try {
            const users = await this.userService.getAllUsers(
                req.body.offset,
                req.body.limit,
            );
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    };

    getUserById = async (req, res, next) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(userId);

            if (user) {
                res.status(200).json(user);
            } else {
                throw ApiError.NotFound(`Пользователь не найден`);
            }
        } catch (e) {
            next(e);
        }
    };

    registration = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errors.array()),
                );
            }

            const tokens = await this.userService.registration(req.body);
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.status(200).json(tokens);
        } catch (e) {
            next(e);
        }
    };

    createRole = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errors.array()),
                );
            }

            const newUser = await this.userService.createRole(req.body);
            res.status(200).json('Успешная регистрация');
        } catch (e) {
            next(e);
        }
    };

    login = async (req, res, next) => {
        try {
            const tokens = await this.userService.login(req.body);
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.status(200).json(tokens);
        } catch (e) {
            next(e);
        }
    };

    logout = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const token = await this.userService.logout(refreshToken);
            res.clearCookie('refreshToken');

            res.status(200).json(`Успешный выход`);
        } catch (e) {
            next(e);
        }
    };

    refresh = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const tokens = await this.userService.refresh(refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.status(200).json(tokens);
        } catch (e) {
            next(e);
        }
    };

    updateUser = async (req, res, next) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const updatedUser = await this.userService.updateUser(
                userId,
                req.body,
            );

            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                throw ApiError.NotFound(`Пользователь не найден`);
            }
        } catch (e) {
            next(e);
        }
    };
}

module.exports = UserController;
