import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DATA } from "@/data/resume";
import {
  getProjectBySlug,
  getAllPublishedProjectSlugs,
  getPortfolioData,
} from "@/lib/payload-data";
import { ProjectDetailView } from "@/components/project-detail-view";

export const revalidate = 60; // ISR revalidation

export async function generateStaticParams() {
  const slugs = await getAllPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyek Tidak Ditemukan",
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.title} — Detail Proyek Faris Raja Ardana`;
  const description =
    project.summary ||
    project.description ||
    `Studi kasus dan dokumentasi pengembangan ${project.title}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: project.image
        ? [{ url: project.image, alt: project.imageAlt || project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, data] = await Promise.all([
    getProjectBySlug(slug),
    getPortfolioData(),
  ]);

  if (!project) {
    notFound();
  }

  const owner =
    data.siteSettings.ownerName || data.siteSettings.name || "Faris Raja Ardana";

  const githubUrl =
    data.siteSettings.social?.github !== undefined
      ? data.siteSettings.social.github
      : DATA.contact.social.GitHub?.url;
  const instagramUrl =
    data.siteSettings.social?.instagram !== undefined
      ? data.siteSettings.social.instagram
      : (DATA.contact.social as any).Instagram?.url;
  const linkedinUrl =
    data.siteSettings.social?.linkedin !== undefined
      ? data.siteSettings.social.linkedin
      : (DATA.contact.social as any).LinkedIn?.url;

  return (
    <ProjectDetailView
      project={project}
      owner={owner}
      githubUrl={githubUrl}
      instagramUrl={instagramUrl}
      linkedinUrl={linkedinUrl}
    />
  );
}
