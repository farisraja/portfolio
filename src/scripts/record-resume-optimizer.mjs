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

async function recordResumeOptimizer() {
  console.log('--- Memulai Perekaman Video: Resume Optimizer (ATS Beater) ---');
  const tempDir = path.resolve('public/videos/temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // 1. Unduh landing.html & index.html dari repo
  console.log('Mengambil file antarmuka dari repositori GitHub...');
  const landingRes = await fetch('https://raw.githubusercontent.com/farisraja/resume-optimizer/main/frontend/landing.html');
  const landingHtml = await landingRes.text();

  const appRes = await fetch('https://raw.githubusercontent.com/farisraja/resume-optimizer/main/frontend/index.html');
  const appHtml = await appRes.text();

  const tempLandingPath = path.resolve('public/videos/temp/landing.html');
  const tempAppPath = path.resolve('public/videos/temp/app.html');
  fs.writeFileSync(tempLandingPath, landingHtml, 'utf8');
  fs.writeFileSync(tempAppPath, appHtml, 'utf8');

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

  // A. Landing Page Walkthrough (25s)
  console.log('1. Membuka Landing Page ATS Beater...');
  await page.goto(`file://${tempLandingPath.replace(/\\/g, '/')}`, {
    waitUntil: 'networkidle',
  });

  await page.mouse.move(640, 320);
  await sleep(4000);

  console.log('2. Scroll menyorot fitur AI Resume Tailoring & Fitur ATS...');
  await smoothScroll(page, 700, 3500);
  await sleep(2500);

  await smoothScroll(page, 1400, 3500);
  await sleep(2500);

  await smoothScroll(page, 2100, 3500);
  await sleep(2500);

  // B. Buka Web App Generator (25s)
  console.log('3. Beralih ke Generator Antarmuka Aplikasi (app.html)...');
  await page.goto(`file://${tempAppPath.replace(/\\/g, '/')}`, {
    waitUntil: 'networkidle',
  });

  await sleep(3000);
  await page.mouse.move(500, 300);
  await sleep(1500);

  console.log('4. Menyorot kolom input job description & parameter resume...');
  await smoothScroll(page, 400, 2500);
  await sleep(2500);

  await smoothScroll(page, 800, 2500);
  await sleep(3000);

  await smoothScroll(page, 0, 3000);
  await sleep(2000);

  // Finalisasi video
  const video = page.video();
  await context.close();
  await browser.close();

  const originalPath = await video.path();
  const finalPath = path.resolve('public/videos/resume-optimizer-demo.webm');

  if (fs.existsSync(finalPath)) {
    fs.unlinkSync(finalPath);
  }
  fs.renameSync(originalPath, finalPath);

  // Bersihkan file sementara
  try {
    fs.unlinkSync(tempLandingPath);
    fs.unlinkSync(tempAppPath);
  } catch {}

  const stats = fs.statSync(finalPath);
  console.log(`✓ Selesai merekam Resume Optimizer! Disimpan ke: ${finalPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

recordResumeOptimizer().catch((err) => {
  console.error('Gagal merekam resume optimizer:', err);
  process.exit(1);
});
