import service from "./_config";

export async function addFontCard(data: object) {
  return await service.post("/api/addFontCard", data)
}

export async function addGraphicCard(data: object) {
  return await service.post("/api/addGraphicCard", data)
}