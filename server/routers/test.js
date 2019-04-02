const Router = require('koa-router')
const Test = require('./../controllers/test')

const router = new Router()

module.exports = router.
    get('/test',Test.io_test)

