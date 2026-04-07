"use client";
import { useState } from "react";
import React from "react";
import { Microscope, Droplets, Heart, Syringe, Brain, ClipboardList, Dna, BarChart2, Lightbulb, HeartPulse, Activity, Ribbon, CandyOff, OctagonAlert, SearchAlert } from "lucide-react";
import { GiHeartOrgan } from "react-icons/gi";

export interface DiseaseRisk {
  name: string;
  icon: React.ReactNode;
  risk: number;
  level: "rendah" | "sedang" | "tinggi";
  tips: string;
}

interface Props {
  onRiskCalculated?: (risks: DiseaseRisk[]) => void;
}

export default function GeneticRiskCalculator({ onRiskCalculated }: Props) {
  const [form, setForm] = useState({
    age: "",
    bmi: "",
    smoking: "tidak",
    exercise: "jarang",
    familyCancer: "tidak",
    familyDiabetes: "tidak",
    familyHeart: "tidak",
  });
  const [results, setResults] = useState<DiseaseRisk[] | null>(null);

  const calculate = () => {
    const age = parseInt(form.age) || 30;
    const bmi = parseFloat(form.bmi) || 22;
    const smokingFactor = form.smoking === "ya" ? 25 : 0;
    const exerciseFactor = form.exercise === "rutin" ? -10 : form.exercise === "jarang" ? 5 : 15;
    const bmiFactor = bmi > 30 ? 20 : bmi > 25 ? 10 : 0;
    const ageFactor = age > 50 ? 15 : age > 40 ? 8 : 0;

    const risks: DiseaseRisk[] = [
      {
        name: "Kanker", icon: <Ribbon size={24} />,
        risk: Math.min(95, 10 + smokingFactor + (form.familyCancer === "ya" ? 30 : 0) + ageFactor + bmiFactor),
        level: "rendah",
        tips: "Hindari rokok, konsumsi antioksidan, rutin screening",
      },
      {
        name: "Diabetes", icon: <CandyOff size={24} />,
        risk: Math.min(95, 8 + bmiFactor + (form.familyDiabetes === "ya" ? 35 : 0) + exerciseFactor + ageFactor),
        level: "rendah",
        tips: "Batasi gula, olahraga rutin, cek gula darah berkala",
      },
      {
        name: "Jantung", icon: <GiHeartOrgan size={24} />,
        risk: Math.min(95, 5 + smokingFactor + (form.familyHeart === "ya" ? 30 : 0) + bmiFactor + ageFactor),
        level: "rendah",
        tips: "Diet rendah lemak jenuh, kelola stres, olahraga kardio",
      },
      {
        name: "Hipertensi", icon: <Droplets size={24} />,
        risk: Math.min(95, 8 + bmiFactor + smokingFactor + ageFactor + exerciseFactor),
        level: "rendah",
        tips: "Kurangi garam, kelola stres, pantau tekanan darah",
      },
      {
        name: "Stroke", icon: <Activity size={24} />,
        risk: Math.min(95, 5 + smokingFactor + bmiFactor + (form.familyHeart === "ya" ? 20 : 0) + ageFactor),
        level: "rendah",
        tips: "Kontrol tekanan darah, jangan merokok, diet sehat",
      },
    ].map(r => ({
      ...r,
      level: r.risk >= 60 ? "tinggi" : r.risk >= 35 ? "sedang" : "rendah",
    }));

    setResults(risks);
    onRiskCalculated?.(risks);
  };

  const levelColor: Record<string, string> = {
    rendah: "text-green-400 bg-green-500/10 border-green-500",
    sedang: "text-yellow-400 bg-yellow-500/10 border-yellow-500",
    tinggi: "text-red-400 bg-red-500/10 border-red-500",
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2"><ClipboardList size={20} /> Isi Data Diri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Usia (tahun)", key: "age", type: "number", placeholder: "contoh: 35" },
            { label: "BMI (kg/m²)", key: "bmi", type: "number", placeholder: "contoh: 24.5" },
          ].map(field => (
            <div key={field.key}>
              <label className="text-sm text-gray-400 mb-1 block">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 outline-none"
              />
            </div>
          ))}
          {[
            { label: "Merokok?", key: "smoking", options: ["tidak", "ya"] },
            { label: "Frekuensi Olahraga", key: "exercise", options: ["rutin", "jarang", "tidak pernah"] },
            { label: "Riwayat Kanker Keluarga?", key: "familyCancer", options: ["tidak", "ya"] },
            { label: "Riwayat Diabetes Keluarga?", key: "familyDiabetes", options: ["tidak", "ya"] },
            { label: "Riwayat Penyakit Jantung Keluarga?", key: "familyHeart", options: ["tidak", "ya"] },
          ].map(field => (
            <div key={field.key}>
              <label className="text-sm text-gray-400 mb-1 block">{field.label}</label>
              <select
                value={form[field.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full bg-gray-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-purple-500 outline-none"
              >
                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={calculate}
          className="mt-6 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
          <Dna size={18} /> Kalkulasi Risiko Genetik
        </button>
      </div>

      {results && (
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><SearchAlert size={18} /> Hasil Analisis Risiko</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(r => (
              <div key={r.name} className={`rounded-2xl border p-5 ${levelColor[r.level]}`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl flex items-center">{r.icon}</span>
                  <span className="text-xs font-bold px-2 py-1 bg-black/20 rounded-full">{r.level.toUpperCase()}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{r.name}</h4>
                <div className="w-full bg-black/20 rounded-full h-3 mb-2">
                  <div className="h-3 rounded-full bg-current transition-all duration-700"
                    style={{ width: `${r.risk}%` }}></div>
                </div>
                <p className="text-lg font-bold">{r.risk}% risiko</p>
                <p className="text-xs opacity-80 mt-2 flex items-start gap-1"><OctagonAlert size={12} className="flex-shrink-0 mt-0.5" /> {r.tips}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}