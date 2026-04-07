import React from "react";
import { 
  AlertTriangle, 
  Apple, 
  BadgeCheck, 
  Biohazard, 
  Droplet, 
  HeartPulse, 
  Hospital, 
  Leaf, 
  MessageCircle, 
  ShieldAlert, 
  Stethoscope, 
  Vegan 
} from "lucide-react";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    category?: MessageCategory;
}

export type MessageCategory =
    | "gejala"
    | "obat"
    | "nutrisi"
    | "herbal"
    | "darurat"
    | "umum";

export interface QuickQuestion {
    text: string;
    icon: React.ReactNode;
    category: MessageCategory;
    relatedPage?: string;
}

export interface HealthContext {
    fromPage?: string;
    diseaseRisk?: string;
    herbalPlant?: string;
    emergencyMsg?: string;
}

export const quickQuestions: QuickQuestion[] = [
    { text: "Apa gejala demam berdarah?", icon: <Biohazard size={14} />, category: "gejala" },
    { text: "Gejala diabetes yang perlu diwaspadai", icon: <Droplet size={14} />, category: "gejala" },
    { text: "Tanda-tanda serangan jantung", icon: <HeartPulse size={14} />, category: "gejala" },
    { text: "Gejala hipertensi tinggi", icon: <Stethoscope size={14} />, category: "gejala" },
    { text: "Makanan baik untuk penderita diabetes", icon: <Apple size={14} />, category: "nutrisi", relatedPage: "/genomid" },
    { text: "Cara mencegah stunting pada anak", icon: <Vegan size={14} />, category: "nutrisi", relatedPage: "/genomid" },
    { text: "Diet sehat untuk hipertensi", icon: <Apple size={14} />, category: "nutrisi" },
    { text: "Manfaat temulawak untuk kesehatan", icon: <Vegan size={14} />, category: "herbal", relatedPage: "/herbalsainsid" },
    { text: "Apakah jahe aman untuk lambung?", icon: <Vegan size={14} />, category: "herbal", relatedPage: "/herbalsainsid" },
    { text: "Kunyit untuk anti-inflamasi alami", icon: <Vegan size={14} />, category: "herbal", relatedPage: "/herbalsainsid" },
    { text: "Pertolongan pertama pingsan", icon: <ShieldAlert size={14} />, category: "darurat", relatedPage: "/bemyeye" },
    { text: "Kapan harus ke IGD?", icon: <Hospital size={14} />, category: "darurat" },
];

export const categoryColors: Record<MessageCategory, string> = {
    gejala: "bg-red-500/10 border-red-700 text-red-400",
    obat: "bg-blue-500/10 border-blue-700 text-blue-400",
    nutrisi: "bg-green-500/10 border-green-700 text-green-400",
    herbal: "bg-emerald-500/10 border-emerald-700 text-emerald-400",
    darurat: "bg-orange-500/10 border-orange-700 text-orange-400",
    umum: "bg-gray-500/10 border-gray-700 text-gray-400",
};

export const categoryIcons: Record<MessageCategory, React.ReactNode> = {
    gejala: <Biohazard size={16} />,
    obat: <HeartPulse size={16} />,
    nutrisi: <Apple size={16} />,
    herbal: <Leaf size={16} />,
    darurat: <ShieldAlert size={16} />,
    umum: <MessageCircle size={16} />,
};

export const fallbackResponses: Record<string, string> = {
    "demam berdarah": `**Gejala Demam Berdarah Dengue (DBD):**

**Gejala Utama:**
- Demam tinggi mendadak 38–40°C selama 2–7 hari
- Nyeri kepala hebat dan nyeri di belakang mata
- Nyeri otot dan sendi (breakbone fever)
- Ruam kemerahan pada kulit
- Mual, muntah, dan kehilangan nafsu makan

**Tanda Bahaya — Segera ke RS:**
- Mimisan atau gusi berdarah
- Muntah darah atau BAB berdarah
- Nyeri perut hebat
- Lemas berlebihan dan pucat

**Pencegahan 3M Plus:**
- Menguras tempat penampungan air
- Menutup rapat tempat air
- Mendaur ulang barang bekas
- Gunakan lotion anti nyamuk

Segera periksa ke dokter jika mengalami gejala di atas!`,

    "diabetes": `**Informasi Diabetes Mellitus:**

**Gejala Utama:**
- Sering buang air kecil (poliuria)
- Sering haus berlebihan (polidipsi)
- Sering lapar meski sudah makan (polifagi)
- Penurunan berat badan tanpa sebab
- Penglihatan kabur dan luka susah sembuh

**Makanan yang Dianjurkan:**
- Nasi merah, roti gandum utuh
- Sayuran hijau (bayam, brokoli, kangkung)
- Ikan, tahu, tempe, telur
- Buah rendah GI (apel, pir, jeruk)
- Kacang-kacangan (almond, kenari)

**Yang Perlu Dihindari:**
- Gula pasir dan minuman manis
- Nasi putih berlebihan
- Gorengan dan makanan berlemak
- Buah tinggi gula (durian, mangga berlebih)

**Kadar Gula Darah Normal:**
- Puasa: 70–100 mg/dL
- 2 jam setelah makan: < 140 mg/dL

Cek GenomID untuk kalkulasi risiko diabetes Anda!`,

    "hipertensi": `**Panduan Hipertensi (Tekanan Darah Tinggi):**

**Klasifikasi Tekanan Darah:**
- Normal: < 120/80 mmHg
- Elevated: 120–129/< 80 mmHg
- Hipertensi Stage 1: 130–139/80–89 mmHg
- Hipertensi Stage 2: ≥ 140/≥ 90 mmHg
- Krisis: > 180/> 120 mmHg

**Diet DASH yang Dianjurkan:**
- Perbanyak buah, sayur, biji-bijian
- Pilih produk susu rendah lemak
- Kurangi garam (< 2.3g sodium/hari)
- Hindari daging merah dan makanan olahan

**Gaya Hidup Sehat:**
- Olahraga aerobik 30 menit/hari, 5x seminggu
- Turunkan berat badan jika obesitas
- Berhenti merokok dan batasi alkohol
- Kelola stres dengan meditasi/yoga

**Obat Umum (Harus Resep Dokter):**
Amlodipine, Lisinopril, Losartan, Bisoprolol

Cek alarm pengingat obat di GenomID!`,

    "jantung": `**Tanda-Tanda Serangan Jantung:**

**Gejala Darurat — Segera Hubungi 118:**
- Nyeri dada seperti ditekan/diremas
- Nyeri menjalar ke lengan kiri, leher, rahang
- Sesak napas mendadak
- Keringat dingin dan mual
- Pusing atau pingsan mendadak

**Pertolongan Pertama:**
1. Segera hubungi ambulans (118)
2. Istirahatkan penderita, jangan panik
3. Longgarkan pakaian di leher dan dada
4. Berikan aspirin 160–325mg jika ada (tidak alergi)
5. Jangan berikan makanan/minuman
6. Jika tidak sadar & tidak bernapas: Lakukan CPR

**Pencegahan Jangka Panjang:**
- Kontrol tekanan darah dan kolesterol
- Kelola diabetes jika ada
- Stop merokok
- Diet rendah lemak jenuh
- Olahraga rutin (sesuai anjuran dokter)

Gunakan tombol darurat BeMyEye saat krisis!`,

    "temulawak": `**Manfaat Temulawak (Curcuma xanthorrhiza):**

**Khasiat Utama:**
- Meningkatkan fungsi hati dan empedu
- Meningkatkan nafsu makan (terutama anak-anak)
- Meredakan peradangan sendi (anti-inflamasi)
- Membantu mengatasi masalah pencernaan
- Menurunkan kolesterol darah

**Cara Penggunaan Umum:**
1. Rebus 10-20 gram temulawak segar yang sudah diiris
2. Rebus dengan 2 gelas air hingga tersisa 1 gelas
3. Saring dan minum selagi hangat (bisa ditambah madu)

**Perhatian:**
- Hindari penggunaan berlebih pada penderita batu empedu parah.
- Ibu hamil sebaiknya konsultasi ke dokter sebelum konsumsi rutin.

Cari tahu herbal lainnya di HerbalSainsID!`,

    "stunting": `**Informasi Stunting pada Anak:**

**Definisi:**
Kondisi gagal tumbuh akibat kekurangan gizi kronis, ditandai tinggi badan di bawah -2 SD dari standar WHO.

**Nutrisi Kunci untuk Mencegah Stunting:**

Protein (paling penting):
- Telur, ikan, ayam, daging sapi
- Tahu, tempe, kacang-kacangan
- Target: 15–20% total kalori

Kalsium & Zat Besi:
- Susu, keju, yogurt
- Bayam, kangkung, daun singkong
- Hati ayam, daging merah

Vitamin A, C & D:
- Wortel, ubi kuning, bayam
- Jeruk, jambu, papaya
- Paparan sinar matahari pagi

**1000 Hari Pertama Kehidupan:**
- Sejak dalam kandungan hingga usia 2 tahun
- Periode emas tumbuh kembang otak dan fisik
- Pemberian ASI eksklusif 6 bulan pertama

Gunakan Kalkulator Nutrisi di GenomID!`,

    "pingsan": `**Pertolongan Pertama Pingsan:**

**Langkah Pertolongan Pertama:**

1. **Pastikan keamanan** — periksa lingkungan sekitar
2. **Posisikan dengan benar:**
   • Baringkan telentang di tempat datar
   • Angkat kaki 15–30 cm di atas jantung
   • Miringkan kepala jika ada risiko muntah

3. **Longgarkan pakaian** di leher dan dada

4. **Periksa kesadaran:**
   • Panggil nama dan cubit lembut
   • Periksa napas dan denyut nadi

5. **Jika tidak sadar > 1 menit:** Segera hubungi 118

6. **Jika tidak bernapas:** Lakukan CPR

**Jangan Lakukan:**
- Jangan berikan minum saat masih pingsan
- Jangan tampar wajah keras-keras
- Jangan tinggalkan sendirian

**Kontak Darurat:**
- Ambulans: 118
- IGD terdekat
- BPJS: 1500400

Untuk tombol darurat cepat, cek BeMyEye!`,

    default: `Terima kasih sudah bertanya!

Sebagai **SimDoc**, saya siap membantu pertanyaan seputar:

- **Gejala & Penyakit** — DBD, diabetes, hipertensi, jantung
- **Nutrisi & Diet** — pencegahan stunting, diet sehat
- **Herbal & Jamu** — temulawak, jahe, kunyit, sambiloto
- **Informasi Obat** — penggunaan dan efek samping umum
- **Pertolongan Pertama** — panduan darurat dasar

Coba tanyakan lebih spesifik, contoh:
- "Apa gejala diabetes?"
- "Manfaat temulawak?"
- "Cara mencegah stunting?"

Saya adalah asisten edukatif AI. Untuk diagnosis resmi, selalu konsultasikan dengan dokter profesional.`,
};

export const WELCOME_MESSAGE: Message = {
    id: "welcome",
    role: "assistant",
    content: `Halo! Saya **SimDoc** — dokter virtual AI dari platform SEHAT SELALU.

Saya siap membantu menjawab pertanyaan seputar:
- Gejala dan penyakit umum
- Nutrisi, diet, dan pencegahan stunting
- Herbal dan jamu tradisional Indonesia
- Informasi obat-obatan umum
- Panduan pertolongan pertama

**Fitur Terintegrasi:**
Saya terhubung dengan GenomID, HerbalSainsID, dan BeMyEye untuk memberikan rekomendasi yang lebih personal.

Perlu diingat, saya adalah asisten AI edukatif — bukan pengganti dokter sungguhan. Untuk diagnosis medis resmi, selalu konsultasikan dengan dokter profesional.

Ada yang ingin Anda tanyakan?`,
    timestamp: new Date(),
    category: "umum",
};
