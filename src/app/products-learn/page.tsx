"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type SortOption = 'featured' | 'price_asc' | 'price_desc';

type ProductFilter = {
  page: number;
  limit: number;
  sort: SortOption;
};

const fakeResponse = {
  data: {
    items: [
      { id: 1, name: "Gaming Laptop", price: 45900 },
      { id: 2, name: "Mechanical Keyboard", price: 2990 },
      { id: 3, name: "Mouse", price: 990 },
    ],
    total: 3,
    page: 1,
    limit: 12,
    totalPages: 1,
  },
};

function buildProductsQuery(filters: ProductFilter) {
  const params = new URLSearchParams();
  params.set("page", String(filters.page));
  params.set("limit", String(filters.limit));

  if (filters.sort === "price_asc") {
    params.set("sortBy", "price");
    params.set("order", "ASC");
  }

  if (filters.sort === "price_desc") {
    params.set("sortBy", "price");
    params.set("order", "DESC");
  }

  return params.toString();
}

export default function ProductsLearnPage() {

  const [message, setMessage] = useState("พร้อมเรียน products");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<ProductFilter>({ page: 1, limit: 12, sort: 'featured' });
  const [queryText, setQueryText] = useState('');

  async function handleLoadProducts(nextFilters: ProductFilter) {
    try {
      setLoading(true);
      const query = buildProductsQuery(nextFilters);
      const url = `http://localhost:3001/api/v1/products?${query}`;
      setQueryText(url);
      setMessage(`กำลังโหลดหน้าที่ ${nextFilters.page}`);

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('โหลดสินค้าไม่สำเร็จ');
      }

      const json = await res.json();

      setProducts(json.data.items);
      setTotalCount(json.data.total);
      setTotalPages(json.data.totalPages);
      setMessage(`โหลดสินค้าหน้า ${nextFilters.page} เสร็จแล้ว`);

    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleLoadProducts(filters);
  }, [filters]);

  return (
    <main style={{ padding: 32 }}>
      <h1>Products Learn</h1>
      <p>{message}</p>
      <p>API URL: {queryText}</p>

      <button type="button" onClick={() => handleLoadProducts(filters)}>
        {loading ? "กำลังโหลด..." : "โหลดสินค้า"}
      </button>
      <button type="button" className="border border-red-400 rounded-xl mx-2" onClick={() => setFilters({ ...filters, page: filters.page + 1 })} disabled={filters.page === totalPages}>หน้าถัดไป</button>
      <button type="button" onClick={() => setFilters({ ...filters, page: filters.page - 1 })} disabled={filters.page === 1}>หน้าก่อนหน้า</button>
      <button type="button" className="mx-2" onClick={() => setFilters({ ...filters, limit: 2, page: 1, })}>แสดงหน้าละ 2 รายการ</button>
      <button type="button" className="mx-2" onClick={() => setFilters({ ...filters, sort: 'price_asc', page: 1 })}>เรียงจากถูกไปแพง</button>
      <button type="button" onClick={() => setFilters({ ...filters, sort: 'price_desc', page: 1 })}>เรียงจากแพงไปถูก</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - {product.price.toLocaleString()} บาท</li>
        ))}
      </ul>
      <p>พบสินค้าทั้งหมด {totalCount} รายการ</p>
      <p>หน้าปัจจุบัน {filters.page} หน้า</p>
      <p>แสดงหน้าละ {filters.limit} รายการ</p>
      <p>ทั้งหมด {totalPages} หน้า</p>
    </main>
  );
}
