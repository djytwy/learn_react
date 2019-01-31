class Home {

    static async home (ctx) {
        const title = 'home'
        await ctx.render('index', {
            title
        })
    }
}

module.exports = Home
