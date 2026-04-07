# Panduan Instalasi dan Menjalankan Proyek

Berikut adalah panduan langkah demi langkah untuk menjalankan proyek **Selalu Sehat** di komputer atau *local environment* Anda dari *file* ZIP yang telah diunduh hingga proyek berhasil berjalan.

### 1. Persiapan Prasyarat
Pastikan Anda sudah menginstal perangkat lunak berikut di komputer Anda:
- **Node.js** (versi 18.x atau yang lebih baru sangat disarankan).
- **npm** (biasanya sudah termasuk atau otomatis terinstal bersama Node.js), atau bisa menggunakan **yarn**, **pnpm**, **bun**.
- Aplikasi pengekstraksi arsip ZIP (seperti WinRAR, 7-Zip, atau fitur bawaan *OS/Explorer* Anda).

### 2. Ekstrak File ZIP
- Temukan *file* `.zip` proyek (misalnya `selalu-sehat.zip`) yang telah Anda peroleh/unduh.
- Klik kanan pada *file* `.zip` tersebut dan pilih **"Extract Here"** atau **"Ekstrak ke folder ini..."**.
- Buka aplikasi terminal atau *command prompt* (Powershell/CMD/Git Bash), lalu arahkan (*navigate*) masuk ke dalam folder hasil ekstraksi yang memuat kode proyek. Gunakan perintah berikut:
```bash
cd selalu-sehat
```
*(Catatan: Sesuaikan perintah `cd` dengan nama folder persis dari hasil ekstraksi).*

### 3. Instalasi Dependensi
Setelah berada tepat di dalam folder proyek, Anda wajib menginstal semua *library* dan modul perantara pengembangan yang dibutuhkan oleh Next.js. Jalankan **salah satu** perintah instalasi berikut di terminal:
```bash
npm install
# atau
yarn install
# atau
pnpm install
```
Tunggu hingga proses instalasi selesai 100%.

### 4. Konfigurasi Environment Variables (`.env`)
Aplikasi ini membutuhkan konfigurasi *API Keys* pihak ketiga agar layanan berbasis AI (seperti **SimDoc AI**) dan data lingkungan (HeatMap) dapat berfungsi semestinya. 

Buat sebuah file baru teks kosong bernama persis **`.env`** atau **`.env.local`** di *root directory* (folder uama proyek, sejajar dengan file `package.json`), lalu isikan seting variabel berikut ke dalamnya:

```env
# API Key untuk Google Gemini. 
# Digunakan untuk fitur Chatbot SimDoc AI beserta asisten navigasi pintar.
GEMINI_API_KEY=masukkan_api_key_gemini_anda_di_sini
```

**Panduan mendapatkan API Keys:**
- **GEMINI_API_KEY**: Kunjungi [Google AI Studio](https://aistudio.google.com/) menggunakan akun Google Anda -> login -> klik "Get API key" pada panel -> klik "Create API key".

### 5. Menjalankan *Development Server*
Setelah seluruh paket modul sukses diinstal dan *environment variable* berisikan token API sudah tersimpan, jalankan server pengembangan (*local server*) menggunakan perintah berikut:
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

### 6. Akses Aplikasi di Web Browser
Tunggu hingga di terminal muncul indikator bahwa proses kompilasi awal telah siap (biasanya memunculkan teks hijau). Kemudian buka *browser* pilihan Anda (seperti Chrome, Edge, Safari, dll), lalu kunjungi URL berikut:
**[http://localhost:3000](http://localhost:3000)**

Halaman *homepage* dan seluruh ekosistem fitur **Selalu Sehat** sekarang berhasil berjalan dan interaktif untuk diuji coba di komputer lokal Anda!
