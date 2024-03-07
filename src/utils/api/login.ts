import service from "./_config";

export async function login(data: object) {
  return await service.post('/api/login', data);
}