import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import CartContent from "@/components/cart/CartContent";

export const metadata: Metadata = {
  title: "ตะกร้าสินค้า",
  description: "ตรวจสอบสินค้าในตะกร้าและดำเนินการชำระเงิน",
};

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 64px)", background: "#f8fafc" }}>
        <CartContent />
      </main>
    </>
  );
}
