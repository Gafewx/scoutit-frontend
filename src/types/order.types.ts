import type { CartItem } from "./cart.types";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  productSku: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  notes?: string;
}
