"use client";

import DietEducation from "@/components/genomid/DietEducation";
import FoodNutritionCalculator from "@/components/genomid/FoodNutritionCalculator";
import GeneticRiskCalculator, { DiseaseRisk } from "@/components/genomid/GeneticRiskCalculator";
import MedicineAlarm from "@/components/genomid/MedicineAlarm";
import WaveDivider from "@/components/home/WaveDivider";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Bell,
    Brain,
    Dna,
    Dumbbell,
    LineChart,
    ShieldCheck,
    Sparkles,
    UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { GiDna2 } from "react-icons/gi";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

export default function GenomIDPage() {
    const [activeTab, setActiveTab] = useState("risiko");
    const [riskData, setRiskData] = useState<DiseaseRisk[]>([]);

    const tabs = [
        { key: "risiko", label: "Risiko Genetik", Icon: Dna, color: "from-purple-500 to-violet-600" },
        { key: "nutrisi", label: "Nutrisi Makanan", Icon: UtensilsCrossed, color: "from-emerald-500 to-teal-600" },
        { key: "alarm", label: "Alarm Obat", Icon: Bell, color: "from-rose-500 to-pink-600" },
        { key: "diet", label: "Diet & Olahraga", Icon: Dumbbell, color: "from-amber-500 to-orange-600" },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white overflow-hidden">

                <section className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 text-white pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44 px-4 relative overflow-hidden">
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
                            Genom<span className="text-purple-200">ID</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-purple-100 max-w-xl mx-auto font-medium"
                        >
                            Kalkulator risiko penyakit genetik, analisis nutrisi makanan, alarm pengingat obat, dan panduan diet personal berbasis data genomik.
                        </motion.p>
                    </div>

                    <WaveDivider topColor="transparent" bottomColor="#faf5ff" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />
                </section>

                <section className="py-14 sm:py-20 px-4 bg-purple-50">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Apa Itu GenomID?</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                                GenomID adalah platform analisis kesehatan personal berbasis data genomik dan gaya hidup. Dengan menggabungkan faktor genetik, nutrisi, dan kebiasaan harian, GenomID memberikan prediksi risiko penyakit dan rekomendasi kesehatan yang dipersonalisasi.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { Icon: Brain, title: "Analisis AI", desc: "Model prediksi berbasis machine learning untuk risiko genetik", color: "from-purple-500 to-violet-600", bg: "bg-purple-50" },
                                { Icon: ShieldCheck, title: "Data Privat", desc: "Data kesehatan Anda dilindungi enkripsi end-to-end", color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
                                { Icon: LineChart, title: "Tracking", desc: "Pantau progres diet, obat, dan perubahan gaya hidup", color: "from-blue-500 to-cyan-600", bg: "bg-blue-50" },
                                { Icon: Sparkles, title: "Personalisasi", desc: "Rekomendasi diet & olahraga sesuai profil genetik Anda", color: "from-amber-500 to-orange-600", bg: "bg-amber-50" },
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
                    </div>
                </section>

                <section className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 pt-32 pb-32 sm:pt-40 sm:pb-40 px-4 relative overflow-hidden">
                    <WaveDivider topColor="#faf5ff" bottomColor="transparent" flip height={90} className="absolute top-[-1px] left-0 w-full z-10" />
                    <WaveDivider topColor="transparent" bottomColor="#faf5ff" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />

                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Fitur GenomID</h2>
                            <p className="text-purple-200 max-w-lg mx-auto text-sm">
                                Pilih fitur yang ingin Anda gunakan. Semua kalkulasi dilakukan secara lokal — data Anda tidak dikirim ke server manapun.
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {tabs.map((tab, i) => (
                                <motion.button
                                    key={tab.key}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${activeTab === tab.key
                                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                                        : "bg-white/5 border border-white/10 text-gray-400 hover:border-purple-400 hover:text-purple-300"
                                        }`}
                                >
                                    <tab.Icon size={15} />
                                    {tab.label}
                                </motion.button>
                            ))}
                        </div>

                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-8"
                        >
                            {activeTab === "risiko" && (
                                <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/10 border border-purple-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                                        <Dna size={20} className="text-purple-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Kalkulator Risiko Genetik</h3>
                                        <p className="text-purple-200 text-xs mt-0.5">Masukkan data diri dan riwayat keluarga untuk menghitung probabilitas risiko penyakit genetik.</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "nutrisi" && (
                                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center flex-shrink-0">
                                        <UtensilsCrossed size={20} className="text-emerald-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Kalkulator Nutrisi Makanan</h3>
                                        <p className="text-emerald-200 text-xs mt-0.5">Cari makanan dan hitung total kalori, protein, karbohidrat, lemak, vitamin, dan mineral harian Anda.</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "alarm" && (
                                <div className="bg-gradient-to-r from-rose-500/20 to-pink-500/10 border border-rose-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/30 flex items-center justify-center flex-shrink-0">
                                        <Bell size={20} className="text-rose-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Alarm Pengingat Obat</h3>
                                        <p className="text-rose-200 text-xs mt-0.5">Atur jadwal minum obat harian. Pilih penyakit, obat, dosis, dan waktu — dan dapatkan pengingat otomatis.</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "diet" && (
                                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                                        <Dumbbell size={20} className="text-amber-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Panduan Diet & Olahraga</h3>
                                        <p className="text-amber-200 text-xs mt-0.5">Dapatkan rekomendasi diet, jadwal makan, dan jenis olahraga berdasarkan golongan darah dan profil risiko Anda.</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            key={`content-${activeTab}`}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                        >
                            {activeTab === "risiko" && (
                                <GeneticRiskCalculator onRiskCalculated={(risks) => setRiskData(risks)} />
                            )}
                            {activeTab === "nutrisi" && <FoodNutritionCalculator />}
                            {activeTab === "alarm" && <MedicineAlarm />}
                            {activeTab === "diet" && <DietEducation riskData={riskData} />}
                        </motion.div>
                    </div>
                </section>



                <section className="py-16 sm:py-24 px-4 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 max-w-7xl mx-auto flex justify-center mt-10">
                        <div className="w-[600px] h-[600px] bg-purple-50/80 rounded-full blur-3xl pointer-events-none" />
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
                                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Dampak <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">GenomID</span></h2>
                                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                                    Mengubah cara ribuan pengguna di Indonesia memahami genetik mereka, memungkinkan pencegahan penyakit mematikan lebih dini dan optimalisasi gaya hidup sehat harian.
                                </p>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { value: "5.2rb+", label: "Analisis Genetik", icon: <Dna size={24}/>, gradient: "from-purple-500 to-violet-600", lightBg: "bg-purple-50", textColor: "text-purple-600" },
                                { value: "12rb+", label: "Nutrisi Dihitung", icon: <UtensilsCrossed size={24}/>, gradient: "from-emerald-500 to-teal-600", lightBg: "bg-emerald-50", textColor: "text-emerald-600" },
                                { value: "8.1rb+", label: "Diet Personal", icon: <Dumbbell size={24}/>, gradient: "from-amber-500 to-orange-600", lightBg: "bg-amber-50", textColor: "text-amber-600" },
                                { value: "3.5rb+", label: "Alarm Pengingat", icon: <Bell size={24}/>, gradient: "from-rose-500 to-pink-600", lightBg: "bg-rose-50", textColor: "text-rose-600" },
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

                <section className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 pt-32 pb-14 sm:pt-40 sm:pb-16 px-4 text-white relative overflow-hidden">
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
                        <GiDna2 size={40} className="mx-auto mb-4 text-white/80" />
                        <h2 className="text-2xl sm:text-3xl font-black mb-3">Mulai Analisis Kesehatan Anda</h2>
                        <p className="text-purple-100 mb-6 text-sm sm:text-base max-w-lg mx-auto">
                            Ketahui risiko genetik dan dapatkan rekomendasi diet personal yang sesuai dengan profil kesehatan Anda.
                        </p>
                        <button
                            onClick={() => {
                                setActiveTab("risiko");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-2 bg-white text-purple-700 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition shadow-lg"
                        >
                            Coba Sekarang <ArrowRight size={15} />
                        </button>
                    </motion.div>

                    <WaveDivider topColor="#faf5ff" bottomColor="transparent" flip height={90} className="absolute top-[-1px] left-0 w-full z-10" />
                </section>

            </main>
        </>
    );
}
