const path = require('path')

module.exports = {
  mongodbs: {
    get host() {
      return '127.0.0.1'
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
  mysqldbs: {
    get host() {
      return 'localhost'
    },
    get user() {
      return 'tester'
    },
    get password() {
      return 'test123456'
    },
    get dbName() {
      return 'hoshinoya'
    }
  },
  log: {
    get logPath() {
      return path.join(__dirname, '../log/')
    }
  }
}
