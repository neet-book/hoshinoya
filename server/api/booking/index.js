const Router = require('koa-router')
const SQLDB = require('../dbs/mysqldb')
const { mysqldbs } = require('../../config')
const { apiLogger } = require('../logging')
const router = new Router()
router.prefix('/booking')

const db = new SQLDB({
  user: mysqldbs.user,
  password: mysqldbs.password,
  database: mysqldbs.dbName,
  host: mysqldbs.host
})
if (!db.connection) {
  db.connect()
}

/**
 * 返回月的最后一天的
 * @param year
 * @param month
 */
function getLastDay(year, month) {
  const date = new Date(year, month - 1)

  for (let day = 28; day <= 31; day++) {
    date.setDate(day + 1)
    if (date.getMonth() + 1 !== month) {
      return day
    }
  }
}

/**
 * 查询旅馆房间最低价格
 * @param hotelId
 */
async function searchHotelBaseCharge(hotelId) {
  const sql = `
    SELECT Min(unit_charge) AS base_charge
    FROM plans
    WHERE plans.room_id IN (
      SELECT rooms.room_id
      FROM rooms
      WHERE hotel_id = (
        SELECT hotels.hotel_id
        FROM hotels
        WHERE hotel_id = "${hotelId}"
      ) 
    )`

  return new Promise((resolve, reject) => {
    db.connection.query(sql, (err, result) => {
      err ? reject(err) : resolve(result[0])
    })
  })
}



router.get('/vacancies', async (ctx) => {
  apiLogger.info(`
   api: /booking/vacancies
   url: ${ctx.request.url} 
  `)
  if (ctx.query) {
    const { searchDateStart, hotelId , stayNight, adult, baby, infant, child } = ctx.query
    const startDate = new Date(searchDateStart),
      year = startDate.getFullYear(),
      month = startDate.getMonth() + 1
    const searchDateEnd = `${year}-${month}-${getLastDay(year, month)}`
    let customers = 0
    customers += Number(adult)
    customers += Number(baby)
    customers += Number(infant)
    customers += Number(child)

    let sql = `
     CALL room_vacancies(DATE("${searchDateStart}"), DATE("${searchDateEnd}"), "${hotelId}", ${customers}, @v); 
    `
    const vacancies = await new Promise((resolve, reject) => {
      db.connection.query(sql, (err, result) => {
        if (err)  {
          reject(err)
        } else {
          const [[{ vacancies }]] = result
          resolve(JSON.parse(vacancies))
        }
      })
    })
      .catch(err => {
        ctx.body = {
          code: 0,
          data: null,
          msg: err.sqlMessage || err.message
        }

        apiLogger.error(`
          api: /booking/vacancies,
          params: ${JSON.stringify(ctx.params)},
          err: ${err.message || err.sqlMessage},
          sql: ${sql} 
        `)
      })

    if (vacancies) {
      ctx.body = {
        code: 1,
        data: vacancies,
        msg: 'ok'
      }
      apiLogger.info(`
        api: /booking/vacancies
        url: ${ctx.request.url} 
        body: ${JSON.stringify(vacancies)}   
      `)
    }

  } else {
    ctx.body = {
      code: 0,
      data: null,
      msg: 'No Query.'
    }
    apiLogger.error(`
      api: /booking/vacancies,
      params: ${JSON.stringify(ctx.params)},
      err: No 
    `)
  }
})


module.exports = router