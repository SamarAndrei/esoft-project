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

class CartModel {
    async create(cartItemData) {
        try {
            const existingItem = await pool('cart_items')
                .where({
                    prod_id: cartItemData.prod_id,
                })
                .first();
            if (existingItem) {
                await pool('cart_items')
                    .where({
                        prod_id: cartItemData.prod_id,
                    })
                    .update({
                        quantity: existingItem.quantity + 1,
                    });
            } else {
                const query = pool('cart_items');
                await query.insert(cartItemData);
            }
        } catch (err) {
            console.error('Ошибка добавления в корзину', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async getAll(user_id) {
        try {
            const cart = await pool('production as p')
                .select('p.*', 'ci.quantity')
                .join('cart_items as ci', 'p.id', 'ci.prod_id')
                .where('ci.user_id', user_id);

            return cart;
        } catch (err) {
            console.error('Error fetching cart_items', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async delete(user_id, prod_id) {
        try {
            const query = pool('cart_items');
            await query.where({ user_id: user_id, prod_id: prod_id }).delete();
        } catch (err) {
            console.error('Error fetching cart_item by ID', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }
}

module.exports = new CartModel();
