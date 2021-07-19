const Router = require('koa-router')
const HoshinoayHomeModeul = require('../dbs/models/HoshinoyaHome')
const router = new Router()

router.get('/hoshinoya_home', async (ctx) => {
    console.log('hoshinoya_home')
    const data = await  HoshinoayHomeModeul.find()
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