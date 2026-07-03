"use client";

import type { Product } from "@/types/product.types";
import type { ProductFilters } from "@/types/product.types";
import type { ViewMode } from "@/hooks/useProducts";

import ProductGrid from "@/components/products/ProductGrid";
import ProductPagination from "@/components/products/ProductPagination";
import EmptyState from "@/components/products/EmptyState";

interface ProductsContentProps {
  products: Product[];
  viewMode: ViewMode;
  loading: boolean;
  filters: ProductFilters;
  totalCount: number;
  onPageChange: (page: number, pageSize: number) => void;
  onClearFilters: () => void;
}

export default function ProductsContent({
  products,
  viewMode,
  loading,
  filters,
  totalCount,
  onPageChange,
  onClearFilters,
}: ProductsContentProps) {
  const hasActiveFilters =
    !!filters.category ||
    !!filters.brand ||
    !!filters.minPrice ||
    !!filters.maxPrice;

  if (!loading && products.length === 0) {
    return (
      <EmptyState
        hasFilters={hasActiveFilters}
        searchQuery={filters.search}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <>
      <ProductGrid products={products} viewMode={viewMode} loading={loading} />
      <ProductPagination
        current={filters.page ?? 1}
        total={totalCount}
        pageSize={filters.limit ?? 12}
        onChange={onPageChange}
        loading={loading}
      />
    </>
  );
}
