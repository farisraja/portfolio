import type { GlobalConfig } from 'payload'
import { isAdmin, publicReadOnly } from '../access'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Profil Pengguna',
  access: {
    read: publicReadOnly,
    update: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Lengkap',
      required: true,
      defaultValue: 'Dillion Verma',
    },
    {
      name: 'initials',
      type: 'text',
      label: 'Inisial Nama (Avatar Fallback)',
      defaultValue: 'DV',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline / Jabatan Utama',
      defaultValue: 'Software Engineer turned Entrepreneur',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Singkat (Hero)',
      defaultValue:
        'Software Engineer turned Entrepreneur. I love building things and helping people. Very active on Twitter.',
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Konten Tentang Saya / Ringkasan (Markdown Didukung)',
      defaultValue:
        'At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lokasi',
      defaultValue: 'San Francisco, CA',
    },
    {
      name: 'locationLink',
      type: 'text',
      label: 'Tautan Google Maps Lokasi',
      defaultValue: 'https://www.google.com/maps/place/sanfrancisco',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Profil (Media)',
      required: false,
    },
    {
      name: 'avatarUrl',
      type: 'text',
      label: 'URL Foto Profil (Fallback Aset Lokal)',
      defaultValue: '/me.png',
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      label: 'Dokumen CV / Resume (PDF)',
      required: false,
    },
    {
      name: 'cvUrl',
      type: 'text',
      label: 'Tautan URL CV Eksternal (Opsional)',
      required: false,
    },
  ],
}
