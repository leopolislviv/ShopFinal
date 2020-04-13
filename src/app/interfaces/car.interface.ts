export interface TShirt {
  id: number;
  article: string;
  // gender: string;
  brand: string;
  img: string;
  size: string[];
  color: string[];
  price: number;
  available: boolean;
  male: boolean;
  female: boolean;
}

export interface ICart {
  shirt: TShirt;
  quantity: number;
}