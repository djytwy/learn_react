const Router = require('koa-router')
const Api = require('../controllers/api')
const TokenOprions = require('./../middlewares/token_options')

const router = new Router()

module.exports = router
    .post('/register',Api.register)
    .post('/login',Api.login)
    .get('/init',TokenOprions.check_token,Api.init)
