"use client";

import Link from "next/link";
import { Button, Flex, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import ProductCard from "@/components/product/ProductCard";

const { Title, Text } = Typography;

const LaptopIcon = () => <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const MonitorIcon = () => <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const CPUIcon = () => <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><rect x="7" y="7" width="10" height="10" rx="1" /><path strokeLinecap="round" d="M9 7V5m3 2V5m3 2V5M9 19v-2m3 2v-2m3 2v-2M5 9H7m-2 3h2m-2 3h2M17 9h2m-2 3h2m-2 3h2" /></svg>;
const GPUIcon = () => <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><rect x="2" y="7" width="20" height="10" rx="2" /><path strokeLinecap="round" d="M6 11h1m3 0h1m3 0h1M8 7V5m4 2V5m4 2V5" /><circle cx="6" cy="14.5" r="1" fill="currentColor" /><circle cx="10" cy="14.5" r="1" fill="currentColor" /></svg>;
const SSDIcon = () => <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><rect x="4" y="5" width="16" height="14" rx="2" /><path strokeLinecap="round" d="M8 9h8M8 13h5" /><circle cx="17" cy="15" r="1" fill="currentColor" /></svg>;
const KeyboardIcon = () => <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><rect x="2" y="7" width="20" height="10" rx="2" /><path strokeLinecap="round" d="M6 11h1m3 0h1m3 0h1M8 7V5m4 2V5m4 2V5" /></svg>;
const MouseIcon = () => <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a6 6 0 016 6v8a6 6 0 01-12 0V8a6 6 0 016-6z" /><line x1="12" y1="2" x2="12" y2="11" strokeLinecap="round" /><line x1="6" y1="11" x2="18" y2="11" strokeLinecap="round" /></svg>;

const mockProducts = [
  { id: "1", name: "ASUS ROG Zephyrus G14 AMD Ryzen 9 RTX 4060", price: 55990, category: "Laptops", badge: "Best Seller", icon: <LaptopIcon /> },
  { id: "2", name: "MSI Titan GT77 HX Intel i9 RTX 4090", price: 129990, category: "Laptops", badge: "New", icon: <MonitorIcon /> },
  { id: "3", name: "AMD Ryzen 9 7950X 16-Core Processor", price: 18990, category: "Components", icon: <CPUIcon /> },
  { id: "4", name: "NVIDIA GeForce RTX 4090 24GB GDDR6X", price: 59990, category: "Components", badge: "Hot", icon: <GPUIcon /> },
  { id: "5", name: "Samsung 990 Pro NVMe M.2 SSD 2TB", price: 4990, category: "Components", icon: <SSDIcon /> },
  { id: "6", name: "LG 27GP950 UltraGear 27\" 4K 144Hz IPS Monitor", price: 24990, category: "Monitors", icon: <MonitorIcon /> },
  { id: "7", name: "Corsair K100 RGB Optical-Mechanical Keyboard", price: 8990, category: "Accessories", icon: <KeyboardIcon /> },
  { id: "8", name: "Logitech G Pro X Superlight 2 Gaming Mouse", price: 5490, category: "Accessories", icon: <MouseIcon /> },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Flex justify="space-between" align="flex-end" style={{ marginBottom: 48 }}>
          <div>
            <Title level={2} style={{ color: "#0f172a", letterSpacing: "-0.02em", margin: 0 }}>
              สินค้าแนะนำ
            </Title>
            <Text style={{ color: "#64748b", marginTop: 6, display: "block" }}>
              รวมสินค้าขายดีและอุปกรณ์ไอทีคุณภาพที่ได้รับความนิยมจากลูกค้า
            </Text>
          </div>
          <Link href="/search" className="hidden sm:block">
            <Button type="link" icon={<ArrowRightOutlined />} iconPlacement="end" style={{ color: "#2563eb", fontWeight: 600, padding: 0 }}>
              ดูทั้งหมด
            </Button>
          </Link>
        </Flex>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/search">
            <Button type="link" style={{ color: "#2563eb", fontWeight: 600 }}>
              ดูทั้งหมด →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
