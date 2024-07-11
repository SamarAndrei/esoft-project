module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static Forbidden() {
        return new ApiError(403, 'У пользователя нет прав');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static BadConnectToDB(errors = []) {
        return new ApiError(400, 'Ошибка связанная с базой данных', errors);
    }

    static NotFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }
};
