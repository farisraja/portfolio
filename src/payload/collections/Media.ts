import type { CollectionConfig } from 'payload'
import path from 'path'
import { isAdmin, publicReadOnly } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    read: publicReadOnly,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
    ],
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Teks Alternatif (Alt Text)',
      required: false,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Keterangan (Caption)',
      required: false,
    },
  ],
}
