const dbConnection = require("../modules/_main");
const connection = dbConnection();

const addFontCard = (req, res) => {
  const card = req.body;
  const sql = "INSERT INTO fontwall (title, type, content, createdAt, itemColor, uId) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(sql, [card.title, card.type, card.content, card.createdAt, card.itemColor, card.uId], (err, rows) => {
    if (!err) {
      res.send("success");
    } else {
      console.log(err);
    }
  });
};

const addGraphicCard = (req, res) => {
  const card = req.body;
  const sql = "INSERT INTO graphicwall (title, type, content, createdAt, images, uId) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(sql, [card.title, card.type, card.content, card.createdAt, card.images, card.uId], (err, rows) => {
    if (!err) {
      res.send("success");
    } else {
      console.log(err);
    }
  });
};

module.exports = {
  addFontCard,
  addGraphicCard,
};
