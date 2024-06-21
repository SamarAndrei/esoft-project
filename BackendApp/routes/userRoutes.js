const express = require('express');
const { check } = require('express-validator');
const authenticateJWT = require('../middleware/authMiddleware.ts');
const authorizeRole = require('../middleware/roleMiddleware.ts'); /** только для ролей */

module.exports = (userContoller) => {
    const router = express.Router();

    router.post('/registration', [
        check('name', 'Имя не может быть пустым').notEmpty(),
        check('password', "Пароль должен быть больше 8").isLength({min:8})
    ], userContoller.registration);
    router.post('/login', userContoller.login);
    router.get('/users', authorizeRole(['admin']), userContoller.getAllUsers);
    router.get('/users/:id', userContoller.getUserById);
    router.put('/users/:id',authenticateJWT, userContoller.updateUser);

    return router;
}