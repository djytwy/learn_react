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

        const user_msg = await Api.find_user(post_msg,pwd_md5)
        
        if (user_msg) {
            const token = await token_options.creat_token(post_msg.user_name)
            ctx.response.body = { 
                status:'success',
                user:post_msg.user_name,
                token:token
            }
            console.log(`这是用户信息： ${user_msg}`)
        } else {
            ctx.response.body = { status:'fail'}
        }
    }

    // 注册
    static async register(ctx) {
        await koaCors()
        const post_msg = ctx.request.body
        console.log(JSON.stringify(post_msg,null,4))
        const pwd_md5 = utility.md5(post_msg.password)
        let user_msg = await Api.find_user(post_msg,pwd_md5)
        console.log("这是信息：")
        console.log(user_msg)
        if(user_msg)
            ctx.response.body = { status:'fail'}
        else {
            user_msg = await user.create({
                user_name:post_msg.user_name,
                user_pwd:utility.md5(post_msg.password),
                user_age:post_msg.age
            })
            ctx.response.body = user_msg
        }
    }

    // 登出
    static async login_out(ctx) {
        await koaCors()
        if (ctx.request.method === "GET") {
            const token = ctx.query.token
            const user = await token_options.decode_token(token)
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

    static async find_user (post_msg,pwd_md5) {
        const user_msg = await user.findOne({
                user_name:post_msg.user_name,
                user_pwd:pwd_md5
            },
            (err,res) => {
                if(err) 
                    return handleError(err);
                else 
                    console.log(`登录成功：${res}`)
            }
        )
        return user_msg
    }
}

module.exports = Api
