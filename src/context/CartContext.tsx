"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cartService } from "@/services/cart.service";
import type { Cart } from "@/types/cart.types";

// ─── Context shape ────────────────────────────────────────────────────────────

interface CartContextValue {
  cart: Cart | null;
  totalItems: number;
  loading: boolean;
  mutating: boolean; // กำลัง add/remove/update item
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await cartService.getCart();
      setCart(res.data);
    } catch {
      // ไม่ login หรือ cart ยังไม่มี – ไม่ต้องแสดง error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(
    async (productId: string, quantity = 1): Promise<void> => {
      setMutating(true);
      try {
        const res = await cartService.addItem(productId, quantity);
        setCart(res.data);
      } finally {
        setMutating(false);
      }
    },
    [],
  );

  const removeFromCart = useCallback(async (productId: string): Promise<void> => {
    setMutating(true);
    try {
      const res = await cartService.removeItem(productId);
      setCart(res.data);
    } finally {
      setMutating(false);
    }
  }, []);

  const updateQuantity = useCallback(
    async (productId: string, quantity: number): Promise<void> => {
      if (quantity <= 0) {
        return removeFromCart(productId);
      }
      setMutating(true);
      try {
        const res = await cartService.updateItem(productId, quantity);
        setCart(res.data);
      } finally {
        setMutating(false);
      }
    },
    [removeFromCart],
  );

  const clearCart = useCallback(async (): Promise<void> => {
    setMutating(true);
    try {
      await cartService.clearCart();
      setCart((prev) => (prev ? { ...prev, items: [], totalItems: 0, totalPrice: 0 } : null));
    } finally {
      setMutating(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems: cart?.items?.length ?? 0,
        loading,
        mutating,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
