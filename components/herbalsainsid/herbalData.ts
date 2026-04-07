import { Leaf, 
  Flame, 
  Sun, 
  Sprout, 
  Wind, 
  Droplets, 
  Cannabis, 
  LeafyGreen, 
  Hop, 
  Wheat, 
  Vegan} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GiHerbsBundle, GiPlantSeed } from "react-icons/gi";
import { PiPlant } from "react-icons/pi";

export interface Compound {
  name: string;
  benefit: string;
  percentage: number;
}

export interface HerbalPlant {
  id: string;
  name: string;
  latinName: string;
  icon: React.ElementType;
  description: string;
  compounds: Compound[];
  benefits: string[];
  sideEffects: string[];
  researchLevel: "tinggi" | "sedang" | "terbatas";
  validatedBy: string[];
}

export interface DrugInteraction {
  herbal: string;
  drug: string;
  safe: boolean;
  severity: "aman" | "hati-hati" | "hindari";
  note: string;
}

export const herbalPlants: HerbalPlant[] = [
  {
    id: "temulawak",
    name: "Temulawak",
    latinName: "Curcuma xanthorrhiza",
    icon: PiPlant,
    description: "Tanaman asli Indonesia, terbukti ilmiah memiliki sifat anti-inflamasi dan hepatoprotektif.",
    compounds: [
      { name: "Kurkumin",      benefit: "Anti-inflamasi, antioksidan kuat",  percentage: 45 },
      { name: "Xanthorrhizol", benefit: "Antibakteri, antijamur",            percentage: 30 },
      { name: "Germakron",     benefit: "Antikanker, imunomodulator",        percentage: 15 },
      { name: "Ar-Turmeron",   benefit: "Neuroprotektif",                    percentage: 10 },
    ],
    benefits: ["Melindungi hati (hepatoprotektif)", "Anti-inflamasi", "Meningkatkan nafsu makan", "Membantu pencernaan", "Antioksidan"],
    sideEffects: ["Mual jika dikonsumsi berlebihan", "Dapat mempengaruhi pembekuan darah"],
    researchLevel: "tinggi",
    validatedBy: ["Dr. Ahmad Fauzi, SpPD", "Prof. Siti Rahayu - LIPI", "Balitro Kementan"],
  },
  {
    id: "jahe",
    name: "Jahe",
    latinName: "Zingiber officinale",
    icon: GiPlantSeed,
    description: "Rempah multifungsi anti-mual dan anti-inflamasi alami yang terbukti untuk sistem pencernaan dan kardiovaskular.",
    compounds: [
      { name: "Gingerol",  benefit: "Anti-inflamasi, anti-mual utama",  percentage: 50 },
      { name: "Shogaol",   benefit: "Antikanker, analgesik",            percentage: 25 },
      { name: "Zingerone", benefit: "Antioksidan, antimikroba",         percentage: 15 },
      { name: "Paradol",   benefit: "Antitumor",                        percentage: 10 },
    ],
    benefits: ["Anti-mual dan muntah", "Meredakan nyeri sendi", "Melancarkan pencernaan", "Menghangatkan tubuh", "Anti-inflamasi"],
    sideEffects: ["Heartburn pada lambung sensitif", "Interaksi dengan antikoagulan"],
    researchLevel: "tinggi",
    validatedBy: ["Prof. Bambang Wahyudi, SpOG", "Dr. Maya Sari - UI", "WHO Traditional Medicine"],
  },
  {
    id: "kunyit",
    name: "Kunyit",
    latinName: "Curcuma longa",
    icon: Flame,
    description: "Superfood Asia dengan kandungan kurkumin tertinggi. Ribuan penelitian membuktikan manfaatnya sebagai anti-inflamasi dan antioksidan.",
    compounds: [
      { name: "Kurkumin",                benefit: "Anti-inflamasi, antikanker, antioksidan", percentage: 60 },
      { name: "Bisdemethoxycurcumin",    benefit: "Antitumor, imunomodulator",               percentage: 20 },
      { name: "Desmethoxycurcumin",      benefit: "Anti-inflamasi",                           percentage: 12 },
      { name: "Turmerone",               benefit: "Neuroprotektif",                           percentage: 8  },
    ],
    benefits: ["Anti-inflamasi kuat", "Potensi antikanker", "Membantu kesehatan otak", "Antioksidan tinggi", "Mendukung kesehatan jantung"],
    sideEffects: ["Gangguan pencernaan dosis tinggi", "Tidak untuk ibu hamil dosis tinggi"],
    researchLevel: "tinggi",
    validatedBy: ["Prof. Endang Sutriswati - UGM", "Dr. Rini Handayani, SpPD", "National Cancer Institute"],
  },
  {
    id: "sambiloto",
    name: "Sambiloto",
    latinName: "Andrographis paniculata",
    icon: GiHerbsBundle,
    description: "King of Bitters dengan aktivitas antiviral dan imunostimulan yang terbukti dalam pengobatan Ayurveda dan TCM.",
    compounds: [
      { name: "Andrographolide",         benefit: "Antiviral, imunostimulan utama",   percentage: 55 },
      { name: "Neoandrographolide",      benefit: "Anti-inflamasi, hepatoprotektif",  percentage: 25 },
      { name: "14-Deoxyandrographolide", benefit: "Antimalaria",                      percentage: 12 },
      { name: "Flavonoid",               benefit: "Antioksidan",                      percentage: 8  },
    ],
    benefits: ["Meningkatkan imunitas", "Antiviral", "Menurunkan demam", "Antibakteri", "Hepatoprotektif"],
    sideEffects: ["Rasa sangat pahit", "Tidak untuk ibu hamil", "Dapat menurunkan tekanan darah"],
    researchLevel: "sedang",
    validatedBy: ["Dr. Hendra Susanto - IPB", "Prof. Wahyu Prijanto - UNAIR"],
  },
  {
    id: "daun-sirih",
    name: "Daun Sirih",
    latinName: "Piper betle",
    icon: Hop,
    description: "Tanaman herbal tradisional Indonesia dengan kandungan minyak atsiri tinggi dan sifat antiseptik yang kuat.",
    compounds: [
      { name: "Chavicol", benefit: "Antiseptik, antimikroba kuat", percentage: 40 },
      { name: "Eugenol",  benefit: "Analgesik, antibakteri",       percentage: 30 },
      { name: "Cineole",  benefit: "Ekspektoran, antijamur",       percentage: 20 },
      { name: "Tannin",   benefit: "Astringen, antioksidan",       percentage: 10 },
    ],
    benefits: ["Antiseptik alami", "Menjaga kesehatan mulut", "Antibakteri", "Antijamur", "Mempercepat penyembuhan luka"],
    sideEffects: ["Iritasi pada kulit sensitif", "Tidak untuk konsumsi berlebihan jangka panjang"],
    researchLevel: "sedang",
    validatedBy: ["Dr. Susilorini - UNPAD", "Balai Besar Litbang Tanaman Obat"],
  },
  {
    id: "lidah-buaya",
    name: "Lidah Buaya",
    latinName: "Aloe vera",
    icon: Vegan,
    description: "Tanaman sukulen kaya nutrisi yang telah digunakan ribuan tahun untuk perawatan kulit dan pencernaan.",
    compounds: [
      { name: "Acemannan",   benefit: "Imunomodulator, penyembuh luka", percentage: 35 },
      { name: "Aloin",       benefit: "Laksatif, antibakteri",          percentage: 25 },
      { name: "Emodin",      benefit: "Anti-inflamasi, antiviral",      percentage: 25 },
      { name: "Vitamin E&C", benefit: "Antioksidan, perawatan kulit",   percentage: 15 },
    ],
    benefits: ["Melembapkan kulit", "Menyembuhkan luka bakar", "Membantu pencernaan", "Anti-inflamasi", "Imunomodulator"],
    sideEffects: ["Alergi pada sebagian orang", "Aloin berlebih dapat menyebabkan diare"],
    researchLevel: "tinggi",
    validatedBy: ["Prof. Dewi Rahma - ITB", "Dr. Faisal Amri, SpKK", "International Aloe Science Council"],
  },
];

export const drugInteractions: DrugInteraction[] = [
  { herbal: "Jahe",        drug: "Warfarin (pengencer darah)",  safe: false, severity: "hindari",    note: "Jahe meningkatkan efek antikoagulan, meningkatkan risiko pendarahan berbahaya." },
  { herbal: "Temulawak",   drug: "Metformin (diabetes)",        safe: true,  severity: "aman",       note: "Tidak ada interaksi signifikan yang dilaporkan. Aman dikombinasikan." },
  { herbal: "Kunyit",      drug: "Aspirin",                     safe: false, severity: "hati-hati",  note: "Kurkumin memiliki efek antiplatelet. Konsultasikan dengan dokter sebelum kombinasi." },
  { herbal: "Sambiloto",   drug: "Antihipertensi",              safe: false, severity: "hati-hati",  note: "Sambiloto dapat menurunkan tekanan darah. Pemantauan ketat diperlukan." },
  { herbal: "Daun Sirih",  drug: "Antibiotik",                  safe: true,  severity: "aman",       note: "Dapat digunakan bersamaan sebagai terapi komplementer." },
  { herbal: "Lidah Buaya", drug: "Kortikosteroid",              safe: false, severity: "hati-hati",  note: "Kombinasi dapat meningkatkan risiko hipokalemia. Pantau kadar elektrolit." },
  { herbal: "Temulawak",   drug: "Insulin",                     safe: true,  severity: "aman",       note: "Tidak ada interaksi berbahaya. Temulawak justru mendukung fungsi pankreas." },
  { herbal: "Kunyit",      drug: "Statin (kolesterol)",         safe: true,  severity: "aman",       note: "Kombinasi bersifat sinergis untuk kesehatan kardiovaskular. Umumnya aman." },
  { herbal: "Jahe",        drug: "Antidepresan (SSRI)",         safe: false, severity: "hati-hati",  note: "Potensi peningkatan risiko serotonin syndrome pada dosis tinggi." },
  { herbal: "Sambiloto",   drug: "Obat Tiroid",                 safe: false, severity: "hindari",    note: "Sambiloto dapat mengganggu fungsi tiroid dan efektivitas obat tiroid." },
  { herbal: "Jahe",        drug: "Metformin (diabetes)",        safe: true,  severity: "aman",       note: "Jahe justru dapat membantu sensitivitas insulin. Aman dikombinasikan." },
  { herbal: "Lidah Buaya", drug: "Warfarin (pengencer darah)",  safe: false, severity: "hati-hati",  note: "Konsumsi oral lidah buaya dapat meningkatkan efek antikoagulan." },
];