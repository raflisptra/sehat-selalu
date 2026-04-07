"use client";

import HerbalInteractionChecker from "@/components/herbalsainsid/HerbalInteractionChecker";
import HerbalVisualizer from "@/components/herbalsainsid/HerbalVisualizer";
import ResearcherValidation from "@/components/herbalsainsid/ResearcherValidation";
import { HerbalPlant } from "@/components/herbalsainsid/herbalData";
import WaveDivider from "@/components/home/WaveDivider";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Award,
    BookOpen,
    FlaskConical,
    Globe,
    Leaf,
    Microscope,
    ShieldCheck,
    Sprout,
    Drama,
    X,
    UserRoundCheck,
} from "lucide-react";
import { useState } from "react";
import { PiPottedPlant } from "react-icons/pi";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

export default function HerbalSainsIDPage() {
    const [activeTab, setActiveTab] = useState("visualisasi");
    const [selectedPlant, setSelectedPlant] = useState<HerbalPlant | null>(null);

    const handlePlantSelected = (plant: HerbalPlant) => {
        setSelectedPlant(plant);
    };

    const tabs = [
        { key: "visualisasi", label: "Visualisasi Tanaman", Icon: Leaf, color: "from-emerald-500 to-green-600" },
        { key: "interaksi", label: "Cek Interaksi", Icon: FlaskConical, color: "from-teal-500 to-cyan-600" },
        { key: "validasi", label: "Validasi Peneliti", Icon: UserRoundCheck, color: "from-amber-500 to-orange-600" },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white overflow-hidden">

                <section className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44 px-4 relative overflow-hidden">
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
                            Herbal<span className="text-emerald-200">Sains</span>ID
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-emerald-50 max-w-xl mx-auto font-medium"
                        >
                            Jembatan antara kearifan lokal jamu tradisional Indonesia dengan validasi ilmu pengetahuan modern.
                        </motion.p>
                    </div>

                    <WaveDivider topColor="transparent" bottomColor="#ecfdf5" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />
                </section>

                <section className="py-14 sm:py-20 px-4 bg-emerald-50">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Apa Itu HerbalSainsID?</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                                HerbalSainsID adalah database tanaman obat Indonesia yang menggabungkan pengetahuan tradisional dengan bukti ilmiah. Setiap tanaman dilengkapi dosis aman, interaksi obat, dan referensi penelitian terpublikasi.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { Icon: Sprout, title: "Daftar Tanaman", desc: "Database lengkap tanaman obat Indonesia dengan bukti ilmiah", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50" },
                                { Icon: ShieldCheck, title: "Dosis Aman", desc: "Informasi dosis yang aman berdasarkan referensi farmakologi", color: "from-teal-500 to-cyan-600", bg: "bg-teal-50" },
                                { Icon: Microscope, title: "Interaksi Obat", desc: "Cek potensi interaksi antara herbal dengan obat konvensional", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" },
                                { Icon: Drama, title: "Kearifan Lokal", desc: "Berbasis pengetahuan jamu tradisional Nusantara yang divalidasi", color: "from-amber-500 to-orange-600", bg: "bg-amber-50" },
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

                <section className="bg-gradient-to-br from-green-950 via-emerald-950 to-slate-950 pt-32 pb-32 sm:pt-40 sm:pb-40 px-4 relative overflow-hidden">
                    <WaveDivider topColor="#ecfdf5" bottomColor="transparent" flip height={90} className="absolute top-[-1px] left-0 w-full z-10" />
                    <WaveDivider topColor="transparent" bottomColor="#ecfdf5" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />

                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Fitur HerbalSainsID</h2>
                            <p className="text-emerald-200 max-w-lg mx-auto text-sm">
                                Jelajahi database tanaman obat, cek interaksi herbal, dan lihat validasi dari peneliti dan apoteker Indonesia.
                            </p>
                        </motion.div>
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
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
                                        : "bg-white/5 border border-white/10 text-gray-400 hover:border-emerald-400 hover:text-emerald-300"
                                        }`}
                                >
                                    <tab.Icon size={15} />
                                    {tab.label}
                                </motion.button>
                            ))}
                        </div>

                        {selectedPlant && activeTab !== "visualisasi" && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-emerald-500/15 border border-emerald-700/50 rounded-xl px-4 py-2.5 text-sm text-emerald-300 flex items-center justify-between mb-6"
                            >
                                <span className="flex items-center gap-2">
                                    <Leaf size={14} /> Tanaman terpilih: <strong>{selectedPlant.name}</strong>
                                </span>
                                <button onClick={() => setSelectedPlant(null)} className="text-gray-500 hover:text-gray-300 flex items-center gap-1 text-xs">
                                    <X size={12} /> Reset
                                </button>
                            </motion.div>
                        )}

                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-8"
                        >
                            {activeTab === "visualisasi" && (
                                <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/10 border border-emerald-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center flex-shrink-0">
                                        <Leaf size={20} className="text-emerald-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Visualisasi Tanaman Obat</h3>
                                        <p className="text-emerald-200 text-xs mt-0.5">Jelajahi database tanaman obat Indonesia dengan informasi lengkap — khasiat, dosis, dan referensi ilmiah.</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "interaksi" && (
                                <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-teal-500/30 flex items-center justify-center flex-shrink-0">
                                        <FlaskConical size={20} className="text-teal-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Cek Interaksi Herbal</h3>
                                        <p className="text-teal-200 text-xs mt-0.5">Periksa potensi interaksi antara tanaman herbal dengan obat konvensional untuk menghindari efek samping berbahaya.</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "validasi" && (
                                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                                        <UserRoundCheck size={20} className="text-amber-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Validasi Peneliti</h3>
                                        <p className="text-amber-200 text-xs mt-0.5">Lihat status validasi dari peneliti, apoteker, dan praktisi kesehatan Indonesia untuk setiap tanaman obat.</p>
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
                            {activeTab === "visualisasi" && (
                                <HerbalVisualizer
                                    onSelectPlant={handlePlantSelected}
                                    selectedPlantId={selectedPlant?.id}
                                />
                            )}
                            {activeTab === "interaksi" && (
                                <HerbalInteractionChecker
                                    preselectedHerbal={selectedPlant?.name}
                                />
                            )}
                            {activeTab === "validasi" && <ResearcherValidation />}
                        </motion.div>
                    </div>
                </section>

                <section className="py-16 sm:py-24 px-4 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 max-w-7xl mx-auto flex justify-center mt-10">
                        <div className="w-[600px] h-[600px] bg-emerald-50/80 rounded-full blur-3xl pointer-events-none" />
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
                                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Dampak <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">HerbalSainsID</span></h2>
                                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                                    Memvalidasi kearifan lokal jamu Nusantara dengan sains modern, menghubungkan ratusan peneliti untuk memastikan penggunaan tanaman obat yang akurat dan aman.
                                </p>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { value: "200+", label: "Database Tanaman", icon: <Sprout size={24}/>, gradient: "from-emerald-500 to-green-600", lightBg: "bg-emerald-50", textColor: "text-emerald-600" },
                                { value: "500+", label: "Interaksi Dicek", icon: <FlaskConical size={24}/>, gradient: "from-teal-500 to-cyan-600", lightBg: "bg-teal-50", textColor: "text-teal-600" },
                                { value: "50+", label: "Validator Ahli", icon: <UserRoundCheck size={24}/>, gradient: "from-amber-500 to-orange-600", lightBg: "bg-amber-50", textColor: "text-amber-600" },
                                { value: "34", label: "Provinsi Tercakup", icon: <Globe size={24}/>, gradient: "from-blue-500 to-indigo-600", lightBg: "bg-blue-50", textColor: "text-blue-600" },
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

                <section className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 pt-32 pb-14 sm:pt-40 sm:pb-16 px-4 text-white relative overflow-hidden">
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
                        <PiPottedPlant size={40} className="mx-auto mb-4 text-white/80" />
                        <h2 className="text-2xl sm:text-3xl font-black mb-3">Jelajahi Tanaman Obat Indonesia</h2>
                        <p className="text-emerald-50 mb-6 text-sm sm:text-base max-w-lg mx-auto">
                            Temukan khasiat tanaman obat tradisional yang telah divalidasi secara ilmiah oleh peneliti Indonesia.
                        </p>
                        <button
                            onClick={() => {
                                setActiveTab("visualisasi");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition shadow-lg"
                        >
                            Mulai Eksplorasi <ArrowRight size={15} />
                        </button>
                    </motion.div>

                    <WaveDivider topColor="#ecfdf5" bottomColor="transparent" flip height={90} className="absolute top-[-1px] left-0 w-full z-10" />
                </section>

            </main>
        </>
    );
}
