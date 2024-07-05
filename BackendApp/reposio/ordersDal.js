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
        try {
            const query = pool('orders');
            const orders = await query.where({ user_id: user_id }).select();

            return orders;
        } catch (err) {
            console.error('Error fetching orders', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async getById(order_id) {
        const redisKey = `orderItems:${order_id}`;
        try {
            let orderItems = await redisClient.get(redisKey);
            if (orderItems) {
                return JSON.parse(orderItems);
            }

            orderItems = await pool('order_items as oi')
                .select('oi.*', 'p.*')
                .join('production as p', 'oi.prod_id', 'p.id')
                .where({ order_id: order_id });

            if (orderItems) {
                await redisClient.set(redisKey, JSON.stringify(orderItems), {
                    EX: 10,
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
