"use client";

import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import type { ProductFilters } from "@/types/product.types";
import type { ViewMode, SortOption } from "@/hooks/useProducts";

import ProductHeader from "@/components/products/ProductHeader";
import FilterSidebar from "@/components/products/FilterSidebar";
import MobileFilterDrawer from "@/components/products/MobileFilterDrawer";
import ProductsContent from "@/components/products/ProductsContent";
import type { Product } from "@/types/product.types";

interface ProductsLayoutProps {
  // Data
  products: Product[];
  totalCount: number;
  loading: boolean;

  // Filter / UI state
  filters: ProductFilters;
  viewMode: ViewMode;
  mobileFilterOpen: boolean;

  // Handlers
  onViewModeChange: (mode: ViewMode) => void;
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (partial: Partial<ProductFilters>) => void;
  onClearFilters: () => void;
  onPageChange: (page: number, pageSize: number) => void;
  onMobileFilterOpen: (open: boolean) => void;
}

export default function ProductsLayout({
  products,
  totalCount,
  loading,
  filters,
  viewMode,
  mobileFilterOpen,
  onViewModeChange,
  onSortChange,
  onFilterChange,
  onClearFilters,
  onPageChange,
  onMobileFilterOpen,
}: ProductsLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-9xl mx-auto pt-8 px-6 pb-16">
        {/* ── Page header: breadcrumb, title, sort, view toggle ── */}
        <ProductHeader
          totalCount={totalCount}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          sort={(filters.sort as SortOption) ?? "featured"}
          onSortChange={onSortChange}
          loading={loading}
        />

        {/* ── Mobile: open-filter trigger button ── */}
        <div className="flex lg:hidden mb-4">
          <Button
            icon={<FilterOutlined />}
            onClick={() => onMobileFilterOpen(true)}
            style={{ borderRadius: 8, fontWeight: 600 }}
          >
            ตัวกรอง
          </Button>
        </div>

        {/* ── Body: desktop sidebar + product area ── */}
        <div className="flex gap-6 items-start">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onChange={onFilterChange}
              onClear={onClearFilters}
              loading={loading}
            />
          </div>

          {/* Mobile drawer */}
          <MobileFilterDrawer
            open={mobileFilterOpen}
            loading={loading}
            filters={filters}
            onClose={() => onMobileFilterOpen(false)}
            onFilterChange={onFilterChange}
            onClear={onClearFilters}
          />

          {/* Product grid / empty state / pagination */}
          <div className="flex-1 min-w-0">
            <ProductsContent
              products={products}
              viewMode={viewMode}
              loading={loading}
              filters={filters}
              totalCount={totalCount}
              onPageChange={onPageChange}
              onClearFilters={onClearFilters}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
