import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function recordMklcFrontend() {
  console.log('--- Memulai Perekaman Video: MKLC SCORM Simulator (Frontend) ---');
  const tempDir = path.resolve('public/videos/temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Siapkan file HTML penampil showcase interaktif
  const showcaseHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>MKLC SCORM Simulator Showcase</title>
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
    /* Browser Top Bar */
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
    .lock-icon { color: #10b981; }
    .badge-app {
      margin-left: auto;
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.3);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }
    /* Viewport Area */
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
    /* Feature Callout Floating Pill */
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
      max-width: 480px;
      z-index: 40;
    }
    .feature-title {
      font-size: 13px;
      font-weight: 700;
      color: #38bdf8;
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
      <span class="lock-icon">🔒</span>
      <span>https://mklc.mkri.id/scorm-player</span>
    </div>
    <div class="badge-app">Pusdik Mahkamah Konstitusi RI</div>
  </div>

  <div class="viewport">
    <!-- Slide 1: Katalog SCORM -->
    <div class="slide active" id="slide-1">
      <div class="slide-scroll">
        <img class="slide-img" id="img-1" src="/api/media/file/mklc-fe-01-daftar-materi.png" alt="Katalog Materi">
      </div>
      <div class="feature-pill">
        <div class="feature-title">📦 Katalog Materi SCORM 1.2 & SCORM 2004</div>
        <div class="feature-desc">Pelacakan paket materi pembelajaran digital interaktif berstandar internasional dengan pelacakan data CMI real-time.</div>
      </div>
    </div>

    <!-- Slide 2: RTE & Cross-Origin -->
    <div class="slide" id="slide-2">
      <div class="slide-scroll">
        <img class="slide-img" id="img-2" src="/api/media/file/mklc-fe-02-notes-rte.png" alt="SCORM Runtime Engine">
      </div>
      <div class="feature-pill">
        <div class="feature-title">⚡ Runtime Engine & Mitigasi CORS Sandboxing</div>
        <div class="feature-desc">Jembatan komunikasi aman window.API antar iframe materi dengan penyimpanan persistensi cloud.</div>
      </div>
    </div>

    <!-- Slide 3: Multi-page & Resume State -->
    <div class="slide" id="slide-3">
      <div class="slide-scroll">
        <img class="slide-img" id="img-3" src="/api/media/file/mklc-fe-03-multipage-resume.png" alt="Multi-Page Resume">
      </div>
      <div class="feature-pill">
        <div class="feature-title">🔄 Multi-Page SCO & Resume State Synchronizer</div>
        <div class="feature-desc">Menyimpan progres halaman terakhir secara otomatis agar peserta pelatihan dapat melanjutkan materi tanpa kehilangan progres.</div>
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

  const showcasePath = path.resolve('public/videos/temp/mklc-frontend-showcase.html');
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

  console.log('Membuka simulasi showcase MKLC SCORM Frontend...');
  await page.goto('http://localhost:3000/videos/temp/mklc-frontend-showcase.html', {
    waitUntil: 'networkidle',
  });

  // Slide 1 (14s)
  console.log('Slide 1: Katalog Materi SCORM...');
  await sleep(4000);
  await page.evaluate(() => {
    const img = document.getElementById('img-1');
    if (img) img.style.transform = 'translateY(-160px)';
  });
  await sleep(8000);

  // Slide 2 (14s)
  console.log('Slide 2: Runtime Engine & CORS...');
  await page.evaluate(() => window.setSlide(2));
  await sleep(4000);
  await page.evaluate(() => {
    const img = document.getElementById('img-2');
    if (img) img.style.transform = 'translateY(-180px)';
  });
  await sleep(8000);

  // Slide 3 (14s)
  console.log('Slide 3: Multi-Page Resume...');
  await page.evaluate(() => window.setSlide(3));
  await sleep(4000);
  await page.evaluate(() => {
    const img = document.getElementById('img-3');
    if (img) img.style.transform = 'translateY(-180px)';
  });
  await sleep(8000);

  // Finalisasi video
  const video = page.video();
  await context.close();
  await browser.close();

  const originalPath = await video.path();
  const finalPath = path.resolve('public/videos/mklc-scorm-frontend-demo.webm');

  if (fs.existsSync(finalPath)) {
    fs.unlinkSync(finalPath);
  }
  fs.renameSync(originalPath, finalPath);

  try {
    fs.unlinkSync(showcasePath);
  } catch {}

  const stats = fs.statSync(finalPath);
  console.log(`✓ Selesai merekam MKLC SCORM Frontend! Disimpan ke: ${finalPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

recordMklcFrontend().catch((err) => {
  console.error('Gagal merekam MKLC Frontend:', err);
  process.exit(1);
});
