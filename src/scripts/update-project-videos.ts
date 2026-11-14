import fs from 'fs'
import path from 'path'

try {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const idx = trimmed.indexOf('=')
        const key = trimmed.slice(0, idx).trim()
        const val = trimmed.slice(idx + 1).trim()
        process.env[key] = val
      }
    })
  }
} catch (e) {}

import { getPayload } from 'payload'
import config from '../payload.config'

const VIDEO_MAPPINGS: Record<string, string> = {
  'portfolio': '/videos/portfolio-demo.webm',
  'web-portofolio': '/videos/web-portofolio-demo.webm',
  'resume-optimizer': '/videos/resume-optimizer-demo.webm',
  'mklc-scorm-frontend': '/videos/mklc-scorm-frontend-demo.webm',
  'mklc-scorm-backend': '/videos/mklc-scorm-backend-demo.webm',
  'digital-library-unpak': '/videos/digital-library-unpak-demo.webm',
  'analisis_keranjang_belanja_2026': '/videos/analisis-keranjang-belanja-demo.webm',
  'pb-cipta-sports': '/videos/pb-cipta-demo.mp4',
}

async function updateProjectVideos() {
  console.log('=== MEMPERBARUI URL VIDEO PADA BASIS DATA PROYEK ===\n')
  const payload = await getPayload({ config })

  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
    depth: 0,
  })

  console.log(`Ditemukan ${projects.docs.length} proyek dalam database.\n`)

  for (const p of projects.docs) {
    const videoUrl = VIDEO_MAPPINGS[p.slug]
    if (videoUrl) {
      console.log(`Mengaitkan proyek [${p.title}] (${p.slug}) -> video: ${videoUrl}`)
      await payload.update({
        collection: 'projects',
        id: p.id,
        data: {
          video: videoUrl,
        },
      })
      console.log(`✓ Berhasil memperbarui [${p.title}]`)
    } else {
      console.log(`- Proyek [${p.title}] (${p.slug}) tidak memiliki pemetaan video khusus.`)
    }
  }

  console.log('\n=== SEMUA VIDEO BERHASIL DIPERBARUI DI PAYLOAD CMS ===')
  process.exit(0)
}

updateProjectVideos().catch((err) => {
  console.error('Terjadi kesalahan:', err)
  process.exit(1)
})
