import type { CollectionConfig } from 'payload'
import { isAdmin, publicReadOnly } from '../access'

export const Skills: CollectionConfig = {
  slug: 'skills',
  labels: {
    singular: 'Keahlian',
    plural: 'Keahlian',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'sortOrder'],
  },
  access: {
    read: publicReadOnly,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Keahlian / Teknologi',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      label: 'Kategori (misal: Frontend, Backend, DevOps)',
      required: false,
    },
    {
      name: 'iconKey',
      type: 'text',
      label: 'Kunci Ikon SVG (misal: React, Next.js, Typescript, Postgres, Docker)',
      required: false,
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Urutan Tampilan',
      defaultValue: 0,
    },
  ],
}
