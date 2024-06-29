const express = require('express');
const { body } = require('express-validator');
const authenticateJWT = require('../middleware/authMiddleware.ts');
const authorizeRole = require('../middleware/roleMiddleware.ts'); /** только для ролей */

module.exports = (userContoller) => {
    const router = express.Router();

    router.post('/registration', [
        body('name', 'Имя не может быть пустым').notEmpty(),
        body('email', 'Неверный емэйл').isEmail(),
        body('password', "Пароль должен быть больше 8").isLength({min:8})
    ], userContoller.registration);
    router.post('/login', userContoller.login);
    router.get('/logout', userContoller.logout);
    router.get('/refresh', userContoller.refresh);
    router.post('/creatingRole', [
        body('name', 'Имя не может быть пустым').notEmpty(),
        body('password', "Пароль должен быть больше 8").isLength({min:8})
    ], authorizeRole(['admin']), userContoller.createRole);
    router.get('/users', authorizeRole(['admin']), userContoller.getAllUsers);
    router.get('/users/:id', authenticateJWT, userContoller.getUserById);
    router.put('/users/:id', authenticateJWT, userContoller.updateUser);

    return router;
};