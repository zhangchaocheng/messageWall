const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key"; // 用于签名的密钥，请替换为实际值，并确保在生产环境中保密
const EXPIRATION_TIME = "1h"; // 短token的过期时间
const REFRESH_EXPIRATION_TIME = "24h"; // 长token的过期时间

// 存储token的对象，模拟数据库或缓存存储
const tokenStorage = {};

// 生成token
function generateTokens(userId) {
  const payloadShort = { userId, exp: Math.floor(Date.now() / 1000) + 60 * 1 }; // 短token
  const payloadRefresh = { userId, exp: Math.floor(Date.now() / 1000) + 60 * 2 }; // 长token

  const tokenShort = jwt.sign(payloadShort, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
  const tokenRefresh = jwt.sign(payloadRefresh, SECRET_KEY, { expiresIn: REFRESH_EXPIRATION_TIME });

  // 存储token
  tokenStorage[userId] = { tokenShort, tokenRefresh };

  return { tokenShort, tokenRefresh };
}

// 验证token是否过期
function verifyToken(userId, token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return true; // token未过期
  } catch (err) {
    return false; // token已过期或无效
  }
}

// 使用长token刷新短token
function refreshToken(userId, tokenRefresh) {
  try {
    const decoded = jwt.verify(tokenRefresh, SECRET_KEY);
    if (decoded.exp * 1000 < Date.now()) {
      throw new Error("Refresh token has expired");
    }

    // 生成新的短token
    const { tokenShort } = generateTokens(userId);

    // 更新存储中的token
    tokenStorage[userId] = { tokenShort, tokenRefresh };

    return tokenShort;
  } catch (err) {
    throw new Error("Refresh token failed");
  }
}

// 获取用户token
function getTokens(userId) {
  return tokenStorage[userId] || null;
}

// 暴露接口
module.exports = {
  generateTokens,
  verifyToken,
  refreshToken,
  getTokens,
};
