const mongoose = require('./../db_con/mongoCon'),
    Schema = mongoose.Schema;

// index ：建索引
// default：默认值
const session_schema = new Schema({
    user : { type:String , index: true},
    session : { type:String}
});

module.exports = mongoose.model('dev_session',session_schema);