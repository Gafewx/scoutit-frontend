import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseScoutIT from "@/components/home/WhyChooseScoutIT";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HeroCarousel from "@/components/home/HeroCarousel";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <HeroCarousel />
        <FeaturedProducts />
        <WhyChooseScoutIT />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
