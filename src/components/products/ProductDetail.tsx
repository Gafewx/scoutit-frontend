"use client";

import Link from "next/link";
import { Breadcrumb } from "antd";
import {
  SafetyCertificateOutlined,
  CarOutlined,
  LockOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import type { Product } from "@/types/product.types";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductAddToCart from "./ProductAddToCart";
import ProductSpecs from "./ProductSpecs";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const hasDiscount = !!(product.comparePrice && product.comparePrice > product.price);
  const discountPct = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  const specs: Record<string, string | number> = {};
  if (product.attributes && Array.isArray(product.attributes)) {
    product.attributes.forEach((attr) => {
      const name = attr.attribute?.name || attr.name;
      if (name) {
        specs[name] = attr.attribute?.unit
          ? `${attr.value} ${attr.attribute.unit}`
          : attr.value;
      }
    });
  }

  const brandName = typeof product.brand === "string" ? product.brand : product.brand?.name;

  return (
    <article className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Main grid: image | info ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left: Image gallery (sticky on lg via the component) */}
        <div className="product-fade-up lg:col-span-5">
          <ProductImageGallery
            images={product.images ?? []}
            productName={product.name}
            isFeatured={product.isFeatured}
            hasDiscount={hasDiscount}
            discountPct={discountPct}
            inStock={(product.stockQty ?? 0) > 0}
          />
        </div>

        {/* Right: Info + Add to cart + Trust signals */}
        <div className="flex flex-col gap-9 product-fade-up-delay lg:col-span-7">
          <div>
            {/* ── Breadcrumb ── */}
            <Breadcrumb
              className="!mb-3"
              items={[
                { title: <Link href="/">หน้าแรก</Link> },
                { title: <Link href="/products">สินค้า</Link> },
                product.category
                  ? {
                    title: (
                      <Link href={`/products?category=${product.category.slug}`}>
                        {product.category.name}
                      </Link>
                    ),
                  }
                  : null,
                { title: product.name },
              ].filter(Boolean) as object[]}
            />
            <ProductInfo
              product={product}
              hasDiscount={hasDiscount}
              discountPct={discountPct}
            />
          </div>

          <ProductAddToCart product={product} />

          {/* ── Trust signals ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <TrustSignal
              icon={<CarOutlined />}
              label="จัดส่งฟรี"
              detail="สั่งซื้อขั้นต่ำ ฿500"
            />
            <TrustSignal
              icon={<SafetyCertificateOutlined />}
              label="ของแท้ 100%"
              detail="สินค้ามีการรับประกัน"
            />
            <TrustSignal
              icon={<LockOutlined />}
              label="ชำระเงินปลอดภัย"
              detail="SSL Encrypted"
            />
            <TrustSignal
              icon={<CustomerServiceOutlined />}
              label="บริการหลังขาย"
              detail="ตอบกลับภายใน 24 ชม."
            />
          </div>
        </div>
      </div>

      {/* ── Specs table ── */}
      <ProductSpecs
        description={product.description}
        specs={specs}
        category={product.category}
        brandName={brandName}
        sku={product.sku}
        avgRating={product.avgRating}
        reviewCount={product.reviewCount}
      />
    </article>
  );
}

/* ── Trust Signal sub-component ──────────────────────────────── */

interface TrustSignalProps {
  icon: React.ReactNode;
  label: string;
  detail: string;
}

function TrustSignal({ icon, label, detail }: TrustSignalProps) {
  return (
    <div className="trust-icon flex flex-col items-center text-center gap-1.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
      <span className="text-lg text-blue-600">{icon}</span>
      <span className="text-xs font-semibold text-slate-700 leading-tight">{label}</span>
      <span className="text-[10px] text-slate-400 leading-tight">{detail}</span>
    </div>
  );
}
