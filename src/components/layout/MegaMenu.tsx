"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/* ─── Static category data (matches backend product categories) ─── */
interface SubCategory {
  label: string;
  slug: string;
  emoji: string;
}
interface MegaCategory {
  key: string;
  label: string;
  slug: string;
  emoji: string;
  subs: SubCategory[];
}

const CATEGORIES: MegaCategory[] = [
  {
    key: "laptops",
    label: "แล็ปท็อป",
    slug: "laptops",
    emoji: "💻",
    subs: [
      { label: "Gaming Laptop", slug: "gaming-laptop", emoji: "🎮" },
      { label: "Ultrabook", slug: "ultrabook", emoji: "🪶" },
      { label: "Business Laptop", slug: "business-laptop", emoji: "💼" },
      { label: "2-in-1 / Convertible", slug: "2-in-1", emoji: "🔄" },
    ],
  },
  {
    key: "gaming",
    label: "เกมมิ่ง",
    slug: "gaming-pcs",
    emoji: "🎮",
    subs: [
      { label: "Gaming PC", slug: "gaming-pc", emoji: "🖥️" },
      { label: "Gaming Chair", slug: "gaming-chair", emoji: "🪑" },
      { label: "Gaming Headset", slug: "gaming-headset", emoji: "🎧" },
      { label: "Gaming Mouse", slug: "gaming-mouse", emoji: "🖱️" },
    ],
  },
  {
    key: "components",
    label: "ชิ้นส่วนคอมพิวเตอร์",
    slug: "components",
    emoji: "🔩",
    subs: [
      { label: "CPU / Processor", slug: "cpu", emoji: "⚡" },
      { label: "GPU / การ์ดจอ", slug: "gpu", emoji: "🎨" },
      { label: "Mainboard", slug: "mainboard", emoji: "🧩" },
      { label: "Power Supply", slug: "psu", emoji: "🔋" },
    ],
  },
  {
    key: "monitors",
    label: "จอมอนิเตอร์",
    slug: "monitors",
    emoji: "🖥️",
    subs: [
      { label: "Gaming Monitor", slug: "gaming-monitor", emoji: "🎯" },
      { label: "4K / UHD", slug: "4k-monitor", emoji: "🔲" },
      { label: "Ultrawide", slug: "ultrawide", emoji: "↔️" },
      { label: "Portable Monitor", slug: "portable-monitor", emoji: "📱" },
    ],
  },
  {
    key: "storage",
    label: "อุปกรณ์เก็บข้อมูล",
    slug: "storage",
    emoji: "💾",
    subs: [
      { label: "SSD NVMe", slug: "nvme-ssd", emoji: "⚡" },
      { label: "SSD SATA", slug: "sata-ssd", emoji: "💽" },
      { label: "HDD", slug: "hdd", emoji: "🗄️" },
      { label: "External Drive", slug: "external-drive", emoji: "🔌" },
    ],
  },
  {
    key: "ram",
    label: "RAM / หน่วยความจำ",
    slug: "ram",
    emoji: "🧠",
    subs: [
      { label: "DDR5", slug: "ddr5", emoji: "⚡" },
      { label: "DDR4", slug: "ddr4", emoji: "🔵" },
      { label: "Laptop RAM", slug: "sodimm", emoji: "💻" },
    ],
  },
  {
    key: "networking",
    label: "อุปกรณ์เครือข่าย",
    slug: "networking",
    emoji: "📡",
    subs: [
      { label: "WiFi Router", slug: "router", emoji: "📶" },
      { label: "Network Switch", slug: "switch", emoji: "🔀" },
      { label: "WiFi Adapter", slug: "wifi-adapter", emoji: "📻" },
      { label: "Network Card", slug: "network-card", emoji: "🃏" },
    ],
  },
  {
    key: "accessories",
    label: "อุปกรณ์เสริม",
    slug: "accessories",
    emoji: "🖱️",
    subs: [
      { label: "Keyboard", slug: "keyboard", emoji: "⌨️" },
      { label: "Mouse", slug: "mouse", emoji: "🖱️" },
      { label: "Webcam", slug: "webcam", emoji: "📷" },
      { label: "USB Hub", slug: "usb-hub", emoji: "🔌" },
    ],
  },
];

interface MegaMenuProps {
  /** controlled open state from parent */
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenu({ open, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const [activeKey, setActiveKey] = useState<string>(CATEGORIES[0].key);
  const activeCategory = CATEGORIES.find((c) => c.key === activeKey) ?? CATEGORIES[0];

  if (!open) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute left-0 top-full mt-1 z-50 flex rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
      style={{ width: 720, background: "#fff" }}
      role="dialog"
      aria-label="เมนูสินค้าทั้งหมด"
    >
      {/* ── Left sidebar: category list ── */}
      <aside className="w-48 flex-shrink-0 bg-slate-50 border-r border-slate-100 py-3">
        <p className="px-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          หมวดหมู่
        </p>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onMouseEnter={() => setActiveKey(cat.key)}
            onClick={() => setActiveKey(cat.key)}
            className={[
              "w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-left transition-colors duration-100 cursor-pointer",
              activeKey === cat.key
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                : "text-slate-600 hover:bg-white hover:text-slate-900",
            ].join(" ")}
          >
            <span className="text-base leading-none">{cat.emoji}</span>
            <span className="truncate">{cat.label}</span>
          </button>
        ))}
      </aside>

      {/* ── Right panel: sub-categories ── */}
      <main className="flex-1 p-5">
        {/* Panel header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <span>{activeCategory.emoji}</span>
            <span>{activeCategory.label}</span>
          </h3>
          <Link
            href={`/products?category=${activeCategory.slug}`}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            style={{ textDecoration: "none" }}
          >
            ดูทั้งหมด <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Sub-category grid */}
        <div className="grid grid-cols-4 gap-3">
          {activeCategory.subs.map((sub) => (
            <Link
              key={sub.slug}
              href={`/products?category=${sub.slug}`}
              style={{ textDecoration: "none" }}
              className="group"
            >
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all duration-150 cursor-pointer">
                <span className="text-2xl leading-none">{sub.emoji}</span>
                <span className="text-xs font-medium text-slate-700 text-center group-hover:text-blue-700 leading-tight">
                  {sub.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">สินค้า IT ครบครัน พร้อมส่ง</p>
          <Link
            href="/products"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150"
            style={{ textDecoration: "none" }}
          >
            ดูสินค้าทั้งหมด →
          </Link>
        </div>
      </main>
    </div>
  );
}
