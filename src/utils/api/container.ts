// import axios from "axios";
import service from './_config';

export async function getWallsCard(index: number, type: string, uId: number) {
  return await service.get("/api/getContainer?index=" + index + "&type=" + type + "&uId=" + uId);
}

// 收藏
export async function collection(id: number, uId: number, type: string) {
  return await service.post("/api/collection", { id, uId, type })
}

// 取消收藏
export async function cancelCollection(id: number, uId: number, type: string) {
  return await service.post("/api/cancelCollection", { id, uId, type })
}