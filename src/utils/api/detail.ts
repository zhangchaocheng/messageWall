import service from "./_config"

// 获取评论
export async function getComment(uId: number) {
  return await service.post("/api/getComment", uId)
}

// 获取回复
export async function getReply(data: object) {
  return await service.post("/api/getReply", data)
}

// 回复
export async function replyOrComment(data: object) {
  return await service.post("/api/replyOrComment", data)
}