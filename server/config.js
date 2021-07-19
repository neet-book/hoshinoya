const path = require('path')

module.exports = {
  dbs: {
    get host() {
      return 'localhost'
    },
    get port() {
      return 27017
    },
    get uri() {
      return `mongodb://${this.host}:${this.port}/${this.dbName}`
    },
    get dbName() {
      return 'test'
    },
    get username() {
      return 'tester'
    },
    get password() {
      return '123456'
    }
  },
  log: {
    get logPath() {
      return path.join(__dirname, '../log/')
    }
  }
}
