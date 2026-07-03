"use client";

import { Card, Skeleton, Typography, Breadcrumb } from "antd";
import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import CartEmpty from "@/components/cart/CartEmpty";
import Link from "next/link";

const { Title, Text } = Typography;

function CartSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 16,
            padding: "20px 0",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <Skeleton.Image active style={{ width: 96, height: 96, borderRadius: 10 }} />
          <div style={{ flex: 1 }}>
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CartContent() {
  const { cart, loading } = useCart();
  const items = cart?.items ?? [];

  return (
    <div className="max-w-9xl mx-auto pt-8 px-6 pb-16">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-6 flex items-center justify-center"
        items={[
          {
            title: (
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#64748b",
                  fontWeight: 500,
                  fontSize: 14,
                  padding: "4px 8px",
                  borderRadius: 6,
                  transition: "all 0.2s ease",
                }}
              >
                <span className="relative top-0.5">หน้าหลัก</span>
              </Link>
            ),
          },
          {
            title: (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#0f172a",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <span className="relative top-0.5">ตะกร้าสินค้า</span>
              </span>
            ),
          },
        ]}
      />

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          {/* <Title level={2} style={{ margin: 0, color: "#0f172a" }}>
            ตะกร้าสินค้า
          </Title> */}
          {!loading && items.length > 0 && (
            <span
              style={{
                background: "#2563eb",
                color: "#fff",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                padding: "2px 10px",
                lineHeight: "20px",
              }}
            >
              {items.reduce((acc, i) => acc + i.quantity, 0)} ชิ้น
            </span>
          )}
        </div>
        {!loading && items.length > 0 && (
          <Text style={{ color: "#64748b" }}>
            ตรวจสอบสินค้าและดำเนินการชำระเงิน
          </Text>
        )}
      </div>

      {loading ? (
        /* Loading skeleton layout */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 24,
            alignItems: "start",
          }}
          className="cart-grid"
        >
          <Card style={{ borderRadius: 16, border: "1px solid #e2e8f0" }}>
            <CartSkeleton />
          </Card>
          <Card style={{ borderRadius: 16, border: "1px solid #e2e8f0" }}>
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
        </div>
      ) : items.length === 0 ? (
        /* Empty state */
        <Card style={{ borderRadius: 16, border: "1px solid #e2e8f0" }}>
          <CartEmpty />
        </Card>
      ) : (
        /* Cart with items */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 24,
            alignItems: "start",
          }}
          className="cart-grid"
        >
          {/* Cart Items */}
          <Card
            style={{ borderRadius: 16, border: "1px solid #e2e8f0" }}
            styles={{ body: { padding: "8px 24px 16px" } }}
          >
            <div>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          </Card>

          {/* Summary */}
          <CartSummary />
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
