const redis = require('./../db_con/redisCon')


class Home {

    static async home (ctx) {
        const title = 'home'
        await ctx.render('index', {
            title
        })
    }

    static async init (ctx) {
        ctx.status = 200;
        ctx.body = {
            success : '成功',
            result : 'success'
        }
    }
}

module.exports = Home
