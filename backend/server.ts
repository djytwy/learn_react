import * as Koa from 'koa'
import * as Router from 'koa-router'
// 以下的包用于图片上传接口功能
// import * as koaBody from 'koa-body'
import * as koaCors from 'koa-cors'
import * as koaBodyParser from 'koa-bodyparser'
import * as fs from 'fs'
import User from './user'

const app = new Koa();
const router = new Router();

// 获取post参数用
app.use(koaBodyParser());

const insert_to_mongo = (username:String,userpwd:String,userage:Number) => {
    let user = new User({
        userName:username,
        userPwd:userpwd,
        userAge:userage,
    });
    console.log(`插入的数据：用户名：${username},密码：${userpwd},年龄：${userage}`);
    user.save((err,res) => {
        if(err) {
            return console.log("Error:" + err);
        } else {
            return console.log("Success :" + res);
        }
    })
} 

// 图片上传用
// app.use(koaBody({
//     multipart:true,
//     formidable:{
//         maxFileSize: 200*1024*1024
//     }
// }));

// 提供一个/getJson接口
router
  .get('/getJson', async ctx => {
    // 后端允许cors跨域请求
    await koaCors();
    // 返回给前端的数据
    ctx.body = JSON.parse(fs.readFileSync('./material.json','utf-8'));
  });

router.
    get('/',async ctx => {
        await koaCors();
        ctx.body = "hello world !";
    });

router
    .post('/addMsg', async ctx => {
        await koaCors();
        interface msg {
            username: String;
            userpwd: String;
            userage: Number;
        }
        let my:msg = <msg> ctx.request.body;
        console.log("这是消息：" + JSON.stringify(my));
        let remsg = insert_to_mongo(my.username,my.userpwd,my.userage);
        ctx.body = remsg
    }) 

// 将koa和两个中间件连起来
app.use(router.routes()).use(router.allowedMethods());
 
// 监听3000端口
console.log("Server is runing on 3000 port ...");
app.listen(3000);
