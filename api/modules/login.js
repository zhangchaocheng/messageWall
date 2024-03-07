const dbConnection = require("./_main");
const connection = dbConnection();
const tokenUtils = require("../token");

const login = (req, res) => {
  const { phone, password } = req.body;
  // 查询数据库比对账户密码是否正确
  const sql = `SELECT uId, name, phone, sex, avatar FROM users WHERE phone='${phone}' AND password='${password}'`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: "服务器错误" });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ msg: "用户名或密码错误" });
      return;
    }
    // 登录成功，返回用户信息
    res.status(200).json({ results: results[0], msg: "登录成功" });
  });
};

module.exports = {
  login,
};