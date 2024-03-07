const dbConnection = require("./_main");
const connection = dbConnection();

const executeQuery = (req, res, sql, params) => {
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(200).json({ message: "Not found", content: false });
    }
    
    res.status(200).json({ data: results, content: true, startIndex: params[1] + params[2] });
  });
};

// 执行
const getSafeTableAndFields = (type) => {
  const validTypes = ["text", "image"];
  const tableMap = {
    text: { tableName: "fontwall", collection: "fontcollection" },
    image: { tableName: "graphicwall", collection: "graphiccollection" },
  };

  if (!validTypes.includes(type)) {
    throw new Error("Invalid type");
  }

  const { tableName, collection } = tableMap[type];
  const selectFields = `  
    ${tableName}.*,  
    JSON_OBJECT('uId', users.uId, 'name', users.name, 'phone', users.phone, 'sex', users.sex, 'avatar', users.avatar) AS userInfo,  
    (EXISTS (SELECT 1 FROM ${collection} A WHERE A.uId = ? AND A.mId = ${tableName}.id)) AS collection  
  `;
  return { tableName, selectFields };
};

// 获取留言内容
const getContainer = (req, res) => {
  const { type, index } = req.query;
  let startIndex = index;
  let limit = 20;

  try {
    startIndex = parseInt(req.query.index, 10) || 0;
    const { tableName, selectFields } = getSafeTableAndFields(type);
    const sql = `  
      SELECT ${selectFields}  
      FROM ${tableName}  
      JOIN users ON ${tableName}.uId = users.uId  
      ORDER BY ${tableName}.createdAt DESC  
      LIMIT ?, ?  
    `;
    const params = [req.query.uId, startIndex, limit];
    executeQuery(req, res, sql, params);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// 收藏
const collection = (req, res) => {
  const { type, uId, id } = req.body;
  let tableName;

  switch (type) {
    case "text":
      tableName = "fontcollection";
      break;
    case "image":
      tableName = "graphiccollection";
      break;
    default:
      return res.status(400).json({ message: "Invalid type", type: "error", status: false });
  }

  const sql = `INSERT INTO ${tableName} (uId, mId) VALUES (?, ?)`;

  connection.query(sql, [uId, id], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(200).json({ message: "您已经收藏过啦~", type: "warning", status: false });
      }
      return res.status(500).json({ message: "数据库操作失败", type: "error", status: false });
    }
    res.status(200).json({ message: "收藏成功", type: "success", status: true });
  });
};

// 取消收藏
const CancelCollection = (req, res) => {
  const { type, uId, id } = req.body;
  let tableName;
  switch (type) {
    case "text":
      tableName = "fontcollection";
      break;
    case "image":
      tableName = "graphiccollection";
      break;
    default:
      return res.status(400).json({ message: "Invalid type", type: "error", status: false });
  }
  const sql = `DELETE FROM ${tableName} WHERE uId = ? AND mId = ?`;

  connection.query(sql, [uId, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "数据库操作失败", type: "error", status: false });
    }
    if (result.affectedRows === 0) {
      return res.status(200).json({ message: "您还未收藏过该内容", type: "warning", status: false });
    }
    res.status(200).json({ message: "取消收藏成功", type: "success", status: true });
  });
};

module.exports = {
  getContainer,
  collection,
  CancelCollection,
};
