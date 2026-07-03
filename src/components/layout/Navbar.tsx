"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, FormEvent } from "react";
import { Badge, Button, Skeleton } from "antd";
import {
  AppstoreFilled,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/hooks/useUser";
import LoginModal from "@/components/auth/LoginModal";
import UserMenu from "@/components/auth/UserMenu";
import MegaMenu from "@/components/layout/MegaMenu";

export default function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaOpen, setMegaOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, loading: userLoading, logout } = useUser();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Hover helpers with small delay so moving into the panel doesn't flicker ── */
  function openMega() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setMegaOpen(true);
  }
  function closeMega() {
    closeTimerRef.current = setTimeout(() => setMegaOpen(false), 120);
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(`/products?search=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 product-fade-up-delay">
        <div className="flex items-center h-16 gap-3">

          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="ScoutIT home"
            className="flex items-center gap-1.5 flex-shrink-0 group"
            style={{ textDecoration: "none" }}
          >
            <span
              className="flex items-center justify-center rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
              style={{ width: 30, height: 30, background: "#2563eb" }}
              aria-hidden="true"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M8.5 1.5L4 7.5h5L5 13"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              scoutit
              <span style={{ color: "#2563eb" }}>.</span>
            </span>
          </Link>

          {/* ── All Products pill (hover triggers mega-menu) ── */}
          <div className="relative flex-shrink-0" onMouseEnter={openMega} onMouseLeave={closeMega}>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={megaOpen}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors duration-150 cursor-pointer",
                megaOpen
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700",
              ].join(" ")}
            >
              <AppstoreFilled style={{ fontSize: 14 }} />
              <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
                สินค้าทั้งหมด
              </span>
            </button>

            {/* Mega-menu dropdown */}
            <MegaMenu
              open={megaOpen}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            />
          </div>

          {/* ── Search bar ── */}
          <form onSubmit={handleSearch} className="flex-1 min-w-0" role="search">
            <label htmlFor="navbar-search" className="sr-only">
              ค้นหาสินค้า
            </label>
            <div className="relative flex items-center">
              <SearchOutlined
                className="absolute left-3.5 text-slate-400 pointer-events-none"
                style={{ fontSize: 15 }}
              />
              <input
                ref={inputRef}
                id="navbar-search"
                type="search"
                placeholder="ค้นหาสินค้า เช่น Gaming Laptop, RTX 4070..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </form>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-4 flex-shrink-0">

            {/* Thailand flag */}
            <span title="ไทย" aria-label="ภาษาไทย" className="text-xl leading-none cursor-default select-none">
              🇹🇭
            </span>

            {/* Cart */}
            <Link href="/cart" aria-label={`ตะกร้าสินค้า ${totalItems} ชิ้น`}>
              <Badge count={totalItems} showZero={false} style={{ backgroundColor: "#2563eb" }}>
                <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors duration-150 cursor-pointer"
                >
                  <ShoppingCartOutlined style={{ fontSize: 20, color: "#334155" }} />
                </button>
              </Badge>
            </Link>

            {/* Auth */}
            {userLoading ? (
              <Skeleton.Button active size="small" style={{ width: 88, borderRadius: 24, opacity: 0.6 }} />
            ) : user ? (
              <UserMenu user={user} onLogout={logout} />
            ) : (
              <Button
                id="navbar-signin"
                icon={<UserOutlined />}
                onClick={() => setLoginOpen(true)}
                style={{
                  borderRadius: 24,
                  fontWeight: 600,
                  fontSize: 13,
                  height: 34,
                  paddingInline: 16,
                  background: "#2563eb",
                  borderColor: "#2563eb",
                  color: "#fff",
                }}
              >
                เข้าสู่ระบบ
              </Button>
            )}
          </div>

          <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
        </div>
      </div>
    </header>
  );
}
