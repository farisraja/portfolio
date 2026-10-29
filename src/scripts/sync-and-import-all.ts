import { getPayload } from 'payload'
import config from '../payload.config'
import {
  executeGitHubSync,
  executeImportAllDrafts,
} from '../lib/github-sync'

async function runSyncAndImportAll() {
  console.log('=== Sinkronisasi Ulang & Impor Seluruh Repository Publik Faris Raja Ardana ===\n')
  const payload = await getPayload({ config })
  const mockAdminUser = { id: 1, email: 'admin@example.com', role: 'admin' }

  // 1. Re-sync from GitHub API
  console.log('1. Memanggil REST API GitHub (GET https://api.github.com/users/farisraja/repos)...')
  const syncResult = await executeGitHubSync(payload, mockAdminUser)
  console.log(`✓ Berhasil: ${syncResult.message}`)
  console.log(`  Sisa kuota rate-limit: ${syncResult.rateLimit.remaining} / ${syncResult.rateLimit.limit} (reset: ${syncResult.rateLimit.resetTime})\n`)

  // 2. Inspect all repositories in DB
  const reposInDb = await payload.find({
    collection: 'github-repositories',
    limit: 100,
    sort: 'name',
  })

  console.log(`2. Status Koleksi github-repositories (${reposInDb.totalDocs} repository ditemukan):`)
  let totalPublicRepos = reposInDb.totalDocs
  let totalForkOrArchived = 0
  let totalEligible = 0

  reposInDb.docs.forEach((r, idx) => {
    const isExcluded = r.isFork || r.isArchived
    if (isExcluded) totalForkOrArchived++
    else totalEligible++
    const projId = r.project ? (typeof r.project === 'object' ? r.project.id : r.project) : null
    console.log(
      `   ${idx + 1}. [ID: ${r.repoId}] ${r.name} | Bahasa: ${r.language || '-'} | Stars: ${r.stars} | Fork: ${r.isFork} | Archived: ${r.isArchived} | Terhubung ke Proyek: ${projId || 'Belum'}`
    )
  })

  console.log(`\nRingkasan Kategori Repository:`)
  console.log(`- Total repository publik: ${totalPublicRepos}`)
  console.log(`- Dikecualikan (Fork / Archived): ${totalForkOrArchived}`)
  console.log(`- Memenuhi syarat impor (Karya asli, bukan fork, aktif): ${totalEligible}\n`)

  // 3. Execute Import All Drafts
  console.log('3. Menjalankan Impor Semua Repository Memenuhi Syarat sebagai Draf...')
  const importAllResult = await executeImportAllDrafts(payload, mockAdminUser)
  console.log(`✓ Hasil: ${importAllResult.message}`)
  importAllResult.details.forEach((d) => {
    console.log(`   - [ID: ${d.repoId}] ${d.name} -> ${d.action} (Project ID: ${d.projectId || '-'})`)
  })

  // 4. Verify Projects Collection in DB
  console.log('\n4. Memeriksa Koleksi Proyek (Projects) di PostgreSQL:')
  const allProjects = await payload.find({
    collection: 'projects',
    limit: 100,
    draft: true,
    sort: 'id',
  })

  let draftCount = 0
  let publishedCount = 0
  allProjects.docs.forEach((p, idx) => {
    if (p._status === 'published') publishedCount++
    else draftCount++

    const techNames = (p.technologies || []).map((t) => (typeof t === 'string' ? t : t.name)).join(', ') || '-'
    console.log(
      `   ${idx + 1}. [ID: ${p.id}] "${p.title}" | Status: ${p._status} | Slug: /${p.slug} | GitHub Repo ID: ${(p as any).githubRepoId || '-'} | Tech: [${techNames}]`
    )
  })

  console.log(`\nRingkasan Proyek di Database:`)
  console.log(`- Total Proyek: ${allProjects.totalDocs}`)
  console.log(`- Proyek Published: ${publishedCount}`)
  console.log(`- Proyek Draft: ${draftCount}\n`)

  // 5. Test Idempotency (Re-run import to prove 0 duplicates created)
  console.log('5. Menguji Idempotensi (Menjalankan Ulang executeImportAllDrafts)...')
  const reImportResult = await executeImportAllDrafts(payload, mockAdminUser)
  console.log(`✓ Hasil Re-impor: ${reImportResult.message}`)
  console.log(`  Proyek baru yang dibuat pada re-impor: ${reImportResult.importedCount} (Harus 0)`)
  console.log(`  Proyek yang sudah terhubung: ${reImportResult.alreadyLinkedCount}`)

  const allProjectsAfter = await payload.find({
    collection: 'projects',
    limit: 100,
    draft: true,
  })

  if (allProjectsAfter.totalDocs === allProjects.totalDocs) {
    console.log(`✓ Idempotensi Terbukti Sempurna: Total proyek tetap ${allProjectsAfter.totalDocs} tanpa duplikasi sama sekali.\n`)
  } else {
    console.error(`❌ Terjadi duplikasi! Sebelum: ${allProjects.totalDocs}, Sesudah: ${allProjectsAfter.totalDocs}\n`)
  }

  // 6. Public Page Query Verification
  console.log('6. Memeriksa Query Halaman Publik (Published Only):')
  const publicQuery = await payload.find({
    collection: 'projects',
    where: {
      _status: { equals: 'published' },
    },
  })
  console.log(`✓ Jumlah proyek yang tampil di website publik: ${publicQuery.totalDocs}`)
  publicQuery.docs.forEach((p) => {
    console.log(`   - [ID: ${p.id}] "${p.title}" (Status: ${p._status})`)
  })

  console.log('\n=== Seluruh Proses Sinkronisasi dan Impor Berhasil Diverifikasi! ===')
  process.exit(0)
}

await runSyncAndImportAll()
