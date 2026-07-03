"use client";

import { useState } from "react";
import type { ProductImage } from "@/types/product.types";

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
  isFeatured?: boolean;
  hasDiscount?: boolean;
  discountPct?: number;
  inStock?: boolean;
}

export default function ProductImageGallery({
  images,
  productName,
  isFeatured,
  hasDiscount,
  discountPct,
  inStock = true,
}: ProductImageGalleryProps) {
  const primary = images?.find((img) => img.isPrimary) ?? images?.[0] ?? null;
  const [selected, setSelected] = useState<ProductImage | null>(primary);

  const sorted = [...(images ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <figure
      className="flex flex-col gap-4 lg:sticky lg:top-24"
      aria-label={`รูปสินค้า ${productName}`}
    >
      {/* ── Main image — signature gradient border ── */}
      <div className="bg-gray-200 rounded-xl">
        <div className="product-image-inner aspect-square flex items-center justify-center zoom-container">
          {selected ? (
            <img
              src={selected.imageUrl ?? selected.url ?? ""}
              alt={selected.altText || productName}
              className="w-full h-full object-contain p-8"
            />
          ) : (
            <span className="text-7xl text-slate-300" aria-hidden="true">📦</span>
          )}

          {/* Badges — modern minimal style */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isFeatured && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider text-amber-700 bg-amber-50 border border-amber-200 uppercase">
                แนะนำ
              </span>
            )}
            {hasDiscount && discountPct && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider text-rose-700 bg-rose-50 border border-rose-200">
                ลด {discountPct}%
              </span>
            )}
            {!inStock && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider text-slate-700 bg-slate-50 border border-slate-200">
                สินค้าหมด
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Thumbnails ── */}
      {sorted.length > 1 && (
        <div className="flex gap-3 flex-wrap" role="listbox" aria-label="เลือกรูปสินค้า">
          {sorted.map((img) => (
            <button
              key={img.id}
              role="option"
              aria-selected={selected?.id === img.id}
              aria-label={img.altText || productName}
              onClick={() => setSelected(img)}
              className={[
                "w-20 h-20 rounded-xl overflow-hidden border-2 bg-slate-50 p-1.5 cursor-pointer",
                "transition-all duration-200 hover:scale-105",
                selected?.id === img.id
                  ? "border-blue-600 shadow-md shadow-blue-100"
                  : "border-slate-200 hover:border-slate-400",
              ].join(" ")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.imageUrl ?? img.url ?? ""}
                alt={img.altText || productName}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}
