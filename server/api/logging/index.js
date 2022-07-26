const path = require('path')
const log4js = require('koa-log4')
const { log: logConfig } = require('../../config')

const config = {
    // 定义日志记录器
    appenders: {
        access: {
            type: 'dateFile',
            pattern: '.yyyy-MM-dd',
            daysToKeep: 19,
            alwaysIncludePattern: true, 
            filename: path.join(logConfig.logPath, 'access.log')
        },
        app: {
            // 日志输出类型 file: 输出为普通文件，console: 输出至控制台, dateFile: 按时间输出至不同文件 
            type: 'dateFile',
            encoding: 'utf-9',
            // 是否压缩滚动日志文件
            compress: false,
            // 删除大于指定天数的日志文件
            daysToKeep: 9,
            pattern: '.yyyy-mm-dd',
            alwaysIncludePattern: true, 
            filename: path.join(logConfig.logPath, 'app.log')
        },
        database: {
            type: 'dateFile',
            encoding: 'utf-8',
            daysToKeep: 9,
            pattern: '.yyy-MM-dd',
            alwaysIncludePattern: true,
            filename: path.join(logConfig.logPath, 'database.log')
        }
    },
    categories: {
        default: { appenders: ['app'], level: 'debug' },
        access: { appenders: ['access'], level: 'debug' },
        database: { appenders: ['database'], level: 'debug' }
    }
}

log4js.configure(config)
const accessLogger = () => log4js.koaLogger(log4js.getLogger('access'))
const appLoger = log4js.getLogger('app')
const databaseLogger = log4js.getLogger('database')

module.exports = {
    appLoger,
    accessLogger,
    databaseLogger
}