"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItemProps {
    question: string;
    answer: string;
    index: number;
}

const faqs = [
    {
        q: "Bagaimana cara memulai menggunakan platform Sehat Selalu?",
        a: "Cukup buka website, pilih layanan yang ingin digunakan (HealthMap, SimDoc AI, dll), dan langsung gunakan tanpa perlu registrasi untuk fitur dasar.",
    },
    {
        q: "Apakah data peta wabah akurat dan terpercaya?",
        a: "Ya. Semua data bersumber dari institusi resmi seperti BMKG, Kemenkes RI, dan BPJS yang diperbarui secara realtime setiap hari.",
    },
    {
        q: "Apakah konsultasi dengan SimDoc AI aman?",
        a: "SimDoc AI dirancang berdasarkan pedoman klinis terverifikasi. Respons AI bersifat informatif dan tidak menggantikan diagnosis dokter — kami selalu menyarankan konsultasi langsung untuk kondisi serius.",
    },
    {
        q: "Apa itu GenomID dan siapa yang bisa menggunakannya?",
        a: "GenomID adalah platform analisis genomik yang membantu mengidentifikasi risiko penyakit genetik. Siapapun dapat menggunakan layanan ini untuk mendapatkan wawasan kesehatan berbasis DNA.",
    },
    {
        q: "Berapa biaya menggunakan layanan Sehat Selalu?",
        a: "Layanan HealthMap, Prediksi Risiko, dan informasi umum sepenuhnya gratis. Beberapa fitur lanjutan seperti konsultasi mendalam mungkin memerlukan akun terverifikasi.",
    },
    {
        q: "Apakah aplikasi ini tersedia di mobile?",
        a: "Website Sehat Selalu dirancang responsif dan dapat diakses dengan sempurna di perangkat mobile, tablet, maupun desktop tanpa perlu mengunduh aplikasi.",
    },
];

function FAQItem({ question, answer, index }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: index * 0.15,
                ease: "easeOut",
            }}
            className={`group rounded-2xl border transition-all duration-200 ease-in-out ${isOpen
                    ? "border-teal-200 bg-teal-50 shadow-sm"
                    : "border-gray-100 bg-[#f5f7fb] hover:border-gray-200"
                }`}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
                <h3
                    className={`text-sm font-semibold transition-colors duration-200 ${isOpen ? "text-teal-700" : "text-gray-800"
                        }`}
                >
                    {question}
                </h3>
                <motion.div
                    animate={{
                        rotate: isOpen ? 180 : 0,
                        scale: isOpen ? 1.1 : 1,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    className={`shrink-0 rounded-full p-0.5 transition-colors duration-200 ${isOpen ? "text-teal-600" : "text-gray-400"
                        }`}
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                                height: {
                                    duration: 0.4,
                                    ease: [0.04, 0.62, 0.23, 0.98],
                                },
                                opacity: {
                                    duration: 0.25,
                                    delay: 0.1,
                                },
                            },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: {
                                    duration: 0.3,
                                    ease: "easeInOut",
                                },
                                opacity: {
                                    duration: 0.25,
                                },
                            },
                        }}
                    >
                        <div className="border-t border-teal-100/60 px-5 pt-2 pb-4">
                            <motion.p
                                initial={{ y: -8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -8, opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                                className="text-sm text-gray-600 leading-relaxed"
                            >
                                {answer}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQSection() {
    return (
        <section className="bg-white py-14 sm:py-16 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                        Got questions?
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Jawaban untuk pertanyaan yang paling sering ditanyakan.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <FAQItem
                            key={i}
                            question={faq.q}
                            answer={faq.a}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
