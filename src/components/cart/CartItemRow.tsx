"use client";

import Link from "next/link";
import { App, Button, InputNumber, Tag, Typography, Tooltip } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import type { CartItem as CartItemType } from "@/types/cart.types";
import { useCart } from "@/context/CartContext";

const { Text } = Typography;

interface CartItemProps {
  item: CartItemType;
}

export default function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, mutating } = useCart();
  const { message } = App.useApp();

  const product = item.product;
  const primaryImage = product?.images?.find((img) => img.isPrimary) ?? product?.images?.[0];
  const unitPrice = item.priceSnapshot ?? product?.price ?? 0;
  const subtotal = unitPrice * item.quantity;

  async function handleQuantityChange(value: number | null) {
    if (!value || value === item.quantity) return;
    try {
      await updateQuantity(item.productId, value);
    } catch {
      message.error("ไม่สามารถอัปเดตจำนวนได้");
    }
  }

  async function handleRemove() {
    try {
      await removeFromCart(item.productId);
      message.success(`ลบ "${product?.name}" ออกจากตะกร้าแล้ว`);
    } catch {
      message.error("ไม่สามารถลบสินค้าได้");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "20px 0",
        borderBottom: "1px solid #f1f5f9",
        alignItems: "flex-start",
      }}
    >
      {/* รูปสินค้า */}
      <Link href={`/products/${product?.slug ?? ""}`} style={{ flexShrink: 0 }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 10,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}
        >
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={primaryImage.altText || product?.name}
              style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }}
            />
          ) : (
            <span style={{ fontSize: 32, color: "#cbd5e1" }}>📦</span>
          )}
        </div>
      </Link>

      {/* รายละเอียด */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={{
            fontSize: 11,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            display: "block",
            marginBottom: 4,
          }}
        >
          {product?.category?.name ?? product?.brand?.name ?? ""}
        </Text>
        <Link href={`/products/${product?.slug ?? ""}`}>
          <div
            title={product?.name}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#0f172a",
              lineHeight: 1.45,
              marginBottom: 8,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product?.name}
          </div>
        </Link>

        {/* ราคาต่อหน่วย */}
        <Text style={{ fontSize: 13, color: "#64748b" }}>
          ฿{unitPrice.toLocaleString()} / ชิ้น
        </Text>

        {/* ควบคุมจำนวน + ราคารวม (mobile: stack) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {/* Quantity controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Button
              size="small"
              icon={<MinusOutlined />}
              disabled={mutating || item.quantity <= 1}
              onClick={() => handleQuantityChange(item.quantity - 1)}
              style={{ borderRadius: 7, width: 32, height: 32, padding: 0 }}
            />
            <InputNumber
              min={1}
              max={99}
              value={item.quantity}
              onChange={handleQuantityChange}
              disabled={mutating}
              controls={false}
              style={{
                width: 52,
                textAlign: "center",
                borderRadius: 7,
                fontWeight: 600,
              }}
            />
            <Button
              size="small"
              icon={<PlusOutlined />}
              disabled={mutating || item.quantity >= 99}
              onClick={() => handleQuantityChange(item.quantity + 1)}
              style={{ borderRadius: 7, width: 32, height: 32, padding: 0 }}
            />
          </div>

          {/* ราคารวม + ปุ่มลบ */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Text strong style={{ fontSize: 16, color: "#0f172a" }}>
              ฿{subtotal.toLocaleString()}
            </Text>
            <Tooltip title="ลบออกจากตะกร้า">
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={handleRemove}
                disabled={mutating}
                style={{ borderRadius: 7, width: 32, height: 32, padding: 0 }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
