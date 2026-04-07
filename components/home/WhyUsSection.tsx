"use client";
import { Activity, BrainCircuit, HeartPulse, ShieldCheck, Users, Focus, Hospital } from "lucide-react";
import { PiMapPinSimpleAreaBold } from "react-icons/pi";

const reasons = [
    {
        Icon: ShieldCheck,
        title: "100% Data Terverifikasi",
        description: "Semua data bersumber dari BMKG, Kemenkes, BPJS, dan BPOM yang diperbarui secara realtime.",
        bg: "bg-green-100",
        iconColor: "text-green-700",
    },
    {
        Icon: BrainCircuit,
        title: "AI Kesehatan Cerdas",
        description: "Machine learning terkini untuk prediksi risiko, analisis genomik, dan konsultasi gejala berbasis bukti.",
        bg: "bg-pink-100",
        iconColor: "text-pink-700",
    },
    {
        Icon: Focus,
        title: "Fokus Indonesia",
        description: "Dirancang khusus untuk kondisi iklim, penyakit endemik, dan tanaman herbal asli Indonesia.",
        bg: "bg-yellow-100",
        iconColor: "text-yellow-700",
    },
];

export default function WhyUsSection() {
    return (
        <section className="bg-[#f5f7fb] py-16 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                        Why Choose Us
                    </h2>
                    <p className="text-gray-400 text-sm">Kepercayaan dan akurasi untuk kesehatan masyarakat Indonesia.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {reasons.map(({ Icon, title, description, bg, iconColor }) => (
                        <div key={title} className={`${bg} rounded-2xl p-7 group hover:scale-[1.02] transition-transform`}>
                            <div className="mb-5">
                                <div className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center">
                                    <Icon size={26} className={iconColor} strokeWidth={1.8} />
                                </div>
                            </div>
                            <h3 className="font-extrabold text-gray-900 text-base mb-2 leading-tight">{title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { Icon: Activity, value: "962", label: "Kasus dipantau" },
                        { Icon: Hospital, value: "1.247", label: "RS terintegrasi" },
                        { Icon: PiMapPinSimpleAreaBold, value: "34", label: "Provinsi tercakup" },
                        { Icon: Users, value: "10K+", label: "Pengguna aktif" },
                    ].map(({ Icon, value, label }) => (
                        <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
                            <div className="flex justify-center mb-2">
                                <Icon size={18} className="text-teal-500" />
                            </div>
                            <div className="text-2xl font-extrabold text-gray-900">{value}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
