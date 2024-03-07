const dbConnection = require("./_main");
const connection = dbConnection();

const getReply = (req, res) => {
  const { ids, index, type } = req.body;
  if (type === "font") {
    const sql = `SELECT reply.*, JSON_OBJECT(
      'uId', users.uId,
      'name', users.name,
      'phone', users.phone,
      'sex', users.sex,
      'avatar', users.avatar
    ) AS userInfo
    FROM(
      SELECT *
      FROM reply
      WHERE reply.commentId IN (?) AND reply.id = ?
    ) AS reply
    JOIN users ON reply.uId = users.uId`;
    connection.query(sql, [ids, index], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "数据库查询出错" });
      }
      res.status(200).send(results);
    });
  } else if (type === "graphic") {
    const sql = `SELECT reply_graphic.*, JSON_OBJECT(
      'uId', users.uId,
      'name', users.name,
      'phone', users.phone,
      'sex', users.sex,
      'avatar', users.avatar
    ) AS userInfo
    FROM(
      SELECT *
      FROM reply_graphic
      WHERE reply_graphic.commentId IN (?) AND reply_graphic.id = ?
    ) AS reply_graphic
    JOIN users ON reply_graphic.uId = users.uId`;
    connection.query(sql, [ids, index], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "数据库查询出错" });
      }
      res.status(200).send(results);
    });
  }
};

const getComment = (req, res) => {
  const { id, type } = req.body;
  if (type === "font") {
    const sql = `SELECT comment.*, JSON_OBJECT(
      'uId', users.uId,
      'name', users.name,
      'phone', users.phone,
      'sex', users.sex,
      'avatar', users.avatar
    ) AS userInfo
    FROM (
        SELECT *
        FROM comment
        WHERE discussWho = ?
    ) AS comment
    JOIN users ON comment.uId = users.uId
    ORDER BY comment.createdAt DESC`;
    connection.query(sql, [id], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("数据库查询失败");
      }
      res.status(200).send(results);
    });
  } else if (type === "graphic") {
    const sql = `SELECT comment_graphic.*, JSON_OBJECT(
      'uId', users.uId,
      'name', users.name,
      'phone', users.phone,
      'sex', users.sex,
      'avatar', users.avatar
    ) AS userInfo
    FROM (
        SELECT *
        FROM comment_graphic
        WHERE discussWho = ?
    ) AS comment_graphic
    JOIN users ON comment_graphic.uId = users.uId
    ORDER BY comment_graphic.createdAt DESC`;
    connection.query(sql, [id], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("数据库查询失败");
      }
      res.status(200).send(results);
    });
  }
};

const replyOrComment = (req, res) => {
  const { wallType, type, id, content, uId, commentId, callUser, discussWho } = req.body;
  const createdAt = new Date();
  try {
    if (wallType === "font") {
      if (type === "reply") {
        const sql = `INSERT INTO reply (id, content, uId, commentId, createdAt, callUser) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [id, content, uId, commentId, createdAt, callUser];
        connection.query(sql, values);
        res.status(200).send("回复成功");
      } else if (type === "comment") {
        const sql = `INSERT INTO comment (content, uId, discussWho, createdAt) VALUES (?, ?, ?, ?)`;
        const values = [content, uId, discussWho, createdAt];
        connection.query(sql, values);
        res.status(200).send("评论成功");
      } else {
        res.status(400).send("无效的请求类型");
      }
    } else if (wallType === "graphic") {
      if (type === "reply") {
        const sql = `INSERT INTO reply_graphic (id, content, uId, commentId, createdAt, callUser) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [id, content, uId, commentId, createdAt, callUser];
        connection.query(sql, values);
        res.status(200).send("回复成功");
      } else if (type === "comment") {
        const sql = `INSERT INTO comment_graphic (content, uId, discussWho, createdAt) VALUES (?, ?, ?, ?)`;
        const values = [content, uId, discussWho, createdAt];
        connection.query(sql, values);
        res.status(200).send("评论成功");
      } else {
        res.status(400).send("无效的请求类型");
      }
    }
  } catch (err) {
    console.error("数据库错误:", err);
    res.status(500).send("内部服务器错误");
  }
};
// const replyOrComment = (req, res) => {
//   const { wallType, type, id, content, uId, commentId, callUser, discussWho } = req.body;
//   const createdAt = new Date();
//   try {
//     if (wallType === "font") {
//       if (type === "reply") {
//         const sqlInsert = `INSERT INTO reply (id, content, uId, commentId, createdAt, callUser) VALUES (?, ?, ?, ?, ?, ?)`;
//         const valuesInsert = [id, content, uId, commentId, createdAt, callUser];
//         connection.query(sqlInsert, valuesInsert, (error, results, fields) => {
//           if (error) throw error;

//           // 检索刚刚插入的数据
//           const sqlSelect = `SELECT * FROM reply WHERE id = ?`;
//           connection.query(sqlSelect, [id], (error, replyData) => {
//             if (error) throw error;

//             res.status(200).json({ message: "回复成功", data: replyData });
//           });
//         });
//       } else if (type === "comment") {
//         const sqlInsert = `INSERT INTO comment (content, uId, discussWho, createdAt) VALUES (?, ?, ?, ?)`;
//         const valuesInsert = [content, uId, discussWho, createdAt];
//         connection.query(sqlInsert, valuesInsert, (error, results, fields) => {
//           if (error) throw error;
//           const sqlSelect = `SELECT * FROM comment WHERE id = LAST_INSERT_ID()`;
//           connection.query(sqlSelect, (error, commentData) => {
//             if (error) throw error;

//             res.status(200).json({ message: "评论成功", data: commentData });
//           });
//         });
//       } else {
//         res.status(400).send("无效的请求类型");
//       }
//     } else if (wallType === "graphic") {
//       if (type === "reply") {
//         const sqlInsert = `INSERT INTO reply_graphic (id, content, uId, commentId, createdAt, callUser) VALUES (?, ?, ?, ?, ?, ?)`;
//         const valuesInsert = [id, content, uId, commentId, createdAt, callUser];
//         connection.query(sqlInsert, valuesInsert, (error, results, fields) => {
//           if (error) throw error;

//           const sqlSelect = `SELECT * FROM reply_graphic WHERE id = ?`;
//           connection.query(sqlSelect, [id], (error, replyData) => {
//             if (error) throw error;

//             res.status(200).json({ message: "回复成功", data: replyData });
//           });
//         });
//       } else if (type === "comment") {
//         const sqlInsert = `INSERT INTO comment_graphic (content, uId, discussWho, createdAt) VALUES (?, ?, ?, ?)`;
//         const valuesInsert = [content, uId, discussWho, createdAt];
//         connection.query(sqlInsert, valuesInsert, (error, results, fields) => {
//           if (error) throw error;

//           // 同样使用LAST_INSERT_ID()获取最后一个插入的ID
//           const sqlSelect = `SELECT * FROM comment_graphic WHERE id = LAST_INSERT_ID()`;
//           connection.query(sqlSelect, (error, commentData) => {
//             if (error) throw error;

//             res.status(200).json({ message: "评论成功", data: commentData });
//           });
//         });
//       } else {
//         res.status(400).send("无效的请求类型");
//       }
//     }
//   } catch (err) {
//     console.error("数据库错误:", err);
//     res.status(500).send("内部服务器错误");
//   }
// };

module.exports = {
  getReply,
  getComment,
  replyOrComment,
};
