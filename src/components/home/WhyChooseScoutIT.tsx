"use client";

import { Typography } from "antd";
import FeatureCard from "./FeatureCard";

const { Title, Text } = Typography;

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "จัดส่งรวดเร็ว",
    description: "จัดส่งรวดเร็วทั่วประเทศภายใน 1–3 วันทำการ",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "สินค้าของแท้ 100%",
    description: "รับประกันสินค้าลิขสิทธิ์แท้ทุกชิ้นจากแบรนด์ชั้นนำระดับโลก",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "ชำระเงินปลอดภัย",
    description: "ปลอดภัยด้วยระบบเข้ารหัส SSL และการป้องกันการทุจริต",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "ทีมงานผู้เชี่ยวชาญ",
    description: "พร้อมให้คำแนะนำและช่วยเหลือด้านเทคนิคทุกวัน",
  },
];

export default function WhyChooseScoutIT() {
  return (
    <section
      className="py-20"
      style={{ background: "#f8fafc", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}
    >
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Title level={2} style={{ color: "#0f172a", letterSpacing: "-0.02em", margin: 0 }}>
            ทำไมต้องเลือก ScoutIT?
          </Title>
          <Text style={{ color: "#64748b", marginTop: 8, display: "block" }}>
            สินค้าของแท้ บริการจากผู้เชี่ยวชาญ และการดูแลที่คุณไว้วางใจได้
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
