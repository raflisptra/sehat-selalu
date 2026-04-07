"use client";
import { useEffect, useState } from "react";
import {
  Phone, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  MessageCircle,
  ClipboardList, 
  AlignJustify, 
  Siren, 
  Accessibility, 
  MessagesSquare,
  Ear, 
  Eye,
  EyeOff
} from "lucide-react";
import { emergencyContacts, quickMessages } from "./bemyeyeData";
import { LiaDeafSolid } from "react-icons/lia";

interface Props {
    onMessageCopied?: (msg: string) => void;
}

export default function EmergencyCall({ onMessageCopied }: Props) {
    const [calling, setCalling] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(0);
    const [copiedMsg, setCopiedMsg] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<"semua" | "darurat" | "disabilitas" | "umum">("semua");
    const [sosActive, setSosActive] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        } else if (countdown === 0 && calling) {
            const contact = emergencyContacts.find(c => c.name === calling);
            if (contact) {
                window.location.href = `tel:000`;
            }
            setCalling(null);
        }
        return () => clearTimeout(timer);
    }, [countdown, calling]);

    const startCall = (name: string) => {
        setCalling(name);
        setCountdown(3);
    };

    const cancelCall = () => {
        setCalling(null);
        setCountdown(0);
    };

    const copyMessage = async (msg: string) => {
        try {
            await navigator.clipboard.writeText(msg);
            setCopiedMsg(msg);
            onMessageCopied?.(msg);
            setTimeout(() => setCopiedMsg(null), 2000);
        } catch {
            const el = document.createElement("textarea");
            el.value = msg;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            setCopiedMsg(msg);
            setTimeout(() => setCopiedMsg(null), 2000);
        }
    };

    const activateSOS = () => {
        setSosActive(true);
        copyMessage("SOS - DARURAT! Saya membutuhkan bantuan segera. Tolong hubungi layanan darurat!");
        setTimeout(() => setSosActive(false), 5000);
    };

    const filteredMessages = activeFilter === "semua"
        ? quickMessages
        : quickMessages.filter(m => m.category === activeFilter);

    return (
        <div className="space-y-6">

            {calling && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border-2 border-red-500 rounded-2xl p-8 text-center max-w-sm w-full">
                        <div className="flex justify-center mb-4 animate-pulse"><Phone size={52} className="text-red-400" /></div>
                        <h3 className="text-2xl font-bold text-white mb-1">Memanggil {calling}...</h3>
                        <p className="text-gray-400 text-sm mb-4">Terhubung dalam {countdown} detik</p>
                        <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-4xl font-extrabold text-red-400 mx-auto mb-6 animate-pulse">
                            {countdown}
                        </div>
                        <button onClick={cancelCall}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                            <X size={16} /> Batalkan
                        </button>
                    </div>
                </div>
            )}

            {copiedMsg && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-green-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2">
                    <CheckCircle2 size={15} /> Pesan disalin ke clipboard!
                </div>
            )}

            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-300 text-sm flex items-start gap-2">
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" /> <span><strong>Fitur Darurat</strong> — Gunakan hanya dalam keadaan darurat nyata. Menyalahgunakan layanan darurat adalah pelanggaran hukum.</span>
            </div>

            <button onClick={activateSOS}
                className={`w-full py-5 rounded-2xl border-2 text-xl font-extrabold transition flex items-center justify-center gap-3 ${sosActive ? "bg-red-500 border-red-500 text-white animate-pulse" : "bg-red-500/10 border-red-500 text-red-400 hover:bg-red-500/20"}`}>
                <Siren size={24} /> {sosActive ? "SOS TERKIRIM! Minta Bantuan Segera!" : "TOMBOL SOS DARURAT"}
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map(contact => (
                    <div key={contact.name} className={`rounded-2xl border p-5 ${contact.colorClass}`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="text-emerald-400 flex items-center">{contact.icon}</div>
                                <div>
                                    <h3 className="font-extrabold text-lg">{contact.name}</h3>
                                    <p className="text-sm opacity-70">{contact.desc}</p>
                                </div>
                            </div>
                            <span className="text-xl font-extrabold opacity-80">{contact.number}</span>
                        </div>
                        <button onClick={() => startCall(contact.name)}
                            className="w-full py-2.5 rounded-xl font-bold bg-black/20 hover:bg-black/30 border border-current transition text-sm flex items-center justify-center gap-2">
                            <Phone size={13} /> Hubungi {contact.number}
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-1.5"><MessageCircle size={16} /> Pesan Darurat Cepat</h4>
                <p className="text-sm text-gray-400 mb-4">Tap untuk menyalin pesan ke clipboard — berguna bagi yang tidak bisa berbicara</p>

                <div className="flex gap-2 mb-4 flex-wrap">
                    {(["semua", "darurat", "disabilitas", "umum"] as const).map(cat => (
                        <button key={cat} onClick={() => setActiveFilter(cat)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${activeFilter === cat ? "bg-blue-500 border-blue-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:text-blue-400"}`}>
                            {cat === "semua"
                                ? <span className="flex items-center gap-1"><AlignJustify size={12} /> Semua</span>
                                : cat === "darurat"
                                ? <span className="flex items-center gap-1"><AlertTriangle size={11} /> Darurat</span>
                                : cat === "disabilitas"
                                ? <span className="flex items-center gap-1"><Accessibility size={13} /> Disabilitas</span>
                                : <span className="flex items-center gap-1"><MessagesSquare size={12} /> Umum</span>}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredMessages.map((item, i) => (
                        <button key={i} onClick={() => copyMessage(item.msg)}
                            className={`text-left rounded-xl border p-4 transition hover:scale-[1.02] ${copiedMsg === item.msg ? "bg-green-500/20 border-green-500" : "bg-white/5 border-white/10 hover:border-blue-500"}`}>
                            <div className="text-blue-400 mb-2 flex items-center">{item.icon}</div>
                            <p className="text-sm text-gray-300 leading-relaxed">{item.msg}</p>
                            <p className={`text-xs mt-2 font-semibold flex items-center gap-1 ${copiedMsg === item.msg ? "text-green-400" : "text-blue-400"}`}>
                                {copiedMsg === item.msg
                                    ? <><CheckCircle2 size={11} /> Tersalin!</>
                                    : <><ClipboardList size={11} /> Tap untuk salin</>}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-500/10 border border-blue-700 rounded-2xl p-4">
                    <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-1.5"><LiaDeafSolid size={20} /> Untuk Tunarungu</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Gunakan pesan teks darurat di atas</li>
                        <li>• Kirim lokasi via SMS ke 112</li>
                        <li>• Aktifkan fitur TTY di ponsel Anda</li>
                        <li>• Gunakan aplikasi relay layanan darurat</li>
                    </ul>
                </div>
                <div className="bg-purple-500/10 border border-purple-700 rounded-2xl p-4">
                    <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-1.5"><EyeOff size={20} /> Untuk Tunanetra</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Tekan tombol SOS di atas untuk menyalin pesan</li>
                        <li>• Gunakan voice command di ponsel</li>
                        <li>• Aktifkan TalkBack / VoiceOver</li>
                        <li>• Hubungi 119 untuk bantuan darurat</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}