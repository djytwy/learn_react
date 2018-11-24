const mongoose = require('mongoose');

DB_URL = 'mongodb://163.53.170.75:27017/my_test';
mongoose.connect(DB_URL, { useNewUrlParser: true });

mongoose.connection.on('connected',function(){
    console.log('Success connect :' + DB_URL);

})

mongoose.connection.on('error',function(){
    console.log('Error connect :' + DB_URL);
})

mongoose.connection.on('disconnected',function(){
    console.log('Disconnected connect :' + DB_URL);
})

module.exports = mongoose;