import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function CartButton() {
  return (
    <Link
      href="/cart"
      aria-label="Shopping cart, 0 items"
      className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-900 whitespace-nowrap"
    >
      <ShoppingCartOutlined className="text-2xl" />
      <span className="hidden sm:block">Cart</span>
      <span
        className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
        aria-hidden="true"
      >
        0
      </span>
    </Link>
  );
}
