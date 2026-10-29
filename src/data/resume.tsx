import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Faris Raja Ardana",
  initials: "FA",
  url: "http://localhost:3001",
  location: "Indonesia",
  locationLink: "",
  description:
    "Saya mengembangkan website dan aplikasi dengan perhatian pada kegunaan, tampilan, dan kebutuhan pengguna.",
  summary:
    "Saya lulusan Ilmu Komputer Universitas Pakuan yang berfokus pada pengembangan web dan aplikasi. Saya senang menerjemahkan kebutuhan pengguna menjadi fitur yang terstruktur, mudah digunakan, dan dapat dikembangkan lebih lanjut.\n\nSaat ini saya menjalani magang di PUSDIK MK dan terlibat dalam pengembangan platform pembelajaran MKLC. Kontribusi saya mencakup pengembangan fitur, perapihan antarmuka, serta pengujian fungsional untuk menemukan bagian yang perlu diperbaiki.",
  avatarUrl: "/api/media/file/faris-raja-ardana.jpg",
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
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
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
      title: "Pengembangan Web — Magang",
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
      title: "Administrasi Perpustakaan — PKL",
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
      id: "cert-1",
      title: "Sertifikasi Kompetensi Rekayasa Perangkat Lunak (Junior Web Developer)",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      category: "khusus" as const,
      issueDate: "2024",
      expiryDate: "2027",
      credentialId: "BNSP-JWD-2024-884129",
      credentialUrl: "",
      description:
        "Sertifikasi okupasi nasional menguji standar kompetensi pengkodean terstruktur, implementasi logika backend, perancangan database relasional, dan penerapan pengujian perangkat lunak.",
      skills: ["PHP", "Laravel", "MySQL", "REST API", "Unit Testing"],
      image: "",
    },
    {
      id: "cert-2",
      title: "Menjadi Back-End Developer Expert dengan Node.js & Clean Architecture",
      issuer: "Dicoding Indonesia",
      category: "khusus" as const,
      issueDate: "2024",
      expiryDate: "Tidak Kedaluwarsa",
      credentialId: "DICODING-BE-90214",
      credentialUrl: "https://www.dicoding.com/certificates/DICODING-BE-90214",
      description:
        "Spesialisasi perancangan RESTful API modular berkinerja tinggi, arsitektur Clean Architecture, autentikasi JWT token, caching memory, dan automasi test-driven development.",
      skills: ["Node.js", "Clean Architecture", "PostgreSQL", "JWT", "REST API"],
      image: "",
    },
    {
      id: "cert-3",
      title: "Alibaba Cloud Certified Associate (ACA) - Cloud Computing",
      issuer: "Alibaba Cloud & Kominfo",
      category: "khusus" as const,
      issueDate: "2023",
      expiryDate: "2025",
      credentialId: "ACA-CLOUD-2023-412",
      credentialUrl: "",
      description:
        "Pemahaman arsitektur komputasi awan, konfigurasi virtual machine Elastic Compute Service (ECS), Server Load Balancer (SLB), Object Storage (OSS), dan manajemen keamanan jaringan cloud.",
      skills: ["Cloud Computing", "DevOps", "Linux", "Networking"],
      image: "",
    },
    {
      id: "cert-4",
      title: "SQL (Advanced) & Database Optimization Certificate",
      issuer: "HackerRank",
      category: "khusus" as const,
      issueDate: "2024",
      expiryDate: "Tidak Kedaluwarsa",
      credentialId: "HR-SQL-ADV-6671",
      credentialUrl: "https://www.hackerrank.com/certificates/",
      description:
        "Uji kompetensi teknis manipulasi kueri kompleks, optimasi subquery bersarang, indeks database relasional, agregasi tingkat lanjut, serta penulisan prosedur SQL efisien.",
      skills: ["PostgreSQL", "MySQL", "Query Optimization", "Database Indexing"],
      image: "",
    },
    {
      id: "cert-5",
      title: "Belajar Dasar Pemrograman Web & JavaScript Modern (ES6+)",
      issuer: "Dicoding Academy",
      category: "umum" as const,
      issueDate: "2023",
      expiryDate: "Tidak Kedaluwarsa",
      credentialId: "DICODING-JS-12940",
      credentialUrl: "https://www.dicoding.com/certificates/DICODING-JS-12940",
      description:
        "Penguasaan fondasi standar web semantik, struktur DOM interaktif, pemrograman asinkron (Promises, Fetch, Async/Await), dan penulisan kode JavaScript modular modern.",
      skills: ["JavaScript", "HTML5", "CSS3", "DOM API", "Web Basics"],
      image: "",
    },
    {
      id: "cert-6",
      title: "Digital Talent Scholarship - Fundamental Git & Version Control",
      issuer: "Kementerian Kominfo RI",
      category: "umum" as const,
      issueDate: "2023",
      expiryDate: "Tidak Kedaluwarsa",
      credentialId: "DTS-KOMINFO-2023-772",
      credentialUrl: "",
      description:
        "Pelatihan kolaborasi pengembangan tim menggunakan Git dan GitHub, manajemen alur kerja GitFlow, mitigasi merge conflicts, dan integrasi continuous code review.",
      skills: ["Git", "GitHub", "Team Collaboration", "Code Review"],
      image: "",
    },
    {
      id: "cert-7",
      title: "Agile Project Management & Scrum Foundations",
      issuer: "Coursera & Atlassian",
      category: "umum" as const,
      issueDate: "2024",
      expiryDate: "Tidak Kedaluwarsa",
      credentialId: "COURSERA-JIRA-5519",
      credentialUrl: "https://www.coursera.org",
      description:
        "Metodologi manajemen proyek berbasis Agile, implementasi siklus Sprint Scrum, estimasi backlog, pemantauan burndown chart dengan Jira, dan kolaborasi tim lintas fungsi.",
      skills: ["Agile", "Scrum", "Kanban", "Jira", "Project Management"],
      image: "",
    },
  ],
};
