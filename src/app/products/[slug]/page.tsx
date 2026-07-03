import { productsService } from "@/services/products.service";
import ProductDetail from "@/components/products/ProductDetail";
import Navbar from "@/components/layout/Navbar";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await productsService.getBySlug(slug);
    const product = res.data;
    return {
      title: product.name,
      description: product.description?.slice(0, 160),
      openGraph: {
        title: product.name,
        description: product.description?.slice(0, 160),
        images: product.images?.[0]?.url ? [product.images[0].url] : [],
      },
    };
  } catch {
    return { title: "ไม่พบสินค้า" };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  let product;
  try {
    const res = await productsService.getBySlug(slug);
    product = res.data;
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <ProductDetail product={product} />
      </main>
    </>
  );
}
