"use client";

import { useState } from "react";
import { App, Button, Typography } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product.types";

const { Text } = Typography;

interface ProductAddToCartProps {
  product: Product;
}

export default function ProductAddToCart({ product }: ProductAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { message } = App.useApp();

  const stock = product.stockQty ?? product.totalStock ?? 0;
  const inStock = stock > 0;

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantity((q) => Math.min(stock || Infinity, q + 1));
  }

  async function handleAddToCart() {
    try {
      await addToCart(product.id, quantity);
      message.success({
        content: `เพิ่ม "${product.name}" จำนวน ${quantity} ชิ้นลงตะกร้าแล้ว`,
        icon: <CheckCircleFilled className="!text-green-500" />,
        duration: 3,
      });
    } catch {
      message.error("ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่");
    }
  }

  return (
    <section aria-label="เพิ่มสินค้าลงตะกร้า">
      <div className="flex flex-col gap-6">
        {/* Quantity stepper */}
        <div>
          <Text className="!text-xs !font-semibold !text-slate-500 uppercase tracking-widest block mb-2">
            จำนวน
          </Text>

          {/* Pill stepper: − [count] + */}
          <div
            className={[
              "inline-flex items-center gap-0 rounded-full border select-none",
              "bg-white border-slate-200 shadow-sm",
              !inStock ? "opacity-40 pointer-events-none" : "",
            ].join(" ")}
          >
            {/* Minus button */}
            <button
              type="button"
              id={`qty-dec-${product.id}`}
              onClick={decrement}
              disabled={quantity <= 1}
              aria-label="ลดจำนวน"
              className={[
                "w-9 h-9 flex items-center justify-center rounded-full",
                "text-slate-500 text-lg font-medium",
                "transition-colors duration-150",
                quantity <= 1
                  ? "text-slate-300 cursor-not-allowed"
                  : "hover:bg-slate-100 active:bg-slate-200 cursor-pointer",
              ].join(" ")}
            >
              −
            </button>

            {/* Count display */}
            <span className="w-8 text-center text-sm font-semibold text-slate-800 tabular-nums">
              {quantity}
            </span>

            {/* Plus button */}
            <button
              type="button"
              id={`qty-inc-${product.id}`}
              onClick={increment}
              disabled={stock > 0 && quantity >= stock}
              aria-label="เพิ่มจำนวน"
              className={[
                "w-9 h-9 flex items-center justify-center rounded-full",
                "text-slate-500 text-lg font-medium",
                "transition-colors duration-150",
                stock > 0 && quantity >= stock
                  ? "text-slate-300 cursor-not-allowed"
                  : "hover:bg-slate-100 active:bg-slate-200 cursor-pointer",
              ].join(" ")}
            >
              +
            </button>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-row items-center gap-2.5 mt-4 w-82">
          {/* Primary: Add to Cart */}
          <Button
            id={`add-to-cart-${product.id}`}
            type="primary"
            size="large"
            disabled={!inStock}
            onClick={handleAddToCart}
            className={[
              "!h-13 !rounded-xl !font-bold !text-base cta-pulse",
              "!transition-all !duration-200",
              inStock
                ? "!bg-gradient-to-r !from-blue-600 !to-cyan-500 !border-0 hover:!from-blue-700 hover:!to-cyan-600 !shadow-md hover:!shadow-lg"
                : "!bg-slate-300 !border-slate-300 !text-slate-500",
            ].join(" ")}
            block
          >
            {inStock ? "ใส่ตะกร้า" : "สินค้าหมด"}
          </Button>
          {inStock && (
            <Text className="!text-xs !text-slate-400 text-center whitespace-nowrap">
              มีสินค้าคงเหลือ {stock} ชิ้น
            </Text>
          )}
        </div>
      </div>
    </section>
  );
}
