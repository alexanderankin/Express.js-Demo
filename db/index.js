var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env['mysqlhost'] || 'localhost',
  user            : process.env['mysqluser'] || 'root',
  password        : process.env['mysqlpassword'],
  multipleStatements: true
  // database        : process.env['mysqldb']
});

module.exports = pool;
