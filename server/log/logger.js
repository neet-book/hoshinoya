const path = require('path')
const log4js = require('koa-log4')

log4js.configure({
    // 定义日志记录器
    appenders: {
        access: {
            type: 'dateFile',
            pattren: '.yyyy-MM-dd',
            daysToKeep: 20,
            alwaysIncludePattern: true, 
            filename: path.join(__dirname, '/logs/access.log')
        },
        app: {
            // 日志输出类型 file: 输出为普通文件，console: 输出至控制台, dateFile: 按时间输出至不同文件 
            type: 'dateFile',
            encodeing: 'utf-8',
            // 是否压缩滚动日志文件
            comperss: false,
            // 删除大于指定天数的日志文件
            daysToKeep: 10,
            pattren: '.yyyy-mm-dd',
            alwaysIncludePattern: true, 
            filename: path.join(__dirname, '/logs/app.log')
        },
        database: {
            type: 'dateFile',
            encodeing: 'utf-8',
            daysToKeep: 10,
            pattren: '.yyy-MM-dd',
            alwaysIncludePattern: true,
            filename: path.join(__dirname, 'logs/database.log')
        }
    },
    categories: {
        default: { appenders: ['app'], level: 'debug' },
        access: { appenders: ['access'], level: 'debug' },
        database: { appenders: ['database'], level: 'debug' }
    }
})

const accessLogger = () => log4js.koaLogger(log4js.getLogger('access'))
const appLoger = log4js.getLogger('app')
const databaseLogger = log4js.getLogger('database')

module.exports = {
    appLoger,
    accessLogger,
    databaseLogger
}