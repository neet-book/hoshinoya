module.exports = {
  dbs: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 27017
    },
    uri(name) {
      return `mongodb://${this.host}:${this.port}/{name}`
    }
  }
}