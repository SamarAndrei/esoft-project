const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_ClIENT });

module.exports = { redisClient };
