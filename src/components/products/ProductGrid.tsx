"use client";

import Link from "next/link";
import { App, Button, Card, Flex, Skeleton, Tag, Typography } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import type { Product } from "@/types/product.types";
import { useCart } from "@/context/CartContext";

const { Text } = Typography;

type ViewMode = "grid" | "list";

interface ProductGridProps {
  products: Product[];
  viewMode: ViewMode;
  loading?: boolean;
}

function ProductSkeleton({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "list") {
    return (
      <Card style={{ borderRadius: 12, border: "1px solid #e2e8f0" }}>
        <div className="flex gap-4">
          <Skeleton.Image active style={{ width: 120, height: 100, borderRadius: 8, flexShrink: 0 }} />
          <div className="flex-1">
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        </div>
      </Card>
    );
  }
  return (
    <Card style={{ borderRadius: 12, border: "1px solid #e2e8f0" }}>
      <Skeleton.Image active style={{ width: "100%", height: 168, borderRadius: 8 }} />
      <Skeleton active paragraph={{ rows: 2 }} style={{ marginTop: 12 }} />
    </Card>
  );
}

function ProductCardGrid({ product }: { product: Product }) {
  const primaryImage = product.images?.find((img) => img.isPrimary) ?? product.images?.[0];
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;
  const { addToCart, loading } = useCart();
  const { message } = App.useApp();

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await addToCart(product.id);
      message.success(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว`);
    } catch {
      message.error("ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่");
    }
  }

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <Card
        hoverable
        style={{
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.25s ease",
        }}
        styles={{ body: { padding: 0, display: "flex", flexDirection: "column", flex: 1 } }}
        cover={
          <div
            style={{
              height: 200,
              background: "#f8fafc",
              borderBottom: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {primaryImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={primaryImage.url}
                alt={primaryImage.altText || product.name}
                style={{ objectFit: "contain", width: "100%", height: "100%", padding: 16 }}
              />
            ) : (
              <div style={{ color: "#cbd5e1", fontSize: 48 }}>📦</div>
            )}

            {/* Badges */}
            <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 4 }}>
              {product.isFeatured && (
                <Tag color="gold" style={{ borderRadius: 999, fontWeight: 600, fontSize: 11, margin: 0 }}>
                  แนะนำ
                </Tag>
              )}
              {hasDiscount && (
                <Tag color="volcano" style={{ borderRadius: 999, fontWeight: 600, fontSize: 11, margin: 0 }}>
                  -{discountPct}%
                </Tag>
              )}
              {product.stockQty === 0 && (
                <Tag color="default" style={{ borderRadius: 999, fontWeight: 600, fontSize: 11, margin: 0 }}>
                  หมด
                </Tag>
              )}
            </div>

            {/* Quick View overlay */}
            <div
              className="product-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15,23,42,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.2s ease",
              }}
            >
              <Button icon={<EyeOutlined />} style={{ borderRadius: 999, fontWeight: 600 }}>
                ดูสินค้า
              </Button>
            </div>
          </div>
        }
      >
        <Flex vertical flex={1} style={{ padding: "14px 16px 16px" }} gap={10}>
          <div className="flex-1">
            <Text style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
              {product.category?.name ?? product.brand?.name}
            </Text>
            <div
              title={product.name}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#0f172a",
                marginTop: 4,
                lineHeight: 1.45,
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
            <div>
              <Text strong style={{ fontSize: 15, color: "#0f172a", display: "block" }}>
                ฿{product.price.toLocaleString()}
              </Text>
              {hasDiscount && (
                <Text style={{ fontSize: 12, color: "#94a3b8", textDecoration: "line-through" }}>
                  ฿{product.comparePrice!.toLocaleString()}
                </Text>
              )}
            </div>
            <Button
              type="primary"
              size="small"
              icon={<ShoppingCartOutlined />}
              disabled={product.stockQty === 0 || loading}
              loading={loading}
              className="add-cart-btn"
              onClick={handleAddToCart}
              style={{
                background: product.stockQty === 0 ? "#94a3b8" : "#0f172a",
                borderColor: product.stockQty === 0 ? "#94a3b8" : "#0f172a",
                borderRadius: 7,
                fontWeight: 600,
                fontSize: 12,
                padding: "0 12px",
                height: 32,
              }}
            >
              {product.stockQty === 0 ? "หมด" : "ใส่ตะกร้า"}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
}

function ProductCardList({ product }: { product: Product }) {
  const primaryImage = product.images?.find((img) => img.isPrimary) ?? product.images?.[0];
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;
  const { addToCart, loading } = useCart();
  const { message } = App.useApp();

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    try {
      await addToCart(product.id);
      message.success(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว`);
    } catch {
      message.error("ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่");
    }
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <Card
        hoverable
        style={{ borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", transition: "all 0.25s ease" }}
        styles={{ body: { padding: 0 } }}
      >
        <div className="flex gap-0">
          {/* Image */}
          <div
            style={{
              width: 160,
              minHeight: 130,
              flexShrink: 0,
              background: "#f8fafc",
              borderRight: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {primaryImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={primaryImage.url}
                alt={primaryImage.altText || product.name}
                style={{ objectFit: "contain", width: "100%", height: "100%", maxHeight: 130, padding: 12 }}
              />
            ) : (
              <div style={{ color: "#cbd5e1", fontSize: 36 }}>📦</div>
            )}
            {hasDiscount && (
              <Tag color="volcano" style={{ position: "absolute", top: 8, left: 8, borderRadius: 999, fontWeight: 600, fontSize: 11, margin: 0 }}>
                -{discountPct}%
              </Tag>
            )}
          </div>

          {/* Content */}
          <Flex vertical flex={1} style={{ padding: "16px 20px" }} justify="space-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Text style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {product.category?.name ?? product.brand?.name}
                </Text>
                {product.isFeatured && (
                  <Tag color="gold" style={{ borderRadius: 999, fontWeight: 600, fontSize: 11, margin: 0 }}>
                    แนะนำ
                  </Tag>
                )}
              </div>
              <div
                title={product.name}
                style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", lineHeight: 1.4, marginBottom: 6 }}
              >
                {product.name}
              </div>
              <Text style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                {product.description?.slice(0, 120)}{(product.description?.length ?? 0) > 120 ? "…" : ""}
              </Text>
            </div>

            <Flex align="center" justify="space-between" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
              <div>
                <Text strong style={{ fontSize: 16, color: "#0f172a" }}>
                  ฿{product.price.toLocaleString()}
                </Text>
                {hasDiscount && (
                  <Text style={{ fontSize: 12, color: "#94a3b8", textDecoration: "line-through", marginLeft: 8 }}>
                    ฿{product.comparePrice!.toLocaleString()}
                  </Text>
                )}
              </div>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                disabled={product.stockQty === 0 || loading}
                loading={loading}
                className="add-cart-btn"
                onClick={handleAddToCart}
                style={{
                  background: product.stockQty === 0 ? "#94a3b8" : "#0f172a",
                  borderColor: product.stockQty === 0 ? "#94a3b8" : "#0f172a",
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                {product.stockQty === 0 ? "สินค้าหมด" : "ใส่ตะกร้า"}
              </Button>
            </Flex>
          </Flex>
        </div>
      </Card>
    </Link>
  );
}

export default function ProductGrid({ products, viewMode, loading = false }: ProductGridProps) {
  if (loading) {
    const skeletons = Array.from({ length: 8 }, (_, i) => i);
    return viewMode === "grid" ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {skeletons.map((i) => (
          <ProductSkeleton key={i} viewMode="grid" />
        ))}
      </div>
    ) : (
      <div className="flex flex-col gap-4">
        {skeletons.slice(0, 5).map((i) => (
          <ProductSkeleton key={i} viewMode="list" />
        ))}
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCardList key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <>
      <style>{`
        .product-overlay { opacity: 0; }
        a:hover .product-overlay { opacity: 1; }
      `}</style>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCardGrid key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
