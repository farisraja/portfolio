import { getPayload } from 'payload'
import config from '../payload.config'
import { DATA } from '../data/resume'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function runSeed(args?: { payload?: any }) {
  console.log('--- Memulai Seeding Data Portofolio Asli Dillion ke Payload CMS ---')

  let payload = args?.payload
  if (!payload) {
    try {
      payload = await getPayload({ config })
    } catch (e) {
      console.error('Gagal inisialisasi Payload:', e)
      throw e
    }
  }

  // 1. Seed Site Settings
  try {
    const existingSettings = await payload.findGlobal({ slug: 'site-settings' })
    if (!existingSettings || !existingSettings.name || existingSettings.name === 'Dillion Verma') {
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          name: DATA.name,
          ownerName: DATA.name,
          title: 'Software Engineer turned Entrepreneur',
          description: DATA.description,
          url: DATA.url,
          email: DATA.contact.email,
          tel: DATA.contact.tel,
          whatsapp: '',
          whatsappMessage: 'Halo, saya tertarik dengan portofolio Anda.',
          socialLinks: {
            github: (DATA.contact.social as Record<string, any>).GitHub?.url || '',
            linkedin: (DATA.contact.social as Record<string, any>).LinkedIn?.url || '',
            x: (DATA.contact.social as Record<string, any>).X?.url || '',
            youtube: (DATA.contact.social as Record<string, any>).Youtube?.url || '',
          },
        },
      })
      console.log('✓ Global Site Settings berhasil diinisialisasi.')
    } else {
      console.log('ℹ Global Site Settings sudah dikonfigurasi, melewati pembaruan.')
    }
  } catch (err) {
    console.warn('Peringatan saat seed Site Settings:', err)
  }

  // 2. Seed Profile
  try {
    const existingProfile = await payload.findGlobal({ slug: 'profile' })
    if (!existingProfile || !existingProfile.name || existingProfile.name === 'Dillion Verma') {
      await payload.updateGlobal({
        slug: 'profile',
        data: {
          name: DATA.name,
          initials: DATA.initials,
          headline: 'Software Engineer turned Entrepreneur',
          description: DATA.description,
          summary: DATA.summary,
          location: DATA.location,
          locationLink: DATA.locationLink,
          avatarUrl: DATA.avatarUrl,
        },
      })
      console.log('✓ Global Profile berhasil diinisialisasi.')
    } else {
      console.log('ℹ Global Profile sudah dikonfigurasi, melewati pembaruan.')
    }
  } catch (err) {
    console.warn('Peringatan saat seed Profile:', err)
  }

  // 3. Seed Skills
  try {
    console.log(`Memeriksa ${DATA.skills.length} keahlian (skills)...`)
    for (let i = 0; i < DATA.skills.length; i++) {
      const skill = DATA.skills[i]
      const existing = await payload.find({
        collection: 'skills',
        where: {
          name: {
            equals: skill.name,
          },
        },
        limit: 1,
      })

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'skills',
          data: {
            name: skill.name,
            iconKey: skill.name,
            sortOrder: i,
          },
        })
        console.log(`  + Ditambahkan skill: ${skill.name}`)
      }
    }
    console.log('✓ Koleksi Skills selesai diperiksa.')
  } catch (err) {
    console.warn('Peringatan saat seed Skills:', err)
  }

  // 4. Seed Experiences (Work)
  try {
    console.log(`Memeriksa ${DATA.work.length} pengalaman kerja...`)
    for (let i = 0; i < DATA.work.length; i++) {
      const work = DATA.work[i]
      const existing = await payload.find({
        collection: 'experiences',
        where: {
          company: {
            equals: work.company,
          },
          title: {
            equals: work.title,
          },
        },
        limit: 1,
      })

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'experiences',
          data: {
            company: work.company,
            title: work.title,
            href: work.href,
            location: work.location,
            start: work.start,
            end: work.end || '',
            isCurrent: !work.end,
            description: work.description,
            logoUrl: work.logoUrl,
            published: true,
            sortOrder: i,
          },
        })
        console.log(`  + Ditambahkan pengalaman: ${work.company} - ${work.title}`)
      }
    }
    console.log('✓ Koleksi Experiences selesai diperiksa.')
  } catch (err) {
    console.warn('Peringatan saat seed Experiences:', err)
  }

  // 5. Seed Education
  try {
    console.log(`Memeriksa ${DATA.education.length} riwayat pendidikan...`)
    for (let i = 0; i < DATA.education.length; i++) {
      const edu = DATA.education[i]
      const existing = await payload.find({
        collection: 'education',
        where: {
          school: {
            equals: edu.school,
          },
          degree: {
            equals: edu.degree,
          },
        },
        limit: 1,
      })

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'education',
          data: {
            school: edu.school,
            degree: edu.degree,
            href: edu.href,
            start: edu.start,
            end: edu.end || '',
            logoUrl: edu.logoUrl,
            published: true,
            sortOrder: i,
          },
        })
        console.log(`  + Ditambahkan pendidikan: ${edu.school} (${edu.degree})`)
      }
    }
    console.log('✓ Koleksi Education selesai diperiksa.')
  } catch (err) {
    console.warn('Peringatan saat seed Education:', err)
  }

  // 6. Seed Projects
  try {
    console.log(`Memeriksa ${DATA.projects.length} proyek...`)
    for (let i = 0; i < DATA.projects.length; i++) {
      const proj = DATA.projects[i]
      const slug = slugify(proj.title)
      const existing = await payload.find({
        collection: 'projects',
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })

      if (existing.totalDocs === 0) {
        const websiteLink = proj.links.find((l) => l.type === 'Website')
        const repoLink = proj.links.find((l) => l.type === 'Source')

        await payload.create({
          collection: 'projects',
          data: {
            title: proj.title,
            slug,
            dates: proj.dates,
            active: proj.active,
            description: proj.description,
            technologies: proj.technologies.map((t) => ({ name: t })),
            imageUrl: proj.image || '',
            video: proj.video || '',
            websiteUrl: websiteLink?.href || '',
            repositoryUrl: repoLink?.href || '',
            featured: i < 2,
            sortOrder: i,
            _status: 'published',
          },
        })
        console.log(`  + Ditambahkan proyek: ${proj.title} (slug: ${slug})`)
      }
    }
    console.log('✓ Koleksi Projects selesai diperiksa.')
  } catch (err) {
    console.warn('Peringatan saat seed Projects:', err)
  }

  // 7. Seed Hackathons
  try {
    console.log(`Memeriksa ${DATA.hackathons.length} hackathon...`)
    for (let i = 0; i < DATA.hackathons.length; i++) {
      const hack = DATA.hackathons[i]
      const existing = await payload.find({
        collection: 'hackathons',
        where: {
          title: {
            equals: hack.title,
          },
          dates: {
            equals: hack.dates,
          },
        },
        limit: 1,
      })

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'hackathons',
          data: {
            title: hack.title,
            dates: hack.dates,
            location: hack.location,
            description: hack.description,
            imageUrl: hack.image,
            mlh: (hack as any).mlh || '',
            win: (hack as any).win || '',
            links:
              (hack as any).links?.map((l: any) => ({
                title: l.title,
                href: l.href,
              })) || [],
            published: true,
            sortOrder: i,
          },
        })
        console.log(`  + Ditambahkan hackathon: ${hack.title}`)
      }
    }
    console.log('✓ Koleksi Hackathons selesai diperiksa.')
  } catch (err) {
    console.warn('Peringatan saat seed Hackathons:', err)
  }

  console.log('--- Selesai Seeding Data ---')
}

export default runSeed

await runSeed();
