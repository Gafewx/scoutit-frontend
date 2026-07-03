import { api } from "./api";
import type { Product } from "@/types/product.types";
import type { ApiResponse } from "@/types/api.types";
import type { ProductFilters } from "@/types/product.types";

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productsService = {
  getAll(filters: ProductFilters = {}): Promise<ApiResponse<ProductListResponse>> {
    const params = new URLSearchParams();

    const { sort, ...rest } = filters;

    Object.entries(rest).forEach(([key, val]) => {
      if (val !== undefined && val !== "") params.set(key, String(val));
    });

    if (sort === "newest") {
      params.set("sortBy", "createdAt");
      params.set("order", "DESC");
    } else if (sort === "price_asc") {
      params.set("sortBy", "price");
      params.set("order", "ASC");
    } else if (sort === "price_desc") {
      params.set("sortBy", "price");
      params.set("order", "DESC");
    }

    const query = params.toString();
    return api.get<ProductListResponse>(`/products${query ? `?${query}` : ""}`);
  },

  getBySlug(slug: string): Promise<ApiResponse<Product>> {
    return api.get<Product>(`/products/slug/${slug}`);
  },
};
