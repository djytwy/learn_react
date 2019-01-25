const koaCors =  require('koa-cors')
const user = require('./../models/user')
const create_token = require('./../middlewares/create_token')

class Api {
    // 登录
    static async login (ctx) {
        await koaCors()
        const post_msg = ctx.request.body
        console.log(JSON.stringify(post_msg.user_name,null,4))

        const user_flag = await user.findOne({user_name:post_msg.user_name}, err => {
            if(err) return handleError(err);
        })
        
        if (user_flag) {
            const token = create_token(post_msg.user_name)
            ctx.set("Authorization",post_msg.user_name)
            ctx.response.body = "welcome !!"
        } else {
            ctx.response.body = "bad user !"
        }
    }

    // 注册
    static async register(ctx) {
        await koaCors()
        const post_msg = ctx.request.body
        console.log(JSON.stringify(post_msg,null,4))
        const add_flag = await user.create({
            user_name:post_msg.user_name,
            user_pwd:post_msg.password,
            user_age:post_msg.age
        })
        ctx.body = add_flag
    }
}

module.exports = Api
