const jwt = require('jsonwebtoken')
const redis = require('./../db_con/redisCon')

const creat_token = async function(user){
    const expiresIn = 60*60*24
    const token = jwt.sign({
        user:user
    },"web_twy",{
        expiresIn:expiresIn
    })
    await redis.set(`TOKEN:${user}`, JSON.stringify(token), 'EX', expiresIn );
    return token
}


module.exports = creat_token