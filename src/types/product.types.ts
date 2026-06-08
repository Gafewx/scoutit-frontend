// Product types for ScoutIT
// Populated in Phase 2

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  brand: string;
  sku: string;
  stockQty: number;
  isActive: boolean;
  isFeatured: boolean;
  specs: Record<string, string | number>;
  images: ProductImage[];
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price_asc" | "price_desc" | "newest" | "featured";
  page?: number;
  limit?: number;
}
