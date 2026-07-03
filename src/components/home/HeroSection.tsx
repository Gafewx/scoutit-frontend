"use client";

import Link from "next/link";
import { Button, Tag, Typography, Flex } from "antd";
import { ArrowRightOutlined, DesktopOutlined, LaptopOutlined, ThunderboltOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24" style={{ borderBottom: "1px solid #f1f5f9" }}>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center product-fade-up-delay">

          {/* ── Left: Content ── */}
          <div className="lg:col-span-7">
            <Flex vertical gap={32}>
              {/* Badge */}
              {/* <div>
                <Tag
                  icon={<span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#2563eb", marginRight: 6, verticalAlign: "middle" }} />}
                  color="blue"
                  style={{ borderRadius: 999, padding: "4px 14px", fontSize: 13, fontWeight: 500 }}
                >
                  พบกับสินค้าใหม่ล่าสุดทุกสัปดาห์
                </Tag>
              </div> */}

              {/* Headline */}
              <div>
                <Title
                  level={1}
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  หาอุปกรณ์{" "}
                  <span style={{ color: "#2563eb" }}>IT Gear</span>
                  <br />
                  ที่ใช่สำหรับคุณ
                </Title>
                <Paragraph
                  style={{
                    fontSize: 17,
                    color: "#475569",
                    lineHeight: 1.7,
                    marginTop: 20,
                    marginBottom: 0,
                    maxWidth: 520,
                  }}
                >
                  เลือกซื้อโน้ตบุ๊ก เกมมิ่งพีซี อุปกรณ์คอมพิวเตอร์ และอุปกรณ์เสริมรุ่นล่าสุด
                  สินค้าของแท้ 100% พร้อมคำแนะนำจากผู้เชี่ยวชาญและบริการจัดส่งรวดเร็ว ครบจบในที่เดียว
                </Paragraph>
              </div>

              {/* CTAs */}
              <Flex gap={12} wrap="wrap">
                <Link href="/search">
                  <Button
                    size="large"
                    className="add-cart-btn"
                    style={{
                      borderColor: "#e2e8f0",
                      color: "#334155",
                      borderRadius: 8,
                      fontWeight: 600,
                      height: 48,
                      paddingInline: 28,
                    }}
                  >
                    เลือกดูหมวดหมู่
                  </Button>
                </Link>

                <Link href="/products">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    className="hero-btn"
                    iconPlacement="end"
                    style={{
                      background: "#0f172a",
                      borderColor: "#0f172a",
                      borderRadius: 8,
                      fontWeight: 600,
                      height: 48,
                      paddingInline: 28,
                    }}
                  >
                    ช็อปเลย!!!
                  </Button>
                </Link>
              </Flex>

              {/* Brand logos */}
              <div style={{ paddingTop: 24, borderTop: "1px solid #f1f5f9" }}>
                <Text style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 14 }}>
                  จำหน่ายสินค้าของแท้จากแบรนด์ชั้นนำระดับโลก
                </Text>
                <Flex gap={28} wrap="wrap" align="center">
                  {["ASUS", "MSI", "AMD", "NVIDIA", "INTEL", "LOGITECH"].map((brand) => (
                    <Text key={brand} style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em", userSelect: "none" }}>
                      {brand}
                    </Text>
                  ))}
                </Flex>
              </div>
            </Flex>
          </div>

          {/* ── Right: Visual showcase ── */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="relative" style={{ width: "100%", maxWidth: 420, height: 440 }}>

              {/* Back card */}
              <div className="absolute top-27 right-0 w-[230px] bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 rotate-2 shadow-sm select-none
                              transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div style={{ width: 40, height: 40, background: "#e2e8f0", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <LaptopOutlined className="text-xl text-slate-600" />
                  {/* <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth={1.5}><rect x="2" y="7" width="20" height="10" rx="2" /><path strokeLinecap="round" d="M6 11h1m3 0h1M8 7V5m4 2V5m4 2V5" /></svg> */}
                </div>
                <Text strong style={{ fontSize: 12, color: "#0f172a", display: "block" }}>Corsair K100 RGB</Text>
                <Flex justify="space-between" style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 11, color: "#94a3b8" }}>Accessories</Text>
                  <Text strong style={{ fontSize: 13, color: "#2563eb" }}>฿8,990</Text>
                </Flex>
              </div>

              {/* Back card 2*/}
              <div className="absolute -top-2 left-2 w-[230px] bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 -rotate-4 shadow-sm select-none
                              transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div style={{ width: 40, height: 40, background: "#e2e8f0", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <DesktopOutlined className="text-xl text-slate-600" />
                  {/* <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#64748b" strokeWidth={1.5}><rect x="2" y="7" width="20" height="10" rx="2" /><path strokeLinecap="round" d="M6 11h1m3 0h1M8 7V5m4 2V5m4 2V5" /></svg> */}
                </div>
                <Text strong style={{ fontSize: 12, color: "#0f172a", display: "block" }}>Corsair K100 RGB</Text>
                <Flex justify="space-between" style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 11, color: "#94a3b8" }}>Accessories</Text>
                  <Text strong style={{ fontSize: 13, color: "#2563eb" }}>฿8,990</Text>
                </Flex>
              </div>

              {/* Front card */}
              <div className="absolute left-0 top-1/2 translate-y-1 -rotate-1 w-[260px] bg-white border border-slate-200 rounded-2xl p-5 shadow-lg z-10 select-none
                              transition-all duration-300 hover:translate-y-1 hover:scale-105 hover:shadow-2xl"
              >
                <Tag color="blue" style={{ position: "absolute", top: 12, right: 12, borderRadius: 999, fontSize: 10, fontWeight: 600 }}>Best Seller</Tag>
                <div style={{ width: 56, height: 56, background: "#f1f5f9", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <DesktopOutlined className="text-2xl text-slate-600" />
                  {/* <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> */}
                </div>
                <Text strong style={{ fontSize: 14, color: "#0f172a", display: "block" }}>ASUS ROG Zephyrus G14</Text>
                <Text style={{ fontSize: 11, color: "#64748b", display: "block", marginTop: 3 }}>AMD Ryzen 9 · RTX 4060</Text>
                <Flex justify="space-between" align="center" style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                  <Flex gap={2}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill="#f59e0b"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </Flex>
                  <Text strong style={{ fontSize: 16, color: "#2563eb" }}>฿55,990</Text>
                </Flex>
              </div>

              {/* Rating badge */}
              {/* <div
                className="absolute select-none"
                style={{
                  bottom: 32, right: 8,
                  background: "#0f172a",
                  borderRadius: 12,
                  padding: "10px 16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  zIndex: 20,
                  display: "flex", alignItems: "center", gap: 10,
                }}
              >
                <span style={{ width: 8, height: 8, background: "#34d399", borderRadius: "50%", display: "inline-block", flexShrink: 0, animation: "pulse 2s infinite" }} />
                <div>
                  <Text style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block" }}>Store Rating</Text>
                  <Text strong style={{ fontSize: 13, color: "#fff", display: "block" }}>4.9 / 5.0 Stars</Text>
                </div>
              </div> */}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
