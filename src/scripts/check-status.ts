import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const payload = await getPayload({ config })

  const projects = await payload.find({ collection: 'projects', limit: 100, draft: true })
  console.log('=== DATA PROJECTS SAAT INI ===')
  console.log('Total Projects in DB (draft+published):', projects.totalDocs)
  projects.docs.forEach((p, idx) => {
    console.log(`${idx + 1}. [ID: ${p.id}] "${p.title}" | Status: ${p._status} | githubRepoId: ${(p as any).githubRepoId || '-'}`)
  })

  const repos = await payload.find({ collection: 'github-repositories', limit: 100 })
  console.log('\n=== DATA GITHUB REPOSITORIES SAAT INI ===')
  console.log('Total GitHub Repos in DB:', repos.totalDocs)
  repos.docs.forEach((r, idx) => {
    const projId = r.project ? (typeof r.project === 'object' ? r.project.id : r.project) : null
    console.log(`${idx + 1}. [ID: ${r.repoId}] ${r.name} | Availability: ${r.availability} | Fork: ${r.isFork} | Archived: ${r.isArchived} | Linked Project: ${projId || '-'}`)
  })

  process.exit(0)
}

await main()
