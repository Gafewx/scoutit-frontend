import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import AntdProvider from "./AntdProvider";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: {
    default: "ScoutIT — IT Equipment & Computer Accessories",
    template: "%s | ScoutIT",
  },
  description:
    "Shop the best laptops, gaming PCs, monitors, keyboards, mice, SSDs, RAM, and networking devices at ScoutIT.",
  keywords: ["IT equipment", "computer accessories", "laptops", "gaming PC", "monitors"],
  authors: [{ name: "ScoutIT" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ScoutIT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" data-scroll-behavior="smooth" className={`${prompt.className} h-full`}>
      <body className="min-h-full flex flex-col bg-white">
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
