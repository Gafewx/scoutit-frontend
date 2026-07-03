"use client";
import { useRef } from "react";
import Link from "next/link";
import { Carousel, Button, Tag, Typography } from "antd";
import { LeftOutlined, RightOutlined, ArrowRightOutlined } from "@ant-design/icons";
import type { CarouselRef } from "antd/es/carousel";
const { Title, Paragraph } = Typography;
const slides = [
  {
    image: "/images/carousel/gaming-laptop.png",
    tag: "GAMING LAPTOPS",
    title: "สัมผัสความแรงระดับพรีเมียม",
    description: "โน้ตบุ๊กเกมมิ่งระดับไฮเอนด์ สเปกแรงล่าสุด การ์ดจอ RTX 40 Series พร้อมโปรโมชันลดสูงสุด 15% และของแถมสุดเอ็กซ์คลูซีฟ",
    link: "/search?category=laptops",
    btnText: "ช็อปโน้ตบุ๊กเลย",
    btnColor: "#3b82f6", // Blue Accent
  },
  {
    image: "/images/carousel/custom-pc.png",
    tag: "CUSTOM PC",
    title: "จัดสเปกคอมพิวเตอร์ระดับโปร",
    description: "เลือกประกอบคอมพิวเตอร์ในฝันของคุณด้วยชิ้นส่วนระดับท็อป พร้อมรับคำแนะนำจากวิศวกรผู้เชี่ยวชาญฟรี!",
    link: "/search?category=gaming-pcs",
    btnText: "เริ่มจัดสเปก",
    btnColor: "#10b981", // Emerald Accent
  },
  {
    image: "/images/carousel/accessories.png",
    tag: "GAMING GEAR",
    title: "อุปกรณ์สตรีมและเกมมิ่งเกียร์",
    description: "คีย์บอร์ดกลไก เมาส์ไร้สายความแม่นยำสูง และหูฟังระบบเสียงรอบทิศทาง คัดสรรเฉพาะแบรนด์ชั้นนำเพื่อชัยชนะของคุณ",
    link: "/search?category=accessories",
    btnText: "เลือกซื้อเกมมิ่งเกียร์",
    btnColor: "#8b5cf6", // Violet Accent
  },
  {
    image: "/images/carousel/components.png",
    tag: "COMPONENTS",
    title: "อัปเกรดความเร็วแรงให้เครื่องคุณ",
    description: "ซีพียู, การ์ดจอ, แรม และหน่วยความจำ SSD รุ่นล่าสุด รับประกันศูนย์ไทยแท้ 100% จัดส่งด่วนถึงหน้าบ้าน",
    link: "/search?category=components",
    btnText: "ดูอุปกรณ์อัปเกรด",
    btnColor: "#f59e0b", // Amber Accent
  },
  {
    image: "/images/carousel/networking.png",
    tag: "NETWORKING",
    title: "ระบบเครือข่ายแรง ไม่มีสะดุด",
    description: "เราเตอร์ Wi-Fi 6/7 การ์ดเครือข่ายความเร็วสูง และอุปกรณ์ขยายสัญญาณสำหรับสตรีมเมอร์และคนทำงานมืออาชีพ",
    link: "/search?category=networking",
    btnText: "ดูอุปกรณ์เครือข่าย",
    btnColor: "#06b6d4", // Cyan Accent
  },
];
export default function HeroCarousel() {
  const carouselRef = useRef<CarouselRef>(null);
  const handlePrev = () => {
    carouselRef.current?.prev();
  };
  const handleNext = () => {
    carouselRef.current?.next();
  };
  return (
    <section className="bg-white py-8 border-b border-slate-100">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 product-fade-up-delay">
        <div className="group relative overflow-hidden rounded-2xl shadow-xl bg-slate-950">

          {/* Custom Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Previous slide"
          >
            <LeftOutlined style={{ fontSize: 18 }} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Next slide"
          >
            <RightOutlined style={{ fontSize: 18 }} />
          </button>
          {/* Ant Design Carousel */}
          <Carousel
            ref={carouselRef}
            autoplay
            autoplaySpeed={5000}
            effect="fade"
            dots={{ className: "custom-carousel-dots" }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="relative h-[300px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden">

                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                />

                {/* Gradient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-transparent sm:from-slate-950/90 sm:via-slate-900/60 sm:to-transparent" />
                {/* Content Container */}
                <div className="relative h-full flex flex-col justify-center px-6 sm:px-16 lg:px-24 max-w-2xl text-white z-10">
                  <div className="flex flex-col gap-3 sm:gap-5 items-start">

                    {/* Badge */}
                    <Tag
                      style={{
                        background: "rgba(255, 255, 255, 0.12)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#ffffff",
                        padding: "4px 14px",
                        borderRadius: 999,
                        fontWeight: 600,
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        margin: 0,
                      }}
                    >
                      {slide.tag}
                    </Tag>
                    {/* Title */}
                    <Title
                      level={2}
                      style={{
                        color: "#ffffff",
                        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                        margin: 0,
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                      }}
                    >
                      {slide.title}
                    </Title>
                    {/* Description */}
                    <Paragraph
                      style={{
                        color: "rgba(226, 232, 240, 0.9)",
                        fontSize: "clamp(12px, 2vw, 15px)",
                        lineHeight: 1.6,
                        margin: 0,
                        maxWidth: 480,
                        textShadow: "0 1px 5px rgba(0,0,0,0.2)",
                      }}
                    >
                      {slide.description}
                    </Paragraph>
                    {/* CTA Button */}
                    <div style={{ marginTop: 8 }}>
                      <Link href={slide.link}>
                        <Button
                          type="primary"
                          size="large"
                          icon={<ArrowRightOutlined />}
                          iconPlacement="end"
                          className="hover:scale-105 transition-all duration-300 shadow-lg"
                          style={{
                            background: slide.btnColor,
                            borderColor: slide.btnColor,
                            color: "#ffffff",
                            borderRadius: 8,
                            fontWeight: 600,
                            height: 44,
                            paddingInline: 24,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          {slide.btnText}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
