"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { getSkillIcon } from "@/lib/skill-icons";
import { useLanguage } from "@/i18n/language-context";

const BLUR_FADE_DELAY = 0.04;

export type SkillItem = {
  name: string;
  iconKey?: string | null;
  category?: string | null;
};

interface SkillsSectionProps {
  skills: SkillItem[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLanguage();

  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">{t.skills.title}</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, id) => {
            const IconComp = getSkillIcon(skill.iconKey || skill.name);
            return (
              <BlurFade
                key={`${skill.name}-${id}`}
                delay={BLUR_FADE_DELAY * 10 + id * 0.07}
                inView
              >
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  {IconComp && (
                    <IconComp className="size-4 rounded overflow-hidden object-contain" />
                  )}
                  <span className="text-foreground text-sm font-medium">
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
