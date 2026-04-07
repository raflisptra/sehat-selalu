"use client";

import WaveDivider from "@/components/home/WaveDivider";
import Navbar from "@/components/layout/Navbar";
import ChatBot from "@/components/simdoc/ChatBot";
import { HealthContext } from "@/components/simdoc/simdocData";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Bot,
    Brain,
    Clock,
    Dna,
    Leaf,
    Link2,
    Map,
    MapPinPlus,
    PhoneCall,
    Shield,
    Stethoscope
} from "lucide-react";
import Link from "next/link";
import { FaUserDoctor } from "react-icons/fa6";
import { LuBrainCog } from "react-icons/lu";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

export default function SimDocPage() {
    const healthContext: HealthContext = {
        fromPage: "simdoc",
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white overflow-hidden">

                <section className="bg-gradient-to-br from-teal-600 via-cyan-600 to-sky-600 text-white pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44 px-4 relative overflow-hidden">
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
                            Sim<span className="text-teal-200">Doc</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-teal-50 max-w-xl mx-auto font-medium"
                        >
                            Konsultasi kesehatan dengan dokter virtual AI. Terhubung langsung dengan GenomID, HerbalSainsID, dan BeMyEye.
                        </motion.p>
                    </div>

                    <WaveDivider topColor="transparent" bottomColor="#ecfeff" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />
                </section>



                <section className="py-14 sm:py-20 px-4 bg-cyan-50">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Apa Itu SimDoc?</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                                SimDoc adalah asisten dokter virtual berbasis AI Gemini yang siap menjawab pertanyaan kesehatan Anda 24/7 dalam Bahasa Indonesia. Terintegrasi dengan seluruh fitur platform Selalu Sehat untuk memberikan rekomendasi yang lebih personal.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { Icon: LuBrainCog, title: "AI Cerdas", desc: "Didukung Gemini AI untuk memberikan informasi kesehatan yang akurat dan terkini", color: "from-teal-500 to-cyan-600", bg: "bg-teal-50" },
                                { Icon: Clock, title: "24/7 Online", desc: "Tersedia kapan saja tanpa perlu menunggu — respons instan untuk pertanyaan Anda", color: "from-sky-500 to-blue-600", bg: "bg-sky-50" },
                                { Icon: Shield, title: "Privasi Terjaga", desc: "Percakapan Anda tidak disimpan secara permanen dan diproses secara aman", color: "from-violet-500 to-purple-600", bg: "bg-violet-50" },
                                { Icon: Link2, title: "Terintegrasi", desc: "Terhubung dengan GenomID, HerbalSainsID, dan BeMyEye untuk rekomendasi holistik", color: "from-amber-500 to-orange-600", bg: "bg-amber-50" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className={`${item.bg} rounded-2xl border border-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                                >
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                                        <item.Icon size={20} className="text-white" />
                                    </div>
                                    <h3 className="font-black text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-8 text-center"
                        >
                            <p className="text-xs text-gray-400 mb-3 font-medium">Fitur terkait yang terintegrasi dengan SimDoc</p>
                            <div className="flex justify-center gap-3 flex-wrap">
                                {[
                                    { href: "/genomid", icon: <Dna size={14} />, label: "Cek Risiko Genetik" },
                                    { href: "/herbalsainsid", icon: <Leaf size={14} />, label: "Info Herbal" },
                                    { href: "/bemyeye", icon: <PhoneCall size={14} />, label: "Telepon Darurat" },
                                    { href: "/tools", icon: <MapPinPlus size={14} />, label: "HealthMap" },
                                ].map(link => (
                                    <Link key={link.href} href={link.href}
                                        className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-teal-600 text-xs font-medium px-4 py-2 rounded-full transition shadow-sm flex items-center gap-2">
                                        {link.icon} {link.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-teal-950 via-cyan-950 to-slate-950 pt-32 pb-32 sm:pt-40 sm:pb-40 px-4 relative overflow-hidden">
                    <WaveDivider topColor="#ecfeff" bottomColor="transparent" flip height={90} className="absolute top-[-1px] left-0 w-full z-10" />
                    <WaveDivider topColor="transparent" bottomColor="#ecfeff" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />

                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Mulai Konsultasi</h2>
                            <p className="text-teal-200 max-w-lg mx-auto text-sm">
                                Tanyakan apa saja tentang kesehatan — gejala, nutrisi, herbal, obat, atau informasi darurat. SimDoc siap membantu.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-r from-teal-500/20 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8"
                        >
                            <div className="w-10 h-10 rounded-xl bg-teal-500/30 flex items-center justify-center flex-shrink-0">
                                <Stethoscope size={20} className="text-teal-300" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Dokter Virtual AI</h3>
                                <p className="text-teal-200 text-xs mt-0.5">Didukung oleh Gemini AI — berikan pertanyaan Anda dan dapatkan jawaban berbasis bukti medis dalam Bahasa Indonesia.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                        >
                            <ChatBot
                                healthContext={healthContext}
                            />
                        </motion.div>
                    </div>
                </section>

                <section className="py-16 sm:py-24 px-4 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 max-w-7xl mx-auto flex justify-center mt-10">
                        <div className="w-[600px] h-[600px] bg-cyan-50/80 rounded-full blur-3xl pointer-events-none" />
                    </div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="max-w-xl"
                            >
                                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Dampak <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">SimDoc</span></h2>
                                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                                    SimDoc membantu ribuan pengguna di Indonesia mendapatkan informasi kesehatan yang tepat, memvalidasi gejala awal dengan cepat, dan memberikan ketenangan pikiran secara real-time.
                                </p>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { value: "10rb+", label: "Konsultasi Selesai", icon: <Stethoscope size={24}/>, gradient: "from-teal-500 to-cyan-600", lightBg: "bg-teal-50", textColor: "text-teal-600" },
                                { value: "24/7", label: "Akses Tanpa Henti", icon: <Clock size={24}/>, gradient: "from-sky-500 to-blue-600", lightBg: "bg-sky-50", textColor: "text-sky-600" },
                                { value: "5+", label: "Kategori Medis", icon: <LuBrainCog size={24}/>, gradient: "from-violet-500 to-purple-600", lightBg: "bg-violet-50", textColor: "text-violet-600" },
                                { value: "4", label: "Aplikasi Terpadu", icon: <Link2 size={24}/>, gradient: "from-amber-500 to-orange-600", lightBg: "bg-amber-50", textColor: "text-amber-600" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group flex flex-col items-start"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
                                    
                                    <div className={`w-14 h-14 rounded-2xl ${stat.lightBg} ${stat.textColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight">
                                        {stat.value}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-teal-600 via-cyan-600 to-sky-600 pt-32 pb-14 sm:pt-40 sm:pb-16 px-4 text-white relative overflow-hidden">
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
                        <FaUserDoctor size={40} className="mx-auto mb-4 text-teal-200" />
                        <h2 className="text-2xl sm:text-3xl font-black mb-3">Tanya SimDoc Sekarang</h2>
                        <p className="text-teal-50 mb-6 text-sm sm:text-base max-w-lg mx-auto">
                            Jangan ragu untuk bertanya — SimDoc siap membantu Anda memahami kondisi kesehatan dan memberikan rekomendasi yang tepat.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="inline-flex items-center gap-2 bg-white text-teal-700 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition shadow-lg"
                        >
                            Mulai Konsultasi <ArrowRight size={15} />
                        </button>
                    </motion.div>

                    <WaveDivider topColor="#ecfeff" bottomColor="transparent" flip height={90} className="absolute top-[-1px] left-0 w-full z-10" />
                </section>

            </main>
        </>
    );
}
