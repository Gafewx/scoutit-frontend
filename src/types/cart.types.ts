import type { Product } from "./product.types";

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  priceSnapshot: number; // ราคา ณ เวลาที่หยิบใส่ตะกร้า
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
