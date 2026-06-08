import { api } from "./api";
import type { Product } from "@/types/product.types";
import type { ApiResponse } from "@/types/api.types";
import type { ProductFilters } from "@/types/product.types";

export const productsService = {
  getAll(filters: ProductFilters = {}): Promise<ApiResponse<Product[]>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== "") params.set(key, String(val));
    });
    const query = params.toString();
    return api.get<Product[]>(`/products${query ? `?${query}` : ""}`);
  },

  getBySlug(slug: string): Promise<ApiResponse<Product>> {
    return api.get<Product>(`/products/${slug}`);
  },
};
