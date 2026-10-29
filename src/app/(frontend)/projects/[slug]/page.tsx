/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Calendar, UserCheck, Layers, Sparkles, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";
import { getProjectBySlug, getAllPublishedProjectSlugs, getPortfolioData } from "@/lib/payload-data";
import { ProjectGalleryLightbox } from "@/components/project-gallery-lightbox";
import Markdown from "react-markdown";

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
      images: project.image ? [{ url: project.image, alt: project.imageAlt || project.title }] : undefined,
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

  // Draft protection: Pengunjung yang membuka slug draft atau non-existent mendapat 404
  if (!project) {
    notFound();
  }

  const owner = data.siteSettings.ownerName || data.siteSettings.name || "Faris Raja Ardana";

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

  const isValidUrl = (url?: string | null): url is string =>
    Boolean(url && url.trim() !== "" && url !== "#");

  const normalizeUrl = (url: string) =>
    url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

  const hasLinks = Boolean(
    (project.websiteUrl && project.websiteUrl.trim() !== "" && project.websiteUrl !== "#") ||
    (project.repositoryUrl && project.repositoryUrl.trim() !== "" && project.repositoryUrl !== "#")
  );

  return (
    <div className="relative z-10 w-full max-w-[960px] mx-auto px-4.5 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16">
      {/* 1. Navigasi Atas dalam Alur Halaman (Top Navigation In-flow) */}
      <nav
        aria-label="Navigasi Proyek"
        className="w-full flex flex-wrap items-center justify-between gap-y-2.5 gap-x-4 mb-6 sm:mb-8 pb-4 border-b border-border/40"
      >
        {/* Kiri: Tautan Kembali ke Proyek */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group rounded-md py-1 px-1.5 -ml-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Kembali ke Proyek</span>
        </Link>

        {/* Kanan: GitHub, Instagram, LinkedIn, Pengubah Tema */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {isValidUrl(githubUrl) && (
            <a
              href={normalizeUrl(githubUrl.trim())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub ${owner}`}
              className="size-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icons.github className="size-4" />
            </a>
          )}
          {isValidUrl(instagramUrl) && (
            <a
              href={normalizeUrl(instagramUrl.trim())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${owner}`}
              className="size-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icons.instagram className="size-4" />
            </a>
          )}
          {isValidUrl(linkedinUrl) && (
            <a
              href={normalizeUrl(linkedinUrl.trim())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn ${owner}`}
              className="size-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icons.linkedin className="size-4" />
            </a>
          )}
          <div className="h-4 w-px bg-border/60 mx-1" aria-hidden="true" />
          <ModeToggle className="size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted p-2" />
        </div>
      </nav>

      <article className="w-full">

      {/* 2. Header & Ringkasan (Jarak antarelemen ringkasan: 12–16px) */}
      <header className="flex flex-col gap-3.5 sm:gap-4">
        {/* Judul Responsif & Metadata Proyek */}
        <div className="flex flex-col gap-2.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance break-words">
            {project.title}
          </h1>

          {/* Metadata Proyek: Jenis, Peran, Periode */}
          <div className="flex flex-wrap items-center gap-2">
            {project.projectType && (
              <Badge variant="secondary" className="gap-1.5 text-xs px-2.5 py-0.5 font-normal">
                <Layers className="size-3 text-muted-foreground" />
                <span>{project.projectType}</span>
              </Badge>
            )}
            {project.role && (
              <Badge variant="outline" className="gap-1.5 text-xs px-2.5 py-0.5 font-normal">
                <UserCheck className="size-3 text-muted-foreground" />
                <span>{project.role}</span>
              </Badge>
            )}
            {project.dates && (
              <Badge variant="outline" className="gap-1.5 text-xs px-2.5 py-0.5 font-normal text-muted-foreground">
                <Calendar className="size-3" />
                <time>{project.dates}</time>
              </Badge>
            )}
          </div>
        </div>

        {/* Ringkasan Proyek */}
        {(project.summary || project.description) && (
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">
            {project.summary || project.description}
          </p>
        )}

        {/* Tombol Demo & Source Code (Membungkus rapi pada layar kecil) */}
        {hasLinks && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-0.5">
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Icons.globe className="size-3.5" />
                <span>Kunjungi Website / Demo</span>
                <ExternalLink className="size-3 opacity-70" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Icons.github className="size-3.5" />
                <span>Source Code (GitHub)</span>
                <ExternalLink className="size-3 opacity-70" />
              </a>
            )}
          </div>
        )}
      </header>

      {/* 3. Cover Image / Video Preview (Jarak antarbagian: 32–48px) */}
      <section aria-label="Media Utama Proyek" className="mt-8 sm:mt-10">
        <figure className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted/20 shadow-sm">
          {project.video ? (
            <video
              src={project.video}
              poster={project.videoPoster || project.image}
              controls
              playsInline
              className="size-full object-cover aspect-video"
            />
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt || `Tampilan ${project.title}`}
              className="size-full object-cover aspect-video"
            />
          ) : (
            <div className="size-full aspect-video bg-linear-to-br from-muted/60 via-muted/30 to-muted/80 flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              <div className="size-12 rounded-2xl bg-background/90 border border-border shadow-xs flex items-center justify-center text-muted-foreground mb-3">
                <Layers className="size-6 text-foreground/70" />
              </div>
              <h2 className="text-sm font-semibold text-foreground/90 tracking-tight">
                {project.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                Tangkapan layar tampilan aplikasi internal sedang disiapkan
              </p>
            </div>
          )}
          {project.imageCaption && (
            <figcaption className="px-4 py-2 text-xs text-muted-foreground text-center border-t border-border/50 bg-muted/30">
              {project.imageCaption}
            </figcaption>
          )}
        </figure>
      </section>

      {/* 4. Masalah atau Kebutuhan (Jarak antarbagian: 32–48px) */}
      {project.problem && (
        <section aria-labelledby="section-problem" className="mt-9 sm:mt-11 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base sm:text-lg">
            <AlertCircle className="size-4.5 text-amber-500" />
            <h2 id="section-problem">Masalah atau Kebutuhan</h2>
          </div>
          <div className="prose max-w-none text-sm sm:text-base leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{project.problem}</Markdown>
          </div>
        </section>
      )}

      {/* 5. Kontribusi Saya (Jarak antarbagian: 32–48px) */}
      {project.myContribution && (
        <section aria-labelledby="section-contribution" className="mt-9 sm:mt-11 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base sm:text-lg">
            <UserCheck className="size-4.5 text-primary" />
            <h2 id="section-contribution">Kontribusi Saya</h2>
          </div>
          <div className="prose max-w-none text-sm sm:text-base leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{project.myContribution}</Markdown>
          </div>
        </section>
      )}

      {/* 6. Fitur Utama (Jarak antarbagian: 32–48px) */}
      {project.features && project.features.length > 0 && (
        <section aria-labelledby="section-features" className="mt-9 sm:mt-11 flex flex-col gap-3.5">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base sm:text-lg">
            <Sparkles className="size-4.5 text-primary" />
            <h2 id="section-features">Fitur Utama</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-3.5">
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border/80 bg-card/60 p-4 shadow-xs flex flex-col gap-1 hover:border-border transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {feature.title}
                  </h3>
                </div>
                {feature.description && (
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-3.5">
                    {feature.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Teknologi Lengkap (Jarak antarbagian: 32–48px) */}
      {project.technologies && project.technologies.length > 0 && (
        <section aria-labelledby="section-tech" className="mt-9 sm:mt-11 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base sm:text-lg">
            <Layers className="size-4.5 text-primary" />
            <h2 id="section-tech">Teknologi yang Digunakan</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs font-medium border-border px-3 py-1 bg-card hover:bg-muted/60 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* 8. Galeri Screenshot & Caption (Jarak antarbagian: 32–48px) */}
      {project.gallery && project.gallery.length > 0 && (
        <section aria-labelledby="section-gallery" className="mt-9 sm:mt-11 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 id="section-gallery" className="text-base sm:text-lg font-semibold text-foreground">
              Galeri Tangkapan Layar
            </h2>
            <span className="text-xs text-muted-foreground">
              Klik gambar untuk memperbesar
            </span>
          </div>
          <ProjectGalleryLightbox
            items={project.gallery}
            projectTitle={project.title}
          />
        </section>
      )}

      {/* 9. Hasil atau Pembelajaran (Jarak antarbagian: 32–48px) */}
      {project.results && (
        <section aria-labelledby="section-results" className="mt-9 sm:mt-11 flex flex-col gap-2.5">
          <h2 id="section-results" className="text-base sm:text-lg font-semibold text-foreground">
            Hasil & Pembelajaran
          </h2>
          <div className="prose max-w-none text-sm sm:text-base leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{project.results}</Markdown>
          </div>
        </section>
      )}

      {/* 10. Navigasi Bawah Proyek */}
      <div className="mt-10 sm:mt-12 pt-6 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group rounded-md p-1 -ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Kembali ke Proyek</span>
        </Link>

        {hasLinks && (
          <div className="flex flex-wrap items-center gap-2">
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
              >
                <Icons.globe className="size-3" />
                <span>Demo</span>
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-colors shadow-xs"
              >
                <Icons.github className="size-3" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>

    <footer className="mt-12 sm:mt-14 text-center text-xs text-muted-foreground border-t border-border/40 pt-6">
      <p>© {new Date().getFullYear()} {owner}.</p>
    </footer>
  </div>
);
}
