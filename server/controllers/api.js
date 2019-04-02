const user = require('./../models/user')
const token_options = require('../middlewares/token_options')
const utility = require('utility')

class Api {
    // 登录
    static async login(ctx) {
        if (ctx.request.method === "POST") {
            const post_msg = ctx.request.body
            const reg = /[*&%$#@!()^-=+_]/
            console.log(JSON.stringify(post_msg.user_name,null,4))
            if (!post_msg.password || !post_msg.user_name) 
                ctx.response.body = { status:'fail',message:'账号或密码缺失！'}
            else if(reg.test(post_msg.password) || reg.test(post_msg.user_name)) 
                ctx.response.body = { status:'fail',message:'用户名或密码中包含非法字符！'}
            else {
                const pwd_md5 = utility.md5(post_msg.password),
                    user_msg = await Api._find_user(post_msg,pwd_md5);
                if (user_msg) {
                    const token = await token_options.creat_token(post_msg.user_name)
                    ctx.response.body = { 
                        status:'success',
                        user:post_msg.user_name,
                        token:token
                    }
                    console.log(`这是用户信息： ${user_msg}`)
                } else {
                    ctx.response.body = { status:'fail',message:'账号或密码错误，请确认~'}
                }
            }
        } else {
            ctx.response.status = 403
        }
    }

    // 注册
    static async register(ctx) {
        if (ctx.request.method === "POST") {
            const post_msg = ctx.request.body,
                reg = /[*&%$#@!()^-=+_]/,
                reg_age = /[*&%$#@!()^-=+_a-zA-Z]/

            console.log(JSON.stringify(post_msg,null,4))
            if (!post_msg.password || !post_msg.age || !post_msg.user_name) 
                ctx.response.body = { status:'fail',message:'注册的信息缺失！'}
            else if (reg.test(post_msg.password) || reg.test(post_msg.user_name) || reg_age.test(post_msg.age))
                ctx.response.body = { status:'fail',message:'注册的信息中含有非法字符！'}
            else {
                let user_msg = await Api._find_user(post_msg)
                if(user_msg)
                    ctx.response.body = { status:'fail', message:'用户名已经被注册了！'}
                else {
                    user_msg = await user.create({
                        user_name:post_msg.user_name,
                        user_pwd:utility.md5(post_msg.password),
                        user_age:post_msg.age
                    })
                    ctx.response.body = { status:'success', message:user_msg}
                }
            }   
        } else {
            ctx.response.status = 403
        }
    }

    // 登出
    static async login_out(ctx) {
        if (ctx.request.method === "GET") {
            const token = ctx.query.token,
                user = await token_options.decode_token(token),
                flag = await token_options.del_token(user);

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
        if (ctx.request.method === "GET") {
            ctx.status = 200;
            ctx.body = {
                success : '成功',
                result : 'success'
            }
        } else {
            ctx.request.status = 403
        }
    }

    static async _find_user (post_msg,pwd_md5) {
        let user_msg = ""
        if(pwd_md5) {
            user_msg = await user.findOne({
                    user_name:post_msg.user_name,
                    user_pwd:pwd_md5
                },
                (err,res) => {
                    if(err) 
                        return err;
                    else 
                        console.log(`登录的查询结果：${res} !`)
                }
            )
        } else {
            console.log(post_msg.user_name)
            user_msg = await user.findOne({
                    user_name:post_msg.user_name,
                },
                (err,res) => {
                    if(err) 
                        return err;
                    else 
                        console.log(`查询结果：${res} !`)
                }
            )
        }
        return user_msg
    }

    static async find_user (ctx) {
        if(ctx.request.method === "POST") {
            const msg = await Api._find_user(ctx.request.body)
            if(msg) {
                ctx.response.body = {status:"fail",message:"用户名已经被注册了！"}
            } else {
                ctx.response.body = {status:"success",message:""}
            }
        } else {
            ctx.response.status = 403
        }
    }
}

module.exports = Api
