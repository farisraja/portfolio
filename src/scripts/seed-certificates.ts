import { getPayload } from 'payload'
import config from '../payload.config'
import { DATA } from '../data/resume'

async function seedCertificates() {
  console.log('=== SEEDING CERTIFICATES TO PAYLOAD CMS ===\n')
  const payload = await getPayload({ config })

  const certsToSeed = (DATA as any).certificates || []
  console.log(`Ditemukan ${certsToSeed.length} sertifikat untuk diinisialisasi.\n`)

  let createdCount = 0
  let updatedCount = 0

  for (let i = 0; i < certsToSeed.length; i++) {
    const cert = certsToSeed[i]

    // Check by credentialId or title
    const existing = await payload.find({
      collection: 'certificates',
      where: {
        or: [
          ...(cert.credentialId ? [{ credentialId: { equals: cert.credentialId } }] : []),
          { title: { equals: cert.title } },
        ],
      },
      limit: 1,
    })

    const certData = {
      title: cert.title,
      issuer: cert.issuer,
      category: cert.category,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate || '',
      credentialId: cert.credentialId || '',
      credentialUrl: cert.credentialUrl || '',
      description: cert.description || '',
      skills: (cert.skills || []).map((s: string) => ({ name: s })),
      imageUrl: cert.image || '',
      published: true,
      sortOrder: i + 1,
    }

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'certificates',
        data: certData,
      })
      createdCount++
      console.log(`✓ [Created] [${cert.category.toUpperCase()}] "${cert.title}" - ${cert.issuer}`)
    } else {
      await payload.update({
        collection: 'certificates',
        id: existing.docs[0].id,
        data: certData,
      })
      updatedCount++
      console.log(`✓ [Updated] [${cert.category.toUpperCase()}] "${cert.title}" - ${cert.issuer}`)
    }
  }

  console.log(`\n=== SEED SELESAI: ${createdCount} dibuat, ${updatedCount} diperbarui ===`)
  process.exit(0)
}

await seedCertificates()

