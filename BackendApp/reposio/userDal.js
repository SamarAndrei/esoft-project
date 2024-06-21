const pool = require('../db');

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
            const user = await query.insert(userData);
            return true;
        } catch (err) {
            console.error('Ошибка создания юзера', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    }; 

    async getAll() {
        try {
            const query = pool('users');
            const users = await query.select('*').from('users');
            return users;
        } catch (err) {
            console.error('Error fetching user by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async getById(id) {
        try {
            const query = pool('users');
            const user = await query.where('id', id).first();
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
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Error fetching user by Email', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    }
};

module.exports = new UserModel();