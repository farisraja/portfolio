import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrFieldPublished } from '../access'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  labels: {
    singular: 'Sertifikat',
    plural: 'Sertifikat',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuer', 'category', 'issueDate', 'published', 'sortOrder'],
    pagination: {
      defaultLimit: 25,
    },
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
      label: 'Nama Sertifikat / Kredensial',
      required: true,
    },
    {
      name: 'issuer',
      type: 'text',
      label: 'Institusi Penerbit / Penyelenggara',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori Sertifikat',
      required: true,
      defaultValue: 'khusus',
      options: [
        { label: 'Sertifikat Khusus (Spesialisasi Teknis / Rekayasa)', value: 'khusus' },
        { label: 'Sertifikat Umum (Dasar Pemrograman / Metodologi / Umum)', value: 'umum' },
      ],
      admin: {
        description: 'Pilih apakah sertifikat ini masuk ke kelompok Sertifikat Khusus atau Sertifikat Umum.',
      },
    },
    {
      name: 'issueDate',
      type: 'text',
      label: 'Tanggal / Periode Terbit (misal: Okt 2024 atau 2024)',
      required: true,
    },
    {
      name: 'expiryDate',
      type: 'text',
      label: 'Masa Berlaku (opsional, misal: Okt 2027 atau Tidak Kedaluwarsa)',
      required: false,
    },
    {
      name: 'credentialId',
      type: 'text',
      label: 'Nomor Kredensial / ID Sertifikat',
      required: false,
    },
    {
      name: 'credentialUrl',
      type: 'text',
      label: 'Tautan Verifikasi Online (URL Kredensial)',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi / Ringkasan Materi & Kompetensi',
      required: false,
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Keahlian Terkait (Skills)',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar / Logo Sertifikat (Media)',
      required: false,
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'URL Gambar Alternatif (Fallback)',
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

