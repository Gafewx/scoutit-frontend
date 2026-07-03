"use client";

import CategoryCard from "./CategoryCard";

const categories = [
  { name: "Laptops", slug: "laptops", description: "Gaming & Productivity", image: "/images/carousel/gaming-laptop.png" },
  { name: "Gaming PCs", slug: "gaming-pcs", description: "High-Performance Desktops", image: "/images/carousel/custom-pc.png" },
  { name: "Components", slug: "components", description: "CPU, GPU, RAM & More", image: "/images/carousel/components.png" },
  { name: "Monitors", slug: "monitors", description: "4K & High Refresh Rate", image: "/images/carousel/custom-pc.png" },
  { name: "Networking", slug: "networking", description: "Routers & Switches", image: "/images/carousel/networking.png" },
  { name: "Accessories", slug: "accessories", description: "Keyboards, Mice & More", image: "/images/carousel/accessories.png" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 product-fade-up-delay">
        {/* Header Block */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            เลือกซื้อสินค้าตามหมวดหมู่
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-normal">
            ค้นหาสินค้าที่ใช่สำหรับการประกอบและอัปเกรดชุดอุปกรณ์ของคุณ
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
