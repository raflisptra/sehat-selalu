"use client";
import {
    Activity, AlertTriangle, Apple, Brain, Dna, HeartPulse, Info, Leaf, Lightbulb, Link2, Map, MessageCircle, MessageCircleMore, Shield, Stethoscope, Trash2, User
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    categoryColors,
    categoryIcons,
    fallbackResponses,
    HealthContext,
    Message, MessageCategory, QuickQuestion,
    quickQuestions,
    WELCOME_MESSAGE,
} from "./simdocData";
import { FaNutritionix, FaUserDoctor } from "react-icons/fa6";
import { ImLeaf } from "react-icons/im";
import { TbActivity, TbActivityHeartbeat } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { LuBrainCog } from "react-icons/lu";

const getCategoryIcon = (cat: MessageCategory, size = 14) => {
    switch (cat) {
        case "gejala": return <TbActivity size={size} className="inline mr-1.5" />;
        case "obat": return <HeartPulse size={size} className="inline mr-1.5" />;
        case "nutrisi": return <FaNutritionix size={size} className="inline mr-1.5" />;
        case "herbal": return <ImLeaf size={size} className="inline mr-1.5" />;
        case "darurat": return <AlertTriangle size={size} className="inline mr-1.5" />;
        default: return <MessageCircle size={size} className="inline mr-1.5" />;
    }
};

interface Props {
    healthContext?: HealthContext;
}

function ChatBubble({ message }: { message: Message }) {
    const isUser = message.role === "user";
    const time = message.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

    const parseMarkdown = (text: string) => {
        return text.split("\n").map((line, i) => {
            const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
            return (
                <span key={i}>
                    {parts.map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={j} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                        } else if (part.startsWith("*") && part.endsWith("*")) {
                            return <em key={j} className="italic text-teal-100">{part.slice(1, -1)}</em>;
                        }
                        return <span key={j}>{part}</span>;
                    })}
                    {i < text.split("\n").length - 1 && <br />}
                </span>
            );
        });
    };

    return (
        <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white ${isUser ? "bg-teal-600" : "bg-gradient-to-br from-blue-600 to-teal-600"}`}>
                {isUser ? <User size={18} /> : <FaUserDoctor size={18} />}
            </div>

            <div className={`max-w-[78%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                {!isUser && message.category && message.category !== "umum" && (
                    <span className={`text-xs px-2.5 py-1 rounded-full border mb-1 flex items-center gap-1.5 ${categoryColors[message.category]}`}>
                        {categoryIcons[message.category]} <span className="capitalize">{message.category}</span>
                    </span>
                )}

                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser
                    ? "bg-teal-600 text-white rounded-tr-sm"
                    : "bg-white/10 border border-white/10 text-gray-200 rounded-tl-sm"
                    }`}>
                    {parseMarkdown(message.content)}
                </div>

                <span suppressHydrationWarning className="text-xs text-gray-600 px-1 mt-1">{time}</span>
            </div>
        </div>
    );
}

function TypingIndicator() {
    return (
        <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center flex-shrink-0 text-white">
                <FaUserDoctor size={18} />
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function RelatedPageSuggestion({ category, content }: { category?: MessageCategory; content: string }) {
    const suggestions: Record<string, { href: string; label: string; icon: React.ReactNode }> = {
        herbal: { href: "/herbalsainsid", label: "Lihat detail di HerbalSainsID", icon: <ImLeaf size={12} className="inline mr-1" /> },
        nutrisi: { href: "/genomid", label: "Kalkulator Nutrisi di GenomID", icon: <FaNutritionix size={12} className="inline mr-1" /> },
        gejala: { href: "/genomid", label: "Cek Risiko Genetik di GenomID", icon: <TbActivity size={12} className="inline mr-1" /> },
        darurat: { href: "/bemyeye", label: "Tombol Darurat di BeMyEye", icon: <FaEye size={12} className="inline mr-1" /> },
        obat: { href: "/genomid", label: "Set Alarm Obat di GenomID", icon: <Dna size={12} className="inline mr-1" /> },
        umum: { href: "/", label: "Lihat HealthMap", icon: <Map size={12} className="inline mr-1" /> },
    };

    const contentLower = content.toLowerCase();
    let detectedKey = category || "umum";
    if (contentLower.includes("genomid") || contentLower.includes("genetik") || contentLower.includes("nutrisi")) detectedKey = "nutrisi";
    if (contentLower.includes("herbal") || contentLower.includes("herbalsainsid") || contentLower.includes("jamu")) detectedKey = "herbal";
    if (contentLower.includes("darurat") || contentLower.includes("bemyeye")) detectedKey = "darurat";
    if (contentLower.includes("alarm") || contentLower.includes("obat")) detectedKey = "obat";

    const suggestion = suggestions[detectedKey];
    if (!suggestion) return null;

    return (
        <div className="ml-12">
            <Link href={suggestion.href}
                className="inline-flex items-center gap-2 text-xs bg-teal-500/10 border border-teal-700 text-teal-400 hover:bg-teal-500/20 px-3 py-1.5 rounded-full transition">
                {suggestion.icon} {suggestion.label} →
            </Link>
        </div>
    );
}

export default function ChatBot({ healthContext }: Props) {
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiAvailable, setApiAvailable] = useState(true);
    const [activeFilter, setActiveFilter] = useState<MessageCategory | "semua">("semua");
    const [showSuggestions, setShowSuggestions] = useState(true);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (messages.length <= 1 && !isLoading) return;
        const container = chatContainerRef.current;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages, isLoading]);

    useEffect(() => {
        if (healthContext?.fromPage && healthContext.fromPage !== "simdoc") {
            const contextMessages: Record<string, string> = {
                genomid: healthContext.diseaseRisk
                    ? `Saya baru saja menggunakan GenomID dan mendapat hasil risiko ${healthContext.diseaseRisk} cukup tinggi. Apa yang harus saya lakukan?`
                    : "Saya baru menggunakan GenomID. Bisakah jelaskan lebih lanjut tentang risiko genetik?",
                herbalsainsid: healthContext.herbalPlant
                    ? `Saya sedang membaca tentang ${healthContext.herbalPlant} di HerbalSainsID. Apakah aman dikonsumsi sehari-hari?`
                    : "Saya baru dari HerbalSainsID. Herbal apa yang paling baik untuk imunitas?",
                bemyeye: "Saya baru dari BeMyEye. Bagaimana cara pertolongan pertama yang benar?",
            };
            const ctxMsg = contextMessages[healthContext.fromPage];
            if (ctxMsg) setTimeout(() => sendMessage(ctxMsg), 500);
        }
    }, [healthContext]);

    const detectCategory = (text: string): MessageCategory => {
        const t = text.toLowerCase();
        if (t.includes("herbal") || t.includes("jamu") || t.includes("temulawak") || t.includes("jahe") || t.includes("kunyit")) return "herbal";
        if (t.includes("makan") || t.includes("nutrisi") || t.includes("diet") || t.includes("stunting") || t.includes("gizi")) return "nutrisi";
        if (t.includes("darurat") || t.includes("pingsan") || t.includes("igd") || t.includes("ambulans")) return "darurat";
        if (t.includes("obat") || t.includes("minum obat") || t.includes("resep")) return "obat";
        if (t.includes("gejala") || t.includes("sakit") || t.includes("demam") || t.includes("nyeri") || t.includes("diabetes") || t.includes("jantung") || t.includes("hipertensi")) return "gejala";
        return "umum";
    };

    const getFallbackResponse = (text: string): string => {
        const t = text.toLowerCase();
        if (t.includes("demam berdarah") || t.includes("dbd")) return fallbackResponses["demam berdarah"];
        if (t.includes("diabetes") || t.includes("gula darah")) return fallbackResponses["diabetes"];
        if (t.includes("hipertensi") || t.includes("tekanan darah")) return fallbackResponses["hipertensi"];
        if (t.includes("jantung") || t.includes("serangan jantung")) return fallbackResponses["jantung"];
        if (t.includes("temulawak")) return fallbackResponses["temulawak"];
        if (t.includes("stunting") || t.includes("tumbuh kembang")) return fallbackResponses["stunting"];
        if (t.includes("pingsan") || t.includes("pertolongan pertama")) return fallbackResponses["pingsan"];
        return fallbackResponses["default"];
    };

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const category = detectCategory(text);
        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text.trim(),
            timestamp: new Date(),
            category,
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        setShowSuggestions(false);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [
                        ...messages
                            .filter(m => m.id !== "welcome")
                            .map(m => ({ role: m.role, content: m.content })),
                        { role: "user", content: text.trim() },
                    ],
                }),
            });

            if (!response.ok) throw new Error("API error");

            const data = await response.json();
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply || "Maaf, saya tidak dapat menjawab saat ini.",
                timestamp: new Date(),
                category,
            };
            setMessages(prev => [...prev, assistantMsg]);

        } catch {
            setApiAvailable(false);
            await new Promise(r => setTimeout(r, 1200));
            const fallback: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: getFallbackResponse(text),
                timestamp: new Date(),
                category,
            };
            setMessages(prev => [...prev, fallback]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const clearChat = () => {
        setMessages([{
            ...WELCOME_MESSAGE,
            id: "welcome-" + Date.now(),
            timestamp: new Date(),
        }]);
        setShowSuggestions(true);
        setApiAvailable(true);
    };

    const filteredQuestions: QuickQuestion[] = activeFilter === "semua"
        ? quickQuestions
        : quickQuestions.filter(q => q.category === activeFilter);

    const filters: { key: MessageCategory | "semua"; label: string; icon: React.ReactNode }[] = [
        { key: "semua", label: "Semua", icon: <MessageCircleMore size={14} className="inline mr-1" /> },
        { key: "gejala", label: "Gejala", icon: <TbActivity size={14} className="inline mr-1" /> },
        { key: "nutrisi", label: "Nutrisi", icon: <FaNutritionix size={14} className="inline mr-1" /> },
        { key: "herbal", label: "Herbal", icon: <ImLeaf size={14} className="inline mr-1" /> },
        { key: "darurat", label: "Darurat", icon: <AlertTriangle size={14} className="inline mr-1" /> },
    ];

    return (
        <div className="flex flex-col gap-4">

            {!apiAvailable && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-2 text-yellow-400 text-xs text-center flex items-center justify-center gap-1.5">
                    <AlertTriangle size={13} className="flex-shrink-0" /> Mode Demo — Tambahkan <code className="bg-black/30 px-1 rounded">GEMINI_API_KEY</code> di <code className="bg-black/30 px-1 rounded">.env.local</code> untuk AI penuh
                </div>
            )}

            {healthContext?.fromPage && healthContext.fromPage !== "simdoc" && (
                <div className="bg-teal-500/10 border border-teal-700 rounded-xl px-4 py-2 text-teal-400 text-sm flex items-center gap-2">
                    <Link2 size={14} className="flex-shrink-0" /> Terhubung dari halaman <strong className="capitalize">{healthContext.fromPage}</strong>
                    {healthContext.diseaseRisk && ` — Risiko: ${healthContext.diseaseRisk}`}
                    {healthContext.herbalPlant && ` — Tanaman: ${healthContext.herbalPlant}`}
                </div>
            )}

            {showSuggestions && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-1.5"><Lightbulb size={14} className="flex-shrink-0" /> Pertanyaan yang sering ditanyakan:</p>

                    <div className="flex gap-2 mb-3 flex-wrap">
                        {filters.map(f => (
                            <button key={f.key} onClick={() => setActiveFilter(f.key)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border transition flex items-center gap-1.5 ${activeFilter === f.key ? "bg-teal-500 border-teal-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:text-teal-400"}`}>
                                {f.icon} {f.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {filteredQuestions.map(q => (
                            <button key={q.text} onClick={() => sendMessage(q.text)}
                                className={`text-xs px-3 py-1.5 rounded-full border transition hover:scale-105 flex items-center gap-1.5 ${categoryColors[q.category]}`}>
                                {q.icon} {q.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col overflow-hidden"
                style={{ minHeight: "480px" }}>

                <div className="flex flex-wrap items-center justify-between px-3 sm:px-5 py-3 border-b border-white/10 bg-black/20 gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center text-white flex-shrink-0">
                            <FaUserDoctor size={20} className="sm:w-[22px] sm:h-[22px]" />
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm sm:text-base">SimDoc</p>
                            <p className="text-[11px] sm:text-xs text-green-400">Online · AI Kesehatan</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowSuggestions(p => !p)}
                            className="text-[11px] sm:text-xs flex items-center text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 sm:px-3 py-1.5 rounded-full transition">
                            <Lightbulb size={12} className="mr-1.5 flex-shrink-0" />
                            <span className="hidden sm:inline">{showSuggestions ? "Sembunyikan Saran" : "Tampilkan Saran"}</span>
                            <span className="inline sm:hidden">{showSuggestions ? "Sembunyikan" : "Saran"}</span>
                        </button>
                        <button onClick={clearChat}
                            className="text-[11px] sm:text-xs flex items-center text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 sm:px-3 py-1.5 rounded-full transition">
                            <Trash2 size={12} className="mr-1.5 flex-shrink-0" /> Baru
                        </button>
                    </div>
                </div>

                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4" style={{ maxHeight: "420px" }}>
                    {messages.map((msg, idx) => (
                        <div key={msg.id}>
                            <ChatBubble message={msg} />
                            {msg.role === "assistant" && idx > 0 && (
                                <div className="mt-2">
                                    <RelatedPageSuggestion category={msg.category} content={msg.content} />
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && <TypingIndicator />}
                </div>

                <div className="border-t border-white/10 p-4 bg-black/10">
                    <div className="flex gap-3 items-end">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Tanyakan sesuatu... (Enter kirim · Shift+Enter baris baru)"
                            rows={2}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-teal-500 outline-none resize-none text-sm"
                        />
                        <button onClick={() => sendMessage(input)}
                            disabled={!input.trim() || isLoading}
                            className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-700 disabled:text-gray-500 text-white p-3 rounded-xl transition flex-shrink-0 w-12 h-12 flex items-center justify-center">
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <p className="text-xs flex justify-center items-center text-gray-500 mt-2 text-center">
                        <Info size={12} className="mr-1" /> SimDoc bukan pengganti dokter sungguhan. Selalu konsultasi ke tenaga medis untuk diagnosis resmi.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                {[
                    { icon: Shield, title: "Privasi Terjaga", desc: "Percakapan tidak disimpan secara permanen" },
                    { icon: LuBrainCog, title: "Berbasis AI", desc: "Didukung Gemini AI dari Google" },
                    { icon: Link2, title: "Terintegrasi", desc: "Terhubung dengan GenomID, HerbalSainsID, BeMyEye" },
                ].map((card, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center hover:bg-white/10 transition">
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mb-2">
                            <card.icon size={20} className="text-teal-400" />
                        </div>
                        <p className="font-semibold text-sm text-white">{card.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}