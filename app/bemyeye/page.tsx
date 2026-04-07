"use client";

import EmergencyCall from "@/components/bemyeye/EmergencyCall";
import SignLanguageGrid from "@/components/bemyeye/SignLanguageGrid";
import TextToSpeech from "@/components/bemyeye/TextToSpeech";
import WaveDivider from "@/components/home/WaveDivider";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import {
    Accessibility,
    ArrowRight,
    Ear,
    Eye,
    Hand,
    Heart,
    Siren,
    Speech,
    Volume2,
    X,
} from "lucide-react";
import { useState } from "react";
import { FaAmericanSignLanguageInterpreting, FaSignLanguage } from "react-icons/fa";
import { IoVolumeMute } from "react-icons/io5";
import { LiaDeafSolid } from "react-icons/lia";
import { MdBlind, MdSignLanguage } from "react-icons/md";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
    }),
};

export default function BeMyEyePage() {
    const [activeTab, setActiveTab] = useState("isyarat");
    const [ttsInitialText, setTtsInitialText] = useState("");
    const [lastCopiedMsg, setLastCopiedMsg] = useState("");

    const handleSpeechResult = (text: string) => {
        setTtsInitialText(text);
    };

    const handleMessageCopied = (msg: string) => {
        setLastCopiedMsg(msg);
    };

    const tabs = [
        { key: "isyarat", label: "Bahasa Isyarat", Icon: MdSignLanguage, color: "from-blue-500 to-indigo-600" },
        { key: "aksesibilitas", label: "TTS & STT", Icon: Speech, color: "from-cyan-500 to-teal-600" },
        { key: "darurat", label: "Telepon Darurat", Icon: Siren, color: "from-rose-500 to-red-600" },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white overflow-hidden">

                <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44 px-4 relative overflow-hidden">
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
                            Be<span className="text-blue-200">My</span>Eye
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-blue-50 max-w-xl mx-auto font-medium"
                        >
                            Platform aksesibilitas untuk penyandang disabilitas — bahasa isyarat SIBI, text-to-speech, speech-to-text, dan layanan darurat terintegrasi.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex justify-center gap-3 mt-5 flex-wrap"
                        >
                            {[
                                { icon: <LiaDeafSolid size={13} />, label: "Tunarungu" },
                                { icon: <MdBlind size={13} />, label: "Tunanetra" },
                                { icon: <IoVolumeMute size={13} />, label: "Tunawicara" },
                            ].map(tag => (
                                <span key={tag.label} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-blue-100 text-xs font-bold px-3 py-1.5 rounded-full">
                                    {tag.icon} {tag.label}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    <WaveDivider topColor="transparent" bottomColor="#eef2ff" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />
                </section>

                <section className="py-14 sm:py-20 px-4 bg-indigo-50">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Apa Itu BeMyEye?</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                                BeMyEye adalah platform aksesibilitas kesehatan yang dirancang khusus untuk membantu penyandang disabilitas mengakses layanan kesehatan. Dengan fitur bahasa isyarat, text-to-speech, dan layanan darurat, kami memastikan semua orang mendapat akses yang setara.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { Icon: FaAmericanSignLanguageInterpreting, title: "Bahasa Isyarat", desc: "Panduan lengkap alfabet SIBI dengan ilustrasi posisi jari yang mudah dipahami", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" },
                                { Icon: Speech, title: "Text-to-Speech", desc: "Ubah teks menjadi suara dan sebaliknya untuk komunikasi tanpa hambatan", color: "from-cyan-500 to-teal-600", bg: "bg-cyan-50" },
                                { Icon: Siren, title: "Darurat Cepat", desc: "Akses langsung ke nomor darurat dan pesan cepat untuk situasi kritis", color: "from-rose-500 to-red-600", bg: "bg-rose-50" },
                                { Icon: Accessibility, title: "Inklusif", desc: "Dirancang dengan prinsip aksesibilitas untuk semua jenis disabilitas", color: "from-violet-500 to-purple-600", bg: "bg-violet-50" },
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



                <section className="bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 pt-32 pb-32 sm:pt-40 sm:pb-40 px-4 relative overflow-hidden">
                    <WaveDivider topColor="#eef2ff" bottomColor="transparent" flip height={90} className="absolute top-[-1px] left-0 w-full z-10" />
                    <WaveDivider topColor="transparent" bottomColor="#eef2ff" height={90} className="absolute bottom-[-1px] left-0 w-full z-10" />

                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Fitur BeMyEye</h2>
                            <p className="text-blue-200 max-w-lg mx-auto text-sm">
                                Pilih fitur yang Anda butuhkan. Semua fitur dirancang agar mudah digunakan oleh semua kalangan.
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
                                        : "bg-white/5 border border-white/10 text-gray-400 hover:border-blue-400 hover:text-blue-300"
                                        }`}
                                >
                                    <tab.Icon size={15} />
                                    {tab.label}
                                </motion.button>
                            ))}
                        </div>

                        {lastCopiedMsg && activeTab !== "darurat" && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-500/15 border border-green-700/50 rounded-xl px-4 py-2.5 text-sm text-green-300 flex items-center justify-between mb-6"
                            >
                                <span>✅ Pesan disalin: &quot;{lastCopiedMsg.substring(0, 50)}...&quot;</span>
                                <button onClick={() => setLastCopiedMsg("")} className="text-gray-500 hover:text-gray-300 flex items-center gap-1 text-xs">
                                    <X size={12} /> Tutup
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
                            {activeTab === "isyarat" && (
                                <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                                        <FaSignLanguage size={20} className="text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Panduan Bahasa Isyarat SIBI</h3>
                                        <p className="text-blue-200 text-xs mt-0.5">Pelajari alfabet bahasa isyarat Indonesia (SIBI) lengkap dari A-Z dengan deskripsi posisi jari yang detail.</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "aksesibilitas" && (
                                <div className="bg-gradient-to-r from-cyan-500/20 to-teal-500/10 border border-cyan-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/30 flex items-center justify-center flex-shrink-0">
                                        <Speech size={20} className="text-cyan-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Text-to-Speech & Speech-to-Text</h3>
                                        <p className="text-cyan-200 text-xs mt-0.5">Ubah teks menjadi suara untuk tunanetra, atau konversi suara ke teks untuk tunawicara — komunikasi dua arah tanpa hambatan.</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "darurat" && (
                                <div className="bg-gradient-to-r from-rose-500/20 to-red-500/10 border border-rose-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/30 flex items-center justify-center flex-shrink-0">
                                        <Siren size={20} className="text-rose-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Layanan Telepon Darurat</h3>
                                        <p className="text-rose-200 text-xs mt-0.5">Akses cepat ke nomor darurat Indonesia. Dilengkapi pesan cepat siap salin untuk penyandang disabilitas yang tidak bisa berbicara.</p>
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
                            {activeTab === "isyarat" && (
                                <SignLanguageGrid
                                    onLetterSelected={(letter) => console.log("Dipilih:", letter)}
                                />
                            )}
                            {activeTab === "aksesibilitas" && (
                                <TextToSpeech
                                    initialText={ttsInitialText}
                                    onSpeechResult={handleSpeechResult}
                                />
                            )}
                            {activeTab === "darurat" && (
                                <EmergencyCall
                                    onMessageCopied={handleMessageCopied}
                                />
                            )}
                        </motion.div>
                    </div>
                </section>



                <section className="py-16 sm:py-24 px-4 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 max-w-7xl mx-auto flex justify-center mt-10">
                        <div className="w-[600px] h-[600px] bg-indigo-50/80 rounded-full blur-3xl pointer-events-none" />
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
                                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Dampak <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">BeMyEye</span></h2>
                                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                                    Memberdayakan ribuan penyandang disabilitas di seluruh Indonesia untuk mengakses informasi kesehatan, berkomunikasi tanpa batas, dan terhubung dengan layanan darurat.
                                </p>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { value: "26", label: "Alfabet SIBI", icon: <FaSignLanguage size={24}/>, gradient: "from-blue-500 to-indigo-600", lightBg: "bg-blue-50", textColor: "text-blue-600" },
                                { value: "10+", label: "Pilihan Suara TTS", icon: <Speech size={24}/>, gradient: "from-cyan-500 to-teal-600", lightBg: "bg-cyan-50", textColor: "text-cyan-600" },
                                { value: "3", label: "Jenis Disabilitas", icon: <Accessibility size={24}/>, gradient: "from-violet-500 to-purple-600", lightBg: "bg-violet-50", textColor: "text-violet-600" },
                                { value: "6", label: "Layanan Darurat", icon: <Siren size={24}/>, gradient: "from-rose-500 to-red-600", lightBg: "bg-rose-50", textColor: "text-rose-600" },
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

                <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 pt-32 pb-14 sm:pt-40 sm:pb-16 px-4 text-white relative overflow-hidden">
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
                        <Accessibility size={40} className="mx-auto mb-4 text-blue-200" />
                        <h2 className="text-2xl sm:text-3xl font-black mb-3">Aksesibilitas Untuk Semua</h2>
                        <p className="text-blue-50 mb-6 text-sm sm:text-base max-w-lg mx-auto">
                            Setiap orang berhak mendapatkan akses kesehatan yang setara. BeMyEye hadir untuk menjembatani kesenjangan aksesibilitas.
                        </p>
                        <button
                            onClick={() => {
                                setActiveTab("isyarat");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition shadow-lg"
                        >
                            Mulai Gunakan <ArrowRight size={15} />
                        </button>
                    </motion.div>

                    <WaveDivider topColor="#eef2ff" bottomColor="transparent" flip className="absolute top-[-1px] left-0 w-full z-10" />
                </section>

            </main>
        </>
    );
}
