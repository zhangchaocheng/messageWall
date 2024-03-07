import service from "./_config";

export async function register(data: object) {
  return await service.post("/api/Register", data);
}