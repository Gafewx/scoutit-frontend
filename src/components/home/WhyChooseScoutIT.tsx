"use client";

import {
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  LockOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

// ── Data ─────────────────────────────────────────────────────────────

const features = [
  {
    id: "fast-delivery",
    icon: ThunderboltOutlined,
    title: "จัดส่งรวดเร็ว",
    description: "ครอบคลุมทุกจังหวัดทั่วไทยภายใน 1-3 วันทำการ",
  },
  {
    id: "authentic",
    icon: SafetyCertificateOutlined,
    title: "สินค้าของแท้ 100%",
    description: "ลิขสิทธิ์แท้จากแบรนด์ชั้นนำระดับโลก พร้อมใบรับประกันทุกชิ้น",
  },
  {
    id: "secure-payment",
    icon: LockOutlined,
    title: "ชำระเงินปลอดภัย",
    description: "เข้ารหัสทุกธุรกรรมด้วยมาตรฐาน TLS 1.3 ป้องกันการทุจริต",
  },
  {
    id: "expert-team",
    icon: CustomerServiceOutlined,
    title: "ทีมผู้เชี่ยวชาญ",
    description: "ที่ปรึกษาด้านไอทีพร้อมให้คำแนะนำทางเทคนิคตลอด 24 ชั่วโมง",
  },
];

// ── Component ────────────────────────────────────────────────────────

export default function WhyChooseScoutIT() {
  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            ทำไมต้องเลือก ScoutIT?
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-[44ch] leading-relaxed">
            สินค้าของแท้ บริการจากผู้เชี่ยวชาญ และการดูแลที่คุณไว้วางใจได้
          </p>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5"
              >
                {/* Top accent line */}
                {/* <div
                  className="absolute top-0 left-5 right-5 h-px bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
                  aria-hidden="true"
                /> */}

                {/* Icon */}
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-50 text-slate-400 text-base transition-all duration-200 group-hover:bg-blue-50 group-hover:text-blue-600"
                  aria-hidden="true"
                >
                  <Icon />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 tracking-tight leading-snug">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
