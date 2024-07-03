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
        // const redisKey = `cart:all:${user_id}`;

        try {
            // let cart = await redisClient.get(redisKey);
            // if (cart) {
            //     return JSON.parse(cart);
            // }

            const cart_items = await pool('cart_items').where({ user_id: user_id }).select();
            const prodIds = cart_items.map(item => item.prod_id);

            const cart = await pool('production').whereIn( 'id', prodIds ).select();
            const result = [cart_items, cart]; 
            // if (cart) {
            //     await redisClient.set(redisKey, JSON.stringify(cart), {
            //         EX: 10,
            //     });
            // }

            return result;
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
            await query
                .where({ user_id: user_id, prod_id: prod_id })
                .delete();
        } catch (err) {
            console.error('Error fetching cart_item by ID', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }
}

module.exports = new CartModel();
