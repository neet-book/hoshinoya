const Router = require('koa-router')
const HoshinoayHomeModel = require('../dbs/mongo/models/HoshinoyaHome')
const router = new Router()


router.get('/hoshinoya_home', async (ctx) => {
    const data = await  HoshinoayHomeModel.findOne()
    if (data) {
        ctx.body = {
            code: 1,
            msg: 'ok',
            data: data
        }
    } else {
        ctx.body = {
            code: 0,
            msg: 'No data',
            data: null
        }
    }
})

module.exports = router