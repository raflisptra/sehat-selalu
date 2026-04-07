"use client";
import { useState } from "react";
import { herbalPlants, HerbalPlant } from "./herbalData";
import { Microscope, 
  FlaskRound, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  Medal, 
  Leaf, 
  CheckCheck, 
  ArrowRight, 
  BadgeCheck,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { GiLindenLeaf, GiMicroscope } from "react-icons/gi";
import { RiMicroscopeLine } from "react-icons/ri";

interface Props {
  onSelectPlant?: (plant: HerbalPlant) => void;
  selectedPlantId?: string;
}

const researchColor: Record<string, string> = {
  tinggi:   "text-green-400 bg-green-500/10 border-green-500",
  sedang:   "text-yellow-400 bg-yellow-500/10 border-yellow-500",
  terbatas: "text-gray-400 bg-gray-500/10 border-gray-500",
};

export default function HerbalVisualizer({ onSelectPlant, selectedPlantId }: Props) {
  const [localSelected, setLocalSelected] = useState<HerbalPlant | null>(null);

  const selected = selectedPlantId
    ? herbalPlants.find(p => p.id === selectedPlantId) || localSelected
    : localSelected;

  const handleSelect = (plant: HerbalPlant) => {
    setLocalSelected(prev => prev?.id === plant.id ? null : plant);
    onSelectPlant?.(plant);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {herbalPlants.map(plant => (
          <button key={plant.id} onClick={() => handleSelect(plant)}
            className={`rounded-2xl border p-4 text-center transition hover:scale-105 ${selected?.id === plant.id ? "bg-emerald-500/20 border-emerald-500 scale-105" : "bg-white/5 border-white/10 hover:border-emerald-500"}`}>
            <div className="text-3xl mb-1 flex justify-center"><plant.icon className="w-7 h-7" /></div>
            <p className="text-xs font-semibold text-white leading-tight">{plant.name}</p>
            <p className="text-xs text-gray-500 italic truncate">{plant.latinName.split(" ")[0]}</p>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="bg-white/5 border border-emerald-800 rounded-2xl p-6 space-y-5">

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <selected.icon className="w-12 h-12 text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-extrabold text-white">{selected.name}</h3>
                <p className="text-sm text-gray-400 italic">{selected.latinName}</p>
                <p className="text-sm text-gray-300 mt-1 max-w-xl">{selected.description}</p>
              </div>
            </div>
            <span className={`self-start px-4 py-2 rounded-full border text-sm font-bold flex-shrink-0 flex items-center gap-1.5 ${researchColor[selected.researchLevel]}`}>
              <Microscope size={14} /> Riset: {selected.researchLevel.toUpperCase()}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-1.5"><FlaskRound size={16} /> Senyawa Aktif</h4>
            <div className="space-y-3">
              {selected.compounds.map(compound => (
                <div key={compound.name} className="bg-black/20 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-white">{compound.name}
                      <span className="text-xs text-gray-400 ml-2">({compound.percentage}%)</span>
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">{compound.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                      style={{ width: `${compound.percentage}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1"><ShieldCheck size={12} /> {compound.benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-700 rounded-xl p-4">
              <h4 className="font-bold text-green-400 mb-3 flex items-center gap-1.5"><CheckCircle2 size={16} /> Manfaat Terbukti</h4>
              <ul className="space-y-1">
                {selected.benefits.map(b => (
                  <li key={b} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-700 rounded-xl p-4">
              <h4 className="font-bold text-red-400 mb-3 flex items-center gap-1.5"><AlertTriangle size={16} /> Efek Samping</h4>
              <ul className="space-y-1">
                {selected.sideEffects.map(s => (
                  <li key={s} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-700 rounded-xl p-4">
            <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-1.5"><BadgeCheck size={16} /> Divalidasi Oleh</h4>
            <div className="flex gap-2 flex-wrap">
              {selected.validatedBy.map(v => (
                <span key={v} className="bg-blue-900/40 border border-blue-700 text-blue-300 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <UserCheck size={11} /> {v}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-700 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-yellow-400 font-semibold text-sm flex items-center gap-1.5"><RiMicroscopeLine size={15} /> Cek Interaksi dengan Obat Resep</p>
              <p className="text-xs text-gray-400 mt-1">Periksa keamanan {selected.name} jika dikombinasikan dengan obat lain</p>
            </div>
            <span className="text-xs bg-yellow-500/20 border border-yellow-600 text-yellow-400 px-3 py-1.5 rounded-full flex items-center gap-1">
              <ArrowRight size={12} /> Tab Cek Interaksi
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-600 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex justify-center mb-3"><GiLindenLeaf size={48} className="text-gray-600" /></div>
          <p>Klik tanaman di atas untuk melihat detail senyawa aktif dan manfaatnya</p>
        </div>
      )}
    </div>
  );
}