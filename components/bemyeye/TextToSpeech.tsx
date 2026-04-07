"use client";
import { useState, useRef, useEffect } from "react";
import { quickMessages } from "./bemyeyeData";
import { FaVolumeUp, FaMicrophone, FaStop, FaTrash, FaMobileAlt, FaCommentDots } from "react-icons/fa";
import { MdAccessibleForward, MdComment, MdOutlineTextFields, MdSpeakerPhone } from "react-icons/md";
import { BsExclamationTriangleFill, BsFillChatDotsFill } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import { TbWheelchair } from "react-icons/tb";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiSpeakFill } from "react-icons/ri";

interface Props {
  initialText?: string;
  onSpeechResult?: (text: string) => void;
}

export default function TextToSpeech({ initialText = "", onSpeechResult }: Props) {
  const [ttsText, setTtsText]       = useState(initialText);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sttText, setSttText]       = useState("");
  const [isListening, setIsListening] = useState(false);
  const [sttSupported, setSttSupported] = useState(true);
  const [ttsRate, setTtsRate]       = useState(0.9);
  const [ttsPitch, setTtsPitch]     = useState(1.0);
  const [activeCategory, setActiveCategory] = useState<"darurat" | "disabilitas" | "umum" | "semua">("semua");
  const recognitionRef              = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) setSttSupported(false);
    }
    if (initialText) setTtsText(initialText);
  }, [initialText]);

  const speak = () => {
    if (!ttsText.trim()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.lang  = "id-ID";
    utterance.rate  = ttsRate;
    utterance.pitch = ttsPitch;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend   = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang        = "id-ID";
    recognition.continuous  = false;
    recognition.interimResults = true;
    recognition.onstart     = () => setIsListening(true);
    recognition.onresult    = (e: any) => {
      const transcript = Array.from(e.results)
        .map((r: any) => r[0].transcript).join("");
      setSttText(transcript);
      if (e.results[0].isFinal) {
        onSpeechResult?.(transcript);
      }
    };
    recognition.onend       = () => setIsListening(false);
    recognition.onerror     = () => setIsListening(false);
    recognitionRef.current  = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const transferToTTS = () => {
    setTtsText(sttText);
    setSttText("");
  };

  const filteredMessages = activeCategory === "semua"
    ? quickMessages
    : quickMessages.filter(m => m.category === activeCategory);

  const categoryColors: Record<string, string> = {
    darurat:     "border-red-500 bg-red-500/10 text-red-400",
    disabilitas: "border-blue-500 bg-blue-500/10 text-blue-400",
    umum:        "border-gray-500 bg-gray-500/10 text-gray-400",
  };

  return (
    <div className="space-y-6">

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl flex items-center"><RiSpeakFill size={28} className="text-blue-400" /></span>
          <div>
            <h3 className="text-xl font-bold text-blue-400">Text to Speech</h3>
            <p className="text-sm text-gray-400">Untuk tunanetra — ketik teks, sistem akan membacakannya dengan suara</p>
          </div>
        </div>

        <textarea
          value={ttsText}
          onChange={e => setTtsText(e.target.value)}
          placeholder="Ketik teks di sini untuk diucapkan..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 outline-none h-28 resize-none mb-4"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Kecepatan: {ttsRate}x</label>
            <input type="range" min="0.5" max="2" step="0.1"
              value={ttsRate} onChange={e => setTtsRate(parseFloat(e.target.value))}
              className="w-full accent-blue-500" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Nada: {ttsPitch}x</label>
            <input type="range" min="0.5" max="2" step="0.1"
              value={ttsPitch} onChange={e => setTtsPitch(parseFloat(e.target.value))}
              className="w-full accent-blue-500" />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex gap-2 mb-2 flex-wrap">
            {(["semua", "darurat", "disabilitas", "umum"] as const).map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition capitalize ${activeCategory === cat ? "bg-blue-500 border-blue-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:text-blue-400"}`}>
                {cat === "semua"
                  ? <span className="flex items-center gap-1"><MdComment size={13} /> Semua</span>
                  : cat === "darurat"
                  ? <span className="flex items-center gap-1"><BsExclamationTriangleFill size={12} /> Darurat</span>
                  : cat === "disabilitas"
                  ? <span className="flex items-center gap-1"><MdAccessibleForward size={13} /> Disabilitas</span>
                  : <span className="flex items-center gap-1"><BiSolidMessageSquareDots size={13} /> Umum</span>}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {filteredMessages.slice(0, 6).map(item => (
              <button key={item.msg} onClick={() => setTtsText(item.msg)}
                className="bg-blue-900/20 hover:bg-blue-900/40 border border-blue-800 text-blue-300 text-xs px-3 py-1.5 rounded-full transition text-left">
                {item.icon} {item.msg.length > 30 ? item.msg.substring(0, 30) + "..." : item.msg}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={isSpeaking ? stopSpeaking : speak}
            className={`flex-1 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 ${isSpeaking ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
            {isSpeaking
              ? <><FaStop size={14} /> Stop</>
              : <><FaVolumeUp size={14} /> Ucapkan Teks</>}
          </button>
          <button onClick={() => setTtsText("")}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-gray-400 transition flex items-center justify-center">
            <FaTrash size={14} />
          </button>
        </div>

        {ttsText && (
          <div className="mt-3 bg-black/20 rounded-xl p-3">
            <p className="text-xs text-gray-500">{ttsText.length} karakter · estimasi {Math.ceil(ttsText.split(" ").length / ttsRate / 2)} detik</p>
          </div>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl flex items-center"><FaMicrophone size={26} className="text-blue-400" /></span>
          <div>
            <h3 className="text-xl font-bold text-blue-400">Speech to Text</h3>
            <p className="text-sm text-gray-400">Untuk tunawicara — ucapkan, sistem akan mengubah menjadi teks</p>
          </div>
        </div>

        {!sttSupported ? (
          <div className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-4 text-yellow-400 text-sm flex items-start gap-2">
            <IoWarning size={16} className="flex-shrink-0 mt-0.5" /> Browser ini tidak mendukung Speech Recognition. Gunakan Google Chrome atau Microsoft Edge.
          </div>
        ) : (
          <>
            <div className="min-h-28 bg-white/5 border border-white/10 rounded-xl p-4 mb-4 relative">
              {sttText ? (
                <p className="text-white">{sttText}</p>
              ) : (
                <p className="text-gray-500 italic flex items-center gap-1.5">
                  {isListening ? <><FaMicrophone size={13} className="text-blue-400" /> Sedang mendengarkan...</> : "Hasil teks akan muncul di sini..."}
                </p>
              )}
              {isListening && (
                <div className="absolute top-3 right-3 flex gap-1 items-end">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-1.5 bg-blue-400 rounded-full animate-bounce"
                      style={{ height: `${8 + i * 6}px`, animationDelay: `${i * 0.1}s` }}>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={isListening ? stopListening : startListening}
                className={`flex-1 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 ${isListening ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
                {isListening ? <><FaStop size={14} /> Stop Rekam</> : <><FaMicrophone size={14} /> Mulai Rekam</>}
              </button>
              {sttText && (
                <>
                  <button onClick={transferToTTS}
                    className="px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-700 rounded-xl text-green-400 text-sm transition flex items-center gap-1.5">
                    <FaVolumeUp size={13} /> <AiOutlineArrowRight size={12} /> TTS
                  </button>
                  <button onClick={() => setSttText("")}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-gray-400 transition flex items-center justify-center">
                    <FaTrash size={14} />
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 text-purple-300 text-sm flex items-start gap-2">
        <FaMobileAlt size={15} className="flex-shrink-0 mt-0.5" /> <span><strong>Pengembangan Android:</strong> Integrasikan dengan Android TextToSpeech API dan SpeechRecognizer untuk pengalaman lebih optimal. Fitur ini menggunakan Web Speech API yang tersedia di browser modern.</span>
      </div>
    </div>
  );
}