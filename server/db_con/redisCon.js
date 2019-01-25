const Redis = require('ioredis');
const conf = require('./../config')

redis = new Redis(conf.REDIS.PORT,conf.REDIS.DB_URL);

module.exports = redis;