"use client";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { motion, Variants } from "framer-motion";
import { ChevronRight, Dna, Eye, Leaf, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
    {
        href: "/genomid",
        Icon: Dna,
        label: "GenomID",
        tag: "Genomik AI",
        description: "Analisis genomik berbasis AI untuk identifikasi risiko penyakit genetik dan rekomendasi personalisasi kesehatan.",
        bg: "bg-yellow-50",
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        tagColor: "bg-yellow-100 text-yellow-700",
        ctaColor: "text-yellow-600 hover:text-yellow-700",
        hoverBorder: "hover:border-yellow-200",
        hoverShadow: "hover:shadow-yellow-100/50",
    },
    {
        href: "/herbalsainsid",
        Icon: Leaf,
        label: "HerbalSainsID",
        tag: "Herbal Lokal",
        description: "Database tanaman herbal Indonesia dengan bukti ilmiah, dosis, dan interaksi obat berbasis riset lokal.",
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        tagColor: "bg-green-100 text-green-700",
        ctaColor: "text-green-600 hover:text-green-700",
        hoverBorder: "hover:border-green-200",
        hoverShadow: "hover:shadow-green-100/50",
    },
    {
        href: "/bemyeye",
        Icon: Eye,
        label: "BeMyEye",
        tag: "Layanan Disabilitas",
        description: "Bantuan navigasi & Layanan darurat untuk disabilitas",
        bg: "bg-pink-50",
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        tagColor: "bg-pink-100 text-pink-700",
        ctaColor: "text-pink-600 hover:text-pink-700",
        hoverBorder: "hover:border-pink-200",
        hoverShadow: "hover:shadow-pink-100/50",
    },
    {
        href: "/simdoc",
        Icon: Stethoscope,
        label: "SimDoc AI",
        tag: "Konsultasi AI",
        description: "Konsultasi kesehatan interaktif dengan AI dokter. Triase gejala, rekomendasi spesialis, dan rujukan faskes.",
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        tagColor: "bg-blue-100 text-blue-700",
        ctaColor: "text-blue-600 hover:text-blue-700",
        hoverBorder: "hover:border-blue-200",
        hoverShadow: "hover:shadow-blue-100/50",
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

export default function FeaturesSection() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        Satu Platform, <span className="text-teal-500">Banyak Solusi</span>
                    </h2>
                </div>
                <p className="text-gray-400 text-sm max-w-xs">
                    Teknologi AI terkini untuk layanan kesehatan digital terlengkap di Indonesia.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {!mounted
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                    : features.map(({ href, Icon, label, tag, description, bg, iconBg, iconColor, tagColor, ctaColor, hoverBorder, hoverShadow }, i) => (
                        <motion.div
                            key={href}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                        >
                            <Link href={href}
                                className={`group block ${bg} rounded-2xl p-6 border border-transparent ${hoverBorder} hover:shadow-lg ${hoverShadow} transition-all duration-300 h-full`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={22} className={iconColor} />
                                    </div>
                                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${tagColor}`}>{tag}</span>
                                </div>
                                <h3 className="font-extrabold text-gray-900 text-lg mb-2">{label}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
                                <div className={`inline-flex items-center gap-1 text-sm font-semibold ${ctaColor} transition group-hover:gap-2 duration-300`}>
                                    Jelajahi Fitur <ChevronRight size={14} className="transition-transform group-hover:translate-x-1 duration-300" />
                                </div>
                            </Link>
                        </motion.div>
                    ))
                }
            </div>
        </section>
    );
}
