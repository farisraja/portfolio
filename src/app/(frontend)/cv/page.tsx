import type { Metadata } from "next";
import { HarvardCvView } from "@/components/cv/harvard-cv-view";
import { getPortfolioData } from "@/lib/payload-data";
import { DATA } from "@/data/resume";

export const revalidate = 60; // ISR revalidation

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const owner = data.siteSettings.ownerName || data.siteSettings.name || "Faris Raja Ardana";
  const siteUrl = data.siteSettings.url || DATA.url;
  const title = `Curriculum Vitae (CV) — ${owner}, S.Kom.`;
  const description = `Resume profesional standar Harvard dari ${owner}, Web & Software Developer lulusan Ilmu Komputer Universitas Pakuan. Lengkap dengan riwayat kerja, proyek publik, keahlian teknis, dan sertifikasi terverifikasi.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/cv`,
      type: "profile",
      siteName: `${owner} Portfolio`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function CvPage() {
  return <HarvardCvView />;
}
