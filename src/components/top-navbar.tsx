"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-context";
import { LanguageSegmentedPill } from "@/components/language-switcher";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";

interface TopNavbarProps {
  ownerName?: string;
  whatsappUrl?: string | null;
  social?: {
    github?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
  };
}

export function TopNavbar({
  ownerName = "Faris Raja Ardana",
  whatsappUrl = "#contact",
  social,
}: TopNavbarProps) {
  const { t, locale } = useLanguage();
  const finalWhatsappUrl = whatsappUrl || "#contact";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const githubUrl = social?.github || DATA.contact.social.GitHub?.url;
  const instagramUrl = social?.instagram || (DATA.contact.social as any).Instagram?.url;
  const linkedinUrl = social?.linkedin || (DATA.contact.social as any).LinkedIn?.url;

  // Bersihkan hash dari URL address bar pada saat halaman dimuat (clean URL, tanpa #hero atau #projects)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.slice(1);
      window.history.replaceState(null, "", window.location.pathname);

      if (hash && hash !== "hero") {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - 80,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll ke bagian halaman tanpa memunculkan #hashtag di URL address bar
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId?: string) => {
    e.preventDefault();
    if (!targetId || targetId === "hero" || targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - 80,
          behavior: "smooth",
        });
      }
    }

    // Pastikan URL di address bar tetap bersih tanpa #hashtag
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: t.nav.projects, targetId: "projects" },
    { label: t.nav.skills, targetId: "skills" },
    { label: t.nav.about, targetId: "about" },
    { label: t.nav.certificates, targetId: "certificates" },
    { label: t.nav.experience, targetId: "work" },
  ];

  return (
    <header className="sticky top-3 sm:top-4 z-40 w-full px-3 sm:px-6 max-w-6xl mx-auto">
      <nav
        aria-label="Navigasi Atas"
        className={cn(
          "flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-2xl border transition-all duration-300",
          scrolled
            ? "bg-background/80 dark:bg-card/75 backdrop-blur-xl border-border/80 shadow-md shadow-primary/5"
            : "bg-background/60 dark:bg-card/50 backdrop-blur-md border-border/40"
        )}
      >
        {/* Brand Kiri: Logo Badge FRA. + Nama Lengkap Faris Raja Ardana */}
        <a
          href="/"
          onClick={(e) => scrollToSection(e, "hero")}
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl shrink-0 cursor-pointer pr-3 lg:pr-5 border-r border-border/30"
          aria-label="Beranda Faris Raja Ardana"
        >
          {/* Logo Badge: Rounded Square with signature FRA. logo */}
          <div className="size-8 sm:size-8.5 rounded-xl overflow-hidden border border-border/60 shadow-2xs group-hover:scale-105 group-hover:border-primary/40 transition-all duration-200 shrink-0 bg-[#f4efe6]">
            <img
              src="/logo.png"
              alt="Logo FRA - Faris Raja Ardana"
              className="size-full object-cover"
            />
          </div>

          {/* Name Text: Faris Raja Ardana */}
          <span className="font-bold text-xs sm:text-sm tracking-tight text-foreground whitespace-nowrap group-hover:text-primary transition-colors">
            {ownerName || "Faris Raja Ardana"}
          </span>
        </a>

        {/* Menu Navigasi Tengah (Desktop Only): Scroll halus tanpa # di URL */}
        <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-7 flex-1 min-w-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.targetId}`}
              onClick={(e) => scrollToSection(e, link.targetId)}
              className="text-xs font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap cursor-pointer px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Aksi Kanan: Language Switcher + Dark Mode Toggle + Tombol "Hubungi Saya" */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0 ml-auto pl-2 sm:pl-3 lg:pl-5 border-l border-border/40">
          {/* Segmented Glass Pill Language Switcher */}
          <LanguageSegmentedPill />

          <div className="size-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors">
            <ModeToggle className="size-full" />
          </div>

          {/* Tombol CTA "Hubungi Saya": Tampil di layar sm ke atas, di mobile ada di dalam hamburger dropdown */}
          <a
            href={finalWhatsappUrl}
            onClick={(e) => {
              if (finalWhatsappUrl.startsWith("#")) {
                scrollToSection(e, finalWhatsappUrl.slice(1));
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl border border-border/90 bg-primary text-primary-foreground text-xs font-semibold tracking-wide hover:bg-primary/90 transition-all duration-200 shadow-xs hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
          >
            <span>{t.nav.contactMe}</span>
            <ArrowUpRight className="size-3.5" />
          </a>

          {/* Tombol Hamburger Mobile / Tablet (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Menu Dropdown Mobile / Tablet */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-2xl border border-border/80 bg-background/95 dark:bg-card/95 backdrop-blur-xl shadow-xl flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.targetId}`}
              onClick={(e) => scrollToSection(e, link.targetId)}
              className="text-xs font-semibold tracking-wider text-foreground/80 hover:text-foreground px-3 py-2 rounded-xl hover:bg-muted transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={`/cv?lang=${locale}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-bold tracking-wider text-primary px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between hover:bg-primary/15 transition-colors"
          >
            <span>{t.nav.cv || "RESUME / CV"}</span>
            <span className="text-[10px] font-mono uppercase bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
              ATS Friendly
            </span>
          </Link>
          <div className="pt-2 border-t border-border/40">
            <a
              href={finalWhatsappUrl}
              onClick={(e) => {
                if (finalWhatsappUrl.startsWith("#")) {
                  scrollToSection(e, finalWhatsappUrl.slice(1));
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="inline-flex w-full items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold tracking-wide shadow-xs cursor-pointer"
            >
              <span>{t.nav.contactMe}</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          {/* Social Icons di Mobile Menu */}
          {(githubUrl || instagramUrl || linkedinUrl) && (
            <div className="flex items-center justify-center gap-4 pt-2 border-t border-border/30">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Icons.github className="size-4" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Icons.instagram className="size-4" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 rounded-lg bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Icons.linkedin className="size-4" />
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
