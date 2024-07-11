require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenModel = require('../reposio/refTokenDal');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: process.env.SESSION_DURATION,
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {
            expiresIn: process.env.REFRESH_DURATION,
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findById(userId);
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return TokenModel.update(tokenData);
        }
        const token = await TokenModel.create(userId, refreshToken);
        return token;
    }

    async removeToken(refreshToken) {
        await TokenModel.delete(refreshToken);
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.REFRESH_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(user_id) {
        const tokenData = await TokenModel.findById(user_id);
        return tokenData;
    }
}

module.exports = new TokenService();
