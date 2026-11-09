import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

interface NewCertDef {
  sourceFile: string
  cleanFilename: string
  title: string
  issuer: string
  category: 'khusus' | 'umum'
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  description: string
  skills: string[]
  existingDbId?: number
}

const CERT_DEFINITIONS: NewCertDef[] = [
  // 1. Existing ID 11 - Needs image
  {
    sourceFile: 'Sertifikat Analytics Vidhya - Guide to Vibe Coding in Windsurf.jpg',
    cleanFilename: 'sertifikat-analytics-vidhya-guide-to-vibe-coding-in-windsurf.jpg',
    title: 'Guide to Vibe Coding in Windsurf',
    issuer: 'Analytics Vidhya',
    category: 'khusus',
    issueDate: '17 Juni 2026',
    credentialId: 'cty4nxmgii',
    credentialUrl: '',
    description: 'Sertifikasi keahlian pengembangan perangkat lunak berbasis AI-assisted programming (Vibe Coding) menggunakan Windsurf IDE.',
    skills: ['AI-Assisted Development', 'Windsurf IDE', 'Prompt Engineering', 'Full Stack Development'],
    existingDbId: 11,
  },
  // 2. Data Analysis with Apache Hive
  {
    sourceFile: 'Sertifikat Analytics Vidhya - Data Analysis with Apache Hive.jpg',
    cleanFilename: 'sertifikat-analytics-vidhya-data-analysis-with-apache-hive.jpg',
    title: 'Data Analysis with Apache Hive',
    issuer: 'Analytics Vidhya',
    category: 'khusus',
    issueDate: '17 Juni 2026',
    credentialId: 'a2ygol6rie',
    credentialUrl: '',
    description: 'Penyelesaian kursus analisis data berskala besar menggunakan Apache Hive dan kueri SQL terstruktur dalam ekosistem big data Hadoop.',
    skills: ['Apache Hive', 'Big Data', 'SQL', 'Data Analysis', 'Hadoop'],
  },
  // 3. TOEFL Prediction Test
  {
    sourceFile: 'Sertifikat Central Course - TOEFL Prediction Test.jpg',
    cleanFilename: 'sertifikat-central-course-toefl-prediction-test.jpg',
    title: 'TOEFL Prediction Test (Skor: 500)',
    issuer: 'Central Course Kampung Inggris Pare',
    category: 'umum',
    issueDate: '21 Des 2025',
    expiryDate: '21 Des 2027',
    credentialId: '2512186187',
    credentialUrl: '',
    description: 'Sertifikasi tes prediksi kemampuan bahasa Inggris TOEFL dengan perolehan skor total 500 (Listening: 50, Structure & Written Expression: 53, Reading: 47).',
    skills: ['English Proficiency', 'TOEFL', 'Communication'],
  },
  // 4. Blend of IoT and Big Data
  {
    sourceFile: 'Sertifikat Comstrac-DSC Unpak - Blend of IoT and Big Data.jpg',
    cleanFilename: 'sertifikat-comstrac-dsc-unpak-blend-of-iot-and-big-data.jpg',
    title: 'Webinar Series: Blend of IoT and Big Data (A Post-Pandemic Business Adaptation)',
    issuer: 'Comstrac-DSC FMIPA Universitas Pakuan & UTHM',
    category: 'khusus',
    issueDate: '10 Des 2020',
    credentialId: '0353/WS.02/COMSTRAC-DSC/FMIPA-UP/XII/2020',
    credentialUrl: '',
    description: 'Webinar internasional mengenai integrasi arsitektur Internet of Things (IoT) dan pemrosesan Big Data untuk transformasi bisnis digital.',
    skills: ['Internet of Things (IoT)', 'Big Data', 'Cloud Architecture'],
  },
  // 5. Virtual Reality For Future
  {
    sourceFile: 'Sertifikat Comstrac-DSC Unpak - Virtual Reality For Future.jpg',
    cleanFilename: 'sertifikat-comstrac-dsc-unpak-virtual-reality-for-future.jpg',
    title: 'Webinar Information Technology: Virtual Reality For Future',
    issuer: 'Comstrac-DSC FMIPA Universitas Pakuan',
    category: 'khusus',
    issueDate: '13 Nov 2021',
    credentialId: '621/WB/COMSTRAC-DSC/FMIPA-UP/XI/2021',
    credentialUrl: '',
    description: 'Webinar teknologi informasi mengenai tren perkembangan Virtual Reality (VR), interaksi spasial, dan perancangan lingkungan 3D imersif.',
    skills: ['Virtual Reality (VR)', 'Computer Graphics', 'Human-Computer Interaction'],
  },
  // 6. Financial Literacy and Job Readiness
  {
    sourceFile: 'Sertifikat DBS Foundation - Financial Literacy and Job Readiness.jpg',
    cleanFilename: 'sertifikat-dbs-foundation-financial-literacy-and-job-readiness.jpg',
    title: 'Financial Literacy and Job Readiness (You RISE Programme)',
    issuer: 'DBS Foundation & Yayasan Plan International Indonesia',
    category: 'umum',
    issueDate: '17 Juni 2026',
    credentialId: '',
    credentialUrl: '',
    description: 'Pelatihan kesiapan kerja profesional, perencanaan finansial, dan pengembangan karir dalam modul Youth be Ready, Inclusive, Skilled, and Empowered (You RISE).',
    skills: ['Job Readiness', 'Financial Literacy', 'Career Planning'],
  },
  // 7. Edsen Hackathon Competition
  {
    sourceFile: 'Sertifikat Edsen - Hackathon Competition.jpg',
    cleanFilename: 'sertifikat-edsen-hackathon-competition.jpg',
    title: 'Edsen Hackathon Competition',
    issuer: 'PT Edsen Gudang Komputerindo',
    category: 'khusus',
    issueDate: 'Des 2022',
    credentialId: '013/CERT/EDSEN/HACKATHON/12/2022',
    credentialUrl: '',
    description: 'Partisipasi kompetisi hackathon pengembangan solusi perangkat lunak dan arsitektur data terintegrasi.',
    skills: ['Hackathon', 'Problem Solving', 'Rapid Prototyping', 'Teamwork'],
  },
  // 8. Next Generation Cisco IPv6
  {
    sourceFile: 'Sertifikat HTP - Next Generation Cisco IPv6.jpg',
    cleanFilename: 'sertifikat-htp-next-generation-cisco-ipv6.jpg',
    title: 'Next Generation Cisco IPv6 Training',
    issuer: 'Hendevane Training Partner (HTP)',
    category: 'khusus',
    issueDate: '27 Juni 2026',
    credentialId: 'HTP202610266907',
    credentialUrl: 'http://www.htp.co.id',
    description: 'Pelatihan teknis konfigurasi routing, transisi pengalamatan IPv6, dan arsitektur jaringan berbasis infrastruktur Cisco.',
    skills: ['Cisco', 'IPv6', 'Computer Networking', 'Routing & Switching'],
  },
  // 9. Tips on Building a Startup
  {
    sourceFile: 'Sertifikat IEEE Unpak - Tips on Building a Startup.jpg',
    cleanFilename: 'sertifikat-ieee-unpak-tips-on-building-a-startup.jpg',
    title: "IEEE Sharing Session: Let's Find Out about Tips on Building a Startup",
    issuer: 'IEEE Student Branch Universitas Pakuan & FMIPA Unpak',
    category: 'umum',
    issueDate: '03 Okt 2021',
    credentialId: '',
    credentialUrl: '',
    description: 'Sesi berbagi wawasan mengenai validasi ide produk teknologi, tahap awal pembentukan startup digital, dan strategi pengembangan produk.',
    skills: ['Startup Development', 'Product Management', 'Entrepreneurship'],
  },
  // 10. Webinar TIK Menjadi Web Developer Kompeten
  {
    sourceFile: 'Sertifikat Maestro Academy - Webinar TIK Menjadi Web Developer Kompeten.jpg',
    cleanFilename: 'sertifikat-maestro-academy-webinar-tik-menjadi-web-developer-kompeten.jpg',
    title: 'Webinar TIK: Menjadi Web Developer Kompeten',
    issuer: 'Maestro Academy, RTIK Kota Bandar Lampung & PT Winosa Mitra Bharatadjaya',
    category: 'khusus',
    issueDate: '20 Sep 2025',
    credentialId: '5586-3978-3422-2208',
    credentialUrl: '',
    description: 'Webinar standar kompetensi industri rekayasa web, arsitektur frontend dan backend modern, serta best practice pengembangan web profesional.',
    skills: ['Web Development', 'Frontend', 'Backend', 'Software Engineering'],
  },
  // 11. Microsoft Office Desktop Training
  {
    sourceFile: 'Sertifikat Microsoft Learning Partner - Microsoft Office Desktop Training.jpg',
    cleanFilename: 'sertifikat-microsoft-learning-partner-microsoft-office-desktop-training.jpg',
    title: 'Microsoft Office Desktop Training',
    issuer: 'Trust Training Partners (Microsoft Learning Partner) & Universitas Pakuan',
    category: 'umum',
    issueDate: '28 Okt 2023',
    credentialId: '23BGD0018',
    credentialUrl: '',
    description: 'Pelatihan terakreditasi standar profesional pemanfaatan aplikasi Microsoft Office untuk produktivitas dokumen, pengolahan spreadsheet data, dan presentasi.',
    skills: ['Microsoft Office', 'Microsoft Excel', 'Productivity', 'Data Processing'],
  },
  // 12. Creative Developer with Society 5.0
  {
    sourceFile: 'Sertifikat Unpak - Creative Developer with Society 5.0.jpg',
    cleanFilename: 'sertifikat-unpak-creative-developer-with-society-5-0.jpg',
    title: 'Computer Science Webinar Series: Creative Developer with Society 5.0',
    issuer: 'Program Studi Ilmu Komputer FMIPA Universitas Pakuan',
    category: 'khusus',
    issueDate: '16 Des 2020',
    credentialId: '175/Webinar1/ILKOM/FMIPA-UP/XII/2020',
    credentialUrl: '',
    description: 'Webinar seri ilmu komputer mengenai peran dan kompetensi kreatif developer perangkat lunak di era keterhubungan Society 5.0.',
    skills: ['Creative Development', 'Computer Science', 'Society 5.0'],
  },
  // 13. Orientasi Bidang Studi (OBS) Ilmu Komputer
  {
    sourceFile: 'Sertifikat Unpak - Orientasi Bidang Studi (OBS) Ilmu Komputer.jpg',
    cleanFilename: 'sertifikat-unpak-orientasi-bidang-studi-obs-ilmu-komputer.jpg',
    title: 'Orientasi Bidang Studi (OBS) Ilmu Komputer',
    issuer: 'Program Studi Ilmu Komputer FMIPA Universitas Pakuan',
    category: 'umum',
    issueDate: '15 Des 2021',
    credentialId: '046/OBS/ILKOM/FMIPA-UP/XII/2021',
    credentialUrl: '',
    description: 'Program orientasi akademik pengenalan fondasi disiplin ilmu komputer, kurikulum komputasi, dan etika profesional rekayasa software.',
    skills: ['Computer Science Foundations', 'Academic Orientation', 'Ethics'],
  },
]

async function uploadOrFindMedia(payload: any, filePath: string, cleanFilename: string, alt: string) {
  if (!fs.existsSync(filePath)) {
    console.error(`File tidak ditemukan: ${filePath}`)
    return null
  }

  // 1. Cek apakah media dengan filename ini sudah ada di Payload
  const existing = await payload.find({
    collection: 'media',
    where: {
      or: [
        { filename: { equals: cleanFilename } },
        { filename: { equals: path.basename(filePath) } },
      ],
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`  ℹ Media sudah ada di DB: ${existing.docs[0].filename} (ID: ${existing.docs[0].id})`)
    return existing.docs[0]
  }

  // 2. Upload file ke Media collection
  const fileStats = fs.statSync(filePath)
  const fileBuffer = fs.readFileSync(filePath)

  const doc = await payload.create({
    collection: 'media',
    data: {
      alt,
      caption: alt,
    },
    file: {
      data: fileBuffer,
      mimetype: 'image/jpeg',
      name: cleanFilename,
      size: fileStats.size,
    },
  })

  console.log(`  ✓ Berhasil upload media: ${cleanFilename} (ID: ${doc.id}) -> ${doc.url}`)
  return doc
}

async function main() {
  console.log('=== PROSES UPLOAD SERTIFIKAT GDRIVE KE PAYLOAD CMS ===\n')
  const payload = await getPayload({ config })
  const gdriveDir = path.resolve(process.cwd(), 'scratch_gdrive')

  // Hitung jumlah sertifikat saat ini di DB untuk menentukan sortOrder
  const existingCerts = await payload.find({
    collection: 'certificates',
    limit: 100,
  })
  console.log(`Jumlah sertifikat saat ini di database: ${existingCerts.totalDocs}\n`)

  let processedCount = 0
  let createdCount = 0
  let updatedCount = 0

  for (let i = 0; i < CERT_DEFINITIONS.length; i++) {
    const def = CERT_DEFINITIONS[i]
    console.log(`\n[${i + 1}/${CERT_DEFINITIONS.length}] Memproses: "${def.title}"`)

    const sourcePath = path.join(gdriveDir, def.sourceFile)
    const altText = `Sertifikat ${def.title} - ${def.issuer}`

    // 1. Upload atau cari media
    const mediaDoc = await uploadOrFindMedia(payload, sourcePath, def.cleanFilename, altText)
    if (!mediaDoc) {
      console.warn(`  ⚠ Gagal mengunggah media untuk ${def.title}`)
      continue
    }

    // 2. Cek apakah sertifikat sudah ada di DB
    let targetCert = null

    if (def.existingDbId) {
      try {
        targetCert = await payload.findByID({
          collection: 'certificates',
          id: def.existingDbId,
        })
      } catch (e) {
        targetCert = null
      }
    }

    if (!targetCert) {
      const searchRes = await payload.find({
        collection: 'certificates',
        where: {
          or: [
            ...(def.credentialId ? [{ credentialId: { equals: def.credentialId } }] : []),
            { title: { equals: def.title } },
          ],
        },
        limit: 1,
      })
      if (searchRes.docs.length > 0) {
        targetCert = searchRes.docs[0]
      }
    }

    const certPayloadData = {
      title: def.title,
      issuer: def.issuer,
      category: def.category,
      issueDate: def.issueDate,
      expiryDate: def.expiryDate || '',
      credentialId: def.credentialId || '',
      credentialUrl: def.credentialUrl || '',
      description: def.description,
      skills: def.skills.map((s) => ({ name: s })),
      image: mediaDoc.id,
      imageUrl: mediaDoc.url,
      published: true,
      sortOrder: targetCert ? (targetCert.sortOrder || i + 1) : (existingCerts.totalDocs + createdCount + 1),
    }

    if (targetCert) {
      // Update record yang sudah ada
      await payload.update({
        collection: 'certificates',
        id: targetCert.id,
        data: certPayloadData,
      })
      console.log(`  ✓ [UPDATED] Sertifikat ID ${targetCert.id} diperbarui dengan gambar: ${mediaDoc.url}`)
      updatedCount++
    } else {
      // Create record baru
      const newCert = await payload.create({
        collection: 'certificates',
        data: certPayloadData,
      })
      console.log(`  ✓ [CREATED] Sertifikat baru dibuat ID ${newCert.id} dengan gambar: ${mediaDoc.url}`)
      createdCount++
    }

    processedCount++
  }

  console.log(`\n=== SELESAI ===`)
  console.log(`Total diproses : ${processedCount}`)
  console.log(`Baru dibuat    : ${createdCount}`)
  console.log(`Diperbarui     : ${updatedCount}`)

  process.exit(0)
}

await main()
