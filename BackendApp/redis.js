const { createClient } = require('redis');
const { promisify } = require('util');

const redisClient = createClient();

module.exports = { redisClient };
