const Router = require('koa-router')
const router = new Router()
const SQLDB = require('../dbs/mysqldb')
const { mysqldbs } = require('../../config')
const HotelRateInfo = require('../dbs/mongo/models/HotelRateInfo')
const HotelIntroduction = require('../dbs/mongo/models/Hotelntroduction')
const { apiLogger } = require("../logging");

const mysqlDb = new SQLDB({
  user: mysqldbs.user,
  password: mysqldbs.password,
  database: mysqldbs.dbName,
  host: mysqldbs.host
})
if (!mysqlDb.connection) {
  mysqlDb.connect()
}



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
  const hotel = ctx.query?.hotelName
  if (hotel) {
    const result = await mysqlDb.select('hotels', '*', `hotel_name="${hotel}"`)
      .catch(([err, sql]) => {
        ctx.body = {
          code: 0,
          data: null,
          msg: err.sqlMessage || err.message
        }

        apiLogger.error(`
          api: /hotel/details,
          params: ${JSON.stringify(ctx.params)},
          err: ${err.message || err.sqlMessage},
          sql: ${sql} 
        `)
      })

    if (result) {
      let details = null
      if (result[0].length === 1) {
        details = result[0][0]
        details.search_condition = JSON.parse(details.search_condition)
        details.discount = JSON.parse(details.discount).map(i => JSON.parse(i))
      }

      ctx.body = {
        code: 1,
        data: details,
        msg: 'ok'
      }

      apiLogger.info(`
          api: /hotel/details
          params: ${JSON.stringify(ctx.params)}
          body: ${JSON.stringify(ctx.body)}
      `)
    }
  } else {
    ctx.body = {
      code: 0,
      data: null,
      msg: 'No Query'
    }
    apiLogger.info(`
      api: /hotel/details
      err: No Query
      params: ${JSON.stringify(ctx.params)}
      body: ${ctx.body}
    `)
  }

})


module.exports = router

