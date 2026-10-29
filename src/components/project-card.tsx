/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ArrowUpRight, FolderGit2, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  title: string;
  slug: string;
  summary?: string | null;
  description?: string;
  dates?: string | null;
  tags?: readonly string[];
  image?: string;
  imageAlt?: string;
  video?: string;
  websiteUrl?: string | null;
  repositoryUrl?: string | null;
  className?: string;
  isFeatured?: boolean;
}

function ProjectThumbnail({
  image,
  imageAlt,
  title,
  slug,
  video,
  isFeatured = false,
}: {
  image?: string;
  imageAlt?: string;
  title: string;
  slug: string;
  video?: string;
  isFeatured?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const detailHref = `/projects/${slug}`;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-muted/40 group/thumb",
        isFeatured
          ? "aspect-video md:aspect-auto md:h-full min-h-[220px] sm:min-h-[260px] md:min-h-[280px] rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl"
          : "aspect-video rounded-t-xl"
      )}
    >
      <Link
        href={detailHref}
        className="block size-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`Lihat detail proyek ${title}`}
      >
        {video ? (
          <div className="relative size-full">
            <video
              src={video}
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              poster={image}
              className="size-full object-cover aspect-video md:aspect-auto project-card-image"
            />
            <div className="absolute bottom-2 right-2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-xs">
              <Play className="size-3 fill-white" />
            </div>
          </div>
        ) : image && !imageError ? (
          <img
            src={image}
            alt={imageAlt || `Screenshot aplikasi ${title}`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover aspect-video md:aspect-auto project-card-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="size-full min-h-[180px] aspect-video md:aspect-auto bg-linear-to-br from-muted/60 via-muted/30 to-muted/80 flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden project-card-image">
            <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
            <div className="size-10 rounded-xl bg-background/90 border border-border shadow-xs flex items-center justify-center text-muted-foreground mb-2">
              <FolderGit2 className="size-5 text-foreground/70" />
            </div>
            <span className="text-xs font-medium text-foreground/85 tracking-tight line-clamp-1 max-w-[85%]">
              {title}
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5 tracking-wider font-mono">
              Pratinjau Aplikasi
            </span>
          </div>
        )}
      </Link>
    </div>
  );
}

export function ProjectCard({
  title,
  slug,
  summary,
  description,
  dates,
  tags = [],
  image,
  imageAlt,
  video,
  websiteUrl,
  repositoryUrl,
  className,
  isFeatured = false,
}: Props) {
  const detailHref = `/projects/${slug}`;
  const MAX_TAGS = isFeatured ? 5 : 4;
  const visibleTags = tags.slice(0, MAX_TAGS);
  const remainingCount = tags.length - MAX_TAGS;

  const displaySummary = summary || description || "";

  if (isFeatured) {
    return (
      <div
        className={cn(
          "group project-card flex flex-col md:flex-row h-full rounded-2xl border border-border bg-card overflow-hidden shadow-xs hover:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40 relative",
          className
        )}
      >
        {/* Left Thumbnail (50-54% width on desktop) */}
        <div className="relative w-full md:w-[50%] lg:w-[52%] shrink-0 overflow-hidden">
          <ProjectThumbnail
            image={image}
            imageAlt={imageAlt}
            title={title}
            slug={slug}
            video={video}
            isFeatured={true}
          />
          {/* Badge: Proyek Unggulan */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border/80 shadow-xs text-xs font-medium text-foreground select-none pointer-events-none">
            <Sparkles className="size-3 text-amber-500 fill-amber-500" />
            <span>Proyek Unggulan</span>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="p-5 sm:p-6 lg:p-7 flex flex-col justify-between flex-1 gap-4">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-tight leading-snug">
                  <Link
                    href={detailHref}
                    className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
                  >
                    {title}
                  </Link>
                </h3>
              </div>
              {dates && (
                <time className="text-xs text-muted-foreground whitespace-nowrap">
                  {dates}
                </time>
              )}
            </div>

            {displaySummary && (
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-4 text-pretty">
                {displaySummary}
              </p>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center mt-1">
                {visibleTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] font-medium border-border/80 h-5 px-2.5 py-0 bg-muted/40"
                  >
                    {tag}
                  </Badge>
                ))}
                {remainingCount > 0 && (
                  <Link
                    href={detailHref}
                    className="text-[11px] font-medium border border-border rounded-md px-2 h-5 inline-flex items-center bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    title={`Lihat ${remainingCount} teknologi lainnya di halaman detail`}
                    aria-label={`Lihat ${remainingCount} teknologi lainnya di halaman detail`}
                  >
                    +{remainingCount}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
            <Link
              href={detailHref}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>Lihat Detail</span>
              <ArrowUpRight className="size-3.5 project-card-arrow transition-transform duration-250 ease-out" />
            </Link>

            {websiteUrl && websiteUrl.trim() !== "" && websiteUrl !== "#" && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Buka demo langsung ${title}`}
              >
                <Icons.globe className="size-3 text-muted-foreground" />
                <span>Demo</span>
              </a>
            )}

            {repositoryUrl && repositoryUrl.trim() !== "" && repositoryUrl !== "#" && (
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Buka kode sumber GitHub ${title}`}
              >
                <Icons.github className="size-3 text-muted-foreground" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group project-card flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden shadow-xs hover:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40",
        className
      )}
    >
      {/* 1. Screenshot / Thumbnail Area (16:9) */}
      <ProjectThumbnail
        image={image}
        imageAlt={imageAlt}
        title={title}
        slug={slug}
        video={video}
        isFeatured={false}
      />

      {/* 2. Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        {/* Header: Judul & Periode */}
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base sm:text-lg tracking-tight leading-snug">
              <Link
                href={detailHref}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
              >
                {title}
              </Link>
            </h3>
            {dates && (
              <time className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
                {dates}
              </time>
            )}
          </div>
        </div>

        {/* Ringkasan dibatasi secara visual sekitar 3 baris */}
        {displaySummary && (
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3 text-pretty">
            {displaySummary}
          </p>
        )}

        {/* Badge Teknologi (Maks 4 + tautan "+N" ke halaman detail) */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center mt-1">
            {visibleTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[11px] font-medium border-border/80 h-5 px-2 py-0 bg-muted/30"
              >
                {tag}
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Link
                href={detailHref}
                className="text-[11px] font-medium border border-border rounded-md px-1.5 h-5 inline-flex items-center bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                title={`Lihat ${remainingCount} teknologi lainnya di halaman detail`}
                aria-label={`Lihat ${remainingCount} teknologi lainnya di halaman detail`}
              >
                +{remainingCount}
              </Link>
            )}
          </div>
        )}

        {/* Tombol Bagian Bawah: Lihat Detail, Demo, Source Code */}
        <div className="mt-auto pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
          {/* Tombol Utama: Lihat Detail */}
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>Lihat Detail</span>
            <ArrowUpRight className="size-3.5 project-card-arrow transition-transform duration-250 ease-out" />
          </Link>

          {/* Tombol Demo (jika URL tersedia) */}
          {websiteUrl && websiteUrl.trim() !== "" && websiteUrl !== "#" && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Buka demo langsung ${title}`}
            >
              <Icons.globe className="size-3 text-muted-foreground" />
              <span>Demo</span>
            </a>
          )}

          {/* Tombol Source Code (jika URL repository tersedia) */}
          {repositoryUrl && repositoryUrl.trim() !== "" && repositoryUrl !== "#" && (
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Buka kode sumber GitHub ${title}`}
            >
              <Icons.github className="size-3 text-muted-foreground" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
