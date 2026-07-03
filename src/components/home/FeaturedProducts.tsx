"use client";

import Link from "next/link";
import { Button, Flex, Typography } from "antd";
import {
  ArrowRightOutlined,
  LaptopOutlined,
  DesktopOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  HddOutlined,
  ControlOutlined,
  AimOutlined,
} from "@ant-design/icons";
import ProductCard from "@/components/product/ProductCard";

const { Title, Text } = Typography;

const mockProducts = [
  { id: "1", name: "ASUS ROG Zephyrus G14 AMD Ryzen 9 RTX 4060", price: 55990, category: "Laptops", badge: "Best Seller", icon: <LaptopOutlined style={{ fontSize: 56 }} /> },
  { id: "2", name: "MSI Titan GT77 HX Intel i9 RTX 4090", price: 129990, category: "Laptops", badge: "New", icon: <LaptopOutlined style={{ fontSize: 56 }} /> },
  { id: "3", name: "AMD Ryzen 9 7950X 16-Core Processor", price: 18990, category: "Components", icon: <AppstoreOutlined style={{ fontSize: 56 }} /> },
  { id: "4", name: "NVIDIA GeForce RTX 4090 24GB GDDR6X", price: 59990, category: "Components", badge: "Hot", icon: <DatabaseOutlined style={{ fontSize: 56 }} /> },
  { id: "5", name: "Samsung 990 Pro NVMe M.2 SSD 2TB", price: 4990, category: "Components", icon: <HddOutlined style={{ fontSize: 56 }} /> },
  { id: "6", name: "LG 27GP950 UltraGear 27\" 4K 144Hz IPS Monitor", price: 24990, category: "Monitors", icon: <DesktopOutlined style={{ fontSize: 56 }} /> },
  { id: "7", name: "Corsair K100 RGB Optical-Mechanical Keyboard", price: 8990, category: "Accessories", icon: <ControlOutlined style={{ fontSize: 56 }} /> },
  { id: "8", name: "Logitech G Pro X Superlight 2 Gaming Mouse", price: 5490, category: "Accessories", icon: <AimOutlined style={{ fontSize: 56 }} /> },
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
