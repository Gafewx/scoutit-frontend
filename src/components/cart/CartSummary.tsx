"use client";

import Link from "next/link";
import { App, Button, Card, Divider, Typography } from "antd";
import {
  ShoppingOutlined,
  DeleteOutlined,
  RightOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { useCart } from "@/context/CartContext";

const { Text, Title } = Typography;

export default function CartSummary() {
  const { cart, clearCart, mutating } = useCart();
  const { modal } = App.useApp();

  const items = cart?.items ?? [];
  const subtotal = items.reduce(
    (acc, item) => acc + (item.priceSnapshot ?? item.product?.price ?? 0) * item.quantity,
    0,
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // Shipping logic (free ถ้าเกิน 1,000)
  const SHIPPING_THRESHOLD = 1000;
  const SHIPPING_FEE = 60;
  const shippingFee = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  function handleClearCart() {
    modal.confirm({
      title: "ล้างตะกร้าสินค้า",
      content: "คุณต้องการลบสินค้าทั้งหมดออกจากตะกร้าใช่หรือไม่?",
      okText: "ล้างตะกร้า",
      okButtonProps: { danger: true },
      cancelText: "ยกเลิก",
      onOk: async () => {
        await clearCart();
      },
    });
  }

  return (
    <Card
      style={{
        borderRadius: 16,
        border: "1px solid #e2e8f0",
        position: "sticky",
        top: 88,
      }}
      styles={{ body: { padding: "24px" } }}
    >
      <Title level={5} style={{ margin: "0 0 20px", color: "#0f172a" }}>
        สรุปคำสั่งซื้อ
      </Title>

      {/* รายการ */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text style={{ color: "#64748b" }}>ราคาสินค้า ({totalItems} ชิ้น)</Text>
          <Text style={{ color: "#0f172a", fontWeight: 500 }}>฿{subtotal.toLocaleString()}</Text>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text style={{ color: "#64748b" }}>ค่าจัดส่ง</Text>
          {shippingFee === 0 ? (
            <Text style={{ color: "#16a34a", fontWeight: 600 }}>ฟรี!</Text>
          ) : (
            <Text style={{ color: "#0f172a", fontWeight: 500 }}>฿{shippingFee}</Text>
          )}
        </div>

        {/* Free shipping progress */}
        {shippingFee > 0 && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 8,
              padding: "8px 12px",
              marginTop: 4,
            }}
          >
            <Text style={{ fontSize: 12, color: "#16a34a" }}>
              ซื้อเพิ่มอีก ฿{(SHIPPING_THRESHOLD - subtotal).toLocaleString()} เพื่อส่งฟรี!
            </Text>
          </div>
        )}
      </div>

      <Divider style={{ margin: "16px 0" }} />

      {/* ยอดรวม */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <Text strong style={{ fontSize: 16, color: "#0f172a" }}>
          ยอดรวมทั้งหมด
        </Text>
        <Text strong style={{ fontSize: 20, color: "#2563eb" }}>
          ฿{total.toLocaleString()}
        </Text>
      </div>

      {/* Checkout Button */}
      <Link href="/checkout">
        <Button
          type="primary"
          block
          size="large"
          className="add-cart-btn"
          // icon={<RightOutlined />}
          disabled={items.length === 0}
          style={{
            background: "#2563eb",
            borderColor: "#2563eb",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 15,
            height: 48,
            marginBottom: 12,
          }}
        >
          ดำเนินการชำระเงิน
        </Button>
      </Link>

      <Link href="/products">
        <Button
          block
          className="add-cart-btn"
          // icon={<ShoppingOutlined />}
          style={{
            borderRadius: 10,
            fontWeight: 600,
            height: 40,
            color: "#64748b",
            borderColor: "#e2e8f0",
          }}
        >
          ช้อปต่อ
        </Button>
      </Link>

      {/* ล้างตะกร้า */}
      {items.length > 0 && (
        <>
          <Divider style={{ margin: "16px 0" }} />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleClearCart}
            loading={mutating}
            block
            style={{ fontSize: 13 }}
          >
            ล้างตะกร้าทั้งหมด
          </Button>
        </>
      )}

      {/* Trust badges */}
      {/* <Divider style={{ margin: "16px 0" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          "🔒 ชำระเงินปลอดภัย SSL",
          "📦 จัดส่งภายใน 1-3 วันทำการ",
          "🔄 คืนสินค้าได้ภายใน 7 วัน",
        ].map((text) => (
          <Text key={text} style={{ fontSize: 12, color: "#94a3b8", display: "flex", gap: 6 }}>
            {text}
          </Text>
        ))}
      </div> */}
    </Card>
  );
}
