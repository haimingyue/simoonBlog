const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');

const con = mysql.createConnection(MYSQL_CONF);

function exec(sql) {
  console.log('sql', sql)
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err,result) => {
      if(err) {
        reject(err)
        return;
      }
      var string=JSON.stringify(result); 
      var data = JSON.parse(string);
      resolve(data);
    })
  })
  return promise;
}

module.exports = {
  exec
}