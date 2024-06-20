const express = require('express');

module.exports = (userContoller) => {
    const router = express.Router();

    router.post('/registration', userContoller.registration);
    router.post('/login', userContoller.login);
    router.get('/users', userContoller.getAllUsers);
    router.get('/users/:id', userContoller.getUserById);
    router.put('/users/:id', userContoller.updateUser);

    return router;
}