const dbConnection = require("./_main");
const connection = dbConnection();

const register = (req, res) => {
  const { username, password, phone } = req.body;

  // 向数据库users表中插入以上用户注册数据
  const sql = `INSERT INTO users (name, password, phone, avatar) VALUES ('${username}', '${password}', '${phone}','${"https://p.qqan.com/up/2020-12/16079305167336607.jpg"}')`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
    }
    res.send({ message: "注册成功" });
  });
};

module.exports = {
  register,
};
