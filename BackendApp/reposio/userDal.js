const pool = require('../db');
// const { getAsync, setAsync } = require('../redis');

// type User = {
//     user_id: number,
//     name: string,
//     email: string,
//     cart: number[],
//     favourite: number[],
//     registration_date: Date
// };



class UserModel {

    async create(userData) {
        try {
            const query = pool('users');
            await query.insert(userData);
        } catch (err) {
            console.error('Ошибка создания юзера', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    }; 

    async createRole(userData) {
        try {
            const query = pool('users');
            const user = await query.insert(userData);
        } catch (err) {
            console.error('Ошибка создания юзера', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    }; 

    async getAll(offset, limit) {
        // const cacheKey = `users:all:15:${offset}`;
        try {
            // const cachedUsers = await red.getAsync(cacheKey);
            // if (cachedUsers) {
                // return JSON.parse(cachedUsers);
            // } else {
                const query = pool('users');
                const users = await query.select('*').from('users').limit(limit).offset(offset);
                // await red.setAsync(cacheKey, JSON.stringify(users), 'EX', 10);
                return users;
            // }
        } catch (err) {
            console.error('Error fetching user by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async getById(id) {
        // const redisKey = `user:${id}`;
        try {
            // let user = await getAsync(redisKey);
            // if (user) {
            //     console.log('User found in Redis cache');
            //     return JSON.parse(user);
            // }

            const query = pool('users');
            const user = await query.where('id', id).first();

            // if (user) {
            //     await setAsync(redisKey, JSON.stringify(user), 'EX', 10);
            // }
            return user;
        } catch (err) {
            console.error('Error fetching user by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async update(id, userData) {
        try {
            const query = pool('users');
            const user = await query.where('id', id).update({
                name: userData.name,
                email: userData.email,
                password: userData.password
            }, ['id', 'name', 'email']);
            return user;
        } catch (err) {
            console.error('Error fetching user by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async findByEmail(email) {
        try {
            const query = pool('users');
            const user = await query.where('email', email).first();
            return user;
        } catch (err) {
            console.error('Error fetching user by Email', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };
};

module.exports = new UserModel();