"use client";

import { Typography } from "antd";
import CategoryCard from "./CategoryCard";

const { Title, Text } = Typography;

const LaptopIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const GamingIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
);
const ComponentsIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="7" y="7" width="10" height="10" rx="1" /><path strokeLinecap="round" d="M9 7V5m3 2V5m3 2V5M9 19v-2m3 2v-2m3 2v-2M5 9H7m-2 3h2m-2 3h2M17 9h2m-2 3h2m-2 3h2" /></svg>
);
const MonitorIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const NetworkingIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
);
const AccessoriesIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="2" y="7" width="20" height="10" rx="2" /><path strokeLinecap="round" d="M6 11h1m3 0h1m3 0h1M8 7V5m4 2V5m4 2V5" /></svg>
);

const categories = [
  { name: "Laptops", slug: "laptops", description: "Gaming & Productivity", icon: <LaptopIcon /> },
  { name: "Gaming PCs", slug: "gaming-pcs", description: "High-Performance Desktops", icon: <GamingIcon /> },
  { name: "Components", slug: "components", description: "CPU, GPU, RAM & More", icon: <ComponentsIcon /> },
  { name: "Monitors", slug: "monitors", description: "4K & High Refresh Rate", icon: <MonitorIcon /> },
  { name: "Networking", slug: "networking", description: "Routers & Switches", icon: <NetworkingIcon /> },
  { name: "Accessories", slug: "accessories", description: "Keyboards, Mice & More", icon: <AccessoriesIcon /> },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20" style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Title level={2} style={{ color: "#0f172a", letterSpacing: "-0.02em", margin: 0 }}>
            เลือกซื้อสินค้าตามหมวดหมู่
          </Title>
          <Text style={{ color: "#64748b", marginTop: 8, display: "block" }}>
            ค้นหาสินค้าที่ใช่สำหรับการประกอบและอัปเกรดชุดอุปกรณ์ของคุณ
          </Text>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
