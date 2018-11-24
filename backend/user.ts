import mongoose from './db'
 
const Schema = mongoose.Schema;

// index ：建索引
// default：默认值
let UserSchema = new Schema({
    userName : { type:String , index: true,unique:true},
    userPwd : { type : String},
    userAge : {type : Number},
    regsiterDate : { type : Date, default:Date.now},
    loginDate : {type : Date, default:Date.now}
});

let User = mongoose.model('User',UserSchema);

export default User 