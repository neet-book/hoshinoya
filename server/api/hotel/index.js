const Router = require('koa-router')
const router = new Router()
// router.prefix('/hotel')

const HotelRateInfo = require('../dbs/models/HotelRateInfo')

router.get('/hotel_rate_info', async (ctx) => {
    const rateInfos = await HotelRateInfo.find()
    if (rateInfos) {
        ctx.body = {
            code: 1,
            msg: 'ok',
            data: rateInfos
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

