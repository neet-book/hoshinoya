const RateInfoModel = require('./mongo/models/HotelRateInfo')
const mongoose = require('mongoose')
const { mongodbs, mysqldbs } = require('../../config')
const http = require('http')

const host = '127.0.0.1'
const post = 3030

const SQLDB = require('./mysql/index')


// mongoose.connect(mongodbs.uri, {
//     user: mongodbs.username,
//     pass: mongodbs.password,
//     bufferCommands: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then(() => {
//       test()
//     // databaseLogger.info(`[${dbs.dbName}] connect successed`)
//   }).catch(err => {
//     // databaseLogger.error(`[${dbs.dbName}] ${err}`)
//   })
  

// const toCamelCase = function (key) {
//     newKey = ''
//     for (world of key.split('_')) {
//         if (newKey == '') {
//             newKey += world
//         } else {
//             newKey += world.replace(/^./, world[0].toUpperCase())
//         }
//     }
//     return newKey
// }
//
// async function test() {
//     const rateInfos = await RateInfoModel.find()
//     for (let [index, doc] of Object.entries(rateInfos)) {
//         doc.hotelID =  index
//         await doc.save()
//         let d = await RateInfoModel.find({ hotelNameEn: doc.hotelNameEn})
//         console.log(d)
//     }
// }

const mysql = require('mysql')

const connection = new SQLDB({
    host: mysqldbs.host,
    user: mysqldbs.user,
    password: mysqldbs.password,
    database: mysqldbs.dbName
})

// new Promise((resolve, reject) => {
//     connection.connect(err => {
//         if (err) {
//             reject(err)
//         } else  {
//             resolve(connection.threadId)
//         }
//     })
// })
//   .then(threadId => console.log(`connect success id is: ${threadId}`))
//   .catch(err => console.log(`connect error: ${err}`))
//   .then(() => {
//       connection.query('select * from customer', (err, result, field) => {
//           if (err) return console.log('qeury err', err)
//           console.log(result)
//           console.log(field)
//       })
//   })



const app = http.createServer((req, res) => {
    res.end('ok')
})

app.listen(post, host)