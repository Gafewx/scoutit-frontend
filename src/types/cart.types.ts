import type { Product } from "./product.types";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
