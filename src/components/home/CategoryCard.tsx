"use client";

import Link from "next/link";
import { Card, Typography, Flex } from "antd";

const { Text } = Typography;

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
}

export default function CategoryCard({ name, slug, description, icon }: CategoryCardProps) {
  return (
    <Link href={`/search?category=${slug}`} style={{ textDecoration: "none" }}>
      <Card
        hoverable
        style={{
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          textAlign: "center",
          transition: "all 0.2s ease",
          cursor: "pointer",
        }}
        styles={{ body: { padding: "20px 12px" } }}
      >
        <Flex vertical align="center" gap={12}>
          {/* Icon box */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
            }}
          >
            {icon}
          </div>

          {/* Text */}
          <div>
            <Text strong style={{ fontSize: 13, color: "#0f172a", display: "block" }}>
              {name}
            </Text>
            <Text style={{ fontSize: 11, color: "#94a3b8", marginTop: 3, display: "block" }}>
              {description}
            </Text>
          </div>
        </Flex>
      </Card>
    </Link>
  );
}
