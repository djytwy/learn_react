const mongoose = require('mongoose')
const config = require('./../config')

mongoose.connect(config.MONGODB.DB_URL, { useNewUrlParser: true });

mongoose.connection.on('connected',function(){
    console.log('Success connect :' + config.MONGODB.DB_URL);
})

mongoose.connection.on('error',function(){
    console.log('Error connect :' + config.MONGODB.DB_URL);
})

mongoose.connection.on('disconnected',function(){
    console.log('Disconnected connect :' + config.MONGODB.DB_URL);
})

module.exports = mongoose