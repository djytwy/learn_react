const config = {
    PORT: 3001,

    MONGODB: {
        DB_URL:'mongodb://163.53.170.75:27017/my_test'
    },
    REDIS:{
        DB_URL:'163.53.170.75',
        PORT:'6388'
    },
    TOKEN:{
        EXPIRESIN:60*60*24
    }
}

module.exports = config