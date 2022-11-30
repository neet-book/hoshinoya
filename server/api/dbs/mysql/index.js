const mysql = require('mysql')
const {models} = require("mongoose");

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

module.exports = class SQLDB {
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
   * @param {string[]} fields 字段,
   * @param {string} where where子句
   * @returns {Promise<unknown>}
   */
  async select(table, fields, where)  {
    if (!this.connection) {
      return Promise.reject('Error: 数据库未连接')
    } else {
      const sql = `SELECT ${fields.join(',')} FROM ${table} WHERE ${where}`
      return new Promise((resolve, reject) => {
        this.connection.query(sql, (err, result , fields) => {
          err ? reject(err) : resolve([result, fields])
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
      console.log(placeholders)
      placeholders = placeholders.slice(0, placeholders.length - 1)

      const sql = `INSERT INTO ${table}(${keys}) VALUES(${placeholders})`
      console.log(sql)
      return new Promise((resolve, reject) => {
        this.connection.query(sql, Object.values(data), (err, result) => {
            err ? reject(err) : resolve(result)
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
      const sql = `UPDATE ${table} SET ${placeholders} WHERE ${where}`

      return new Promise((resolve, reject) => {
        this.connection.query(sql, values, (err, result) => {
          err ? reject(err) : resolve(result)
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
        console.log(`DELETE FROM ${table} WHERE ${where}`)
        const sql = `DELETE FROM ${table} WHERE ${where}`
        this.connection.query(sql, (err , result) => {
          err ? reject([err, sql]) : resolve(result)
        })
      })
    }

    return Promise.reject('数据库未连接')
  }
}
