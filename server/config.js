const config = {
    PORT: 3001,

    MONGODB: {
        DB_URL:'mongodb://djytwy:twy930107@163.53.170.75:27017/koa'
    },
    REDIS:{
        DB_URL:'163.53.170.75',
        PORT:'6388'
    },
    TOKEN:{
        EXPIRESIN:60*60*24
    },
    PRODUCTION: true
}

module.exports = config