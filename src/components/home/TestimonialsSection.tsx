"use client";

import { Avatar, Card, Flex, Rate, Typography } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const testimonials = [
  {
    id: 1,
    name: "คุณกิตติศักดิ์ พ.",
    role: "Verified Buyer",
    rating: 5,
    avatarColor: "#3b82f6", // Blue
    avatarLetter: "K",
    content: "ส่งไวมากครับ สั่งการ์ดจอ RTX 4070 Ti ตอนบ่าย อีกวันสายๆ ได้รับของแล้ว แพ็คมาหนาแน่นมีกันกระแทกหลายชั้นเลย แนะนำร้านนี้เลยครับสำหรับสายจัดสเปกคอม",
    date: "2 วันที่แล้ว",
  },
  {
    id: 2,
    name: "คุณจิราภรณ์ ม.",
    role: "Verified Buyer",
    rating: 5,
    avatarColor: "#10b981", // Green
    avatarLetter: "J",
    content: "จัดสเปกคอมประกอบที่นี่ ทีมงานบริการดีมาก ให้คำแนะนำละเอียดตรงตามงบและตรงกับการใช้งานจริงเลยค่ะ เครื่องแรง เล่นเกมและทำงานกราฟิกได้ลื่นไหลมากๆ",
    date: "1 สัปดาห์ที่แล้ว",
  },
  {
    id: 3,
    name: "คุณธนพล ส.",
    role: "Verified Buyer",
    rating: 5,
    avatarColor: "#8b5cf6", // Purple
    avatarLetter: "T",
    content: "บริการหลังการขายดีเยี่ยมจริงๆ ซื้อจอ Monitor ไปแล้วพบจุด dead pixel ทางร้านประสานงานเปลี่ยนตัวใหม่ให้ทันที ประทับใจความรับผิดชอบและการดูแลลูกค้ามากครับ",
    date: "2 สัปดาห์ที่แล้ว",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            รีวิวจากผู้ใช้บริการ
          </span>
          <Title
            level={2}
            style={{
              color: "#0f172a",
              letterSpacing: "-0.02em",
              margin: "8px 0 0 0",
              fontWeight: 700,
            }}
          >
            เสียงตอบรับจากลูกค้าจริง
          </Title>
          <Text style={{ color: "#64748b", marginTop: 8, display: "block", fontSize: 16 }}>
            ความประทับใจส่วนหนึ่งของลูกค้าที่เลือกซื้อสินค้าและจัดสเปกคอมพิวเตอร์กับ ScoutIT
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              style={{
                borderRadius: 16,
                border: "1px solid #f1f5f9",
                background: "#f8fafc",
                boxShadow: "0 4px 6px -1px rgba(0,0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                height: "100%",
              }}
              styles={{
                body: {
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                },
              }}
            >
              <Flex vertical gap={16} style={{ height: "100%" }}>
                <Flex align="center" justify="space-between">
                  <Rate
                    disabled
                    defaultValue={t.rating}
                    style={{ fontSize: 15, color: "#f59e0b" }}
                  />
                  <Text style={{ fontSize: 12, color: "#94a3b8" }}>{t.date}</Text>
                </Flex>

                <Paragraph
                  style={{
                    color: "#334155",
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  "{t.content}"
                </Paragraph>

                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 16, marginTop: "auto" }}>
                  <Flex align="center" gap={12}>
                    <Avatar
                      size={44}
                      style={{
                        backgroundColor: t.avatarColor,
                        verticalAlign: "middle",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      {t.avatarLetter}
                    </Avatar>
                    <Flex vertical gap={2}>
                      <Flex align="center" gap={6}>
                        <Text style={{ fontWeight: 600, color: "#0f172a" }}>{t.name}</Text>
                        <CheckCircleFilled style={{ color: "#10b981", fontSize: 14 }} />
                      </Flex>
                      <Text style={{ fontSize: 12, color: "#64748b" }}>{t.role}</Text>
                    </Flex>
                  </Flex>
                </div>
              </Flex>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
