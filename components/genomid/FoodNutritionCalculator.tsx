"use client";
import { useState } from "react";
import React from "react";
import { 
  AlertTriangle,
  Bone, 
  Check,
  CheckCircle2,
  Drumstick,
  EggFried,
  Fish,
  Flame,
  Plus, 
  Tablets,
  Utensils, 
  Wheat,
  X
} from "lucide-react";
import { FaBowlRice } from "react-icons/fa6";

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  vitamin_c: number;
  calcium: number;
  iron: number;
}

const foodDatabase: Record<string, FoodItem> = {
  "nasi":     { name: "Nasi Putih",    calories: 180, protein: 3.5, carbs: 39.8, fat: 0.3, vitamin_c: 0,    calcium: 3,   iron: 0.2 },
  "telur":    { name: "Telur Rebus",   calories: 78,  protein: 6.3, carbs: 0.6,  fat: 5.3, vitamin_c: 0,    calcium: 25,  iron: 0.6 },
  "tahu":     { name: "Tahu Goreng",   calories: 76,  protein: 4.6, carbs: 1.9,  fat: 4.8, vitamin_c: 0,    calcium: 105, iron: 1.1 },
  "tempe":    { name: "Tempe",         calories: 166, protein: 20.7,carbs: 6.4,  fat: 6.4, vitamin_c: 0,    calcium: 111, iron: 2.7 },
  "kangkung": { name: "Kangkung",      calories: 29,  protein: 3.0, carbs: 3.1,  fat: 0.3, vitamin_c: 52,   calcium: 73,  iron: 2.5 },
  "kacang":   { name: "Kacang Tanah",  calories: 161, protein: 7.3, carbs: 4.6,  fat: 14,  vitamin_c: 0,    calcium: 17,  iron: 0.6 },
  "wortel":   { name: "Wortel",        calories: 41,  protein: 0.9, carbs: 9.6,  fat: 0.2, vitamin_c: 5.9,  calcium: 33,  iron: 0.3 },
  "bayam":    { name: "Bayam",         calories: 23,  protein: 2.9, carbs: 3.6,  fat: 0.4, vitamin_c: 28,   calcium: 99,  iron: 2.7 },
  "ikan":     { name: "Ikan Goreng",   calories: 195, protein: 22,  carbs: 0,    fat: 11,  vitamin_c: 0,    calcium: 40,  iron: 1.0 },
  "ayam":     { name: "Ayam Rebus",    calories: 165, protein: 31,  carbs: 0,    fat: 3.6, vitamin_c: 0,    calcium: 15,  iron: 1.0 },
  "pisang":   { name: "Pisang",        calories: 89,  protein: 1.1, carbs: 23,   fat: 0.3, vitamin_c: 8.7,  calcium: 5,   iron: 0.3 },
  "susu":     { name: "Susu Sapi",     calories: 61,  protein: 3.2, carbs: 4.8,  fat: 3.3, vitamin_c: 0,    calcium: 113, iron: 0.1 },
};

export default function FoodNutritionCalculator() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<FoodItem[]>([]);
  const [suggestions, setSuggestions] = useState<FoodItem[]>([]);

  const handleSearch = (val: string) => {
    setSearch(val);
    if (val.length < 1) { setSuggestions([]); return; }
    const found = Object.values(foodDatabase).filter(f =>
      f.name.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(found);
  };

  const addFood = (food: FoodItem) => {
    if (!selected.find(f => f.name === food.name)) {
      setSelected(prev => [...prev, food]);
    }
    setSearch("");
    setSuggestions([]);
  };

  const removeFood = (name: string) => {
    setSelected(prev => prev.filter(f => f.name !== name));
  };

  const total = selected.reduce((acc, f) => ({
    calories: acc.calories + f.calories,
    protein: acc.protein + f.protein,
    carbs: acc.carbs + f.carbs,
    fat: acc.fat + f.fat,
    vitamin_c: acc.vitamin_c + f.vitamin_c,
    calcium: acc.calcium + f.calcium,
    iron: acc.iron + f.iron,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, vitamin_c: 0, calcium: 0, iron: 0 });

  const stuntingRisk = selected.length > 0 && (total.protein < 10 || total.calcium < 50 || total.iron < 2);

  const nutrients: { label: string; value: string; unit: string; icon: React.ReactNode; daily: number; curr: number }[] = [
    { label: "Kalori",      value: total.calories.toFixed(0), unit: "kkal", icon: <Flame size={20} />,    daily: 2000,  curr: total.calories },
    { label: "Protein",     value: total.protein.toFixed(1),  unit: "g",    icon: <Drumstick size={20} />, daily: 50,    curr: total.protein },
    { label: "Karbohidrat", value: total.carbs.toFixed(1),    unit: "g",    icon: <FaBowlRice size={20} />,    daily: 275,   curr: total.carbs },
    { label: "Lemak",       value: total.fat.toFixed(1),      unit: "g",    icon: <EggFried size={20} />, daily: 65,    curr: total.fat },
    { label: "Vitamin C",   value: total.vitamin_c.toFixed(1),unit: "mg",   icon: <Tablets size={20} />,    daily: 90,    curr: total.vitamin_c },
    { label: "Kalsium",     value: total.calcium.toFixed(0),  unit: "mg",   icon: <Bone size={20} />,     daily: 1000,  curr: total.calcium },
    { label: "Zat Besi",    value: total.iron.toFixed(1),     unit: "mg",   icon: <Fish size={20} />,  daily: 18,    curr: total.iron },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-1 flex items-center gap-2"><Utensils size={20} /> Kalkulator Nutrisi Makanan</h3>
        <p className="text-sm text-gray-400 mb-4">Cek kandungan gizi untuk mencegah stunting — data dummy TKPI</p>

        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Cari makanan... (nasi, tempe, bayam, ayam...)"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 outline-none"
          />
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-gray-900 border border-purple-700 rounded-xl mt-1 overflow-hidden shadow-xl">
              {suggestions.map(f => (
                <button key={f.name} onClick={() => addFood(f)}
                  className="w-full text-left px-4 py-3 hover:bg-purple-900/30 text-white border-b border-white/5 last:border-0 text-sm flex justify-between">
                  <span>{f.name}</span>
                  <span className="text-gray-500">{f.calories} kkal · P: {f.protein}g</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap mb-4">
          {Object.values(foodDatabase).map(f => (
            <button key={f.name} onClick={() => addFood(f)}
              className={`text-xs px-3 py-1 rounded-full border transition flex items-center gap-1 ${selected.find(s => s.name === f.name) ? "bg-purple-500 border-purple-500 text-white" : "bg-purple-900/20 hover:bg-purple-900/40 border-purple-800 text-purple-400"}`}>
              {selected.find(s => s.name === f.name) ? <Check size={11} /> : <Plus size={11} />} {f.name}
            </button>
          ))}
        </div>

        {selected.length > 0 && (
          <>
            <div className="flex gap-2 flex-wrap mb-4">
              {selected.map(f => (
                <span key={f.name} className="bg-teal-900/40 border border-teal-700 text-teal-400 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                  {f.name}
                  <button onClick={() => removeFood(f.name)} className="text-red-400 hover:text-red-300 font-bold flex items-center"><X size={14} /></button>
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {nutrients.map(item => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="flex justify-center text-purple-400 mb-1">{item.icon}</div>
                  <div className="text-lg font-bold text-purple-400">
                    {item.value} <span className="text-xs text-gray-400">{item.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-purple-500 transition-all"
                      style={{ width: `${Math.min(100, (item.curr / item.daily) * 100)}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{Math.round((item.curr / item.daily) * 100)}% AKG</div>
                </div>
              ))}
            </div>

            <div className={`rounded-xl p-4 border text-sm ${stuntingRisk ? "bg-red-500/10 border-red-500 text-red-400" : "bg-green-500/10 border-green-500 text-green-400"}`}>
              {stuntingRisk
                ? <span className="flex items-start gap-2"><AlertTriangle size={16} className="flex-shrink-0 mt-0.5" /> Kandungan gizi kurang! Risiko stunting lebih tinggi. Tambah sumber protein, kalsium (susu, tahu, tempe), dan zat besi (bayam, daging).</span>
                : <span className="flex items-start gap-2"><CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" /> Kandungan gizi mencukupi! Kombinasi makanan ini baik untuk tumbuh kembang dan pencegahan stunting.</span>}
            </div>
          </>
        )}

        {selected.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            <div className="flex justify-center mb-2"><Utensils size={40} /></div>
            <p className="text-sm">Pilih makanan di atas untuk melihat kandungan gizinya</p>
          </div>
        )}
      </div>
    </div>
  );
}