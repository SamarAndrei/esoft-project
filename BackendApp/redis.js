const redis = require('redis');
const util = require('util');

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    connection_name: 'redis-server',
});

const getAsync = util.promisify(redisClient.get).bind(redisClient);
const setAsync = util.promisify(redisClient.set).bind(redisClient);

module.exports = {getAsync, setAsync};