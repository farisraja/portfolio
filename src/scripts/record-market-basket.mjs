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

async function recordMarketBasket() {
  console.log('--- Memulai Perekaman Video: Analisis Keranjang Belanja 2026 ---');
  const tempDir = path.resolve('public/videos/temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const marketBasketHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Market Basket Analysis Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    * { font-family: 'Plus Jakarta Sans', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <!-- Top Navigation -->
  <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
    <div class="flex items-center gap-3">
      <div class="size-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-bold text-white shadow-md">
        🛒
      </div>
      <div>
        <h1 class="text-sm font-bold tracking-tight text-white flex items-center gap-2">
          <span>MARKET BASKET ANALYZER</span>
          <span class="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">v2.6 Stable</span>
        </h1>
        <p class="text-[11px] text-slate-400">Pola Asosiasi Transaksi & Rekomendasi Tata Letak Barang</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 mono">Algoritma: FP-Growth + Apriori</span>
      <button class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs px-3.5 py-1.5 rounded-lg transition-colors">
        + Impor Transaksi (CSV)
      </button>
    </div>
  </header>

  <main class="max-w-7xl mx-auto p-6 space-y-6">
    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl shadow-xs">
        <span class="text-xs text-slate-400 font-medium">Total Transaksi Dianalisis</span>
        <div class="text-2xl font-bold text-white mt-1 mono">48,250</div>
        <span class="text-[10px] text-emerald-400 font-medium">↑ 100% data tervalidasi</span>
      </div>
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl shadow-xs">
        <span class="text-xs text-slate-400 font-medium">Minimum Support Ambang</span>
        <div class="text-2xl font-bold text-amber-400 mt-1 mono">0.025 (2.5%)</div>
        <span class="text-[10px] text-slate-400">Aturan frekuensi kemunculan</span>
      </div>
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl shadow-xs">
        <span class="text-xs text-slate-400 font-medium">Minimum Confidence</span>
        <div class="text-2xl font-bold text-cyan-400 mt-1 mono">0.65 (65.0%)</div>
        <span class="text-[10px] text-slate-400">Tingkat kepastian asosiasi</span>
      </div>
      <div class="bg-slate-900/60 border border-slate-800 p-4 rounded-xl shadow-xs">
        <span class="text-xs text-slate-400 font-medium">Pola Kuat Ditemukan</span>
        <div class="text-2xl font-bold text-purple-400 mt-1 mono">34 Aturan</div>
        <span class="text-[10px] text-purple-300 font-medium">Lift Ratio &gt; 1.5</span>
      </div>
    </div>

    <!-- Association Rules Table -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
      <div class="px-5 py-4 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h2 class="text-sm font-bold text-white">Daftar Pola Aturan Asosiasi Unggulan (Association Rules)</h2>
          <p class="text-xs text-slate-400">Hubungan kombinasi produk yang dibeli bersamaan oleh konsumen</p>
        </div>
        <span class="text-xs text-slate-400 mono">Urut berdasarkan: Lift Ratio (Tertinggi)</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-800/50 text-slate-300 uppercase tracking-wider text-[10px] mono">
            <tr>
              <th class="p-3.5">Antecedent (Jika Membeli)</th>
              <th class="p-3.5"></th>
              <th class="p-3.5">Consequent (Maka Membeli)</th>
              <th class="p-3.5">Support</th>
              <th class="p-3.5">Confidence</th>
              <th class="p-3.5">Lift Ratio</th>
              <th class="p-3.5">Status Pola</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-slate-200">
            <tr class="hover:bg-slate-800/30 transition-colors">
              <td class="p-3.5 font-semibold text-amber-300">[ Roti Tawar Gandum, Selai Cokelat ]</td>
              <td class="p-3.5 text-slate-500 font-bold">➔</td>
              <td class="p-3.5 font-semibold text-emerald-300">[ Susu UHT Full Cream 1L ]</td>
              <td class="p-3.5 mono text-slate-400">0.054 (5.4%)</td>
              <td class="p-3.5 mono text-cyan-300 font-semibold">82.4%</td>
              <td class="p-3.5 mono text-purple-300 font-bold">2.84x</td>
              <td class="p-3.5"><span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Sangat Kuat</span></td>
            </tr>
            <tr class="hover:bg-slate-800/30 transition-colors">
              <td class="p-3.5 font-semibold text-amber-300">[ Kopi Bubuk Robusta, Gula Pasir 1kg ]</td>
              <td class="p-3.5 text-slate-500 font-bold">➔</td>
              <td class="p-3.5 font-semibold text-emerald-300">[ Biskuit Gandum Kaleng ]</td>
              <td class="p-3.5 mono text-slate-400">0.041 (4.1%)</td>
              <td class="p-3.5 mono text-cyan-300 font-semibold">78.1%</td>
              <td class="p-3.5 mono text-purple-300 font-bold">2.45x</td>
              <td class="p-3.5"><span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Sangat Kuat</span></td>
            </tr>
            <tr class="hover:bg-slate-800/30 transition-colors">
              <td class="p-3.5 font-semibold text-amber-300">[ Sabun Mandi Cair, Sampo Anti Ketombe ]</td>
              <td class="p-3.5 text-slate-500 font-bold">➔</td>
              <td class="p-3.5 font-semibold text-emerald-300">[ Pasta Gigi Herbal 190g ]</td>
              <td class="p-3.5 mono text-slate-400">0.038 (3.8%)</td>
              <td class="p-3.5 mono text-cyan-300 font-semibold">71.6%</td>
              <td class="p-3.5 mono text-purple-300 font-bold">2.18x</td>
              <td class="p-3.5"><span class="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Kuat</span></td>
            </tr>
            <tr class="hover:bg-slate-800/30 transition-colors">
              <td class="p-3.5 font-semibold text-amber-300">[ Mi Instan Goreng (Karton) ]</td>
              <td class="p-3.5 text-slate-500 font-bold">➔</td>
              <td class="p-3.5 font-semibold text-emerald-300">[ Minyak Goreng Sawit 2L ]</td>
              <td class="p-3.5 mono text-slate-400">0.062 (6.2%)</td>
              <td class="p-3.5 mono text-cyan-300 font-semibold">69.5%</td>
              <td class="p-3.5 mono text-purple-300 font-bold">1.95x</td>
              <td class="p-3.5"><span class="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-[10px] font-semibold">Kuat</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Rak Layout Recommendation Matrix -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-xl p-5 shadow-xs">
      <h2 class="text-sm font-bold text-white mb-1">Rekomendasi Penataan Tata Letak Rak (Shelf Placement Matrix)</h2>
      <p class="text-xs text-slate-400 mb-4">Saran konfigurasi tata letak barang dagangan untuk memaksimalkan cross-selling transaksi</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border border-slate-800 bg-slate-800/40 p-4 rounded-xl">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-amber-400">Rak A1 &amp; A2 (Zona Sarapan)</span>
            <span class="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">Prioritas 1</span>
          </div>
          <p class="text-xs text-slate-300 font-semibold mb-1">Dekatkan Rak Roti Tawar bersebelahan langsung dengan Susu UHT.</p>
          <p class="text-[11px] text-slate-400">Estimasi peningkatan penjualan impulsif: +18.4% berdasarkan data transaksi.</p>
        </div>

        <div class="border border-slate-800 bg-slate-800/40 p-4 rounded-xl">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-cyan-400">Rak B3 &amp; B4 (Zona Minuman &amp; Snack)</span>
            <span class="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">Prioritas 2</span>
          </div>
          <p class="text-xs text-slate-300 font-semibold mb-1">Tempatkan Biskuit Kaleng di ujung koridor rak Kopi &amp; Gula.</p>
          <p class="text-[11px] text-slate-400">Memanfaatkan momentum belanja akhir pekan dengan basket size lebih tinggi.</p>
        </div>

        <div class="border border-slate-800 bg-slate-800/40 p-4 rounded-xl">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-emerald-400">Rak C1 &amp; C2 (Zona Kebutuhan Harian)</span>
            <span class="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">Prioritas 3</span>
          </div>
          <p class="text-xs text-slate-300 font-semibold mb-1">Bundling promo Minyak Goreng dengan Mi Instan Goreng.</p>
          <p class="text-[11px] text-slate-400">Tingkat asosiasi 69.5% mempercepat perputaran persediaan barang.</p>
        </div>
      </div>
    </div>
  </main>
</body>
</html>
  `;

  const marketPath = path.resolve('public/videos/temp/market-basket-showcase.html');
  fs.writeFileSync(marketPath, marketBasketHtml, 'utf8');

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

  console.log('Membuka antarmuka Analisis Keranjang Belanja...');
  await page.goto('http://localhost:3000/videos/temp/market-basket-showcase.html', {
    waitUntil: 'networkidle',
  });

  // 1. Header & Metric Cards (10s)
  console.log('1. Menyorot Kartu Metrik (Support, Confidence, Lift Ratio)...');
  await page.mouse.move(640, 200);
  await sleep(4000);
  await page.mouse.move(250, 150);
  await sleep(2000);
  await page.mouse.move(850, 150);
  await sleep(2000);

  // 2. Scroll ke Tabel Aturan Asosiasi (15s)
  console.log('2. Scroll meneliti tabel pola aturan asosiasi...');
  await smoothScroll(page, 320, 3500);
  await sleep(2500);
  await page.mouse.move(400, 360);
  await sleep(2500);
  await page.mouse.move(700, 420);
  await sleep(2500);

  // 3. Scroll ke Rekomendasi Rak Toko (12s)
  console.log('3. Scroll menyorot rekomendasi penataan rak produk...');
  await smoothScroll(page, 650, 3500);
  await sleep(4000);

  // 4. Scroll kembali ke atas & penutup (8s)
  console.log('4. Scroll kembali ke header...');
  await smoothScroll(page, 0, 3000);
  await sleep(3000);

  // Finalisasi video
  const video = page.video();
  await context.close();
  await browser.close();

  const originalPath = await video.path();
  const finalPath = path.resolve('public/videos/analisis-keranjang-belanja-demo.webm');

  if (fs.existsSync(finalPath)) {
    fs.unlinkSync(finalPath);
  }
  fs.renameSync(originalPath, finalPath);

  try {
    fs.unlinkSync(marketPath);
  } catch {}

  const stats = fs.statSync(finalPath);
  console.log(`✓ Selesai merekam Analisis Keranjang Belanja! Disimpan ke: ${finalPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

recordMarketBasket().catch((err) => {
  console.error('Gagal merekam Analisis Keranjang Belanja:', err);
  process.exit(1);
});
