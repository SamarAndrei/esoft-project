const express = require('express');
const { body } = require('express-validator');
const authenticateJWT = require('../middleware/authMiddleware.ts');
const authorizeRole = require('../middleware/roleMiddleware.ts');

const validateRating = value => {
    if (value >= 0 && value <= 5) {
        return true;
    }
    return false;
};

module.exports = commController => {
    const router = express.Router();

    router.post(
        '/production/:prod_id/comments',
        [
            body('comment', 'Коммент должен быть больше 25 символов').isLength({
                min: 25,
            }),
            body('rating', 'Рейтинг должен быть от 0 до 5').custom(value =>
                validateRating(value),
            ),
        ],
        authenticateJWT,
        commController.createComm,
    );
    router.get(
        '/comments',
        authorizeRole(['admin']),
        commController.getAllComms,
    );
    router.get('/production/:prod_id/comments', commController.getCommsById);

    return router;
};
