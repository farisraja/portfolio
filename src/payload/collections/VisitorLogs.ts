import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const VisitorLogs: CollectionConfig = {
  slug: 'visitor-logs',
  labels: {
    singular: 'Log Kunjungan',
    plural: 'Riwayat Pengunjung',
  },
  admin: {
    useAsTitle: 'pathname',
    defaultColumns: ['createdAt', 'pathname', 'city', 'countryCode', 'referrerDomain', 'deviceType', 'browser'],
    group: 'Analytics',
    pagination: {
      defaultLimit: 50,
    },
    description: 'Catatan jejak kunjungan pengunjung ke halaman portofolio, CV, dan proyek (Anonim & GDPR-compliant).',
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'pathname',
      type: 'text',
      label: 'Halaman Dituju',
      required: true,
      index: true,
    },
    {
      name: 'referrerDomain',
      type: 'text',
      label: 'Domain Perujuk',
      index: true,
      admin: {
        description: 'Misal: linkedin.com, github.com, google.com, direct',
      },
    },
    {
      name: 'referrer',
      type: 'text',
      label: 'URL Perujuk Lengkap',
    },
    {
      name: 'country',
      type: 'text',
      label: 'Negara',
    },
    {
      name: 'countryCode',
      type: 'text',
      label: 'Kode Negara',
      index: true,
      admin: {
        description: 'Kode 2 huruf (misal: ID, US, SG, JP)',
      },
    },
    {
      name: 'city',
      type: 'text',
      label: 'Kota',
    },
    {
      name: 'region',
      type: 'text',
      label: 'Provinsi / Region',
    },
    {
      name: 'deviceType',
      type: 'select',
      label: 'Tipe Perangkat',
      defaultValue: 'Desktop',
      options: [
        { label: 'Desktop / Laptop', value: 'Desktop' },
        { label: 'Mobile / Smartphone', value: 'Mobile' },
        { label: 'Tablet', value: 'Tablet' },
        { label: 'Bot / Crawler', value: 'Bot' },
        { label: 'Lainnya', value: 'Other' },
      ],
      index: true,
    },
    {
      name: 'browser',
      type: 'text',
      label: 'Browser',
    },
    {
      name: 'os',
      type: 'text',
      label: 'Sistem Operasi',
    },
    {
      name: 'visitorHash',
      type: 'text',
      label: 'ID Pengunjung (Hash Anonim)',
      index: true,
      admin: {
        description: 'SHA-256 hash harian untuk menghitung unique visitors tanpa menyimpan IP mentah.',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent String',
    },
  ],
}
