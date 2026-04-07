"use client";

import WaveDivider from "@/components/home/WaveDivider";

import Navbar from "@/components/layout/Navbar";
import { motion, Variants } from "framer-motion";
import {
    ArrowRight,
    Brain,
    Dna,
    CheckCircle2,
    Eye,
    Globe,
    MapPinPlusInside,
    Database,
    Bot,
    HeartPulse,
    Leaf,
    Lightbulb,
    Phone,
    Shield,
    Sparkles,
    Stethoscope,
    Target,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react";
import Link from "next/link";

const values = [
    {
        icon: HeartPulse,
        title: "Kesehatan Pertama",
        desc: "Kami menempatkan kesehatan masyarakat sebagai prioritas utama dalam setiap keputusan produk.",
        color: "from-rose-500 to-pink-500",
        bg: "bg-rose-50",
        text: "text-rose-600",
    },
    {
        icon: Shield,
        title: "Data Aman & Terpercaya",
        desc: "Setiap data kesehatan dikelola dengan standar keamanan tinggi dan transparansi penuh.",
        color: "from-blue-500 to-indigo-500",
        bg: "bg-blue-50",
        text: "text-blue-600",
    },
    {
        icon: Users,
        title: "Inklusif & Merata",
        desc: "Layanan kami dirancang untuk menjangkau seluruh lapisan masyarakat Indonesia.",
        color: "from-amber-500 to-orange-500",
        bg: "bg-amber-50",
        text: "text-amber-600",
    },
    {
        icon: Zap,
        title: "Inovasi Berkelanjutan",
        desc: "Kami terus berinovasi dengan teknologi AI terkini untuk solusi kesehatan masa depan.",
        color: "from-teal-500 to-cyan-500",
        bg: "bg-teal-50",
        text: "text-teal-600",
    },
];

const timeline = [
    {
        year: "2025 Q1",
        title: "Ide & Riset Awal",
        desc: "Tim melakukan riset mendalam tentang tantangan kesehatan digital di Indonesia, termasuk survei ke masyarakat.",
    },
    {
        year: "2025 Q2",
        title: "Pengembangan MVP",
        desc: "Membangun prototipe pertama dengan fitur peta wabah dan prediksi menggunakan data WHO dan Kemenkes RI.",
    },
    {
        year: "2025 Q3",
        title: "Peluncuran Beta",
        desc: "Rilis beta publik dengan 5 layanan utama: HealthMap, GenomID, HerbalSainsID, BeMyEye, dan SimDoc AI.",
    },
    {
        year: "2026 Q1",
        title: "Ekspansi Nasional",
        desc: "Menjangkau 34 provinsi dengan 10.000+ pengguna aktif dan kerjasama bersama puskesmas di seluruh Indonesia.",
    },
];

const services = [
    {
        icon: MapPinPlusInside,
        title: "HealthMap",
        desc: "Peta interaktif penyebaran penyakit real-time di seluruh Indonesia dengan data dari Kemenkes RI.",
        color: "bg-teal-500",
    },
    {
        icon: Dna,
        title: "GenomID",
        desc: "Analisis risiko genetik berbasis DNA yang dikombinasikan dengan kearifan lokal Indonesia.",
        color: "bg-violet-500",
    },
    {
        icon: Leaf,
        title: "HerbalSainsID",
        desc: "Kumpulan Database tanaman obat Indonesia dengan bukti ilmiah, dosis aman, dan interaksi obat.",
        color: "bg-emerald-500",
    },
    {
        icon: Eye,
        title: "BeMyEye",
        desc: "Bantuan Navigasi & Layanan darurat untuk disabilitas",
        color: "bg-pink-500",
    },
    {
        icon: Stethoscope,
        title: "SimDoc AI",
        desc: "Konsultasi dokter AI untuk triase gejala berbasis bukti klinis dan rekomendasi spesialis.",
        color: "bg-blue-500",
    },
];



const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
};



export default function AboutPage() {
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
                            Tentang Kami
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-teal-50 max-w-xl mx-auto font-medium"
                        >
                            Mengenal lebih dekat platform kesehatan digital yang hadir untuk masyarakat Indonesia.
                        </motion.p>
                    </div>

                    <WaveDivider topColor="transparent" bottomColor="#ffffff" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />
                </section>

                <section className="py-16 sm:py-20 px-4 bg-white">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
                                Apa Itu <span className="text-teal-600">SelaluSehat</span>?
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                                SelaluSehat adalah ekosistem layanan kesehatan digital berbasis kecerdasan buatan (AI)
                                yang dirancang khusus untuk masyarakat Indonesia. Kami menghubungkan data kesehatan
                                dari berbagai sumber terpercaya seperti Kemenkes RI dan WHO menjadi satu platform
                                yang mudah diakses oleh siapa saja.
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                                Dari peta penyebaran penyakit real-time, prediksi epidemi berbasis AI, database
                                herbal Indonesia, deteksi dini penyakit mata, hingga konsultasi dokter AI —
                                semua tersedia dalam satu platform untuk membantu Anda memantau dan mengelola
                                kesehatan secara mandiri.
                            </p>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                Kami percaya bahwa akses terhadap informasi kesehatan yang akurat bukan hak
                                segelintir orang, melainkan hak setiap warga Indonesia.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-7 sm:p-8 border border-teal-100"
                        >
                            <h3 className="font-bold text-gray-900 mb-5 text-lg">Platform Kami</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { icon: MapPinPlusInside, label: "HealthMap", desc: "Peta wabah & fasilitas kesehatan", color: "text-teal-600", bg: "bg-teal-100" },
                                    { icon: Dna, label: "GenomID", desc: "Analisis risiko genetik berbasis DNA", color: "text-violet-600", bg: "bg-violet-100" },
                                    { icon: Leaf, label: "HerbalSainsID", desc: "Kumpulan database tanaman obat ilmiah", color: "text-emerald-600", bg: "bg-emerald-100" },
                                    { icon: Eye, label: "BeMyEye", desc: "Bantuan Navigasi & Layanan darurat untuk disabilitas", color: "text-pink-600", bg: "bg-pink-100" },
                                    { icon: Stethoscope, label: "SimDoc AI", desc: "Konsultasi & triase dokter AI", color: "text-blue-600", bg: "bg-blue-100" },
                                ].map((p) => (
                                    <div key={p.label} className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-lg ${p.bg} flex items-center justify-center flex-shrink-0`}>
                                            <p.icon size={16} className={p.color} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-900 text-sm">{p.label}</span>
                                            <span className="text-gray-500 text-xs ml-2">{p.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <WaveDivider topColor="#ffffff" bottomColor="#f9fafb" />

                <section className="py-16 sm:py-20 px-4 bg-gray-50">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Visi & Misi Kami</h2>
                            <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
                                Membangun masa depan kesehatan Indonesia yang lebih baik melalui teknologi.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                            <motion.div
                                custom={0}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-7 sm:p-8 text-white relative overflow-hidden hover:shadow-xl hover:shadow-teal-200/40 transition-all duration-300"
                            >
                                <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                                        <Eye size={24} />
                                    </div>
                                    <h3 className="text-xl font-black mb-3">Visi</h3>
                                    <p className="text-teal-50 leading-relaxed text-sm sm:text-base">
                                        Menjadi platform kesehatan digital terdepan di Indonesia yang memberikan akses
                                        informasi kesehatan yang akurat, mudah dipahami, dan berbasis bukti ilmiah untuk
                                        seluruh masyarakat Indonesia tanpa terkecuali.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                custom={1}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="group bg-white rounded-2xl p-7 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-lg hover:border-teal-200 transition-all duration-300"
                            >
                                <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] bg-teal-50 rounded-full group-hover:scale-110 transition-transform duration-500" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-5">
                                        <Target size={24} className="text-teal-600" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-3">Misi</h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Menyediakan data kesehatan akurat dari sumber terpercaya",
                                            "Mengembangkan AI untuk deteksi dini dan triase penyakit",
                                            "Melestarikan pengetahuan herbal Indonesia secara ilmiah",
                                            "Menjangkau seluruh lapisan masyarakat di 34 provinsi",
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-600">
                                                <CheckCircle2 size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto mt-24 sm:mt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Nilai-Nilai Kami</h2>
                            <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
                                Prinsip yang mendasari setiap langkah kami dalam membangun SelaluSehat.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {values.map(({ icon: Icon, title, desc, bg, text, color }, i) => (
                                <motion.div
                                    key={title}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-transparent relative overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon size={22} className={text} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <WaveDivider topColor="#f9fafb" bottomColor="#ffffff" />

                <section id="layanan" className="py-16 sm:py-20 px-4 bg-white scroll-mt-24">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Layanan Kami</h2>
                            <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
                                Lima platform terintegrasi yang dirancang untuk kebutuhan kesehatan masyarakat Indonesia.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {services.map((svc, i) => {
                                const targetHref = svc.title === "HealthMap" ? "/tools" : `/${svc.title.toLowerCase().replace(/ /g, '')}`;
                                return (
                                    <Link href={targetHref} key={svc.title} className="block">
                                        <motion.div
                                            custom={i}
                                            variants={fadeUp}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            className="group h-full bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer"
                                        >
                                            <div className={`w-11 h-11 rounded-xl ${svc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <svc.icon size={20} className="text-white" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2">{svc.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-4">{svc.desc}</p>
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 group-hover:gap-2 transition-all">
                                                Pelajari lebih lanjut <ArrowRight size={12} />
                                            </span>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <WaveDivider topColor="#ffffff" bottomColor="#f0fdfa" />

                <section className="py-16 sm:py-20 px-4 bg-teal-50">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Perjalanan Kami</h2>
                            <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
                                Dari ide sederhana hingga platform kesehatan digital nasional.
                            </p>
                        </motion.div>

                        <div className="relative">
                            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-teal-200 sm:-translate-x-0.5" />

                            <div className="space-y-8 sm:space-y-10">
                                {timeline.map((item, i) => (
                                    <motion.div
                                        key={item.year}
                                        custom={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className={`relative flex items-start gap-4 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                                            }`}
                                    >
                                        <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-sm -translate-x-1.5 sm:-translate-x-1.5 mt-1.5 z-10" />

                                        <div className={`ml-10 sm:ml-0 sm:w-[45%] ${i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"}`}>
                                            <span className="inline-block bg-teal-100 text-teal-700 text-xs font-black px-3 py-1 rounded-full mb-2">
                                                {item.year}
                                            </span>
                                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <WaveDivider topColor="#f0fdfa" bottomColor="#ffffff" />

                <section className="py-16 sm:py-20 px-4 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Mengapa SelaluSehat?</h2>
                            <p className="text-gray-500 max-w-lg mx-auto text-sm sm:text-base">
                                Yang membedakan kami dari platform kesehatan lainnya.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Bot,
                                    title: "AI Berbasis Lokal",
                                    desc: "Model AI kami dilatih dengan data kesehatan Indonesia untuk akurasi yang lebih relevan dengan kondisi lokal.",
                                    color: "bg-amber-50",
                                    iconColor: "text-amber-600",
                                },
                                {
                                    icon: Database,
                                    title: "Data Real-Time",
                                    desc: "Integrasi data langsung dari Kemenkes RI, WHO, dan sumber terpercaya lainnya yang selalu diperbarui.",
                                    color: "bg-blue-50",
                                    iconColor: "text-blue-600",
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Prediksi Proaktif",
                                    desc: "Sistem prediksi berbasis machine learning yang mampu mendeteksi tren epidemi sebelum terjadi lonjakan.",
                                    color: "bg-emerald-50",
                                    iconColor: "text-emerald-600",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="group text-center bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 mx-auto rounded-2xl ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon size={26} className={item.iconColor} />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-teal-600 to-cyan-500 pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 text-white relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-white/5 rounded-full" />
                        <div className="absolute bottom-[-50px] left-[-30px] w-[180px] h-[180px] bg-white/5 rounded-full" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center relative z-10"
                    >
                        <h2 className="text-2xl sm:text-3xl font-black mb-4">
                            Siap Menjaga Kesehatanmu?
                        </h2>
                        <p className="text-teal-50 mb-8 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                            Bergabunglah bersama ribuan pengguna SelaluSehat and mulai pantau kesehatanmu hari ini.
                            Gratis, mudah, and terpercaya.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/tools"
                                className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-50 transition shadow-lg shadow-teal-900/10 group"
                            >
                                <Sparkles size={16} className="text-teal-500" />
                                <span>Coba Sekarang</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 transition backdrop-blur-sm"
                            >
                                <Phone size={16} />
                                <span>Hubungi Kami</span>
                            </Link>
                        </div>
                    </motion.div>

                    <WaveDivider topColor="#ffffff" bottomColor="transparent" flip className="absolute top-[-1px] left-0 w-full z-10" />
                </section>

            </main>
        </>
    );
}
