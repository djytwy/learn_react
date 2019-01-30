const Router = require('koa-router')
const Home = require('./../controllers/home')
const TokenOprions = require('./../middlewares/token_options')

const router = new Router()

module.exports = router
    .get('',Home.home)
    .get('init',TokenOprions.check_token,Home.init)

