const jwt = require('jsonwebtoken')
const redis = require('../db_con/redisCon')
const conf = require('../config')

class TOKEN {
    static async creat_token(user) {
        return new Promise( async (resolve,reject) => {
            const expiresIn = conf.TOKEN.EXPIRESIN
            const token = jwt.sign({
                user:user
            },"koa_twy",{
                expiresIn:expiresIn
            })
            const flag = await redis.set(`TOKEN:${user}`, JSON.stringify(token), 'EX', expiresIn, function(err,res){
                console.log(res)
                if(err) {
                    reject("error !")
                }
            });
            console.log(`token的设置标志: ${flag}, token: ${token}`)
            resolve(token)
        })
    }

    static async del_token(user) {
        return new Promise(async (resolve,reject) => {
            const flag = await redis.del(`TOKEN:${user}`,function(err,res) {
                console.log(`token清除成功 ： ${res} !`)
                if (err) {
                    reject("删除token失败！")
                }
            })
            console.log(`token清除的标志: ${flag}`)
            resolve(flag)
        })
    }

    // check_token作为一个中间件存在
    static async check_token(ctx,next) {
        const authorization = ctx.get('Authorization');
        if (!authorization) {
            ctx.throw(401,'no token detected in http header "Authorization"')
        }
        let tokenContent = ""
        try {
            tokenContent = await jwt.verify(authorization,"koa_twy"); 
            console.log(`用户的token：${JSON.stringify(tokenContent,null,4)}`)
        } catch (err) {
            console.log(err)
            ctx.throw(401,'invalid token')
        } finally{
            const is_expire = await redis.get(`TOKEN:${tokenContent.user}`);
            if(is_expire === null) {
                ctx.throw(401,'token is expire !')
            }
        }
        await next();
    }

    static async decode_token(token) {
        return new Promise( async (resolve,reject) => {
            const decoded = jwt.decode(token)
            if(decoded.hasOwnProperty)
                resolve(decoded.user)
            else
                reject("解码token失败")
        }) 
    }
}

module.exports = TOKEN