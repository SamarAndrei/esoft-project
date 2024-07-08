const pool = require('../db');
const { redisClient } = require('../redis');
const ApiError = require('../exceptions/api_error');

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
            console.error('Error creating user', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async createRole(userData) {
        try {
            const query = pool('users');
            await query.insert(userData);
        } catch (err) {
            console.error('Error creating user', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async getAll(offset, limit) {
        const redisKey = `users:${offset}:${limit}`;
        try {
            let users = await redisClient.get(redisKey);
            if (users) {
                return JSON.parse(users);
            }

            const query = pool('users');
            users = await query
                .select('*')
                .from('users')
                .limit(limit)
                .offset(offset);

            if (users) {
                await redisClient.set(redisKey, JSON.stringify(users), {
                    EX: 20,
                });
            }

            return users;
        } catch (err) {
            console.error('Error fetching user by ID', err);
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }

    async getById(id) {
        const redisKey = `user:${id}`;
        try {
            let user = await redisClient.get(redisKey);
            if (user) {
                return JSON.parse(user);
            }

            const query = pool('users');
            user = await query.where('id', id).first();

            if (user) {
                await redisClient.set(redisKey, JSON.stringify(user), {
                    EX: 20,
                });
            }
            return user;
        } catch (err) {
            console.error('Error fetching user by ID', err);
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }

    async update(id, userData) {
        try {
            const query = pool('users');
            const user = await query.where('id', id).update(
                {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                }
            );
            return user;
        } catch (err) {
            console.error('Error fetching user by ID', err);
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }

    async findByEmail(email) {
        try {
            const query = pool('users');
            const user = await query.where('email', email).first();
            return user;
        } catch (err) {
            console.error('Error fetching user by Email', err);
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }
}

module.exports = new UserModel();
