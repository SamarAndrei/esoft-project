require('dotenv').config();
const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return next(ApiError.Forbidden());
            }

            req.user = user;
            next();
        });
    } else {
        return next(ApiError.UnauthorizedError());
    }
};

module.exports = authenticateJWT;