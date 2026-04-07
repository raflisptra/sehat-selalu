import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API key tidak ditemukan" }, { status: 500 });
        }

        const systemInstruction = `Kamu adalah SimDoc, dokter virtual AI untuk platform kesehatan Indonesia "SEHAT SELALU".

ATURAN KETAT:
- Jawab HANYA dalam Bahasa Indonesia yang ramah dan profesional
- Berikan informasi kesehatan yang akurat dan berbasis bukti
- JANGAN gunakan emoji sama sekali. Respons harus 100% bebas dari emoji (0 emojis) demi mempertahankan gaya formal dan bersih.
- Selalu sarankan konsultasi dokter untuk diagnosis resmi
- Format jawaban dengan rapi menggunakan bullet point jika perlu
- Fokus HANYA pada topik kesehatan: gejala penyakit, pencegahan, tips gaya hidup sehat, nutrisi, obat-obatan umum, herbal, dan pertolongan pertama
- Jika pengguna bertanya di luar topik kesehatan, tolak dengan sopan dan arahkan kembali ke topik yang relevan
- JANGAN memberikan diagnosis pasti atau resep obat spesifik
- Jika darurat, sarankan segera ke IGD atau hubungi 118
- Jawaban harus ringkas dan informatif, maksimal 5-6 kalimat kecuali penjelasan detail diminta
- Gunakan format **bold** untuk poin penting`;

        const geminiContents = messages.map((m: { role: string; content: string }) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: systemInstruction }],
                    },
                    contents: geminiContents,
                    generationConfig: {
                        maxOutputTokens: 1024,
                        temperature: 0.7,
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

    } catch (error) {
        return NextResponse.json({ error: "Gagal menghubungi AI" }, { status: 500 });
    }
}
