const Router = require('koa-router')
const Api = require('../controllers/api')

const router = new Router()

module.exports = router
    .post('/register',Api.register)
    .post('/login',Api.login)
