import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

async function uploadMediaFile(payload: any, filePath: string, alt: string, caption: string, customName: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`)
    return null
  }

  // Check if media already exists with this filename or alt
  const existing = await payload.find({
    collection: 'media',
    where: {
      filename: { equals: customName },
    },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`✓ Media already exists: ${customName} (ID: ${existing.docs[0].id})`)
    return existing.docs[0]
  }

  const fileStats = fs.statSync(filePath)
  const fileBuffer = fs.readFileSync(filePath)

  const doc = await payload.create({
    collection: 'media',
    data: {
      alt,
      caption,
    },
    file: {
      data: fileBuffer,
      mimetype: 'image/png',
      name: customName,
      size: fileStats.size,
    },
  })
  console.log(`✓ Uploaded media: ${customName} (ID: ${doc.id}) -> ${doc.url}`)
  return doc
}

async function updateProjects() {
  console.log('=== MEMULAI UPDATE KARYA & PROYEK TERPILIH ===\n')
  const payload = await getPayload({ config })

  // Base paths
  const frontendScreenshots = 'C:\\laragon\\www\\mkri-id-scorm-frontend-main\\docs\\screenshots'
  const backendScreenshots = 'C:\\laragon\\www\\mkri-id-scorm-backend-main\\docs\\screenshots'

  // 1. Upload Frontend Media
  console.log('1. Mengunggah Aset Media Frontend...')
  const feCover = await uploadMediaFile(
    payload,
    path.join(frontendScreenshots, '01_daftar_materi_scorm.png'),
    'Katalog dan Dashboard Materi SCORM MKLC Mahkamah Konstitusi',
    'Dashboard Katalog Materi SCORM',
    'mklc-fe-01-daftar-materi.png'
  )

  const feGal1 = await uploadMediaFile(
    payload,
    path.join(frontendScreenshots, '02_production_notes_rte_cors.png'),
    'Catatan Produksi SCORM RTE & Same-Origin Reverse Proxy CORS',
    'Arsitektur SCORM RTE & Mitigasi CORS',
    'mklc-fe-02-notes-rte.png'
  )

  const feGal2 = await uploadMediaFile(
    payload,
    path.join(frontendScreenshots, '03_production_notes_multipage_resume.png'),
    'Multi-Page SCO, Resume State & API Matrix',
    'Penanganan Multi-Page SCO & Resume State',
    'mklc-fe-03-multipage-resume.png'
  )

  // 2. Upload Backend Media
  console.log('\n2. Mengunggah Aset Media Backend...')
  const beCover = await uploadMediaFile(
    payload,
    path.join(backendScreenshots, '01_admin_dashboard_overview.png'),
    'Dasbor Eksekutif & Monitoring SCORM MKLC Mahkamah Konstitusi',
    'Dasbor Eksekutif SCORM Simulator & KPI Peserta',
    'mklc-be-01-dashboard-overview.png'
  )

  const beGal1 = await uploadMediaFile(
    payload,
    path.join(backendScreenshots, '02_admin_dashboard_materi_tracking_soal.png'),
    'Ringkasan Materi & Tracking Soal Real-Time',
    'Tracking Soal Kuis & Progres Materi',
    'mklc-be-02-tracking-soal.png'
  )

  const beGal2 = await uploadMediaFile(
    payload,
    path.join(backendScreenshots, '03_manajemen_monitoring_peserta.png'),
    'Direktori & Manajemen Peserta MKLC',
    'Manajemen Peserta & Rekap Nilai KHS',
    'mklc-be-03-manajemen-peserta.png'
  )

  const beGal3 = await uploadMediaFile(
    payload,
    path.join(backendScreenshots, '04_katalog_manajemen_materi.png'),
    'Katalog & Manajemen Materi SCORM Chunked Uploader',
    'Katalog Modul SCORM & Chunked Uploader',
    'mklc-be-04-katalog-materi.png'
  )

  const beGal4 = await uploadMediaFile(
    payload,
    path.join(backendScreenshots, '05_database_pelacakan_scorm_cmi.png'),
    'Database & Pelacakan SCORM CMI Audit Runtime',
    'Inspeksi Variabel CMI Live Runtime',
    'mklc-be-05-cmi-audit.png'
  )

  // 3. Update Project 15 (mklc-scorm-frontend)
  console.log('\n3. Memperbarui Proyek ID 15 (MKLC SCORM Simulator & Frontend Runner)...')
  const feGalleryItems: any[] = []
  if (feGal1) {
    feGalleryItems.push({
      image: feGal1.id,
      imageUrl: feGal1.url,
      caption: 'Arsitektur SCORM RTE & Mitigasi CORS',
      alt: 'Catatan Produksi SCORM RTE & Same-Origin Reverse Proxy CORS',
    })
  }
  if (feGal2) {
    feGalleryItems.push({
      image: feGal2.id,
      imageUrl: feGal2.url,
      caption: 'Penanganan Multi-Page SCO & Resume State',
      alt: 'Multi-Page SCO, Resume State & API Matrix',
    })
  }

  await payload.update({
    collection: 'projects',
    id: 15,
    data: {
      title: 'MKLC SCORM Simulator & Player',
      slug: 'mklc-scorm-frontend',
      dates: 'Sep 2026 - Sekarang',
      projectType: 'Interactive SCORM Runner & Web App',
      role: 'Frontend & SCORM Runtime Developer',
      active: true,
      featured: true,
      sortOrder: 1,
      summary:
        'Aplikasi antarmuka web modern berbasis Next.js 14 App Router & React 18 sebagai SCORM Viewer, Player Interaktif, dan Simulator Runtime SCORM 1.2 & 2004 untuk Pusdik Mahkamah Konstitusi (MKLC).',
      description:
        '**MKLC SCORM Simulator & Frontend Runner** adalah aplikasi antarmuka web modern berbasis **Next.js 14 App Router** dan **React 18** yang berfungsi sebagai SCORM Viewer, Player Interaktif, dan Simulator Runtime SCORM 1.2 & SCORM 2004 untuk Pusat Pembelajaran Digital Mahkamah Konstitusi Republik Indonesia (**MKLC - Mahkamah Konstitusi Learning Center**).\n\nAplikasi ini dirancang khusus untuk memutar paket materi pembelajaran digital interaktif berstandar internasional, mendukung modul kompleks (seperti paket e-learning ASN Berintegritas KPK dan modul hukum acara peradilan konstitusi) secara mandiri dengan pelacakan data CMI *real-time*.',
      problem:
        'Paket pembelajaran e-learning modern berstandar SCORM 1.2 dan SCORM 2004 membutuhkan lingkungan runtime JavaScript (RTE) yang presisi di sisi peramban. Kendala umum yang sering terjadi pada platform LMS mencakup galat "Unable to acquire LMS API" akibat pemisahan origin (CORS) antara antarmuka frontend dan file storage materi, kegagalan navigasi tombol slide berikutnya pada modul multi-halaman bersarang (multi-page SCO iframe unload), serta hilangnya data progres belajar saat pembelajar menutup peramban secara tiba-tiba.',
      myContribution:
        '• Merancang dan mengimplementasikan SCORM Runtime Environment (RTE) mandiri untuk standar SCORM 1.2 (`window.API`) dan SCORM 2004 4th Edition (`window.API_1484_11`) dengan binding multi-window bridge.\n• Mengonfigurasi arsitektur Same-Origin Reverse Proxy via Next.js Rewrites untuk mengeliminasi batasan CORS pada pemuatan aset interaktif SCORM berukuran ratusan Megabyte.\n• Mengatasi isu prematur terminate pada modul multi-page SCO dengan teknik Session Locking (`Object.defineProperty`) dan penangkapan tombol navigasi native `#butNext` / `#butPrevious`.\n• Mengembangkan mekanisme Resume State otomatis berbasis riwayat `cmi.location` & `cmi.suspend_data` serta sistem fast-sync debounce 200ms dengan unmount save flush.\n• Membangun UI Dashboard Katalog Materi, Status Card, dan Live Console inspector menggunakan Bootstrap 5 dan React.',
      features: [
        {
          title: 'SCORM 1.2 & SCORM 2004 Runtime Engine',
          description:
            'Implementasi penuh standar API LMS (LMSInitialize, GetValue, SetValue, Commit, Terminate) yang mendukung materi interaktif KPK dan Mahkamah Konstitusi.',
        },
        {
          title: 'Same-Origin Reverse Proxy (Zero CORS Error)',
          description:
            'Memuat seluruh berkas aset SCORM melalui proxy transparan Next.js sehingga bebas dari restriksi Same-Origin Policy browser.',
        },
        {
          title: 'Multi-Page SCO & Prev/Next Fix',
          description:
            'Penanganan modul bersarang (Storyline/Captivate) tanpa memicu terminate prematur saat perpindahan halaman.',
        },
        {
          title: 'Live CMI Console & Bookmark Resume',
          description:
            'Pemulihan posisi belajar otomatis dan pemantauan variabel CMI secara langsung pada antarmuka pengguna.',
        },
      ],
      results:
        'Menghasilkan simulator dan runner SCORM yang stabil, responsif, dan mampu menjalankan seluruh paket modul kurikulum interaktif MKLC tanpa error CORS maupun kehilangan data progres belajar peserta.',
      techMode: 'manual',
      technologies: [
        { name: 'Next.js' },
        { name: 'React' },
        { name: 'JavaScript' },
        { name: 'Bootstrap' },
        { name: 'SCORM RTE' },
        { name: 'Axios' },
        { name: 'Laravel Sanctum' },
      ],
      image: feCover?.id,
      imageUrl: feCover?.url,
      gallery: feGalleryItems,
      repositoryUrl: 'https://github.com/farisraja/mklc-scorm-frontend',
      websiteUrl: '',
      _status: 'published',
    },
  })
  console.log('✓ Proyek ID 15 berhasil diperbarui & dipublikasikan (Featured: TRUE, SortOrder: 1).')

  // 4. Update Project 14 (mklc-scorm-backend)
  console.log('\n4. Memperbarui Proyek ID 14 (MKLC SCORM Engine & Admin Backend Service)...')
  const beGalleryItems: any[] = []
  if (beGal1) {
    beGalleryItems.push({
      image: beGal1.id,
      imageUrl: beGal1.url,
      caption: 'Tracking Soal Kuis & Progres Materi',
      alt: 'Ringkasan Materi & Tracking Soal Real-Time',
    })
  }
  if (beGal2) {
    beGalleryItems.push({
      image: beGal2.id,
      imageUrl: beGal2.url,
      caption: 'Manajemen Peserta & Rekap Nilai KHS',
      alt: 'Direktori & Manajemen Peserta MKLC',
    })
  }
  if (beGal3) {
    beGalleryItems.push({
      image: beGal3.id,
      imageUrl: beGal3.url,
      caption: 'Katalog Modul SCORM & Chunked Uploader',
      alt: 'Katalog & Manajemen Materi SCORM Chunked Uploader',
    })
  }
  if (beGal4) {
    beGalleryItems.push({
      image: beGal4.id,
      imageUrl: beGal4.url,
      caption: 'Inspeksi Variabel CMI Live Runtime',
      alt: 'Database & Pelacakan SCORM CMI Audit Runtime',
    })
  }

  await payload.update({
    collection: 'projects',
    id: 14,
    data: {
      title: 'MKLC SCORM Engine & Admin Backend',
      slug: 'mklc-scorm-backend',
      dates: 'Sep 2026 - Sekarang',
      projectType: 'LMS Backend & Learning Analytics Dashboard',
      role: 'Backend Developer',
      active: true,
      featured: false,
      sortOrder: 2,
      summary:
        'Layanan backend mandiri untuk Pusdik Mahkamah Konstitusi (MKLC) berbasis Laravel 10 dan PostgreSQL 16 untuk mengelola runtime SCORM 1.2/2004, persistensi CMI, chunked uploader, dan dasbor monitoring pembelajar.',
      description:
        '**MKLC SCORM Engine & Admin Backend Service** adalah layanan backend mandiri untuk **Pusat Pembelajaran Digital Mahkamah Konstitusi Republik Indonesia (MKLC - Mahkamah Konstitusi Learning Center)** yang dibangun dengan **Laravel 10**, **PHP 8.1**, dan basis data relasional **PostgreSQL 16**.\n\nLayanan ini mengelola *runtime execution* SCORM 1.2 dan SCORM 2004, persistensi data model CMI berkinerja tinggi, jembatan event kuis interaktif (*xAPI/H5P Bridge*), pengunggah paket skala besar (*Chunked Resumable Uploader*), otentikasi sesi pembelajar berbasis *Laravel Sanctum*, serta menyediakan Dasbor Administrasi dan Monitoring Pembelajaran Terpadu.',
      problem:
        'Pengelolaan pelatihan digital di lingkungan peradilan membutuhkan sistem terpusat yang mampu mencatat interaksi pembelajar secara mendalam (bukan hanya status lulus/tidak, tetapi butir soal kuis, waktu belajar, dan bookmark lokasi). Selain itu, paket modul SCORM berukuran ratusan Megabyte sering gagal diunggah karena batas memori dan timeout server PHP biasa.',
      myContribution:
        '• Merancang skema basis data PostgreSQL 16 untuk persistensi data model CMI (`scorm_trackings`), log butir interaksi (`scorm_interaction_attempts`), dan manajemen sesi runtime token.\n• Mengembangkan Chunked Resumable Uploader untuk mengunggah paket ZIP SCORM berukuran ratusan MB (seperti modul KPK 342 MB) tanpa risiko PHP timeout atau HTTP payload limits.\n• Mengintegrasikan XML Manifest Parser otomatis untuk mendeteksi versi standar SCORM (1.2 atau 2004) dan menentukan entry point launcher secara otomatis.\n• Membangun Dasbor Administrasi lengkap dengan metrik KPI eksekutif, rekapitulasi Kartu Hasil Studi (KHS), ekspor data CSV, dan live audit CMI inspector.\n• Menyediakan rute REST API terproteksi Laravel Sanctum untuk integrasi mulus dengan frontend Next.js.',
      features: [
        {
          title: 'Dasbor Eksekutif & Monitoring Real-Time',
          description:
            'Metrik KPI peserta, progres materi, rasio kelulusan, dan live feed pengerjaan soal kuis.',
        },
        {
          title: 'Chunked Resumable Uploader & Manifest Parser',
          description:
            'Unggah paket modul SCORM ukuran besar secara bertahap dan parsing otomatis imsmanifest.xml.',
        },
        {
          title: 'Persistensi CMI & Audit Logging',
          description:
            'Penyimpanan variabel CMI (skor, status, lokasi, waktu) berkecepatan tinggi dengan audit inspeksi langsung.',
        },
        {
          title: 'Manajemen Peserta & Ekspor KHS (CSV)',
          description:
            'Rekapitulasi hasil studi pembelajar per modul dan fasilitas ekspor laporan ke berkas CSV.',
        },
      ],
      results:
        'Berhasil menyederhanakan siklus deployment materi pembelajaran MKLC, mengeliminasi kegagalan upload file besar, serta memberikan visibilitas penuh bagi administrator terhadap capaian belajar aparatur.',
      techMode: 'manual',
      technologies: [
        { name: 'Laravel' },
        { name: 'PHP' },
        { name: 'PostgreSQL' },
        { name: 'Blade' },
        { name: 'Laravel Sanctum' },
        { name: 'REST API' },
        { name: 'SCORM CMI' },
      ],
      image: beCover?.id,
      imageUrl: beCover?.url,
      gallery: beGalleryItems,
      repositoryUrl: 'https://github.com/farisraja/mklc-scorm-backend',
      websiteUrl: '',
      _status: 'published',
    },
  })
  console.log('✓ Proyek ID 14 berhasil diperbarui & dipublikasikan (Featured: FALSE, SortOrder: 2).')

  // 5. Update sort order for projects 5, 6, 8, 9
  console.log('\n5. Menyesuaikan Urutan Proyek Lainnya...')
  await payload.update({
    collection: 'projects',
    id: 5,
    data: {
      sortOrder: 3,
      featured: false,
    },
  })
  console.log('✓ PB Cipta Sports -> sortOrder: 3')

  await payload.update({
    collection: 'projects',
    id: 6,
    data: {
      sortOrder: 4,
      featured: false,
    },
  })
  console.log('✓ Elearning Master -> sortOrder: 4')

  await payload.update({
    collection: 'projects',
    id: 8,
    data: {
      sortOrder: 5,
      featured: false,
    },
  })
  console.log('✓ Resume Optimizer -> sortOrder: 5')

  await payload.update({
    collection: 'projects',
    id: 9,
    data: {
      sortOrder: 6,
      featured: false,
    },
  })
  console.log('✓ Analisis Keranjang Belanja 2026 -> sortOrder: 6')

  console.log('\n=== SELURUH PEMBARUAN KARYA & PROYEK TERPILIH SELESAI DENGAN SUKSES ===')
  process.exit(0)
}

await updateProjects()

