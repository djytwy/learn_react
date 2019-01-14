const mongoose = require('./../db_con/mongoCon'),
    Schema = mongoose.Schema;

// index ：建索引
// default：默认值
const UserSchema = new Schema({
    user_name : { type:String , index: true},
    user_pwd : { type : String },
    user_age : {type : Number},
    login_date : {type : Date , default:Date.now}
});

module.exports = mongoose.model('dev_user',UserSchema);


// Model.distinct(field, [conditions], [callback])　　　　　　　　　　　　　　　　//去重
// Model.findOne(conditions, [fields], [options], [callback])　　　　　　　　　　//查找一条记录
// Model.findOneAndRemove(conditions, [options], [callback])　　　　　　　　　　 //查找一条记录并删除
// Model.findOneAndUpdate([conditions], [update], [options], [callback])　　　　//查找一条记录并更新