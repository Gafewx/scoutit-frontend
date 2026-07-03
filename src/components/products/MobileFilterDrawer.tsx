"use client";

import { Drawer } from "antd";
import FilterSidebar from "@/components/products/FilterSidebar";
import type { ProductFilters } from "@/types/product.types";

interface MobileFilterDrawerProps {
  open: boolean;
  loading: boolean;
  filters: ProductFilters;
  onClose: () => void;
  onFilterChange: (partial: Partial<ProductFilters>) => void;
  onClear: () => void;
}

/**
 * Wraps the FilterSidebar in an Ant Design Drawer for mobile screens.
 * Extracted so ProductsPage doesn't own Drawer-specific JSX or the
 * "close-on-filter-apply" side-effect logic.
 */
export default function MobileFilterDrawer({
  open,
  loading,
  filters,
  onClose,
  onFilterChange,
  onClear,
}: MobileFilterDrawerProps) {
  const handleChange = (partial: Partial<ProductFilters>): void => {
    onFilterChange(partial);
    onClose();
  };

  return (
    <Drawer
      title="ตัวกรองสินค้า"
      placement="left"
      open={open}
      onClose={onClose}
      size={300}
      styles={{ body: { padding: 0 } }}
    >
      <div style={{ padding: 16 }}>
        <FilterSidebar
          filters={filters}
          onChange={handleChange}
          onClear={onClear}
          loading={loading}
        />
      </div>
    </Drawer>
  );
}
