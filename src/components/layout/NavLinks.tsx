import Link from "next/link";

const links = [
  { label: "Laptops", href: "/search?category=laptops" },
  { label: "Gaming", href: "/search?category=gaming-pcs" },
  { label: "Components", href: "/search?category=components" },
  { label: "Monitors", href: "/search?category=monitors" },
  { label: "Networking", href: "/search?category=networking" },
  { label: "Accessories", href: "/search?category=accessories" },
];

export default function NavLinks() {
  return (
    <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
