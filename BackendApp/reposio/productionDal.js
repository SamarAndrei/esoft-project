const pool = require('../db');
const { redisClient } = require('../redis');

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
    }

    async getAll(offset, limit) {
        const redisKey = `production:${offset}:${limit}`;

        try {
            let production = await redisClient.get(redisKey);
            if (production) {
                return JSON.parse(production);
            }

            const query = pool('production');
            production = await query
                .select('*')
                .from('production')
                .limit(limit)
                .offset(offset);

            if (production) {
                await redisClient.set(redisKey, JSON.stringify(production), {
                    EX: 20,
                });
            }

            return production;
        } catch (err) {
            console.error('Error fetching production', err);
            throw err;
        } finally {
        }
    }

    async getById(prod_id) {
        const redisKey = `product:${prod_id}`;

        try {
            let product = await redisClient.get(redisKey);
            if (product) {
                return JSON.parse(product);
            }

            const query = pool('production');
            product = await query.where('id', prod_id).first();

            if (product) {
                await redisClient.set(
                    redisKey,
                    JSON.stringify(product),
                    'EX',
                    20
                );
            }

            return product;
        } catch (err) {
            console.error('Error fetching prodItem by ID', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }

    async update(prod_id, prodData) {
        try {
            const query = pool('production');
            const prodItem = await query.where('id', prod_id).update({
                prodData,
            });
            return prodItem;
        } catch (err) {
            console.error('Error fetching prodItem by ID', err);
            throw err;
        } finally {
            // await pool.destroy();
        }
    }
}

module.exports = new ProdModel();
