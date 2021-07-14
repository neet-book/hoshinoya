const RateInfoModel = require('./models/HotelRateInfo')
const mongoose = require('mongoose')
const { dbs } = require('../../config')
const http = require('http')

const host = '127.0.0.1'
const post = 3030

mongoose.connect(dbs.uri, {
    user: dbs.username,
    pass: dbs.password,
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
      test()
    // databaseLogger.info(`[${dbs.dbName}] connect successed`)
  }).catch(err => {
    // databaseLogger.error(`[${dbs.dbName}] ${err}`)
  })
  

const toCamelCase = function (key) {
    newKey = ''
    for (world of key.split('_')) {
        if (newKey == '') {
            newKey += world
        } else {
            newKey += world.replace(/^./, world[0].toUpperCase())
        }
    }
    return newKey
}

async function test() {
    const rateInfos = await RateInfoModel.find()
    for (let [index, doc] of Object.entries(rateInfos)) {
        doc.hotelID =  index
        await doc.save()
        let d = await RateInfoModel.find({ hotelNameEn: doc.hotelNameEn})
        console.log(d)
    }
}

const app = http.createServer((req, res) => {
    res.end('ok')
})

app.listen(post, host)