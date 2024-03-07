// app.js
const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");
const path = require("path");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images"); // 确保这个目录存在
    },
    filename: (req, file, cb) => {
      const newFilename = `${Date.now()}-${file.originalname}`;
      cb(null, newFilename);
    },
  }),
  limits: {
    // 限制文件大小为 5 MB
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    }

    cb("Error: Images only (jpeg, jpg, png, gif)", false);
  },
});

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// 路由处理逻辑
app.use("/api", routes);

// 托管./images下的所有图片
app.use("/images", express.static("./images"));

// 上传图片接口，将图片重命名（避免重复）后存放在路径../images文件夹下，并且返回重命名好的访问名
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded." });
  }

  if (req.file.error) {
    return res.status(500).send({ error: req.file.error });
  }

  res.send({ url: `http://${config.url}:${config.port}/images/${req.file.filename}` });
});

// 启动服务
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});