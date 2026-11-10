export type CvLocale = "id" | "en";

export interface CvHeader {
  name: string;
  degreeSuffix: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: {
    label: string;
    url: string;
  };
  github: {
    label: string;
    url: string;
  };
  linkedin: {
    label: string;
    url: string;
  };
}

export interface CvExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface CvEducationItem {
  institution: string;
  degree: string;
  faculty: string;
  period: string;
  location: string;
  gpa?: string;
  honors?: string;
  relevantCoursework?: string[];
}

export interface CvProjectItem {
  title: string;
  role: string;
  period: string;
  technologies: string[];
  description: string;
  highlights: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface CvSkillCategory {
  category: string;
  skills: string[];
}

export interface CvCertificationItem {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface CvLanguageItem {
  language: string;
  proficiency: string;
}

export interface CvContent {
  header: CvHeader;
  summaryTitle: string;
  summary: string;
  educationTitle: string;
  education: CvEducationItem[];
  experienceTitle: string;
  experience: CvExperienceItem[];
  projectsTitle: string;
  projects: CvProjectItem[];
  skillsTitle: string;
  skillCategories: CvSkillCategory[];
  certificationsTitle: string;
  certifications: CvCertificationItem[];
  additionalTitle: string;
  languages: CvLanguageItem[];
  interestsTitle: string;
  interests: string[];
  ui: {
    backToPortfolio: string;
    downloadPdf: string;
    downloadOriginalFile: string;
    printHint: string;
    serifToggle: string;
    sansToggle: string;
    pageCount: string;
  };
}

export const CV_DATA: Record<"id" | "en", CvContent> = {
  id: {
    header: {
      name: "FARIS RAJA ARDANA",
      degreeSuffix: "S.Kom.",
      title: "Web & Software Developer",
      email: "farisraja003@gmail.com",
      phone: "+62 889-8870-0804",
      location: "Bogor / Jakarta, Indonesia",
      website: {
        label: "farisrajaardana.vercel.app",
        url: "https://farisrajaardana.vercel.app",
      },
      github: {
        label: "github.com/farisraja",
        url: "https://github.com/farisraja",
      },
      linkedin: {
        label: "linkedin.com/in/faris-raja-ardana",
        url: "https://www.linkedin.com/in/faris-raja-ardana",
      },
    },
    summaryTitle: "RINGKASAN PROFESIONAL",
    summary:
      "Lulusan Sarjana Komputer (S.Kom., IPK 3,47 / 4,00) dari Universitas Pakuan dengan fokus keahlian pada rekayasa perangkat lunak dan pengembangan web full-stack modern. Berpengalaman langsung dalam merancang antarmuka modular, arsitektur RESTful API, integrasi model bahasa kecerdasan buatan (AI/LLM), serta persistensi basis data relasional menggunakan Next.js, React, Laravel, Python, dan PostgreSQL. Saat ini berkontribusi aktif sebagai Web Developer di PUSDIK Mahkamah Konstitusi RI dalam perancangan dan pemeliharaan platform pembelajaran digital MKLC, mencakup implementasi runtime SCORM player berstandar internasional, optimasi UI/UX, dan pengujian keandalan perangkat lunak berskala enterprise.",
    educationTitle: "PENDIDIKAN",
    education: [
      {
        institution: "Universitas Pakuan",
        degree: "Sarjana Komputer (S.Kom.), Program Studi Ilmu Komputer",
        faculty: "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)",
        period: "Lulus",
        location: "Bogor, Indonesia",
        gpa: "3,47 / 4,00",
        honors: "Predikat Sangat Memuaskan",
        relevantCoursework: [
          "Rekayasa Perangkat Lunak (Software Engineering)",
          "Struktur Data & Algoritma",
          "Basis Data Relasional",
          "Jaringan Komputer",
          "Pengembangan Aplikasi Web",
          "Kecerdasan Buatan & Data Mining",
        ],
      },
    ],
    experienceTitle: "PENGALAMAN KERJA",
    experience: [
      {
        company: "PUSDIK MK (Pusat Pendidikan Pancasila dan Konstitusi Mahkamah Konstitusi RI)",
        role: "Web Developer",
        period: "September 2026 – Sekarang",
        location: "Bogor / Jakarta, Indonesia",
        highlights: [
          "Mengembangkan dan memelihara modul fungsional platform pembelajaran digital MKLC (Mahkamah Konstitusi Learning Center) berbasis Next.js 14 App Router dan Laravel.",
          "Mengimplementasikan simulator runtime mandiri untuk standar SCORM 1.2 (window.API) dan SCORM 2004 (window.API_1484_11) dengan arsitektur multi-window bridge dan auto-resume state berbasis model data CMI (cmi.location & cmi.suspend_data).",
          "Merancang arsitektur Same-Origin Reverse Proxy via Next.js Rewrites guna mengeliminasi kendala CORS saat memuat aset paket materi pembelajaran interaktif berskala besar (300+ MB).",
          "Melaksanakan pengujian fungsional modul pembelajaran, menyusun dokumentasi teknis perbaikan, dan mengoptimasi antarmuka pengguna (UI/UX) untuk memastikan stabilitas dan keandalan sistem.",
        ],
      },
      {
        company: "FMIPA Universitas Pakuan",
        role: "Staff Administrasi Sistem & Pengelola Data",
        period: "2023 – 2024",
        location: "Bogor, Indonesia",
        highlights: [
          "Mengelola administrasi sistem akademik digital fakultas serta memutakhirkan basis data registrasi mahasiswa dan dosen secara berkala.",
          "Membantu operasional dan pemeliharaan sistem informasi perpustakaan digital (Digital Library FMIPA) untuk pengarsipan skripsi, jurnal ilmiah, dan katalogisasi buku berbasis web.",
          "Mendukung kelancaran layanan infrastruktur teknologi informasi fakultas serta membantu penyusunan laporan administratif berkala.",
        ],
      },
      {
        company: "Riset Lapangan Independen (Freelance)",
        role: "Surveyor Data Lapangan",
        period: "April 2026 – Agustus 2026",
        location: "Jakarta, Indonesia",
        highlights: [
          "Melaksanakan pengumpulan data primer, verifikasi lapangan, dan sampling kuantitatif di wilayah DKI Jakarta sesuai parameter metodologi survei.",
          "Memvalidasi integritas dataset lapangan secara ketat untuk menjamin kepatuhan metodologi dan akurasi data sebelum dianalisis.",
        ],
      },
    ],
    projectsTitle: "PROYEK REKAYASA PERANGKAT LUNAK TERPILIH",
    projects: [
      {
        title: "PB Cipta Badminton League Application",
        role: "Full Stack Developer",
        period: "2024",
        technologies: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Supabase", "Express.js"],
        description:
          "Aplikasi web modern untuk manajemen turnamen dan liga bulu tangkis yang mencakup pencatatan skor pertandingan real-time, statistik otomatis, dan papan peringkat (leaderboard).",
        highlights: [
          "Membangun antarmuka pengguna responsif berbasis React dan Tailwind CSS dengan alur administrasi kompetisi yang intuitif bagi panitia dan peserta.",
          "Mengimplementasikan integrasi basis data Supabase (PostgreSQL) untuk sinkronisasi skor langsung, rekap hasil pertandingan, dan kalkulasi klasemen otomatis.",
        ],
        repoUrl: "https://github.com/farisraja/pb-cipta-sports",
        liveUrl: "https://pb-cipta-esports.vercel.app",
      },
      {
        title: "AI Resume Optimizer (ATS Beater)",
        role: "Full Stack & AI Integration Developer",
        period: "2024",
        technologies: ["Python 3.12", "FastAPI", "Google Gemini 1.5 Flash Vision & Pro", "LaTeX", "Vue 3", "PostgreSQL"],
        description:
          "Platform open-source berbasis AI untuk mengoptimalkan resume terhadap deskripsi pekerjaan melalui pencocokan kata kunci kontekstual dan kompilasi otomatis format standar ATS.",
        highlights: [
          "Mengintegrasikan multimodal LLM Google Gemini 1.5 melalui FastAPI backend untuk analisis kesenjangan kualifikasi resume dan scoring kecocokan ATS secara real-time.",
          "Membangun mesin kompilasi otomatis berbasis LaTeX (pdflatex) yang merender output PDF terstruktur standar industri yang ramah sistem Applicant Tracking System.",
        ],
        repoUrl: "https://github.com/farisraja/resume-optimizer",
      },
      {
        title: "MKLC SCORM Platform & Simulation Engine",
        role: "Full Stack SCORM Specialist & System Architect",
        period: "2026",
        technologies: ["Next.js 14", "Laravel 10", "PHP 8.1", "PostgreSQL 16", "SCORM 1.2/2004 RTE", "Docker"],
        description:
          "Platform e-learning dan SCORM runtime engine untuk standardisasi materi pembelajaran interaktif pada Pusat Pendidikan Pancasila dan Konstitusi Mahkamah Konstitusi RI.",
        highlights: [
          "Mengembangkan simulator pemutar SCORM berbasis Next.js 14 App Router yang mendukung API runtime SCORM 1.2 dan 2004 dengan komunikasi lintas-domain.",
          "Membangun backend REST API dengan Laravel 10 dan PostgreSQL yang dilengkapi chunked resumable uploader untuk validasi manifest XML paket konten digital.",
        ],
        repoUrl: "https://github.com/farisraja/mklc-scorm-frontend",
      },
      {
        title: "Analisis Keranjang Belanja (Market Basket Analysis)",
        role: "Web Developer & Data Mining",
        period: "2024",
        technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Vite", "Blade"],
        description:
          "Aplikasi web pengolahan data riwayat transaksi penjualan retail menggunakan algoritma data mining asosiasi untuk menemukan pola afinitas pembelian konsumen.",
        highlights: [
          "Mengimplementasikan pemrosesan data riwayat transaksi retail untuk menghitung metrik support, confidence, dan lift ratio guna mengidentifikasi pola pembelian.",
          "Menyajikan visualisasi rekomendasi penataan tata letak produk pada antarmuka dasbor analitik berbasis web yang responsif.",
        ],
        repoUrl: "https://github.com/farisraja/analisis_keranjang_belanja_2026",
      },
    ],
    skillsTitle: "KEAHLIAN TEKNIS (TECHNICAL SKILLS)",
    skillCategories: [
      {
        category: "Bahasa Pemrograman",
        skills: ["JavaScript (ES6+)", "TypeScript", "PHP", "Python", "SQL", "HTML5", "CSS3"],
      },
      {
        category: "Frontend Development",
        skills: ["Next.js (App Router)", "React", "Vue 3", "Tailwind CSS", "Bootstrap 5", "Vite", "Framer Motion"],
      },
      {
        category: "Backend Development & API",
        skills: ["Laravel (Eloquent, Blade)", "Node.js", "Express.js", "FastAPI (Python)", "CodeIgniter 3", "RESTful APIs", "Laravel Sanctum", "WebSockets"],
      },
      {
        category: "Basis Data & Cloud Storage",
        skills: ["PostgreSQL (Neon Cloud / Local)", "MySQL", "Room Database (Mobile SQLite)", "Google Cloud Storage (GCS)"],
      },
      {
        category: "Arsitektur & Spesialisasi",
        skills: ["Standar E-Learning SCORM 1.2 & 2004 (RTE / CMI)", "LaTeX Typesetting (pdflatex, resume.cls)", "Integrasi AI/LLM (Google Gemini Flash & Pro API)", "UI/UX Engineering & Responsive Design"],
      },
      {
        category: "Alat Pengembangan & DevOps",
        skills: ["Git", "GitHub", "Docker", "Docker Compose", "Vercel", "UV (Python)", "Alembic", "Postman", "VS Code", "Figma"],
      },
      {
        category: "Jaringan & Sistem",
        skills: ["Cisco Networking (IPv6 Routing & Switching Transition)", "Linux/Bash Environment", "Apache Web Server"],
      },
    ],
    certificationsTitle: "SERTIFIKASI & PELATIHAN RESMI",
    certifications: [
      {
        title: "Next Generation Cisco IPv6 Training",
        issuer: "Hendevane Training Partner (HTP)",
        issueDate: "27 Juni 2026",
        credentialId: "HTP202610266907",
        credentialUrl: "http://www.htp.co.id",
      },
      {
        title: "Machine Learning with Python",
        issuer: "freeCodeCamp",
        issueDate: "17 Juni 2026",
        credentialId: "fcc-a8fc185a-266f-4e34-8597-f4ff2ad4d51f",
        credentialUrl: "https://www.freecodecamp.org/certification/fcc-a8fc185a-266f-4e34-8597-f4ff2ad4d51f/machine-learning-with-python-v7",
      },
      {
        title: "Data Analysis with Apache Hive (Big Data Ecosystem)",
        issuer: "Analytics Vidhya",
        issueDate: "17 Juni 2026",
        credentialId: "a2ygol6rie",
      },
      {
        title: "Guide to Vibe Coding in Windsurf (AI-Assisted Software Development)",
        issuer: "Analytics Vidhya",
        issueDate: "17 Juni 2026",
        credentialId: "cty4nxmgii",
      },
      {
        title: "TOEFL Prediction Test (Skor Total: 500 — Listening: 50, Structure: 53, Reading: 47)",
        issuer: "Central Course Kampung Inggris Pare",
        issueDate: "21 Desember 2025",
        credentialId: "2512186187",
      },
      {
        title: "Financial Literacy and Job Readiness (You RISE Programme)",
        issuer: "DBS Foundation & Yayasan Plan International Indonesia",
        issueDate: "17 Juni 2026",
      },
      {
        title: "Webinar TIK: Menjadi Web Developer Kompeten",
        issuer: "Maestro Academy, RTIK Kota Bandar Lampung & PT Winosa Mitra Bharatadjaya",
        issueDate: "20 September 2025",
        credentialId: "5586-3978-3422-2208",
      },
      {
        title: "Edsen Hackathon Competition (Peserta Solusi Rekayasa Perangkat Lunak)",
        issuer: "PT Edsen Gudang Komputerindo",
        issueDate: "Desember 2022",
        credentialId: "013/CERT/EDSEN/HACKATHON/12/2022",
      },
      {
        title: "Microsoft Office Desktop Training (Terakreditasi)",
        issuer: "Trust Training Partners (Microsoft Learning Partner) & Universitas Pakuan",
        issueDate: "28 Oktober 2023",
        credentialId: "23BGD0018",
      },
      {
        title: "Webinar Nasional: Data Analyst Karir dan Peta Kompetensi Mahasiswa Era Digital",
        issuer: "Maestro Academy",
        issueDate: "5 November 2025",
        credentialId: "8607-2057-5571-3330",
      },
      {
        title: "International Webinar Series: Blend of IoT and Big Data (Post-Pandemic Business Adaptation)",
        issuer: "Comstrac-DSC FMIPA Universitas Pakuan & Universiti Tun Hussein Onn Malaysia (UTHM)",
        issueDate: "10 Desember 2020",
        credentialId: "0353/WS.02/COMSTRAC-DSC/FMIPA-UP/XII/2020",
      },
      {
        title: "Webinar Information Technology: Virtual Reality For Future",
        issuer: "Comstrac-DSC FMIPA Universitas Pakuan",
        issueDate: "13 November 2021",
        credentialId: "621/WB/COMSTRAC-DSC/FMIPA-UP/XI/2021",
      },
      {
        title: "IEEE Sharing Session: Tips on Building a Tech Startup",
        issuer: "IEEE Student Branch Universitas Pakuan & FMIPA Unpak",
        issueDate: "03 Oktober 2021",
      },
      {
        title: "Computer Science Webinar Series: Creative Developer with Society 5.0",
        issuer: "Program Studi Ilmu Komputer FMIPA Universitas Pakuan",
        issueDate: "16 Desember 2020",
        credentialId: "175/Webinar1/ILKOM/FMIPA-UP/XII/2020",
      },
      {
        title: "Orientasi Bidang Studi (OBS) Ilmu Komputer",
        issuer: "Program Studi Ilmu Komputer FMIPA Universitas Pakuan",
        issueDate: "15 Desember 2021",
        credentialId: "046/OBS/ILKOM/FMIPA-UP/XII/2021",
      },
    ],
    additionalTitle: "INFORMASI TAMBAHAN",
    languages: [
      { language: "Bahasa Indonesia", proficiency: "Penutur Asli (Native)" },
      { language: "Bahasa Inggris", proficiency: "Kemampuan Kerja Profesional (Skor Prediksi TOEFL: 500)" },
    ],
    interestsTitle: "FOKUS MINAT PROFESIONAL",
    interests: [
      "Arsitektur Web Skalabel & Sistem Terdistribusi",
      "Sistem Pembelajaran Digital Terbuka (SCORM / Open Learning Technologies)",
      "Rekayasa Perangkat Lunak Berbantuan AI (AI-Augmented Development)",
    ],
    ui: {
      backToPortfolio: "Kembali ke Portofolio",
      downloadPdf: "Cetak / Simpan PDF (A4)",
      downloadOriginalFile: "Unduh Berkas PDF (ID)",
      printHint: "Gunakan menu Cetak peramban (Ctrl+P / Cmd+P) untuk menyimpan sebagai PDF standar A4 atau klik unduh berkas di samping.",
      serifToggle: "Klasik (Serif)",
      sansToggle: "Modern (Sans)",
      pageCount: "Dokumen Resmi — Format Standar Harvard (Halaman 1–2)",
    },
  },
  en: {
    header: {
      name: "FARIS RAJA ARDANA",
      degreeSuffix: "B.Comp.Sc.",
      title: "Web & Software Developer",
      email: "farisraja003@gmail.com",
      phone: "+62 889-8870-0804",
      location: "Bogor / Jakarta, Indonesia",
      website: {
        label: "farisrajaardana.vercel.app",
        url: "https://farisrajaardana.vercel.app",
      },
      github: {
        label: "github.com/farisraja",
        url: "https://github.com/farisraja",
      },
      linkedin: {
        label: "linkedin.com/in/faris-raja-ardana",
        url: "https://www.linkedin.com/in/faris-raja-ardana",
      },
    },
    summaryTitle: "PROFESSIONAL SUMMARY",
    summary:
      "Computer Science graduate (Bachelor of Computer Science / S.Kom., GPA 3.47 / 4.00) from Universitas Pakuan specializing in modern web engineering and high-performance full-stack software development. Proven hands-on capability in architecting modular user interfaces, RESTful API integrations, AI/LLM model integrations, and relational database schemas with Next.js, React, Laravel, Python, and PostgreSQL. Currently contributing as a Web Developer at PUSDIK Mahkamah Konstitusi RI, driving the MKLC digital learning platform through SCORM runtime simulators, system integrations, and rigorous end-to-end reliability testing.",
    educationTitle: "EDUCATION",
    education: [
      {
        institution: "Universitas Pakuan",
        degree: "Bachelor of Computer Science (S.Kom.), Computer Science Major",
        faculty: "Faculty of Mathematics and Natural Sciences (FMIPA)",
        period: "Graduated",
        location: "Bogor, Indonesia",
        gpa: "3.47 / 4.00",
        honors: "Highly Satisfactory (Sangat Memuaskan)",
        relevantCoursework: [
          "Software Engineering",
          "Data Structures & Algorithms",
          "Relational Database Systems",
          "Computer Networks",
          "Web Application Development",
          "Artificial Intelligence & Data Mining",
        ],
      },
    ],
    experienceTitle: "PROFESSIONAL EXPERIENCE",
    experience: [
      {
        company: "PUSDIK MK (Center for Pancasila and Constitutional Education, Constitutional Court of RI)",
        role: "Web Developer",
        period: "September 2026 – Present",
        location: "Bogor / Jakarta, Indonesia",
        highlights: [
          "Engineered and maintained core functional modules for the MKLC (Constitutional Court Learning Center) digital learning ecosystem leveraging Next.js 14 App Router and Laravel.",
          "Implemented standalone runtime simulators for SCORM 1.2 (window.API) and SCORM 2004 (window.API_1484_11) specifications featuring multi-window bridges and persistent auto-resume state via CMI data models (cmi.location & cmi.suspend_data).",
          "Architected a custom Same-Origin Reverse Proxy via Next.js Rewrites to eliminate cross-origin (CORS) restrictions when serving 300+ MB interactive judicial training modules.",
          "Conducted comprehensive functional end-to-end testing of learning modules and authored system documentation to ensure operational resilience and zero-downtime reliability.",
        ],
      },
      {
        company: "FMIPA Universitas Pakuan",
        role: "System Administration & Data Officer",
        period: "2023 – 2024",
        location: "Bogor, Indonesia",
        highlights: [
          "Administered faculty digital academic records and maintained student and lecturer database registries with strict verification protocols.",
          "Facilitated operational workflows and digital archiving for the web-based library information system (Digital Library FMIPA) managing theses and academic publications.",
          "Supported faculty IT infrastructure operations and contributed technical assistance for periodic administrative reporting.",
        ],
      },
      {
        company: "Independent Field Research (Freelance)",
        role: "Field Data Surveyor",
        period: "April 2026 – August 2026",
        location: "Jakarta, Indonesia",
        highlights: [
          "Executed structured primary field data collection, verification, and ground-truth validation across designated Jakarta metropolitan districts.",
          "Maintained rigorous data integrity, standardized survey protocols, and quantitative sampling accuracy for analytical research pipelines.",
        ],
      },
    ],
    projectsTitle: "SELECTED SOFTWARE ENGINEERING PROJECTS",
    projects: [
      {
        title: "PB Cipta Badminton League Application",
        role: "Full Stack Developer",
        period: "2024",
        technologies: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Supabase", "Express.js"],
        description:
          "A modern web platform for badminton tournament management, featuring real-time live score updates, automated match statistics, and dynamic tournament leaderboards.",
        highlights: [
          "Engineered a responsive, mobile-first user interface with React and Tailwind CSS providing tournament brackets and intuitive match scorekeeping.",
          "Integrated Supabase (PostgreSQL) backend for real-time live score syncing, automated match logging, and instant tournament standings computation.",
        ],
        repoUrl: "https://github.com/farisraja/pb-cipta-sports",
        liveUrl: "https://pb-cipta-esports.vercel.app",
      },
      {
        title: "AI Resume Optimizer (ATS Beater)",
        role: "Full Stack & AI Integration Developer",
        period: "2024",
        technologies: ["Python 3.12", "FastAPI", "Google Gemini 1.5 Flash Vision & Pro", "LaTeX", "Vue 3", "PostgreSQL"],
        description:
          "An open-source AI platform that optimizes professional resumes against target job descriptions via contextual semantic matching and automated ATS-standard rendering.",
        highlights: [
          "Integrated Google Gemini 1.5 LLMs through a FastAPI backend for real-time semantic gap analysis, keyword density scoring, and tailored resume optimization.",
          "Developed an automated headless compilation pipeline using LaTeX (pdflatex) that outputs structured, high-conversion ATS-friendly PDF documents.",
        ],
        repoUrl: "https://github.com/farisraja/resume-optimizer",
      },
      {
        title: "MKLC SCORM Platform & Simulation Engine",
        role: "Full Stack SCORM Specialist & System Architect",
        period: "2026",
        technologies: ["Next.js 14", "Laravel 10", "PHP 8.1", "PostgreSQL 16", "SCORM 1.2/2004 RTE", "Docker"],
        description:
          "Enterprise e-learning platform and SCORM runtime engine standardizing interactive judicial education for the Constitutional Court of Indonesia's Training Center.",
        highlights: [
          "Developed an interactive LMS player environment using Next.js 14 App Router supporting SCORM 1.2 and 2004 RTE specifications and test suites.",
          "Engineered high-performance REST APIs with Laravel 10 & PostgreSQL featuring chunked resumable file uploaders for unpacking and parsing courseware XML manifests.",
        ],
        repoUrl: "https://github.com/farisraja/mklc-scorm-frontend",
      },
      {
        title: "Retail Market Basket Analysis Platform",
        role: "Web Developer & Data Mining",
        period: "2024",
        technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Vite", "Blade"],
        description:
          "Data mining web platform analyzing retail transaction histories with association rule mining algorithms to identify consumer purchasing behavior and product affinities.",
        highlights: [
          "Engineered transaction processing pipeline calculating support, confidence, and lift ratio metrics to extract actionable item association rules.",
          "Delivered interactive analytical dashboard visualizing cross-merchandising suggestions and optimized store product placement layouts.",
        ],
        repoUrl: "https://github.com/farisraja/analisis_keranjang_belanja_2026",
      },
    ],
    skillsTitle: "TECHNICAL SKILLS",
    skillCategories: [
      {
        category: "Programming Languages",
        skills: ["JavaScript (ES6+)", "TypeScript", "PHP", "Python", "SQL", "HTML5", "CSS3"],
      },
      {
        category: "Frontend Development",
        skills: ["Next.js (App Router)", "React", "Vue 3", "Tailwind CSS", "Bootstrap 5", "Vite", "Framer Motion"],
      },
      {
        category: "Backend Development & APIs",
        skills: ["Laravel (Eloquent, Blade)", "Node.js", "Express.js", "FastAPI (Python)", "CodeIgniter 3", "RESTful APIs", "Laravel Sanctum", "WebSockets"],
      },
      {
        category: "Databases & Storage",
        skills: ["PostgreSQL (Neon Cloud / Local)", "MySQL", "Room Database (Mobile SQLite)", "Google Cloud Storage (GCS)"],
      },
      {
        category: "Architectures & Specializations",
        skills: ["SCORM 1.2 & 2004 E-Learning Standards (RTE / CMI)", "LaTeX Typesetting (pdflatex, resume.cls)", "AI/LLM Model Integrations (Google Gemini Flash & Pro API)", "UI/UX Engineering & Responsive Architecture"],
      },
      {
        category: "Developer Tools & DevOps",
        skills: ["Git", "GitHub", "Docker", "Docker Compose", "Vercel", "UV (Python)", "Alembic", "Postman", "VS Code", "Figma"],
      },
      {
        category: "Networking & Infrastructure",
        skills: ["Cisco Networking (IPv6 Routing & Switching Transition)", "Linux/Bash Environment", "Apache Web Server"],
      },
    ],
    certificationsTitle: "VERIFIED CERTIFICATIONS & TRAINING",
    certifications: [
      {
        title: "Next Generation Cisco IPv6 Training",
        issuer: "Hendevane Training Partner (HTP)",
        issueDate: "June 2026",
        credentialId: "HTP202610266907",
        credentialUrl: "http://www.htp.co.id",
      },
      {
        title: "Machine Learning with Python",
        issuer: "freeCodeCamp",
        issueDate: "June 2026",
        credentialId: "fcc-a8fc185a-266f-4e34-8597-f4ff2ad4d51f",
        credentialUrl: "https://www.freecodecamp.org/certification/fcc-a8fc185a-266f-4e34-8597-f4ff2ad4d51f/machine-learning-with-python-v7",
      },
      {
        title: "Data Analysis with Apache Hive (Big Data Ecosystem)",
        issuer: "Analytics Vidhya",
        issueDate: "June 2026",
        credentialId: "a2ygol6rie",
      },
      {
        title: "Guide to Vibe Coding in Windsurf (AI-Assisted Software Development)",
        issuer: "Analytics Vidhya",
        issueDate: "June 2026",
        credentialId: "cty4nxmgii",
      },
      {
        title: "TOEFL Prediction Test (Total Score: 500 — Listening: 50, Structure: 53, Reading: 47)",
        issuer: "Central Course Kampung Inggris Pare",
        issueDate: "December 2025",
        credentialId: "2512186187",
      },
      {
        title: "Financial Literacy and Job Readiness (You RISE Programme)",
        issuer: "DBS Foundation & Plan International Indonesia Foundation",
        issueDate: "June 2026",
      },
      {
        title: "ICT Webinar: Becoming a Competent Web Developer",
        issuer: "Maestro Academy, RTIK Bandar Lampung & PT Winosa Mitra Bharatadjaya",
        issueDate: "September 2025",
        credentialId: "5586-3978-3422-2208",
      },
      {
        title: "Edsen Hackathon Competition (Software Solution Participant)",
        issuer: "PT Edsen Gudang Komputerindo",
        issueDate: "December 2022",
        credentialId: "013/CERT/EDSEN/HACKATHON/12/2022",
      },
      {
        title: "Microsoft Office Desktop Training (Accredited Certification)",
        issuer: "Trust Training Partners (Microsoft Learning Partner) & Universitas Pakuan",
        issueDate: "October 2023",
        credentialId: "23BGD0018",
      },
      {
        title: "National Webinar: Data Analyst Career & Student Competencies in the Digital Era",
        issuer: "Maestro Academy",
        issueDate: "November 2025",
        credentialId: "8607-2057-5571-3330",
      },
      {
        title: "International Webinar Series: Blend of IoT and Big Data (Post-Pandemic Business Adaptation)",
        issuer: "Comstrac-DSC FMIPA Universitas Pakuan & Universiti Tun Hussein Onn Malaysia (UTHM)",
        issueDate: "December 2020",
        credentialId: "0353/WS.02/COMSTRAC-DSC/FMIPA-UP/XII/2020",
      },
      {
        title: "Webinar Information Technology: Virtual Reality For Future",
        issuer: "Comstrac-DSC FMIPA Universitas Pakuan",
        issueDate: "November 2021",
        credentialId: "621/WB/COMSTRAC-DSC/FMIPA-UP/XI/2021",
      },
      {
        title: "IEEE Sharing Session: Tips on Building a Tech Startup",
        issuer: "IEEE Student Branch Universitas Pakuan & FMIPA Unpak",
        issueDate: "October 2021",
      },
      {
        title: "Computer Science Webinar Series: Creative Developer with Society 5.0",
        issuer: "Department of Computer Science FMIPA Universitas Pakuan",
        issueDate: "December 2020",
        credentialId: "175/Webinar1/ILKOM/FMIPA-UP/XII/2020",
      },
      {
        title: "Computer Science Academic Orientation Program (OBS)",
        issuer: "Department of Computer Science FMIPA Universitas Pakuan",
        issueDate: "December 2021",
        credentialId: "046/OBS/ILKOM/FMIPA-UP/XII/2021",
      },
    ],
    additionalTitle: "ADDITIONAL INFORMATION",
    languages: [
      { language: "Indonesian", proficiency: "Native" },
      { language: "English", proficiency: "Professional Working Proficiency (TOEFL Prediction Score: 500)" },
    ],
    interestsTitle: "AREAS OF PROFESSIONAL INTEREST",
    interests: [
      "Scalable Cloud Architecture & Distributed Systems",
      "Open E-Learning Ecosystems (SCORM / Open Learning Technologies)",
      "AI-Augmented Software Engineering (LLM Tool-Calling & Automation)",
    ],
    ui: {
      backToPortfolio: "Back to Portfolio",
      downloadPdf: "Print / Save as PDF (A4)",
      downloadOriginalFile: "Download PDF File (EN)",
      printHint: "Use browser print (Ctrl+P / Cmd+P) to save as an official Harvard-style A4 PDF or download the file directly.",
      serifToggle: "Classic (Serif)",
      sansToggle: "Modern (Sans)",
      pageCount: "Official Document — Harvard Resume Standard (Pages 1–2)",
    },
  },
};
