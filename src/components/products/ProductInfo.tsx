import { Divider, Flex, Tag, Typography, Rate } from "antd";
import {
  BarcodeOutlined,
  InboxOutlined,
  TagsOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import type { Product } from "@/types/product.types";

const { Title, Text, Paragraph } = Typography;

interface ProductInfoProps {
  product: Product;
  hasDiscount: boolean;
  discountPct: number;
}

export default function ProductInfo({ product, hasDiscount, discountPct }: ProductInfoProps) {
  const stock = product.stockQty ?? product.totalStock ?? 0;
  const inStock = stock > 0;
  const brandName = typeof product.brand === "string" ? product.brand : product.brand?.name;

  return (
    <section className="flex flex-col gap-7" aria-label="รายละเอียดสินค้า">
      {/* ── Product name + inline tags ── */}
      <div className="flex flex-wrap items-center gap-3">
        <Title level={1} className="!text-2xl sm:!text-3xl !leading-snug !text-slate-900 !m-0 inline-block">
          {product.name}
        </Title>

        <span className="inline-flex gap-2 shrink-0">
          {product.category && (
            <Tag icon={<TagsOutlined />} color="blue" className="!rounded-full !m-0">
              {product.category.name}
            </Tag>
          )}
          {brandName && (
            <Tag className="!rounded-full !bg-slate-100 !text-slate-700 !border-slate-200 !font-medium !m-0">
              {brandName}
            </Tag>
          )}
        </span>
      </div>

      {/* ── Rating + Review count ── */}
      {(product.avgRating != null && product.avgRating > 0) && (
        <Flex align="center" gap={8}>
          <Rate
            disabled
            allowHalf
            value={product.avgRating}
            className="!text-amber-400 !text-sm"
          />
          <Text className="!text-sm !text-slate-500">
            {Number(product.avgRating).toFixed(1)}
            {product.reviewCount != null && (
              <span className="ml-1">({product.reviewCount} รีวิว)</span>
            )}
          </Text>
        </Flex>
      )}

      {/* ── Price block — gradient card ── */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/30 px-6 py-5 shadow-sm">
        <Flex align="baseline" gap={12} wrap="wrap">
          <Text strong className="!text-4xl !text-slate-900 !leading-none !tracking-tight">
            ฿{product.price.toLocaleString()}
          </Text>
          {hasDiscount && (
            <>
              <Text className="!text-lg !text-slate-400 line-through">
                ฿{product.comparePrice!.toLocaleString()}
              </Text>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white bg-rose-500 shadow-sm">
                ลด {discountPct}%
              </span>
            </>
          )}
        </Flex>

        {hasDiscount && (
          <Text className="!text-sm !text-emerald-600 !font-medium mt-2 block">
            ประหยัด ฿{(product.comparePrice! - product.price).toLocaleString()}
          </Text>
        )}
      </div>

      {/* ── Stock + SKU + Warranty ── */}
      <Flex gap={16} wrap="wrap" className="text-sm">
        <Flex align="center" gap={6}>
          <InboxOutlined
            className={inStock ? "!text-emerald-500" : "!text-slate-400"}
            aria-hidden="true"
          />
          {inStock ? (
            <Text className="!text-emerald-600 !font-semibold">
              มีสินค้า ({stock} ชิ้น)
            </Text>
          ) : (
            <Text className="!text-slate-400 !font-semibold">สินค้าหมด</Text>
          )}
        </Flex>

        {product.sku && (
          <Flex align="center" gap={6}>
            <BarcodeOutlined className="!text-slate-400" aria-hidden="true" />
            <Text className="!text-slate-500">SKU: {product.sku}</Text>
          </Flex>
        )}

        {product.warrantyMonths != null && product.warrantyMonths > 0 && (
          <Flex align="center" gap={6}>
            <SafetyCertificateOutlined className="!text-blue-500" aria-hidden="true" />
            <Text className="!text-blue-600 !font-medium">
              รับประกัน {product.warrantyMonths} เดือน
            </Text>
          </Flex>
        )}
      </Flex>

      <Divider className="!my-0 !mx-0" />

      {/* ── Description ── */}
      {product.shortDescription && (
        <Paragraph className="!text-slate-600 !leading-relaxed !m-0 !text-[15px]">
          {product.shortDescription}
        </Paragraph>
      )}
    </section>
  );
}
