"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Button, Input, Menu } from "antd";
import { ShoppingCartOutlined, SearchOutlined, ThunderboltFilled } from "@ant-design/icons";

const navItems = [
  { key: "laptops", label: <Link href="/search?category=laptops">Laptops</Link> },
  { key: "gaming", label: <Link href="/search?category=gaming-pcs">Gaming</Link> },
  { key: "components", label: <Link href="/search?category=components">Components</Link> },
  { key: "monitors", label: <Link href="/search?category=monitors">Monitors</Link> },
  { key: "networking", label: <Link href="/search?category=networking">Networking</Link> },
  { key: "accessories", label: <Link href="/search?category=accessories">Accessories</Link> },
];

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200"
      style={{ borderBottom: "1px solid #e2e8f0" }}
    >
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-6">

          {/* Logo */}
          <Link
            href="/"
            aria-label="ScoutIT home"
            className="flex items-center gap-2 flex-shrink-0"
            style={{ textDecoration: "none" }}
          >
            <span
              className="flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ width: 32, height: 32, background: "#2563eb" }}
              aria-hidden="true"
            >
              <ThunderboltFilled style={{ color: "#fff", fontSize: 16 }} />
            </span>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>
              ScoutIT
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex flex-1" aria-label="Main navigation">
            <Menu
              mode="horizontal"
              items={navItems}
              selectedKeys={[]}
              style={{
                border: "none",
                background: "transparent",
                flex: 1,
                minWidth: 0,
              }}
            />
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-xs hidden md:block">
            <Input
              placeholder="ค้นหาสินค้า"
              prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={() => { if (searchValue) window.location.href = `/search?q=${encodeURIComponent(searchValue)}`; }}
              variant="filled"
              style={{ borderRadius: 8 }}
              aria-label="ค้นหาสินค้า"
            />
          </div>

          {/* Cart */}
          <Link href="/cart" aria-label="Shopping cart">
            <Badge count={0} showZero style={{ backgroundColor: "#2563eb" }}>
              <Button
                icon={<ShoppingCartOutlined />}
                className="add-cart-btn"
                style={{
                  background: "#0f172a",
                  borderColor: "#0f172a",
                  color: "#fff",
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                ตะกร้า
              </Button>
            </Badge>
          </Link>

        </div>
      </div>
    </header>
  );
}
