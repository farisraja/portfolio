import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrPublished } from '../access'
import { revalidatePath } from 'next/cache'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Proyek',
    plural: 'Proyek',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'dates', 'projectType', 'featured', 'sortOrder', '_status'],
    pagination: {
      defaultLimit: 25,
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: isAdminOrPublished,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        try {
          revalidatePath('/')
          revalidatePath('/projects')
          if (doc?.slug) {
            revalidatePath(`/projects/${doc.slug}`)
          }
          if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
            revalidatePath(`/projects/${previousDoc.slug}`)
          }
        } catch {
          // Abaikan kesalahan cache saat dijalankan di luar siklus HTTP request Next.js (seperti via CLI script)
        }
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Ringkasan',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Judul Proyek',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              label: 'Slug URL',
              required: true,
              unique: true,
              index: true,
            },
            {
              name: 'dates',
              type: 'text',
              label: 'Periode Waktu (misal: 2024 atau Jan 2024 - Sekarang)',
              required: false,
            },
            {
              name: 'projectType',
              type: 'text',
              label: 'Jenis Proyek (misal: Web Application, LMS, Mobile App)',
              required: false,
            },
            {
              name: 'role',
              type: 'text',
              label: 'Peran / Tanggung Jawab Utama (misal: Full Stack Developer)',
              required: false,
            },
            {
              name: 'active',
              type: 'checkbox',
              label: 'Status Aktif',
              defaultValue: true,
            },
            {
              name: 'featured',
              type: 'checkbox',
              label: 'Unggulan (Featured)',
              defaultValue: false,
            },
            {
              name: 'sortOrder',
              type: 'number',
              label: 'Urutan Tampilan',
              defaultValue: 0,
              admin: {
                step: 1,
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              label: 'Ringkasan Singkat (Dibatasi 3 baris di kartu, tampil di atas detail)',
              required: false,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Deskripsi Umum / Ikhtisar Proyek',
              required: false,
              defaultValue: '',
            },
            {
              name: 'websiteUrl',
              type: 'text',
              label: 'URL Website / Demo Publik',
              required: false,
            },
            {
              name: 'repositoryUrl',
              type: 'text',
              label: 'URL Repository (GitHub)',
              required: false,
            },
          ],
        },
        {
          label: 'Studi Kasus',
          fields: [
            {
              name: 'problem',
              type: 'textarea',
              label: 'Masalah atau Kebutuhan',
              required: false,
              admin: {
                description: 'Latar belakang masalah nyata atau kebutuhan pengguna yang ingin diselesaikan oleh aplikasi ini.',
              },
            },
            {
              name: 'myContribution',
              type: 'textarea',
              label: 'Kontribusi Saya',
              required: false,
              admin: {
                description: 'Penjelasan faktual kontribusi langsung yang dikerjakan (arsitektur, fitur, integrasi, antarmuka).',
              },
            },
            {
              name: 'features',
              type: 'array',
              label: 'Fitur Utama',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Nama Fitur',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Keterangan Fitur',
                  required: false,
                },
              ],
            },
            {
              name: 'results',
              type: 'textarea',
              label: 'Hasil atau Pembelajaran',
              required: false,
              admin: {
                description: 'Hasil terukur yang faktual, dampak teknis, atau wawasan dan pengalaman belajar yang diperoleh.',
              },
            },
            {
              name: 'techMode',
              type: 'select',
              label: 'Mode Penentuan Teknologi',
              defaultValue: 'auto',
              options: [
                { label: 'Otomatis (Bahasa + Framework Terdeteksi dari GitHub)', value: 'auto' },
                { label: 'Manual (Gunakan Daftar Pilihan Admin)', value: 'manual' },
              ],
              admin: {
                description: 'Pilih apakah teknologi proyek ditentukan otomatis dari bukti manifest/kode GitHub atau dikelola manual.',
              },
            },
            {
              name: 'technologies',
              type: 'array',
              label: 'Teknologi Terpilih',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Cover Image (Unggahan Media)',
              required: false,
            },
            {
              name: 'imageUrl',
              type: 'text',
              label: 'URL Cover Image Eksternal / Aset Statis (Fallback)',
              required: false,
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Galeri Screenshot & Tampilan Aplikasi',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Gambar Screenshot',
                  required: false,
                },
                {
                  name: 'imageUrl',
                  type: 'text',
                  label: 'URL Gambar Eksternal / Fallback',
                  required: false,
                },
                {
                  name: 'caption',
                  type: 'text',
                  label: 'Keterangan Tampilan (Caption)',
                  required: false,
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Teks Alternatif (Alt Text)',
                  required: false,
                },
              ],
            },
            {
              name: 'video',
              type: 'text',
              label: 'URL Video Demo',
              required: false,
            },
            {
              name: 'videoPoster',
              type: 'upload',
              relationTo: 'media',
              label: 'Poster Video (Thumbnail)',
              required: false,
            },
          ],
        },
        {
          label: 'GitHub',
          fields: [
            {
              name: 'githubRepoId',
              type: 'number',
              label: 'ID Repository GitHub',
              required: false,
              index: true,
              admin: {
                readOnly: true,
                description: 'ID unik numerik repository dari GitHub API.',
              },
            },
            {
              name: 'githubFullName',
              type: 'text',
              label: 'Full Name GitHub',
              required: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'githubUrl',
              type: 'text',
              label: 'URL Asli GitHub',
              required: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'githubDescription',
              type: 'textarea',
              label: 'Deskripsi Asli GitHub',
              required: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'githubLanguage',
              type: 'text',
              label: 'Bahasa Utama GitHub',
              required: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'githubStars',
              type: 'number',
              label: 'Jumlah Stars',
              required: false,
              defaultValue: 0,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'githubForks',
              type: 'number',
              label: 'Jumlah Forks',
              required: false,
              defaultValue: 0,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'isFork',
              type: 'checkbox',
              label: 'Repository Fork',
              required: false,
              defaultValue: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'isArchived',
              type: 'checkbox',
              label: 'Repository Diarsipkan (Archived)',
              required: false,
              defaultValue: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'githubPushedAt',
              type: 'text',
              label: 'Waktu Push Terakhir di GitHub',
              required: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'githubSyncedAt',
              type: 'text',
              label: 'Waktu Terakhir Sinkronisasi',
              required: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'githubAvailability',
              type: 'select',
              label: 'Status Ketersediaan di GitHub',
              defaultValue: 'available',
              options: [
                { label: 'Tersedia (Available)', value: 'available' },
                { label: 'Tidak Tersedia (Unavailable)', value: 'unavailable' },
              ],
              admin: {
                description: 'Jika repository tidak lagi ditemukan saat sinkronisasi, status berubah menjadi tidak tersedia dan tautan source code otomatis disembunyikan.',
              },
            },
            {
              name: 'detectedTechnologies',
              type: 'json',
              label: 'Teknologi Terdeteksi (Bukti Manifest & Kode)',
              admin: {
                readOnly: true,
                description: 'Daftar framework, runtime, dan bahasa yang terbukti dari manifest (package.json, composer.json, dll).',
              },
            },
            {
              name: 'githubLanguages',
              type: 'json',
              label: 'Daftar Bahasa GitHub (Byte & Persentase)',
              admin: {
                readOnly: true,
                description: 'Persentase kode berdasarkan byte yang dikembalikan oleh GitHub Languages API (bukan tingkat keahlian).',
              },
            },
          ],
        },
      ],
    },
  ],
}

