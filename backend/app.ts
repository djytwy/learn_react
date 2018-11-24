import User from './user'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as koaCors from 'koa-cors'
import * as koaBodyParser from 'koa-bodyparser' 
import * as jwt from 'jsonwebtoken'
import client from './redis_con'

const app = new Koa();
const router = new Router();
const port = 19930;

app.use(koaBodyParser());

app.use(koaCors({
    maxAge: 7 * 24 * 60 * 60,
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
    headers: 'Content-Type, Accept, Authorization'
}));

const Regsiter = (username:string,userpwd:string,userage:number) => {
    let user = new User({
        userName:username,
        userPwd:userpwd,
        userAge:userage,
    });
    return user;
}

const Token = (username:string,userpwd:string) => {
    let content = {userName:username};
    let key = "twy";
    let token = jwt.sign(content,key,{
        expiresIn:60*60*24
    });
    const date = new Date().getTime().toString()
    return {redis:client.set(token,date,"EX",60*60*24),token:token};
}

const getToken = (token:string) => {
    const msg = client.get(token, (error,replies) => {
        return replies
    })
    return msg;
}

router.
    get('/',async ctx => {
        await koaCors();
        const token = ctx.cookies.get("token") === undefined? null:ctx.cookies.get("token");
        if(token === null || getToken(token) === null) {
            ctx.body = "you don't have token !";
        } else {
            ctx.body = "hello ! "
        }
    });

router.
    post('/register',async ctx => {
        await koaCors();
        interface registerMsg {
            username:string,
            userpwd:string,
            userage:number
        }
        let user_reg:registerMsg = <registerMsg>ctx.request.body;

        let user = Regsiter(user_reg.username,user_reg.userpwd,user_reg.userage);

        const register = new Promise((resolve,rejects) => {

            User.find({userName:user_reg.username},(err,res) => {
                if (Array.prototype.isPrototypeOf(res) && res.length === 0) {
                    user.save((err,res) => {
                        console.log(err,res);
                        console.log(`注册成功！`);
                        resolve(`注册成功！`); 
                    })
                } else {
                    console.log(`一个用户注册失败: ${res}`);
                    resolve("用户名已注册过，请更改！"); 
                }
            })
            
        });

        ctx.body = await register;
    });

router.
    post('/login',async ctx => {
        await koaCors();

        interface loginMsg {
            username:any,
            userpwd:any
        }
        let user_login:loginMsg = <loginMsg>ctx.request.body;
        const whereStr = {userName:user_login.username,userPwd:user_login.userpwd};
        
        const login = new Promise((resolve,rejects) => {
            User.find(whereStr,(err,res) => {
                if(Array.prototype.isPrototypeOf(res) && res.length === 0) {
                    console.log(`登录失败的一个`);
                    resolve(`账号或密码错误，请确认！`)
                } else {
                    interface success_msg {
                        redis:any,
                        token:string
                    };
                    const msg:success_msg = Token(user_login.username,user_login.userpwd);

                    if (msg.redis === true) {
                        ctx.cookies.set("token",msg.token);
                        console.log(`登录成功！`);
                        resolve(msg.token);
                    } else {
                        console.log(`您已经登录过了！`);
                        resolve(`您已经登录过了！`);
                    } 
                }
            })
        })

        ctx.body = await login;
    });

router.
    get('/login_out',async ctx => {
        await koaCors(); 

        if(ctx.request.method === `GET`) {
            const token = ctx.request.query.token;
            const del = new Promise((resolve,rejects) => {
                client.del(token, (err,replies) => {
                    if(replies === 1) {
                        ctx.cookies.set("token","",{signed:false,maxAge:0})
                        resolve(`success`)
                    } else {
                        resolve(`fail`)
                    }
                });
            })
            const msg = await del;
            if(msg === `success`){
                ctx.body = `登出成功！！！`
            } else {
                ctx.redirect(`/`)
            }
        } else {
            ctx.status = 403
        }
    });

// 将koa和两个中间件连起来
app.use(router.routes()).use(router.allowedMethods());
 
// 监听19930端口
console.log(`Server is runing on ${port} port ...`);
app.listen(port);