"use client";

import { SkeletonHero } from "@/components/ui/Skeleton";
import { motion } from "framer-motion";
import { Hospital, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

type SlideLayout = "3-pill" | "large-circle" | "2-overlap" | "split" | "floating";

interface SlideData {
    id: number;
    title: string;
    titleHighlight: string;
    description: string;
    bullets: { Icon: React.ElementType; text: string }[];
    cta: { href: string; label: string; Icon: React.ElementType };
    image: string;
    layoutType: SlideLayout;
    backdropColor: string;
}

const slides: SlideData[] = [
    {
        id: 0,
        title: "Kenali Risikomu",
        titleHighlight: "Lewat Genomik",
        description: "Analisis DNA berbasis kearifan lokal. Didukung riset ilmiah terpercaya untuk mengetahui profil genetik Anda secara personal.",
        bullets: [
            { Icon: Zap, text: "Analisis genetik akurat" },
            { Icon: ShieldCheck, text: "Data dijamin privasinya" },
        ],
        cta: { href: "/genomid", label: "Pelajari GenomID", Icon: ArrowRight },
        image: "/genom2.jpg",
        layoutType: "3-pill",
        backdropColor: "#7c3aed",
    },
    {
        id: 1,
        title: "Herbal Indonesia",
        titleHighlight: "Secara Ilmiah",
        description: "Kumpulan tanaman obat terverifikasi dengan bukti ilmiah dan panduan dosis yang aman untuk konsumsi harian Anda.",
        bullets: [
            { Icon: ShieldCheck, text: "Sertifikasi BPOM" },
            { Icon: Hospital, text: "Dosis & uji klinis jelas" },
        ],
        cta: { href: "/herbalsainsid", label: "Eksplorasi Herbal", Icon: ArrowRight },
        image: "/herbal1.jpg",
        layoutType: "large-circle",
        backdropColor: "#059669",
    },
    {
        id: 2,
        title: "Aksesbilitas Hari Ini",
        titleHighlight: "Inklusif Selamanya",
        description: "Bantuan Navigasi & Layanan berbasis teknologi untuk disabilitas",
        bullets: [
            { Icon: ShieldCheck, text: "Deteksi AI presisi tinggi" },
            { Icon: Hospital, text: "Skrining dalam hitungan detik" },
        ],
        cta: { href: "/bemyeye", label: "Coba BeMyEye", Icon: ArrowRight },
        image: "/bemyeye1.jpg",
        layoutType: "2-overlap",
        backdropColor: "#4f46e5",
    },
    {
        id: 3,
        title: "Konsultasi",
        titleHighlight: "Dokter AI",
        description: "Triase gejala berbasis bukti klinis. SimDoc memberikan rekomendasi spesialis dan faskes terdekat yang sesuai dengan keluhan Anda.",
        bullets: [
            { Icon: ShieldCheck, text: "Berbasis rekam medis" },
            { Icon: Hospital, text: "Rekomendasi spesialis 24/7" },
        ],
        cta: { href: "/simdoc", label: "Mulai Konsultasi", Icon: ArrowRight },
        image: "/konsul1.jpg",
        layoutType: "split",
        backdropColor: "#0891b2", // sky blue
    },
    {
        id: 4,
        title: "Peta Wabah",
        titleHighlight: "Real-time",
        description: "Pantau persebaran penyakit menular di sekitar Anda dan dapatkan notifikasi dini dari sistem prediksi AI HealthMap.",
        bullets: [
            { Icon: ShieldCheck, text: "Data dari Faskes Resmi" },
            { Icon: Zap, text: "Peringatan Dini AI" },
        ],
        cta: { href: "/tools", label: "Buka HealthMap", Icon: ArrowRight },
        image: "/epidemic1.jpg",
        layoutType: "floating",
        backdropColor: "#0d9488",
    },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDir, setSlideDir] = useState<"left" | "right">("left");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => { setMounted(true); }, []);

    const go = useCallback(
        (idx: number, dir: "left" | "right" = "left") => {
            if (isTransitioning) return;
            setSlideDir(dir);
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrent((idx + slides.length) % slides.length);
                setTimeout(() => setIsTransitioning(false), 50);
            }, 400);
        },
        [isTransitioning]
    );

    const next = useCallback(() => go(current + 1, "left"), [current, go]);


    useEffect(() => {
        timerRef.current = setTimeout(next, 5000);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [current, next]);

    if (!mounted) return <SkeletonHero />;

    const slide = slides[current];

    return (
        <div className="relative overflow-hidden bg-white w-full border-b border-gray-100 min-h-[calc(100vh-4rem)] lg:min-h-0 pt-6 pb-4 sm:pt-8 sm:pb-8 lg:py-16 flex items-center">

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-8 min-h-[500px]">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 w-full flex flex-col justify-center relative z-10 pt-2 lg:pt-4 text-center lg:text-left"
                >
                    <div
                        className={`transition-all duration-400 ease-in-out ${isTransitioning
                            ? `opacity-0 ${slideDir === "left" ? "-translate-y-4" : "translate-y-4"}`
                            : "opacity-100 translate-y-0"
                            }`}
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-gray-800 leading-[1.15] mb-6">
                            {slide.title} <br className="hidden sm:block" />
                            {slide.titleHighlight}
                        </h1>

                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                            {slide.description}
                        </p>

                        <div className="flex justify-center lg:justify-start gap-4 items-center">
                            <Link
                                href={slide.cta.href}
                                className="inline-flex items-center gap-2 bg-[#2ba3b6] hover:bg-teal-600 text-white px-7 py-4 rounded shadow-lg shadow-teal-500/30 transition-all font-semibold group"
                            >
                                <slide.cta.Icon size={18} className="transition-transform group-hover:scale-110" />
                                <span>{slide.cta.label}</span>
                            </Link>
                        </div>

                        <div className="mt-10 lg:mt-12 flex justify-center lg:justify-start gap-2">
                            {slides.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick={() => go(i, i > current ? "left" : "right")}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-teal-500" : "w-3 bg-gray-200 hover:bg-gray-300"
                                        }`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="flex-1 relative w-full flex justify-center lg:justify-end h-[210px] sm:h-[280px] lg:h-auto lg:min-h-[450px] mt-8 sm:mt-12 lg:mt-0 mb-2 lg:mb-0"
                >
                    <div className="absolute inset-0 lg:relative lg:inset-auto z-10 flex items-center justify-center lg:justify-end w-full h-full lg:pr-10 pointer-events-none">
                        <div className="relative w-[460px] h-[420px] transform scale-[0.45] sm:scale-[0.60] lg:scale-[0.95] xl:scale-100 origin-center pointer-events-auto transition-opacity duration-300">
                            
                            {slide.layoutType === "3-pill" && (
                                <>
                                    <div className="absolute top-0 right-0 w-[240px] h-[420px] rounded-full overflow-hidden shadow-xl border-4 border-white z-10 animate-fade-in">
                                        <Image fill src={slide.image} alt={slide.title} className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute bottom-0 left-10 w-[200px] h-[300px] rounded-full overflow-hidden shadow-2xl border-4 border-white z-20 animate-fade-in" style={{animationDelay: "100ms"}}>
                                        <Image fill src={slides[(current + 1) % slides.length].image} alt="Preview 1" className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute top-10 left-0 w-[120px] h-[120px] rounded-full overflow-hidden shadow-lg border-4 border-white z-30 animate-fade-in" style={{animationDelay: "200ms"}}>
                                        <Image fill src={slides[(current + 2) % slides.length].image} alt="Preview 2" className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </>
                            )}

                            {slide.layoutType === "large-circle" && (
                                <>
                                    <div className="absolute top-5 right-0 w-[360px] h-[360px] rounded-full overflow-hidden shadow-xl border-4 border-white z-10 animate-fade-in">
                                        <Image fill src={slide.image} alt={slide.title} className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute bottom-[5%] left-0 w-[200px] h-[200px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white z-20 animate-fade-in" style={{animationDelay: "100ms"}}>
                                        <Image fill src={slides[(current + 1) % slides.length].image} alt="Preview 1" className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </>
                            )}

                            {slide.layoutType === "2-overlap" && (
                                <>
                                    <div className="absolute top-0 right-5 w-[300px] h-[380px] rounded-[60px] overflow-hidden shadow-xl border-4 border-white z-10 animate-fade-in">
                                        <Image fill src={slide.image} alt={slide.title} className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute bottom-5 left-0 w-[260px] h-[260px] rounded-full overflow-hidden shadow-2xl border-4 border-white z-20 animate-fade-in" style={{animationDelay: "100ms"}}>
                                        <Image fill src={slides[(current + 1) % slides.length].image} alt="Preview 1" className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </>
                            )}

                            {slide.layoutType === "split" && (
                                <>
                                    <div className="absolute top-0 right-0 w-[220px] h-[400px] rounded-[30px] overflow-hidden shadow-xl border-4 border-white z-10 animate-fade-in">
                                        <Image fill src={slide.image} alt={slide.title} className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute top-0 left-[30px] w-[200px] h-[260px] rounded-[30px] overflow-hidden shadow-2xl border-4 border-white z-20 animate-fade-in" style={{animationDelay: "100ms"}}>
                                        <Image fill src={slides[(current + 1) % slides.length].image} alt="Preview 1" className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute bottom-0 left-[30px] w-[200px] h-[120px] rounded-[30px] overflow-hidden shadow-lg border-4 border-white z-30 animate-fade-in" style={{animationDelay: "200ms"}}>
                                        <Image fill src={slides[(current + 2) % slides.length].image} alt="Preview 2" className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </>
                            )}

                            {slide.layoutType === "floating" && (
                                <>
                                    <div className="absolute top-5 right-0 w-[300px] h-[300px] rounded-[80px_30px_80px_30px] overflow-hidden shadow-xl border-4 border-white z-10 transform rotate-3 animate-fade-in">
                                        <Image fill src={slide.image} alt={slide.title} className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute bottom-5 left-[10%] w-[180px] h-[180px] rounded-[30px_80px_30px_80px] overflow-hidden shadow-2xl border-4 border-white z-20 animate-fade-in" style={{animationDelay: "100ms"}}>
                                        <Image fill src={slides[(current + 1) % slides.length].image} alt="Preview 1" className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute top-[20%] left-[-5%] w-[140px] h-[140px] rounded-full overflow-hidden shadow-lg border-4 border-white z-30 transform -rotate-12 animate-fade-in" style={{animationDelay: "200ms"}}>
                                        <Image fill src={slides[(current + 2) % slides.length].image} alt="Preview 2" className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>

            </div >
        </div >
    );
}
