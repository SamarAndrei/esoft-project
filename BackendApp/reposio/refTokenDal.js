const pool = require('../db');


module.exports = new class TokenModel {
    async findById(user_id) {
        try {
            const query = pool('refresh_tokens');
            const token = await query.where({user_id: user_id}).first();
            if (token) {
                return token;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Error fetching token by user_ID', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    };

    async update(tokenData) {
        try {
            const query = pool('refresh_tokens');
            const token = await query.where('id', tokenData.id).update({token:tokenData.refreshToken}, ['token']);
            return token;
        } catch (err) {
            console.error('Error fetching user by user_ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async create(userId, refreshToken) {
        try {
            const query = pool('refresh_tokens');
            const token = await query.insert({user_id: userId, token: refreshToken }, ['token']);
            return token;
        } catch (err) {
            console.error('Ошибка создания рефреш токена', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    }; 

}
