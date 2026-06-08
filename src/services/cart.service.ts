import { api } from "./api";
import type { Cart } from "@/types/cart.types";
import type { ApiResponse } from "@/types/api.types";

export const cartService = {
  getCart(): Promise<ApiResponse<Cart>> {
    return api.get<Cart>("/cart");
  },

  addItem(productId: string, quantity: number): Promise<ApiResponse<Cart>> {
    return api.post<Cart>("/cart/items", { productId, quantity });
  },

  updateItem(productId: string, quantity: number): Promise<ApiResponse<Cart>> {
    return api.patch<Cart>(`/cart/items/${productId}`, { quantity });
  },

  removeItem(productId: string): Promise<ApiResponse<Cart>> {
    return api.delete<Cart>(`/cart/items/${productId}`);
  },

  clearCart(): Promise<ApiResponse<void>> {
    return api.delete<void>("/cart");
  },
};
