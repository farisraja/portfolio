import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrFieldPublished } from '../access'

export const Hackathons: CollectionConfig = {
  slug: 'hackathons',
  labels: {
    singular: 'Hackathon',
    plural: 'Hackathon',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'dates', 'location', 'published', 'sortOrder'],
  },
  access: {
    read: isAdminOrFieldPublished,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nama Hackathon',
      required: true,
    },
    {
      name: 'dates',
      type: 'text',
      label: 'Tanggal / Periode',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lokasi (Kota / Negara)',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Proyek / Keterangan',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar / Logo Hackathon (Media)',
      required: false,
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL Gambar Fallback',
      required: false,
    },
    {
      name: 'mlh',
      type: 'text',
      label: 'Badge MLH URL (opsional)',
      required: false,
    },
    {
      name: 'win',
      type: 'text',
      label: 'Penghargaan / Kategori Juara (opsional)',
      required: false,
    },
    {
      name: 'links',
      type: 'array',
      label: 'Tautan Tambahan (GitHub, Devpost, dll)',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Judul Tautan',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL Tautan',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Ikon (opsional, misal: github, globe)',
          required: false,
        },
      ],
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
