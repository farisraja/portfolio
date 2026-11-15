import { getPayload } from 'payload'
import config from '@payload-config'
import { DATA } from '@/data/resume'
import type { Media, Project, Experience, Education as EduType, Skill, Hackathon } from '@/payload-types'

export type ProjectItem = {
  id?: string | number
  title: string
  slug: string
  dates?: string | null
  active?: boolean | null
  projectType?: string | null
  institutionName?: string | null
  institutionLogo?: string | null
  role?: string | null
  summary?: string | null
  description: string
  problem?: string | null
  myContribution?: string | null
  features?: Array<{ title: string; description?: string | null }>
  results?: string | null
  technologies: readonly string[]
  image?: string
  imageAlt?: string
  imageCaption?: string
  gallery?: Array<{ url: string; alt?: string; caption?: string }>
  video?: string
  videoPoster?: string
  websiteUrl?: string | null
  repositoryUrl?: string | null
  links: Array<{
    type: string
    href: string
  }>
  featured?: boolean | null
}

export type PortfolioData = {
  isFromDatabase: boolean
  dbError?: string
  siteSettings: {
    name: string
    ownerName: string
    title: string
    description: string
    url: string
    email: string
    tel: string
    whatsapp?: string | null
    whatsappMessage?: string | null
    social: {
      github?: string
      instagram?: string
      linkedin?: string
      x?: string
      youtube?: string
    }
  }
  profile: {
    name: string
    initials: string
    headline: string
    description: string
    summary: string
    location: string
    locationLink: string
    avatarUrl: string
    cvUrl?: string | null
  }
  skills: Array<{
    id?: string | number
    name: string
    category?: string | null
    iconKey?: string | null
  }>
  experiences: Array<{
    id?: string | number
    company: string
    title: string
    href?: string | null
    location?: string | null
    start?: string | null
    end?: string | null
    isCurrent?: boolean | null
    description: string
    logoUrl?: string | null
  }>
  education: Array<{
    id?: string | number
    school: string
    degree: string
    href?: string | null
    start?: string | null
    end?: string | null
    description?: string | null
    logoUrl?: string | null
  }>
  projects: ProjectItem[]
  hackathons: Array<{
    id?: string | number
    title: string
    dates: string
    location?: string | null
    description: string
    image?: string
    mlh?: string | null
    win?: string | null
    links?: readonly any[] | any[]
  }>
  certificates: CertificateItem[]
}

export type CertificateItem = {
  id?: string | number
  title: string
  issuer: string
  category: 'khusus' | 'umum'
  issueDate: string
  expiryDate?: string | null
  credentialId?: string | null
  credentialUrl?: string | null
  description?: string | null
  skills?: string[]
  image?: string | null
  thumbnailUrl?: string | null
}

export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "MKLC SCORM Simulator & Player",
    slug: "mklc-scorm-frontend",
    dates: "Sep 2026 - Sekarang",
    active: true,
    featured: true,
    projectType: "Interactive SCORM Runner & Web App",
    role: "Frontend & SCORM Runtime Developer",
    institutionName: "Mahkamah Konstitusi RI",
    institutionLogo: "/images/institutions/mkri-logo.png",
    summary:
      "Aplikasi antarmuka web modern berbasis Next.js 14 App Router & React 18 sebagai SCORM Viewer, Player Interaktif, dan Simulator Runtime SCORM 1.2 & 2004 untuk Pusdik Mahkamah Konstitusi (MKLC).",
    description:
      "MKLC SCORM Simulator & Frontend Runner adalah aplikasi antarmuka web modern berbasis Next.js 14 App Router dan React 18 yang berfungsi sebagai SCORM Viewer, Player Interaktif, dan Simulator Runtime SCORM 1.2 & SCORM 2004 untuk Pusat Pembelajaran Digital Mahkamah Konstitusi Republik Indonesia (MKLC).",
    technologies: ["Next.js 14", "React 18", "SCORM RTE", "Bootstrap 5", "JavaScript", "Laravel Sanctum", "Axios"],
    image: "/media/mklc-fe-01-daftar-materi.png",
    video: "/videos/mklc-scorm-frontend-demo.webm",
    repositoryUrl: "https://github.com/farisraja/mklc-scorm-frontend",
    websiteUrl: "https://github.com/farisraja/mklc-scorm-frontend",
    links: [
      { type: "Source", href: "https://github.com/farisraja/mklc-scorm-frontend" },
    ],
  },
  {
    id: 2,
    title: "MKLC SCORM Engine & Admin Backend",
    slug: "mklc-scorm-backend",
    dates: "Sep 2026 - Sekarang",
    active: true,
    featured: true,
    projectType: "LMS Backend & Learning Analytics Dashboard",
    role: "Backend Developer",
    institutionName: "Mahkamah Konstitusi RI",
    institutionLogo: "/images/institutions/mkri-logo.png",
    summary:
      "Layanan backend, REST API, dan dasbor analitik pembelajaran untuk standardisasi paket SCORM Pusdik Mahkamah Konstitusi RI.",
    description:
      "Backend service berbasis Laravel 10 dan PostgreSQL 16 untuk integrasi SCORM CMI data tracking dan analitik peserta.",
    technologies: ["Laravel 10", "PHP 8.1", "PostgreSQL 16", "REST API", "Docker", "SCORM CMI"],
    image: "/media/mklc-be-01-dashboard-overview.png",
    video: "/videos/mklc-scorm-backend-demo.webm",
    repositoryUrl: "https://github.com/farisraja/mklc-scorm-backend",
    websiteUrl: "https://github.com/farisraja/mklc-scorm-backend",
    links: [
      { type: "Source", href: "https://github.com/farisraja/mklc-scorm-backend" },
    ],
  },
  {
    id: 3,
    title: "Digital Library FMIPA Universitas Pakuan",
    slug: "digital-library-unpak",
    dates: "2023 - 2024",
    active: true,
    featured: false,
    projectType: "Academic Repository & Web App",
    role: "Full Stack Developer & Admin Sistem",
    institutionName: "Universitas Pakuan",
    institutionLogo: "/images/institutions/unpak-logo.png",
    summary:
      "Sistem repositori dan perpustakaan digital berbasis web untuk pengarsipan, pencarian cepat, dan manajemen karya ilmiah skripsi mahasiswa FMIPA Unpak.",
    description:
      "Aplikasi perpustakaan digital repositori skripsi mahasiswa Fakultas MIPA Universitas Pakuan.",
    technologies: ["PHP", "MySQL", "Bootstrap", "Apache", "JavaScript"],
    video: "/videos/digital-library-unpak-demo.webm",
    repositoryUrl: "https://github.com/farisraja/digital-library-unpak",
    websiteUrl: "https://github.com/farisraja/digital-library-unpak",
    links: [
      { type: "Source", href: "https://github.com/farisraja/digital-library-unpak" },
    ],
  },
  {
    id: 4,
    title: "Analisis Keranjang Belanja (Market Basket Analysis)",
    slug: "analisis_keranjang_belanja_2026",
    dates: "2024",
    active: true,
    featured: false,
    projectType: "Data Mining & Web Analytics",
    role: "Software Developer & Researcher",
    institutionName: "Universitas Pakuan",
    institutionLogo: "/images/institutions/unpak-logo.png",
    summary:
      "Aplikasi web pengolahan data riwayat transaksi penjualan retail menggunakan algoritma data mining asosiasi Apriori untuk menemukan pola afinitas pembelian konsumen.",
    description:
      "Aplikasi web pengolahan data riwayat transaksi penjualan retail menggunakan algoritma data mining asosiasi.",
    technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Vite", "Blade"],
    video: "/videos/analisis-keranjang-belanja-demo.webm",
    repositoryUrl: "https://github.com/farisraja/analisis_keranjang_belanja_2026",
    websiteUrl: "https://github.com/farisraja/analisis_keranjang_belanja_2026",
    links: [
      { type: "Source", href: "https://github.com/farisraja/analisis_keranjang_belanja_2026" },
    ],
  },
  {
    id: 5,
    title: "PB Cipta Badminton League Application",
    slug: "pb-cipta-sports",
    dates: "2024",
    active: true,
    featured: false,
    projectType: "Sports Tournament & League Management",
    role: "Full Stack Developer",
    institutionName: "PB Cipta Sports",
    institutionLogo: "/images/institutions/pb-cipta-logo.svg",
    summary:
      "Aplikasi web modern untuk manajemen turnamen dan liga bulu tangkis yang mencakup pencatatan skor real-time, statistik otomatis, dan papan peringkat dinamis.",
    description:
      "Aplikasi manajemen turnamen bulu tangkis dengan live scoring dan dynamic leaderboard.",
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Supabase", "Express.js"],
    image: "/media/pb-cipta-login.png",
    video: "/videos/pb-cipta-demo.mp4",
    websiteUrl: "https://pb-cipta-esports.vercel.app",
    repositoryUrl: "https://github.com/farisraja/pb-cipta-sports",
    links: [
      { type: "Website", href: "https://pb-cipta-esports.vercel.app" },
      { type: "Source", href: "https://github.com/farisraja/pb-cipta-sports" },
    ],
  },
  {
    id: 6,
    title: "AI Resume Optimizer (ATS Beater)",
    slug: "resume-optimizer",
    dates: "2024",
    active: true,
    featured: false,
    projectType: "AI-Powered Career Tool",
    role: "AI & Full Stack Developer",
    institutionName: "Open Source Project",
    institutionLogo: "/images/institutions/open-source-logo.svg",
    summary:
      "Platform open-source berbasis AI untuk mengoptimalkan resume terhadap deskripsi pekerjaan melalui pencocokan kata kunci kontekstual dan kompilasi otomatis format standar ATS.",
    description:
      "AI Resume Optimizer ATS Beater powered by FastAPI and Gemini AI.",
    technologies: ["Python 3.12", "FastAPI", "Google Gemini 1.5", "LaTeX", "Vue 3", "PostgreSQL"],
    video: "/videos/resume-optimizer-demo.webm",
    repositoryUrl: "https://github.com/farisraja/resume-optimizer",
    websiteUrl: "https://github.com/farisraja/resume-optimizer",
    links: [
      { type: "Source", href: "https://github.com/farisraja/resume-optimizer" },
    ],
  },
  {
    id: 7,
    title: "Futuristic Glassmorphic Web Portfolio",
    slug: "web-portofolio",
    dates: "2024",
    active: true,
    featured: false,
    projectType: "Personal Portfolio & UI/UX Showcase",
    role: "Frontend Developer & Designer",
    institutionName: "Personal Project",
    institutionLogo: "/images/institutions/open-source-logo.svg",
    summary:
      "Website portofolio interaktif dengan desain Glassmorphism futuristik, animasi framer-motion responsif, dan performa tinggi berbasis Next.js 16.",
    description:
      "Personal portfolio website showcasing futuristic aesthetics and interactive components.",
    technologies: ["Next.js 16", "React 19", "Tailwind CSS", "Motion", "TypeScript"],
    video: "/videos/web-portofolio-demo.webm",
    websiteUrl: "https://web-portofolio-eight-rust.vercel.app",
    repositoryUrl: "https://github.com/farisraja/web-portofolio",
    links: [
      { type: "Website", href: "https://web-portofolio-eight-rust.vercel.app" },
      { type: "Source", href: "https://github.com/farisraja/web-portofolio" },
    ],
  },
]

export function getMediaUrl(media?: (string | number | Media) | null, fallbackUrl?: string | null): string {
  if (!media) return fallbackUrl || ''
  if (typeof media === 'string') return media
  if (typeof media === 'number') return fallbackUrl || ''
  return media.url || fallbackUrl || ''
}

export function formatProjectDoc(p: Project | any): ProjectItem {
  const links: Array<{ type: string; href: string }> = []
  if (p.websiteUrl && p.websiteUrl.trim() !== '' && p.websiteUrl !== '#') {
    links.push({ type: 'Website', href: p.websiteUrl })
  }
  if (
    p.repositoryUrl &&
    p.repositoryUrl.trim() !== '' &&
    p.repositoryUrl !== '#' &&
    (p as any).githubAvailability !== 'unavailable'
  ) {
    links.push({ type: 'Source', href: p.repositoryUrl })
  }

  // Determine effective technologies:
  // Mode 'manual' -> use p.technologies (admin curated)
  // Mode 'auto' -> use p.detectedTechnologies if available; fallback to p.technologies
  const mode = (p as any).techMode || 'auto'
  let effectiveTech: string[] = []
  if (
    mode === 'auto' &&
    Array.isArray((p as any).detectedTechnologies) &&
    (p as any).detectedTechnologies.length > 0
  ) {
    effectiveTech = (p as any).detectedTechnologies.map((t: any) =>
      typeof t === 'string' ? t : t.name
    )
  } else if (Array.isArray(p.technologies) && p.technologies.length > 0) {
    effectiveTech = p.technologies.map((t: any) => (typeof t === 'string' ? t : t.name))
  }

  const imageObj = typeof p.image === 'object' && p.image !== null ? (p.image as Media) : null
  const imageUrl = getMediaUrl(p.image, p.imageUrl)
  const imageAlt = imageObj?.alt || p.title
  const imageCaption = imageObj?.caption || ''

  // Map gallery
  const gallery = Array.isArray((p as any).gallery)
    ? (p as any).gallery
        .map((g: any) => {
          const gMedia = typeof g.image === 'object' && g.image !== null ? g.image : null
          const url = getMediaUrl(g.image, g.imageUrl)
          if (!url) return null
          return {
            url,
            alt: g.alt || gMedia?.alt || p.title,
            caption: g.caption || gMedia?.caption || '',
          }
        })
        .filter(Boolean)
    : []

  // Determine effective institution name & logo with resilient fallback
  let instName = (p as any).institutionName || (p as any).institution || (p as any).client || null
  let instLogo = getMediaUrl((p as any).institutionLogo, (p as any).institutionLogoUrl) || null

  const s = ((p.slug || '') + ' ' + (p.title || '')).toLowerCase()
  if (!instName || !instLogo) {
    if (s.includes('mklc') || s.includes('mahkamah') || s.includes('pusdik') || s.includes('konstitusi')) {
      instName = instName || 'Mahkamah Konstitusi RI'
      instLogo = instLogo || '/images/institutions/mkri-logo.png'
    } else if (s.includes('unpak') || s.includes('pakuan') || s.includes('keranjang') || s.includes('digital-library')) {
      instName = instName || 'Universitas Pakuan'
      instLogo = instLogo || '/images/institutions/unpak-logo.png'
    } else if (s.includes('cipta') || s.includes('sports') || s.includes('badminton')) {
      instName = instName || 'PB Cipta Sports'
      instLogo = instLogo || '/images/institutions/pb-cipta-logo.svg'
    } else if (s.includes('resume') || s.includes('portfolio') || s.includes('ats')) {
      instName = instName || 'Open Source Project'
      instLogo = instLogo || '/images/institutions/open-source-logo.svg'
    }
  }

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    dates: p.dates || '',
    active: p.active ?? true,
    projectType: (p as any).projectType || null,
    institutionName: instName,
    institutionLogo: instLogo,
    role: (p as any).role || null,
    summary: (p as any).summary || null,
    description: p.description || '',
    problem: (p as any).problem || null,
    myContribution: (p as any).myContribution || null,
    features: Array.isArray((p as any).features)
      ? (p as any).features.map((f: any) => ({
          title: typeof f === 'string' ? f : f.title,
          description: typeof f === 'object' ? f.description : null,
        }))
      : [],
    results: (p as any).results || null,
    technologies: effectiveTech,
    image: imageUrl,
    imageAlt,
    imageCaption,
    gallery,
    video: p.video || '',
    videoPoster: getMediaUrl((p as any).videoPoster),
    websiteUrl: p.websiteUrl || null,
    repositoryUrl: (p as any).githubAvailability !== 'unavailable' ? (p.repositoryUrl || null) : null,
    links,
    featured: p.featured ?? false,
  }
}

export function formatWhatsAppUrl(phone?: string | null, message?: string | null): string | null {
  if (!phone || !phone.trim()) return null
  let cleaned = phone.replace(/[^0-9+]/g, '')
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1)
  }
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1)
  }
  if (!cleaned) return null
  const encodedMsg = message ? encodeURIComponent(message) : ''
  return `https://wa.me/${cleaned}${encodedMsg ? `?text=${encodedMsg}` : ''}`
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const fallbackMatch = FALLBACK_PROJECTS.find((p) => p.slug === slug) || null

  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl || dbUrl.includes('PASSWORD_POSTGRES_ANDA') || dbUrl.includes('YOUR_POSTGRES_PASSWORD')) {
    return fallbackMatch
  }

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'projects',
      where: {
        _status: { equals: 'published' },
        slug: { equals: slug },
      },
      overrideAccess: false,
      limit: 1,
      depth: 2,
    })

    if (!res.docs || res.docs.length === 0) {
      return fallbackMatch
    }

    const doc = res.docs[0]
    if ((doc as any)._status !== 'published') {
      return fallbackMatch
    }

    return formatProjectDoc(doc)
  } catch (err: any) {
    return fallbackMatch
  }
}

export async function getAllPublishedProjectSlugs(): Promise<string[]> {
  const fallbackSlugs = FALLBACK_PROJECTS.map((p) => p.slug)
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl || dbUrl.includes('PASSWORD_POSTGRES_ANDA') || dbUrl.includes('YOUR_POSTGRES_PASSWORD')) {
    return fallbackSlugs
  }

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'projects',
      where: {
        _status: { equals: 'published' },
      },
      overrideAccess: false,
      limit: 100,
    })

    const dbSlugs = res.docs.map((p) => p.slug).filter(Boolean)
    return dbSlugs.length > 0 ? dbSlugs : fallbackSlugs
  } catch {
    return fallbackSlugs
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  // If no DATABASE_URL is set, or placeholder is used
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl || dbUrl.includes('PASSWORD_POSTGRES_ANDA') || dbUrl.includes('YOUR_POSTGRES_PASSWORD')) {
    return getFallbackData('Database URL belum dikonfigurasi di .env.local')
  }

  try {
    const payload = await getPayload({ config })

    // 1. Fetch Globals
    const [rawSettings, rawProfile] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
      payload.findGlobal({ slug: 'profile' }).catch(() => null),
    ])

    // 2. Fetch Collections
    const [rawSkills, rawExperiences, rawEducation, rawProjects, rawHackathons, rawCertificates] = await Promise.all([
      payload.find({
        collection: 'skills',
        sort: 'sortOrder',
        limit: 100,
      }).catch(() => null),
      payload.find({
        collection: 'experiences',
        where: {
          published: { equals: true },
        },
        sort: 'sortOrder',
        limit: 100,
      }).catch(() => null),
      payload.find({
        collection: 'education',
        where: {
          published: { equals: true },
        },
        sort: 'sortOrder',
        limit: 100,
      }).catch(() => null),
      payload.find({
        collection: 'projects',
        where: {
          and: [
            { _status: { equals: 'published' } },
            { active: { equals: true } },
          ],
        },
        sort: 'sortOrder',
        limit: 100,
        depth: 2,
      }).catch(() => null),
      payload.find({
        collection: 'hackathons',
        where: {
          published: { equals: true },
        },
        sort: 'sortOrder',
        limit: 100,
      }).catch(() => null),
      payload.find({
        collection: 'certificates',
        where: {
          published: { equals: true },
        },
        sort: 'sortOrder',
        limit: 100,
        depth: 2,
      }).catch(() => null),
    ])

    // Map fetched projects
    const mappedProjects = (rawProjects?.docs || []).map((p: Project) => formatProjectDoc(p))

    // Map experiences
    const mappedExperiences = (rawExperiences?.docs || []).map((e: Experience) => ({
      id: e.id,
      company: e.company,
      title: e.title,
      href: e.href,
      location: e.location,
      start: e.start,
      end: e.isCurrent ? 'Sekarang' : (e.end || ''),
      isCurrent: e.isCurrent,
      description: e.description,
      logoUrl: getMediaUrl(e.logo, e.logoUrl),
    }))

    // Map education
    const mappedEducation = (rawEducation?.docs || []).map((edu: EduType) => ({
      id: edu.id,
      school: edu.school,
      degree: edu.degree,
      href: edu.href,
      start: edu.start,
      end: edu.end,
      description: edu.description,
      logoUrl: getMediaUrl(edu.logo, edu.logoUrl),
    }))

    // Map skills
    const mappedSkills = (rawSkills?.docs || []).map((s: Skill) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      iconKey: s.iconKey || s.name,
    }))

    // Map hackathons
    const mappedHackathons = (rawHackathons?.docs || []).map((h: Hackathon) => ({
      id: h.id,
      title: h.title,
      dates: h.dates,
      location: h.location,
      description: h.description,
      image: getMediaUrl(h.image, h.imageUrl),
      mlh: h.mlh,
      win: h.win,
      links: h.links || [],
    }))

    // Helper to extract or generate thumbnail URL
    const getThumbnailUrl = (mediaObj: any, fallbackUrl?: string | null): string => {
      if (mediaObj && typeof mediaObj === 'object') {
        if (mediaObj.sizes?.thumbnail?.url) return mediaObj.sizes.thumbnail.url
      }
      const raw = getMediaUrl(mediaObj, fallbackUrl)
      if (!raw) return ''
      if (raw.includes('-300x300.')) return raw
      const dotIndex = raw.lastIndexOf('.')
      if (dotIndex !== -1) {
        return `${raw.substring(0, dotIndex)}-300x300${raw.substring(dotIndex)}`
      }
      return raw
    }

    // Map certificates
    const mappedCertificates: CertificateItem[] = (rawCertificates?.docs || []).map((c: any) => ({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      category: (c.category === 'umum' ? 'umum' : 'khusus') as 'khusus' | 'umum',
      issueDate: c.issueDate,
      expiryDate: c.expiryDate || null,
      credentialId: c.credentialId || null,
      credentialUrl: c.credentialUrl || null,
      description: c.description || null,
      skills: Array.isArray(c.skills)
        ? c.skills.map((s: any) => (typeof s === 'string' ? s : s.name))
        : [],
      image: getMediaUrl(c.image, c.imageUrl),
      thumbnailUrl: getThumbnailUrl(c.image, c.imageUrl),
    }))

    // If database returned valid records, use them
    const hasDbData =
      mappedProjects.length > 0 ||
      mappedExperiences.length > 0 ||
      mappedSkills.length > 0 ||
      (rawProfile && rawProfile.name && rawProfile.name.trim() !== '')

    if (!hasDbData) {
      return getFallbackData('Database terhubung tetapi data masih kosong (belum menjalankan seed).')
    }

    return {
      isFromDatabase: true,
      siteSettings: {
        name: rawSettings?.name || DATA.name,
        ownerName: rawSettings?.ownerName || DATA.name,
        title: rawSettings?.title || 'Web & Software Developer',
        description: rawSettings?.description || DATA.description,
        url: rawSettings?.url || DATA.url,
        email: rawSettings?.email || '',
        tel: rawSettings?.tel || '',
        whatsapp: rawSettings?.whatsapp || '',
        whatsappMessage: rawSettings?.whatsappMessage || '',
        social: {
          github: rawSettings?.socialLinks?.github || '',
          instagram: rawSettings?.socialLinks?.instagram || '',
          linkedin: rawSettings?.socialLinks?.linkedin || '',
          x: rawSettings?.socialLinks?.x || '',
          youtube: rawSettings?.socialLinks?.youtube || '',
        },
      },
      profile: {
        name: rawProfile?.name || DATA.name,
        initials: rawProfile?.initials || DATA.initials,
        headline: rawProfile?.headline || 'Web & Software Developer',
        description: rawProfile?.description || DATA.description,
        summary: rawProfile?.summary || DATA.summary,
        location: rawProfile?.location || '',
        locationLink: rawProfile?.locationLink || '',
        avatarUrl: getMediaUrl(rawProfile?.avatar, rawProfile?.avatarUrl || ''),
        cvUrl: getMediaUrl(
          (rawProfile as any)?.cv,
          (rawProfile as any)?.cvUrl || (DATA as any).cvUrl || '/cv-faris-raja-ardana.pdf'
        ),
      },
      skills: mappedSkills,
      experiences: mappedExperiences,
      education: mappedEducation,
      projects: mappedProjects && mappedProjects.length > 0 ? mappedProjects : FALLBACK_PROJECTS,
      hackathons: mappedHackathons,
      certificates:
        mappedCertificates.length > 0 ? mappedCertificates : (DATA.certificates as CertificateItem[]),
    }
  } catch (err: any) {
    console.error('Payload CMS Local API Query Error:', err?.message || err)
    return getFallbackData(`Gagal terhubung ke PostgreSQL: ${err?.message || 'Koneksi ditolak'}`)
  }
}

function getFallbackData(reason: string): PortfolioData {
  return {
    isFromDatabase: false,
    dbError: reason,
    siteSettings: {
      name: DATA.name,
      ownerName: DATA.name,
      title: 'Web & Software Developer',
      description: DATA.description,
      url: DATA.url,
      email: DATA.contact.email,
      tel: DATA.contact.tel,
      whatsapp: '',
      whatsappMessage: '',
      social: {
        github: 'https://github.com/farisraja',
        instagram: 'https://www.instagram.com/frardana/',
        linkedin: 'https://www.linkedin.com/in/faris-raja-ardana',
        x: '',
        youtube: '',
      },
    },
    profile: {
      name: DATA.name,
      initials: DATA.initials,
      headline: 'Web & Software Developer',
      description: DATA.description,
      summary: DATA.summary,
      location: DATA.location,
      locationLink: DATA.locationLink,
      avatarUrl: DATA.avatarUrl,
      cvUrl: (DATA as any).cvUrl || '/cv-faris-raja-ardana.pdf',
    },
    skills: DATA.skills.map((s) => ({ name: s.name, iconKey: s.name })),
    experiences: [...DATA.work],
    education: [...DATA.education],
    projects: FALLBACK_PROJECTS,
    hackathons: [],
    certificates: [...(DATA.certificates as CertificateItem[])],
  }
}
