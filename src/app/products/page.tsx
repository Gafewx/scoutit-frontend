"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductsLayout from "@/components/products/ProductsLayout";
import Navbar from "@/components/layout/Navbar";

/**
 * ProductsPage — composition layer only.
 *
 * Business logic  →  useProducts()
 * Layout & UI     →  ProductsLayout
 */
export default function ProductsPage() {
  const {
    products,
    totalCount,
    loading,
    filters,
    viewMode,
    mobileFilterOpen,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    handleClearFilters,
    setViewMode,
    setMobileFilterOpen,
  } = useProducts();

  return (
    <>
      <Navbar />
      <main>
        <ProductsLayout
          products={products}
          totalCount={totalCount}
          loading={loading}
          filters={filters}
          viewMode={viewMode}
          mobileFilterOpen={mobileFilterOpen}
          onViewModeChange={setViewMode}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onPageChange={handlePageChange}
          onMobileFilterOpen={setMobileFilterOpen}
        />
      </main>
    </>
  );
}
