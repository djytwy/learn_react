const Router = require('koa-router')
const Home = require('./../controllers/home')

const router = new Router()

module.exports = router
    .get('',Home.home)
    .get('login',Home.home)

