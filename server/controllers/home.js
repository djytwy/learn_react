const redis = require('./../db_con/redisCon')


class Home {

    static async home (ctx) {
        const title = 'home'
        await ctx.render('index', {
            title
        })
    }

    static async init (ctx) {
        if (ctx.request.get("Authorization")) {
            const user = ctx.request.get("Authorization")
            const token = await redis.get(`TOKEN:${user}`)
            if (token) {
                ctx.response.body = 'welcome !'
            } else {
                ctx.response.body = 'you need login !'
            }
        } else {
            ctx.response.body = 'you need login !'
        }
    }
}

module.exports = Home
