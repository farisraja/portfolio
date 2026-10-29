import type { CollectionConfig } from 'payload'
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
          })
          const list = projs.docs.map((p) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            githubRepoId: (p as any).githubRepoId,
          }))
          return Response.json({ projects: list })
        } catch (err: any) {
          return Response.json({ error: err.message || 'Gagal mengambil daftar proyek.' }, { status: 500 })
        }
      },
    },
  ],
}
