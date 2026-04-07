import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API key tidak ditemukan" }, { status: 500 });
        }

        const systemInstruction = `Kamu adalah asisten navigasi AI untuk platform kesehatan "SEHAT SELALU". Tugasmu adalah membantu pengguna menemukan fitur dan halaman yang tepat berdasarkan kebutuhan mereka.

ATURAN KETAT:
- Jawab HANYA dalam Bahasa Indonesia
- Jawab singkat dan langsung ke solusi (maksimal 3-4 kalimat)
- JANGAN gunakan emoji berlebihan, maksimal 1-2 emoji per jawaban
- Fokus HANYA pada navigasi fitur platform SEHAT SELALU
- Jika pengguna bertanya di luar topik kesehatan/platform, arahkan kembali ke fitur yang tersedia
- SELALU sertakan link halaman yang relevan dalam format: [Nama Halaman](/path)

FITUR PLATFORM YANG TERSEDIA:
1. **Beranda** (/): Halaman utama dengan overview semua fitur
2. **Tentang Kami** (/about): Informasi tentang platform Selalu Sehat
3. **Konten** (/konten): Artikel kesehatan dan edukasi
4. **Kontak** (/contact): Hubungi tim Selalu Sehat
5. **HealthMap** (/tools): Peta wabah realtime Indonesia, prediksi risiko penyakit berbasis AI, dan pencarian fasilitas kesehatan (faskes) terdekat
6. **GenomID** (/genomid): Kalkulator risiko genetik, kalkulator nutrisi makanan, alarm pengingat obat, dan panduan diet personal
7. **HerbalSainsID** (/herbalsainsid): Database 200+ tanaman obat Indonesia, cek interaksi herbal dengan obat, dan validasi dari peneliti
8. **BeMyEye** (/bemyeye): Panduan bahasa isyarat SIBI, text-to-speech, speech-to-text, dan tombol darurat untuk penyandang disabilitas
9. **SimDoc** (/simdoc): Konsultasi kesehatan dengan dokter virtual AI berbasis Gemini

CONTOH NAVIGASI:
- "Saya ingin cek risiko diabetes" → Arahkan ke GenomID (/genomid) untuk kalkulator risiko genetik
- "Ada wabah di daerah saya" → Arahkan ke HealthMap (/tools) untuk peta wabah
- "Saya butuh ambulans" → Arahkan ke BeMyEye (/bemyeye) untuk tombol darurat
- "Manfaat kunyit" → Arahkan ke HerbalSainsID (/herbalsainsid) untuk database herbal
- "Saya mau tanya dokter" → Arahkan ke SimDoc (/simdoc) untuk konsultasi AI`;

        const geminiContents = messages.map((m: { role: string; content: string }) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: systemInstruction }],
                    },
                    contents: geminiContents,
                    generationConfig: {
                        maxOutputTokens: 256,
                        temperature: 0.3,
                    },
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "API error");
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, saya tidak dapat menjawab saat ini.";
        return NextResponse.json({ reply });

    } catch {
        return NextResponse.json({ error: "Gagal menghubungi AI" }, { status: 500 });
    }
}
