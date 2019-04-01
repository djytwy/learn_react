const mongoose = require('mongoose')
const config = require('./../config')

mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGODB.DB_URL, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('open',function(){
    console.log('Success connect :' + config.MONGODB.DB_URL);
})

db.on('error',function(){
    console.log('Error connect :' + config.MONGODB.DB_URL);
})

db.on('disconnected',function(){
    console.log('Disconnected connect :' + config.MONGODB.DB_URL);
})

module.exports = mongoose