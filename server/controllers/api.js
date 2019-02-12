const koaCors =  require('koa-cors')
const user = require('./../models/user')
const token_options = require('../middlewares/token_options')
const utility = require('utility')

class Api {
    // 登录
    static async login(ctx) {
        await koaCors()
        const post_msg = ctx.request.body
        console.log(JSON.stringify(post_msg.user_name,null,4))
        const pwd_md5 = utility.md5(post_msg.password)

        const user_flag = await user.findOne({
            user_name:post_msg.user_name,
            user_pwd:pwd_md5
        }, err => {
            if(err) return handleError(err);
        })
        
        if (user_flag) {
            const token = await token_options.creat_token(post_msg.user_name)
            ctx.response.body = { 
                status:'success',
                user:post_msg.user_name,
                token:token
            }
        } else {
            ctx.response.body = { status:'fail'}
        }
    }

    // 注册
    static async register(ctx) {
        await koaCors()
        const post_msg = ctx.request.body
        console.log(JSON.stringify(post_msg,null,4))
        const add_flag = await user.create({
            user_name:post_msg.user_name,
            user_pwd:utility.md5(post_msg.password),
            user_age:post_msg.age
        })
        ctx.response.body = add_flag
    }

    // 登出
    static async login_out(ctx) {
        await koaCors()
        if (ctx.request.method === "GET") {
            const user = ctx.query.user
            const flag = await token_options.del_token(user)
            if(flag) {
                console.log(`这是删除的标志：${flag}`)
                ctx.body = 'success !'
            } else {
                console.log(`退出失败！`)
                ctx.body = 'error !'
            }
        } else {
            ctx.request.status = 403
        }
    }

    // 初始页
    static async init (ctx) {
        ctx.status = 200;
        ctx.body = {
            success : '成功',
            result : 'success'
        }
    }
}

module.exports = Api
