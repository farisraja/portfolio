import type { GlobalConfig } from 'payload'
import { isAdmin, publicReadOnly } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  access: {
    read: publicReadOnly,
    update: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama Situs / Portofolio',
      required: true,
      defaultValue: 'Dillion Verma',
    },
    {
      name: 'ownerName',
      type: 'text',
      label: 'Nama Pemilik Portofolio',
      required: true,
      defaultValue: 'Dillion Verma',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Gelar / Jabatan Pemilik',
      defaultValue: 'Software Engineer turned Entrepreneur',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi SEO / Metadata',
      defaultValue:
        'Software Engineer turned Entrepreneur. I love building things and helping people. Very active on Twitter.',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Domain Publik (Canonical URL)',
      defaultValue: 'https://dillion.io',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Alamat Email Kontak',
      defaultValue: 'hello@example.com',
    },
    {
      name: 'tel',
      type: 'text',
      label: 'Nomor Telepon',
      defaultValue: '+123456789',
    },
    {
      name: 'whatsapp',
      type: 'text',
      label: 'Nomor WhatsApp (Format internasional, misal: 628123456789 atau +628123456789)',
      admin: {
        description:
          'Jika diisi, tombol kontak WhatsApp akan otomatis ditampilkan di bagian Get In Touch.',
      },
    },
    {
      name: 'whatsappMessage',
      type: 'text',
      label: 'Pesan Awal WhatsApp Otomatis (Opsional)',
      defaultValue: 'Halo, saya tertarik dengan portofolio Anda.',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Tautan Media Sosial',
      fields: [
        {
          name: 'github',
          type: 'text',
          label: 'URL GitHub',
          defaultValue: 'https://github.com/farisraja',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'URL Instagram',
          defaultValue: 'https://www.instagram.com/frardana/',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'URL LinkedIn',
          defaultValue: 'https://www.linkedin.com/in/faris-raja-ardana',
        },
        {
          name: 'x',
          type: 'text',
          label: 'URL X (Twitter)',
          defaultValue: '',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'URL YouTube',
          defaultValue: 'https://dub.sh/dillion-youtube',
        },
      ],
    },
    {
      name: 'githubLastSync',
      type: 'text',
      label: 'Waktu Terakhir Sinkronisasi GitHub',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'githubSyncCount',
      type: 'number',
      label: 'Jumlah Repository Tersinkronisasi',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Pratinjau Sosial (Open Graph Default)',
      required: false,
    },
  ],
}
