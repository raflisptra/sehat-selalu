"use client";
import { useState } from "react";
import { signLanguageData } from "./bemyeyeData";
import { FaBook, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdOutlineSpaceDashboard, MdMenuBook, MdOutlineMenuBook, MdQuiz } from "react-icons/md";
import { BsClipboardCheck, BsBarChartFill } from "react-icons/bs";
import { GiHand } from "react-icons/gi";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { BiTargetLock } from "react-icons/bi";
import { TbHandFinger, TbHandLittleFinger } from "react-icons/tb";
import { FaHandsAslInterpreting } from "react-icons/fa6";
import { LuBookOpenText } from "react-icons/lu";
import { CaseSensitive, CaseUpper } from "lucide-react";
import { HiMiniNumberedList } from "react-icons/hi2";

interface Props {
    onLetterSelected?: (letter: string) => void;
}

export default function SignLanguageGrid({ onLetterSelected }: Props) {
    const [selected, setSelected] = useState<string | null>(null);
    const [quizMode, setQuizMode] = useState(false);
    const [quizLetter, setQuizLetter] = useState("");
    const [quizAnswer, setQuizAnswer] = useState("");
    const [quizResult, setQuizResult] = useState<"benar" | "salah" | null>(null);
    const [score, setScore] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const [searchLetter, setSearchLetter] = useState("");

    const letters = Object.keys(signLanguageData);
    const filtered = searchLetter
        ? letters.filter(l => l === searchLetter.toUpperCase())
        : letters;

    const handleSelect = (letter: string) => {
        const next = letter === selected ? null : letter;
        setSelected(next);
        if (next) onLetterSelected?.(next);
    };

    const startQuiz = () => {
        const random = letters[Math.floor(Math.random() * letters.length)];
        setQuizLetter(random);
        setQuizAnswer("");
        setQuizResult(null);
        setQuizMode(true);
    };

    const checkAnswer = () => {
        const correct = quizAnswer.toUpperCase() === quizLetter;
        setQuizResult(correct ? "benar" : "salah");
        setQuizCount(p => p + 1);
        if (correct) setScore(p => p + 1);
    };

    const nextQuiz = () => {
        const random = letters[Math.floor(Math.random() * letters.length)];
        setQuizLetter(random);
        setQuizAnswer("");
        setQuizResult(null);
    };

    const currentSign = selected ? signLanguageData[selected] : null;

    return (
        <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 text-blue-300 text-sm flex items-start gap-2">
                <LuBookOpenText size={18} className="flex-shrink-0 mt-0.5" /> Menggunakan sistem <strong>SIBI</strong> (Sistem Isyarat Bahasa Indonesia) — standar resmi Kementerian Pendidikan RI untuk komunitas tunarungu.
            </div>

            <div className="flex gap-3 flex-wrap">
                <button onClick={() => setQuizMode(false)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold border transition flex items-center gap-1.5 ${!quizMode ? "bg-blue-500 border-blue-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:text-blue-400"}`}>
                    <CaseUpper size={15} /> Belajar Alfabet
                </button>
                <button onClick={startQuiz}
                    className={`px-5 py-2 rounded-full text-sm font-semibold border transition flex items-center gap-1.5 ${quizMode ? "bg-blue-500 border-blue-500 text-white" : "bg-white/5 border-white/10 text-gray-400 hover:text-blue-400"}`}>
                    <MdQuiz size={15} /> Mode Kuis
                </button>
                {!quizMode && (
                    <input
                        type="text" maxLength={1}
                        placeholder="Cari huruf..."
                        value={searchLetter}
                        onChange={e => setSearchLetter(e.target.value.toUpperCase())}
                        className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-sm w-32 focus:border-blue-500 outline-none uppercase placeholder-gray-500"
                    />
                )}
            </div>

            {!quizMode && (
                <>
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-13 gap-2">
                        {filtered.map(letter => (
                            <button key={letter} onClick={() => handleSelect(letter)}
                                className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition hover:scale-105 ${selected === letter ? "bg-blue-500 border-blue-500 text-white scale-105" : "bg-white/5 border-white/10 hover:border-blue-500 text-gray-300"}`}>
                                <span className="text-base font-extrabold">{letter}</span>
                                <img src={signLanguageData[letter].emoji} alt={letter} width={28} height={28} className="object-contain" />
                            </button>
                        ))}
                    </div>

                    {currentSign ? (
                        <div className="bg-white/5 border border-blue-700 rounded-2xl p-6">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-shrink-0 text-center">
                                    <div className="w-44 h-44 bg-gradient-to-br from-blue-900 to-indigo-800 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-blue-500">
                                        <img src={currentSign.emoji} alt={currentSign.letter} width={110} height={140} className="object-contain rounded-xl" />
                                    </div>
                                    <p className="text-5xl font-extrabold text-blue-400 mt-3">{currentSign.letter}</p>
                                </div>

                                <div className="flex-1 space-y-3">
                                    <h3 className="text-2xl font-extrabold text-white">Huruf "{currentSign.letter}"</h3>

                                    <div className="bg-blue-500/10 border border-blue-700 rounded-xl p-4">
                                        <p className="text-sm text-blue-300 font-semibold mb-1 flex items-center gap-1.5"><BsClipboardCheck size={13} /> Cara Membentuk Isyarat:</p>
                                        <p className="text-sm text-gray-200">{currentSign.description}</p>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <p className="text-sm text-gray-400 font-semibold mb-1 flex items-center gap-1.5"><TbHandFinger size={14} /> Posisi Jari:</p>
                                        <p className="text-sm text-gray-200">{currentSign.fingerPosition}</p>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => { const i = letters.indexOf(selected!); if (i > 0) handleSelect(letters[i - 1]); }}
                                            disabled={letters.indexOf(selected!) === 0}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm disabled:opacity-30 transition flex items-center gap-1">
                                            <IoArrowBack size={14} /> {letters[letters.indexOf(selected!) - 1] || ""}
                                        </button>
                                        <button
                                            onClick={() => { const i = letters.indexOf(selected!); if (i < letters.length - 1) handleSelect(letters[i + 1]); }}
                                            disabled={letters.indexOf(selected!) === letters.length - 1}
                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm disabled:opacity-30 transition flex items-center gap-1">
                                            {letters[letters.indexOf(selected!) + 1] || ""} <IoArrowForward size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="flex justify-center mb-3"><FaHandsAslInterpreting size={48} /></div>
                            <p>Klik huruf di atas untuk melihat cara isyaratnya</p>
                        </div>
                    )}
                </>
            )}

            {quizMode && (
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-gray-200 bg-white/5 border border-white/10 rounded-xl px-4 py-2 mb-4">
                        <span className="flex items-center gap-1"><FaCheckCircle size={15} className="text-green-400" /> Benar: <strong className="text-green-400">{score}</strong></span>
                        <span className="flex items-center gap-1"><HiMiniNumberedList size={15} className="text-blue-400" /> Total: <strong className="text-blue-400">{quizCount}</strong></span>
                        {quizCount > 0 && (
                            <span className="flex items-center gap-1"><BiTargetLock size={14} className="text-yellow-400" /> Akurasi: <strong className="text-yellow-400">{Math.round((score / quizCount) * 100)}%</strong></span>
                        )}
                    </div>

                    <div className="bg-white/5 border border-blue-700 rounded-2xl p-8 text-center">
                        <p className="text-gray-400 mb-4 text-sm">Huruf apa yang ditunjukkan isyarat ini?</p>

                        <div className="w-44 h-44 bg-gradient-to-br from-blue-900 to-indigo-800 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-blue-500 mx-auto mb-6">
                            <img src={signLanguageData[quizLetter]?.emoji} alt={quizLetter} width={110} height={140} className="object-contain rounded-xl" />
                        </div>

                        {quizResult === null ? (
                            <div className="space-y-3">
                                <input
                                    type="text" maxLength={1}
                                    value={quizAnswer}
                                    onChange={e => setQuizAnswer(e.target.value.toUpperCase())}
                                    onKeyDown={e => e.key === "Enter" && quizAnswer && checkAnswer()}
                                    placeholder="Ketik hurufnya..."
                                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-2xl font-bold focus:border-blue-500 outline-none uppercase placeholder-gray-500"
                                />
                                <button onClick={checkAnswer} disabled={!quizAnswer}
                                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                                    <FaCheckCircle size={16} /> Jawab
                                </button>
                            </div>
                        ) : (
                            <div className={`rounded-2xl p-5 border mb-3 ${quizResult === "benar" ? "bg-green-500/20 border-green-500" : "bg-red-500/20 border-red-500"}`}>
                                <p className="text-3xl font-extrabold mb-2 text-white flex items-center justify-center gap-2">
                                    {quizResult === "benar"
                                        ? <><MdOutlineSpaceDashboard size={28} className="text-green-400" /> Benar!</>
                                        : <><FaTimesCircle size={24} className="text-red-400" /> Salah!</>}
                                </p>
                                {quizResult === "salah" && (
                                    <p className="text-gray-300 mb-1">Jawaban benar: <strong className="text-green-400 text-xl">{quizLetter}</strong></p>
                                )}
                                <p className="text-sm text-gray-400">{signLanguageData[quizLetter]?.description}</p>
                                <button onClick={nextQuiz}
                                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-1">
                                    Soal Berikutnya <IoArrowForward size={14} />
                                </button>
                            </div>
                        )}

                        <button onClick={() => { setQuizMode(false); setScore(0); setQuizCount(0); }}
                            className="text-sm text-gray-500 hover:text-gray-300 transition flex items-center gap-1 mx-auto">
                            <IoArrowBack size={13} /> Kembali ke Belajar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}