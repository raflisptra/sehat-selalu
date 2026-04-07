"use client";
import { useState } from "react";
import React from "react";
import { drugInteractions, herbalPlants } from "./herbalData";
import { Microscope, Leaf, Pill, Search, CheckCircle2, AlertTriangle, Ban, Stethoscope, ClipboardList, RotateCcw, ShieldCheck } from "lucide-react";

interface Props {
  preselectedHerbal?: string;
}

const severityStyle: Record<string, string> = {
  aman:        "bg-green-500/10 border-green-500 text-green-400",
  "hati-hati": "bg-yellow-500/10 border-yellow-500 text-yellow-400",
  hindari:     "bg-red-500/10 border-red-500 text-red-400",
};

const severityIcon: Record<string, React.ReactNode> = {
  aman:        <CheckCircle2 size={36} />,
  "hati-hati": <AlertTriangle size={36} />,
  hindari:     <Ban size={36} />,
};

export default function HerbalInteractionChecker({ preselectedHerbal }: Props) {
  const [selectedHerbal, setSelectedHerbal] = useState(preselectedHerbal || "");
  const [selectedDrug, setSelectedDrug]     = useState("");
  const [result, setResult]                 = useState<typeof drugInteractions[0] | null>(null);
  const [checked, setChecked]               = useState(false);

  const herbalNames = [...new Set(drugInteractions.map(d => d.herbal))];
  const drugNames   = [...new Set(drugInteractions.map(d => d.drug))];

  const availableDrugs = selectedHerbal
    ? [...new Set(drugInteractions.filter(d => d.herbal === selectedHerbal).map(d => d.drug))]
    : drugNames;

  const checkInteraction = () => {
    const found = drugInteractions.find(
      d => d.herbal === selectedHerbal && d.drug === selectedDrug
    );
    setResult(found || null);
    setChecked(true);
  };

  const reset = () => {
    setSelectedHerbal("");
    setSelectedDrug("");
    setResult(null);
    setChecked(false);
  };

  const displayedInteractions = selectedHerbal
    ? drugInteractions.filter(d => d.herbal === selectedHerbal)
    : drugInteractions;

  return (
    <div className="space-y-6">

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-emerald-400 mb-1 flex items-center gap-2"><Microscope size={20} /> Cek Interaksi Herbal + Obat Resep</h3>
        <p className="text-sm text-gray-400 mb-6">Periksa keamanan kombinasi jamu dengan obat modern</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center gap-1.5"><Leaf size={14} /> Pilih Tanaman Herbal</label>
            <select value={selectedHerbal}
              onChange={e => { setSelectedHerbal(e.target.value); setSelectedDrug(""); setChecked(false); }}
              className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none">
              <option value="">-- Pilih Herbal --</option>
              {herbalNames.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center gap-1.5"><Pill size={14} /> Pilih Obat Resep</label>
            <select value={selectedDrug}
              onChange={e => { setSelectedDrug(e.target.value); setChecked(false); }}
              className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none"
              disabled={!selectedHerbal}>
              <option value="">-- Pilih Obat --</option>
              {availableDrugs.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {!selectedHerbal && (
              <p className="text-xs text-gray-500 mt-1">Pilih herbal dulu untuk melihat daftar obat</p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={checkInteraction}
            disabled={!selectedHerbal || !selectedDrug}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
            <Search size={16} /> Cek Interaksi
          </button>
          {(selectedHerbal || checked) && (
            <button onClick={reset}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-gray-400 transition text-sm">
              Reset
            </button>
          )}
        </div>

        {checked && (
          <div className={`mt-6 rounded-2xl border p-6 ${result ? severityStyle[result.severity] : "bg-gray-500/10 border-gray-500 text-gray-400"}`}>
            {result ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{severityIcon[result.severity]}</span>
                  <div>
                    <h4 className="font-extrabold text-xl">{result.severity.toUpperCase()}</h4>
                    <p className="text-sm opacity-80">{result.herbal} + {result.drug}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{result.note}</p>
                <div className="mt-4 bg-black/20 rounded-xl p-3 text-xs opacity-70 flex items-start gap-2">
                  <Stethoscope size={14} className="flex-shrink-0 mt-0.5" /> Data ini bersifat edukatif. Selalu konsultasikan dengan dokter atau apoteker sebelum mengombinasikan herbal dengan obat resep.
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="flex justify-center mb-2"><Search size={32} /></div>
                <p>Data interaksi untuk kombinasi ini belum tersedia.</p>
                <p className="text-xs mt-2 opacity-70">Konsultasikan langsung dengan apoteker atau dokter Anda.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
            <ClipboardList size={16} /> Database Interaksi
            {selectedHerbal && <span className="text-white ml-1">— {selectedHerbal}</span>}
          </h4>
          <span className="text-xs text-gray-500">{displayedInteractions.length} data</span>
        </div>

        <div className="space-y-2">
          {displayedInteractions.map((item, i) => (
            <div key={i}
              onClick={() => { setSelectedHerbal(item.herbal); setSelectedDrug(item.drug); setChecked(false); }}
              className={`rounded-xl border p-4 cursor-pointer transition hover:scale-[1.01] ${severityStyle[item.severity]}`}>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div className="flex-1">
                  <span className="font-semibold">{item.herbal}</span>
                  <span className="text-gray-400 text-sm mx-2">+</span>
                  <span className="font-semibold">{item.drug}</span>
                  <p className="text-xs opacity-70 mt-1">{item.note}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-lg flex items-center">{
                    item.severity === "aman" ? <ShieldCheck size={20} /> :
                    item.severity === "hati-hati" ? <AlertTriangle size={20} /> :
                    <Ban size={20} />
                  }</span>
                  <span className="text-xs font-bold uppercase">{item.severity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap justify-center text-sm">
        <span className="flex items-center gap-2 bg-green-500/10 border border-green-500 text-green-400 px-3 py-1 rounded-full"><ShieldCheck size={14} /> Aman — Bisa dikombinasikan</span>
        <span className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500 text-yellow-400 px-3 py-1 rounded-full"><AlertTriangle size={14} /> Hati-hati — Perlu pantauan dokter</span>
        <span className="flex items-center gap-2 bg-red-500/10 border border-red-500 text-red-400 px-3 py-1 rounded-full"><Ban size={14} /> Hindari — Berbahaya dikombinasikan</span>
      </div>
    </div>
  );
}