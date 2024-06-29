const redis = require('redis');
const util = require('util');

const redis = require('redis');
const util = require('util');

const redisClient = redis.createClient({
    url: 'redis://redis-server:redis@localhost:6379'
});

const getAsync = util.promisify(redisClient.get).bind(redisClient);
const setAsync = util.promisify(redisClient.set).bind(redisClient);

module.exports = {getAsync, setAsync};