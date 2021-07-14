const Router = require('koa-router')
const router = new Router()
// router.prefix('/hotel')

const HotelRateInfo = require('../dbs/models/HotelRateInfo')

router.get('/hotel_rate_info', async (ctx) => {
    console.log('hotel_rate_infooooo')
    const rateInfos = await HotelRateInfo.find()
    ctx.body = {
        code: 1,
        msg: 'ok',
        data: rateInfos
    }
})


module.exports = router

