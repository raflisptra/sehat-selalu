export interface Article {
    slug: string;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    color: string;
    readTime: string;
    content: string[];
}

export const articles: Article[] = [
    {
        slug: "pola-penyebaran-dbd-musim-hujan",
        category: "Epidemi",
        date: "1 Mar 2026",
        title: "Memahami Pola Penyebaran DBD di Musim Hujan",
        excerpt: "Setiap tahun kasus DBD meningkat drastis saat curah hujan tinggi. Berikut cara memahami pola sebarannya dengan data real-time.",
        color: "bg-rose-100 text-rose-700",
        readTime: "5 menit",
        content: [
            "Demam Berdarah Dengue (DBD) merupakan salah satu penyakit endemik di Indonesia yang kasusnya melonjak setiap musim hujan. Data dari Kemenkes RI menunjukkan bahwa periode November hingga Maret menjadi puncak kasus DBD di sebagian besar wilayah Indonesia.",
            "Nyamuk Aedes aegypti sebagai vektor utama DBD berkembang biak optimal pada genangan air hujan. Wadah-wadah kecil seperti pot bunga, ban bekas, dan tempurung kelapa menjadi tempat ideal bagi nyamuk untuk bertelur.",
            "Platform HealthMap dari SelaluSehat memungkinkan masyarakat memantau penyebaran DBD secara real-time di wilayah mereka. Dengan data yang dikumpulkan dari puskesmas dan rumah sakit, pengguna dapat melihat tren kasus dan mengambil langkah pencegahan lebih awal.",
            "Langkah pencegahan yang efektif meliputi program 3M Plus (Menguras, Menutup, Mendaur Ulang), penggunaan lotion anti nyamuk, pemasangan kelambu, dan fogging berkala di lingkungan dengan kasus tinggi.",
            "Dengan teknologi prediktif berbasis AI, SelaluSehat dapat memperkirakan lonjakan kasus DBD berdasarkan pola curah hujan, suhu, dan kelembaban udara, membantu pemerintah daerah mengalokasikan sumber daya kesehatan secara lebih efisien.",
        ],
    },
    {
        slug: "tanaman-herbal-indonesia-ilmiah",
        category: "Herbal",
        date: "25 Feb 2026",
        title: "5 Tanaman Herbal Indonesia yang Terbukti Secara Ilmiah",
        excerpt: "Platform HerbalSainsID merangkum bukti ilmiah di balik penggunaan temulawak, sambiloto, dan tanaman obat lainnya.",
        color: "bg-green-100 text-green-700",
        readTime: "7 menit",
        content: [
            "Indonesia memiliki kekayaan biodiversitas tanaman obat yang luar biasa. Lebih dari 30.000 spesies tanaman tumbuh di nusantara, dan sekitar 7.000 di antaranya dikenal memiliki khasiat obat secara tradisional.",
            "Temulawak (Curcuma xanthorrhiza) telah terbukti memiliki sifat hepatoprotektif yang melindungi hati. Penelitian di Journal of Ethnopharmacology menunjukkan bahwa kurkuminoid dalam temulawak mampu mengurangi inflamasi dan meningkatkan fungsi hati.",
            "Sambiloto (Andrographis paniculata) mengandung andrographolide yang memiliki aktivitas antiviral dan antiinflamasi. WHO telah mendokumentasikan penggunaannya untuk infeksi saluran pernapasan atas dan diare.",
            "Jahe Merah (Zingiber officinale var. rubrum) kaya akan gingerol dan shogaol, senyawa bioaktif yang terbukti efektif sebagai antiemetik (anti mual), antiinflamasi, dan antioksidan.",
            "Pegagan (Centella asiatica) dikenal membantu penyembuhan luka dan meningkatkan fungsi kognitif. Platform HerbalSainsID menyajikan dosis yang aman berdasarkan penelitian klinis sehingga masyarakat dapat memanfaatkan herbal secara bertanggung jawab.",
        ],
    },
    {
        slug: "ai-prediksi-wabah-penyakit",
        category: "Teknologi",
        date: "20 Feb 2026",
        title: "Bagaimana AI Membantu Prediksi Wabah Penyakit?",
        excerpt: "Model machine learning kini mampu menganalisis data kependudukan dan cuaca untuk memprediksi kemungkinan wabah.",
        color: "bg-blue-100 text-blue-700",
        readTime: "6 menit",
        content: [
            "Kecerdasan buatan (AI) telah mengubah cara kita memahami dan memprediksi penyebaran penyakit. Model machine learning dapat mengolah jutaan data point dari berbagai sumber untuk mengidentifikasi pola yang tidak terlihat oleh analisis konvensional.",
            "SelaluSehat menggunakan algoritma prediktif yang menggabungkan data epidemiologis historis, data cuaca real-time, kepadatan penduduk, dan mobilitas masyarakat untuk memperkirakan risiko wabah di setiap kabupaten/kota.",
            "Teknologi Natural Language Processing (NLP) juga dimanfaatkan untuk memantau laporan berita dan media sosial sebagai sinyal awal terjadinya outbreak. Pendekatan ini disebut event-based surveillance.",
            "Model prediksi kami telah berhasil memperkirakan lonjakan kasus ISPA dengan akurasi 85% berdasarkan data AQI (Air Quality Index) dan suhu rata-rata selama 14 hari sebelumnya.",
            "Dengan integrasi data dari Kemenkes RI, BPS, BMKG, dan WHO, platform HealthMap menyajikan dashboard prediktif yang dapat digunakan oleh dinas kesehatan dan masyarakat umum untuk pengambilan keputusan yang lebih cepat.",
        ],
    },
    {
        slug: "panduan-memilih-fasilitas-kesehatan",
        category: "Faskes",
        date: "15 Feb 2026",
        title: "Panduan Memilih Fasilitas Kesehatan yang Tepat",
        excerpt: "Dengan ribuan puskesmas dan rumah sakit di seluruh Indonesia, HealthMap memudahkan Anda menemukan yang terdekat.",
        color: "bg-amber-100 text-amber-700",
        readTime: "4 menit",
        content: [
            "Indonesia memiliki lebih dari 10.000 puskesmas dan 3.000 rumah sakit yang tersebar di 34 provinsi. Namun tidak semua masyarakat mengetahui fasilitas kesehatan terdekat yang sesuai dengan kebutuhan mereka.",
            "HealthMap menyediakan peta interaktif fasilitas kesehatan yang dapat difilter berdasarkan jenis layanan, jarak, dan ketersediaan. Pengguna dapat menemukan puskesmas, klinik, rumah sakit, dan apotek terdekat dalam hitungan detik.",
            "Saat memilih fasilitas kesehatan, pertimbangkan beberapa faktor: jarak tempuh, jenis layanan yang tersedia, jam operasional, ketersediaan dokter spesialis, dan apakah fasilitas tersebut bekerja sama dengan BPJS Kesehatan.",
            "Untuk kondisi darurat, HealthMap menampilkan IGD rumah sakit terdekat beserta estimasi waktu tempuh menggunakan data lalu lintas real-time, membantu pasien mendapat pertolongan secepat mungkin.",
            "Data fasilitas kesehatan diperbarui secara berkala melalui kerjasama dengan Kemenkes RI dan dinas kesehatan daerah untuk memastikan informasi yang ditampilkan selalu akurat dan terkini.",
        ],
    },
    {
        slug: "apa-itu-genomik-kesehatan",
        category: "Genomik",
        date: "10 Feb 2026",
        title: "Apa Itu Genomik dan Manfaatnya bagi Kesehatan?",
        excerpt: "Teknologi pengurutan gen kini semakin terjangkau. GenomID hadir untuk menjembatani riset genomik dengan masyarakat.",
        color: "bg-teal-100 text-teal-700",
        readTime: "8 menit",
        content: [
            "Genomik adalah cabang biologi molekuler yang mempelajari struktur, fungsi, dan pemetaan genom — seluruh materi genetik makhluk hidup. Kemajuan teknologi sequencing telah membuat analisis genomik semakin terjangkau.",
            "GenomID memanfaatkan data genomik untuk menganalisis risiko penyakit keturunan yang umum di populasi Indonesia, seperti thalassemia, diabetes tipe 2, dan hipertensi. Analisis ini dikombinasikan dengan kearifan lokal dan pola makan tradisional.",
            "Pharmacogenomics — cabang genomik yang mempelajari bagaimana gen mempengaruhi respons tubuh terhadap obat — memungkinkan dokter meresepkan obat dengan dosis yang lebih tepat berdasarkan profil genetik pasien.",
            "Data menunjukkan bahwa populasi Indonesia memiliki variasi genetik yang unik dan beragam, yang tidak selalu terwakili dalam studi genomik global. GenomID hadir untuk mengisi kesenjangan ini.",
            "Dengan harga mulai dari ratusan ribu rupiah, masyarakat kini dapat memahami predisposisi genetik mereka dan mengambil langkah pencegahan yang tepat bersama tenaga kesehatan profesional.",
        ],
    },
    {
        slug: "kebiasaan-harian-menjaga-imun",
        category: "Tips Sehat",
        date: "5 Feb 2026",
        title: "Kebiasaan Harian yang Menjaga Imun Tubuh Tetap Kuat",
        excerpt: "Tidur cukup, olahraga teratur, dan pola makan sehat adalah fondasi kesehatan yang tidak bisa digantikan teknologi.",
        color: "bg-cyan-100 text-cyan-700",
        readTime: "5 menit",
        content: [
            "Sistem imun tubuh adalah pertahanan alami kita terhadap infeksi dan penyakit. Meskipun teknologi kesehatan terus berkembang, menjaga kebiasaan hidup sehat tetap menjadi fondasi terpenting.",
            "Tidur berkualitas selama 7-9 jam setiap malam memungkinkan tubuh memproduksi sitokin — protein yang membantu melawan infeksi dan inflamasi. Kurang tidur kronis dapat menurunkan produksi antibodi hingga 50%.",
            "Olahraga intensitas sedang selama 150 menit per minggu, seperti berjalan cepat, bersepeda, atau berenang, terbukti meningkatkan sirkulasi sel imun dan mengurangi risiko infeksi saluran pernapasan atas.",
            "Konsumsi makanan kaya antioksidan seperti buah berry, sayuran hijau, jahe, kunyit, dan bawang putih membantu melindungi sel-sel imun dari kerusakan oksidatif dan memperkuat respons imun adaptif.",
            "Manajemen stres juga berperan penting. Hormon kortisol yang tinggi akibat stres kronis dapat menekan fungsi imun. Meditasi, yoga, dan teknik pernapasan dalam terbukti menurunkan kadar kortisol secara signifikan.",
        ],
    },
    {
        slug: "deteksi-dini-penyakit-mata",
        category: "Oftalmologi",
        date: "1 Feb 2026",
        title: "Deteksi Dini Penyakit Mata dengan Teknologi AI",
        excerpt: "BeMyEye menggunakan kecerdasan buatan untuk mendeteksi glaukoma, katarak, dan retinopati diabetik dari foto fundus.",
        color: "bg-pink-100 text-pink-700",
        readTime: "6 menit",
        content: [
            "Penyakit mata seperti glaukoma, katarak, dan retinopati diabetik seringkali tidak menunjukkan gejala pada tahap awal. Padahal, deteksi dini merupakan kunci untuk mencegah kebutaan permanen.",
            "BeMyEye memanfaatkan teknologi deep learning untuk menganalisis gambar fundus mata dan mendeteksi tanda-tanda awal penyakit. Model AI ini dilatih menggunakan ribuan gambar fundus dari rumah sakit di Indonesia.",
            "Retinopati diabetik mempengaruhi 1 dari 3 penderita diabetes. Pemeriksaan rutin fundus mata seharusnya dilakukan setiap tahun, namun keterbatasan dokter spesialis mata di daerah membuat hal ini sulit dilakukan.",
            "Dengan BeMyEye, pengguna cukup mengambil foto fundus menggunakan lensa khusus yang terjangkau, lalu AI akan menganalisis gambar dan memberikan penilaian risiko dalam hitungan detik.",
            "Teknologi ini tidak menggantikan diagnosis dokter, melainkan membantu skrining massal di daerah terpencil dimana akses ke dokter spesialis mata sangat terbatas, sehingga pasien berisiko tinggi dapat segera dirujuk.",
        ],
    },
    {
        slug: "konsultasi-dokter-ai-simdoc",
        category: "AI Kesehatan",
        date: "28 Jan 2026",
        title: "Mengenal SimDoc AI: Konsultasi Dokter Cerdas",
        excerpt: "SimDoc AI membantu triase gejala dan memberikan rekomendasi spesialis berbasis bukti klinis yang terpercaya.",
        color: "bg-violet-100 text-violet-700",
        readTime: "5 menit",
        content: [
            "SimDoc AI adalah platform konsultasi kesehatan berbasis kecerdasan buatan yang dirancang untuk membantu masyarakat Indonesia mendapatkan informasi kesehatan awal sebelum berkunjung ke fasilitas kesehatan.",
            "Sistem triase AI ini bekerja dengan mengajukan pertanyaan terstruktur tentang gejala yang dialami, riwayat kesehatan, dan faktor risiko. Berdasarkan jawaban pengguna, SimDoc memberikan penilaian tingkat keparahan.",
            "SimDoc menggunakan database medis yang mencakup lebih dari 1.000 kondisi kesehatan umum di Indonesia. Algoritma diagnostik diferensial membantu menyaring kemungkinan penyebab gejala dan merekomendasikan langkah selanjutnya.",
            "Untuk kasus yang memerlukan perhatian medis, SimDoc akan merekomendasikan jenis spesialis yang sesuai dan menghubungkan pengguna dengan direktori fasilitas kesehatan terdekat melalui integrasi dengan HealthMap.",
            "Penting untuk diingat bahwa SimDoc AI bukan pengganti konsultasi dokter profesional. Platform ini dirancang sebagai langkah awal yang membantu masyarakat memahami kapan harus segera ke dokter dan spesialis apa yang paling tepat.",
        ],
    },
    {
        slug: "peta-wabah-penyakit-realtime",
        category: "Epidemi",
        date: "20 Jan 2026",
        title: "Memantau Wabah Penyakit Secara Real-Time dengan HealthMap",
        excerpt: "HealthMap menampilkan peta interaktif penyebaran penyakit di seluruh Indonesia berdasarkan data Kemenkes RI.",
        color: "bg-rose-100 text-rose-700",
        readTime: "4 menit",
        content: [
            "Pemantauan wabah penyakit secara real-time merupakan salah satu pilar penting dalam epidemiologi modern. HealthMap menghadirkan peta interaktif yang menampilkan data penyebaran penyakit di seluruh Indonesia.",
            "Data dikumpulkan dari berbagai sumber terpercaya: laporan puskesmas dan rumah sakit, data surveilans Kemenkes RI, laporan WHO, dan berita kesehatan dari media terpercaya. Semua data divalidasi sebelum ditampilkan.",
            "Pengguna dapat melihat tren kasus di tingkat provinsi hingga kecamatan, memfilter berdasarkan jenis penyakit (DBD, ISPA, diare, dll.), dan melihat data historis untuk memahami pola musiman.",
            "Model prediktif machine learning menganalisis data historis, cuaca, dan demografi untuk memperkirakan risiko wabah 2-4 minggu ke depan, memberikan waktu berharga bagi dinas kesehatan untuk bersiap.",
            "HealthMap juga menyediakan fitur notifikasi push yang memberi peringatan jika terjadi lonjakan kasus di wilayah pengguna, membantu masyarakat mengambil tindakan pencegahan lebih awal.",
        ],
    },
];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find((a) => a.slug === slug);
}
