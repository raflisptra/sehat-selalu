"use client";

import HospitalFinder from "@/components/home/HospitalFinder";
import WaveDivider from "@/components/home/WaveDivider";
import Navbar from "@/components/layout/Navbar";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
    AlertTriangle,
    ArrowRight,
    Biohazard,
    Brain,
    CloudRain,
    Hospital,
    Map,
    Maximize2,
    Wind,
    X,
    Phone
} from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapComponent = dynamic(() => import("@/components/home/HeatMap"), {
    ssr: false,
    loading: () => (
        <div className="h-[460px] bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 animate-pulse border border-gray-200">
            <Map size={28} className="mr-2 opacity-40" />
            Memuat Peta...
        </div>
    ),
});

const diseaseData = [
    { city: "Jakarta", disease: "DBD", level: "high", season: "Hujan", aqi: 156, cases: 234 },
    { city: "Surabaya", disease: "ISPA", level: "high", season: "Kemarau", aqi: 189, cases: 412 },
    { city: "Bandung", disease: "Tifus", level: "medium", season: "Hujan", aqi: 87, cases: 89 },
    { city: "Medan", disease: "Malaria", level: "medium", season: "Hujan", aqi: 102, cases: 156 },
    { city: "Makassar", disease: "DBD", level: "low", season: "Kemarau", aqi: 65, cases: 43 },
    { city: "Yogyakarta", disease: "Hepatitis A", level: "low", season: "Hujan", aqi: 72, cases: 28 },
];

const levelStyle: Record<string, { card: string; badge: string; badgeText: string; glow: string }> = {
    high: { card: "border-red-200 bg-gradient-to-br from-red-50 to-rose-50", badge: "bg-red-500 text-white", badgeText: "TINGGI", glow: "shadow-red-100" },
    medium: { card: "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50", badge: "bg-amber-500 text-white", badgeText: "SEDANG", glow: "shadow-amber-100" },
    low: { card: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50", badge: "bg-emerald-500 text-white", badgeText: "RENDAH", glow: "shadow-emerald-100" },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

export default function ToolsPage() {
    const [fullscreenMap, setFullscreenMap] = useState(false);
    const [filterCity, setFilterCity] = useState("Semua");
    
    useEffect(() => {
        if (fullscreenMap) {
            document.body.classList.add("overflow-hidden", "map-fullscreen-open");
        } else {
            document.body.classList.remove("overflow-hidden", "map-fullscreen-open");
        }
        return () => {
            document.body.classList.remove("overflow-hidden", "map-fullscreen-open");
        };
    }, [fullscreenMap]);

    const cities = ["Semua", ...Array.from(new Set(diseaseData.map(d => d.city)))];
    const filtered = filterCity === "Semua" ? diseaseData : diseaseData.filter(d => d.city === filterCity);

    return (
        <>
            <Navbar />

            <AnimatePresence>
                {fullscreenMap && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed inset-0 z-[10000] bg-white flex flex-col"
                    >
                        <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                                    <Map size={16} className="text-teal-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Peta Wabah Indonesia</p>
                                    <p className="text-xs text-gray-400">Klik marker untuk zoom · Interaktif</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setFullscreenMap(false)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold transition"
                            >
                                <X size={14} /> Tutup
                            </button>
                        </div>
                        <div className="flex-1 min-h-0">
                            <MapComponent fullscreen />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="min-h-screen bg-white overflow-hidden">

                <section className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-80px] left-[-60px] w-[300px] h-[300px] bg-white/5 rounded-full" />
                        <div className="absolute bottom-[-60px] right-[-40px] w-[250px] h-[250px] bg-white/5 rounded-full" />
                    </div>
                    <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-black mb-4"
                        >
                            Health<span className="text-teal-200">Map</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-teal-50 max-w-xl font-medium"
                        >
                            Peta wabah penyakit realtime dan prediksi penyebaran berbasis AI untuk membantu Anda tetap waspada dan aman.
                        </motion.p>
                    </div>

                    <WaveDivider topColor="transparent" bottomColor="#f0fdfa" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />
                </section>

                <section className="py-14 sm:py-20 px-4 bg-teal-50">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Apa Itu HealthMap?</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                                HealthMap adalah platform pemantauan kesehatan Indonesia yang menyediakan peta wabah realtime, prediksi risiko berbasis AI, dan pencarian fasilitas kesehatan terdekat.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-3 gap-5">
                            {[
                                { Icon: Map, title: "Peta Wabah", desc: "Visualisasi penyebaran penyakit di seluruh Indonesia secara realtime", color: "from-teal-500 to-cyan-600", bg: "bg-white" },
                                { Icon: Brain, title: "Prediksi AI", desc: "Analisis risiko wabah berdasarkan data epidemiologi dan machine learning", color: "from-indigo-500 to-purple-600", bg: "bg-white" },
                                { Icon: Hospital, title: "Faskes Terdekat", desc: "Pencarian rumah sakit dan klinik terdekat dengan rute tercepat", color: "from-blue-500 to-sky-600", bg: "bg-white" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className={`${item.bg} rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                                >
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-sm`}>
                                        <item.Icon size={20} className="text-white" />
                                    </div>
                                    <h3 className="font-black text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <WaveDivider topColor="#f0fdfa" bottomColor="#ffffff" />

                <section className="py-14 sm:py-20 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
                        >
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Peta Wabah</h2>
                                <p className="text-gray-500 text-sm mt-1 max-w-lg">
                                    Visualisasi penyebaran penyakit di seluruh Indonesia. Klik area pada peta untuk zoom in dan lihat detail.
                                </p>
                            </div>
                            <button
                                onClick={() => setFullscreenMap(true)}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 py-3 rounded-xl font-bold text-sm hover:from-teal-600 hover:to-cyan-600 transition shadow-md shadow-teal-200/50 self-start sm:self-auto"
                            >
                                <Maximize2 size={15} /> Buka Peta Penuh
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                        >
                            <MapComponent />
                        </motion.div>
                    </div>
                </section>

                <WaveDivider topColor="#ffffff" bottomColor="#f8fafc" />

                <section className="py-14 sm:py-20 px-4 bg-slate-50">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Prediksi Risiko</h2>
                            <p className="text-gray-500 text-sm mt-1 max-w-lg">
                                Analisis risiko wabah di setiap kota berdasarkan data epidemiologi, cuaca, kualitas udara, dan machine learning.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white mb-8 relative overflow-hidden"
                        >
                            <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] bg-white/10 rounded-full" />
                            <div className="absolute bottom-[-20px] left-[40%] w-[80px] h-[80px] bg-white/5 rounded-full" />
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                    <Brain size={28} />
                                </div>
                                <div>
                                    <h3 className="font-black text-xl mb-1">Prediksi Berbasis AI</h3>
                                    <p className="text-violet-100 text-sm leading-relaxed">
                                        Model machine learning kami menganalisis data curah hujan, suhu udara, kelembaban, AQI, dan riwayat kasus untuk memperkirakan risiko wabah 2-4 minggu ke depan di setiap kota.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex gap-2 mb-6 flex-wrap">
                            {cities.map(city => (
                                <button key={city} onClick={() => setFilterCity(city)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${filterCity === city
                                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-200"
                                        : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                                        }`}>
                                    {city}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filtered.map((item, i) => (
                                <motion.div
                                    key={`${item.city}-${i}`}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className={`rounded-2xl border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${levelStyle[item.level].card} ${levelStyle[item.level].glow}`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-black text-gray-900 text-lg">{item.city}</h3>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <Biohazard size={12} /> {item.disease}
                                            </p>
                                        </div>
                                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm ${levelStyle[item.level].badge}`}>
                                            {levelStyle[item.level].badgeText}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                                        <div className="bg-white rounded-xl p-3 text-center border border-gray-100/50 shadow-sm">
                                            <div className="text-gray-400 mb-1 font-medium">Musim</div>
                                            <div className="font-bold text-gray-700 flex items-center justify-center gap-1">
                                                <CloudRain size={12} className="text-blue-400" /> {item.season}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 text-center border border-gray-100/50 shadow-sm">
                                            <div className="text-gray-400 mb-1 font-medium">AQI Udara</div>
                                            <div className={`font-bold flex items-center justify-center gap-1 ${item.aqi > 150 ? "text-red-500" : item.aqi > 100 ? "text-amber-500" : "text-green-600"}`}>
                                                <Wind size={12} /> {item.aqi}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl p-3 text-center col-span-2 border border-gray-100/50 shadow-sm">
                                            <div className="text-gray-400 mb-1 font-medium">Jumlah Kasus</div>
                                            <div className="font-black text-gray-900 text-xl flex items-center justify-center gap-1.5">
                                                <AlertTriangle size={14} className="text-amber-500" /> {item.cases} <span className="text-sm font-bold text-gray-500">kasus</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <WaveDivider topColor="#f8fafc" bottomColor="#f0f9ff" />

                <section className="py-14 sm:py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Faskes Terdekat</h2>
                            <p className="text-gray-500 text-sm mt-1 max-w-lg">
                                Cari rumah sakit, puskesmas, dan klinik terdekat di seluruh Indonesia. Filter berdasarkan tipe, BPJS, dan layanan IGD.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-3 gap-4 mb-8">
                            {[
                                { label: "RS Pusat", count: "4", desc: "Rujukan nasional", gradient: "from-rose-500 to-pink-600", bg: "bg-rose-50" },
                                { label: "Puskesmas", count: "2", desc: "Layanan primer", gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
                                { label: "RS Swasta", count: "2", desc: "Layanan premium", gradient: "from-violet-500 to-purple-600", bg: "bg-violet-50" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    custom={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className={`${item.bg} rounded-2xl border border-white p-5 hover:shadow-md transition-all duration-300`}
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3`}>
                                        <Hospital size={18} className="text-white" />
                                    </div>
                                    <div className="font-black text-2xl text-gray-900">{item.count}</div>
                                    <div className="font-bold text-sm text-gray-700">{item.label}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                        >
                            <HospitalFinder />
                        </motion.div>
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
                        <h2 className="text-2xl sm:text-3xl font-black mb-3">Punya Pertanyaan?</h2>
                        <p className="text-teal-50 mb-6 text-sm sm:text-base max-w-lg mx-auto">
                            Hubungi tim kami untuk informasi lebih lanjut tentang layanan kesehatan digital SelaluSehat.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-white text-teal-700 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition shadow-lg"
                        >
                            <Phone size={16} /> Hubungi Kami <ArrowRight size={15} />
                        </a>
                    </motion.div>

                    <WaveDivider topColor="#f0f9ff" bottomColor="transparent" flip className="absolute top-[-1px] left-0 w-full z-10" />
                </section>

            </main>
        </>
    );
}
