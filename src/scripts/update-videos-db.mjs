import fs from 'fs';
import path from 'path';

const envContent = fs.readFileSync('.env.local', 'utf8');
let dbUrl = '';
envContent.split('\n').forEach(line => {
  if (line.trim().startsWith('DATABASE_URL=')) {
    dbUrl = line.trim().slice('DATABASE_URL='.length);
  }
});

const VIDEO_MAPPINGS = {
  'portfolio': '/videos/portfolio-demo.webm',
  'web-portofolio': '/videos/web-portofolio-demo.webm',
  'resume-optimizer': '/videos/resume-optimizer-demo.webm',
  'mklc-scorm-frontend': '/videos/mklc-scorm-frontend-demo.webm',
  'mklc-scorm-backend': '/videos/mklc-scorm-backend-demo.webm',
  'digital-library-unpak': '/videos/digital-library-unpak-demo.webm',
  'analisis_keranjang_belanja_2026': '/videos/analisis-keranjang-belanja-demo.webm',
  'pb-cipta-sports': '/videos/pb-cipta-demo.mp4',
};

async function main() {
  console.log('Menghubungkan ke PostgreSQL...');
  const { default: pg } = await import('../../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js');
  const client = new pg.Client({ connectionString: dbUrl });
  await client.connect();
  console.log('✓ Terhubung ke Neon Cloud PostgreSQL');

  const check = await client.query('SELECT id, title, slug, video FROM projects');
  console.log('Daftar proyek saat ini:');
  for (const row of check.rows) {
    console.log(`- ID: ${row.id} | Slug: ${row.slug} | Video: ${row.video || '(kosong)'}`);
  }

  console.log('\nMemperbarui URL video...');
  for (const [slug, videoUrl] of Object.entries(VIDEO_MAPPINGS)) {
    const res = await client.query(
      'UPDATE projects SET video = $1, updated_at = NOW() WHERE slug = $2 RETURNING id, title, slug, video',
      [videoUrl, slug]
    );
    if (res.rowCount > 0) {
      console.log(`✓ [${res.rows[0].title}] -> ${res.rows[0].video}`);
    } else {
      console.log(`- Tidak ditemukan baris untuk slug: ${slug}`);
    }
  }

  // Sinkronkan tabel versi (_projects_v)
  const hasVersionTable = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_name = '_projects_v'"
  );
  if (hasVersionTable.rows.length > 0) {
    console.log('\nMenyinkronkan tabel versi (_projects_v)...');
    for (const [slug, videoUrl] of Object.entries(VIDEO_MAPPINGS)) {
      await client.query(
        'UPDATE _projects_v SET version_video = $1, updated_at = NOW() WHERE version_slug = $2',
        [videoUrl, slug]
      );
    }
    console.log('✓ Tabel versi tersinkronisasi');
  }

  await client.end();
  console.log('\n=== SEMUA VIDEO BERHASIL DIPERBARUI DI DATABASE ===');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
