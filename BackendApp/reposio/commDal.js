const pool = require('../db');
const { redisClient } = require('../redis');
const ApiError = require('../exceptions/api_error');

// type User = {
//     user_id: number,
//     name: string,
//     email: string,
//     cart: number[],
//     favourite: number[],
//     registration_date: Date
// };

class CommModel {
    async create(commData) {
        try {
            const query = pool('comments');
            await query.insert(commData);
        } catch (err) {
            console.error('Error creating comment', err);
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }

    async getAll(offset, limit) {
        const redisKey = `comments:${offset}:${limit}`;

        try {
            let comms = await redisClient.get(redisKey);
            if (comms) {
                return JSON.parse(comms);
            }

            const query = pool('comments');
            comms = await query
                .select('*')
                .from('comments')
                .limit(limit)
                .offset(offset);

            if (comms) {
                await redisClient.set(redisKey, JSON.stringify(comms), {
                    EX: 20,
                });
            }

            return comms;
        } catch (err) {
            console.error('Error fetching comment by ID', err);
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }

    async getById(prod_id) {
        const redisKey = `comments:${prod_id}`;

        try {
            let comms = await redisClient.get(redisKey);
            if (comms) {
                return JSON.parse(comms);
            }

            const query = pool('comments');
            comms = await query.where('prod_id', prod_id).select();

            if (comms) {
                await redisClient.set(redisKey, JSON.stringify(comms), {
                    EX: 10,
                });
            }

            return comms;
        } catch (err) {
            console.error('Error fetching comments by ID', err);
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }

    async deleteCommentForTest(comment) {
        try {
            const query = pool('comments');
            await query.where('comment', comment).delete();
        } catch {
            console.error('Error fetching comment by comment', err);
            ApiError.BadConnectToDB(errors.array());
        }
    }
}

module.exports = new CommModel();
