import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { isAdmin } from '../access'
import {
  executeGitHubSync,
  executeImportAsDraft,
  executeImportAllDrafts,
  executeLinkToProject,
} from '../../lib/github-sync'

export const GithubRepositories: CollectionConfig = {
  slug: 'github-repositories',
  labels: {
    singular: 'Repository GitHub',
    plural: 'Repository GitHub',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'language', 'stars', 'forks', 'isFork', 'isArchived', 'availability', 'project'],
    pagination: {
      defaultLimit: 25,
    },
    components: {
      beforeListTable: ['@/components/admin/GitHubSyncControls#GitHubSyncControls'],
    },
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'repoId',
      type: 'number',
      label: 'ID Repository GitHub',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'ID numerik unik resmi dari GitHub.',
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nama Repository',
      required: true,
    },
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name (owner/repo)',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL Repository',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Repository',
    },
    {
      name: 'language',
      type: 'text',
      label: 'Bahasa Utama',
    },
    {
      name: 'topics',
      type: 'json',
      label: 'Topics / Label',
    },
    {
      name: 'homepage',
      type: 'text',
      label: 'Homepage / URL Demo Asli',
    },
    {
      name: 'stars',
      type: 'number',
      label: 'Jumlah Stars',
      defaultValue: 0,
    },
    {
      name: 'forks',
      type: 'number',
      label: 'Jumlah Forks',
      defaultValue: 0,
    },
    {
      name: 'isFork',
      type: 'checkbox',
      label: 'Forked Repository',
      defaultValue: false,
    },
    {
      name: 'isArchived',
      type: 'checkbox',
      label: 'Archived (Diarsipkan)',
      defaultValue: false,
    },
    {
      name: 'pushedAt',
      type: 'text',
      label: 'Waktu Push Terakhir di GitHub',
    },
    {
      name: 'syncedAt',
      type: 'text',
      label: 'Waktu Terakhir Sinkronisasi',
    },
    {
      name: 'availability',
      type: 'select',
      label: 'Status Ketersediaan',
      defaultValue: 'available',
      options: [
        { label: 'Tersedia di GitHub (Available)', value: 'available' },
        { label: 'Tidak Ditemukan / Hilang (Unavailable)', value: 'unavailable' },
      ],
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      label: 'Terhubung ke Proyek Portofolio',
      hasMany: false,
      admin: {
        description: 'Proyek dalam portofolio yang terhubung ke repository ini.',
      },
    },
    {
      name: 'languagesData',
      type: 'json',
      label: 'Daftar Bahasa & Byte',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'detectedTech',
      type: 'json',
      label: 'Teknologi Terdeteksi (Framework & Bahasa)',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'techEvidence',
      type: 'json',
      label: 'Sumber File Bukti Manifest',
      admin: {
        readOnly: true,
      },
    },
  ],
  endpoints: [
    {
      path: '/sync',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Akses ditolak: Anda harus login sebagai admin untuk menyinkronkan GitHub.' },
            { status: 401 }
          )
        }
        try {
          const result = await executeGitHubSync(req.payload, req.user)
          return Response.json(result)
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal menyinkronkan data GitHub.' }, { status: 400 })
        }
      },
    },
    {
      path: '/import',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Akses ditolak: Anda harus login sebagai admin untuk mengimpor repository.' },
            { status: 401 }
          )
        }
        try {
          let body: any = {}
          if (typeof req.json === 'function') {
            body = await req.json().catch(() => ({}))
          } else if ((req as any).data) {
            body = (req as any).data
          }
          const repoId = Number(body.repoId)
          if (!repoId) {
            return Response.json({ error: 'Parameter repoId diperlukan.' }, { status: 400 })
          }
          const result = await executeImportAsDraft(req.payload, req.user, repoId)
          return Response.json(result)
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal mengimpor repository.' }, { status: 400 })
        }
      },
    },
    {
      path: '/import-all',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Akses ditolak: Anda harus login sebagai admin untuk mengimpor repository.' },
            { status: 401 }
          )
        }
        try {
          const result = await executeImportAllDrafts(req.payload, req.user)
          return Response.json(result)
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal mengimpor seluruh repository.' }, { status: 400 })
        }
      },
    },
    {
      path: '/link',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Akses ditolak: Anda harus login sebagai admin untuk menghubungkan repository.' },
            { status: 401 }
          )
        }
        try {
          let body: any = {}
          if (typeof req.json === 'function') {
            body = await req.json().catch(() => ({}))
          } else if ((req as any).data) {
            body = (req as any).data
          }
          const repoId = Number(body.repoId)
          const targetProjectId = body.targetProjectId
          if (!repoId || !targetProjectId) {
            return Response.json(
              { error: 'Parameter repoId dan targetProjectId diperlukan.' },
              { status: 400 }
            )
          }
          const result = await executeLinkToProject(req.payload, req.user, repoId, targetProjectId)
          return Response.json(result)
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal menghubungkan repository.' }, { status: 400 })
        }
      },
    },
    {
      path: '/projects-list',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Akses ditolak: Anda harus login sebagai admin.' },
            { status: 401 }
          )
        }
        try {
          const projs = await req.payload.find({
            collection: 'projects',
            limit: 300,
            sort: 'title',
            draft: true,
          })
          const list = projs.docs.map((p) => {
            const isPub = (p as any)._status === 'published' && (p as any).active !== false
            return {
              id: p.id,
              title: p.title,
              slug: p.slug,
              status: isPub ? 'published' : 'draft',
              active: (p as any).active ?? true,
              featured: Boolean((p as any).featured),
              githubRepoId: (p as any).githubRepoId,
            }
          })
          return Response.json({ projects: list })
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal mengambil daftar proyek.' }, { status: 500 })
        }
      },
    },
    {
      path: '/save-visibility',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Akses ditolak: Anda harus login sebagai admin.' },
            { status: 401 }
          )
        }
        try {
          let body: any = {}
          if (typeof req.json === 'function') {
            body = await req.json().catch(() => ({}))
          } else if ((req as any).data) {
            body = (req as any).data
          }
          const updates = Array.isArray(body.updates) ? body.updates : []
          if (updates.length === 0) {
            return Response.json({ error: 'Data perubahan tidak ditemukan.' }, { status: 400 })
          }

          let publishedCount = 0
          let hiddenCount = 0

          for (const item of updates) {
            const projectId = Number(item.projectId)
            const isVisible = Boolean(item.isVisible)
            if (!projectId) continue

            const targetStatus = isVisible ? 'published' : 'draft'
            const activeVal = isVisible

            // 1. Update via Payload
            await req.payload.update({
              collection: 'projects',
              id: projectId,
              draft: !isVisible,
              data: {
                _status: targetStatus,
                active: activeVal,
              },
            }).catch(() => null)

            // 2. Direct SQL update on database to guarantee 100% synchronization on primary table
            try {
              const dbPool = (req.payload.db as any)?.pool
              if (dbPool && typeof dbPool.query === 'function') {
                await dbPool.query(
                  'UPDATE projects SET _status = $1, active = $2 WHERE id = $3',
                  [targetStatus, activeVal, projectId]
                )
              }
            } catch {
              // Fallback jika database adapter bukan raw pool
            }

            if (isVisible) {
              publishedCount++
            } else {
              hiddenCount++
            }
          }

          // Invalidate Next.js cache
          try {
            revalidatePath('/')
            revalidatePath('/projects')
          } catch {
            // Abaikan jika di luar request cycle
          }

          return Response.json({
            success: true,
            publishedCount,
            hiddenCount,
            message: `Pengaturan visibilitas berhasil disimpan! ${publishedCount} proyek ditampilkan dan ${hiddenCount} proyek disembunyikan di website.`,
          })
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal menyimpan pengaturan visibilitas.' }, { status: 400 })
        }
      },
    },
    {
      path: '/toggle-publish',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Akses ditolak: Anda harus login sebagai admin.' },
            { status: 401 }
          )
        }
        try {
          let body: any = {}
          if (typeof req.json === 'function') {
            body = await req.json().catch(() => ({}))
          } else if ((req as any).data) {
            body = (req as any).data
          }
          const projectId = body.projectId
          if (!projectId) {
            return Response.json({ error: 'Parameter projectId diperlukan.' }, { status: 400 })
          }

          const targetProject = await req.payload.findByID({
            collection: 'projects',
            id: projectId,
            draft: true,
          })

          if (!targetProject) {
            return Response.json({ error: 'Proyek tidak ditemukan.' }, { status: 404 })
          }

          const currentIsPub = (targetProject as any)._status === 'published' && (targetProject as any).active !== false
          const newStatus = currentIsPub ? 'draft' : 'published'
          const newActive = newStatus === 'published'

          await req.payload.update({
            collection: 'projects',
            id: projectId,
            draft: newStatus === 'draft',
            data: {
              _status: newStatus,
              active: newActive,
            },
          }).catch(() => null)

          // Direct SQL update to guarantee 100% sync
          try {
            const dbPool = (req.payload.db as any)?.pool
            if (dbPool && typeof dbPool.query === 'function') {
              await dbPool.query(
                'UPDATE projects SET _status = $1, active = $2 WHERE id = $3',
                [newStatus, newActive, projectId]
              )
            }
          } catch {}

          try {
            revalidatePath('/')
            revalidatePath('/projects')
          } catch {}

          return Response.json({
            success: true,
            projectId,
            newStatus,
            message:
              newStatus === 'published'
                ? `Proyek "${targetProject.title}" sekarang DITAMPILKAN di website.`
                : `Proyek "${targetProject.title}" sekarang DISEMBUNYIKAN dari website.`,
          })
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal mengubah status publikasi proyek.' }, { status: 400 })
        }
      },
    },
    {
      path: '/unlink',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Akses ditolak: Anda harus login sebagai admin.' },
            { status: 401 }
          )
        }
        try {
          let body: any = {}
          if (typeof req.json === 'function') {
            body = await req.json().catch(() => ({}))
          } else if ((req as any).data) {
            body = (req as any).data
          }
          const repoId = Number(body.repoId)
          if (!repoId) {
            return Response.json({ error: 'Parameter repoId diperlukan.' }, { status: 400 })
          }

          const repoRes = await req.payload.find({
            collection: 'github-repositories',
            where: { repoId: { equals: repoId } },
            limit: 1,
          })

          if (repoRes.docs.length === 0) {
            return Response.json({ error: 'Repository tidak ditemukan.' }, { status: 404 })
          }

          const repoDoc = repoRes.docs[0]
          await req.payload.update({
            collection: 'github-repositories',
            id: repoDoc.id,
            data: { project: null },
          })

          return Response.json({
            success: true,
            message: `Hubungan repository "${repoDoc.name}" dengan proyek telah dilepas.`,
          })
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal melepas hubungan repository.' }, { status: 400 })
        }
      },
    },
    {
      path: '/import-publish',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json(
            { error: 'Akses ditolak: Anda harus login sebagai admin.' },
            { status: 401 }
          )
        }
        try {
          let body: any = {}
          if (typeof req.json === 'function') {
            body = await req.json().catch(() => ({}))
          } else if ((req as any).data) {
            body = (req as any).data
          }
          const repoId = Number(body.repoId)
          if (!repoId) {
            return Response.json({ error: 'Parameter repoId diperlukan.' }, { status: 400 })
          }

          const result = await executeImportAsDraft(req.payload, req.user, repoId)
          if (result.projectId) {
            await req.payload.update({
              collection: 'projects',
              id: result.projectId,
              draft: false,
              data: {
                _status: 'published',
              },
            })
          }

          return Response.json({
            ...result,
            message: `Berhasil mengimpor repository dan LANGSUNG DITAMPILKAN di website.`,
          })
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal mengimpor repository.' }, { status: 400 })
        }
      },
    },
  ],
}
