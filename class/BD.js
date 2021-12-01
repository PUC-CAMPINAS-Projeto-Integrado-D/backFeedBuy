require('dotenv').config();
const mysql = require('mysql');

class MySQL {
  constructor() {
    this.connection = null;
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
    });

    this.connection.on('error', (err) => {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('MySQL Connection Closed');
      } else {
        throw err;
      }
    });
    return this;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect({}, () => {
        resolve();
      });
    });
  }

  query(query, binds, callback = (rows, fields) => {}) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, binds, async (err, rows, fields) => {
        if (err) return reject(err);

        callback(rows, fields);
        return resolve({ rows, fields });
      });
    });
  }

  disconnect() {
    if (this.connection === null || this.connection === undefined) return;
    return new Promise((resolve, reject) => {
      this.connection.end(() => {
        resolve();
      });
    });
  }
}

module.exports = MySQL;
