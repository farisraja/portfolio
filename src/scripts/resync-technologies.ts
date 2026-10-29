import { getPayload } from 'payload'
import config from '../payload.config'
import { executeGitHubSync } from '../lib/github-sync'

async function run() {
  console.log('=== MEMULAI SINKRONISASI ULANG TEKNOLOGI GITHUB KE PAYLOAD CMS ===\n')
  const payload = await getPayload({ config })

  // 1. Jalankan executeGitHubSync dengan akun admin virtual
  const adminUser = { id: 1, email: 'admin@portfolio.local', role: 'admin' }
  const syncResult = await executeGitHubSync(payload, adminUser)
  console.log('Hasil Sinkronisasi GitHub:', syncResult.message)

  // 2. Periksa seluruh proyek dalam database
  const projectsRes = await payload.find({
    collection: 'projects',
    limit: 100,
    draft: true,
    sort: 'sortOrder',
  })

  console.log(`\nTotal proyek dalam database: ${projectsRes.totalDocs}\n`)

  for (const proj of projectsRes.docs) {
    const isConnected = Boolean((proj as any).githubRepoId)
    const githubFullName = (proj as any).githubFullName
    const availability = (proj as any).githubAvailability
    const techMode = (proj as any).techMode
    const techs = (proj.technologies || []).map((t: any) => (typeof t === 'string' ? t : t.name))
    const detected = (proj as any).detectedTechnologies || []
    const languages = (proj as any).githubLanguages || []

    console.log('----------------------------------------------------')
    console.log(`Judul: ${proj.title} (slug: ${proj.slug})`)
    console.log(`Status: ${(proj as any)._status} | GitHub: ${githubFullName || 'Bukan GitHub'} (${availability || 'N/A'})`)
    console.log(`Mode Teknologi: ${techMode}`)
    console.log(`Teknologi Aktif Saat Ini (${techs.length}):`, techs.join(', '))
    if (detected.length > 0) {
      console.log(`Teknologi Terdeteksi (${detected.length}):`, detected.map((d: any) => `${d.name} [${d.evidence}]`).join(' | '))
    }
    if (languages.length > 0) {
      console.log(`Bahasa GitHub (${languages.length}):`, languages.map((l: any) => `${l.language}: ${l.bytes} B (${l.percentage}%)`).join(', '))
    }
  }

  console.log('\n=== SINKRONISASI SELESAI ===')
  process.exit(0)
}

await run()

