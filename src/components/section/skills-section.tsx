"use client";

import { useState, useMemo } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { getSkillIcon } from "@/lib/skill-icons";
import { useLanguage } from "@/i18n/language-context";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export type SkillItem = {
  name: string;
  iconKey?: string | null;
  category?: string | null;
};

interface SkillsSectionProps {
  skills: SkillItem[];
}

type SkillCategoryKey = "all" | "frontend" | "backend" | "database" | "mobile" | "tools";

function inferSkillCategory(skill: SkillItem): SkillCategoryKey {
  if (skill.category) {
    const cat = skill.category.toLowerCase();
    if (cat.includes("front")) return "frontend";
    if (cat.includes("back") || cat.includes("api")) return "backend";
    if (cat.includes("data") || cat.includes("cloud") || cat.includes("storage")) return "database";
    if (cat.includes("mobile")) return "mobile";
    if (cat.includes("tool") || cat.includes("devops") || cat.includes("lang")) return "tools";
  }

  const n = skill.name.toLowerCase();
  if (
    n.includes("react") ||
    n.includes("next") ||
    n.includes("vue") ||
    n.includes("tailwind") ||
    n.includes("bootstrap") ||
    n.includes("html") ||
    n.includes("css") ||
    n.includes("framer") ||
    n.includes("vite")
  ) {
    return "frontend";
  }

  if (
    n.includes("laravel") ||
    n.includes("php") ||
    n.includes("codeigniter") ||
    n.includes("fastapi") ||
    n.includes("express") ||
    n.includes("node") ||
    n.includes("rest") ||
    n.includes("scorm") ||
    n.includes("sanctum") ||
    n.includes("websocket")
  ) {
    return "backend";
  }

  if (
    n.includes("postgres") ||
    n.includes("mysql") ||
    n.includes("supabase") ||
    n.includes("sql") ||
    n.includes("redis") ||
    n.includes("room")
  ) {
    return "database";
  }

  if (n.includes("flutter") || n.includes("compose") || n.includes("android")) {
    return "mobile";
  }

  return "tools";
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t, locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategoryKey>("all");

  const categories = useMemo(() => {
    return [
      { key: "all" as const, label: locale === "en" ? "All" : "Semua" },
      { key: "frontend" as const, label: "Frontend" },
      { key: "backend" as const, label: "Backend & API" },
      { key: "database" as const, label: "Database" },
      { key: "tools" as const, label: locale === "en" ? "Tools & Languages" : "Alat & Bahasa" },
    ];
  }, [locale]);

  const filteredSkills = useMemo(() => {
    if (!skills) return [];
    if (selectedCategory === "all") return skills;
    return skills.filter((s) => inferSkillCategory(s) === selectedCategory);
  }, [skills, selectedCategory]);

  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>{t.skills.title}</span>
            </h2>

            {/* Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter Kategori Keahlian"
              className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border/80 text-xs overflow-x-auto max-w-full"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg font-medium transition-all duration-200 whitespace-nowrap cursor-pointer",
                      isActive
                        ? "bg-background text-foreground shadow-2xs font-semibold border border-border/60"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </BlurFade>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {filteredSkills.map((skill, id) => {
            const IconComp = getSkillIcon(skill.iconKey || skill.name);
            return (
              <BlurFade
                key={`${skill.name}-${selectedCategory}-${id}`}
                delay={BLUR_FADE_DELAY * 10 + id * 0.03}
                inView
              >
                <div className="border bg-background hover:bg-muted/50 border-border ring-2 ring-border/20 hover:ring-primary/20 rounded-xl h-8.5 w-fit px-3.5 flex items-center gap-2 transition-all duration-200 shadow-2xs group cursor-default">
                  {IconComp ? (
                    <IconComp className="size-4 rounded overflow-hidden object-contain transition-transform group-hover:scale-110" />
                  ) : (
                    <Layers className="size-3.5 text-muted-foreground" />
                  )}
                  <span className="text-foreground text-xs sm:text-sm font-medium">
                    {skill.name}
                  </span>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
