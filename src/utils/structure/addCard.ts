export interface FontCardRules {
  title: string;
  type: string;
  content: string;
  createdAt: Date | string;
  itemColor: string;
  uId: number | null;
}
export interface GraphicCard {
  title: string;
  type: string;
  content: string;
  createdAt: Date | string;
  uId: number | null;
  images: string;
}