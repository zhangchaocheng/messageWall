/*
Navicat Premium Data Transfer
Source Server         : root
Source Server Type    : MySQL
Source Server Version : 80036
Source Host           : localhost:3306
Source Schema         : wall
Target Server Type    : MySQL
Target Server Version : 80036
File Encoding         : 65001
Date: 07/03/2024 23:15:58
*/







-- -------------------------------
-- 注意:运行前请检查MySQL是否需要备份，以免清除重要数据。
-- -------------------------------








SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'id', `discussWho` int NOT NULL COMMENT '留言id', `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '评论内容', `createdAt` date NOT NULL COMMENT '评论时间', `uId` int NOT NULL COMMENT '评论用户', PRIMARY KEY (`id`) USING BTREE, INDEX `评论关联人` (`uId` ASC) USING BTREE, INDEX `评论的文章` (`discussWho` ASC) USING BTREE, CONSTRAINT `评论关联人` FOREIGN KEY (`uId`) REFERENCES `users` (`uId`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `评论的文章` FOREIGN KEY (`discussWho`) REFERENCES `fontwall` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for comment_graphic
-- ----------------------------
DROP TABLE IF EXISTS `comment_graphic`;

CREATE TABLE `comment_graphic` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'id', `discussWho` int NOT NULL COMMENT '留言id', `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '评论内容', `createdAt` date NOT NULL COMMENT '评论时间', `uId` int NOT NULL COMMENT '评论用户', PRIMARY KEY (`id`) USING BTREE, INDEX `评论关联人` (`uId` ASC) USING BTREE, INDEX `评论的文章` (`discussWho` ASC) USING BTREE, CONSTRAINT `关联图文留言id` FOREIGN KEY (`discussWho`) REFERENCES `graphicwall` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `关联图文留言用户uId` FOREIGN KEY (`uId`) REFERENCES `users` (`uId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for fontcollection
-- ----------------------------
DROP TABLE IF EXISTS `fontcollection`;

CREATE TABLE `fontcollection` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT '收藏id', `uId` int NOT NULL COMMENT '用户Id', `mId` int NOT NULL COMMENT '留言id', PRIMARY KEY (`id`) USING BTREE, INDEX `收藏关联用户ID` (`uId` ASC) USING BTREE, INDEX `收藏关联文字留言` (`mId` ASC) USING BTREE, CONSTRAINT `收藏关联文字留言` FOREIGN KEY (`mId`) REFERENCES `fontwall` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `收藏关联用户ID` FOREIGN KEY (`uId`) REFERENCES `users` (`uId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for fontwall
-- ----------------------------
DROP TABLE IF EXISTS `fontwall`;

CREATE TABLE `fontwall` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT '留言ID', `type` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '留言类型', `title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '留言标题', `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '留言内容', `createdAt` date NOT NULL COMMENT '留言时间', `itemColor` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '留言背景颜色', `uId` int NOT NULL COMMENT '发布留言用户', PRIMARY KEY (`id`, `uId`) USING BTREE, INDEX `发布人` (`uId` ASC) USING BTREE, INDEX `id` (`id` ASC) USING BTREE, CONSTRAINT `发布人` FOREIGN KEY (`uId`) REFERENCES `users` (`uId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1000034 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for graphiccollection
-- ----------------------------
DROP TABLE IF EXISTS `graphiccollection`;

CREATE TABLE `graphiccollection` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT '收藏id', `uId` int NOT NULL COMMENT '用户Id', `mId` int NOT NULL COMMENT '留言id', PRIMARY KEY (`id`) USING BTREE, INDEX `收藏关联用户ID` (`uId` ASC) USING BTREE, INDEX `收藏关联文字留言` (`mId` ASC) USING BTREE, CONSTRAINT `graphiccollection_ibfk_2` FOREIGN KEY (`uId`) REFERENCES `users` (`uId`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `graphiccollection关联留言id` FOREIGN KEY (`mId`) REFERENCES `graphicwall` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for graphicwall
-- ----------------------------
DROP TABLE IF EXISTS `graphicwall`;

CREATE TABLE `graphicwall` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT '留言ID', `type` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '留言类型', `title` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '留言标题', `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '留言内容', `createdAt` date NOT NULL COMMENT '留言时间', `uId` int NOT NULL COMMENT '发布留言用户', `images` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '发布图片(使用\\\\分割)', PRIMARY KEY (`id`, `uId`) USING BTREE, INDEX `关联用户uId` (`uId` ASC) USING BTREE, INDEX `id` (`id` ASC) USING BTREE, CONSTRAINT `关联用户uId` FOREIGN KEY (`uId`) REFERENCES `users` (`uId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 100009 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;

CREATE TABLE `reply` (
    `id` int NOT NULL COMMENT '回复id', `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '回复内容', `uId` int NOT NULL COMMENT '回复人', `commentId` int NOT NULL COMMENT '回复关联评论id', `createdAt` date NOT NULL COMMENT '回复的时间', `callUser` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '@的用户', INDEX `关联用户id` (`uId` ASC) USING BTREE, INDEX `关联评论id` (`commentId` ASC) USING BTREE, INDEX `关联留言` (`id` ASC) USING BTREE, INDEX `@的用户` (`callUser` ASC) USING BTREE, CONSTRAINT `关联用户id` FOREIGN KEY (`uId`) REFERENCES `users` (`uId`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `关联留言` FOREIGN KEY (`id`) REFERENCES `fontwall` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `关联评论id` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for reply_graphic
-- ----------------------------
DROP TABLE IF EXISTS `reply_graphic`;

CREATE TABLE `reply_graphic` (
    `id` int NOT NULL COMMENT '回复id', `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '回复内容', `uId` int NOT NULL COMMENT '回复人', `commentId` int NOT NULL COMMENT '回复关联评论id', `createdAt` date NOT NULL COMMENT '回复的时间', `callUser` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '@的用户', INDEX `关联用户id` (`uId` ASC) USING BTREE, INDEX `关联评论id` (`commentId` ASC) USING BTREE, INDEX `关联留言` (`id` ASC) USING BTREE, INDEX `@的用户` (`callUser` ASC) USING BTREE, CONSTRAINT `回复_关联用户id` FOREIGN KEY (`uId`) REFERENCES `users` (`uId`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `回复_关联留言` FOREIGN KEY (`id`) REFERENCES `graphicwall` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT `回复_关联评论id` FOREIGN KEY (`commentId`) REFERENCES `comment_graphic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `uId` int NOT NULL AUTO_INCREMENT COMMENT '用户ID', `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户名', `phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户电话', `sex` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户性别', `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '用户头像', `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户密码', PRIMARY KEY (`uId`, `phone`) USING BTREE, INDEX `uId` (`uId` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;