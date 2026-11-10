"use client";

import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import Markdown from "react-markdown";
import { useLanguage } from "@/i18n/language-context";
import { FileText, ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

interface AboutSectionProps {
  summary?: string;
  cvUrl?: string | null;
}

export function AboutSection({ summary, cvUrl }: AboutSectionProps) {
  const { t, locale } = useLanguage();

  const displaySummary =
    locale === "en" ? t.about.summary : summary || t.about.summary;

  const finalCvUrl = cvUrl || "/cv-faris-raja-ardana.pdf";

  return (
    <section id="about">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{t.about.title}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown
              components={{
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-primary/50 hover:decoration-primary underline-offset-4 transition-colors hover:text-primary"
                    {...props}
                  >
                    <FileText className="size-3.5 inline shrink-0 text-primary" />
                    <span>{children}</span>
                    <ArrowUpRight className="size-3.5 inline shrink-0 text-muted-foreground" />
                  </a>
                ),
              }}
            >
              {displaySummary}
            </Markdown>

            {/* Inline Editorial Link (Harvard-Style CV) */}
            <p className="mt-4 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {locale === "en" ? (
                <>
                  A detailed breakdown of my qualifications, project milestones, and technical background is documented in my{" "}
                  <Link
                    href="/cv"
                    className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-primary/50 hover:decoration-primary underline-offset-4 transition-all hover:text-primary group"
                  >
                    <FileText className="size-3.5 inline shrink-0 text-primary" />
                    <span>Curriculum Vitae (Harvard Format)</span>
                    <ArrowUpRight className="size-3.5 inline shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  .
                </>
              ) : (
                <>
                  Rincian kualifikasi, riwayat pengalaman, dan latar belakang teknis lengkap saya rangkum dalam berkas{" "}
                  <Link
                    href="/cv"
                    className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-primary/50 hover:decoration-primary underline-offset-4 transition-all hover:text-primary group"
                  >
                    <FileText className="size-3.5 inline shrink-0 text-primary" />
                    <span>Curriculum Vitae (Format Harvard)</span>
                    <ArrowUpRight className="size-3.5 inline shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
