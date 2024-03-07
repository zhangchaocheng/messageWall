// 数据结构
export interface UserInfo {
  uId: number;
  name: string;
  avatar: string;
  sex: number;
}

export interface Discuss {
  discussWho: number;
  id: number;
  content: string;
  createdAt: string;
  userInfo: UserInfo;
}

export interface containerData {
  id: number;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  itemColor: string;
  userInfo: UserInfo;
  discuss?: Discuss[]; // 修改这里的类型为 Discuss[]
}