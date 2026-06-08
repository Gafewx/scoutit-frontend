"use client";

import Link from "next/link";
import { Divider, Flex, Typography } from "antd";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, ThunderboltFilled } from "@ant-design/icons";

const { Text, Title } = Typography;

const footerLinks = {
  Products: [
    { label: "Laptops", href: "/search?category=laptops" },
    { label: "Gaming PCs", href: "/search?category=gaming-pcs" },
    { label: "Components", href: "/search?category=components" },
    { label: "Monitors", href: "/search?category=monitors" },
    { label: "Networking", href: "/search?category=networking" },
    { label: "Accessories", href: "/search?category=accessories" },
  ],
  Support: [
    { label: "FAQ", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "Returns & Warranty", href: "#" },
    { label: "Track Your Order", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  Company: [
    { label: "About ScoutIT", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xl:gap-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Flex vertical gap={16}>
              <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{ width: 32, height: 32, background: "#2563eb", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                  aria-hidden="true"
                >
                  <ThunderboltFilled style={{ color: "#fff", fontSize: 16 }} />
                </span>
                <Title level={5} style={{ margin: 0, color: "#0f172a", fontWeight: 700 }}>ScoutIT</Title>
              </Link>
              <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
                แหล่งรวมอุปกรณ์ไอทีและอุปกรณ์คอมพิวเตอร์ของแท้ที่คุณไว้วางใจได้ในประเทศไทย
              </Text>
              <Flex gap={16} aria-label="Social media links">
                {[
                  { icon: <FacebookOutlined />, label: "Facebook" },
                  { icon: <InstagramOutlined />, label: "Instagram" },
                  { icon: <TwitterOutlined />, label: "Twitter (X)" },
                ].map(({ icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    style={{ color: "#94a3b8", fontSize: 18, transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    {icon}
                  </a>
                ))}
              </Flex>
            </Flex>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <Text
                style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 16 }}
              >
                {category}
              </Text>
              <Flex vertical gap={10}>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{ fontSize: 13, color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                  >
                    {link.label}
                  </Link>
                ))}
              </Flex>
            </div>
          ))}
        </div>

        <Divider style={{ borderColor: "#e2e8f0", margin: "48px 0 24px" }} />

        <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
          <Text style={{ fontSize: 13, color: "#94a3b8" }}>
            © {new Date().getFullYear()} ScoutIT. All rights reserved.
          </Text>
          <Flex gap={24} wrap="wrap">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#475569")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                {item}
              </a>
            ))}
          </Flex>
        </Flex>
      </div>
    </footer>
  );
}
