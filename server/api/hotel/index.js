const Router = require('koa-router')
const router = new Router()
const SQLDB = require('../dbs/mysqldb')
const { mysqldbs: SQL_DB_CONFIG } = require('../../config')
const HotelRateInfo = require('../dbs/mongo/models/HotelRateInfo')
const HotelIntroduction = require('../dbs/mongo/models/Hotelntroduction')

const mysqlDb = new SQLDB({
    host: SQL_DB_CONFIG.host,
    username: SQL_DB_CONFIG.user,
    password: SQL_DB_CONFIG.password,
    database: SQL_DB_CONFIG.dbName
})

if (mysqlDb.connection === null) mysqlDb.connect()

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

router.get('/details', async (ctx) => {
    const hotel = ctx.params.query?.hotelName
    if (hotel) {
        const hotelDetail = await mysqlDb.select('hotels', '*', `hotel_name="${hotel}"`)
    }
})


module.exports = router

