const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const koaCors = require('koa-cors')
const session = require('koa-session');
const config = require('./config')
// const mongoose = require('./db_con/mongoCon')
const routers = require('./routers/index')

const app = new Koa()

app.keys = ['twy'];

// 配置session中间件
app.use(session(config.SESSION_CONFIG, app));

// 跨越请求
app.use(koaCors({
  maxAge: 7 * 24 * 60 * 60,
  credentials: true,
  methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
  headers: 'Content-Type, Accept, Authorization'
}));

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './../dist')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './../dist'), {
  extension: 'ejs'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.PORT )
console.log(`the server is start at port ${config.PORT}`)