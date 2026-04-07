"use client";

import WaveDivider from "@/components/home/WaveDivider";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ChevronDown,
    Clock,
    FileText,
    Headphones,
    HelpCircle,
    Mail,
    MapPin,
    MessageSquare,
    MessageCircleQuestionMark,
    Phone,
    Send,
    Shield,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
    {
        q: "Apakah layanan SelaluSehat gratis?",
        a: "Ya, semua layanan dasar SelaluSehat dapat diakses secara gratis. Kami berkomitmen memberikan akses informasi kesehatan yang setara untuk seluruh masyarakat Indonesia.",
    },
    {
        q: "Bagaimana cara menggunakan HealthMap?",
        a: "Cukup buka halaman Tools, pilih HealthMap, dan Anda dapat langsung melihat peta penyebaran penyakit di seluruh Indonesia. Gunakan filter untuk melihat data berdasarkan jenis penyakit dan lokasi.",
    },
    {
        q: "Apakah data kesehatan saya aman?",
        a: "Keamanan data adalah prioritas kami. Semua data dienkripsi dan disimpan sesuai standar keamanan internasional. Kami tidak pernah membagikan data pribadi pengguna kepada pihak ketiga.",
    },
    {
        q: "Apakah SimDoc AI bisa menggantikan dokter?",
        a: "Tidak. SimDoc AI dirancang sebagai alat triase awal untuk membantu Anda memahami gejala dan merekomendasikan spesialis yang tepat. Konsultasi langsung dengan dokter tetap diperlukan untuk diagnosis dan pengobatan.",
    },
    {
        q: "Bagaimana cara berkontribusi atau bekerja sama?",
        a: "Kami terbuka untuk kerja sama dengan institusi kesehatan, peneliti, dan pengembang. Silakan hubungi kami melalui form di atas atau email ke partnership@selalusehat.id.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`border border-gray-100 rounded-xl transition-all duration-200 ${open ? "bg-white shadow-sm" : "bg-white hover:bg-gray-50"
                }`}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
                <span className="font-bold text-gray-900 text-sm sm:text-base pr-4">{q}</span>
                <ChevronDown
                    size={18}
                    className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-200 ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>
            </div>
        </motion.div>
    );
}

export default function ContactPage() {
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
                            Hubungi Kami
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-teal-50 max-w-xl mx-auto font-medium"
                        >
                            Tim kami siap membantu Anda. Kirimkan pesan atau hubungi melalui saluran yang tersedia.
                        </motion.p>
                    </div>

                    <WaveDivider topColor="transparent" bottomColor="#f0fdfa" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />
                </section>

                <section className="bg-teal-50 py-12 sm:py-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
                            {[
                                {
                                    icon: Mail,
                                    title: "Email",
                                    value: "hello@selalusehat.id",
                                    sub: "Kami biasa membalas dalam 1 × 24 jam",
                                    color: "text-teal-600",
                                    bg: "bg-teal-100",
                                },
                                {
                                    icon: Phone,
                                    title: "Telepon / WhatsApp",
                                    value: "+62 812-3456-7890",
                                    sub: "Senin–Jumat, 08.00–17.00 WIB",
                                    color: "text-blue-600",
                                    bg: "bg-blue-100",
                                },
                                {
                                    icon: MapPin,
                                    title: "Kantor",
                                    value: "Jakarta Selatan, DKI Jakarta",
                                    sub: "Indonesia",
                                    color: "text-rose-600",
                                    bg: "bg-rose-100",
                                },
                            ].map(({ icon: Icon, title, value, sub, color, bg }, i) => (
                                <motion.div
                                    key={title}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="group bg-white rounded-2xl border border-teal-100 shadow-sm p-6 hover:shadow-md hover:border-teal-200 transition-all duration-300"
                                >
                                    <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={20} className={color} />
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                                        {title}
                                    </p>
                                    <p className="font-black text-gray-900 mb-1">{value}</p>
                                    <p className="text-sm text-gray-500">{sub}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <WaveDivider topColor="#f0fdfa" bottomColor="#ffffff" />

                <section className="py-14 sm:py-20 px-4 bg-white">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8 sm:gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
                        >
                            <h2 className="text-xl font-black text-gray-900 mb-1">Kirim Pesan</h2>
                            <p className="text-sm text-gray-500 mb-6">Isi formulir di bawah dan kami akan segera menghubungi Anda.</p>
                            <form className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            placeholder="Nama Anda"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition font-medium bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            placeholder="email@contoh.com"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition font-medium bg-gray-50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Subjek</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition font-medium bg-gray-50 text-gray-700">
                                        <option value="">Pilih topik...</option>
                                        <option value="umum">Pertanyaan Umum</option>
                                        <option value="teknis">Bantuan Teknis</option>
                                        <option value="kerjasama">Kerja Sama / Partnership</option>
                                        <option value="data">Keamanan Data</option>
                                        <option value="saran">Saran & Masukan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Pesan</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Tuliskan pertanyaan atau masukan Anda…"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition resize-none font-medium bg-gray-50"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-black py-3 rounded-xl transition text-sm shadow-md shadow-teal-200/50 hover:shadow-lg hover:shadow-teal-200/50"
                                >
                                    <Send size={15} /> Kirim Pesan
                                </button>
                            </form>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="md:col-span-2 space-y-5"
                        >
                            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-6 text-white relative overflow-hidden">
                                <div className="absolute top-[-20px] right-[-20px] w-[100px] h-[100px] bg-white/10 rounded-full" />
                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                                        <Clock size={20} />
                                    </div>
                                    <h3 className="font-black text-lg mb-1">Waktu Respons</h3>
                                    <p className="text-teal-50 text-sm leading-relaxed">
                                        Kami biasanya merespons dalam <strong>1 × 24 jam</strong> pada hari kerja.
                                        Untuk pertanyaan mendesak, gunakan WhatsApp.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Saluran Bantuan</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: Headphones, label: "Live Chat", desc: "Senin–Jumat, 09.00–16.00 WIB", color: "text-violet-600", bg: "bg-violet-50" },
                                        { icon: FileText, label: "Pusat Bantuan", desc: "Artikel & panduan lengkap", color: "text-amber-600", bg: "bg-amber-50" },
                                        { icon: Shield, label: "Keamanan Data", desc: "Laporan privasi & keamanan", color: "text-emerald-600", bg: "bg-emerald-50" },
                                    ].map((ch) => (
                                        <div key={ch.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer group">
                                            <div className={`w-9 h-9 rounded-lg ${ch.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                <ch.icon size={16} className={ch.color} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{ch.label}</p>
                                                <p className="text-xs text-gray-400">{ch.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                                <h3 className="font-bold text-gray-900 mb-3">Ikuti Kami</h3>
                                <p className="text-sm text-gray-500 mb-4">Dapatkan update kesehatan terbaru dari komunitas kami.</p>
                                <div className="flex gap-2">
                                    {["Instagram", "Twitter", "LinkedIn"].map((platform) => (
                                        <span
                                            key={platform}
                                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:border-teal-300 hover:text-teal-600 transition cursor-pointer"
                                        >
                                            {platform}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <WaveDivider topColor="#ffffff" bottomColor="#f9fafb" />

                <section className="py-14 sm:py-20 px-4 bg-gray-50">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <div className="w-12 h-12 mx-auto rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                                <HelpCircle size={24} className="text-teal-600" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Pertanyaan Umum</h2>
                            <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                                Jawaban untuk pertanyaan yang sering ditanyakan seputar SelaluSehat.
                            </p>
                        </motion.div>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-teal-600 to-cyan-500 pt-32 pb-14 sm:pt-40 sm:pb-16 px-4 text-white relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] bg-white/5 rounded-full" />
                        <div className="absolute bottom-[-40px] left-[-30px] w-[150px] h-[150px] bg-white/5 rounded-full" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center relative z-10"
                    >
                        <MessageCircleQuestionMark size={32} className="mx-auto mb-4 text-white/80" />
                        <h2 className="text-2xl sm:text-3xl font-black mb-3">
                            Belum Menemukan Jawaban?
                        </h2>
                        <p className="text-teal-50 mb-6 text-sm sm:text-base max-w-lg mx-auto">
                            Jangan ragu untuk menghubungi kami langsung. Tim support kami selalu siap membantu Anda.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href="mailto:hello@selalusehat.id"
                                className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition shadow-lg"
                            >
                                <Mail size={15} /> Email Kami
                            </a>
                            <Link
                                href="/tools"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition backdrop-blur-sm"
                            >
                                Jelajahi Layanan <ArrowRight size={15} />
                            </Link>
                        </div>
                    </motion.div>

                    <WaveDivider topColor="#f9fafb" bottomColor="transparent" flip className="absolute top-[-1px] left-0 w-full z-10" />
                </section>

            </main>
        </>
    );
}
