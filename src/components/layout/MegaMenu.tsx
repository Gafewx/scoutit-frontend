"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  LaptopOutlined,
  ThunderboltOutlined,
  DesktopOutlined,
  HddOutlined,
  DatabaseOutlined,
  WifiOutlined,
  ToolOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  RightOutlined,
} from "@ant-design/icons";

interface SubCategory {
  label: string;
  slug: string;
  hint: string;
}

interface MegaCategory {
  key: string;
  label: string;
  labelEN: string;
  slug: string;
  Icon: React.ComponentType<{ style?: React.CSSProperties; className?: string }>;
  subs: SubCategory[];
}

const CATEGORIES: MegaCategory[] = [
  {
    key: "laptops",
    label: "แล็ปท็อป",
    labelEN: "Laptops",
    slug: "laptops",
    Icon: LaptopOutlined,
    subs: [
      { label: "Gaming Laptop", slug: "gaming-laptop", hint: "High-refresh, RTX ready" },
      { label: "Ultrabook", slug: "ultrabook", hint: "Light. Fast. All-day battery" },
      { label: "Business Laptop", slug: "business-laptop", hint: "Security & performance" },
      { label: "2-in-1 / Convertible", slug: "2-in-1", hint: "Tablet meets laptop" },
    ],
  },
  {
    key: "gaming",
    label: "เกมมิ่ง",
    labelEN: "Gaming",
    slug: "gaming-pcs",
    Icon: ThunderboltOutlined,
    subs: [
      { label: "Gaming PC", slug: "gaming-pc", hint: "Full tower, max power" },
      { label: "Gaming Chair", slug: "gaming-chair", hint: "Ergonomic pro seating" },
      { label: "Gaming Headset", slug: "gaming-headset", hint: "Surround sound precision" },
      { label: "Gaming Mouse", slug: "gaming-mouse", hint: "Low latency, pro sensor" },
    ],
  },
  {
    key: "components",
    label: "ชิ้นส่วนคอมพิวเตอร์",
    labelEN: "Components",
    slug: "components",
    Icon: AppstoreOutlined,
    subs: [
      { label: "CPU / Processor", slug: "cpu", hint: "Intel & AMD latest gen" },
      { label: "GPU / การ์ดจอ", slug: "gpu", hint: "RTX 40-series & RX 7000" },
      { label: "Mainboard", slug: "mainboard", hint: "ATX, mITX, mATX" },
      { label: "Power Supply", slug: "psu", hint: "80+ Gold & Platinum" },
    ],
  },
  {
    key: "monitors",
    label: "จอมอนิเตอร์",
    labelEN: "Monitors",
    slug: "monitors",
    Icon: DesktopOutlined,
    subs: [
      { label: "Gaming Monitor", slug: "gaming-monitor", hint: "Up to 360Hz refresh" },
      { label: "4K / UHD", slug: "4k-monitor", hint: "Crystal-clear detail" },
      { label: "Ultrawide", slug: "ultrawide", hint: "21:9 immersive curve" },
      { label: "Portable Monitor", slug: "portable-monitor", hint: "Work anywhere" },
    ],
  },
  {
    key: "storage",
    label: "อุปกรณ์เก็บข้อมูล",
    labelEN: "Storage",
    slug: "storage",
    Icon: HddOutlined,
    subs: [
      { label: "SSD NVMe", slug: "nvme-ssd", hint: "7000 MB/s read speed" },
      { label: "SSD SATA", slug: "sata-ssd", hint: "Reliable everyday storage" },
      { label: "HDD", slug: "hdd", hint: "High-capacity bulk storage" },
      { label: "External Drive", slug: "external-drive", hint: "Portable backup" },
    ],
  },
  {
    key: "ram",
    label: "RAM / หน่วยความจำ",
    labelEN: "Memory",
    slug: "ram",
    Icon: DatabaseOutlined,
    subs: [
      { label: "DDR5", slug: "ddr5", hint: "Next-gen platform speed" },
      { label: "DDR4", slug: "ddr4", hint: "Broad compatibility" },
      { label: "Laptop RAM", slug: "sodimm", hint: "SO-DIMM for laptops" },
    ],
  },
  {
    key: "networking",
    label: "อุปกรณ์เครือข่าย",
    labelEN: "Networking",
    slug: "networking",
    Icon: WifiOutlined,
    subs: [
      { label: "WiFi Router", slug: "router", hint: "WiFi 6E & 7 standards" },
      { label: "Network Switch", slug: "switch", hint: "Managed & unmanaged" },
      { label: "WiFi Adapter", slug: "wifi-adapter", hint: "USB & PCIe options" },
      { label: "Network Card", slug: "network-card", hint: "2.5G & 10G speeds" },
    ],
  },
  {
    key: "accessories",
    label: "อุปกรณ์เสริม",
    labelEN: "Accessories",
    slug: "accessories",
    Icon: ToolOutlined,
    subs: [
      { label: "Keyboard", slug: "keyboard", hint: "Mechanical & membrane" },
      { label: "Mouse", slug: "mouse", hint: "Wired & wireless" },
      { label: "Webcam", slug: "webcam", hint: "1080p & 4K streaming" },
      { label: "USB Hub", slug: "usb-hub", hint: "Expand your ports" },
    ],
  },
];

interface MegaMenuProps {
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenu({ open, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const [activeKey, setActiveKey] = useState<string>(CATEGORIES[0].key);
  const [prevKey, setPrevKey] = useState<string>(CATEGORIES[0].key);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeCategory = CATEGORIES.find((c) => c.key === activeKey) ?? CATEGORIES[0];

  useEffect(() => {
    if (!panelRef.current) return;
    if (open) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -10, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.28,
          ease: "power3.out",
          clearProps: "opacity,y,scale",
        }
      );
    }
  }, [open]);

  /* Sub-panel cross-fade — confirms category switch */
  useEffect(() => {
    if (!contentRef.current || activeKey === prevKey) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 8 },
      { opacity: 1, x: 0, duration: 0.18, ease: "power2.out", clearProps: "opacity,x" }
    );
    setPrevKey(activeKey);
  }, [activeKey]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="dialog"
      aria-label="เมนูสินค้าทั้งหมด"
      style={{
        position: "absolute",
        left: 0,
        top: "calc(100% + 8px)",
        zIndex: 50,
        width: 780,
        background: "rgba(9, 11, 17, 0.96)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* LEFT: Category rail */}
      <aside
        style={{
          width: 196,
          flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <p
          style={{
            padding: "0 16px 10px",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          หมวดหมู่
        </p>

        {CATEGORIES.map((cat) => {
          const isActive = activeKey === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onMouseEnter={() => setActiveKey(cat.key)}
              onClick={() => setActiveKey(cat.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px",
                background: isActive ? "rgba(37, 99, 235, 0.18)" : "transparent",
                borderLeft: isActive ? "2px solid #2563eb" : "2px solid transparent",
                color: isActive ? "#93b4fd" : "rgba(255,255,255,0.52)",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.12s ease",
                width: "100%",
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}
              className="megamenu-cat-btn"
            >
              {/* <cat.Icon
                style={{
                  fontSize: 14,
                  color: isActive ? "#2563eb" : "rgba(255,255,255,0.3)",
                  flexShrink: 0,
                  transition: "color 0.12s ease",
                }}
              /> */}
              <span style={{ flex: 1 }}>{cat.label}</span>
              {isActive && (
                <RightOutlined style={{ fontSize: 10, color: "#2563eb", opacity: 0.7 }} />
              )}
            </button>
          );
        })}
      </aside>

      {/* RIGHT: Sub-category panel */}
      <main
        ref={contentRef}
        style={{
          flex: 1,
          padding: "20px 20px 16px",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(37, 99, 235, 0.18)",
                border: "1px solid rgba(37, 99, 235, 0.3)",
                flexShrink: 0,
              }}
            >
              <activeCategory.Icon style={{ fontSize: 15, color: "#6090ff" }} />
            </span>
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.32)",
                  marginBottom: 1,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {activeCategory.labelEN}
              </p>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#f1f5f9",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {activeCategory.label}
              </h3>
            </div>
          </div>

          <Link
            href={`/products?category=${activeCategory.slug}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              fontWeight: 600,
              color: "#6090ff",
              textDecoration: "none",
              opacity: 0.85,
              paddingBottom: 2,
            }}
            aria-label={`ดูสินค้าทั้งหมดใน${activeCategory.label}`}
          >
            ดูทั้งหมด
            <ArrowRightOutlined style={{ fontSize: 10 }} />
          </Link>
        </div>

        {/* Sub-category card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 8,
            flex: 1,
          }}
        >
          {activeCategory.subs.map((sub) => (
            <Link key={sub.slug} href={`/products?category=${sub.slug}`} style={{ textDecoration: "none" }}>
              <div
                className="megamenu-sub-card"
                style={{
                  padding: "11px 14px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.03)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#e2e8f0",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                  }}
                >
                  {sub.label}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.34)",
                    lineHeight: 1.4,
                  }}
                >
                  {sub.hint}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer strip */}
        <div
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.01em" }}>
            สินค้า IT ครบครัน พร้อมส่งทั่วประเทศ
          </p>
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
              background: "#2563eb",
              padding: "6px 14px",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "background 0.15s ease",
            }}
            className="megamenu-browse-all"
          >
            ดูสินค้าทั้งหมด
            <ArrowRightOutlined style={{ fontSize: 10 }} />
          </Link>
        </div>
      </main>
    </div>
  );
}
