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
        try {
            const query = pool('favourites');
            const favourites_items = await query.where({ user_id: user_id }).select();
            const prodIds = favourites_items.map(item => item.prod_id);

            const favourites = await pool('production')
                .whereIn('id', prodIds)
                .select();

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
