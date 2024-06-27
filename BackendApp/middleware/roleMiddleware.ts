require('dotenv').config();


const authorizeRole = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return next(ApiError.UnauthorizedError()); 
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                console.error('Ошибка при расшифровке токена:', err);
                return next(ApiError.Forbidden());
            }

            req.user = user;

            if (!roles.includes(req.user.role)) {
                return next(ApiError.Forbidden()); 
            }

            next();
        });
    };
};

module.exports = authorizeRole;