"use client";

import Link from "next/link";
import { Button, Result } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

export default function CartEmpty() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      {/* <div style={{ fontSize: 72, marginBottom: 16, lineHeight: 1 }}>🛒</div> */}
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#0f172a",
          margin: "0 0 8px",
        }}
      >
        ตะกร้าของคุณว่างเปล่า
      </h2>
      <p style={{ color: "#64748b", fontSize: 15, margin: "0 0 28px", maxWidth: 320 }}>
        เริ่มช้อปปิ้งและเพิ่มสินค้าที่คุณชอบลงในตะกร้าได้เลย!
      </p>
      <Link href="/products">
        <Button
          type="primary"
          size="large"
          icon={<ShoppingOutlined />}
          style={{
            background: "#2563eb",
            borderColor: "#2563eb",
            borderRadius: 10,
            fontWeight: 700,
            height: 48,
            paddingInline: 32,
          }}
        >
          ไปช้อปสินค้า
        </Button>
      </Link>
    </div>
  );
}
