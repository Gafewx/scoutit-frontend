"use client";

import { Card, Flex, Typography } from "antd";

const { Text, Title } = Typography;

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card
      style={{ border: "none", background: "transparent" }}
      styles={{ body: { padding: "4px 0" } }}
    >
      <Flex vertical gap={16} align="flex-start">
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#475569",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div>
          <Title level={5} style={{ margin: 0, color: "#0f172a", fontWeight: 600 }}>
            {title}
          </Title>
          <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginTop: 6, display: "block" }}>
            {description}
          </Text>
        </div>
      </Flex>
    </Card>
  );
}
