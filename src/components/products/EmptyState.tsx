"use client";

import Link from "next/link";
import { Button, Typography } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface EmptyStateProps {
  hasFilters?: boolean;
  searchQuery?: string;
  onClearFilters?: () => void;
}

export default function EmptyState({
  hasFilters = false,
  searchQuery,
  onClearFilters,
}: EmptyStateProps) {
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
      {/* Icon */}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          fontSize: 40,
        }}
      >
        <SearchOutlined style={{ color: "#94a3b8", fontSize: 36 }} />
      </div>

      <Title level={4} style={{ color: "#0f172a", margin: 0, marginBottom: 8 }}>
        {hasFilters || searchQuery ? "ไม่พบสินค้าที่ตรงกัน" : "ยังไม่มีสินค้า"}
      </Title>

      <Text style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, maxWidth: 360, display: "block", marginBottom: 28 }}>
        {searchQuery
          ? `ไม่พบผลลัพธ์สำหรับ "${searchQuery}" ลองเปลี่ยนคำค้นหาหรือล้างตัวกรอง`
          : hasFilters
            ? "ไม่มีสินค้าที่ตรงกับเงื่อนไขที่เลือก ลองเปลี่ยนหรือล้างตัวกรอง"
            : "สินค้าจะปรากฏที่นี่เมื่อมีการเพิ่มสินค้า"}
      </Text>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        {(hasFilters || searchQuery) && onClearFilters && (
          <Button
            icon={<ClearOutlined />}
            onClick={onClearFilters}
            style={{
              borderRadius: 8,
              fontWeight: 600,
              height: 40,
              paddingInline: 20,
            }}
          >
            ล้างตัวกรอง
          </Button>
        )}
        <Link href="/">
          <Button
            type="primary"
            className="add-cart-btn"
            style={{
              background: "#0f172a",
              borderColor: "#0f172a",
              borderRadius: 8,
              fontWeight: 600,
              height: 40,
              paddingInline: 20,
            }}
          >
            กลับหน้าหลัก
          </Button>
        </Link>
      </div>
    </div>
  );
}
