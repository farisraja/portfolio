import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Pengguna',
    plural: 'Pengguna',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'roles'],
  },
  auth: true,
  access: {
    // Only authenticated users can read users list
    read: isAdmin,
    // Only authenticated users can create other users (prevents public signups)
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Lengkap',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      label: 'Peran',
      defaultValue: 'admin',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
      access: {
        update: ({ req: { user } }) => Boolean(user),
      },
    },
  ],
}
