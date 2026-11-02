"use client";

import React from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { TypingEffect } from "@/components/magicui/typing-effect";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

interface HeroSectionProps {
  name?: string | null;
  description?: string | null;
  avatarUrl?: string | null;
}

const BLUR_FADE_DELAY = 0.04;

export function HeroSection({
  name = "Faris Raja Ardana",
  description = "Saya membangun website dan aplikasi modern dengan performa tinggi dan arsitektur teruji.",
  avatarUrl = "/faris-cutout.png",
}: HeroSectionProps) {
  const displayName = name || "Faris Raja Ardana";
  const displayDescription =
    description ||
    "Saya membangun website dan aplikasi modern dengan performa tinggi dan arsitektur teruji.";
  const displayAvatar = avatarUrl || "/faris-cutout.png";
  // Ambil nama pendek untuk teks outline arsitektural di belakang
  const outlineName = "FARIS RAJA";

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 flex flex-col items-center justify-center min-h-[82vh] lg:min-h-[86vh]"
    >
      <Spotlight />

      {/* ── 1. Teks Raksasa Arsitektural Outlined di Belakang (Layer 0) ── */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none z-0 overflow-hidden leading-none"
        aria-hidden="true"
      >
        <span
          className="block text-[15vw] sm:text-[14vw] md:text-[13vw] font-black tracking-tighter uppercase font-sans whitespace-nowrap transition-colors duration-500"
          style={{
            WebkitTextStroke: "1.5px var(--hero-outline, rgba(255,255,255,0.18))",
            color: "transparent",
            letterSpacing: "-0.04em",
          }}
        >
          {outlineName}
        </span>
      </div>

      {/* ── 2. Kontainer Utama: Foto Cutout & Teks Depan (Layer 10) ── */}
      <div className="relative z-10 w-full max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center">
        {/* Foto Cutout Formal Faris Raja dengan Mask Fading Bawah */}
        <BlurFade delay={BLUR_FADE_DELAY} yOffset={12}>
          <div className="relative group mx-auto mb-4 sm:mb-6 select-none">
            {/* Ambient Aura Glow di Belakang Foto */}
            <div className="absolute inset-0 -inset-x-8 rounded-full bg-primary/10 dark:bg-primary/20 blur-2xl sm:blur-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative w-[240px] sm:w-[300px] md:w-[360px] lg:w-[410px] aspect-[4/4.8] overflow-hidden flex items-end justify-center">
              {/* eslint-disable-next-js-image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayAvatar}
                alt={`Foto resmi ${displayName}`}
                className="w-full h-full object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 80%, rgba(0,0,0,0.4) 93%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 80%, rgba(0,0,0,0.4) 93%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </BlurFade>

        {/* Badge Typing Effect Interaktif */}
        <BlurFade delay={BLUR_FADE_DELAY + 0.08} yOffset={10}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-background/80 dark:bg-card/80 backdrop-blur-md text-primary text-xs font-semibold shadow-xs mb-3">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <TypingEffect
              phrases={[
                "Web & Software Developer",
                "Next.js & React Specialist",
                "Full-Stack System Builder",
                "Backend & Database Engineer",
              ]}
              startDelay={600}
              typingSpeed={60}
              deletingSpeed={30}
              pauseAfterTyping={2200}
              pauseAfterDeleting={350}
            />
          </div>
        </BlurFade>

        {/* Judul Nama Utama */}
        <BlurFade delay={BLUR_FADE_DELAY + 0.14} yOffset={10}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground text-balance">
            {displayName}
          </h1>
        </BlurFade>

        {/* Deskripsi Singkat */}
        <BlurFade delay={BLUR_FADE_DELAY + 0.20} yOffset={10}>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-[580px] mt-3 leading-relaxed text-pretty">
            {displayDescription}
          </p>
        </BlurFade>

        {/* Tombol Aksi CTA */}
        <BlurFade delay={BLUR_FADE_DELAY + 0.26} yOffset={10}>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-5">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>Lihat Proyek</span>
              <ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-border/80 bg-background/70 dark:bg-card/70 backdrop-blur-md text-foreground text-sm font-semibold hover:bg-muted hover:border-border transition-all duration-200 shadow-2xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>Hubungi Saya</span>
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </BlurFade>
      </div>

      {/* ── 3. Indikator "Scroll Down" di Sudut Kanan Bawah (Khas Referensi) ── */}
      <div className="hidden lg:flex flex-col items-center gap-2 absolute bottom-6 right-8 text-muted-foreground/70 select-none z-10 pointer-events-none">
        <span
          className="text-[10px] font-mono tracking-widest uppercase [writing-mode:vertical-rl] rotate-180"
          style={{ letterSpacing: "0.25em" }}
        >
          SCROLL DOWN
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/60 via-muted-foreground/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
