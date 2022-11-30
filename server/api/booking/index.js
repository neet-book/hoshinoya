const Router = require('koa-router')
const SQLDB = require('/server/api/dbs/mysql/index')

const router = new Router()
const db = new SQLDB()
router.prefix('/hotel')


router.get('/vacancies', async (ctx) => {
  console.log(ctx.param.hotel, ctx.param.date)
  ctx.body = 'ok'
})