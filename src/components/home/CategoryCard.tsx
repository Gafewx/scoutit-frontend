"use client";

import Link from "next/link";
import React from "react";
import { Card } from "antd";
import {
  LaptopOutlined,
  ThunderboltOutlined,
  AppstoreOutlined,
  DesktopOutlined,
  WifiOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  image?: string;
}

// ── Registry Configuration ──────────────────────────────────────────
const cardConfig: Record<
  string,
  {
    icon: React.ReactNode;
  }
> = {
  laptops: {
    icon: <LaptopOutlined className="transition-transform duration-300 group-hover:scale-110" />,
  },
  "gaming-pcs": {
    icon: <ThunderboltOutlined className="transition-transform duration-300 group-hover:scale-110" />,
  },
  components: {
    icon: <AppstoreOutlined className="transition-transform duration-300 group-hover:scale-110" />,
  },
  monitors: {
    icon: <DesktopOutlined className="transition-transform duration-300 group-hover:scale-110" />,
  },
  networking: {
    icon: <WifiOutlined className="transition-transform duration-300 group-hover:scale-110" />,
  },
  accessories: {
    icon: <CustomerServiceOutlined className="transition-transform duration-300 group-hover:scale-110" />,
  },
};

export default function CategoryCard({ name, slug, description, image }: CategoryCardProps) {
  const config = cardConfig[slug] || {
    icon: null,
  };

  return (
    <Link
      href={`/products?category=${slug}`}
      className="group"
      style={{ textDecoration: "none" }}
    >
      <Card
        hoverable
        className="relative h-52 overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
        styles={{ body: { padding: 0, height: "100%" } }}
      >
        {/* Background Image / Fallback Gradient */}
        {image ? (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 transition-all duration-700" />
        )}

        {/* Darkened Tint Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/20 z-[2] transition-opacity duration-300 group-hover:via-slate-950/70" />

        {/* Top Header of Card (absolutely positioned) */}
        <div className="absolute top-5 left-5 right-5 z-10 flex justify-between items-center">
          {/* Glassmorphic Icon box */}
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-white backdrop-blur-md flex items-center justify-center group-hover:bg-blue-600/30 group-hover:border-blue-400/40 transition-all duration-300 shadow-sm text-lg">
            {config.icon}
          </div>
        </div>

        {/* Bottom Content / Info (absolutely positioned) */}
        <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col">
          <h3 className="font-bold text-white text-sm sm:text-base tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-normal opacity-90 group-hover:text-white/80 transition-colors">
            {description}
          </p>

          {/* Shifting visual terminal action line */}
          {/* <div className="mt-3 flex items-center gap-1.5">
            <span className="text-[9px] font-mono tracking-widest text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1.5 group-hover:translate-x-0 font-bold uppercase">
              view_dir
            </span>
            <span className="text-[9px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1.5 group-hover:translate-x-0 font-bold">
              →
            </span>
          </div> */}
        </div>
      </Card>
    </Link>
  );
}

