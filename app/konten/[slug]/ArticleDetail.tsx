"use client";

import WaveDivider from "@/components/home/WaveDivider";

import Navbar from "@/components/layout/Navbar";
import { articles, type Article } from "@/lib/articles";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";

export default function ArticleDetail({ article }: { article: Article }) {
    const related = articles
        .filter((a) => a.category === article.category && a.slug !== article.slug)
        .slice(0, 2);

    const otherRelated =
        related.length < 2
            ? articles.filter((a) => a.slug !== article.slug && !related.includes(a)).slice(0, 2 - related.length)
            : [];

    const allRelated = [...related, ...otherRelated];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white overflow-hidden">
                <section className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] bg-white/5 rounded-full" />
                        <div className="absolute bottom-[-60px] right-[-40px] w-[250px] h-[250px] bg-white/5 rounded-full" />
                    </div>
                    <div className="max-w-3xl mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link
                                href="/konten"
                                className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium mb-5 transition"
                            >
                                <ArrowLeft size={14} /> Kembali ke Artikel
                            </Link>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                                    <Tag size={10} /> {article.category}
                                </span>
                                <span className="text-xs text-white/70 flex items-center gap-1">
                                    <Calendar size={10} /> {article.date}
                                </span>
                                <span className="text-xs text-white/70 flex items-center gap-1">
                                    <Clock size={10} /> {article.readTime}
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">{article.title}</h1>
                        </motion.div>
                    </div>

                    <WaveDivider topColor="transparent" bottomColor="#ffffff" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />
                </section>

                <section className="py-12 sm:py-16 px-4 bg-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="border-l-4 border-teal-400 pl-5 mb-8">
                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed italic">
                                {article.excerpt}
                            </p>
                        </div>

                        <div className="space-y-5">
                            {article.content.map((para, i) => (
                                <p key={i} className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                    {para}
                                </p>
                            ))}
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-3">
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full ${article.color}`}>
                                <Tag size={10} /> {article.category}
                            </span>
                            <Link
                                href="/konten"
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:gap-2.5 transition-all"
                            >
                                <ArrowLeft size={14} /> Lihat semua artikel
                            </Link>
                        </div>
                    </motion.div>
                </section>

                <section className="pt-32 pb-14 sm:pt-40 sm:pb-16 px-4 bg-gray-50 relative overflow-hidden">
                    <WaveDivider topColor="#ffffff" bottomColor="transparent" flip height={90} className="absolute top-[-1px] left-0 w-full z-10" />

                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">Artikel Terkait</h2>
                        <div className="grid sm:grid-cols-2 gap-5">
                            {allRelated.map((a) => (
                                <Link key={a.slug} href={`/konten/${a.slug}`}>
                                    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden cursor-pointer">
                                        <div className="h-1.5 bg-gradient-to-r from-teal-500 to-cyan-400" />
                                        <div className="p-5 sm:p-6">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${a.color}`}>
                                                    <Tag size={10} /> {a.category}
                                                </span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Clock size={10} /> {a.readTime}
                                                </span>
                                            </div>
                                            <h3 className="font-black text-gray-900 leading-snug group-hover:text-teal-600 transition-colors mb-2">
                                                {a.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{a.excerpt}</p>
                                            <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-teal-600 group-hover:gap-2 transition-all">
                                                Baca <ArrowRight size={12} />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
}
