import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrFieldPublished } from '../access'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: {
    singular: 'Pengalaman Kerja',
    plural: 'Pengalaman Kerja',
  },
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'title', 'start', 'end', 'isCurrent', 'published', 'sortOrder'],
  },
  access: {
    read: isAdminOrFieldPublished,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      label: 'Nama Perusahaan / Organisasi',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Posisi / Jabatan',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      label: 'Tautan Perusahaan',
      required: false,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lokasi (misal: Remote, San Francisco, CA)',
      required: false,
    },
    {
      name: 'start',
      type: 'text',
      label: 'Waktu Mulai (misal: May 2021)',
      required: false,
    },
    {
      name: 'end',
      type: 'text',
      label: 'Waktu Selesai (misal: Oct 2022)',
      required: false,
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      label: 'Masih Berjalan (Saat Ini)',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Tanggung Jawab & Pencapaian',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Perusahaan (Media)',
      required: false,
    },
    {
      name: 'logoUrl',
      type: 'text',
      label: 'URL Logo (Fallback Aset)',
      required: false,
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Dipublikasikan ke Website',
      defaultValue: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Urutan Tampilan',
      defaultValue: 0,
    },
  ],
}
