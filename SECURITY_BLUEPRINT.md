# Blueprint Keamanan Tingkat Tinggi (High-Grade Security Architecture)
**Untuk Seluruh Source Code, Database, Admin CMS, dan Proyek Portofolio**  
*Pemilik: Faris Raja Ardana*

---

## 1. Ringkasan Eksekutif & Filosofi Keamanan

Untuk mencegah pencurian source code, pembobolan data, dan eksfiltrasi sistem, kita menerapkan strategi **Defense-in-Depth (Pertahanan Berlapis)**. Prinsip utamanya adalah:
> *"Tidak ada satu celah pun yang dibiarkan berdiri sendiri; setiap lapisan (Source Code, Database, API, CMS, dan Jaringan) memiliki pengamanan independen."*

---

## 2. Rencana Aksi 6 Lapisan Keamanan

### LAPISAN 1: Perlindungan Source Code dari Pencurian & Pembajakan

Masalah terbesar bagi developer adalah source code engine/backend asli (seperti SCORM Engine MKLC atau algoritma PB Cipta) di-clone atau dicuri orang lain jika diunggah publik.

1. **Arsitektur Dual-Repository (Public Showcase vs Private Core):**
   - Repositori backend sensitif (`mklc-scorm-backend`, `pb-cipta-sports`) diatur menjadi **Private Repository** di GitHub.
   - Website portfolio publik hanya menampilkan studi kasus, arsitektur sistem, tangkapan layar, dan video demo tanpa mempublikasikan kode bisnis internal.
2. **GPG Commit Signing:**
   - Aktifkan tanda tangan digital GPG pada Git lokal. Setiap commit yang Anda buat akan memiliki lencana **Verified** resmi dari GitHub untuk mencegah spoofing identitas commit.
3. **Lisensi Hak Cipta Ketat (All Rights Reserved):**
   - Sertakan lisensi berhak cipta pada repositori portofolio yang secara hukum melarang redistribusi komersial tanpa izin tertulis.
4. **Akun GitHub Dilindungi 2FA:**
   - Aktifkan Autentikasi Dua Faktor (2FA) di GitHub menggunakan aplikasi autentikator (Google Authenticator) atau Passkey fisik.

---

### LAPISAN 2: Kebocoran Kredensial & Secrets (Zero-Leak Policy)

1. **Aturan `.gitignore` Berlapis:**
   - Menjamin file kredensial berikut mutlak tidak pernah ter-commit:
     ```
     .env*.local
     .env
     *.pem
     *.key
     *.sql
     ```
2. **GitHub Secret Scanning & Push Protection:**
   - Aktifkan fitur gratis GitHub: *Settings -> Code security and analysis -> Push Protection*. GitHub akan otomatis memblokir aksi `git push` jika Anda tidak sengaja memasukkan secret key.

---

### LAPISAN 3: Pengamanan Database PostgreSQL (Database Fortification)

1. **Enkripsi dalam Perjalanan (In-Transit Encryption):**
   - Wajibkan koneksi berbasis **SSL/TLS** (`sslmode=require`).
2. **Prinsip Least-Privilege (Hak Akses Minimum):**
   - Di server produksi, buat user database khusus (bukan `postgres` superuser) yang hanya memiliki hak `SELECT`, `INSERT`, `UPDATE`, `DELETE` pada tabel `portfolio_db`.
3. **Isolasi Jaringan (IP Whitelist / Private Network):**
   - Port 5432 database tidak boleh terbuka ke publik internet. Database hanya boleh menerima koneksi dari IP aplikasi Next.js (via internal VPC atau firewall allowlist).
4. **Cadangan Terenkripsi Otomatis (Encrypted Automated Backup):**
   - Backup dump SQL otomatis diekspor dan dienkripsi sebelum disimpan ke penyimpanan awan cadangan.

---

### LAPISAN 4: Pengamanan Akses & Admin Payload CMS

1. **Brute-Force & Credential Stuffing Defense:**
   - Konfigurasi pada koleksi `Users.ts`:
     - `maxLoginAttempts: 5` (Kunci akun otomatis setelah 5 kali salah password).
     - `lockTime: 10 * 60 * 1000` (Durasi terkunci selama 10 menit).
     - `tokenExpiration: 7200` (Sesi kedaluwarsa dalam 2 jam).
     - `cookies: { secure: true, sameSite: 'lax' }`.
2. **Access Control (RBAC) Ketat:**
   - API publik hanya diizinkan membaca dokumen dengan `_status: 'published'` dan `active: true`.
   - Seluruh mutasi data (`create`, `update`, `delete`, `link`, `unlink`) hanya dapat diakses oleh user dengan sesi login valid (`isAdmin`).

---

### LAPISAN 5: HTTP Security Headers & Proteksi Frontend

Mencegah serangan umum berbasis web seperti Clickjacking, XSS (Cross-Site Scripting), dan MIME-type sniffing:
- **Content-Security-Policy (CSP):** Mengontrol sumber skrip dan aset yang sah.
- **Strict-Transport-Security (HSTS):** Memaksa koneksi HTTPS secara permanen.
- **X-Frame-Options: DENY / SAMEORIGIN:** Mencegah website di-embed di iframe phishing.
- **X-Content-Type-Options: nosniff:** Mencegah manipulasi tipe berkas.
- **Referrer-Policy: strict-origin-when-cross-origin.**
- **Permissions-Policy: camera=(), microphone=(), geolocation=().**

---

### LAPISAN 6: Proteksi Edge & Perimeter (Cloudflare Integration)

1. **WAF (Web Application Firewall):** Memblokir serangan SQL Injection, XSS, dan exploit umum secara otomatis.
2. **Bot Fight Mode:** Menghentikan bot scraper yang mencoba mencuri konten teks atau menyedot resource.
3. **DDoS Protection:** Menahan lonjakan request berbahaya secara real-time.
4. **Cloudflare Zero Trust / Access:** Membatasi akses ke dashboard `/admin` hanya untuk email pribadi Anda dengan kode OTP sekali pakai.
