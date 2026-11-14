import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function recordMklcBackend() {
  console.log('--- Memulai Perekaman Video: MKLC SCORM Engine & Admin Backend ---');
  const tempDir = path.resolve('public/videos/temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const showcaseHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>MKLC SCORM Admin Backend Showcase</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #090d16;
      color: #f8fafc;
      font-family: 'Plus Jakarta Sans', sans-serif;
      width: 1280px;
      height: 720px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .browser-header {
      background: #0f172a;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      height: 48px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 12px;
      z-index: 50;
    }
    .dots { display: flex; gap: 6px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #f59e0b; }
    .dot-green { background: #10b981; }
    .address-bar {
      flex: 1;
      max-width: 600px;
      background: #1e293b;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 8px;
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #94a3b8;
      gap: 8px;
    }
    .badge-app {
      margin-left: auto;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }
    .viewport {
      flex: 1;
      position: relative;
      overflow: hidden;
      background: #020617;
    }
    .slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;
      display: flex;
      flex-direction: column;
    }
    .slide.active { opacity: 1; }
    .slide-scroll {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    .slide-img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 6s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .feature-pill {
      position: absolute;
      bottom: 24px;
      left: 24px;
      background: rgba(15, 23, 42, 0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.12);
      padding: 12px 18px;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
      max-width: 520px;
      z-index: 40;
    }
    .feature-title {
      font-size: 13px;
      font-weight: 700;
      color: #34d399;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }
    .feature-desc {
      font-size: 11px;
      color: #cbd5e1;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="browser-header">
    <div class="dots">
      <div class="dot dot-red"></div>
      <div class="dot dot-yellow"></div>
      <div class="dot dot-green"></div>
    </div>
    <div class="address-bar">
      <span>🔒</span>
      <span>https://admin-mklc.mkri.id/dashboard</span>
    </div>
    <div class="badge-app">Admin Backend MKLC</div>
  </div>

  <div class="viewport">
    <div class="slide active" id="slide-1">
      <div class="slide-scroll">
        <img class="slide-img" id="img-1" src="/api/media/file/mklc-be-01-dashboard-overview.png" alt="Dashboard Overview">
      </div>
      <div class="feature-pill">
        <div class="feature-title">📊 Dasbor Monitoring Mahkamah Konstitusi</div>
        <div class="feature-desc">Visualisasi metrik waktu nyata atas total pembelajar aktif, modul SCORM terdistribusi, dan tingkat penyelesaian pelatihan.</div>
      </div>
    </div>

    <div class="slide" id="slide-2">
      <div class="slide-scroll">
        <img class="slide-img" id="img-2" src="/api/media/file/mklc-be-02-tracking-soal.png" alt="Tracking Soal">
      </div>
      <div class="feature-pill">
        <div class="feature-title">🎯 Pelacakan Soal Ujian & Statistik Interaksi</div>
        <div class="feature-desc">Menganalisis tingkat kesulitan butir soal asesmen SCORM dan distribusi jawaban peserta secara transparan.</div>
      </div>
    </div>

    <div class="slide" id="slide-3">
      <div class="slide-scroll">
        <img class="slide-img" id="img-3" src="/api/media/file/mklc-be-03-manajemen-peserta.png" alt="Manajemen Peserta">
      </div>
      <div class="feature-pill">
        <div class="feature-title">👥 Manajemen Peserta & Rekap Nilai KHS</div>
        <div class="feature-desc">Sinkronisasi status kelulusan, skor akhir, dan pengesahan transkrip kelulusan diklat pegawai institusi.</div>
      </div>
    </div>

    <div class="slide" id="slide-4">
      <div class="slide-scroll">
        <img class="slide-img" id="img-4" src="/api/media/file/mklc-be-04-katalog-materi.png" alt="Katalog Materi">
      </div>
      <div class="feature-pill">
        <div class="feature-title">📁 Manajemen Modul & Chunked Uploader</div>
        <div class="feature-desc">Pengunggahan paket SCORM berkas besar (hingga ratusan megabyte) dengan parsing manifest imsmanifest.xml otomatis.</div>
      </div>
    </div>

    <div class="slide" id="slide-5">
      <div class="slide-scroll">
        <img class="slide-img" id="img-5" src="/api/media/file/mklc-be-05-cmi-audit.png" alt="CMI Audit">
      </div>
      <div class="feature-pill">
        <div class="feature-title">🔍 Database Pelacakan CMI Audit Trail</div>
        <div class="feature-desc">Inspeksi langsung setiap variabel cmi.core.lesson_status, cmi.suspend_data, dan timestamp sesi pembelajaran.</div>
      </div>
    </div>
  </div>

  <script>
    window.setSlide = function(num) {
      document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
      const activeSlide = document.getElementById('slide-' + num);
      if (activeSlide) {
        activeSlide.classList.add('active');
        const img = document.getElementById('img-' + num);
        if (img) {
          img.style.transform = 'translateY(-120px)';
        }
      }
    };
  </script>
</body>
</html>
  `;

  const showcasePath = path.resolve('public/videos/temp/mklc-backend-showcase.html');
  fs.writeFileSync(showcasePath, showcaseHtml, 'utf8');

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

  console.log('Membuka simulasi showcase MKLC SCORM Backend...');
  await page.goto('http://localhost:3000/videos/temp/mklc-backend-showcase.html', {
    waitUntil: 'networkidle',
  });

  for (let s = 1; s <= 5; s++) {
    console.log(`Menampilkan Slide ${s} dari 5...`);
    await page.evaluate((num) => window.setSlide(num), s);
    await sleep(2500);
    await page.evaluate((num) => {
      const img = document.getElementById('img-' + num);
      if (img) img.style.transform = 'translateY(-160px)';
    }, s);
    await sleep(6500);
  }

  const video = page.video();
  await context.close();
  await browser.close();

  const originalPath = await video.path();
  const finalPath = path.resolve('public/videos/mklc-scorm-backend-demo.webm');

  if (fs.existsSync(finalPath)) {
    fs.unlinkSync(finalPath);
  }
  fs.renameSync(originalPath, finalPath);

  try {
    fs.unlinkSync(showcasePath);
  } catch {}

  const stats = fs.statSync(finalPath);
  console.log(`✓ Selesai merekam MKLC SCORM Backend! Disimpan ke: ${finalPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

recordMklcBackend().catch((err) => {
  console.error('Gagal merekam MKLC Backend:', err);
  process.exit(1);
});
