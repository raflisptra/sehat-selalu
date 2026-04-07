"use client";
import React, { useState } from "react";
import { DiseaseRisk } from "./GeneticRiskCalculator";
import { GiDna1, GiMeal, GiRunningShoe, GiWeight } from "react-icons/gi";
import { FaDumbbell, FaPills, FaBan, FaHandPointUp } from "react-icons/fa";
import { MdOutlineFoodBank } from "react-icons/md";
import { BsCapsulePill, BsCircleFill } from "react-icons/bs";
import { Dna, Salad, PersonStanding, Ban, Dumbbell, Pill, UtensilsCrossed, HandMetal, CircleDot, Utensils, BicepsFlexed} from "lucide-react";
import { FcSportsMode } from "react-icons/fc";
import { PiPillFill } from "react-icons/pi";
import { GrYoga } from "react-icons/gr";

interface Props {
  riskData?: DiseaseRisk[];
}

const dietByGenotype: Record<string, {
  color: string;
  emoji: React.ReactNode;
  diet: string;
  exercise: string;
  avoid: string;
  supplements: string[];
  mealPlan: { time: string; meal: string }[];
}> = {
  "Tipe A": {
    color: "border-red-500 bg-red-500/10 text-red-400",
    emoji: <span className="font-black text-2xl">A</span>,
    diet: "Diet vegetarian/nabati lebih cocok. Perbanyak sayuran hijau, kedelai, tahu, tempe, dan biji-bijian. Sistem pencernaan lebih sensitif terhadap daging.",
    exercise: "Yoga, meditasi, tai chi, jalan kaki, dan bersepeda. Olahraga yang menenangkan dan tidak terlalu intens.",
    avoid: "Daging merah, produk susu berlemak tinggi, makanan olahan, gandum berlebihan.",
    supplements: ["Vitamin B12", "Zat Besi", "Zinc", "Kalsium"],
    mealPlan: [
      { time: "07:00", meal: "Oatmeal + buah + susu kedelai" },
      { time: "10:00", meal: "Buah segar atau kacang almond" },
      { time: "12:00", meal: "Nasi merah + tahu tempe + sayur hijau" },
      { time: "15:00", meal: "Yogurt nabati + biji chia" },
      { time: "19:00", meal: "Sup sayuran + roti gandum" },
    ],
  },
  "Tipe B": {
    color: "border-blue-500 bg-blue-500/10 text-blue-400",
    emoji: <span className="font-black text-2xl">B</span>,
    diet: "Diet seimbang dan fleksibel. Cocok dengan daging tanpa lemak, ikan, produk susu rendah lemak, dan sayuran beragam.",
    exercise: "Olahraga moderat dan bervariasi: renang, tenis, hiking, bersepeda. Kombinasi kardio dan kekuatan.",
    avoid: "Ayam, jagung, kacang tanah, biji wijen, gandum (untuk sebagian orang).",
    supplements: ["Magnesium", "Licorice", "Ginkgo Biloba", "Vitamin C"],
    mealPlan: [
      { time: "07:00", meal: "Telur + roti gandum + susu rendah lemak" },
      { time: "10:00", meal: "Buah atau keju rendah lemak" },
      { time: "12:00", meal: "Nasi + ikan/ayam + sayur bervariasi" },
      { time: "15:00", meal: "Yogurt + buah" },
      { time: "19:00", meal: "Daging sapi tanpa lemak + sayur kukus" },
    ],
  },
  "Tipe O": {
    color: "border-orange-500 bg-orange-500/10 text-orange-400",
    emoji: <span className="font-black text-2xl">O</span>,
    diet: "Diet tinggi protein hewani. Sangat cocok dengan daging tanpa lemak, ikan, seafood, dan sayuran. Sistem pencernaan kuat.",
    exercise: "Olahraga intens sangat cocok: lari, angkat beban, HIIT, aerobik. Tubuh merespon baik terhadap aktivitas fisik tinggi.",
    avoid: "Gandum, gluten, produk susu berlebih, kacang polong, lentil.",
    supplements: ["Vitamin B", "Yodium", "Licorice", "Enzim Pencernaan"],
    mealPlan: [
      { time: "07:00", meal: "Telur + daging tanpa lemak + sayur" },
      { time: "10:00", meal: "Buah rendah gula atau kacang walnut" },
      { time: "12:00", meal: "Daging sapi/ikan + sayuran + ubi" },
      { time: "15:00", meal: "Protein shake atau telur rebus" },
      { time: "19:00", meal: "Ikan panggang + brokoli + wortel" },
    ],
  },
  "Tipe AB": {
    color: "border-purple-500 bg-purple-500/10 text-purple-400",
    emoji: <span className="font-black text-2xl">AB</span>,
    diet: "Diet campuran yang unik. Cocok dengan tahu, seafood, produk susu rendah lemak, dan sayuran hijau. Hindari daging merah berlebihan.",
    exercise: "Olahraga ringan-sedang: pilates, yoga, jalan cepat, bersepeda santai. Kombinasi relaksasi dan aktivitas ringan.",
    avoid: "Daging merah berlebih, kacang hitam, jagung, paprika, biji bunga matahari.",
    supplements: ["Hawthorn", "Echinacea", "Valerian", "Vitamin C & E"],
    mealPlan: [
      { time: "07:00", meal: "Tahu scramble + sayur + teh hijau" },
      { time: "10:00", meal: "Buah segar + kacang almond" },
      { time: "12:00", meal: "Nasi merah + seafood + sayur hijau" },
      { time: "15:00", meal: "Yogurt + granola" },
      { time: "19:00", meal: "Sup ikan + tempe + brokoli" },
    ],
  },
};

export default function DietEducation({ riskData }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const highRisk = riskData?.filter(r => r.level === "tinggi").map(r => r.name) || [];
  const mediumRisk = riskData?.filter(r => r.level === "sedang").map(r => r.name) || [];

  return (
    <div className="space-y-6">

      {riskData && riskData.length > 0 && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4">
          <p className="text-sm text-purple-400 font-semibold mb-2 flex items-center gap-1.5">
            <Dna size={16} /> Hasil dari Kalkulator Risiko Genetik Anda:
          </p>
          <div className="flex gap-2 flex-wrap">
            {highRisk.length > 0 && highRisk.map(r => (
              <span key={r} className="bg-red-500/20 border border-red-500 text-red-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <BsCircleFill size={8} /> {r} — Risiko Tinggi
              </span>
            ))}
            {mediumRisk.length > 0 && mediumRisk.map(r => (
              <span key={r} className="bg-yellow-500/20 border border-yellow-500 text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <BsCircleFill size={8} /> {r} — Risiko Sedang
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Pilih tipe genetik di bawah untuk mendapat panduan diet yang sesuai kondisi Anda.</p>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-1 flex items-center gap-2"><BicepsFlexed size={20} /> Panduan Diet & Olahraga</h3>
        <p className="text-sm text-gray-400 mb-6">Berdasarkan tipe golongan darah/genetik — pilih tipe Anda:</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Object.keys(dietByGenotype).map(type => {
            const data = dietByGenotype[type];
            return (
              <button key={type} onClick={() => setSelected(selected === type ? null : type)}
                className={`py-4 px-3 rounded-2xl border text-center transition flex flex-col items-center justify-center ${selected === type ? `${data.color} scale-105` : "bg-white/5 border-white/10 text-gray-300 hover:border-purple-500"}`}>
                <div className="mb-1">{data.emoji}</div>
                <p className="font-bold">{type}</p>
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Utensils size={28} />,       title: "Diet Dianjurkan",  content: dietByGenotype[selected].diet,     color: "border-green-500 bg-green-500/10 text-green-400" },
                { icon: <GrYoga size={28} />, title: "Olahraga Cocok",   content: dietByGenotype[selected].exercise,  color: "border-blue-500 bg-blue-500/10 text-blue-400" },
                { icon: <Ban size={28} />,          title: "Perlu Dihindari",  content: dietByGenotype[selected].avoid,     color: "border-red-500 bg-red-500/10 text-red-400" },
              ].map(card => (
                <div key={card.title} className={`rounded-2xl border p-5 ${card.color}`}>
                  <div className="mb-2 flex">{card.icon}</div>
                  <h4 className="font-bold mb-2">{card.title}</h4>
                  <p className="text-sm opacity-90 leading-relaxed">{card.content}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2"><BsCapsulePill size={16} /> Suplemen yang Dianjurkan</h4>
                <div className="flex gap-2 flex-wrap">
                  {dietByGenotype[selected].supplements.map(s => (
                    <span key={s} className="bg-purple-900/30 border border-purple-700 text-purple-300 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <PiPillFill size={12} /> {s}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">* Konsultasikan dengan dokter sebelum mengonsumsi suplemen</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2"><GiMeal size={20} /> Contoh Menu Harian</h4>
                <div className="space-y-2">
                  {dietByGenotype[selected].mealPlan.map(meal => (
                    <div key={meal.time} className="flex gap-3 items-start">
                      <span className="text-xs font-bold text-purple-400 w-12 flex-shrink-0">{meal.time}</span>
                      <span className="text-sm text-gray-300">{meal.meal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {!selected && (
          <div className="text-center py-8 text-gray-500">
            <div className="flex justify-center mb-2"><FaHandPointUp size={36} /></div>
            <p className="text-sm">Pilih tipe genetik di atas untuk melihat panduan lengkap</p>
          </div>
        )}
      </div>
    </div>
  );
}