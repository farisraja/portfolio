import type { Payload } from 'payload'
import {
  detectTechnologies,
  type DetectionResult,
  type DetectedTech,
  type LanguageByteInfo,
} from './tech-detector'

export interface GitHubRepoItem {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  topics?: string[]
  homepage: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  archived: boolean
  pushed_at: string | null
}

interface CacheEntry<T> {
  data: T
  timestamp: number
}
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes cache
const languagesCache = new Map<string, CacheEntry<Record<string, number>>>()
const fileContentCache = new Map<string, CacheEntry<string | null>>()

export async function fetchRepoLanguages(fullName: string): Promise<Record<string, number>> {
  const cached = languagesCache.get(fullName)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data
  }

  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    'User-Agent': 'portfolio-payload-cms',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token && token.trim() !== '') {
    headers.Authorization = `Bearer ${token.trim()}`
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}/languages`, {
      headers,
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) {
      if (res.status === 404) {
        return {}
      }
      return cached?.data || {}
    }

    const data = await res.json()
    if (typeof data === 'object' && data !== null) {
      languagesCache.set(fullName, { data, timestamp: Date.now() })
      return data
    }
  } catch (err: any) {
    console.warn(`[GitHub Languages Error] ${fullName}:`, err.message)
    return cached?.data || {}
  }
  return cached?.data || {}
}

export async function fetchRepoRawFile(fullName: string, filePath: string): Promise<string | null> {
  const cacheKey = `${fullName}:${filePath}`
  const cached = fileContentCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data
  }

  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    'User-Agent': 'portfolio-payload-cms',
    Accept: 'application/vnd.github.raw+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token && token.trim() !== '') {
    headers.Authorization = `Bearer ${token.trim()}`
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}/contents/${filePath}`, {
      headers,
      signal: AbortSignal.timeout(10000),
    })

    if (!res.ok) {
      if (res.status === 404) {
        fileContentCache.set(cacheKey, { data: null, timestamp: Date.now() })
        return null
      }
      return cached?.data ?? null
    }

    const text = await res.text()
    fileContentCache.set(cacheKey, { data: text, timestamp: Date.now() })
    return text
  } catch (err: any) {
    console.warn(`[GitHub File Fetch Error] ${fullName}/${filePath}:`, err.message)
    return cached?.data ?? null
  }
}

export async function fetchRepoManifests(fullName: string, languages: Record<string, number>) {
  const langKeys = Object.keys(languages).map((k) => k.toLowerCase())
  const hasPHP = langKeys.includes('php') || langKeys.includes('blade')
  const hasPython = langKeys.includes('python')
  const hasDart = langKeys.includes('dart')

  const [rawPkg, rawComposer, rawPyproject, rawReqs, rawPubspec] = await Promise.all([
    fetchRepoRawFile(fullName, 'package.json'),
    hasPHP ? fetchRepoRawFile(fullName, 'composer.json') : Promise.resolve(null),
    hasPython ? fetchRepoRawFile(fullName, 'pyproject.toml') : Promise.resolve(null),
    hasPython ? fetchRepoRawFile(fullName, 'requirements.txt') : Promise.resolve(null),
    hasDart ? fetchRepoRawFile(fullName, 'pubspec.yaml') : Promise.resolve(null),
  ])

  let packageJson: any = null
  if (rawPkg) {
    try {
      packageJson = JSON.parse(rawPkg)
    } catch {}
  }

  let composerJson: any = null
  if (rawComposer) {
    try {
      composerJson = JSON.parse(rawComposer)
    } catch {}
  }

  return {
    packageJson,
    composerJson,
    pyprojectToml: rawPyproject,
    requirementsTxt: rawReqs,
    pubspecYaml: rawPubspec,
  }
}

export async function detectRepoTechnologies(fullName: string): Promise<DetectionResult> {
  const languages = await fetchRepoLanguages(fullName)
  const manifests = await fetchRepoManifests(fullName, languages)
  return detectTechnologies(languages, manifests)
}

let isSyncing = false
let lastSyncTimestamp = 0
const MIN_SYNC_INTERVAL_MS = 5000 // 5 seconds debounce

export async function fetchGitHubRepos(username: string = 'farisraja'): Promise<{
  repos: GitHubRepoItem[]
  rateLimit: { remaining: number; limit: number; resetTime: string }
}> {
  // Validate username to prevent injection
  const safeUsernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/
  if (!safeUsernameRegex.test(username)) {
    throw new Error(`Username GitHub "${username}" tidak valid.`)
  }

  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    'User-Agent': 'portfolio-payload-cms',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (token && token.trim() !== '') {
    headers.Authorization = `Bearer ${token.trim()}`
  }

  const allRepos: GitHubRepoItem[] = []
  let page = 1
  const perPage = 100
  let rateRemaining = 60
  let rateLimitTotal = 60
  let rateResetTime = ''

  while (page <= 10) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&page=${page}&sort=pushed`

    let res: Response
    try {
      res = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(15000), // 15s timeout
      })
    } catch (err: any) {
      if (err.name === 'TimeoutError' || err.name === 'AbortError') {
        throw new Error('Permintaan ke GitHub API melebihi batas waktu (timeout 15 detik).')
      }
      throw new Error(`Gagal menghubungi GitHub API: ${err.message || 'Koneksi jaringan terputus'}`)
    }

    const remHeader = res.headers.get('x-ratelimit-remaining')
    const limHeader = res.headers.get('x-ratelimit-limit')
    const resetHeader = res.headers.get('x-ratelimit-reset')

    if (remHeader) rateRemaining = parseInt(remHeader, 10)
    if (limHeader) rateLimitTotal = parseInt(limHeader, 10)
    if (resetHeader) {
      const resetDate = new Date(parseInt(resetHeader, 10) * 1000)
      rateResetTime = resetDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }

    if (res.status === 403 || res.status === 429) {
      throw new Error(
        `Batas frekuensi GitHub API (Rate Limit) terlampaui. Sisa kuota: 0. Kuota akan direset pada ${rateResetTime || 'beberapa menit ke depan'}. Anda dapat menambahkan GITHUB_TOKEN pada environment server untuk kuota lebih tinggi.`
      )
    }

    if (!res.ok) {
      throw new Error(`GitHub API mengembalikan status ${res.status}: ${res.statusText}`)
    }

    const data = await res.json()

    if (!Array.isArray(data)) {
      throw new Error('Format data dari GitHub API tidak valid (diharapkan berupa array repository).')
    }

    // Validate each repository object
    for (const item of data) {
      if (typeof item.id !== 'number' || !item.name || !item.html_url) {
        throw new Error('Respons repository dari GitHub tidak memiliki atribut wajib (id, name, html_url).')
      }

      // Security check: validate html_url uses http/https
      if (!item.html_url.startsWith('https://') && !item.html_url.startsWith('http://')) {
        continue
      }

      allRepos.push({
        id: item.id,
        name: String(item.name),
        full_name: String(item.full_name || `${username}/${item.name}`),
        html_url: String(item.html_url),
        description: item.description ? String(item.description) : null,
        language: item.language ? String(item.language) : null,
        topics: Array.isArray(item.topics) ? item.topics.map(String) : [],
        homepage: item.homepage && (item.homepage.startsWith('http://') || item.homepage.startsWith('https://'))
          ? String(item.homepage)
          : null,
        stargazers_count: typeof item.stargazers_count === 'number' ? item.stargazers_count : 0,
        forks_count: typeof item.forks_count === 'number' ? item.forks_count : 0,
        fork: Boolean(item.fork),
        archived: Boolean(item.archived),
        pushed_at: item.pushed_at ? String(item.pushed_at) : null,
      })
    }

    // If fewer than perPage items were returned, we have reached the end of the pages
    if (data.length < perPage) {
      break
    }

    page++
  }

  return {
    repos: allRepos,
    rateLimit: {
      remaining: rateRemaining,
      limit: rateLimitTotal,
      resetTime: rateResetTime,
    },
  }
}

export async function executeGitHubSync(payload: Payload, user: any) {
  if (!user) {
    throw new Error('Akses ditolak: Anda harus masuk sebagai admin untuk menyinkronkan GitHub.')
  }

  const now = Date.now()
  if (isSyncing) {
    throw new Error('Sinkronisasi sedang berlangsung. Silakan tunggu hingga proses sebelumnya selesai.')
  }

  if (now - lastSyncTimestamp < MIN_SYNC_INTERVAL_MS) {
    const waitSec = Math.ceil((MIN_SYNC_INTERVAL_MS - (now - lastSyncTimestamp)) / 1000)
    throw new Error(`Frekuensi sinkronisasi dibatasi. Harap tunggu ${waitSec} detik lagi.`)
  }

  isSyncing = true
  lastSyncTimestamp = now

  try {
    const { repos, rateLimit } = await fetchGitHubRepos('farisraja')
    const syncTimeStr = new Date().toISOString()

    // 1. Fetch existing GitHub repositories from CMS
    const existingSyncDocs = await payload.find({
      collection: 'github-repositories',
      limit: 1000,
    })

    const existingMap = new Map<number, any>()
    for (const doc of existingSyncDocs.docs) {
      existingMap.set(doc.repoId, doc)
    }

    const currentRepoIds = new Set<number>()

    // 2. Upsert each fetched repository
    for (const repo of repos) {
      currentRepoIds.add(repo.id)
      const existing = existingMap.get(repo.id)

      // Detect technologies with proof from languages API and manifests
      let detection: DetectionResult = {
        detectedTechnologies: [],
        languages: [],
        evidenceFiles: [],
      }
      try {
        detection = await detectRepoTechnologies(repo.full_name)
      } catch (detErr) {
        console.warn(`Detection failed for ${repo.full_name}:`, detErr)
      }

      const repoSyncData: any = {
        name: repo.name,
        fullName: repo.full_name,
        url: repo.html_url,
        description: repo.description,
        language: repo.language,
        topics: repo.topics,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        isFork: repo.fork,
        isArchived: repo.archived,
        pushedAt: repo.pushed_at,
        syncedAt: syncTimeStr,
        availability: 'available',
      }

      if (detection.languages.length > 0 || detection.detectedTechnologies.length > 0) {
        repoSyncData.languagesData = detection.languages
        repoSyncData.detectedTech = detection.detectedTechnologies
        repoSyncData.techEvidence = detection.evidenceFiles
      }

      if (existing) {
        // Update existing sync record
        await payload.update({
          collection: 'github-repositories',
          id: existing.id,
          data: repoSyncData,
        })

        // If connected to a project, update GitHub metadata and effective technologies
        if (existing.project) {
          const projectId = typeof existing.project === 'object' ? existing.project.id : existing.project
          try {
            const currentProj = await payload.findByID({
              collection: 'projects',
              id: projectId,
            })

            const projUpdateData: any = {
              githubStars: repo.stargazers_count,
              githubForks: repo.forks_count,
              githubPushedAt: repo.pushed_at || '',
              githubSyncedAt: syncTimeStr,
              githubAvailability: 'available',
              isFork: repo.fork,
              isArchived: repo.archived,
              githubFullName: repo.full_name,
              githubLanguage: repo.language || '',
              githubDescription: repo.description || '',
            }

            if (detection.languages.length > 0 || detection.detectedTechnologies.length > 0) {
              projUpdateData.githubLanguages = detection.languages
              projUpdateData.detectedTechnologies = detection.detectedTechnologies
            }

            // Check if technologies should be updated
            // 1. If techMode is 'manual', do NOT touch technologies.
            // 2. If techMode is 'auto' (or undefined):
            //    Check if existing technologies was the old single-language artifact or empty:
            const currentTechList = (currentProj?.technologies || []).map((t: any) =>
              typeof t === 'string' ? t : t.name
            )
            const isSingleOldImport =
              currentTechList.length <= 1 &&
              (currentTechList.length === 0 ||
                currentTechList[0]?.toLowerCase() ===
                  (currentProj?.githubLanguage || repo.language || '').toLowerCase())

            if (
              currentProj?.techMode !== 'manual' &&
              isSingleOldImport &&
              detection.detectedTechnologies.length > 0
            ) {
              projUpdateData.technologies = detection.detectedTechnologies.map((t) => ({ name: t.name }))
              projUpdateData.techMode = 'auto'
            }

            await payload.update({
              collection: 'projects',
              id: projectId,
              data: projUpdateData,
            })
          } catch (projErr) {
            console.error(`Gagal memperbarui metadata GitHub pada proyek ID ${projectId}:`, projErr)
          }
        }
      } else {
        // Insert new sync record
        await payload.create({
          collection: 'github-repositories',
          data: {
            ...repoSyncData,
            repoId: repo.id,
          },
        })
      }

      // Small pause to prevent secondary rate limits
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // 3. Mark repos no longer returned by the complete sync as unavailable (don't delete)
    for (const doc of existingSyncDocs.docs) {
      if (!currentRepoIds.has(doc.repoId) && doc.availability !== 'unavailable') {
        await payload.update({
          collection: 'github-repositories',
          id: doc.id,
          data: {
            availability: 'unavailable',
            syncedAt: syncTimeStr,
          },
        })

        if (doc.project) {
          const projectId = typeof doc.project === 'object' ? doc.project.id : doc.project
          try {
            await payload.update({
              collection: 'projects',
              id: projectId,
              data: {
                githubAvailability: 'unavailable',
                githubSyncedAt: syncTimeStr,
              },
            })
          } catch (e) {
            console.error(`Gagal menandai proyek ID ${projectId} sebagai unavailable:`, e)
          }
        }
      }
    }

    // 4. Update Site Settings with last sync info
    try {
      const currentSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          githubLastSync: syncTimeStr,
          githubSyncCount: repos.length,
          socialLinks: {
            ...(currentSettings?.socialLinks || {}),
            github: 'https://github.com/farisraja',
          },
        },
      })
    } catch (e) {
      // Non-fatal if global update has fields still registering
    }

    return {
      success: true,
      count: repos.length,
      syncedAt: syncTimeStr,
      rateLimit,
      message: `Berhasil menyinkronkan ${repos.length} repository dari GitHub farisraja.`,
    }
  } finally {
    isSyncing = false
  }
}

export async function executeImportAsDraft(payload: Payload, user: any, repoId: number) {
  if (!user) {
    throw new Error('Akses ditolak: Anda harus masuk sebagai admin untuk mengimpor repository.')
  }

  // 1. Find repository in github-repositories
  const repoRes = await payload.find({
    collection: 'github-repositories',
    where: {
      repoId: { equals: repoId },
    },
    limit: 1,
  })

  if (repoRes.docs.length === 0) {
    throw new Error(`Repository dengan ID ${repoId} tidak ditemukan dalam daftar sinkronisasi. Harap sinkronkan terlebih dahulu.`)
  }

  const repo = repoRes.docs[0]

  // Idempotency: If already connected to a project, return existing project
  if (repo.project) {
    const existingId = typeof repo.project === 'object' ? repo.project.id : repo.project
    return {
      success: true,
      alreadyExists: true,
      projectId: existingId,
      message: `Repository "${repo.name}" sudah terhubung dengan Proyek ID ${existingId}.`,
    }
  }

  // 2. Generate unique slug from repo name
  let baseSlug = repo.name
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  if (!baseSlug) {
    baseSlug = `project-${repo.repoId}`
  }

  let finalSlug = baseSlug
  let counter = 1
  while (true) {
    const existingSlug = await payload.find({
      collection: 'projects',
      where: {
        slug: { equals: finalSlug },
      },
      limit: 1,
    })
    if (existingSlug.docs.length === 0) break
    finalSlug = `${baseSlug}-${counter}`
    counter++
  }

  // Detect technologies based on languages API & manifests proof
  let detection: DetectionResult = {
    detectedTechnologies: [],
    languages: [],
    evidenceFiles: [],
  }
  try {
    detection = await detectRepoTechnologies(repo.fullName)
  } catch (e) {
    console.warn(`Detection failed for ${repo.fullName}:`, e)
  }

  const initialTech: Array<{ name: string }> = detection.detectedTechnologies.map((t) => ({ name: t.name }))
  if (initialTech.length === 0 && repo.language && repo.language.trim() !== '') {
    initialTech.push({ name: repo.language.trim() })
  }

  // 3. Create Project strictly as DRAFT (_status: 'draft')
  const createdProject = await payload.create({
    collection: 'projects',
    draft: true,
    data: {
      title: repo.name.replace(/[-_]/g, ' '),
      slug: finalSlug,
      description: repo.description || '',
      summary: repo.description || '',
      repositoryUrl: repo.url,
      websiteUrl: repo.homepage || '',
      technologies: initialTech,
      techMode: 'auto',
      detectedTechnologies: detection.detectedTechnologies,
      githubLanguages: detection.languages,
      githubRepoId: repo.repoId,
      githubFullName: repo.fullName,
      githubUrl: repo.url,
      githubDescription: repo.description || '',
      githubLanguage: repo.language || '',
      githubStars: repo.stars || 0,
      githubForks: repo.forks || 0,
      githubPushedAt: repo.pushedAt || '',
      githubSyncedAt: new Date().toISOString(),
      githubAvailability: 'available',
      isFork: Boolean(repo.isFork),
      isArchived: Boolean(repo.isArchived),
      featured: false,
      sortOrder: 0,
    },
  })

  // 4. Link back to github-repositories
  await payload.update({
    collection: 'github-repositories',
    id: repo.id,
    data: {
      project: createdProject.id,
    },
  })

  return {
    success: true,
    projectId: createdProject.id,
    slug: createdProject.slug,
    message: `Berhasil mengimpor "${repo.name}" sebagai Draf proyek.`,
  }
}

export async function executeImportAllDrafts(payload: Payload, user: any) {
  if (!user) {
    throw new Error('Akses ditolak: Anda harus masuk sebagai admin untuk mengimpor repository.')
  }

  // 1. Fetch all repos from github-repositories
  const repoRes = await payload.find({
    collection: 'github-repositories',
    limit: 500,
    sort: '-pushedAt',
  })

  let importedCount = 0
  let alreadyLinkedCount = 0
  let skippedForkCount = 0
  let skippedArchivedCount = 0
  const details: Array<{
    repoId: number
    name: string
    action: 'imported' | 'already_linked' | 'skipped_fork' | 'skipped_archived'
    projectId?: number | string
  }> = []

  for (const repo of repoRes.docs) {
    // Check if fork or archived
    if (repo.isFork) {
      skippedForkCount++
      details.push({ repoId: repo.repoId, name: repo.name, action: 'skipped_fork' })
      continue
    }
    if (repo.isArchived) {
      skippedArchivedCount++
      details.push({ repoId: repo.repoId, name: repo.name, action: 'skipped_archived' })
      continue
    }

    // Check if already linked or project already exists with this githubRepoId
    if (repo.project) {
      const pId = typeof repo.project === 'object' ? repo.project.id : repo.project
      alreadyLinkedCount++
      details.push({ repoId: repo.repoId, name: repo.name, action: 'already_linked', projectId: pId })
      continue
    }

    const existingProject = await payload.find({
      collection: 'projects',
      where: {
        githubRepoId: { equals: repo.repoId },
      },
      limit: 1,
      draft: true,
    })

    if (existingProject.docs.length > 0) {
      const pId = existingProject.docs[0].id
      // Link back if not linked
      await payload.update({
        collection: 'github-repositories',
        id: repo.id,
        data: { project: pId },
      })
      alreadyLinkedCount++
      details.push({ repoId: repo.repoId, name: repo.name, action: 'already_linked', projectId: pId })
      continue
    }

    // Import as draft
    const res = await executeImportAsDraft(payload, user, repo.repoId)
    if (res.success) {
      importedCount++
      details.push({ repoId: repo.repoId, name: repo.name, action: 'imported', projectId: res.projectId })
    }
  }

  return {
    success: true,
    totalRepos: repoRes.totalDocs,
    importedCount,
    alreadyLinkedCount,
    skippedForkCount,
    skippedArchivedCount,
    details,
    message: `Berhasil mengimpor ${importedCount} repository baru sebagai draf (${alreadyLinkedCount} sudah terhubung, ${skippedForkCount + skippedArchivedCount} fork/arsip dilewati).`,
  }
}

export async function executeLinkToProject(
  payload: Payload,
  user: any,
  repoId: number,
  targetProjectId: number | string
) {
  if (!user) {
    throw new Error('Akses ditolak: Anda harus masuk sebagai admin untuk menghubungkan repository.')
  }

  const numericProjectId = Number(targetProjectId)
  if (isNaN(numericProjectId)) {
    throw new Error(`ID proyek target "${targetProjectId}" tidak valid.`)
  }

  const repoRes = await payload.find({
    collection: 'github-repositories',
    where: {
      repoId: { equals: repoId },
    },
    limit: 1,
  })

  if (repoRes.docs.length === 0) {
    throw new Error(`Repository ID ${repoId} tidak ditemukan.`)
  }

  const repo = repoRes.docs[0]

  // Find target project
  const targetProject = await payload.findByID({
    collection: 'projects',
    id: numericProjectId,
  })

  if (!targetProject) {
    throw new Error(`Proyek target dengan ID ${numericProjectId} tidak ditemukan.`)
  }

  const syncTimeStr = new Date().toISOString()

  // Detect technologies based on languages API & manifests proof
  let detection: DetectionResult = {
    detectedTechnologies: [],
    languages: [],
    evidenceFiles: [],
  }
  try {
    detection = await detectRepoTechnologies(repo.fullName)
  } catch (e) {
    console.warn(`Detection failed for ${repo.fullName}:`, e)
  }

  const projUpdateData: any = {
    repositoryUrl: targetProject.repositoryUrl || repo.url,
    githubRepoId: repo.repoId,
    githubFullName: repo.fullName,
    githubUrl: repo.url,
    githubDescription: repo.description || '',
    githubLanguage: repo.language || '',
    githubStars: repo.stars || 0,
    githubForks: repo.forks || 0,
    githubPushedAt: repo.pushedAt || '',
    githubSyncedAt: syncTimeStr,
    githubAvailability: 'available',
    isFork: Boolean(repo.isFork),
    isArchived: Boolean(repo.isArchived),
  }

  if (detection.languages.length > 0 || detection.detectedTechnologies.length > 0) {
    projUpdateData.githubLanguages = detection.languages
    projUpdateData.detectedTechnologies = detection.detectedTechnologies
  }

  const currentTechList = (targetProject.technologies || []).map((t: any) =>
    typeof t === 'string' ? t : t.name
  )
  const isSingleOldImport =
    currentTechList.length <= 1 &&
    (currentTechList.length === 0 ||
      currentTechList[0]?.toLowerCase() ===
        (targetProject.githubLanguage || repo.language || '').toLowerCase())

  if (
    (targetProject as any).techMode !== 'manual' &&
    isSingleOldImport &&
    detection.detectedTechnologies.length > 0
  ) {
    projUpdateData.technologies = detection.detectedTechnologies.map((t) => ({ name: t.name }))
    projUpdateData.techMode = 'auto'
  }

  // Update project with GitHub metadata (preserves manual title, description, images, status)
  await payload.update({
    collection: 'projects',
    id: numericProjectId,
    data: projUpdateData,
  })

  // Update repo record with project link
  await payload.update({
    collection: 'github-repositories',
    id: repo.id,
    data: {
      project: numericProjectId,
    },
  })

  return {
    success: true,
    projectId: targetProjectId,
    message: `Berhasil menghubungkan repository "${repo.name}" ke proyek "${targetProject.title}".`,
  }
}
