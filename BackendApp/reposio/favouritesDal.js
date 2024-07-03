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

class FavouritesModel {
    async create(favouriteData) {
        try {
            const query = pool('favourites');
            await query.insert(favouriteData);
        } catch (err) {
            console.error('Ошибка добавления в избранное', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async getAll(user_id) {
        // const redisKey = `favourites:all:${user_id}`;

        try {
            // let favourites = await redisClient.get(redisKey);
            // if (favourites) {
            //     return JSON.parse(favourites);
            // }

            const query = pool('favourites');
            const favourites_items = await query.where({ user_id: user_id }).select();
            const prodIds = favourites_items.map(item => item.prod_id);

            const favourites = await pool('production')
                .whereIn('id', prodIds)
                .select();

            // if (favourites) {
            //     await redisClient.set(redisKey, JSON.stringify(favourites), {
            //         EX: 20,
            //     });
            // }
            return favourites;
        } catch (err) {
            console.error('Error fetching favourites', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async delete(user_id, prod_id) {
        try {
            const query = pool('favourites');
            await query
                .where({ user_id: user_id, prod_id: prod_id })
                .delete();
        } catch (err) {
            console.error('Error fetching favouriteItem by ID', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }
}

module.exports = new FavouritesModel();
