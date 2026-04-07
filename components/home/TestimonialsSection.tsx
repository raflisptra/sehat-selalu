"use client";

import { SkeletonTestimonial } from "@/components/ui/Skeleton";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
    {
        name: "Rina Kusuma",
        role: "Ibu Rumah Tangga, Jakarta",
        avatar: "RK",
        color: "bg-teal-500",
        rating: 5,
        text: "Sehat Selalu sangat membantu! Saya bisa memantau kondisi wabah DBD di lingkungan rumah dan langsung menemukan puskesmas terdekat. Fitur peta wabahnya luar biasa lengkap.",
    },
    {
        name: "Dr. Budi Santoso",
        role: "Dokter Umum, Surabaya",
        avatar: "BS",
        color: "bg-blue-500",
        rating: 5,
        text: "Sebagai tenaga medis, saya terkesan dengan akurasi data yang disajikan. SimDoc AI sangat membantu pasien untuk triase awal sebelum konsultasi langsung.",
    },
    {
        name: "Aditya Putra",
        role: "Mahasiswa, Bandung",
        avatar: "AP",
        color: "bg-violet-500",
        rating: 4,
        text: "HerbalSainsID adalah fitur favorit saya! Akhirnya ada database tanaman herbal Indonesia yang berbasis ilmiah, bukan sekadar mitos. Sangat berguna untuk riset.",
    },
    {
        name: "Siti Rahayu",
        role: "Perawat, Yogyakarta",
        avatar: "SR",
        color: "bg-pink-500",
        rating: 5,
        text: "Tool prediksi risiko berbasis musim dan AQI sangat inovatif. Ini membantu kami di Puskesmas untuk mempersiapkan diri menghadapi lonjakan kasus musiman.",
    },
    {
        name: "Farhan Hidayat",
        role: "Apoteker, Medan",
        avatar: "FH",
        color: "bg-amber-500",
        rating: 5,
        text: "Saya penyadang disabilitas,fitur BeMyEye ini sangat sekali membantu saya dalam melakukan kegiatan sehari - hari",
    },
];

const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);

const marqueeItems = [...testimonials, ...testimonials];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
    return (
        <div className="flex-shrink-0 w-[320px] sm:w-[360px] bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mx-2">
            <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                    {t.avatar}
                </div>
                <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                </div>
            </div>
            <div className="flex gap-0.5 mt-3 mb-2">
                {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={12}
                        className={s <= t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
                ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{t.text}</p>
        </div>
    );
}

export default function TestimonialsSection() {
    const [mounted, setMounted] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const animFrameRef = useRef<number>(0);
    const offsetRef = useRef(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted || !scrollRef.current) return;

        const speed = 0.5; // pixels per frame
        const el = scrollRef.current;
        const halfWidth = el.scrollWidth / 2;

        const animate = () => {
            if (!isPaused) {
                offsetRef.current += speed;
                if (offsetRef.current >= halfWidth) {
                    offsetRef.current -= halfWidth;
                }
                el.style.transform = `translateX(-${offsetRef.current}px)`;
            }
            animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [mounted, isPaused]);

    return (
        <section className="py-14 sm:py-16 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                        Dipercaya Ribuan Pengguna Indonesia!
                    </h2>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-1">
                        Dengarkan cerita mereka yang telah merasakan manfaat layanan kesehatan digital kami.
                    </p>
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={20}
                                className={s <= Math.round(Number(avgRating)) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Rata-rata rating Google {avgRating} dari 5</p>
                </div>

                {!mounted ? (
                    <div className="flex gap-4 overflow-hidden">
                        {Array.from({ length: 3 }).map((_, i) => <SkeletonTestimonial key={i} />)}
                    </div>
                ) : (
                    <div
                        className="overflow-hidden"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div
                            ref={scrollRef}
                            className="flex will-change-transform"
                            style={{ width: "max-content" }}
                        >
                            {marqueeItems.map((t, i) => (
                                <TestimonialCard key={`${t.name}-${i}`} t={t} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
