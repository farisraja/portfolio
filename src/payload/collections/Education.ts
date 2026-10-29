import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrFieldPublished } from '../access'

export const Education: CollectionConfig = {
  slug: 'education',
  labels: {
    singular: 'Pendidikan',
    plural: 'Pendidikan',
  },
  admin: {
    useAsTitle: 'school',
    defaultColumns: ['school', 'degree', 'start', 'end', 'published', 'sortOrder'],
  },
  access: {
    read: isAdminOrFieldPublished,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'school',
      type: 'text',
      label: 'Nama Institusi / Universitas',
      required: true,
    },
    {
      name: 'degree',
      type: 'text',
      label: 'Gelar / Program Studi',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      label: 'Tautan Institusi',
      required: false,
    },
    {
      name: 'start',
      type: 'text',
      label: 'Tahun Mulai (misal: 2016)',
      required: false,
    },
    {
      name: 'end',
      type: 'text',
      label: 'Tahun Selesai (misal: 2021)',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Keterangan Tambahan',
      required: false,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Institusi (Media)',
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
