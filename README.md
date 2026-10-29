<div align="center">
<img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Dillion / Magic UI Portfolio + Payload CMS & PostgreSQL

Website portofolio interaktif berbasis Next.js, Magic UI, Shadcn/UI, dan TailwindCSS yang telah diintegrasikan secara native dengan **Payload CMS 3.x** dan **PostgreSQL**.

- **Tampilan Publik**: Tetap mempertahankan 100% layout asli Dillion Verma (animasi, tema, dock, responsivitas).
- **Dashboard CMS**: Tersedia di `/admin` untuk mengelola seluruh profil, proyek, pengalaman kerja, pendidikan, keahlian, media, dan pengaturan situs secara visual tanpa rebuild source code.
- **Database**: PostgreSQL dengan adapter resmi `@payloadcms/db-postgres`.

---

## 1. Persyaratan Sistem & Runtime

- **Node.js**: `>=18.0.0` (Direkomendasikan Node.js 20 atau 24, teruji di v24.15.0)
- **Package Manager**: `pnpm` (v9 - v12)
- **Database**: PostgreSQL 15+ (Teruji dengan PostgreSQL 16 lokal pada port 5432)

---

## 2. Konfigurasi Environment

File `.env.example` telah disediakan. Buat atau sesuaikan file `.env.local` di root proyek:

```env
# Koneksi Database PostgreSQL
# Format: postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
DATABASE_URL=postgresql://postgres:PASSWORD_POSTGRES_ANDA@127.0.0.1:5432/portfolio_db

# Secret key untuk signing session & cookie Payload (minimal 32 karakter)
PAYLOAD_SECRET=kunci-rahasia-acak-minimal-32-karakter-keamanan-tinggi

# URL Server
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

> [!NOTE]
> File `.env.local` secara otomatis diabaikan oleh Git (`.gitignore`) untuk menjaga keamanan kredensial lokal Anda.

---

## 3. Menyiapkan PostgreSQL Lokal

1. Pastikan service PostgreSQL Anda sedang berjalan (misal: di port 5432).
2. Buat database khusus proyek ini (misal via `psql` atau pgAdmin):
   ```sql
   CREATE DATABASE portfolio_db;
   ```
3. Sesuaikan `PASSWORD_POSTGRES_ANDA` di `.env.local` dengan password akun `postgres` Anda.

---

## 4. Instalasi Dependensi & Menjalankan Dev Server

1. **Instal dependensi**:
   ```bash
   pnpm install
   ```

2. **Jalankan development server**:
   ```bash
   pnpm dev
   ```
   Website publik dapat dibuka di: [http://localhost:3000](http://localhost:3000) (atau [http://localhost:3001](http://localhost:3001) jika port 3000 sedang terpakai).

---

## 5. Seed Konten Asli Dillion ke Database

Setelah database PostgreSQL terhubung di `.env.local`, jalankan skrip seeding satu kali untuk memigrasikan data asli Dillion:

```bash
pnpm seed
```

**Karakteristik Skrip Seed**:
- **Idempotent**: Aman dijalankan berulang kali tanpa membuat duplikat data.
- **Preserve Admin Edits**: Tidak akan menimpa data yang telah diubah oleh admin melalui dashboard.
- **Tanpa Kredensial Hardcoded**: Tidak menyematkan akun atau password admin apa pun.

---

## 6. Mengakses Dashboard Admin & Mengelola Konten

1. Buka browser ke alamat: **`http://localhost:3001/admin`** (atau port yang aktif).
2. **Membuat Admin Pertama**: Saat pertama kali dibuka dengan database baru, Payload akan menampilkan formulir pendaftaran akun administrator pertama (email & password).
3. **Mengelola Konten**:
   - **Pengaturan Situs**: Kelola nama situs, SEO description, nomor WhatsApp, dan link sosial media.
   - **Profil Pengguna**: Ubah nama, headline, deskripsi, summary tentang saya, lokasi, dan foto profil.
   - **Proyek (Projects)**: Mendukung fitur **Draft & Publish**. Proyek berstatus *Draft* hanya terlihat oleh admin dan tidak akan tampil di halaman publik.
   - **Pengalaman Kerja (Experiences)**, **Pendidikan (Education)**, **Keahlian (Skills)**, & **Hackathons**.
   - **Media**: Pengunggahan gambar dan dokumen PDF dengan validasi format aman.

Setiap perubahan yang dipublikasikan di `/admin` langsung tercermin di website publik saat halaman dimuat ulang (**tanpa perlu build ulang atau restart server**).

---

## 7. Lokasi Penyimpanan Media & Kesiapan Hosting

- **Lokal**: File media disimpan di folder `/media` di root proyek (diabaikan oleh Git).
- **Produksi (Vercel / Cloud)**: Filesystem Vercel bersifat *serverless/read-only ephemeral*. Saat deployment ke produksi nanti:
  1. Gunakan database hosted seperti Neon, Supabase, atau AWS RDS.
  2. Gunakan plugin object storage resmi Payload (`@payloadcms/storage-s3` untuk AWS S3, Cloudflare R2, atau Supabase Storage / Vercel Blob).

---

## 8. Perintah Tersedia (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `pnpm dev` | Menjalankan Next.js + Payload CMS development server |
| `pnpm build` | Melakukan compile & optimasi production build |
| `pnpm start` | Menjalankan server dalam mode production |
| `pnpm seed` | Menjalankan seeding data portofolio ke database PostgreSQL |
| `pnpm migrate` | Menjalankan migrasi skema database resmi Payload |
| `pnpm generate:types` | Menghasilkan TypeScript types (`payload-types.ts`) |
| `pnpm generate:importmap` | Menghasilkan mapping komponen admin Payload |
| `pnpm lint` | Memeriksa kepatuhan kode dengan ESLint |
