"use client";

import { useState } from "react";
import { Button, Card, Flex, Form, Input, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    messageApi.success("Thanks for subscribing! Check your inbox.");
    setEmail("");
  };

  return (
    <section className="py-20 bg-white">
      {contextHolder}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card
          style={{
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            textAlign: "center",
          }}
          styles={{ body: { padding: "48px 40px" } }}
        >
          <Flex vertical align="center" gap={8}>
            <Title level={2} style={{ color: "#0f172a", letterSpacing: "-0.02em", margin: 0 }}>
              ติดตามข่าวสารและโปรโมชั่นล่าสุด
            </Title>
            <Text style={{ color: "#64748b", fontSize: 15, maxWidth: 420, display: "block" }}>
              รับข่าวสารสินค้าใหม่ โปรโมชั่นพิเศษ และอัปเดตเทคโนโลยีล่าสุด ส่งตรงถึงอีเมลของคุณ
            </Text>

            <Form
              layout="inline"
              style={{ marginTop: 24, width: "100%", maxWidth: 460, gap: 8, display: "flex", flexWrap: "wrap", justifyContent: "center" }}
              onSubmitCapture={handleSubmit}
            >
              <Form.Item style={{ flex: 1, minWidth: 220, margin: 0 }}>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  prefix={<MailOutlined style={{ color: "#94a3b8" }} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="large"
                  style={{ borderRadius: 8 }}
                  autoComplete="email"
                  required
                  aria-label="Email address"
                />
              </Form.Item>
              <Form.Item style={{ margin: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="add-cart-btn"
                  style={{
                    background: "#0f172a",
                    borderColor: "#0f172a",
                    borderRadius: 8,
                    fontWeight: 600,
                    paddingInline: 28,
                  }}
                >
                  Subscribe
                </Button>
              </Form.Item>
            </Form>

            <Text style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>
              No spam, ever. Unsubscribe at any time.
            </Text>
          </Flex>
        </Card>
      </div>
    </section>
  );
}
