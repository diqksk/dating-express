const mysql = require("mysql2");
const mysqlConfig = require("../config/mysqlConfig");

const pool = mysql.createPool({
  ...mysqlConfig.development(),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = pool;
