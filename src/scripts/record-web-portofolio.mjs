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

async function recordWebPortofolio() {
  console.log('--- Memulai Perekaman Video: Web Portofolio (v1) ---');
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

  console.log('Navigasi ke https://web-portofolio-eight-rust.vercel.app ...');
  await page.goto('https://web-portofolio-eight-rust.vercel.app', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  // 1. Hero Showcase (5s)
  console.log('Menyorot Hero Section...');
  await page.mouse.move(640, 360);
  await sleep(4000);

  // 2. Smooth Scroll to About & Skills (8s)
  console.log('Scroll ke Bagian Profil & Skills...');
  await smoothScroll(page, 700, 4000);
  await page.mouse.move(500, 300);
  await sleep(1500);
  await page.mouse.move(700, 300);
  await sleep(1500);

  // 3. Smooth Scroll to Projects (10s)
  console.log('Scroll ke Bagian Proyek...');
  await smoothScroll(page, 1500, 4000);
  await page.mouse.move(400, 400);
  await sleep(2000);
  await page.mouse.move(800, 400);
  await sleep(2000);

  // 4. Smooth Scroll further down to Experience & Contact (8s)
  console.log('Scroll ke Bagian Pengalaman & Kontak...');
  await smoothScroll(page, 2400, 4000);
  await sleep(2500);

  // 5. Toggle Theme (Dark / Light) jika tersedia (5s)
  console.log('Mencoba toggle tema jika ada...');
  try {
    const themeButton = await page.$('button[aria-label*="theme"], button[aria-label*="mode"], .mode-toggle, button:has(svg)');
    if (themeButton) {
      await themeButton.hover();
      await sleep(1000);
      await themeButton.click();
      await sleep(2500);
      await themeButton.click();
      await sleep(1500);
    }
  } catch (e) {
    console.log('Theme toggle dilewati:', e.message);
  }

  // 6. Smooth Scroll kembali ke atas (Hero) (6s)
  console.log('Scroll kembali ke atas...');
  await smoothScroll(page, 0, 5000);
  await page.mouse.move(640, 200);
  await sleep(3000);

  // Finalisasi video
  const video = page.video();
  await context.close();
  await browser.close();

  const originalPath = await video.path();
  const finalPath = path.resolve('public/videos/web-portofolio-demo.webm');

  // Pindahkan ke file tujuan
  if (fs.existsSync(finalPath)) {
    fs.unlinkSync(finalPath);
  }
  fs.renameSync(originalPath, finalPath);

  const stats = fs.statSync(finalPath);
  console.log(`✓ Selesai merekam Web Portofolio! Disimpan ke: ${finalPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

recordWebPortofolio().catch((err) => {
  console.error('Gagal merekam:', err);
  process.exit(1);
});
