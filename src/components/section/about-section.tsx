"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Markdown from "react-markdown";
import { useLanguage } from "@/i18n/language-context";

const BLUR_FADE_DELAY = 0.04;

interface AboutSectionProps {
  summary?: string;
}

export function AboutSection({ summary }: AboutSectionProps) {
  const { t, locale } = useLanguage();

  const displaySummary =
    locale === "en" ? t.about.summary : summary || t.about.summary;

  return (
    <section id="about">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{t.about.title}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{displaySummary}</Markdown>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
