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

class OrderModel {

    async create(newOrderData, newOrderItemsData) {
        try { 
            const order = await pool('orders').insert(newOrderData);
            await pool('order_items').insert({order_id: order.id, ...newOrderItemsData});
        } catch (err) {
            console.error('Ошибка создания заказа', err);
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
                const query = pool('orders');
                const orders = await query.where({user_id: user_id}).select();
                // await red.setAsync(cacheKey, JSON.stringify(users), 'EX', 10);
                return orders;
            // }
        } catch (err) {
            console.error('Error fetching orders', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async getById(user_id) {
        try {
            const order = await pool('orders').where({user_id: user_id, order_id: order_id}).first();
            const orderItems = await pool('order_items').where({order_id: order.id}).select();
            return orderItems;
        } catch (err) {
            console.error('Error fetching orderItems by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };
};

module.exports = new OrderModel();