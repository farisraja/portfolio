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
}

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

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    dates: p.dates || '',
    active: p.active ?? true,
    projectType: (p as any).projectType || null,
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
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl || dbUrl.includes('PASSWORD_POSTGRES_ANDA') || dbUrl.includes('YOUR_POSTGRES_PASSWORD')) {
    return null
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
      return null
    }

    const doc = res.docs[0]
    if ((doc as any)._status !== 'published') {
      return null
    }

    return formatProjectDoc(doc)
  } catch (err: any) {
    console.error(`Gagal mengambil detail proyek [${slug}]:`, err?.message || err)
    return null
  }
}

export async function getAllPublishedProjectSlugs(): Promise<string[]> {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl || dbUrl.includes('PASSWORD_POSTGRES_ANDA') || dbUrl.includes('YOUR_POSTGRES_PASSWORD')) {
    return []
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

    return res.docs.map((p) => p.slug).filter(Boolean)
  } catch {
    return []
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
          _status: { equals: 'published' },
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
      },
      skills: mappedSkills,
      experiences: mappedExperiences,
      education: mappedEducation,
      projects: mappedProjects,
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
    },
    skills: DATA.skills.map((s) => ({ name: s.name, iconKey: s.name })),
    experiences: [...DATA.work],
    education: [...DATA.education],
    projects: [],
    hackathons: [],
    certificates: [...(DATA.certificates as CertificateItem[])],
  }
}
