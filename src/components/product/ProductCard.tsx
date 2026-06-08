"use client";

import { Button, Card, Flex, Tag, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface MockProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  badge?: string;
  icon: React.ReactNode;
}

interface ProductCardProps {
  product: MockProduct;
}

const badgeColorMap: Record<string, string> = {
  "Best Seller": "gold",
  "New": "blue",
  "Hot": "volcano",
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      styles={{ body: { padding: 0, display: "flex", flexDirection: "column", flex: 1 } }}
      cover={
        <div
          style={{
            height: 168,
            background: "#f8fafc",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            color: "#94a3b8",
          }}
        >
          <div style={{ width: 56, height: 56 }}>{product.icon}</div>
          {product.badge && (
            <div style={{ position: "absolute", top: 10, left: 10 }}>
              <Tag color={badgeColorMap[product.badge] ?? "blue"} style={{ borderRadius: 999, fontWeight: 600, fontSize: 11 }}>
                {product.badge}
              </Tag>
            </div>
          )}
        </div>
      }
    >
      <Flex vertical flex={1} style={{ padding: "14px 16px 16px" }} gap={12}>
        <div className="flex-1">
          <Text style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
            {product.category}
          </Text>
          <div
            title={product.name}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#0f172a",
              marginTop: 4,
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </div>
        </div>

        <Flex justify="space-between" align="center" style={{ paddingTop: 10, borderTop: "1px solid #f1f5f9" }}>
          <Text strong style={{ fontSize: 15, color: "#0f172a" }}>
            ฿{product.price.toLocaleString()}
          </Text>
          <Button
            type="primary"
            size="small"
            icon={<ShoppingCartOutlined />}
            className="add-cart-btn"
            style={{
              background: "#0f172a",
              borderColor: "#0f172a",
              borderRadius: 7,
              fontWeight: 600,
              fontSize: 12,
              padding: 15,
            }}
          >
            Add to Cart
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
