"use client";

import { useState } from "react";
import { Rate } from "antd";
import type { Category } from "@/types/product.types";

interface ProductSpecsProps {
  description?: string;
  specs: Record<string, string | number>;
  category?: Category;
  brandName?: string;
  sku?: string;
  avgRating?: number;
  reviewCount?: number;
}

export default function ProductSpecs({
  description,
  specs,
  category,
  brandName,
  sku,
  avgRating = 0,
  reviewCount = 0,
}: ProductSpecsProps) {
  const [activeTab, setActiveTab] = useState<"info" | "reviews" | "faq">("info");

  const detailList: { label: string; value: string; isLink?: boolean }[] = [];

  if (sku) {
    detailList.push({ label: "รหัสสินค้า", value: sku });
  }
  if (category?.name) {
    detailList.push({ label: "หมวดหมู่", value: category.name, isLink: true });
  }
  if (brandName) {
    detailList.push({ label: "แบรนด์", value: brandName });
  }

  // Add the database attributes
  Object.entries(specs).forEach(([key, value]) => {
    detailList.push({ label: key, value: String(value) });
  });

  return (
    <section className="mt-16 product-fade-up">
      {/* ── Tabs Navigation ── */}
      <div className="border-b border-slate-200">
        <div className="grid grid-cols-3 max-w-9xl mx-auto text-center">
          <button
            onClick={() => setActiveTab("info")}
            className={[
              "py-4 text-base font-semibold transition-all relative cursor-pointer",
              activeTab === "info"
                ? "text-red-600 font-bold"
                : "text-slate-500 hover:text-slate-800",
            ].join(" ")}
          >
            ข้อมูลสินค้า
            {activeTab === "info" && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={[
              "py-4 text-base font-semibold transition-all relative cursor-pointer",
              activeTab === "reviews"
                ? "text-red-600 font-bold"
                : "text-slate-500 hover:text-slate-800",
            ].join(" ")}
          >
            รีวิว {reviewCount > 0 && `(${reviewCount})`}
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("faq")}
            className={[
              "py-4 text-base font-semibold transition-all relative cursor-pointer",
              activeTab === "faq"
                ? "text-red-600 font-bold"
                : "text-slate-500 hover:text-slate-800",
            ].join(" ")}
          >
            คำถามที่พบบ่อย
            {activeTab === "faq" && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600" />
            )}
          </button>
        </div>
      </div>

      {/* ── Tabs Content ── */}
      <div className="py-8">
        {/* Tab 1: ข้อมูลสินค้า */}
        {activeTab === "info" && (
          <div className="flex flex-col gap-8">
            {/* Section 1: ข้อมูลสินค้า */}
            <div>
              <div className="w-full bg-slate-50/70 border-b border-slate-100 py-3 px-5 mb-4 rounded-lg">
                <h3 className="text-red-600 font-bold text-base m-0">ข้อมูลสินค้า</h3>
              </div>
              <div className="px-5 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {description || <span className="text-slate-400">ไม่มีข้อมูล</span>}
              </div>
            </div>

            {/* Section 2: รายละเอียดเพิ่มเติม */}
            {detailList.length > 0 && (
              <div>
                <div className="w-full bg-slate-50/70 border-b border-slate-100 py-3 px-5 mb-4 rounded-lg">
                  <h3 className="text-red-600 font-bold text-base m-0">รายละเอียดเพิ่มเติม</h3>
                </div>
                <div className="px-5 flex flex-col gap-3">
                  {detailList.map((item, idx) => (
                    <div
                      key={`${item.label}-${idx}`}
                      className="flex items-start text-sm leading-relaxed"
                    >
                      <span className="w-36 font-bold text-slate-800 shrink-0">
                        {item.label}
                      </span>
                      <span
                        className={[
                          "text-slate-600",
                          item.isLink ? "text-red-500 font-medium" : "",
                        ].join(" ")}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: รีวิว */}
        {activeTab === "reviews" && (
          <div className="max-w-5xl mx-auto px-5">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
              <div className="text-center md:text-left">
                <h4 className="text-sm font-bold text-slate-800 mb-1">คะแนนเฉลี่ยจากลูกค้า</h4>
                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {avgRating > 0 ? Number(avgRating).toFixed(1) : "0.0"}
                  </span>
                  <span className="text-slate-400 text-sm">/ 5.0</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Rate disabled allowHalf value={avgRating} className="!text-amber-400 !text-lg mb-2" />
                <span className="text-xs text-slate-500">จากทั้งหมด {reviewCount} รีวิว</span>
              </div>
            </div>

            <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white">
              <p className="text-slate-400 text-sm mb-4">ยังไม่มีรีวิวสำหรับสินค้านี้</p>
              <button className="px-5 py-2 text-sm font-semibold text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                เขียนรีวิวคนแรก
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: คำถามที่พบบ่อย */}
        {activeTab === "faq" && (
          <div className="max-w-5xl mx-auto px-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
              <FaqItem
                question="สินค้ามีระยะเวลาในการจัดส่งนานเท่าใด?"
                answer="สำหรับการจัดส่งในเขตกรุงเทพฯ และปริมณฑล ใช้เวลาประมาณ 1-2 วันทำการ และต่างจังหวัดใช้เวลาประมาณ 2-4 วันทำการ"
              />
              <FaqItem
                question="สามารถเปลี่ยนหรือคืนสินค้าได้หรือไม่?"
                answer="ท่านสามารถเปลี่ยนหรือคืนสินค้าได้ภายใน 7 วันทำการ นับจากวันที่ได้รับสินค้า ในกรณีที่สินค้าชำรุดเสียหายจากกระบวนการผลิต หรือไม่ตรงกับรายการสั่งซื้อ"
              />
              <FaqItem
                question="หากสินค้าชำรุดระหว่างระยะเวลารับประกันต้องทำอย่างไร?"
                answer="ท่านสามารถติดต่อเจ้าหน้าที่ฝ่ายบริการลูกค้าผ่านทางเบอร์ติดต่อหรือ Line Official ของทางร้าน เพื่อลงทะเบียนส่งเคลมสินค้าตามขั้นตอนการรับประกันของแบรนด์นั้นๆ ได้ทันที"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── FAQ sub-component ───────────────────────────────────────── */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-8 py-4 border-b border-slate-100 last:border-b-0 last:pb-0 first:pt-0">
      {/* Question column */}
      <div className="md:w-1/3 shrink-0">
        <h4 className="text-sm font-bold text-slate-800 flex items-start gap-2 m-0">
          <span className="text-red-500 font-extrabold">Q:</span>
          {question}
        </h4>
      </div>
      {/* Answer column */}
      <div className="flex-1 text-sm text-slate-600 leading-relaxed">
        <div className="flex items-start gap-2">
          <span className="text-emerald-500 font-extrabold md:hidden">A:</span>
          <p className="m-0">{answer}</p>
        </div>
      </div>
    </div>
  );
}
