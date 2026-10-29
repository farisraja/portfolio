import { getPayload } from 'payload'
import config from '../payload.config'

export async function runPersonalize() {
  console.log('--- Memperbarui Data Portofolio ke Biodata Faris Raja Ardana ---')
  const payload = await getPayload({ config })

  // 1. Update Global: site-settings
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      name: 'Faris Raja Ardana — Web & Software Developer',
      ownerName: 'Faris Raja Ardana',
      title: 'Web & Software Developer',
      description:
        'Portofolio Faris Raja Ardana, Web & Software Developer lulusan Ilmu Komputer Universitas Pakuan dengan fokus pada pengembangan web dan aplikasi.',
      url: 'http://localhost:3001',
      email: '',
      tel: '',
      whatsapp: '',
      whatsappMessage: 'Halo Faris, saya tertarik dengan portofolio Anda.',
      socialLinks: {
        github: '',
        linkedin: '',
        x: '',
        youtube: '',
      },
    },
  })
  console.log('✓ Global site-settings diperbarui.')

  // 2. Update Global: profile
  await payload.updateGlobal({
    slug: 'profile',
    data: {
      name: 'Faris Raja Ardana',
      initials: 'FA',
      headline: 'Web & Software Developer',
      description:
        'Saya mengembangkan website dan aplikasi dengan perhatian pada kegunaan, tampilan, dan kebutuhan pengguna.',
      summary:
        'Saya lulusan Ilmu Komputer Universitas Pakuan yang berfokus pada pengembangan web dan aplikasi. Saya senang menerjemahkan kebutuhan pengguna menjadi fitur yang terstruktur, mudah digunakan, dan dapat dikembangkan lebih lanjut.\n\nSaat ini saya menjalani magang di PUSDIK MK dan terlibat dalam pengembangan platform pembelajaran MKLC. Kontribusi saya mencakup pengembangan fitur, perapihan antarmuka, serta pengujian fungsional untuk menemukan bagian yang perlu diperbaiki.',
      location: '',
      locationLink: '',
      avatarUrl: '',
      cvUrl: '',
    },
  })
  console.log('✓ Global profile diperbarui.')

  // 3. Update experiences
  const existingExp = await payload.find({ collection: 'experiences', limit: 100 })
  for (const exp of existingExp.docs) {
    await payload.delete({ collection: 'experiences', id: exp.id })
  }

  const farisExperiences = [
    {
      company: 'PUSDIK MK',
      title: 'Pengembangan Web — Magang',
      start: 'September 2026',
      end: 'Sekarang',
      isCurrent: true,
      description:
        '• Terlibat dalam pengembangan fitur platform pembelajaran MKLC.\n• Membantu perapihan antarmuka dan pengalaman pengguna.\n• Melakukan pengujian fungsional serta mendokumentasikan temuan perbaikan.',
      published: true,
      sortOrder: 0,
    },
    {
      company: 'FMIPA Universitas Pakuan',
      title: 'Administrasi Perpustakaan — PKL',
      start: '',
      end: '',
      isCurrent: false,
      description:
        '• Melakukan pendataan buku dan administrasi perpustakaan.\n• Membantu pengelolaan arsip berbasis web.\n• Mendukung administrasi dan penyusunan laporan.',
      published: true,
      sortOrder: 1,
    },
    {
      company: 'Surveyor Freelance',
      title: 'Surveyor Freelance',
      start: 'April 2026',
      end: 'Agustus 2026',
      location: 'Jakarta',
      isCurrent: false,
      description:
        'Melaksanakan survei lapangan di wilayah Jakarta sesuai kebutuhan pengumpulan data.',
      published: true,
      sortOrder: 2,
    },
  ]

  for (const exp of farisExperiences) {
    await payload.create({ collection: 'experiences', data: exp })
  }
  console.log('✓ Koleksi experiences diperbarui.')

  // 4. Update education
  const existingEdu = await payload.find({ collection: 'education', limit: 100 })
  for (const edu of existingEdu.docs) {
    await payload.delete({ collection: 'education', id: edu.id })
  }

  await payload.create({
    collection: 'education',
    data: {
      school: 'Universitas Pakuan',
      degree: 'Ilmu Komputer (IPK 3,47 / 4,00) — Lulus',
      start: '',
      end: '',
      description:
        'Program Studi Ilmu Komputer, Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA).',
      published: true,
      sortOrder: 0,
    },
  })
  console.log('✓ Koleksi education diperbarui.')

  // 5. Update skills
  const existingSkills = await payload.find({ collection: 'skills', limit: 100 })
  for (const skill of existingSkills.docs) {
    await payload.delete({ collection: 'skills', id: skill.id })
  }

  const farisSkills = [
    { name: 'Laravel', category: 'Web', sortOrder: 0 },
    { name: 'CodeIgniter 3', category: 'Web', sortOrder: 1 },
    { name: 'Vue.js', category: 'Web', sortOrder: 2 },
    { name: 'Next.js', category: 'Web', sortOrder: 3 },
    { name: 'Tailwind CSS', category: 'Web', sortOrder: 4 },
    { name: 'Flutter', category: 'Mobile', sortOrder: 5 },
    { name: 'Jetpack Compose', category: 'Mobile', sortOrder: 6 },
    { name: 'Python', category: 'Data & Database', sortOrder: 7 },
    { name: 'MySQL', category: 'Data & Database', sortOrder: 8 },
    { name: 'Room Database', category: 'Data & Database', sortOrder: 9 },
    { name: 'REST API', category: 'Integrasi', sortOrder: 10 },
    { name: 'WebSockets', category: 'Integrasi', sortOrder: 11 },
  ]

  for (const s of farisSkills) {
    await payload.create({
      collection: 'skills',
      data: {
        name: s.name,
        category: s.category,
        iconKey: s.name.toLowerCase().replace(/\s+/g, ''),
        sortOrder: s.sortOrder,
      },
    })
  }
  console.log('✓ Koleksi skills diperbarui.')

  // 6. Unpublish projects (set _status to draft)
  const existingProjects = await payload.find({ collection: 'projects', limit: 100 })
  for (const proj of existingProjects.docs) {
    await payload.update({
      collection: 'projects',
      id: proj.id,
      data: {
        _status: 'draft',
      },
    })
  }
  console.log('✓ Koleksi projects demo diubah menjadi draft (unpublished).')

  // 7. Unpublish hackathons
  const existingHackathons = await payload.find({ collection: 'hackathons', limit: 100 })
  for (const h of existingHackathons.docs) {
    await payload.update({
      collection: 'hackathons',
      id: h.id,
      data: {
        published: false,
      },
    })
  }
  console.log('✓ Koleksi hackathons demo diubah menjadi unpublished.')

  console.log('--- Selesai Personalisasi Data ---')
}

await runPersonalize()
console.log('✓ Personalisasi database selesai.')
process.exit(0)
