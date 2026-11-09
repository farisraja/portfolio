"use client";

import React, { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language-context";
import { LanguageSegmentedPill } from "@/components/language-switcher";

interface TopNavbarProps {
  ownerName?: string;
  whatsappUrl?: string | null;
}

export function TopNavbar({
  ownerName = "Faris Raja Ardana",
  whatsappUrl = "#contact",
}: TopNavbarProps) {
  const { t } = useLanguage();
  const finalWhatsappUrl = whatsappUrl || "#contact";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.certificates, href: "#certificates" },
    { label: t.nav.experience, href: "#work" },
  ];

  return (
    <header className="sticky top-4 z-40 w-full px-3 sm:px-6 max-w-6xl mx-auto">
      <nav
        aria-label="Navigasi Atas"
        className={cn(
          "flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl border transition-all duration-300",
          scrolled
            ? "bg-background/80 dark:bg-card/75 backdrop-blur-xl border-border/80 shadow-md shadow-primary/5"
            : "bg-background/60 dark:bg-card/50 backdrop-blur-md border-border/40"
        )}
      >
        {/* Brand Kiri (Tanpa logo F, nama 1 baris tidak wrap) */}
        <a
          href="#hero"
          className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl shrink-0"
        >
          <span className="font-bold text-xs sm:text-sm tracking-wider uppercase text-foreground whitespace-nowrap">
            {ownerName}
          </span>
        </a>

        {/* Menu Navigasi Tengah (Desktop) */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Aksi Kanan: Jarak lega terpisah dari PENGALAMAN + Language Switcher + Dark Mode Toggle + Tombol "Hubungi Saya" */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-4 lg:ml-8 pl-3 sm:pl-5 border-l border-border/40">
          {/* Segmented Glass Pill Language Switcher */}
          <LanguageSegmentedPill />

          <div className="size-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors">
            <ModeToggle className="size-full" />
          </div>

          <a
            href={finalWhatsappUrl}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl border border-border/90 bg-primary text-primary-foreground text-xs font-semibold tracking-wide hover:bg-primary/90 transition-all duration-200 shadow-xs hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
          >
            <span>{t.nav.contactMe}</span>
            <ArrowUpRight className="size-3.5" />
          </a>

          {/* Tombol Hamburger Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Menu Dropdown Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl border border-border/80 bg-background/95 dark:bg-card/95 backdrop-blur-xl shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold tracking-wider text-foreground/80 hover:text-foreground px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
