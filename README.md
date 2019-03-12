# koaServer with Vue.js
一个基于Koa和Vue的登录鉴权demo,使用token进行鉴权,配合redis进行缓存
主要用到的技术栈：
后端：Koa,Koa-router,mongodb(Mongoose),redis(ioredis),jwt(jsonwebtoken)
前端：Vue,Element-ui,Vue-router,Vue-cli,Vuex,axios

新增了MongoDB的用户认证
## Build Setup

``` bash
# 安装依赖
npm install

# 启动Vue前端app
npm run dev

# 打包Vue前端app
npm run build

# 运行后端app
npm run app
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
