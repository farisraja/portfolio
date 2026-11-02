# Panduan Lengkap Migrasi Portfolio ke PC Rumah

Dokumen ini berisi panduan *langkah demi langkah* untuk memindahkan dan menjalankan proyek **Portfolio & Payload CMS (Faris Raja Ardana)** secara utuh di PC rumah Anda, lengkap dengan seluruh data database PostgreSQL, berkas media (foto sertifikat, screenshot proyek MKLC, avatar), dan kodenya.

---

## 1. Persiapan Awal di PC Rumah

Pastikan PC rumah Anda telah terpasang software berikut:
1. **Node.js** (Versi 18, 20, atau 22 LTS)  
   Unduh di: [https://nodejs.org/](https://nodejs.org/)
2. **pnpm** (Package manager yang digunakan proyek ini)  
   Install via CMD/PowerShell:
   ```powershell
   npm install -g pnpm
   ```
3. **Git**  
   Unduh di: [https://git-scm.com/](https://git-scm.com/)
4. **PostgreSQL** (Versi 15 atau 16)  
   Unduh di: [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)  
   *(Catat password user `postgres` yang Anda buat saat instalasi).*

---

## 2. Pilihan Cara Memindahkan Proyek

Anda dapat memilih salah satu dari 2 cara berikut:

### Opsi A: Menggunakan Git Clone + Paket Migrasi (Direkomendasikan)
1. Buka PowerShell / Terminal di folder kerja Anda (misal `D:\projects\` atau `C:\laragon\www\`):
   ```powershell
   git clone https://github.com/farisraja/portfolio.git
   cd portfolio
   ```
2. Copy berkas-berkas dari paket migrasi (`migration_bundle` atau `portfolio_migration_package.zip`) ke dalam folder `portfolio`:
   - Folder `media/`  *(Sangat penting: berisi 42 berkas foto sertifikat, screenshot, dan avatar).*
   - File `.env.local`
   - File `portfolio_db_backup.sql`
   - File `restore-db.ps1`

### Opsi B: Copy Seluruh Folder Proyek via Flashdisk / Google Drive
1. Copy seluruh folder `portfolio` dari PC kantor/kampus ke flashdisk.
   > **Tips:** Hapus atau jangan copy folder `node_modules` dan `.next` agar ukuran copy kecil dan cepat (hanya puluhan MB). Folder `media/`, `.env.local`, dan `portfolio_db_backup.sql` wajib ikut tercopy.
2. Paste ke PC rumah Anda (misal di `C:\laragon\www\portfolio` atau folder pilihan Anda).

---

## 3. Restore Database PostgreSQL di PC Rumah

Ada 2 cara untuk mengembalikan database:

### Cara 1: Menggunakan Script Otomatis (Paling Mudah)
Buka PowerShell di dalam folder `portfolio`, lalu jalankan:
```powershell
.\restore-db.ps1
```
Script akan otomatis mencari `psql.exe`, meminta password PostgreSQL PC rumah Anda, membuat database `portfolio_db`, dan mengimpor seluruh tabel serta datanya secara otomatis.

### Cara 2: Manual via PowerShell / Command Prompt
1. Buka PowerShell / CMD:
   ```powershell
   # Buat database portfolio_db
   psql -U postgres -c "CREATE DATABASE portfolio_db;"
   
   # Impor data dari file backup
   psql -U postgres -d portfolio_db -f portfolio_db_backup.sql
   ```

### Cara 3: Menggunakan pgAdmin 4 (GUI)
1. Buka **pgAdmin 4**.
2. Klik kanan pada **Databases** -> **Create** -> **Database...** -> Beri nama `portfolio_db` -> Save.
3. Klik kanan pada database `portfolio_db` yang baru dibuat -> Pilih **Restore...**
4. Pada tab *General*, pilih format *All Files* dan arahkan ke file `portfolio_db_backup.sql`.
5. Klik **Restore**.

---

## 4. Konfigurasi File `.env.local`

Buka file `.env.local` di folder `portfolio` menggunakan VS Code / Notepad:
```env
DATABASE_URL=postgresql://postgres:PASSWORD_POSTGRES_PC_RUMAH@127.0.0.1:5432/portfolio_db
PAYLOAD_SECRET=de2aced20b568118e62926be879b53d4c8e431840876408c371c4bd0a4134e81
NEXT_PUBLIC_SERVER_URL=http://localhost:3002
```
> **Catatan:** Ganti `PASSWORD_POSTGRES_PC_RUMAH` dengan password user `postgres` yang Anda tentukan di PC rumah.

---

## 5. Install Dependency & Jalankan Aplikasi

1. Install dependensi modul:
   ```powershell
   pnpm install
   ```
2. Jalankan server development:
   ```powershell
   pnpm exec next dev -p 3002
   ```
   *(Atau `pnpm dev` jika Anda ingin menjalankan di port default 3000).*

3. Buka browser:
   - **Frontend Portfolio:** [http://localhost:3002](http://localhost:3002)
   - **Admin CMS:** [http://localhost:3002/admin](http://localhost:3002/admin)

---

## 6. Checklist Verifikasi Setelah Pindah

- [ ] Halaman depan [http://localhost:3002](http://localhost:3002) terbuka normal tanpa error CMS.
- [ ] Bagian **Karya & Proyek Terpilih** menampilkan proyek MKLC Frontend, MKLC Backend, dan video demo PB Cipta.
- [ ] Bagian **Keahlian (Skills)** menampilkan seluruh 19 logo teknologi SVG lengkap.
- [ ] Bagian **Lisensi & Sertifikasi** menampilkan foto sertifikat dan modal lightbox saat diklik.
- [ ] Dashboard Admin [http://localhost:3002/admin](http://localhost:3002/admin) dapat diakses dengan akun admin Anda.
