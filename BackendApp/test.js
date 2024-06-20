require('dotenv').config();
const knex = require('knex');

(async () => { 
    const pool = knex({
        client: 'pg',
        connection: {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
        },
        pool: { 
            min: parseInt(process.env.DB_MIN),
            max: parseInt(process.env.DB_MAX),
            idleTimeoutMillis: parseInt(process.env.DB_TIMEOUTMILLIS),
        }
    });

    try {
        const query = pool('users');
        const row = await query.where('user_id', '=', 1).first(); // Добавляем .first(), чтобы получить первую строку
        console.log(row);
        console.log('Query executed successfully');
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        await pool.destroy();
        console.log('Pool destroyed');
    }
})();
