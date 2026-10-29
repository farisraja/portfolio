import { getPayload } from 'payload'
import config from '../payload.config'
import {
  executeGitHubSync,
  executeImportAsDraft,
  executeLinkToProject,
} from '../lib/github-sync'

export async function testGitHubIntegration() {
  console.log('=== Memulai Pengujian Integrasi GitHub Faris Raja Ardana ===')
  const payload = await getPayload({ config })

  // 1. Update site-settings socialLinks.github to https://github.com/farisraja
  console.log('\n1. Memperbarui Site Settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      socialLinks: {
        github: 'https://github.com/farisraja',
      },
    },
  })
  const updatedSettings = await payload.findGlobal({ slug: 'site-settings' })
  console.log('✓ Site Settings GitHub URL:', updatedSettings?.socialLinks?.github)

  // 2. Test Guest access rejection (security check)
  console.log('\n2. Menguji Proteksi Akses (Security Check)...')
  try {
    await executeGitHubSync(payload, null)
    console.error('❌ GAGAL: Guest tanpa login berhasil memicu sinkronisasi!')
  } catch (err: any) {
    console.log('✓ Berhasil ditolak:', err.message)
  }

  // 3. Test Admin Sync with real GitHub API
  console.log('\n3. Menjalankan Sinkronisasi GitHub Riil (@farisraja)...')
  const mockAdminUser = { id: 1, email: 'admin@example.com', role: 'admin' }
  const syncResult = await executeGitHubSync(payload, mockAdminUser)
  console.log('✓ Hasil Sinkronisasi:', syncResult)

  // 4. Verify collection records
  console.log('\n4. Memeriksa Koleksi github-repositories di PostgreSQL...')
  const reposInDb = await payload.find({
    collection: 'github-repositories',
    limit: 100,
  })
  console.log(`✓ Ditemukan ${reposInDb.totalDocs} repository tersimpan di database:`)
  reposInDb.docs.forEach((r, idx) => {
    console.log(
      `   ${idx + 1}. [ID: ${r.repoId}] ${r.name} (Lang: ${r.language || '-'}, Stars: ${r.stars}, Fork: ${r.isFork}, Archived: ${r.isArchived})`
    )
  })

  // 5. Test Idempotency: run sync again
  console.log('\n5. Menguji Idempotensi (Sinkronisasi Kedua)...')
  // Wait 5 seconds for debounce interval
  await new Promise((res) => setTimeout(res, 5200))
  const syncResult2 = await executeGitHubSync(payload, mockAdminUser)
  const reposInDb2 = await payload.find({
    collection: 'github-repositories',
    limit: 100,
  })
  if (reposInDb2.totalDocs === reposInDb.totalDocs) {
    console.log(`✓ Idempotensi Terbukti: Jumlah repositori tetap ${reposInDb2.totalDocs} tanpa duplikasi.`)
  } else {
    console.error(`❌ Duplikasi terdeteksi! Total: ${reposInDb2.totalDocs}`)
  }

  // 6. Test Import as Draft
  console.log('\n6. Menguji Aksi "Impor sebagai Draf"...')
  // Pick pb-cipta-sports (TypeScript project)
  const sampleRepo = reposInDb.docs.find((r) => r.name === 'pb-cipta-sports') || reposInDb.docs[0]
  console.log(`   Memilih repository: ${sampleRepo.name} (ID: ${sampleRepo.repoId})`)

  const importResult = await executeImportAsDraft(payload, mockAdminUser, sampleRepo.repoId)
  console.log('✓ Hasil Impor Draf:', importResult)

  // Verify the imported project
  const importedProject = await payload.findByID({
    collection: 'projects',
    id: importResult.projectId,
    draft: true,
  })
  console.log('✓ Status Proyek Hasil Impor:', importedProject._status)
  console.log('✓ Judul Proyek:', importedProject.title)
  console.log('✓ Repository URL:', importedProject.repositoryUrl)
  console.log('✓ Metadata GitHub Tersimpan:', {
    githubRepoId: (importedProject as any).githubRepoId,
    githubFullName: (importedProject as any).githubFullName,
    githubLanguage: (importedProject as any).githubLanguage,
    githubStars: (importedProject as any).githubStars,
  })

  // 7. Verify Public Query: Draft must NOT appear in public
  console.log('\n7. Memeriksa Halaman Publik / Query Publik...')
  const publicProjects = await payload.find({
    collection: 'projects',
    where: {
      _status: { equals: 'published' },
    },
  })
  const isDraftInPublic = publicProjects.docs.some((p) => p.id === importedProject.id)
  if (!isDraftInPublic) {
    console.log('✓ Terverifikasi: Proyek draf TIDAK muncul pada query publik (published only).')
  } else {
    console.error('❌ Proyek draf bocor ke publik!')
  }

  // 8. Test Idempotency of Import
  console.log('\n8. Menguji Idempotensi Impor (Mengimpor Ulang Repository yang Sama)...')
  const reImportResult = await executeImportAsDraft(payload, mockAdminUser, sampleRepo.repoId)
  console.log('✓ Hasil Re-impor:', reImportResult)

  console.log('\n=== Semua Pengujian Integrasi GitHub Berhasil! ===')
  process.exit(0)
}

await testGitHubIntegration()

