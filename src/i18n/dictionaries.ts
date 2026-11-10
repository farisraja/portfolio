import { Dictionary, Locale } from './types'

export const dictionaries: Record<Locale, Dictionary> = {
  id: {
    common: {
      language: 'Bahasa',
      indonesian: 'Bahasa Indonesia',
      english: 'English',
      otherLanguages: 'Bahasa Lainnya',
      switchLanguage: 'Ganti Bahasa',
      currentLanguage: 'Bahasa aktif: Indonesia',
      close: 'Tutup',
      translateNotice: 'Pilih bahasa internasional untuk menerjemahkan seluruh halaman:',
    },
    nav: {
      home: 'Beranda',
      projects: 'PROYEK',
      skills: 'KEAHLIAN',
      about: 'TENTANG',
      certificates: 'SERTIFIKASI',
      experience: 'PENGALAMAN',
      contact: 'KONTAK',
      contactMe: 'Hubungi Saya',
      toggleTheme: 'Pengubah Tema',
      cv: 'RESUME / CV',
    },
    hero: {
      typingPhrases: [
        'Web & Software Developer',
        'Spesialis Next.js & React',
        'Full-Stack System Builder',
        'Perekayasa Backend & Database',
      ],
      subtitle:
        'Saya membangun website dan aplikasi modern dengan performa tinggi dan arsitektur teruji.',
      viewProjects: 'Lihat Proyek',
      contactMe: 'Hubungi Saya',
      downloadCv: 'Unduh CV / Resume',
    },
    about: {
      badge: 'Tentang',
      title: 'Tentang Saya',
      summary:
        'Saya lulusan Ilmu Komputer Universitas Pakuan yang berfokus pada pengembangan web dan aplikasi modern dengan performa tinggi. Saya terbiasa menerjemahkan kebutuhan pengguna menjadi fitur yang terstruktur, efisien, dan dapat dikembangkan lebih lanjut.\n\nSaat ini saya berkontribusi aktif sebagai Web Developer di PUSDIK MK, bertanggung jawab dalam pengembangan platform pembelajaran digital MKLC. Peran saya mencakup perancangan fitur, optimasi antarmuka pengguna (UI/UX), integrasi sistem, hingga pengujian fungsional untuk memastikan keandalan platform.',
    },
    experience: {
      badge: 'Pengalaman',
      title: 'Pengalaman',
      present: 'Sekarang',
      roles: {
        pusdikMk: {
          title: 'Web Developer',
          description:
            'Mengembangkan dan mengelola platform pembelajaran digital MKLC (Mahkamah Konstitusi Learning Center), mencakup perancangan antarmuka (UI/UX), integrasi SCORM player, manajemen modul materi, dan pelacakan hasil kuis interaktif.',
        },
        fmipaUnpak: {
          title: 'Staff Administrasi Sistem & Pengelola Data',
          description:
            'Mengelola administrasi sistem akademik digital, pemutakhiran data mahasiswa dan dosen, serta asistensi teknis operasional sistem informasi fakultas.',
        },
        surveyor: {
          title: 'Surveyor Data Lapangan',
          description:
            'Melakukan pengumpulan, validasi, dan pengolahan data lapangan secara terstruktur dengan tingkat akurasi tinggi untuk kebutuhan analisis dan riset.',
        },
      },
    },
    education: {
      badge: 'Pendidikan',
      title: 'Pendidikan',
      present: 'Sekarang',
      degrees: {
        unpak: 'Sarjana Komputer (S.Kom.), Ilmu Komputer',
      },
    },
    skills: {
      badge: 'Keahlian',
      title: 'Keahlian',
      subtitle: 'Teknologi dan perangkat pengembangan perangkat lunak yang saya gunakan sehari-hari.',
    },
    projects: {
      selectedWork: 'SELECTED WORK',
      title: 'Work Gallery',
      description:
        'Eksplorasi sistem perangkat lunak, arsitektur web, dan proyek teknis yang telah saya kembangkan.',
      mode3D: '3D Showcase',
      modeGrid: 'Tampilan Grid',
      viewDetails: 'Lihat Detail Proyek',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      previous: 'Proyek Sebelumnya',
      next: 'Proyek Selanjutnya',
      slideOf: 'dari',
      appPreview: 'Pratinjau Aplikasi',
      projectsMap: {
        'mklc-scorm-frontend': {
          title: 'MKLC SCORM Simulator & Player',
          summary:
            'Platform simulasi dan player modul SCORM interaktif untuk Pusat Pendidikan Pancasila dan Konstitusi Mahkamah Konstitusi RI.',
          description:
            'Platform simulasi dan player modul SCORM interaktif untuk Pusat Pendidikan Pancasila dan Konstitusi Mahkamah Konstitusi RI. Mengintegrasikan SCORM 1.2 RTE, dynamic state tracking, dan dashboard materi interaktif.',
        },
        'mklc-scorm-backend': {
          title: 'MKLC SCORM Engine & Admin Backend',
          summary:
            'Engine backend dan dashboard eksekutif pengelolaan konten SCORM, tracking nilai peserta, dan analitik pembelajaran real-time.',
          description:
            'Backend engine dan dashboard eksekutif pengelolaan konten SCORM, tracking nilai peserta, dan analitik pembelajaran real-time. Dilengkapi manajemen peserta, katalog materi chunked upload, dan audit runtime CMI.',
        },
        'pb-cipta-sports': {
          title: 'PB Cipta Sports',
          summary:
            'Aplikasi web sistem turnamen dan manajemen klub bulutangkis PB Cipta dengan pencatatan skor dan jadwal dinamis.',
          description:
            'Aplikasi web sistem turnamen dan manajemen klub bulutangkis PB Cipta dengan registrasi pemain, pencatatan skor pertandingan real-time, dan penjadwalan liga.',
        },
        'analisis-keranjang-belanja-2026': {
          title: 'Analisis Keranjang Belanja 2026',
          summary:
            'Implementasi algoritma Association Rule Mining (Apriori) untuk analisis pola belanja dan rekomendasi produk retail.',
          description:
            'Implementasi algoritma Association Rule Mining (Apriori) untuk menemukan pola asosiasi transaksi konsumen dan rekomendasi bundling produk retail modern.',
        },
      },
    },
    certificates: {
      badge: 'Sertifikasi',
      title: 'Lisensi & Sertifikasi',
      description:
        'Kredensial profesional dan sertifikasi kompetensi yang telah saya raih untuk memvalidasi keahlian dan standar rekayasa perangkat lunak.',
      tabKhusus: 'Sertifikat Khusus',
      tabUmum: 'Sertifikat Umum',
      tabKhususDesc:
        'Keahlian spesifik seperti rekayasa perangkat lunak, arsitektur backend, machine learning, dan komputasi awan.',
      tabUmumDesc:
        'Pemahaman fondasi pemrograman, version control (Git), metodologi manajemen proyek Agile, dan literasi digital.',
      clickToEnlarge: 'Klik untuk Memperbesar',
      closePreview: 'Tutup Pratinjau',
      credentialIdLabel: 'No. Kredensial',
      verifyOnline: 'Verifikasi Kredensial Online',
      noCertificates: 'Belum Ada Sertifikat di Kategori Ini',
      noCertificatesDesc: 'Sertifikat pada kategori ini akan segera diperbarui.',
      certTranslations: {},
    },
    contact: {
      badge: 'Kontak',
      title: 'Hubungi Saya',
      descriptionPrefix:
        'Tertarik untuk berkolaborasi atau mendiskusikan peluang kerja sama? Silakan hubungi saya melalui',
      orText: 'atau',
      orProfileText: 'atau profil',
      period: '.',
    },
    projectDetail: {
      backToProjects: 'Kembali ke Proyek',
      visitWebsite: 'Kunjungi Website / Demo',
      sourceCode: 'Source Code (GitHub)',
      problemOrNeed: 'Masalah atau Kebutuhan',
      myContribution: 'Kontribusi Saya',
      keyFeatures: 'Fitur Utama',
      technologiesUsed: 'Teknologi yang Digunakan',
      screenshotGallery: 'Galeri Tangkapan Layar',
      clickToEnlarge: 'Klik gambar untuk memperbesar',
      resultsAndLearnings: 'Hasil & Pembelajaran',
      demo: 'Demo',
    },
    footer: {
      rightsReserved: '',
    },
  },

  en: {
    common: {
      language: 'Language',
      indonesian: 'Bahasa Indonesia',
      english: 'English',
      otherLanguages: 'Other Languages',
      switchLanguage: 'Switch Language',
      currentLanguage: 'Active language: English',
      close: 'Close',
      translateNotice: 'Select an international language to translate the entire portfolio:',
    },
    nav: {
      home: 'Home',
      projects: 'PROJECTS',
      skills: 'SKILLS',
      about: 'ABOUT',
      certificates: 'CERTIFICATES',
      experience: 'EXPERIENCE',
      contact: 'CONTACT',
      contactMe: 'Contact Me',
      toggleTheme: 'Theme Toggle',
      cv: 'RESUME / CV',
    },
    hero: {
      typingPhrases: [
        'Web & Software Developer',
        'Next.js & React Specialist',
        'Full-Stack System Builder',
        'Backend & Database Engineer',
      ],
      subtitle:
        'I build modern, high-performance web applications with tested architecture and clean code.',
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      downloadCv: 'Download CV / Resume',
    },
    about: {
      badge: 'About',
      title: 'About Me',
      summary:
        'I am a Computer Science graduate from Universitas Pakuan specializing in high-performance web and modern software engineering. I transform user and business requirements into structured, scalable, and maintainable systems.\n\nCurrently, I actively contribute as a Web Developer at PUSDIK MK, driving the development of the MKLC digital learning platform. My scope includes system architecture, UI/UX optimization, API integrations, and comprehensive end-to-end testing to ensure enterprise reliability.',
    },
    experience: {
      badge: 'Experience',
      title: 'Work Experience',
      present: 'Present',
      roles: {
        pusdikMk: {
          title: 'Web Developer',
          description:
            'Developed and maintained the MKLC (Constitutional Court Learning Center) digital learning platform, encompassing UI/UX engineering, SCORM player integrations, learning module management, and real-time interactive assessment tracking.',
        },
        fmipaUnpak: {
          title: 'System Administration & Data Officer',
          description:
            'Administered academic digital systems, managed student and faculty databases, and provided technical support for faculty operational information systems.',
        },
        surveyor: {
          title: 'Field Data Surveyor',
          description:
            'Conducted structured field data collection, validation, and processing with high precision for analytical and research initiatives.',
        },
      },
    },
    education: {
      badge: 'Education',
      title: 'Education',
      present: 'Present',
      degrees: {
        unpak: 'Bachelor of Computer Science (S.Kom.), Computer Science',
      },
    },
    skills: {
      badge: 'Skills',
      title: 'Skills & Tech Stack',
      subtitle: 'Modern software engineering technologies and tools I leverage in production.',
    },
    projects: {
      selectedWork: 'SELECTED WORK',
      title: 'Work Gallery',
      description:
        'Exploration of software systems, web architectures, and technical projects I have built.',
      mode3D: '3D Showcase',
      modeGrid: 'Grid View',
      viewDetails: 'View Project Details',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      previous: 'Previous Project',
      next: 'Next Project',
      slideOf: 'of',
      appPreview: 'Application Preview',
      projectsMap: {
        'mklc-scorm-frontend': {
          title: 'MKLC SCORM Simulator & Player',
          summary:
            'Interactive SCORM simulation player and learning runtime platform for the Pancasila and Constitution Education Center of the Constitutional Court of the Republic of Indonesia.',
          description:
            'Interactive SCORM simulation player and learning runtime platform for the Pancasila and Constitution Education Center of the Constitutional Court of the Republic of Indonesia. Integrates SCORM 1.2 RTE, dynamic state tracking, and interactive dashboards.',
        },
        'mklc-scorm-backend': {
          title: 'MKLC SCORM Engine & Admin Backend',
          summary:
            'Backend engine and executive dashboard for SCORM content orchestration, participant grade analytics, and real-time LMS tracking.',
          description:
            'Backend engine and executive dashboard for SCORM content orchestration, participant grade analytics, and real-time LMS tracking. Includes participant directories, chunked upload pipelines, and live CMI runtime auditing.',
        },
        'pb-cipta-sports': {
          title: 'PB Cipta Sports',
          summary:
            'Web application for tournament operations and club management of PB Cipta badminton league with real-time scoring and scheduling.',
          description:
            'Web application for tournament operations and club management of PB Cipta badminton league with player registration, real-time match scoring, and dynamic tournament schedules.',
        },
        'analisis-keranjang-belanja-2026': {
          title: 'Market Basket Analysis 2026',
          summary:
            'Implementation of Association Rule Mining (Apriori algorithm) for market basket behavior analysis and retail product recommendations.',
          description:
            'Implementation of Association Rule Mining (Apriori algorithm) to identify consumer purchase transaction patterns and automated product bundle recommendations.',
        },
      },
    },
    certificates: {
      badge: 'Certifications',
      title: 'Licenses & Certifications',
      description:
        'Professional credentials and verified competencies demonstrating technical depth and software engineering standards.',
      tabKhusus: 'Specialized Certificates',
      tabUmum: 'General Certifications',
      tabKhususDesc:
        'Specialized engineering competencies such as software development, cloud computing, backend architecture, and machine learning.',
      tabUmumDesc:
        'Core engineering fundamentals, version control (Git), Agile project management methodologies, and digital literacy.',
      clickToEnlarge: 'Click to Enlarge',
      closePreview: 'Close Preview',
      credentialIdLabel: 'Credential ID',
      verifyOnline: 'Verify Credential Online',
      noCertificates: 'No Certificates in this Category',
      noCertificatesDesc: 'Certificates in this category will be updated shortly.',
      certTranslations: {
        'Kegiatan BEST Seri Ke-7: "Membangun Kesehatan Jangka Panjang melalui Gaya Hidup Aktif"': {
          title: 'BEST Series 7: "Building Long-Term Health through an Active Lifestyle"',
          description:
            'Health and professional work-life balance development program hosted by the Registrar and General Secretariat of the Constitutional Court of the Republic of Indonesia.',
        },
        'Webinar Nasional: "Data Analyst Karir dan Peta Kompetensi Mahasiswa Era Digital"': {
          title: 'National Webinar: "Data Analyst Careers and Competency Mapping in Digital Era"',
          description:
            'National webinar exploring data analytics career roadmaps, structured industry methodologies, and modern analytical toolsets.',
        },
        'Machine learning with Phyton': {
          title: 'Machine Learning with Python',
          description:
            'Foundations of predictive machine learning models, supervised learning, and algorithmic pipelines implemented in Python.',
        },
        'Guide to Vibe Coding in Windsurf': {
          title: 'Guide to Vibe Coding in Windsurf',
          description:
            'Professional certification in AI-assisted software engineering and prompt orchestration using Windsurf IDE.',
        },
        'Data Analysis with Apache Hive': {
          title: 'Data Analysis with Apache Hive',
          description:
            'Enterprise course in large-scale data querying and structured analytics using Apache Hive within the Hadoop ecosystem.',
        },
        'TOEFL Prediction Test (Skor: 500)': {
          title: 'TOEFL Prediction Test (Score: 500)',
          description:
            'Verified English proficiency test credentials achieving an overall score of 500 (Listening: 50, Structure: 53, Reading: 47).',
        },
        'Webinar Series: Blend of IoT and Big Data (A Post-Pandemic Business Adaptation)': {
          title: 'Webinar Series: Blend of IoT and Big Data (A Post-Pandemic Business Adaptation)',
          description:
            'International technology webinar discussing IoT architecture integrations with Big Data pipelines for modern digital businesses.',
        },
        'Webinar Information Technology: Virtual Reality For Future': {
          title: 'Information Technology Webinar: Virtual Reality For Future',
          description:
            'Exploration of Virtual Reality (VR) engineering trends, spatial 3D environments, and next-generation human-computer interfaces.',
        },
        'Financial Literacy and Job Readiness (You RISE Programme)': {
          title: 'Financial Literacy and Job Readiness (You RISE Programme)',
          description:
            'Professional job readiness, career planning, and corporate financial literacy module powered by DBS Foundation and Plan International.',
        },
        'Edsen Hackathon Competition': {
          title: 'Edsen Hackathon Competition',
          description:
            'Competitive programming and hackathon participation developing integrated data and software solutions under rapid prototyping conditions.',
        },
        'Next Generation Cisco IPv6 Training': {
          title: 'Next Generation Cisco IPv6 Training',
          description:
            'Technical routing configuration, IPv6 network transition planning, and infrastructure management across Cisco network hardware.',
        },
        "IEEE Sharing Session: Let's Find Out about Tips on Building a Startup": {
          title: "IEEE Sharing Session: Let's Find Out about Tips on Building a Startup",
          description:
            'Technology product validation, initial startup development frameworks, and digital product scaling strategies.',
        },
        'Webinar TIK: Menjadi Web Developer Kompeten': {
          title: 'ICT Webinar: Becoming a Competent Web Developer',
          description:
            'Modern web engineering industry standards, frontend-backend architectures, and professional developer best practices.',
        },
        'Microsoft Office Desktop Training': {
          title: 'Microsoft Office Desktop Training',
          description:
            'Accredited professional training on Microsoft Office desktop productivity, spreadsheet analytics, and structured report automation.',
        },
        'Computer Science Webinar Series: Creative Developer with Society 5.0': {
          title: 'Computer Science Webinar Series: Creative Developer with Society 5.0',
          description:
            'Computer science series on the evolving role and creative competencies of software developers in the Society 5.0 interconnected era.',
        },
        'Orientasi Bidang Studi (OBS) Ilmu Komputer': {
          title: 'Computer Science Academic Orientation (OBS)',
          description:
            'Academic orientation on computing foundations, computational curriculum, and professional software engineering ethics.',
        },
      },
    },
    contact: {
      badge: 'Contact',
      title: 'Get in Touch',
      descriptionPrefix:
        'Interested in collaborating or discussing technical opportunities? Feel free to reach out via',
      orText: 'or',
      orProfileText: 'or profile',
      period: '.',
    },
    projectDetail: {
      backToProjects: 'Back to Projects',
      visitWebsite: 'Visit Website / Live Demo',
      sourceCode: 'Source Code (GitHub)',
      problemOrNeed: 'Problem & Engineering Challenge',
      myContribution: 'My Engineering Contribution',
      keyFeatures: 'Key Features',
      technologiesUsed: 'Technologies Used',
      screenshotGallery: 'Screenshot Gallery',
      clickToEnlarge: 'Click image to enlarge',
      resultsAndLearnings: 'Key Results & Takeaways',
      demo: 'Demo',
    },
    footer: {
      rightsReserved: '',
    },
  },
}
