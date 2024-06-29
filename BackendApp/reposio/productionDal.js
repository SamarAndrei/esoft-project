const pool = require('../db');
// const redis = require('redis');
// const util = require('util');
// const red = require('../redis');


// type User = {
//     user_id: number,
//     name: string,
//     email: string,
//     cart: number[],
//     favourite: number[],
//     registration_date: Date
// };

class ProdModel {

    async create(prodData) {
        try {
            const query = pool('production');
            await query.insert(prodData);
        } catch (err) {
            console.error('Ошибка создания продукта', err);
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
                const query = pool('production');
                const users = await query.select('*').from('production').limit(limit).offset(offset);
                // await red.setAsync(cacheKey, JSON.stringify(users), 'EX', 10);
                return users;
            // }
        } catch (err) {
            console.error('Error fetching production', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async getById(prod_id) {
        try {
            const query = pool('production');
            const prodItem = await query.where('id', prod_id).first();
            return prodItem;
        } catch (err) {
            console.error('Error fetching prodItem by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async update(prod_id, prodData) {
        try {
            const query = pool('production');
            const prodItem = await query.where('id', prod_id).update({
                prodData
            });
            return prodItem;
        } catch (err) {
            console.error('Error fetching prodItem by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };
};

module.exports = new ProdModel();