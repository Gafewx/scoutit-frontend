import { useCallback, useEffect, useState } from "react";

import type { Product } from "@/types/product.types";
import type { ProductFilters } from "@/types/product.types";
import type { PaginationMeta } from "@/types/api.types";
import { productsService } from "@/services/products.service";

// ─── Shared types ─────────────────────────────────────────────────────────────

export type ViewMode = "grid" | "list";
export type SortOption = "featured" | "newest" | "price_asc" | "price_desc";

export const DEFAULT_FILTERS: ProductFilters = {
  page: 1,
  limit: 12,
  sort: "featured",
};

// ─── Return shape ─────────────────────────────────────────────────────────────

export interface UseProductsReturn {
  // Data
  products: Product[];
  meta: PaginationMeta | null;
  totalCount: number;
  loading: boolean;

  // Filters & UI state
  filters: ProductFilters;
  viewMode: ViewMode;
  mobileFilterOpen: boolean;

  // Handlers
  fetchProducts: (f: ProductFilters) => Promise<void>;
  handleFilterChange: (partial: Partial<ProductFilters>) => void;
  handleSortChange: (sort: SortOption) => void;
  handlePageChange: (page: number, pageSize: number) => void;
  handleClearFilters: () => void;
  setViewMode: (mode: ViewMode) => void;
  setMobileFilterOpen: (open: boolean) => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const fetchProducts = useCallback(async (f: ProductFilters): Promise<void> => {
    setLoading(true);
    try {
      const res = await productsService.getAll(f);
      setProducts(Array.isArray(res.data.items) ? res.data.items : []);
      setMeta({
        total: res.data.total,
        page: res.data.page,
        limit: res.data.limit,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  const handleFilterChange = useCallback((partial: Partial<ProductFilters>): void => {
    setFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleClearFilters = useCallback((): void => {
    setFilters(DEFAULT_FILTERS);
    setMobileFilterOpen(false);
  }, []);

  const handleSortChange = useCallback(
    (sort: SortOption): void => {
      handleFilterChange({ sort, page: 1 });
    },
    [handleFilterChange],
  );

  const handlePageChange = useCallback(
    (page: number, pageSize: number): void => {
      handleFilterChange({ page, limit: pageSize });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [handleFilterChange],
  );

  return {
    // Data
    products,
    meta,
    totalCount: meta?.total ?? 0,
    loading,

    // UI state
    filters,
    viewMode,
    mobileFilterOpen,

    // Handlers
    fetchProducts,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    handleClearFilters,
    setViewMode,
    setMobileFilterOpen,
  };
}
