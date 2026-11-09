"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type ProjectItem } from "@/lib/payload-data";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
  Globe,
  LayoutGrid,
  Play,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";

interface Project3DSliderProps {
  projects: ProjectItem[];
}

export function Project3DSlider({ projects }: Project3DSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");
  const [isHovered, setIsHovered] = useState(false);

  const total = projects.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (total === 0) return null;

  const activeProject = projects[currentIndex];
  const activeSlug =
    activeProject.slug || activeProject.title.toLowerCase().replace(/\s+/g, "-");
  const activeWebsiteUrl =
    activeProject.websiteUrl ||
    activeProject.links?.find((l) => l.type.toLowerCase() === "website")?.href;
  const activeRepoUrl =
    activeProject.repositoryUrl ||
    activeProject.links?.find((l) => l.type.toLowerCase() === "source")?.href;

  const getWebsiteUrl = (p: ProjectItem) =>
    p.websiteUrl || p.links?.find((l) => l.type.toLowerCase() === "website")?.href;
  const getRepoUrl = (p: ProjectItem) =>
    p.repositoryUrl || p.links?.find((l) => l.type.toLowerCase() === "source")?.href;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ── 1. Header Section ala Video Referensi ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full border-b border-border/40 pb-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[11px] font-mono font-semibold tracking-widest uppercase text-primary">
              SELECTED WORK
            </span>
            <span className="size-1 rounded-full bg-primary" />
            <span className="text-xs font-mono text-muted-foreground">
              {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Work Gallery
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-[500px]">
            Eksplorasi sistem perangkat lunak, arsitektur web, dan proyek teknis yang telah saya kembangkan.
          </p>
        </div>

        {/* Tombol Pengubah Tampilan (3D Slider vs Grid) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border/70 bg-card/60 backdrop-blur-md shadow-xs">
          <button
            onClick={() => setViewMode("3d")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
              viewMode === "3d"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            title="Tampilan 3D Cover Flow"
          >
            <Sparkles className="size-3.5" />
            <span>3D Showcase</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
            title="Tampilan Grid Seluruh Proyek"
          >
            <LayoutGrid className="size-3.5" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* ── 2A. MODE 3D COVER FLOW SLIDER (Gaya Video Referensi) ── */}
      {viewMode === "3d" ? (
        <div
          className="relative w-full flex flex-col items-center select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Stage 3D Perspective Container */}
          <div
            className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] flex items-center justify-center overflow-hidden"
            style={{ perspective: "1200px" }}
          >
            {/* Ambient Spotlight Glow di Belakang Kartu Aktif */}
            <div className="absolute w-[360px] sm:w-[500px] h-[220px] sm:h-[300px] rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl -z-10 pointer-events-none" />

            {projects.map((project, index) => {
              // Hitung jarak index signed relatif terhadap currentIndex
              let offset = index - currentIndex;
              // Normalisasi wrap-around agar carousel seimbang kiri dan kanan
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // Nilai transformasi 3D berdasarkan posisi kartu
              const getTransformValues = () => {
                if (offset === 0) {
                  return {
                    x: 0,
                    scale: 1,
                    rotateY: 0,
                    zIndex: 20,
                    opacity: 1,
                  };
                }
                const direction = offset > 0 ? 1 : -1;
                const distance = Math.abs(offset);

                if (distance === 1) {
                  return {
                    x: direction * 230, // di mobile nanti diatur via CSS atau responsif
                    scale: 0.82,
                    rotateY: -direction * 24,
                    zIndex: 10,
                    opacity: 0.45,
                  };
                }
                return {
                  x: direction * 380,
                  scale: 0.68,
                  rotateY: -direction * 36,
                  zIndex: 5,
                  opacity: 0.2,
                };
              };

              const tf = getTransformValues();

              return (
                <motion.div
                  key={project.id || project.slug || index}
                  className="absolute cursor-pointer"
                  initial={false}
                  animate={{
                    x: tf.x,
                    scale: tf.scale,
                    rotateY: tf.rotateY,
                    opacity: tf.opacity,
                    zIndex: tf.zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={cn(
                      "w-[280px] sm:w-[420px] md:w-[540px] aspect-video rounded-2xl border bg-card overflow-hidden transition-all duration-300 shadow-xl",
                      isCenter
                        ? "border-primary/50 ring-2 ring-primary/20 shadow-2xl shadow-primary/10"
                        : "border-border/60 hover:opacity-75"
                    )}
                  >
                    {/* Mockup Frame Bar Atas (3 Titik macOS Minimalis) */}
                    <div className="h-6 sm:h-7 px-3 bg-muted/70 border-b border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-red-400/80" />
                        <span className="size-2 rounded-full bg-amber-400/80" />
                        <span className="size-2 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[180px]">
                        {project.title}
                      </span>
                      <div className="size-2" />
                    </div>

                    {/* Screenshot / Preview */}
                    <div className="relative w-full h-[calc(100%-24px)] sm:h-[calc(100%-28px)] bg-muted/40 overflow-hidden group/img">
                      {project.video ? (
                        <video
                          src={project.video}
                          poster={project.image}
                          preload="metadata"
                          autoPlay
                          muted
                          playsInline
                          loop
                          className="size-full object-cover"
                        />
                      ) : project.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.image}
                          alt={project.imageAlt || project.title}
                          className="size-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        />
                      ) : (
                        <div className="size-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-muted/50 to-muted/80">
                          <FolderGit2 className="size-8 text-muted-foreground/60 mb-2" />
                          <span className="text-xs font-semibold text-foreground/80">
                            {project.title}
                          </span>
                        </div>
                      )}

                      {/* Overlay Klik untuk Kartu Samping */}
                      {!isCenter && (
                        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Tombol Navigasi Kiri & Kanan Melayang */}
            <button
              onClick={prevSlide}
              aria-label="Proyek Sebelumnya"
              className="absolute left-2 sm:left-4 z-30 size-10 sm:size-12 rounded-full border border-border/80 bg-background/80 dark:bg-card/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-muted hover:scale-105 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="size-5 sm:size-6" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Proyek Selanjutnya"
              className="absolute right-2 sm:right-4 z-30 size-10 sm:size-12 rounded-full border border-border/80 bg-background/80 dark:bg-card/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-muted hover:scale-105 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight className="size-5 sm:size-6" />
            </button>
          </div>

          {/* ── 3. Detail Proyek Aktif di Bawah Slider (Animated) ── */}
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-4 px-4 min-h-[170px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id || activeProject.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-3 w-full"
              >
                {/* Judul Proyek */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  <Link
                    href={`/projects/${activeSlug}`}
                    className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
                  >
                    {activeProject.title}
                  </Link>
                </h3>

                {/* Ringkasan / Deskripsi */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl text-pretty line-clamp-3 sm:line-clamp-none">
                  {activeProject.summary || activeProject.description}
                </p>

                {/* Badge Teknologi */}
                {activeProject.technologies && activeProject.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                    {activeProject.technologies.slice(0, 5).map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-[11px] font-medium border-border/80 bg-muted/40 h-5 px-2.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Tombol Aksi Bawah: Lihat Detail, Demo, Source Code */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <Link
                    href={`/projects/${activeSlug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span>Lihat Detail Proyek</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>

                  {activeWebsiteUrl && activeWebsiteUrl !== "#" && (
                    <a
                      href={activeWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border/80 bg-background/80 hover:bg-muted text-foreground text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Globe className="size-3.5 text-muted-foreground" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {activeRepoUrl && activeRepoUrl !== "#" && (
                    <a
                      href={activeRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border/80 bg-background/80 hover:bg-muted text-foreground text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icons.github className="size-3.5 text-muted-foreground" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Pagination Indicator */}
            <div className="flex items-center justify-center gap-1.5 pt-6">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentIndex
                      ? "w-7 bg-primary"
                      : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  )}
                  aria-label={`Pindah ke slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── 2B. MODE BENTO GRID (Seluruh Proyek) ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full auto-rows-fr animate-in fade-in duration-300">
          {projects.map((project) => {
            const projectSlug =
              project.slug || project.title.toLowerCase().replace(/\s+/g, "-");
            return (
              <ProjectCard
                key={projectSlug}
                title={project.title}
                slug={projectSlug}
                summary={project.summary}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                imageAlt={project.imageAlt}
                video={project.video}
                websiteUrl={getWebsiteUrl(project)}
                repositoryUrl={getRepoUrl(project)}
                isFeatured={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

