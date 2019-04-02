const redis = require('./../db_con/redisCon')

class Test {
    static async io_test(ctx) {
        const data = await redis.get('test')
        ctx.response.body = data
    }
}

module.exports = Test