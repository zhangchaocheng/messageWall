const config = require("../config");
const mysql = require("mysql2");
// 创建连接mysql的对象给外界使用
module.exports = () => {
  return mysql.createConnection({
    host: config.db.host, // 主机地址;
    user: config.db.user,
    password: config.db.pwd,
    database: config.db.dataBase,
  });
};
