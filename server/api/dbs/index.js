const mongoose = require('mongoose')
const { databaseLogger } = require('../../log/logger')
const { dbs: config } = require('../config')


mongoose.connect(config.uri('hoshinoya'), {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    keepAlive: 120,
})
.then(() => databaseLogger.info(`[hoshinoya]: connection success`))
.catch((err) => databaseLogger.error(`[hoshinoya]: ${err}`))