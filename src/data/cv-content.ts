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
      "Lulusan Sarjana Ilmu Komputer (S.Kom., IPK 3,47 / 4,00) dari Universitas Pakuan yang berfokus pada rekayasa web dan pengembangan perangkat lunak modern berkinerja tinggi. Memiliki pengalaman praktis dalam merancang antarmuka terstruktur, arsitektur RESTful API, dan basis data relasional menggunakan Next.js, React, Laravel, dan PostgreSQL. Saat ini berkontribusi aktif sebagai Web Developer di PUSDIK Mahkamah Konstitusi RI dalam pengembangan ekosistem platform pembelajaran digital MKLC, mencakup implementasi runtime SCORM player, integrasi sistem, dan pengujian keandalan perangkat lunak.",
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
          "Rekayasa Perangkat Lunak",
          "Struktur Data & Algoritma",
          "Basis Data Relasional",
          "Jaringan Komputer",
          "Pengembangan Aplikasi Web",
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
          "Mengembangkan dan memelihara fitur platform pembelajaran digital MKLC (Mahkamah Konstitusi Learning Center) berbasis Next.js dan Laravel.",
          "Mengimplementasikan simulator runtime SCORM 1.2 dan SCORM 2004 mandiri untuk memfasilitasi pemutaran modul pelatihan aparatur peradilan serta pelacakan data CMI secara real-time.",
          "Mengoptimalkan antarmuka pengguna (UI/UX) dan mengonfigurasi arsitektur Same-Origin Reverse Proxy untuk mengatasi batasan CORS pada aset SCORM interaktif berukuran besar.",
          "Melaksanakan pengujian fungsional modul pembelajaran dan menyusun dokumentasi perbaikan guna menjamin keandalan dan stabilitas sistem.",
        ],
      },
      {
        company: "FMIPA Universitas Pakuan",
        role: "Staff Administrasi Sistem & Pengelola Data",
        period: "2023 – 2024",
        location: "Bogor, Indonesia",
        highlights: [
          "Mengelola administrasi sistem akademik digital fakultas serta melakukan pemutakhiran basis data mahasiswa dan dosen secara berkala.",
          "Membantu operasional sistem informasi arsip dan pendataan perpustakaan berbasis web.",
          "Mendukung kelancaran layanan teknologi informasi fakultas serta asistensi teknis penyusunan laporan administrasi.",
        ],
      },
      {
        company: "Surveyor Lapangan (Freelance)",
        role: "Surveyor Data Lapangan",
        period: "April 2026 – Agustus 2026",
        location: "Jakarta, Indonesia",
        highlights: [
          "Melaksanakan pengumpulan, verifikasi, dan validasi data primer lapangan secara terstruktur di area DKI Jakarta.",
          "Memastikan integritas, kepatuhan metodologi, dan akurasi dataset survei untuk kebutuhan analisis riset kuantitatif.",
        ],
      },
    ],
    projectsTitle: "PROYEK TERPILIH",
    projects: [
      {
        title: "MKLC SCORM Simulator & Player",
        role: "Frontend & SCORM Runtime Developer",
        period: "Sep 2026 – Sekarang",
        technologies: ["Next.js 14", "React 18", "TypeScript", "SCORM RTE", "Bootstrap 5", "Axios"],
        description:
          "Aplikasi antarmuka web sebagai viewer interaktif dan runner SCORM 1.2 & 2004 untuk Pusdik Mahkamah Konstitusi RI.",
        highlights: [
          "Merancang runtime multi-window bridge (`window.API` & `window.API_1484_11`) dengan mekanisme auto-resume berbasis `cmi.location` & `cmi.suspend_data`.",
          "Mengonfigurasi Next.js Rewrites reverse proxy untuk eliminasi limitasi CORS aset modul pelatihan eksternal.",
        ],
        repoUrl: "https://github.com/farisraja/mklc-scorm-frontend",
      },
      {
        title: "MKLC SCORM Engine & Admin Backend",
        role: "Backend Developer",
        period: "Sep 2026 – Sekarang",
        technologies: ["Laravel 10", "PHP 8.1", "PostgreSQL 16", "Laravel Sanctum", "REST API", "SCORM CMI"],
        description:
          "Layanan backend mandiri untuk mengelola runtime eksekusi SCORM, persistensi data CMI, dan autentikasi token pembelajar.",
        highlights: [
          "Merancang skema relasional PostgreSQL 16 untuk persistensi data model CMI (`scorm_trackings`) dan pencatatan interaksi evaluasi.",
          "Mengembangkan Chunked Resumable Uploader untuk memproses paket modul pembelajaran ZIP berukuran 300+ MB tanpa kendala timeout server.",
        ],
        repoUrl: "https://github.com/farisraja/mklc-scorm-backend",
      },
      {
        title: "PB Cipta Sports League Application",
        role: "Full Stack Developer",
        period: "2024",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Supabase", "Express"],
        description:
          "Aplikasi web modern untuk manajemen turnamen bulu tangkis, pencatatan skor pertandingan, dan pembaruan leaderboard otomatis.",
        highlights: [
          "Membangun antarmuka responsif dengan Tailwind CSS dan manajemen state kompetisi secara terpusat.",
          "Mengintegrasikan autentikasi tertutup dan basis data cloud untuk keamanan data statistik turnamen.",
        ],
        liveUrl: "https://pb-cipta-esports.vercel.app",
        repoUrl: "https://github.com/farisraja/pb-cipta-sports",
      },
      {
        title: "Analisis Keranjang Belanja (Market Basket Analysis)",
        role: "Web Developer",
        period: "2024",
        technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Blade"],
        description:
          "Aplikasi web pengolahan data transaksi retail menggunakan algoritma asosiasi untuk menganalisis pola pembelian konsumen.",
        highlights: [
          "Mengimplementasikan pemrosesan data riwayat transaksi penjualan untuk menghasilkan aturan asosiasi produk yang relevan.",
          "Menyajikan visualisasi metrik support, confidence, dan rekomendasi penataan produk pada antarmuka admin.",
        ],
        repoUrl: "https://github.com/farisraja/analisis_keranjang_belanja_2026",
      },
    ],
    skillsTitle: "KEAHLIAN TEKNIS",
    skillCategories: [
      {
        category: "Bahasa Pemrograman",
        skills: ["JavaScript (ES6+)", "TypeScript", "PHP", "Python", "SQL"],
      },
      {
        category: "Frontend Development",
        skills: ["Next.js (App Router)", "React", "Tailwind CSS", "Bootstrap", "Vue.js", "HTML5", "CSS3"],
      },
      {
        category: "Backend & Arsitektur API",
        skills: ["Laravel", "Node.js", "Express", "CodeIgniter 3", "RESTful API", "Laravel Sanctum", "SCORM RTE Bridge"],
      },
      {
        category: "Pengelolaan Basis Data",
        skills: ["PostgreSQL", "MySQL", "Room Database (Mobile SQLite)"],
      },
      {
        category: "Alat Pengembangan & Workflow",
        skills: ["Git", "GitHub", "Vite", "Vercel", "Docker", "VS Code", "Figma", "Postman", "Windsurf AI"],
      },
      {
        category: "Spesialisasi Domain",
        skills: ["Standar E-Learning SCORM 1.2 & 2004", "UI/UX Engineering", "Responsive Web Architecture"],
      },
    ],
    certificationsTitle: "SERTIFIKASI & PELATIHAN",
    certifications: [
      {
        title: "Next Generation Cisco IPv6 Training",
        issuer: "Hendevane Training Partner (HTP)",
        issueDate: "Juni 2026",
        credentialId: "HTP202610266907",
        credentialUrl: "http://www.htp.co.id",
      },
      {
        title: "Machine Learning with Python",
        issuer: "freeCodeCamp",
        issueDate: "Juni 2026",
        credentialId: "fcc-a8fc185a-266f-4e34-8597-f4ff2ad4d51f",
        credentialUrl: "https://www.freecodecamp.org/certification/fcc-a8fc185a-266f-4e34-8597-f4ff2ad4d51f/machine-learning-with-python-v7",
      },
      {
        title: "Data Analysis with Apache Hive",
        issuer: "Analytics Vidhya",
        issueDate: "Juni 2026",
        credentialId: "a2ygol6rie",
      },
      {
        title: "Guide to Vibe Coding in Windsurf (AI-Assisted Software Development)",
        issuer: "Analytics Vidhya",
        issueDate: "Juni 2026",
        credentialId: "cty4nxmgii",
      },
      {
        title: "TOEFL Prediction Test (Skor Total: 500)",
        issuer: "Central Course Kampung Inggris Pare",
        issueDate: "Desember 2025",
        credentialId: "2512186187",
      },
      {
        title: "Financial Literacy and Job Readiness (You RISE Programme)",
        issuer: "DBS Foundation & Yayasan Plan International Indonesia",
        issueDate: "Juni 2026",
      },
      {
        title: "Webinar TIK: Menjadi Web Developer Kompeten",
        issuer: "Maestro Academy & RTIK Kota Bandar Lampung",
        issueDate: "September 2025",
        credentialId: "5586-3978-3422-2208",
      },
      {
        title: "Edsen Hackathon Competition (Peserta Rekayasa Perangkat Lunak)",
        issuer: "PT Edsen Gudang Komputerindo",
        issueDate: "Desember 2022",
        credentialId: "013/CERT/EDSEN/HACKATHON/12/2022",
      },
      {
        title: "Microsoft Office Desktop Training (Terakreditasi)",
        issuer: "Trust Training Partners (Microsoft Learning Partner) & Universitas Pakuan",
        issueDate: "Oktober 2023",
        credentialId: "23BGD0018",
      },
    ],
    additionalTitle: "INFORMASI TAMBAHAN",
    languages: [
      { language: "Bahasa Indonesia", proficiency: "Penutur Asli (Native)" },
      { language: "Bahasa Inggris", proficiency: "Kemampuan Kerja Profesional (Skor Prediksi TOEFL: 500)" },
    ],
    interestsTitle: "FOKUS MINAT PROFESIONAL",
    interests: [
      "Arsitektur Web Skalabel & Cloud Computing",
      "Sistem Pembelajaran Digital Terbuka (Open E-Learning Ecosystems)",
      "Pengembangan Antarmuka Interaktif Berkinerja Tinggi",
    ],
    ui: {
      backToPortfolio: "Kembali ke Portofolio",
      downloadPdf: "Cetak / Simpan PDF",
      downloadOriginalFile: "Unduh Berkas PDF Langsung",
      printHint: "Gunakan menu Cetak peramban (Ctrl+P / Cmd+P) untuk menyimpan sebagai PDF standar A4.",
      serifToggle: "Klasik (Serif)",
      sansToggle: "Modern (Sans)",
      pageCount: "Dokumen Resmi — Format Standar Harvard",
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
      "Computer Science graduate (Bachelor of Computer Science / S.Kom., GPA 3.47 / 4.00) from Universitas Pakuan specializing in modern web engineering and high-performance software development. Proven hands-on capability in architecting modular user interfaces, RESTful API integrations, and relational database schemas with Next.js, React, Laravel, and PostgreSQL. Currently contributing as a Web Developer at PUSDIK Mahkamah Konstitusi RI, driving the MKLC digital learning platform through SCORM runtime simulators, system integrations, and rigorous end-to-end reliability testing.",
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
          "Engineered and maintained core modules for the MKLC (Constitutional Court Learning Center) digital learning ecosystem using Next.js and Laravel.",
          "Implemented standalone SCORM 1.2 and SCORM 2004 runtime simulators to facilitate self-paced judicial and civil service training packages with real-time CMI telemetry.",
          "Optimized UI/UX responsiveness and engineered a Same-Origin Reverse Proxy architecture via Next.js to eliminate cross-origin (CORS) roadblocks on large-scale interactive assets.",
          "Conducted comprehensive functional end-to-end testing of learning modules and authored system documentation to ensure operational resilience.",
        ],
      },
      {
        company: "FMIPA Universitas Pakuan",
        role: "System Administration & Data Officer",
        period: "2023 – 2024",
        location: "Bogor, Indonesia",
        highlights: [
          "Administered faculty digital academic records and maintained student and lecturer database registries with strict verification protocols.",
          "Facilitated operational workflows for web-based archival records and library cataloging systems.",
          "Supported faculty IT infrastructure operations and contributed technical assistance for periodic administrative reporting.",
        ],
      },
      {
        company: "Freelance Field Research",
        role: "Field Data Surveyor",
        period: "April 2026 – August 2026",
        location: "Jakarta, Indonesia",
        highlights: [
          "Executed structured primary field data collection, verification, and ground-truth validation across designated Jakarta districts.",
          "Maintained rigorous data integrity, standardized survey protocols, and quantitative sampling accuracy for research analytical pipelines.",
        ],
      },
    ],
    projectsTitle: "SELECTED PROJECTS",
    projects: [
      {
        title: "MKLC SCORM Simulator & Player",
        role: "Frontend & SCORM Runtime Developer",
        period: "Sep 2026 – Present",
        technologies: ["Next.js 14", "React 18", "TypeScript", "SCORM RTE", "Bootstrap 5", "Axios"],
        description:
          "Modern web player and runtime simulator supporting SCORM 1.2 & SCORM 2004 specifications for the Constitutional Court's learning academy.",
        highlights: [
          "Designed multi-window bridge APIs (`window.API` & `window.API_1484_11`) and an automatic state restoration engine leveraging `cmi.location` & `cmi.suspend_data`.",
          "Configured Next.js rewrite reverse proxying to safely load multi-megabyte external SCORM assets without browser CORS violations.",
        ],
        repoUrl: "https://github.com/farisraja/mklc-scorm-frontend",
      },
      {
        title: "MKLC SCORM Engine & Admin Backend",
        role: "Backend Developer",
        period: "Sep 2026 – Present",
        technologies: ["Laravel 10", "PHP 8.1", "PostgreSQL 16", "Laravel Sanctum", "REST API", "SCORM CMI"],
        description:
          "Dedicated backend microservice orchestrating SCORM runtime execution, CMI data persistence, and token-based learner authentication.",
        highlights: [
          "Engineered a normalized PostgreSQL 16 schema for high-throughput CMI telemetry tracking (`scorm_trackings`) and assessment audit logs.",
          "Developed a chunked resumable ZIP uploader capable of ingesting 300+ MB training archives without server timeouts or HTTP payload constraints.",
        ],
        repoUrl: "https://github.com/farisraja/mklc-scorm-backend",
      },
      {
        title: "PB Cipta Sports League Application",
        role: "Full Stack Developer",
        period: "2024",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Supabase", "Express"],
        description:
          "Web application for badminton league operations, dynamic match scheduling, digital score recording, and automated tournament standings.",
        highlights: [
          "Architected a mobile-first interface with Tailwind CSS and modular client state for real-time match progression.",
          "Integrated authenticated access control and cloud persistence for tournament records and player metrics.",
        ],
        liveUrl: "https://pb-cipta-esports.vercel.app",
        repoUrl: "https://github.com/farisraja/pb-cipta-sports",
      },
      {
        title: "Analisis Keranjang Belanja (Market Basket Analysis)",
        role: "Web Developer",
        period: "2024",
        technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Blade"],
        description:
          "Data mining web platform discovering association rules and product affinities from retail transaction histories.",
        highlights: [
          "Processed historical transaction datasets to extract actionable itemset affinities using association rule algorithms.",
          "Visualized support, confidence, and merchandise placement recommendations within a clear administrative dashboard.",
        ],
        repoUrl: "https://github.com/farisraja/analisis_keranjang_belanja_2026",
      },
    ],
    skillsTitle: "TECHNICAL SKILLS",
    skillCategories: [
      {
        category: "Programming Languages",
        skills: ["JavaScript (ES6+)", "TypeScript", "PHP", "Python", "SQL"],
      },
      {
        category: "Frontend Development",
        skills: ["Next.js (App Router)", "React", "Tailwind CSS", "Bootstrap", "Vue.js", "HTML5", "CSS3"],
      },
      {
        category: "Backend & API Architecture",
        skills: ["Laravel", "Node.js", "Express", "CodeIgniter 3", "RESTful APIs", "Laravel Sanctum", "SCORM RTE Bridge"],
      },
      {
        category: "Database Management",
        skills: ["PostgreSQL", "MySQL", "Room Database (Mobile SQLite)"],
      },
      {
        category: "Developer Tools & Platforms",
        skills: ["Git", "GitHub", "Vite", "Vercel", "Docker", "VS Code", "Figma", "Postman", "Windsurf AI"],
      },
      {
        category: "Specialized Domains",
        skills: ["SCORM 1.2 & 2004 Learning Standards", "UI/UX Engineering", "Responsive Web Architecture"],
      },
    ],
    certificationsTitle: "CERTIFICATIONS & TRAINING",
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
        title: "Data Analysis with Apache Hive",
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
        title: "TOEFL Prediction Test (Total Score: 500)",
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
        issuer: "Maestro Academy & RTIK Bandar Lampung",
        issueDate: "September 2025",
        credentialId: "5586-3978-3422-2208",
      },
      {
        title: "Edsen Hackathon Competition (Software Engineering Participant)",
        issuer: "PT Edsen Gudang Komputerindo",
        issueDate: "December 2022",
        credentialId: "013/CERT/EDSEN/HACKATHON/12/2022",
      },
      {
        title: "Microsoft Office Desktop Training (Accredited)",
        issuer: "Trust Training Partners (Microsoft Learning Partner) & Universitas Pakuan",
        issueDate: "October 2023",
        credentialId: "23BGD0018",
      },
    ],
    additionalTitle: "ADDITIONAL INFORMATION",
    languages: [
      { language: "Indonesian", proficiency: "Native" },
      { language: "English", proficiency: "Professional Working Proficiency (TOEFL Prediction Score: 500)" },
    ],
    interestsTitle: "AREAS OF PROFESSIONAL INTEREST",
    interests: [
      "Scalable Web Architecture & Cloud Infrastructure",
      "Open E-Learning Ecosystems & Educational Technologies",
      "High-Performance Interactive User Interfaces",
    ],
    ui: {
      backToPortfolio: "Back to Portfolio",
      downloadPdf: "Print / Save as PDF",
      downloadOriginalFile: "Download Original PDF",
      printHint: "Use browser print (Ctrl+P / Cmd+P) to save as an official Harvard-style A4 PDF.",
      serifToggle: "Classic (Serif)",
      sansToggle: "Modern (Sans)",
      pageCount: "Official Document — Harvard Resume Standard",
    },
  },
};
