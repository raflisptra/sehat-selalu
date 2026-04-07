"use client";
import {
    AlertTriangle,
    Biohazard,
    CloudRain,
    Hospital,
    Map,
    TrendingUp,
    Wind,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import HospitalFinder from "./HospitalFinder";

const MapComponent = dynamic(() => import("./HeatMap"), {
    ssr: false,
    loading: () => (
        <div className="h-[460px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 animate-pulse border border-gray-200">
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

const levelStyle: Record<string, { card: string; badge: string; badgeText: string }> = {
    high: { card: "border-red-200 bg-red-50", badge: "bg-red-100 text-red-600 border-red-200", badgeText: "TINGGI" },
    medium: { card: "border-amber-200 bg-amber-50", badge: "bg-amber-100 text-amber-600 border-amber-200", badgeText: "SEDANG" },
    low: { card: "border-green-200 bg-green-50", badge: "bg-green-100 text-green-600 border-green-200", badgeText: "RENDAH" },
};

export default function ToolsTabSection() {
    const [activeTab, setActiveTab] = useState<"peta" | "prediksi" | "faskes">("peta");
    const [filterCity, setFilterCity] = useState("Semua");

    const cities = ["Semua", ...Array.from(new Set(diseaseData.map(d => d.city)))];
    const filtered = filterCity === "Semua" ? diseaseData : diseaseData.filter(d => d.city === filterCity);

    return (
        <section id="tools" className="bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900">Peta &amp; Analisis Wabah</h2>
                        <p className="text-gray-400 text-sm mt-1">Pantau situasi kesehatan di Indonesia secara visual</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {[
                            { key: "peta", label: "Peta Wabah", Icon: Map },
                            { key: "prediksi", label: "Prediksi Risiko", Icon: TrendingUp },
                            { key: "faskes", label: "Faskes Terdekat", Icon: Hospital },
                        ].map(tab => (
                            <button key={tab.key}
                                onClick={() => setActiveTab(tab.key as "peta" | "prediksi" | "faskes")}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition border ${activeTab === tab.key
                                        ? "bg-teal-500 border-teal-500 text-white shadow-sm"
                                        : "bg-white border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-500"
                                    }`}>
                                <tab.Icon size={13} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: activeTab === "peta" ? "block" : "none" }}>
                    <MapComponent />
                    <div className="flex flex-wrap gap-4 mt-4 justify-center text-xs text-gray-500">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" />Risiko Tinggi</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />Risiko Sedang</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" />Risiko Rendah</span>
                    </div>
                </div>

                {activeTab === "prediksi" && (
                    <div>
                        <div className="flex gap-2 mb-6 flex-wrap">
                            {cities.map(city => (
                                <button key={city} onClick={() => setFilterCity(city)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${filterCity === city
                                            ? "bg-teal-500 border-teal-500 text-white"
                                            : "bg-white border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-500"
                                        }`}>
                                    {city}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filtered.map((item, i) => (
                                <div key={i} className={`rounded-2xl border p-5 ${levelStyle[item.level].card}`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-base">{item.city}</h3>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                <Biohazard size={11} /> {item.disease}
                                            </p>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${levelStyle[item.level].badge}`}>
                                            {levelStyle[item.level].badgeText}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="bg-white/70 rounded-xl p-2.5 text-center border border-white">
                                            <div className="text-gray-400 mb-0.5">Musim</div>
                                            <div className="font-semibold text-gray-700 flex items-center justify-center gap-1">
                                                <CloudRain size={11} /> {item.season}
                                            </div>
                                        </div>
                                        <div className="bg-white/70 rounded-xl p-2.5 text-center border border-white">
                                            <div className="text-gray-400 mb-0.5">AQI Udara</div>
                                            <div className={`font-semibold flex items-center justify-center gap-1 ${item.aqi > 150 ? "text-red-500" : item.aqi > 100 ? "text-amber-500" : "text-green-600"}`}>
                                                <Wind size={11} /> {item.aqi}
                                            </div>
                                        </div>
                                        <div className="bg-white/70 rounded-xl p-2.5 text-center col-span-2 border border-white">
                                            <div className="text-gray-400 mb-0.5">Jumlah Kasus</div>
                                            <div className="font-bold text-gray-900 text-lg flex items-center justify-center gap-1">
                                                <AlertTriangle size={13} /> {item.cases} kasus
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "faskes" && <HospitalFinder />}
            </div>
        </section>
    );
}
