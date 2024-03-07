const dbConnection = require("./_main");
const connection = dbConnection();

const getCollection = (req, res) => {
  const { uId } = req.query;
  let sql = `WITH user_wall_info AS (  
                SELECT  
                    fw.id,  
                    fw.type,  
                    fw.title,  
                    fw.content,  
                    fw.createdAt,  
                    fw.uId,  
                    fw.itemColor,  
                    us.uId AS user_uId,  
                    us.name AS user_name,  
                    us.sex AS user_sex,  
                    us.phone AS user_phone,  
                    us.avatar AS user_avatar,  
                    JSON_OBJECT(  
                        'id', fw.id,  
                        'type', fw.type,  
                        'title', fw.title,  
                        'content', fw.content,  
                        'createdAt', fw.createdAt,  
                        'uId', fw.uId,  
                        'itemColor', fw.itemColor,  
                        'user', JSON_OBJECT(  
                            'uId', us.uId,  
                            'name', us.name,  
                            'sex', us.sex,  
                            'phone', us.phone,  
                            'avatar', us.avatar  
                        )  
                    ) AS wall_info  
                FROM fontwall fw  
                LEFT JOIN users us ON fw.uId = us.uId  
                        
                UNION ALL
                        
                SELECT  
                    gw.id,  
                    gw.type,  
                    gw.title,  
                    gw.content,  
                    gw.createdAt,  
                    gw.uId,  
                    gw.images,  
                    us.uId AS user_uId,  
                    us.name AS user_name,  
                    us.sex AS user_sex,  
                    us.phone AS user_phone,  
                    us.avatar AS user_avatar,  
                    JSON_OBJECT(  
                        'id', gw.id,  
                        'type', gw.type,  
                        'title', gw.title,  
                        'content', gw.content,  
                        'createdAt', gw.createdAt,  
                        'uId', gw.uId,  
                        'images', gw.images,  
                        'user', JSON_OBJECT(  
                            'uId', us.uId,  
                            'name', us.name,  
                            'sex', us.sex,  
                            'phone', us.phone,  
                            'avatar', us.avatar  
                        )  
                    ) AS wall_info  
                FROM graphicwall gw  
                LEFT JOIN users us ON gw.uId = us.uId  
            ),  
            font_collection_info AS (  
                SELECT  
                    fc.*,  
                    uwi.wall_info  
                FROM fontcollection fc  
                LEFT JOIN user_wall_info uwi ON fc.mId = uwi.id AND fc.uId = uwi.user_uId  
            ),  
            graphic_collection_info AS (  
                SELECT  
                    gc.*,  
                    uwi.wall_info  
                FROM graphiccollection gc  
                LEFT JOIN user_wall_info uwi ON gc.mId = uwi.id AND gc.uId = uwi.user_uId  
            )  
              
            SELECT * FROM font_collection_info WHERE uId = ?  
            UNION  ALL
            SELECT * FROM graphic_collection_info WHERE uId = ?;`;

  // 执行查询
  connection.query(sql, [uId, uId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send({ error: "An error occurred" });
      return;
    }
    if (result.length === 0) {
      return res.status(200).json({ message: "Not found", content: false });
    }

    // 返回结果
    res.status(200).json({ data: result, content: true });
  });
};

module.exports = {
  getCollection,
};
