"use client";

import { Button, Checkbox, Collapse, InputNumber, Slider, Typography } from "antd";
import { FilterOutlined, ClearOutlined } from "@ant-design/icons";
import type { ProductFilters } from "@/types/product.types";

const { Text } = Typography;

interface FilterSidebarProps {
  filters: ProductFilters;
  onChange: (filters: Partial<ProductFilters>) => void;
  onClear: () => void;
  categories?: { id: string; name: string; slug: string }[];
  brands?: string[];
  loading?: boolean;
}

const PRICE_MIN = 0;
const PRICE_MAX = 200000;

const defaultBrands = [
  "ASUS", "MSI", "Lenovo", "HP", "Dell", "Acer", "Apple",
  "Samsung", "LG", "NVIDIA", "AMD", "Intel", "Corsair", "Logitech",
];

export default function FilterSidebar({
  filters,
  onChange,
  onClear,
  categories = [],
  brands = defaultBrands,
  loading = false,
}: FilterSidebarProps) {
  const hasActiveFilters =
    !!filters.category || !!filters.brand || !!filters.minPrice || !!filters.maxPrice || !!filters.search;

  const priceRange: [number, number] = [
    filters.minPrice ?? PRICE_MIN,
    filters.maxPrice ?? PRICE_MAX,
  ];

  return (
    <aside
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 20,
        position: "sticky",
        top: 88,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FilterOutlined style={{ color: "#2563eb" }} />
          <Text strong style={{ fontSize: 15, color: "#0f172a" }}>
            ตัวกรอง
          </Text>
          {hasActiveFilters && (
            <span
              style={{
                background: "#2563eb",
                color: "#fff",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                padding: "1px 7px",
              }}
            >
              {[filters.category, filters.brand, filters.minPrice, filters.maxPrice].filter(Boolean).length}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            type="text"
            size="small"
            icon={<ClearOutlined />}
            onClick={onClear}
            style={{ color: "#64748b", fontSize: 12 }}
            disabled={loading}
          >
            ล้างทั้งหมด
          </Button>
        )}
      </div>

      <Collapse
        ghost
        defaultActiveKey={["categories", "brands", "price"]}
        style={{ margin: "0 -8px" }}
        items={[
          /* ─ Categories ─ */
          ...(categories.length > 0
            ? [
              {
                key: "categories",
                label: <Text strong style={{ fontSize: 13, color: "#0f172a" }}>หมวดหมู่</Text>,
                children: (
                  <div className="flex flex-col gap-2 pt-1">
                    {categories.map((cat) => (
                      <Checkbox
                        key={cat.id}
                        checked={filters.category === cat.slug}
                        disabled={loading}
                        onChange={(e) =>
                          onChange({ category: e.target.checked ? cat.slug : undefined, page: 1 })
                        }
                      >
                        <Text style={{ fontSize: 13, color: "#334155" }}>{cat.name}</Text>
                      </Checkbox>
                    ))}
                  </div>
                ),
              },
            ]
            : []),

          /* ─ Brands ─ */
          {
            key: "brands",
            label: <Text strong style={{ fontSize: 13, color: "#0f172a" }}>แบรนด์</Text>,
            children: (
              <div className="flex flex-col gap-2 pt-1 max-h-52 overflow-y-auto pr-1">
                {brands.map((brand) => (
                  <Checkbox
                    key={brand}
                    checked={filters.brand === brand}
                    disabled={loading}
                    onChange={(e) =>
                      onChange({ brand: e.target.checked ? brand : undefined, page: 1 })
                    }
                  >
                    <Text style={{ fontSize: 13, color: "#334155" }}>{brand}</Text>
                  </Checkbox>
                ))}
              </div>
            ),
          },

          /* ─ Price Range ─ */
          {
            key: "price",
            label: <Text strong style={{ fontSize: 13, color: "#0f172a" }}>ช่วงราคา</Text>,
            children: (
              <div className="pt-2">
                <Slider
                  range
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={500}
                  value={priceRange}
                  disabled={loading}
                  onChange={(val) =>
                    onChange({ minPrice: val[0] || undefined, maxPrice: val[1] === PRICE_MAX ? undefined : val[1], page: 1 })
                  }
                  styles={{
                    track: { background: "#2563eb" },
                    handle: { borderColor: "#2563eb" },
                  }}
                />
                <div className="flex items-center gap-2 mt-3">
                  <InputNumber
                    min={PRICE_MIN}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    disabled={loading}
                    formatter={(v) => `฿${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(v) => Number(v!.replace(/฿\s?|(,*)/g, ""))}
                    onChange={(v) => onChange({ minPrice: v ?? undefined, page: 1 })}
                    style={{ flex: 1, fontSize: 12 }}
                    size="small"
                  />
                  <span style={{ color: "#94a3b8", fontSize: 12 }}>–</span>
                  <InputNumber
                    min={priceRange[0]}
                    max={PRICE_MAX}
                    value={priceRange[1]}
                    disabled={loading}
                    formatter={(v) => `฿${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    parser={(v) => Number(v!.replace(/฿\s?|(,*)/g, ""))}
                    onChange={(v) => onChange({ maxPrice: v ?? undefined, page: 1 })}
                    style={{ flex: 1, fontSize: 12 }}
                    size="small"
                  />
                </div>
              </div>
            ),
          },

          /* ─ Stock ─ */
          {
            key: "stock",
            label: <Text strong style={{ fontSize: 13, color: "#0f172a" }}>สถานะสินค้า</Text>,
            children: (
              <div className="flex flex-col gap-2 pt-1">
                <Checkbox disabled={loading}>
                  <Text style={{ fontSize: 13, color: "#334155" }}>มีสินค้า</Text>
                </Checkbox>
                <Checkbox disabled={loading}>
                  <Text style={{ fontSize: 13, color: "#334155" }}>สินค้าแนะนำ</Text>
                </Checkbox>
                <Checkbox disabled={loading}>
                  <Text style={{ fontSize: 13, color: "#334155" }}>สินค้าลดราคา</Text>
                </Checkbox>
              </div>
            ),
          },
        ]}
      />
    </aside>
  );
}
