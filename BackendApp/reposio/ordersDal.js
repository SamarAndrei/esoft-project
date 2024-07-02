const pool = require('../db');
const { redisClient } = require('../redis');


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
            await pool('order_items').insert({
                order_id: order.id,
                ...newOrderItemsData,
            });
        } catch (err) {
            console.error('Ошибка создания заказа', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async getAll(user_id) {
        const redisKey = `orders:${user_id}`;
        try {
            let orders = await redisClient.get(redisKey);
            if (orders) {
                return JSON.parse(orders);
            }

            const query = pool('orders');
            orders = await query.where({ user_id: user_id }).select();

            if (orders) {
                await redisClient.set(redisKey, JSON.stringify(orders), {
                    EX: 20,
                });
            }
            return orders;
        } catch (err) {
            console.error('Error fetching orders', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async getById(user_id) {
        const redisKey = `order:${id}`;

        try {
            let orderItems = await redisClient.get(redisKey);
            if (orderItems) {
                return JSON.parse(orderItems);
            }

            const order = await pool('orders')
                .where({ user_id: user_id, order_id: order_id })
                .first();
            orderItems = await pool('order_items')
                .where({ order_id: order.id })
                .select();

            if (orderItems) {
                await redisClient.set(redisKey, JSON.stringify(orderItems), {
                    EX: 20,
                });
            }

            return orderItems;
        } catch (err) {
            console.error('Error fetching orderItems by ID', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }
}

module.exports = new OrderModel();
