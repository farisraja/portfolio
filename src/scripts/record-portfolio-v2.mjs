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

async function recordPortfolioV2() {
  console.log('--- Memulai Perekaman Video: Portofolio Utama (v2) ---');
  const tempDir = path.resolve('public/videos/temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

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

  console.log('Navigasi ke http://localhost:3000 ...');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  // 1. Hero Showcase (6s)
  console.log('1. Menyorot Hero Marquee & Branding...');
  await page.mouse.move(640, 360);
  await sleep(5000);

  // 2. Scroll to Projects Section (Work Gallery) (8s)
  console.log('2. Scroll ke Work Gallery (Proyek)...');
  await smoothScroll(page, 950, 4000);
  await sleep(2000);
  await page.mouse.move(500, 380);
  await sleep(1500);
  await page.mouse.move(850, 380);
  await sleep(1500);

  // 3. Scroll to Certificates Section (8s)
  console.log('3. Scroll ke Sertifikasi...');
  await smoothScroll(page, 2000, 4000);
  await sleep(2500);

  // 4. Scroll to Experience & Education (6s)
  console.log('4. Scroll ke Pengalaman & Pendidikan...');
  await smoothScroll(page, 3000, 4000);
  await sleep(2500);

  // 5. Toggle Theme (Dark <-> Light) (5s)
  console.log('5. Menguji peralihan tema...');
  try {
    const themeBtn = await page.$('button[aria-label*="Tema"], button[aria-label*="theme"], button:has(.lucide-sun), button:has(.lucide-moon)');
    if (themeBtn) {
      await themeBtn.hover();
      await sleep(1000);
      await themeBtn.click();
      await sleep(2500);
      await themeBtn.click();
      await sleep(1500);
    }
  } catch (e) {
    console.log('Theme toggle dilewati:', e.message);
  }

  // 6. Navigate to Project Detail (pb-cipta-sports) to show deep case study (10s)
  console.log('6. Membuka detail proyek pb-cipta-sports...');
  await page.goto('http://localhost:3000/projects/pb-cipta-sports', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });
  await sleep(3000);
  await smoothScroll(page, 600, 3000);
  await sleep(3000);

  // 7. Kembali ke Home & Penutup (6s)
  console.log('7. Kembali ke beranda...');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });
  await smoothScroll(page, 0, 1000);
  await sleep(3000);

  // Finalisasi video
  const video = page.video();
  await context.close();
  await browser.close();

  const originalPath = await video.path();
  const finalPath = path.resolve('public/videos/portfolio-demo.webm');

  if (fs.existsSync(finalPath)) {
    fs.unlinkSync(finalPath);
  }
  fs.renameSync(originalPath, finalPath);

  const stats = fs.statSync(finalPath);
  console.log(`✓ Selesai merekam Portofolio Utama! Disimpan ke: ${finalPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

recordPortfolioV2().catch((err) => {
  console.error('Gagal merekam portofolio v2:', err);
  process.exit(1);
});
