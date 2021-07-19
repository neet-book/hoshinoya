const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { databaseLogger, accessLogger } = require('./api/logging')
const mongoose = require('mongoose')
const { dbs } = require('./config')

const hotelRouter = require('./api/hotel')
const homeRouter = require('./api/home')

const app = new Koa()


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  mongoose.connect(dbs.uri, {
    user: dbs.username,
    pass: dbs.password,
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('数据库链接成功')
    databaseLogger.info(`[${dbs.dbName}] connect successed`)
  }).catch(err => {
    console.log('数据库链接失败')
    databaseLogger.error(`[${dbs.dbName}] ${err}`)
  })
  

  await nuxt.ready()

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(accessLogger())
  app.use(hotelRouter.routes()).use(hotelRouter.allowedMethods())
  app.use(homeRouter.routes()).use(homeRouter.allowedMethods())
  
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
