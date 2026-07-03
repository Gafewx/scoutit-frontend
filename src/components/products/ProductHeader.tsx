"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, Button, Input, Select, Typography } from "antd";
import {
  AppstoreFilled,
  BarsOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

type ViewMode = "grid" | "list";
type SortOption = "featured" | "newest" | "price_asc" | "price_desc";

interface ProductHeaderProps {
  totalCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  loading?: boolean;
}

const sortOptions = [
  { value: "featured", label: "แนะนำ" },
  { value: "newest", label: "ใหม่ล่าสุด" },
  { value: "price_asc", label: "ราคา: น้อย → มาก" },
  { value: "price_desc", label: "ราคา: มาก → น้อย" },
];

export default function ProductHeader({
  totalCount,
  viewMode,
  onViewModeChange,
  sort,
  onSortChange,
  loading = false,
}: ProductHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch() {
    const q = searchQuery.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="mb-6">
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
                <span className="relative top-0.5">สินค้าทั้งหมด</span>
              </span>
            ),
          },
        ]}
      />

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        {/* <div>
          <Title
            level={2}
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "#0f172a",
              margin: 0,
            }}
          >
            สินค้าทั้งหมด
          </Title>
          {!loading && (
            <Text style={{ color: "#64748b", marginTop: 4, display: "block", fontSize: 14 }}>
              พบ{" "}
              <span style={{ color: "#2563eb", fontWeight: 600 }}>
                {totalCount.toLocaleString()}
              </span>{" "}
              รายการ
            </Text>
          )}
        </div> */}

        {/* Controls row: Search + Sort + View toggle */}
        <div className="flex items-center gap-3 flex-wrap ml-auto">
          {/* Search */}
          <Input
            id="product-search"
            placeholder="ค้นหาสินค้า..."
            prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
            variant="filled"
            style={{ flex: 1, minWidth: 200, maxWidth: 360, borderRadius: 8 }}
            aria-label="ค้นหาสินค้า"
          />

          {/* Sort */}
          <Select
            value={sort}
            onChange={onSortChange}
            options={sortOptions}
            style={{ width: 180 }}
            size="middle"
            disabled={loading}
          />

          {/* View Toggle */}
          <div
            style={{
              display: "flex",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Button
              type={viewMode === "grid" ? "primary" : "text"}
              icon={<AppstoreFilled />}
              size="middle"
              onClick={() => onViewModeChange("grid")}
              style={{
                borderRadius: 0,
                border: "none",
                background: viewMode === "grid" ? "#0f172a" : "transparent",
              }}
              title="Grid view"
            />
            <Button
              type={viewMode === "list" ? "primary" : "text"}
              icon={<BarsOutlined />}
              size="middle"
              onClick={() => onViewModeChange("list")}
              style={{
                borderRadius: 0,
                border: "none",
                borderLeft: "1px solid #e2e8f0",
                background: viewMode === "list" ? "#0f172a" : "transparent",
              }}
              title="List view"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
