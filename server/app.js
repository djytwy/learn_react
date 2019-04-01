const path = require('path')
const Koa = require('koa')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const config = require('./config')
const routers = require('./routers/index')
const logTime = require('./middlewares/response_time')

const app = new Koa()

app.keys = ['twy'];

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 记录响应时间的中间件
app.use(logTime())

if(config.PRODUCTION) {
  // 配置静态资源加载中间件
  app.use(koaStatic(
    path.join(__dirname , './../dist')
  ))

  // 配置服务端模板渲染引擎中间件
  app.use(views(path.join(__dirname, './../dist'), {
    extension: 'ejs'
  }))
} else
  console.log("测试接口....")

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.PORT,"0.0.0.0" )
console.log(`the server is start at port: ${config.PORT}`)