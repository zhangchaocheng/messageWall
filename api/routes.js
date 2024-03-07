const express = require("express");
const router = express.Router();
const { getContainer, collection, CancelCollection } = require("./modules/container");
const { login } = require("./modules/login");
const { addFontCard, addGraphicCard } = require("./modules/addCard");
const { getComment, getReply, replyOrComment } = require("./modules/detail");
const { register } = require("./modules/register");
const { getCollection } = require("./modules/PersonalCollection");

// 定义接口
router.get("/getContainer", getContainer); // 获取主页留言
router.post("/login", login); // 登录
router.post("/addFontCard", addFontCard); // 添加文字卡片
router.post("/addGraphicCard", addGraphicCard); // 添加图片卡片
router.post("/getComment", getComment); // 获取评论
router.post("/getReply", getReply); // 获取回复
router.post("/replyOrComment", replyOrComment); // 评论
router.post("/register", register); // 注册
router.post("/collection", collection); // 收藏
router.post("/CancelCollection", CancelCollection); // 取消收藏
router.get("/getCollection", getCollection); // 获取收藏

module.exports = router;
