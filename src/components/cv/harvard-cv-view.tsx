"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Download,
  ExternalLink,
  Check,
  Globe,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/i18n/language-context";
import { CV_DATA } from "@/data/cv-content";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

interface HarvardCvViewProps {
  initialLocale?: "id" | "en";
}

export function HarvardCvView({ initialLocale }: HarvardCvViewProps) {
  const { locale, setLocale } = useLanguage();
  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("serif");
  const [copiedLink, setCopiedLink] = useState(false);

  const activeLocale = locale === "en" ? "en" : "id";
  const data = CV_DATA[activeLocale];

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors py-4 sm:py-8 px-3 sm:px-6">
      
      {/* ── 1. Top Action & Navigation Bar (Hidden during printing) ── */}
      <header className="no-print max-w-4xl mx-auto mb-6 flex flex-col gap-3">
        {/* Navigation Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          {/* Back to Portfolio Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors group"
          >
            <div className="size-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
              <ArrowLeft className="size-4" />
            </div>
            <span>{data.ui.backToPortfolio}</span>
          </Link>

          {/* Center: ATS Format Badge */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Harvard Resume Format • ATS-Friendly</span>
          </div>

          {/* Right Controls: Language Switcher, Font Toggle, Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Bilingual Switcher Pill */}
            <div
              role="group"
              aria-label="Language Switcher"
              className="inline-flex items-center rounded-xl p-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold"
            >
              <button
                type="button"
                onClick={() => setLocale("id")}
                aria-pressed={activeLocale === "id"}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                  activeLocale === "id"
                    ? "bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-xs font-bold"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                )}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                aria-pressed={activeLocale === "en"}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                  activeLocale === "en"
                    ? "bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-xs font-bold"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                )}
              >
                EN
              </button>
            </div>

            {/* Typography Font Toggle */}
            <div
              role="group"
              aria-label="Font Style Toggle"
              className="hidden sm:inline-flex items-center rounded-xl p-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium"
            >
              <button
                type="button"
                onClick={() => setFontFamily("serif")}
                aria-pressed={fontFamily === "serif"}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                  fontFamily === "serif"
                    ? "bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-xs font-bold"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                )}
              >
                {data.ui.serifToggle}
              </button>
              <button
                type="button"
                onClick={() => setFontFamily("sans")}
                aria-pressed={fontFamily === "sans"}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                  fontFamily === "sans"
                    ? "bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-xs font-bold"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                )}
              >
                {data.ui.sansToggle}
              </button>
            </div>

            {/* Mode Toggle */}
            <ModeToggle />
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/70 dark:bg-neutral-900/70 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs">
          <p className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-neutral-500 shrink-0" />
            <span>{data.ui.printHint}</span>
          </p>

          <div className="flex items-center gap-2 ml-auto">
            {/* Primary Print / Download Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-xs cursor-pointer"
            >
              <Printer className="size-3.5" />
              <span>{data.ui.downloadPdf}</span>
            </button>

            {/* Direct PDF Link */}
            <a
              href="/cv-faris-raja-ardana.pdf"
              download="CV_Faris_Raja_Ardana.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-xs hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <Download className="size-3.5" />
              <span className="hidden sm:inline">{data.ui.downloadOriginalFile}</span>
              <span className="sm:hidden">PDF</span>
            </a>

            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleShareLink}
              title="Copy link to CV"
              className="size-8 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <Check className="size-3.5 text-emerald-600" />
              ) : (
                <Globe className="size-3.5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── 2. The Harvard Resume Sheet ── */}
      {/*
        Always rendered on pure white background (#ffffff) with deep black text (#0a0a0a)
        so it perfectly emulates an authentic printed document on screen and prints identically.
      */}
      <main
        className={cn(
          "harvard-sheet max-w-4xl mx-auto bg-white text-neutral-900 border border-neutral-200/90 shadow-xl rounded-sm p-6 sm:p-10 md:p-14 select-text leading-relaxed",
          fontFamily === "serif" ? "font-serif" : "font-sans"
        )}
        style={{
          fontFamily:
            fontFamily === "serif"
              ? '"Georgia", "Times New Roman", Times, "Cambria", serif'
              : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: "#111827",
        }}
      >
        {/* ── A. HEADER ── */}
        <header className="text-center pb-3 border-b border-neutral-900 mb-5 break-inside-avoid">
          {/* Candidate Full Name */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-neutral-950 mb-1"
            style={{ letterSpacing: "0.06em" }}
          >
            {data.header.name}
            {data.header.degreeSuffix && (
              <span className="font-normal text-xl sm:text-2xl md:text-3xl ml-1">
                , {data.header.degreeSuffix}
              </span>
            )}
          </h1>

          {/* Professional Title */}
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-neutral-700 mb-2">
            {data.header.title}
          </p>

          {/* Contact Details Line */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-neutral-700">
            <span>{data.header.location}</span>
            <span aria-hidden="true">•</span>
            <a
              href={`mailto:${data.header.email}`}
              className="hover:underline font-medium text-neutral-900"
            >
              {data.header.email}
            </a>
            <span aria-hidden="true">•</span>
            <a
              href={`tel:${data.header.phone.replace(/[^0-9+]/g, "")}`}
              className="hover:underline font-medium text-neutral-900"
            >
              {data.header.phone}
            </a>
          </div>

          {/* Professional Links Line */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-neutral-700 mt-1">
            <a
              href={data.header.website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-neutral-900 font-medium"
            >
              Portfolio: {data.header.website.label}
            </a>
            <span aria-hidden="true">•</span>
            <a
              href={data.header.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-neutral-900 font-medium"
            >
              GitHub: {data.header.github.label}
            </a>
            <span aria-hidden="true">•</span>
            <a
              href={data.header.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-neutral-900 font-medium"
            >
              LinkedIn: {data.header.linkedin.label}
            </a>
          </div>
        </header>

        {/* ── B. PROFESSIONAL SUMMARY ── */}
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 pb-0.5 mb-2">
            {data.summaryTitle}
          </h2>
          <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-800 text-justify">
            {data.summary}
          </p>
        </section>

        {/* ── C. EDUCATION ── */}
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 pb-0.5 mb-2.5">
            {data.educationTitle}
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs sm:text-sm">
                  <span className="font-bold text-neutral-950">
                    {edu.institution}
                  </span>
                  <span className="text-neutral-700 font-medium text-xs">
                    {edu.location}
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs sm:text-[13px] italic text-neutral-800 mt-0.5">
                  <span>{edu.degree}</span>
                  <span className="not-italic text-neutral-700 text-xs font-medium">
                    {edu.period}
                  </span>
                </div>
                <div className="text-xs text-neutral-700 mt-0.5">
                  <span>{edu.faculty}</span>
                  {edu.gpa && (
                    <span className="ml-2 font-semibold text-neutral-900">
                      — IPK / GPA: {edu.gpa}
                    </span>
                  )}
                  {edu.honors && (
                    <span className="ml-1 text-neutral-600">
                      ({edu.honors})
                    </span>
                  )}
                </div>
                {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                  <p className="text-[11.5px] text-neutral-600 mt-1">
                    <span className="font-semibold text-neutral-800">
                      {activeLocale === "en" ? "Key Coursework: " : "Mata Kuliah Utama: "}
                    </span>
                    {edu.relevantCoursework.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── D. WORK EXPERIENCE ── */}
        <section className="mb-5">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 pb-0.5 mb-2.5">
            {data.experienceTitle}
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs sm:text-sm">
                  <span className="font-bold text-neutral-950">
                    {exp.company}
                  </span>
                  <span className="text-neutral-700 font-medium text-xs">
                    {exp.location}
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs sm:text-[13px] italic text-neutral-800 mt-0.5 mb-1.5">
                  <span className="font-semibold not-italic text-neutral-900">
                    {exp.role}
                  </span>
                  <span className="not-italic text-neutral-700 text-xs font-medium">
                    {exp.period}
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-[13px] text-neutral-800 leading-relaxed">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-justify">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── E. SELECTED PROJECTS ── */}
        <section className="mb-5">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 pb-0.5 mb-2.5">
            {data.projectsTitle}
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-neutral-950">
                      {proj.title}
                    </span>
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-0.5 hover:underline"
                        title="GitHub Repository"
                      >
                        <span>[Source]</span>
                        <ExternalLink className="size-2.5 inline" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-0.5 hover:underline"
                        title="Live Demo"
                      >
                        <span>[Demo]</span>
                        <ExternalLink className="size-2.5 inline" />
                      </a>
                    )}
                  </div>
                  <span className="text-neutral-700 text-xs font-medium">
                    {proj.period}
                  </span>
                </div>
                <div className="text-xs sm:text-[12.5px] text-neutral-700 mt-0.5 mb-1">
                  <span className="italic font-medium text-neutral-800">
                    {proj.role}
                  </span>
                  <span className="mx-1.5 text-neutral-400">|</span>
                  <span className="font-mono text-[11.5px] text-neutral-700">
                    {proj.technologies.join(", ")}
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-[13px] text-neutral-800 leading-relaxed">
                  {proj.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-justify">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── F. TECHNICAL SKILLS ── */}
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 pb-0.5 mb-2.5">
            {data.skillsTitle}
          </h2>
          <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-neutral-800">
            {data.skillCategories.map((cat, idx) => (
              <div key={idx} className="flex flex-wrap gap-x-2">
                <span className="font-bold text-neutral-950 min-w-[190px]">
                  {cat.category}:
                </span>
                <span className="flex-1 text-neutral-800">
                  {cat.skills.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── G. CERTIFICATIONS & TRAINING ── */}
        <section className="mb-5 break-inside-avoid">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 pb-0.5 mb-2.5">
            {data.certificationsTitle}
          </h2>
          <div className="space-y-2 text-xs sm:text-[12.5px]">
            {data.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex flex-wrap items-baseline justify-between gap-x-2"
              >
                <div className="flex-1 min-w-[280px]">
                  <span className="font-semibold text-neutral-950">
                    {cert.title}
                  </span>
                  <span className="text-neutral-700"> — {cert.issuer}</span>
                  {cert.credentialId && (
                    <span className="text-[11px] font-mono text-neutral-500 ml-1.5">
                      (ID: {cert.credentialId})
                    </span>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-[11px] text-neutral-600 hover:text-neutral-950 hover:underline inline-flex items-center gap-0.5"
                    >
                      [Verify]
                      <ExternalLink className="size-2.5 inline" />
                    </a>
                  )}
                </div>
                <span className="text-neutral-700 text-xs font-medium shrink-0">
                  {cert.issueDate}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── H. ADDITIONAL INFORMATION ── */}
        <section className="break-inside-avoid">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 pb-0.5 mb-2.5">
            {data.additionalTitle}
          </h2>
          <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-neutral-800">
            <div className="flex flex-wrap gap-x-2">
              <span className="font-bold text-neutral-950 min-w-[190px]">
                {activeLocale === "en" ? "Languages:" : "Bahasa:"}
              </span>
              <span className="flex-1 text-neutral-800">
                {data.languages.map((l) => `${l.language} (${l.proficiency})`).join("; ")}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="font-bold text-neutral-950 min-w-[190px]">
                {data.interestsTitle}:
              </span>
              <span className="flex-1 text-neutral-800">
                {data.interests.join(", ")}
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* ── 3. Bottom Footer Status (Hidden during printing) ── */}
      <footer className="no-print max-w-4xl mx-auto mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        <p>{data.ui.pageCount} • Faris Raja Ardana, S.Kom.</p>
      </footer>

    </div>
  );
}
