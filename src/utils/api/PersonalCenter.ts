import service from "./_config";

export async function getCollection(uId: number) {
  return await service.get("/api/getCollection", { params: { uId } })
};