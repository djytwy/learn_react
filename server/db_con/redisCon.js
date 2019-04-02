const Redis = require('ioredis')
const conf = require('./../config')

const redis = new Redis(conf.REDIS.PORT,conf.REDIS.DB_URL);

module.exports = redis;