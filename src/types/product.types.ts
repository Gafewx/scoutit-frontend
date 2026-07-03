// Product types — aligned with backend entities

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  sku?: string;
  price: number;
  salePrice?: number;      // ราคาโปรโมชั่น (backend: sale_price)
  comparePrice?: number;   // alias ที่ frontend บางส่วนใช้
  currency?: string;
  warrantyMonths?: number;
  isFeatured: boolean;
  avgRating?: number;
  reviewCount?: number;
  // totalStock = computed by backend service (sum of product_stocks.quantity - reserved_qty)
  // stockQty = legacy alias; prefer totalStock
  stockQty?: number;
  totalStock?: number;
  images: ProductImage[];
  category?: Category;
  brand?: Brand;
  attributes?: ProductAttribute[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  id: string;
  imageUrl?: string;  // backend field: image_url
  url?: string;       // computed/alias — ใช้ imageUrl ?? url
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
}

export interface ProductAttribute {
  id: string;
  productId?: string;
  attributeId?: string;
  value: string;
  attribute?: {
    id: string;
    name: string;
    unit?: string | null;
  };
  name?: string;
}

export interface ProductFilters {
  categoryId?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: "price_asc" | "price_desc" | "newest" | "featured";
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "ASC" | "DESC";
}
