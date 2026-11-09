/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import { useLanguage } from "@/i18n/language-context";

const BLUR_FADE_DELAY = 0.04;

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

export type WorkItem = {
  company: string;
  title: string;
  href?: string | null;
  location?: string | null;
  start?: string | null;
  end?: string | null;
  description: string;
  logoUrl?: string | null;
};

export default function WorkSection({ data }: { data?: WorkItem[] }) {
  const { locale, t } = useLanguage();
  const workList = data || DATA.work;

  const getTranslatedWork = (work: WorkItem): WorkItem => {
    if (locale !== "en") return work;

    const compLower = (work.company || "").toLowerCase();
    const titleLower = (work.title || "").toLowerCase();

    if (compLower.includes("pusdik") || compLower.includes("mahkamah konstitusi")) {
      return {
        ...work,
        title: t.experience.roles.pusdikMk?.title || work.title,
        description: t.experience.roles.pusdikMk?.description || work.description,
      };
    }

    if (
      compLower.includes("fmipa") ||
      compLower.includes("pakuan") ||
      titleLower.includes("administrasi sistem")
    ) {
      return {
        ...work,
        title: t.experience.roles.fmipaUnpak?.title || work.title,
        description: t.experience.roles.fmipaUnpak?.description || work.description,
      };
    }

    if (compLower.includes("surveyor") || titleLower.includes("surveyor")) {
      return {
        ...work,
        title: t.experience.roles.surveyor?.title || work.title,
        description: t.experience.roles.surveyor?.description || work.description,
      };
    }

    return work;
  };

  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <h2 className="text-xl font-bold">{t.experience.title}</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <Accordion type="single" collapsible className="w-full grid gap-6">
          {workList.map((rawWork) => {
            const work = getTranslatedWork(rawWork);
            const endText =
              !work.end || work.end.trim().toLowerCase() === "sekarang"
                ? t.experience.present
                : work.end;

            return (
              <AccordionItem
                key={`${rawWork.company}-${rawWork.title}`}
                value={`${rawWork.company}-${rawWork.title}`}
                className="w-full border-b-0 grid gap-2"
              >
                <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
                  <div className="flex items-center gap-x-3 justify-between w-full text-left">
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                      <LogoImage src={work.logoUrl || ""} alt={work.company} />
                      <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                        <div className="font-semibold leading-none flex items-center gap-2">
                          {work.company}
                          <span className="relative inline-flex items-center w-3.5 h-3.5">
                            <ChevronRight
                              className={cn(
                                "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                                "translate-x-0 opacity-0",
                                "group-hover:translate-x-1 group-hover:opacity-100",
                                "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                              )}
                            />
                            <ChevronDown
                              className={cn(
                                "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                                "opacity-0 rotate-0",
                                "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                              )}
                            />
                          </span>
                        </div>
                        <div className="font-sans text-sm text-muted-foreground">
                          {work.title}
                        </div>
                      </div>
                    </div>
                    {work.start && work.start.trim() !== "" ? (
                      <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                        <span>
                          {work.start} - {endText}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
                  {work.description}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </BlurFade>
    </div>
  );
}
