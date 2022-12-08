const mysql = require('mysql')

let instance = null

/**
 * Mysql Config
 * @typedef Config
 * @type object
 * @param {string} username
 * @param {string} password
 * @param {string} host
 * @param {string} database
 */

class SQLDB {
  connection
  config

  /**
   * 类构造函数
   * @param {Config} config
   * @returns {null}
   */
  constructor(config) {
    if (instance !== null) {
      return instance
    }

    this.config = config
    instance = this
  }

  async connect(){
    const connection = mysql.createConnection(this.config)
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          reject(err)
        } else {
          this.connection = connection
          resolve(connection.threadId)
        }
      })
    })
  }

  /**
   * 查询
   * @param {string} table 表名
   * @param {string[] | string} fields 字段,
   * @param {string} where where子句
   * @returns {Promise<unknown>}
   */
  async select(table, fields, where)  {
    if (!this.connection) {
      return Promise.reject('Error: 数据库未连接')
    } else {
      let sql

      if ( typeof fields === 'string') {
        sql = `SELECT ${fields} FROM ${table}`
      } else if (Array.isArray(fields)) {
        sql = `SELECT ${fields.join(', ')}`
      }
      if (where) {
        sql = sql + ` WHERE ${where}`
      }

      return new Promise((resolve, reject) => {
        this.connection.query(sql, (err, result , fields) => {
          err ? reject([err, sql]) : resolve([result, fields])
        })
      })
    }
  }

  /**
   * 向表格插入数据
   * @param {string} table 表格名
   * @param {object} data 插入数据
   * @returns {Promise<unknown>}
   */
  async insert(table, data) {
    if (this.connection) {
      let keys = Object.keys(data).join(', ')
      let placeholders = ''.padStart(Object.values(data).length * 2, '?,')
      placeholders = placeholders.slice(0, placeholders.length - 1)

      const sql = `INSERT INTO ${table}(${keys}) VALUES(${placeholders})`
      return new Promise((resolve, reject) => {
        this.connection.query(sql, Object.values(data), (err, result) => {
            err ? reject([err, sql]) : resolve(result)
        })
      })
    }
    return Promise.reject('Error: 数据库未连接')
  }

  /**
   * 更新数据
   * @param {string} table 表名
   * @param {object} data 数据
   * @param {string} where where子句
   * @returns {Promise<void>}
   */
  async update(table, data, where) {
    if (this.connection) {
      const values = Object.values(data)
      let placeholders = Object.keys(data).join(' = ?,') + ' = ?'
      let sql = `UPDATE ${table} SET ${placeholders}`
      if (where) sql += ` WHERE ${where}`
      return new Promise((resolve, reject) => {
        this.connection.query(sql, values, (err, result) => {
          err ? reject([err, sql]) : resolve(result)
        })
      })
    }
    return Promise.reject('数据库未连接')
  }

  /**
   * 删除数据
   * @param {string} table 表名
   * @param {string} where where子句
   * @returns {Promise<unknown>}
   */
  async delete(table, where) {
    if (this.connection) {
      return  new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${table}`
        sql = ` WHERE ${where}`
        this.connection.query(sql, (err , result) => {
          err ? reject([err, sql]) : resolve(result)
        })
      })
    }

    return Promise.reject('数据库未连接')
  }

  end() {
    this.connection.end()
    this.connection = null
  }
}

module.exports = SQLDB