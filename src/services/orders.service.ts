import { api } from "./api";
import type { Order, CreateOrderPayload } from "@/types/order.types";
import type { ApiResponse } from "@/types/api.types";

export const ordersService = {
  create(payload: CreateOrderPayload): Promise<ApiResponse<Order>> {
    return api.post<Order>("/orders", payload);
  },

  getAll(): Promise<ApiResponse<Order[]>> {
    return api.get<Order[]>("/orders");
  },

  getById(id: string): Promise<ApiResponse<Order>> {
    return api.get<Order>(`/orders/${id}`);
  },
};
