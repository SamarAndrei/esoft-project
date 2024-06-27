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

class CommModel {

    async create(commData) {
        try {
            const query = pool('comments');
            const comm = await query.insert(commData);
        } catch (err) {
            console.error('Ошибка создания коммента', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    }; 

    async getAll(offset, limit) {
        // const cacheKey = `comments:all:15:${offset}`;
        try {
            // const cachedComms = await red.getAsync(cacheKey);
            // if (cachedComms) {
            //     return JSON.parse(cachedComms);
            // } else {
            const query = pool('comments');
            const comms = await query.select('*').from('comments').limit(limit).offset(offset);
            // await red.setAsync(cacheKey, JSON.stringify(comms), 'EX', 10);
            return comms;
            // }
        } catch (err) {
            console.error('Error fetching comment by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };

    async getById(prod_id) {
        try {
            const query = pool('comments');
            const comms = await query.where('prod_id', prod_id).select();
            return comms;
        } catch (err) {
            console.error('Error fetching comments by ID', err);
            throw err; 
        } finally {
            // await pool.destroy();
        }
    };
};

module.exports = new CommModel();