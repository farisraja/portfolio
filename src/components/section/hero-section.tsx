"use client";

import React from "react";
import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { TypingEffect } from "@/components/magicui/typing-effect";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { useLanguage } from "@/i18n/language-context";

interface HeroSectionProps {
  name?: string | null;
  description?: string | null;
  avatarUrl?: string | null;
  cvUrl?: string | null;
}

const BLUR_FADE_DELAY = 0.04;

export function HeroSection({
  name = "Faris Raja Ardana",
  description = "Saya membangun website dan aplikasi modern dengan performa tinggi dan arsitektur teruji.",
  avatarUrl = "/faris-cutout.png",
  cvUrl,
}: HeroSectionProps) {
  const { locale, t } = useLanguage();
  const displayName = name || "Faris Raja Ardana";
  const displayDescription =
    locale === "en" ? t.hero.subtitle : (description || t.hero.subtitle);
  const displayAvatar = avatarUrl || "/faris-cutout.png";
  const displayCvUrl = cvUrl || "/cv-faris-raja-ardana.pdf";

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden pt-2 pb-16 sm:pt-4 sm:pb-20 md:pt-6 md:pb-24 flex flex-col items-center justify-center min-h-[80vh]"
    >
      <Spotlight />

      {/* ── 1. Infinite Moving Marquee Teks Bebas Neue Outline Abu-Abu & Fill Mengikuti Background (Layer 0) ── */}
      <div
        className="pointer-events-none absolute top-[25%] sm:top-[27%] md:top-[29%] left-0 w-full -translate-y-1/2 select-none z-0 overflow-hidden leading-none whitespace-nowrap"
        aria-hidden="true"
      >
        <div className="hero-marquee-track">
          {/* Segment 1 */}
          <div className="flex items-center shrink-0">
            <span
              className="hero-text-gray font-bebas text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[165px] font-normal uppercase tracking-wide pr-8 sm:pr-14"
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                color: "var(--background)",
                WebkitTextFillColor: "var(--background)",
                WebkitTextStroke: "1.8px var(--hero-outline, rgba(15, 23, 42, 0.16))",
              }}
            >
              FARIS RAJA ARDANA
            </span>
            <span className="text-[3vw] sm:text-[2.2vw] font-bold text-muted-foreground/35 pr-8 sm:pr-14">
              ✦
            </span>
            <span
              className="hero-text-gray font-bebas text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[165px] font-normal uppercase tracking-wide pr-8 sm:pr-14"
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                color: "var(--background)",
                WebkitTextFillColor: "var(--background)",
                WebkitTextStroke: "1.8px var(--hero-outline, rgba(15, 23, 42, 0.16))",
              }}
            >
              SOFTWARE DEVELOPER
            </span>
            <span className="text-[3vw] sm:text-[2.2vw] font-bold text-muted-foreground/35 pr-8 sm:pr-14">
              ✦
            </span>
            <span
              className="hero-text-gray font-bebas text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[165px] font-normal uppercase tracking-wide pr-8 sm:pr-14"
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                color: "var(--background)",
                WebkitTextFillColor: "var(--background)",
                WebkitTextStroke: "1.8px var(--hero-outline, rgba(15, 23, 42, 0.16))",
              }}
            >
              FULL STACK BUILDER
            </span>
            <span className="text-[3vw] sm:text-[2.2vw] font-bold text-muted-foreground/35 pr-8 sm:pr-14">
              ✦
            </span>
          </div>

          {/* Segment 2 (Duplikasi identik untuk infinite loop mulus tanpa jeda) */}
          <div className="flex items-center shrink-0">
            <span
              className="hero-text-gray font-bebas text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[165px] font-normal uppercase tracking-wide pr-8 sm:pr-14"
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                color: "var(--background)",
                WebkitTextFillColor: "var(--background)",
                WebkitTextStroke: "1.8px var(--hero-outline, rgba(15, 23, 42, 0.16))",
              }}
            >
              FARIS RAJA ARDANA
            </span>
            <span className="text-[3vw] sm:text-[2.2vw] font-bold text-muted-foreground/35 pr-8 sm:pr-14">
              ✦
            </span>
            <span
              className="hero-text-gray font-bebas text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[165px] font-normal uppercase tracking-wide pr-8 sm:pr-14"
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                color: "var(--background)",
                WebkitTextFillColor: "var(--background)",
                WebkitTextStroke: "1.8px var(--hero-outline, rgba(15, 23, 42, 0.16))",
              }}
            >
              SOFTWARE DEVELOPER
            </span>
            <span className="text-[3vw] sm:text-[2.2vw] font-bold text-muted-foreground/35 pr-8 sm:pr-14">
              ✦
            </span>
            <span
              className="hero-text-gray font-bebas text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[165px] font-normal uppercase tracking-wide pr-8 sm:pr-14"
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                color: "var(--background)",
                WebkitTextFillColor: "var(--background)",
                WebkitTextStroke: "1.8px var(--hero-outline, rgba(15, 23, 42, 0.16))",
              }}
            >
              FULL STACK BUILDER
            </span>
            <span className="text-[3vw] sm:text-[2.2vw] font-bold text-muted-foreground/35 pr-8 sm:pr-14">
              ✦
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. Kontainer Utama: Foto Cutout & Teks Depan (Layer 10) ── */}
      <div className="relative z-10 w-full max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center">
        {/* Foto Cutout Formal Faris Raja dengan Mask Fading Bawah */}
        <BlurFade delay={BLUR_FADE_DELAY} yOffset={12}>
          <div className="relative group mx-auto mb-2 sm:mb-3 select-none">
            {/* Ambient Aura Halus Monokrom di Belakang Foto */}
            <div className="absolute inset-0 -inset-x-6 rounded-full bg-foreground/5 dark:bg-foreground/10 blur-2xl sm:blur-3xl -z-10 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="relative w-[185px] sm:w-[225px] md:w-[265px] lg:w-[300px] aspect-[4/4.7] overflow-hidden flex items-end justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayAvatar}
                alt={`Foto resmi ${displayName}`}
                className="w-full h-full object-contain object-bottom filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_18px_36px_rgba(0,0,0,0.65)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-background/90 dark:bg-card/90 backdrop-blur-md text-primary text-xs font-semibold shadow-2xs mb-2.5">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <TypingEffect key={locale}
              phrases={t.hero.typingPhrases}
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground text-balance">
            {displayName}
          </h1>
        </BlurFade>

        {/* Deskripsi Singkat */}
        <BlurFade delay={BLUR_FADE_DELAY + 0.20} yOffset={10}>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-[560px] mt-2 leading-relaxed text-pretty">
            {displayDescription}
          </p>
        </BlurFade>

        {/* Tombol Aksi CTA */}
        <BlurFade delay={BLUR_FADE_DELAY + 0.26} yOffset={10}>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3.5">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el) {
                  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: elementPosition - 80,
                    behavior: "smooth",
                  });
                }
                if (typeof window !== "undefined" && window.location.hash) {
                  window.history.replaceState(null, "", window.location.pathname);
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            >
              <span>{t.hero.viewProjects}</span>
              <ArrowDown className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: elementPosition - 80,
                    behavior: "smooth",
                  });
                }
                if (typeof window !== "undefined" && window.location.hash) {
                  window.history.replaceState(null, "", window.location.pathname);
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl border border-border/80 bg-background/80 dark:bg-card/80 backdrop-blur-md text-foreground text-xs sm:text-sm font-semibold hover:bg-muted hover:border-border transition-all duration-200 shadow-2xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            >
              <span>{t.hero.contactMe}</span>
              <ArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Inline Editorial Link (Non-Button) */}
          <div className="pt-2.5 text-center">
            <Link
              href={`/cv?lang=${locale}`}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/80 hover:text-foreground transition-colors underline-offset-4 hover:underline cursor-pointer group"
            >
              <span>{locale === "en" ? "or view my verified" : "atau pelajari berkas"}</span>
              <span className="font-semibold text-foreground inline-flex items-center gap-0.5">
                Curriculum Vitae (Harvard Format)
                <ArrowUpRight className="size-3 inline text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>
        </BlurFade>
      </div>

      {/* ── 3. Indikator "Scroll Down" di Sudut Kanan Bawah ── */}
      <div className="hidden lg:flex flex-col items-center gap-2 absolute bottom-6 right-8 text-muted-foreground/60 select-none z-10 pointer-events-none">
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
