"use client";
import CTABanner from "@/components/home/CTABanner";
import FAQSection from "@/components/home/FAQSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroCarousel from "@/components/home/HeroCarousel";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WaveDivider from "@/components/home/WaveDivider";
import WhyUsSection from "@/components/home/WhyUsSection";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#f5f7fb] text-gray-900">
            <Navbar />

            <section className="w-full bg-white">
                <HeroCarousel />
            </section>

            <div className="bg-white">
                <FeaturesSection />
            </div>

            <WaveDivider topColor="#ffffff" bottomColor="#f5f7fb" />

            <WhyUsSection />

            <WaveDivider topColor="#f5f7fb" bottomColor="#f0fdfa" />

            <div className="bg-[#f0fdfa]">
                <TestimonialsSection />
            </div>

            <WaveDivider topColor="#f0fdfa" bottomColor="#ffffff" />

            <FAQSection />

            <WaveDivider topColor="#ffffff" bottomColor="#f5f7fb" />

            <div className="bg-[#f5f7fb]">
                <CTABanner />
            </div>
        </main>
    );
}
