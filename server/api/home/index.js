const Router = require('koa-router')
const HoshinoayHomeModeul = require('../dbs/models/HoshinoyaHome')
const router = new Router()

router.get('/hoshinoya_home', async (ctx) => {
    const data = await  HoshinoayHomeModeul.findOne()
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