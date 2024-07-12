export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  flatRate?: number;
  flateCount?: number;
  rating: {
    rate: number;
    count: number;
  };
}
