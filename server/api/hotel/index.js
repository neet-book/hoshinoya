const Router = require('koa-router')
const router = new Router()
const HotelRateInfo = require('../dbs/models/HotelRateInfo')
const HotelIntroduction = require('../dbs/models/Hotelntroduction')

router.prefix('/hotel')

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

router.get('/introduction/:hotel', async (ctx) => {
    const hotel = ctx.params.hotel
    const data = await HotelIntroduction.findOne({ hotelNameEn: hotel })
    if (data) {
        ctx.body = {
            code: 1,
            msg: 'ok',
            data
        }
    } else {
        ctx.body = {
            code: 0,
            msg: `no searched ${hotel} introduction`,
            data: null
        }
    }
})

module.exports = router

