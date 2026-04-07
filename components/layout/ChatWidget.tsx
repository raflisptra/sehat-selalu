"use client";

import { Stethoscope } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface WidgetMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const quickSuggestions = [
    { text: "Cek risiko penyakit", path: "/genomid" },
    { text: "Peta wabah Indonesia", path: "/tools" },
    { text: "Info tanaman obat", path: "/herbalsainsid" },
    { text: "Konsultasi dokter AI", path: "/simdoc" },
    { text: "Layanan disabilitas", path: "/bemyeye" },
    { text: "Baca artikel kesehatan", path: "/konten" },
];

function parseLinks(text: string) {
    const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
    const elements: (string | { text: string; href: string })[] = [];
    for (let i = 0; i < parts.length; i++) {
        if (i % 3 === 0) {
            if (parts[i]) elements.push(parts[i]);
        } else if (i % 3 === 1) {
            elements.push({ text: parts[i], href: parts[i + 1] });
        }
    }
    return elements;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<WidgetMessage[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Halo! Saya asisten navigasi Selalu Sehat. Ceritakan kebutuhan Anda dan saya akan arahkan ke fitur yang tepat.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [suggestionsCollapsed, setSuggestionsCollapsed] = useState(false);
    const [isMapFullscreen, setIsMapFullscreen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("chat-widget-open");
        } else {
            document.body.classList.remove("chat-widget-open");
        }

        const checkFullscreen = () => {
            setIsMapFullscreen(document.body.classList.contains("map-fullscreen-open"));
        };

        const observer = new MutationObserver(checkFullscreen);
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        checkFullscreen(); // Initial check

        return () => {
            document.body.classList.remove("chat-widget-open");
            observer.disconnect();
        };
    }, [isOpen]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMsg: WidgetMessage = {
            id: Date.now().toString(),
            role: "user",
            content: text.trim(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        setShowSuggestions(false);

        try {
            const res = await fetch("/api/chat-widget", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [
                        ...messages
                            .filter((m) => m.id !== "welcome")
                            .map((m) => ({ role: m.role, content: m.content })),
                        { role: "user", content: text.trim() },
                    ],
                }),
            });

            if (!res.ok) throw new Error("API error");

            const data = await res.json();
            const reply = data.reply || "Maaf, saya tidak dapat menjawab saat ini.";

            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: reply,
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content:
                        "Maaf, terjadi gangguan koneksi. Anda bisa langsung mengunjungi halaman fitur melalui menu navigasi di atas.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateTo = (path: string) => {
        if (pathname !== path) {
            router.push(path);
        }
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const clearChat = () => {
        setMessages([
            {
                id: "welcome-" + Date.now(),
                role: "assistant",
                content:
                    "Halo! Saya asisten navigasi Selalu Sehat. Ceritakan kebutuhan Anda dan saya akan arahkan ke fitur yang tepat.",
            },
        ]);
        setShowSuggestions(true);
        setSuggestionsCollapsed(false);
    };

    const renderMessageContent = (content: string) => {
        return content.split("\n").map((line, li) => {
            const parsed = parseLinks(line);
            return (
                <p key={li}>
                    {parsed.map((part, pi) => {
                        if (typeof part === "string") {
                            const subParts = part.split(/(\*\*.*?\*\*|\*.*?\*)/g);
                            return subParts.map((sub, si) => {
                                if (sub.startsWith("**") && sub.endsWith("**")) {
                                    return <strong key={si} className="font-bold text-gray-900">{sub.slice(2, -2)}</strong>;
                                } else if (sub.startsWith("*") && sub.endsWith("*")) {
                                    return <em key={si} className="italic">{sub.slice(1, -1)}</em>;
                                }
                                return sub;
                            });
                        } else {
                            return (
                                <button
                                    key={pi}
                                    onClick={() => navigateTo(part.href)}
                                    className="text-teal-600 font-semibold hover:text-teal-700 underline underline-offset-2 decoration-teal-300 transition"
                                >
                                    {part.text}
                                </button>
                            );
                        }
                    })}
                </p>
            );
        });
    };

    if (isMapFullscreen) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed z-[9999] bottom-5 right-5 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${isOpen
                    ? "bg-gray-700 hover:bg-gray-600 rotate-0"
                    : "bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500"
                    }`}
                aria-label={isOpen ? "Tutup chat" : "Buka chat"}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </button>

            {isOpen && (
                <div
                    className="fixed z-[9998] bottom-24 right-5 w-[360px] max-w-[calc(100vw-40px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right"
                    style={{ maxHeight: "min(600px, 85vh)" }}
                >
                    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Stethoscope size={16} className="text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm leading-none">Asisten Selalu Sehat</p>
                                <p className="text-teal-100 text-[10px] mt-0.5">Powered by Gemini AI</p>
                            </div>
                        </div>
                        <button
                            onClick={clearChat}
                            className="text-teal-100 hover:text-white text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full transition"
                        >
                            Baru
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 flex flex-col min-h-[150px]">
                        {messages.map((msg) => {
                            const isUser = msg.role === "user";
                            return (
                                <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${isUser
                                            ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-tr-sm"
                                            : "bg-white border border-gray-200 text-gray-700 rounded-tl-sm shadow-sm"
                                            }`}
                                    >
                                        {isUser ? (
                                            msg.content
                                        ) : (
                                            <div className="space-y-1">
                                                {renderMessageContent(msg.content)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                                    <div className="flex gap-1 items-center">
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"
                                                style={{ animationDelay: `${i * 0.15}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {showSuggestions && (
                        <div className="border-t border-gray-100 bg-white flex-shrink-0 transition-all duration-300">
                            <button
                                onClick={() => setSuggestionsCollapsed(!suggestionsCollapsed)}
                                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition border-b border-gray-50"
                            >
                                <span className="text-[11px] text-gray-500 font-medium">Saran Pertanyaan</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${suggestionsCollapsed ? "" : "rotate-180"}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ${suggestionsCollapsed ? "max-h-0 opacity-0" : "max-h-[150px] opacity-100"}`}>
                                <div className="px-3 py-2.5 flex flex-wrap gap-1.5">
                                    {quickSuggestions.map((s) => (
                                        <button
                                            key={s.text}
                                            onClick={() => sendMessage(s.text)}
                                            className="text-[11px] bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-1 rounded-full hover:bg-teal-100 transition font-medium whitespace-nowrap"
                                        >
                                            {s.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="px-3 py-2.5 border-t border-gray-200 bg-white flex-shrink-0">
                        <div className="flex gap-2 items-center">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ketik kebutuhan Anda..."
                                className="flex-1 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-teal-400 focus:ring-1 focus:ring-teal-200 outline-none transition"
                            />
                            <button
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isLoading}
                                className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center disabled:opacity-40 hover:shadow-md transition flex-shrink-0"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
