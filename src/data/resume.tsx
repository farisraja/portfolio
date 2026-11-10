import { Icons } from "@/components/icons";
import { HomeIcon, FileText } from "lucide-react";

export const DATA = {
  name: "Faris Raja Ardana",
  initials: "FA",
  url: "http://localhost:3001",
  location: "Indonesia",
  locationLink: "",
  description:
    "Saya mengembangkan website dan aplikasi dengan perhatian pada kegunaan, tampilan, dan kebutuhan pengguna.",
  summary:
    "Saya lulusan Ilmu Komputer Universitas Pakuan yang berfokus pada pengembangan web dan aplikasi modern dengan performa tinggi. Saya terbiasa menerjemahkan kebutuhan pengguna menjadi fitur yang terstruktur, efisien, dan dapat dikembangkan lebih lanjut.\n\nSaat ini saya berkontribusi aktif sebagai Web Developer di PUSDIK MK, bertanggung jawab dalam pengembangan platform pembelajaran digital MKLC. Peran saya mencakup perancangan fitur, optimasi antarmuka pengguna (UI/UX), integrasi sistem, hingga pengujian fungsional untuk memastikan keandalan platform.",
  avatarUrl: "/api/media/file/faris-raja-ardana.jpg",
  cvUrl: "/cv-faris-raja-ardana.pdf",
  skills: [
    { name: "Laravel" },
    { name: "Next.js" },
    { name: "React" },
    { name: "Vue.js" },
    { name: "Tailwind CSS" },
    { name: "Bootstrap" },
    { name: "CodeIgniter 3" },
    { name: "PHP" },
    { name: "JavaScript" },
    { name: "Python" },
    { name: "PostgreSQL" },
    { name: "MySQL" },
    { name: "Room Database" },
    { name: "Flutter" },
    { name: "Jetpack Compose" },
    { name: "REST API" },
    { name: "SCORM RTE" },
    { name: "Laravel Sanctum" },
    { name: "WebSockets" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/cv", icon: FileText, label: "Resume / CV" },
  ],
  contact: {
    email: "",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/farisraja",
        icon: Icons.github,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/frardana/",
        icon: Icons.instagram,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/faris-raja-ardana",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "PUSDIK MK",
      href: "",
      badges: [],
      location: "",
      title: "Web Developer",
      logoUrl: "",
      start: "September 2026",
      end: "Sekarang",
      description:
        "• Terlibat dalam pengembangan fitur platform pembelajaran MKLC.\n• Membantu perapihan antarmuka dan pengalaman pengguna.\n• Melakukan pengujian fungsional serta mendokumentasikan temuan perbaikan.",
    },
    {
      company: "FMIPA Universitas Pakuan",
      href: "",
      badges: [],
      location: "",
      title: "Staff Administrasi Sistem & Pengelola Data",
      logoUrl: "",
      start: "",
      end: "",
      description:
        "• Melakukan pendataan buku dan administrasi perpustakaan.\n• Membantu pengelolaan arsip berbasis web.\n• Mendukung administrasi dan penyusunan laporan.",
    },
    {
      company: "Surveyor Freelance",
      href: "",
      badges: [],
      location: "Jakarta",
      title: "Surveyor",
      logoUrl: "",
      start: "April 2026",
      end: "Agustus 2026",
      description:
        "Melaksanakan survei lapangan di wilayah Jakarta sesuai kebutuhan pengumpulan data.",
    },
  ],
  education: [
    {
      school: "Universitas Pakuan",
      href: "",
      degree: "Ilmu Komputer (IPK 3,47 / 4,00) — Lulus",
      logoUrl: "",
      start: "",
      end: "",
      description:
        "Program Studi Ilmu Komputer, Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA).",
    },
  ],
  projects: [] as Array<{
    title: string;
    href?: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: readonly string[];
    links: readonly { type: string; href: string }[];
    image?: string;
    video?: string;
  }>,
  hackathons: [] as Array<{
    title: string;
    dates: string;
    location?: string | null;
    description: string;
    image?: string;
    mlh?: string | null;
    win?: string | null;
    links?: readonly any[];
  }>,
  certificates: [
  {
    id: "cert-10",
    title: "Kegiatan BEST Seri Ke-7: \"Membangun Kesehatan Jangka Panjang melalui Gaya Hidup Aktif\"",
    issuer: "Kepaniteraan dan Sekretariat Jenderal Mahkamah Konstitusi RI",
    category: "umum" as const,
    issueDate: "14 Oktober 2026",
    expiryDate: "",
    credentialId: "No. 90.18/10/2",
    credentialUrl: "",
    description: "",
    skills: [],
    image: "/api/media/file/WhatsApp%20Image%202026-10-29%20at%2013.48.59.jpeg"
  },
  {
    id: "cert-9",
    title: "Webinar Nasional: \"Data Analyst Karir dan Peta Kompetensi Mahasiswa Era Digital\"",
    issuer: "Maestro Academy",
    category: "khusus" as const,
    issueDate: "5 November 2025",
    expiryDate: "",
    credentialId: "8607-2057-5571-3330",
    credentialUrl: "",
    description: "",
    skills: [],
    image: "/api/media/file/WhatsApp%20Image%202026-10-29%20at%2013.33.34.jpeg"
  },
  {
    id: "cert-8",
    title: "Machine learning with Phyton",
    issuer: "freeCodeCamp",
    category: "khusus" as const,
    issueDate: "17 Juni 2026",
    expiryDate: "",
    credentialId: "fcc-a8fc185a-266f-4e34-8597-f4ff2ad4d51f",
    credentialUrl: "https://www.freecodecamp.org/certification/fcc-a8fc185a-266f-4e34-8597-f4ff2ad4d51f/machine-learning-with-python-v7",
    description: "",
    skills: [],
    image: "/api/media/file/WhatsApp%20Image%202026-10-29%20at%2010.51.25.jpeg"
  },
  {
    id: "cert-11",
    title: "Guide to Vibe Coding in Windsurf",
    issuer: "Analytics Vidhya",
    category: "khusus" as const,
    issueDate: "17 Juni 2026",
    expiryDate: "",
    credentialId: "cty4nxmgii",
    credentialUrl: "",
    description: "Sertifikasi keahlian pengembangan perangkat lunak berbasis AI-assisted programming (Vibe Coding) menggunakan Windsurf IDE.",
    skills: [
      "AI-Assisted Development",
      "Windsurf IDE",
      "Prompt Engineering",
      "Full Stack Development"
    ],
    image: "/api/media/file/sertifikat-analytics-vidhya-guide-to-vibe-coding-in-windsurf.jpg"
  },
  {
    id: "cert-12",
    title: "Data Analysis with Apache Hive",
    issuer: "Analytics Vidhya",
    category: "khusus" as const,
    issueDate: "17 Juni 2026",
    expiryDate: "",
    credentialId: "a2ygol6rie",
    credentialUrl: "",
    description: "Penyelesaian kursus analisis data berskala besar menggunakan Apache Hive dan kueri SQL terstruktur dalam ekosistem big data Hadoop.",
    skills: [
      "Apache Hive",
      "Big Data",
      "SQL",
      "Data Analysis",
      "Hadoop"
    ],
    image: "/api/media/file/sertifikat-analytics-vidhya-data-analysis-with-apache-hive.jpg"
  },
  {
    id: "cert-13",
    title: "TOEFL Prediction Test (Skor: 500)",
    issuer: "Central Course Kampung Inggris Pare",
    category: "umum" as const,
    issueDate: "21 Des 2025",
    expiryDate: "21 Des 2027",
    credentialId: "2512186187",
    credentialUrl: "",
    description: "Sertifikasi tes prediksi kemampuan bahasa Inggris TOEFL dengan perolehan skor total 500 (Listening: 50, Structure & Written Expression: 53, Reading: 47).",
    skills: [
      "English Proficiency",
      "TOEFL",
      "Communication"
    ],
    image: "/api/media/file/sertifikat-central-course-toefl-prediction-test.jpg"
  },
  {
    id: "cert-14",
    title: "Webinar Series: Blend of IoT and Big Data (A Post-Pandemic Business Adaptation)",
    issuer: "Comstrac-DSC FMIPA Universitas Pakuan & UTHM",
    category: "khusus" as const,
    issueDate: "10 Des 2020",
    expiryDate: "",
    credentialId: "0353/WS.02/COMSTRAC-DSC/FMIPA-UP/XII/2020",
    credentialUrl: "",
    description: "Webinar internasional mengenai integrasi arsitektur Internet of Things (IoT) dan pemrosesan Big Data untuk transformasi bisnis digital.",
    skills: [
      "Internet of Things (IoT)",
      "Big Data",
      "Cloud Architecture"
    ],
    image: "/api/media/file/sertifikat-comstrac-dsc-unpak-blend-of-iot-and-big-data.jpg"
  },
  {
    id: "cert-15",
    title: "Webinar Information Technology: Virtual Reality For Future",
    issuer: "Comstrac-DSC FMIPA Universitas Pakuan",
    category: "khusus" as const,
    issueDate: "13 Nov 2021",
    expiryDate: "",
    credentialId: "621/WB/COMSTRAC-DSC/FMIPA-UP/XI/2021",
    credentialUrl: "",
    description: "Webinar teknologi informasi mengenai tren perkembangan Virtual Reality (VR), interaksi spasial, dan perancangan lingkungan 3D imersif.",
    skills: [
      "Virtual Reality (VR)",
      "Computer Graphics",
      "Human-Computer Interaction"
    ],
    image: "/api/media/file/sertifikat-comstrac-dsc-unpak-virtual-reality-for-future.jpg"
  },
  {
    id: "cert-16",
    title: "Financial Literacy and Job Readiness (You RISE Programme)",
    issuer: "DBS Foundation & Yayasan Plan International Indonesia",
    category: "umum" as const,
    issueDate: "17 Juni 2026",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    description: "Pelatihan kesiapan kerja profesional, perencanaan finansial, dan pengembangan karir dalam modul Youth be Ready, Inclusive, Skilled, and Empowered (You RISE).",
    skills: [
      "Job Readiness",
      "Financial Literacy",
      "Career Planning"
    ],
    image: "/api/media/file/sertifikat-dbs-foundation-financial-literacy-and-job-readiness.jpg"
  },
  {
    id: "cert-17",
    title: "Edsen Hackathon Competition",
    issuer: "PT Edsen Gudang Komputerindo",
    category: "khusus" as const,
    issueDate: "Des 2022",
    expiryDate: "",
    credentialId: "013/CERT/EDSEN/HACKATHON/12/2022",
    credentialUrl: "",
    description: "Partisipasi kompetisi hackathon pengembangan solusi perangkat lunak dan arsitektur data terintegrasi.",
    skills: [
      "Hackathon",
      "Problem Solving",
      "Rapid Prototyping",
      "Teamwork"
    ],
    image: "/api/media/file/sertifikat-edsen-hackathon-competition.jpg"
  },
  {
    id: "cert-18",
    title: "Next Generation Cisco IPv6 Training",
    issuer: "Hendevane Training Partner (HTP)",
    category: "khusus" as const,
    issueDate: "27 Juni 2026",
    expiryDate: "",
    credentialId: "HTP202610266907",
    credentialUrl: "http://www.htp.co.id",
    description: "Pelatihan teknis konfigurasi routing, transisi pengalamatan IPv6, dan arsitektur jaringan berbasis infrastruktur Cisco.",
    skills: [
      "Cisco",
      "IPv6",
      "Computer Networking",
      "Routing & Switching"
    ],
    image: "/api/media/file/sertifikat-htp-next-generation-cisco-ipv6.jpg"
  },
  {
    id: "cert-19",
    title: "IEEE Sharing Session: Let's Find Out about Tips on Building a Startup",
    issuer: "IEEE Student Branch Universitas Pakuan & FMIPA Unpak",
    category: "umum" as const,
    issueDate: "03 Okt 2021",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    description: "Sesi berbagi wawasan mengenai validasi ide produk teknologi, tahap awal pembentukan startup digital, dan strategi pengembangan produk.",
    skills: [
      "Startup Development",
      "Product Management",
      "Entrepreneurship"
    ],
    image: "/api/media/file/sertifikat-ieee-unpak-tips-on-building-a-startup.jpg"
  },
  {
    id: "cert-20",
    title: "Webinar TIK: Menjadi Web Developer Kompeten",
    issuer: "Maestro Academy, RTIK Kota Bandar Lampung & PT Winosa Mitra Bharatadjaya",
    category: "khusus" as const,
    issueDate: "20 Sep 2025",
    expiryDate: "",
    credentialId: "5586-3978-3422-2208",
    credentialUrl: "",
    description: "Webinar standar kompetensi industri rekayasa web, arsitektur frontend dan backend modern, serta best practice pengembangan web profesional.",
    skills: [
      "Web Development",
      "Frontend",
      "Backend",
      "Software Engineering"
    ],
    image: "/api/media/file/sertifikat-maestro-academy-webinar-tik-menjadi-web-developer-kompeten.jpg"
  },
  {
    id: "cert-21",
    title: "Microsoft Office Desktop Training",
    issuer: "Trust Training Partners (Microsoft Learning Partner) & Universitas Pakuan",
    category: "umum" as const,
    issueDate: "28 Okt 2023",
    expiryDate: "",
    credentialId: "23BGD0018",
    credentialUrl: "",
    description: "Pelatihan terakreditasi standar profesional pemanfaatan aplikasi Microsoft Office untuk produktivitas dokumen, pengolahan spreadsheet data, dan presentasi.",
    skills: [
      "Microsoft Office",
      "Microsoft Excel",
      "Productivity",
      "Data Processing"
    ],
    image: "/api/media/file/sertifikat-microsoft-learning-partner-microsoft-office-desktop-training.jpg"
  },
  {
    id: "cert-22",
    title: "Computer Science Webinar Series: Creative Developer with Society 5.0",
    issuer: "Program Studi Ilmu Komputer FMIPA Universitas Pakuan",
    category: "khusus" as const,
    issueDate: "16 Des 2020",
    expiryDate: "",
    credentialId: "175/Webinar1/ILKOM/FMIPA-UP/XII/2020",
    credentialUrl: "",
    description: "Webinar seri ilmu komputer mengenai peran dan kompetensi kreatif developer perangkat lunak di era keterhubungan Society 5.0.",
    skills: [
      "Creative Development",
      "Computer Science",
      "Society 5.0"
    ],
    image: "/api/media/file/sertifikat-unpak-creative-developer-with-society-5-0.jpg"
  },
  {
    id: "cert-23",
    title: "Orientasi Bidang Studi (OBS) Ilmu Komputer",
    issuer: "Program Studi Ilmu Komputer FMIPA Universitas Pakuan",
    category: "umum" as const,
    issueDate: "15 Des 2021",
    expiryDate: "",
    credentialId: "046/OBS/ILKOM/FMIPA-UP/XII/2021",
    credentialUrl: "",
    description: "Program orientasi akademik pengenalan fondasi disiplin ilmu komputer, kurikulum komputasi, dan etika profesional rekayasa software.",
    skills: [
      "Computer Science Foundations",
      "Academic Orientation",
      "Ethics"
    ],
    image: "/api/media/file/sertifikat-unpak-orientasi-bidang-studi-obs-ilmu-komputer.jpg"
  }
],

};
