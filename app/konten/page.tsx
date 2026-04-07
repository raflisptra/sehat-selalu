"use client";

import WaveDivider from "@/components/home/WaveDivider";

import Navbar from "@/components/layout/Navbar";
import { articles } from "@/lib/articles";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Search, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const categories = ["Semua", ...Array.from(new Set(articles.map((a) => a.category)))];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

export default function KontenPage() {
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = articles.filter((a) => {
        const matchCategory = activeCategory === "Semua" || a.category === activeCategory;
        const matchSearch =
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const featured = articles[0];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white overflow-hidden">

                <section className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] bg-white/5 rounded-full" />
                        <div className="absolute bottom-[-60px] right-[-40px] w-[250px] h-[250px] bg-white/5 rounded-full" />
                    </div>
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-black mb-4"
                        >
                            Artikel & Edukasi Kesehatan
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-teal-50 max-w-xl mx-auto font-medium"
                        >
                            Temukan artikel terpercaya seputar kesehatan, epidemiologi, herbal, dan teknologi medis.
                        </motion.p>
                    </div>

                    <WaveDivider topColor="transparent" bottomColor="#f0fdfa" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />
                </section>

                <section className="bg-teal-50 py-12 sm:py-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-black text-gray-900 mb-6">Artikel Pilihan</h2>
                            <Link href={`/konten/${featured.slug}`}>
                                <div className="group bg-white rounded-2xl border border-teal-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
                                    <div className="h-2 bg-gradient-to-r from-teal-500 to-cyan-400" />
                                    <div className="p-6 sm:p-8 md:flex md:items-center md:gap-8">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${featured.color}`}>
                                                    <Tag size={10} /> {featured.category}
                                                </span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Calendar size={10} /> {featured.date}
                                                </span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Clock size={10} /> {featured.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 group-hover:text-teal-600 transition-colors leading-snug">
                                                {featured.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-4">
                                                {featured.excerpt}
                                            </p>
                                            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 group-hover:gap-3 transition-all">
                                                Baca selengkapnya <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                <WaveDivider topColor="#f0fdfa" bottomColor="#ffffff" />

                <section className="py-12 sm:py-16 px-4 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="mb-6"
                        >
                            <div className="relative max-w-md">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari artikel..."
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="flex flex-wrap gap-2 mb-10"
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${activeCategory === cat
                                        ? "bg-teal-500 text-white shadow-md shadow-teal-200"
                                        : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </motion.div>

                        {filtered.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filtered.map((a, i) => (
                                    <motion.div
                                        key={a.slug}
                                        custom={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        <Link href={`/konten/${a.slug}`}>
                                            <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden cursor-pointer h-full flex flex-col">
                                                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-cyan-400" />
                                                <div className="p-5 sm:p-6 flex flex-col flex-1">
                                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${a.color}`}>
                                                            <Tag size={10} /> {a.category}
                                                        </span>
                                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                                            <Calendar size={10} /> {a.date}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-black text-gray-900 mb-2 leading-snug group-hover:text-teal-600 transition-colors">
                                                        {a.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{a.excerpt}</p>
                                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                                            <Clock size={10} /> {a.readTime}
                                                        </span>
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 group-hover:gap-2 transition-all">
                                                            Baca <ArrowRight size={12} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-400 text-sm">Tidak ada artikel yang sesuai dengan pencarian Anda.</p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="bg-gradient-to-br from-teal-600 to-cyan-500 pt-32 pb-14 sm:pt-40 sm:pb-16 px-4 text-white relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] bg-white/5 rounded-full" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center relative z-10"
                    >
                        <h2 className="text-2xl sm:text-3xl font-black mb-3">Ingin Tahu Lebih Banyak?</h2>
                        <p className="text-teal-50 mb-6 text-sm sm:text-base max-w-lg mx-auto">
                            Jelajahi layanan kesehatan digital kami dan temukan solusi yang tepat untuk Anda.
                        </p>
                        <Link
                            href="/tools"
                            className="inline-flex items-center gap-2 bg-white text-teal-700 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition shadow-lg"
                        >
                            Jelajahi Layanan <ArrowRight size={15} />
                        </Link>
                    </motion.div>

                    <WaveDivider topColor="#ffffff" bottomColor="transparent" flip className="absolute top-[-1px] left-0 w-full z-10" />
                </section>

            </main>
        </>
    );
}
