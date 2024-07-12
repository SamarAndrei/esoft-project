const pool = require('../db');
const { redisClient } = require('../redis');
const ApiError = require('../exceptions/api_error');

class ProdModel {
    async create(prodData) {
        try {
            const query = pool('production');
            await query.insert(prodData);
        } catch (err) {
            console.error('Error creating production', err);
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }

    async getAll(offset, limit, q, gender, type) {
        const redisKey = `production:${offset}:${limit}:${q}:${gender}:${type}`;

        try {
            let production = await redisClient.get(redisKey);
            if (production) {
                return JSON.parse(production);
            }

            let query = pool('production');

            let productionItems = null;

            if (q && q !== '') {
                query = query
                    .orWhere('brand', 'ilike', `%${q}%`)
                    .orWhere('description', 'ilike', `%${q}%`);
            }

            if (gender && gender !== '') {
                query = query.where('gender', 'ilike', `%${gender}%`);
            }

            if (type && type !== '') {
                query = query.where('type', 'ilike', `%${type}%`);
            }

            let countQuery = query.clone();

            productionItems = await query.limit(limit).offset(offset);

            let totalCount = null;

            totalCount = await countQuery.count('* as total').first();

            const total = totalCount.total;

            const totalPages = Math.ceil(total / limit);

            production = {
                production: productionItems,
                totalPages: totalPages,
            };

            if (production) {
                await redisClient.set(redisKey, JSON.stringify(production), {
                    EX: 20,
                });
            }

            return production;
        } catch (err) {
            ApiError.BadConnectToDB(errors.array());

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

            product = await pool('production').where('id', prod_id).first();

            let comments = [];
            if (product) {
                comments = await pool('comments')
                    .where('prod_id', prod_id)
                    .select();
            }

            if (comments.length > 0 && product) {
                const sum = comments.reduce(
                    (total, comment) => total + comment.rating,
                    0,
                );
                const averageRating = sum / comments.length;
                product.averageRating = averageRating;
            } else {
                if (product) {
                    product.averageRating = 0;
                }
            }

            if (product) {
                await redisClient.set(redisKey, JSON.stringify(product), {
                    EX: 5,
                });
            }

            return product;
        } catch (err) {
            console.error('Error fetching prodItem by ID', err);
            ApiError.BadConnectToDB(errors.array());
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
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }
}

module.exports = new ProdModel();
