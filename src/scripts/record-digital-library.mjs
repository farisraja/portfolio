import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function smoothScroll(page, targetY, durationMs = 3000, steps = 60) {
  const currentY = await page.evaluate(() => window.scrollY);
  const distance = targetY - currentY;
  const stepDistance = distance / steps;
  const stepDelay = durationMs / steps;

  for (let i = 0; i < steps; i++) {
    await page.evaluate((step) => {
      window.scrollBy(0, step);
    }, stepDistance);
    await sleep(stepDelay);
  }
}

async function recordDigitalLibrary() {
  console.log('--- Memulai Perekaman Video: Digital Library UNPAK ---');
  const tempDir = path.resolve('public/videos/temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const unpakHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>E-SKRIPSI FMIPA Universitas Pakuan</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #f8fafc;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #1e293b;
    }
    .top-navbar {
      background: linear-gradient(135deg, #4c1d95 0%, #312e81 100%);
      color: white;
      padding: 12px 24px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    }
    .brand-logo { width: 42px; height: 42px; object-fit: contain; }
    .hero-banner {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.04);
      border: 1px solid #e2e8f0;
      margin-top: 24px;
    }
    .skripsi-card {
      background: white;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      padding: 20px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.03);
      transition: all 0.3s ease;
      height: 100%;
    }
    .skripsi-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(76, 29, 149, 0.1);
      border-color: #c4b5fd;
    }
    .badge-custom {
      font-size: 0.75rem;
      padding: 5px 10px;
      border-radius: 6px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <!-- Header Navbar -->
  <header class="top-navbar d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center gap-3">
      <img src="/videos/temp/logo-unpak.png" alt="Logo UNPAK" class="brand-logo">
      <div>
        <h5 class="fw-bold m-0" style="letter-spacing: 0.5px;">E-SKRIPSI FMIPA</h5>
        <small class="opacity-75" style="font-size: 0.72rem; letter-spacing: 0.5px;">PERPUSTAKAAN ILMU KOMPUTER UNIVERSITAS PAKUAN</small>
      </div>
    </div>
    <div class="d-flex align-items-center gap-3">
      <span class="badge bg-light text-dark px-3 py-2 fw-semibold"><i class="bi bi-shield-check text-success me-1"></i> Terakreditasi BAN-PT</span>
      <button class="btn btn-warning btn-sm fw-bold px-3 py-1.5"><i class="bi bi-box-arrow-in-right me-1"></i> Portal Mahasiswa</button>
    </div>
  </header>

  <div class="container pb-5">
    <!-- Hero Banner -->
    <div class="hero-banner">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <span class="badge bg-primary-subtle text-primary mb-2 fw-bold text-uppercase px-2.5 py-1">
            <i class="bi bi-journal-bookmark-fill me-1"></i> Repositori Skripsi Digital
          </span>
          <h2 class="fw-bold text-dark mb-2">Koleksi Karya Ilmiah & Tugas Akhir</h2>
          <p class="text-muted mb-4">Akses naskah lengkap, abstrak, dan kode sumber riset mahasiswa Program Studi Ilmu Komputer Universitas Pakuan.</p>
          
          <!-- Search Bar -->
          <div class="input-group input-group-lg shadow-sm">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-primary"></i></span>
            <input type="text" class="form-control border-start-0 border-end-0 ps-0" placeholder="Ketik kata kunci judul, topik (AI, IoT, Web, Mobile), atau nama mahasiswa..." value="Machine Learning & Deep Learning">
            <button class="btn btn-primary px-4 fw-semibold" type="button"><i class="bi bi-arrow-right"></i> Cari Skripsi</button>
          </div>
        </div>
        <div class="col-lg-4 text-center d-none d-lg-block">
          <div class="p-4 bg-light rounded-4 border">
            <h3 class="fw-bold text-primary mb-1">1,420+</h3>
            <p class="text-muted small mb-2">Total Judul Terarsip</p>
            <div class="d-flex justify-content-around text-center mt-3 pt-3 border-top">
              <div>
                <h6 class="fw-bold mb-0">100%</h6>
                <small class="text-muted" style="font-size: 10px;">Bebas Pustaka</small>
              </div>
              <div>
                <h6 class="fw-bold mb-0">5 Bidang</h6>
                <small class="text-muted" style="font-size: 10px;">Peminatan</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Buttons -->
    <div class="d-flex gap-2 my-4 overflow-auto pb-1">
      <button class="btn btn-primary btn-sm rounded-pill px-3 fw-semibold">Semua Bidang</button>
      <button class="btn btn-outline-secondary btn-sm rounded-pill px-3">Artificial Intelligence</button>
      <button class="btn btn-outline-secondary btn-sm rounded-pill px-3">Software Engineering</button>
      <button class="btn btn-outline-secondary btn-sm rounded-pill px-3">Network & Security</button>
      <button class="btn btn-outline-secondary btn-sm rounded-pill px-3">Data Science</button>
    </div>

    <!-- Skripsi Cards Grid -->
    <div class="row g-4">
      <div class="col-md-6 col-lg-4">
        <div class="skripsi-card d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-info-subtle text-info badge-custom">Artificial Intelligence</span>
            <span class="text-muted small fw-semibold">2024</span>
          </div>
          <h6 class="fw-bold mb-2 text-dark lh-base">Klasifikasi Citra Rontgen Paru-Paru Menggunakan Arsitektur ResNet-50 dan DenseNet</h6>
          <p class="text-muted small mb-3 flex-grow-1">Implementasi transfer learning untuk mendeteksi pneumonia dengan akurasi 96.4%.</p>
          <div class="pt-3 border-top d-flex justify-content-between align-items-center">
            <span class="small fw-semibold text-secondary"><i class="bi bi-person me-1"></i> Faris Raja Ardana</span>
            <button class="btn btn-sm btn-outline-primary rounded-pill px-3"><i class="bi bi-file-earmark-pdf me-1"></i> Unduh PDF</button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="skripsi-card d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-success-subtle text-success badge-custom">Data Science</span>
            <span class="text-muted small fw-semibold">2024</span>
          </div>
          <h6 class="fw-bold mb-2 text-dark lh-base">Analisis Keranjang Belanja Menggunakan Algoritma Apriori dan FP-Growth</h6>
          <p class="text-muted small mb-3 flex-grow-1">Optimasi tata letak barang minimarket berbasis aturan asosiasi pola transaksi belanja konsumen.</p>
          <div class="pt-3 border-top d-flex justify-content-between align-items-center">
            <span class="small fw-semibold text-secondary"><i class="bi bi-person me-1"></i> Mahasiswa Ilmu Komputer</span>
            <button class="btn btn-sm btn-outline-primary rounded-pill px-3"><i class="bi bi-file-earmark-pdf me-1"></i> Unduh PDF</button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="skripsi-card d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-warning-subtle text-warning badge-custom">Internet of Things</span>
            <span class="text-muted small fw-semibold">2023</span>
          </div>
          <h6 class="fw-bold mb-2 text-dark lh-base">Sistem Monitoring Kualitas Udara Ruangan Laboratorium Berbasis ESP32 dan MQTT</h6>
          <p class="text-muted small mb-3 flex-grow-1">Pemantauan konsentrasi gas CO2 dan partikulat PM2.5 secara waktu nyata dengan dasbor web.</p>
          <div class="pt-3 border-top d-flex justify-content-between align-items-center">
            <span class="small fw-semibold text-secondary"><i class="bi bi-person me-1"></i> Laboratorium Komputer</span>
            <button class="btn btn-sm btn-outline-primary rounded-pill px-3"><i class="bi bi-file-earmark-pdf me-1"></i> Unduh PDF</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const unpakPath = path.resolve('public/videos/temp/digital-library-showcase.html');
  fs.writeFileSync(unpakPath, unpakHtml, 'utf8');

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: tempDir,
      size: { width: 1280, height: 720 },
    },
  });

  const page = await context.newPage();

  console.log('Membuka antarmuka Digital Library UNPAK...');
  await page.goto('http://localhost:3000/videos/temp/digital-library-showcase.html', {
    waitUntil: 'networkidle',
  });

  // 1. Hero Banner & Pencarian (10s)
  console.log('1. Menyorot Banner E-SKRIPSI & Kotak Pencarian...');
  await page.mouse.move(640, 240);
  await sleep(4000);
  await page.mouse.move(500, 310);
  await sleep(3000);

  // 2. Scroll ke Filter & Kartu Skripsi (15s)
  console.log('2. Scroll menyorot kategori peminatan dan daftar skripsi...');
  await smoothScroll(page, 450, 4000);
  await sleep(2000);
  await page.mouse.move(300, 480);
  await sleep(2000);
  await page.mouse.move(640, 480);
  await sleep(2000);
  await page.mouse.move(980, 480);
  await sleep(2000);

  // 3. Scroll kembali ke atas & penutup (10s)
  console.log('3. Scroll kembali ke header...');
  await smoothScroll(page, 0, 3000);
  await sleep(4000);

  // Finalisasi video
  const video = page.video();
  await context.close();
  await browser.close();

  const originalPath = await video.path();
  const finalPath = path.resolve('public/videos/digital-library-unpak-demo.webm');

  if (fs.existsSync(finalPath)) {
    fs.unlinkSync(finalPath);
  }
  fs.renameSync(originalPath, finalPath);

  try {
    fs.unlinkSync(unpakPath);
  } catch {}

  const stats = fs.statSync(finalPath);
  console.log(`✓ Selesai merekam Digital Library UNPAK! Disimpan ke: ${finalPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

recordDigitalLibrary().catch((err) => {
  console.error('Gagal merekam Digital Library UNPAK:', err);
  process.exit(1);
});
