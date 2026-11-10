"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Printer,
  Sparkles,
  ExternalLink,
  Globe,
  Check,
} from "lucide-react";
import {
  CV_DATA,
  type CvLocale,
} from "@/data/cv-content";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

interface HarvardCvViewProps {
  initialLocale?: CvLocale;
}

export function HarvardCvView({ initialLocale = "id" }: HarvardCvViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read URL search param if present, fallback to prop/default
  const urlLang = searchParams?.get("lang") as CvLocale | null;
  const activeLocale: CvLocale = urlLang === "en" || urlLang === "id" ? urlLang : initialLocale;

  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("serif");
  const [copiedLink, setCopiedLink] = useState(false);

  const data = CV_DATA[activeLocale];

  const setLocale = (newLocale: CvLocale) => {
    if (newLocale === activeLocale) return;
    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("lang", newLocale);
      router.replace(`/cv?${params.toString()}`, { scroll: false });
    });
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/cv?lang=${activeLocale}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  const pdfDownloadPath =
    activeLocale === "en"
      ? "/cv-faris-raja-ardana-en.pdf"
      : "/cv-faris-raja-ardana-id.pdf";

  const pdfDownloadFileName =
    activeLocale === "en"
      ? "Faris_Raja_Ardana_CV_EN.pdf"
      : "Faris_Raja_Ardana_CV_ID.pdf";

  return (
    <div className="relative min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors py-4 sm:py-8 px-3 sm:px-6 print:min-h-0 print:p-0 print:m-0 print:bg-white">
      {/* ── Scoped Print Stylesheet for exact 2-Page Harvard PDF Format ── */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 7mm 12mm 7mm 12mm;
          }
          html, body {
            background: #ffffff !important;
            color: #111827 !important;
            font-size: 9.2pt !important;
            line-height: 1.28 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-hide,
          header.print-hide,
          footer.print-hide,
          .no-print,
          nav,
          [data-radix-portal] {
            display: none !important;
          }
          .cv-print-sheet {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #111827 !important;
          }
          .cv-print-sheet a {
            color: #111827 !important;
            text-decoration: none !important;
          }
          .print-page-break {
            break-before: page !important;
            page-break-before: always !important;
          }
          .break-inside-avoid {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          .print-cert-grid {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 0.1rem 0.5rem !important;
          }
          .harvard-divider {
            border-color: #111827 !important;
            border-bottom-width: 1px !important;
          }
        }
      `}</style>

      {/* ── 1. Top Action & Navigation Bar (Hidden during printing) ── */}
      <header className="print-hide no-print max-w-4xl mx-auto mb-6 flex flex-col gap-3">
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
            <span>Harvard Resume Standard • ATS-Compliant 2-Page Format</span>
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
            {/* Primary Print / Save as PDF Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-xs cursor-pointer"
            >
              <Printer className="size-3.5" />
              <span>{data.ui.downloadPdf}</span>
            </button>

            {/* Direct Vector PDF File Link (Matching current language) */}
            <a
              href={pdfDownloadPath}
              download={pdfDownloadFileName}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-xs hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <Download className="size-3.5" />
              <span className="hidden sm:inline">{data.ui.downloadOriginalFile}</span>
              <span className="sm:hidden">PDF ({activeLocale.toUpperCase()})</span>
            </a>

            {/* Copy Shareable Link */}
            <button
              type="button"
              onClick={handleShareLink}
              title="Copy link to this language CV"
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
        Pure white background (#ffffff) with deep neutral-900 text (#111827)
        for authentic Harvard style both on screen and on printed page.
      */}
      <main
        className={cn(
          "cv-print-sheet harvard-sheet max-w-4xl mx-auto bg-white text-neutral-900 border border-neutral-200/90 shadow-xl rounded-sm p-6 sm:p-10 md:p-12 select-text leading-relaxed print:p-0 print:border-none print:shadow-none print:max-w-none print:m-0",
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
        {/* ══════════════════════════════════════════════════════
            PAGE 1: HEADER, SUMMARY, EDUCATION, WORK EXPERIENCE
            ══════════════════════════════════════════════════════ */}

        {/* ── A. HEADER ── */}
        <header className="text-center pb-2 border-b border-neutral-900 harvard-divider mb-3 break-inside-avoid">
          {/* Candidate Full Name */}
          <h1
            className="text-2xl sm:text-3xl md:text-3xl font-bold uppercase tracking-wider text-neutral-950 mb-0.5"
            style={{ letterSpacing: "0.06em" }}
          >
            {data.header.name}
            {data.header.degreeSuffix && (
              <span className="font-normal text-xl sm:text-2xl ml-1">
                , {data.header.degreeSuffix}
              </span>
            )}
          </h1>

          {/* Professional Title */}
          <p className="text-xs sm:text-xs font-semibold uppercase tracking-widest text-neutral-700 mb-1">
            {data.header.title}
          </p>

          {/* Contact Details Line */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-xs text-neutral-700">
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
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-xs text-neutral-700 mt-0.5">
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
        <section className="mb-3 break-inside-avoid">
          <h2 className="text-xs sm:text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 harvard-divider pb-0.5 mb-1">
            {data.summaryTitle}
          </h2>
          <p className="text-xs sm:text-[12px] leading-relaxed text-neutral-800 text-justify">
            {data.summary}
          </p>
        </section>

        {/* ── C. EDUCATION ── */}
        <section className="mb-3 break-inside-avoid">
          <h2 className="text-xs sm:text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 harvard-divider pb-0.5 mb-1.5">
            {data.educationTitle}
          </h2>
          <div className="space-y-1.5">
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
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs sm:text-[12px] italic text-neutral-800 mt-0.5">
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
                  <p className="text-[10.5px] text-neutral-600 mt-0.5">
                    <span className="font-semibold text-neutral-800">
                      {activeLocale === "en" ? "Relevant Coursework: " : "Mata Kuliah Utama: "}
                    </span>
                    {edu.relevantCoursework.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── D. WORK EXPERIENCE ── */}
        <section className="mb-3">
          <h2 className="text-xs sm:text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 harvard-divider pb-0.5 mb-1.5">
            {data.experienceTitle}
          </h2>
          <div className="space-y-2.5">
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
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs sm:text-[12px] italic text-neutral-800 mt-0.5 mb-0.5">
                  <span className="font-semibold not-italic text-neutral-900">
                    {exp.role}
                  </span>
                  <span className="not-italic text-neutral-700 text-xs font-medium">
                    {exp.period}
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs sm:text-[11.5px] text-neutral-800 leading-relaxed">
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

        {/* ══════════════════════════════════════════════════════
            PAGE 2: SELECTED PROJECTS, SKILLS, CERTIFICATIONS,
                    ADDITIONAL INFORMATION
            ══════════════════════════════════════════════════════ */}

        {/* ── E. SELECTED PROJECTS (Starts Page 2 in Print) ── */}
        <section className="mb-2.5 print-page-break">
          <h2 className="text-xs sm:text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 harvard-divider pb-0.5 mb-1">
            {data.projectsTitle}
          </h2>
          <div className="space-y-2">
            {data.projects.map((proj, idx) => (
              <div key={idx} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-neutral-950">
                      {proj.title}
                    </span>
                    {proj.repoUrl && (
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-0.5 hover:underline"
                        title="Repository GitHub"
                      >
                        <span>[Source]</span>
                        <ExternalLink className="size-2.5 inline print-hide" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-0.5 hover:underline"
                        title="Live Demo"
                      >
                        <span>[Live Demo]</span>
                        <ExternalLink className="size-2.5 inline print-hide" />
                      </a>
                    )}
                  </div>
                  <span className="text-neutral-700 text-xs font-medium shrink-0">
                    {proj.period}
                  </span>
                </div>
                <div className="text-xs sm:text-[11px] text-neutral-700 mt-0.5 mb-0.5">
                  <span className="italic font-medium text-neutral-800">
                    {proj.role}
                  </span>
                  <span className="mx-1 text-neutral-400">|</span>
                  <span className="font-mono text-[10px] text-neutral-700">
                    {proj.technologies.join(", ")}
                  </span>
                </div>
                <p className="text-xs sm:text-[11px] text-neutral-700 mb-0.5 leading-relaxed">
                  {proj.description}
                </p>
                <ul className="list-disc pl-5 space-y-0.5 text-xs sm:text-[11px] text-neutral-800 leading-relaxed">
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
        <section className="mb-2.5 break-inside-avoid">
          <h2 className="text-xs sm:text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 harvard-divider pb-0.5 mb-1">
            {data.skillsTitle}
          </h2>
          <div className="space-y-0.5 text-xs sm:text-[11px] leading-relaxed text-neutral-800">
            {data.skillCategories.map((cat, idx) => (
              <div key={idx} className="flex flex-wrap gap-x-2">
                <span className="font-bold text-neutral-950 min-w-[180px]">
                  {cat.category}:
                </span>
                <span className="flex-1 text-neutral-800">
                  {cat.skills.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── G. CERTIFICATIONS & TRAINING (2-Column Grid in Print) ── */}
        <section className="mb-2.5">
          <h2 className="text-xs sm:text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 harvard-divider pb-0.5 mb-1">
            {data.certificationsTitle}
          </h2>
          <div className="print-cert-grid grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 text-xs sm:text-[10px]">
            {data.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-baseline justify-between gap-x-2 border-b border-neutral-100 md:border-none pb-0.5 md:pb-0 break-inside-avoid"
              >
                <div className="flex-1 truncate">
                  <span className="font-semibold text-neutral-950">
                    {cert.title}
                  </span>
                  <span className="text-neutral-600"> — {cert.issuer}</span>
                  {cert.credentialId && (
                    <span className="text-[9.5px] font-mono text-neutral-500 ml-1">
                      (ID: {cert.credentialId})
                    </span>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-[9.5px] text-neutral-600 hover:text-neutral-950 hover:underline inline-flex items-center gap-0.5"
                    >
                      [Verify]
                      <ExternalLink className="size-2 inline print-hide" />
                    </a>
                  )}
                </div>
                <span className="text-neutral-600 text-[10px] font-medium shrink-0 ml-1">
                  {cert.issueDate}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── H. ADDITIONAL INFORMATION ── */}
        <section>
          <h2 className="text-xs sm:text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-900 harvard-divider pb-0.5 mb-1">
            {data.additionalTitle}
          </h2>
          <div className="space-y-0.5 text-xs sm:text-[11px] leading-relaxed text-neutral-800">
            <div className="flex flex-wrap gap-x-2">
              <span className="font-bold text-neutral-950 min-w-[180px]">
                {activeLocale === "en" ? "Languages:" : "Kemampuan Bahasa:"}
              </span>
              <span className="flex-1 text-neutral-800">
                {data.languages.map((l) => `${l.language} (${l.proficiency})`).join("; ")}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <span className="font-bold text-neutral-950 min-w-[180px]">
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
      <footer className="print-hide no-print max-w-4xl mx-auto mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        <p>{data.ui.pageCount} • Faris Raja Ardana, S.Kom.</p>
      </footer>
    </div>
  );
}
