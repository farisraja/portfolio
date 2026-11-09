/* eslint-disable @next/next/no-img-element */
"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";

const BLUR_FADE_DELAY = 0.04;

export type EducationItem = {
  school: string;
  degree?: string | null;
  href?: string | null;
  start?: string | null;
  end?: string | null;
  logoUrl?: string | null;
};

interface EducationSectionProps {
  education: EducationItem[];
}

export function EducationSection({ education }: EducationSectionProps) {
  const { t, locale } = useLanguage();

  if (!education || education.length === 0) return null;

  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-xl font-bold">{t.education.title}</h2>
        </BlurFade>
        <div className="flex flex-col gap-8">
          {education.map((item, index) => {
            const isPakuan =
              item.school.toLowerCase().includes("pakuan") ||
              (item.degree && item.degree.toLowerCase().includes("sarjana"));

            const degreeText =
              locale === "en" && isPakuan
                ? t.education.degrees.unpak || item.degree
                : item.degree;

            const endText =
              !item.end || item.end.trim().toLowerCase() === "sekarang"
                ? t.education.present
                : item.end;

            return (
              <BlurFade
                key={`${item.school}-${index}`}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <div className="flex items-center gap-x-3 justify-between group">
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {item.logoUrl ? (
                      <img
                        src={item.logoUrl}
                        alt={item.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {item.school}
                        {item.href && (
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex"
                          >
                            <ArrowUpRight
                              className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                              aria-hidden
                            />
                          </Link>
                        )}
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {degreeText}
                      </div>
                    </div>
                  </div>
                  {((item.start && item.start.trim() !== "") ||
                    (item.end && item.end.trim() !== "")) && (
                    <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                      <span>
                        {item.start
                          ? `${item.start} - ${endText}`
                          : endText}
                      </span>
                    </div>
                  )}
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
