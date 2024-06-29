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

class CartModel {

    async create(cartItemData) {
        try {
            const query = pool('cart_items');
            await query.insert(cartItemData);
        } catch (err) {
            console.error('Ошибка добавления в корзину', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    }; 

    async getAll(user_id) {
        // const cacheKey = `users:all:15:${offset}`;
        try {
            // const cachedUsers = await red.getAsync(cacheKey);
            // if (cachedUsers) {
                // return JSON.parse(cachedUsers);
            // } else {
                const query = pool('cart_items');
                const favourites = await query.where({user_id: user_id}).select();
                // await red.setAsync(cacheKey, JSON.stringify(users), 'EX', 10);
                return favourites;
            // }
        } catch (err) {
            console.error('Error fetching cart_items', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async delete(user_id, prod_id ) {
        try {
            const query = pool('cart_items');
            const deletedItem = await query.where({ user_id: user_id, prod_id: prod_id}).delete();
        } catch (err) {
            console.error('Error fetching cart_item by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };
};

module.exports = new CartModel();