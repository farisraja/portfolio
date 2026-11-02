/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import CertificatesSection from "@/components/section/certificates-section";
import WorkSection from "@/components/section/work-section";
import Navbar from "@/components/navbar";
import { TopNavbar } from "@/components/top-navbar";
import { HeroSection } from "@/components/section/hero-section";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { getPortfolioData, formatWhatsAppUrl } from "@/lib/payload-data";
import { getSkillIcon } from "@/lib/skill-icons";
import { TypingEffect } from "@/components/magicui/typing-effect";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const data = await getPortfolioData();
  const owner = data.siteSettings.ownerName || data.siteSettings.name || "Faris Raja Ardana";

  const whatsappUrl = formatWhatsAppUrl(
    data.siteSettings.whatsapp,
    data.siteSettings.whatsappMessage
  );

  return (
    <div className="relative z-10 w-full min-h-dvh flex flex-col items-center pb-28">
      <TopNavbar ownerName={owner} whatsappUrl={whatsappUrl} />

      {!data.isFromDatabase && data.dbError && (
        <div className="w-full max-w-2xl px-6 pt-4">
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs px-3 py-2 rounded-xl text-center">
            <strong>Status CMS:</strong> {data.dbError}
          </div>
        </div>
      )}

      {/* 1. HERO SECTION ARSITEKTURAL (Layered Cutout + Outlined Typography ala Referensi) */}
      <HeroSection
        name={data.profile.name || "Faris Raja Ardana"}
        description={data.profile.description}
        avatarUrl="/faris-cutout.png"
      />

      {/* 2. BAGIAN TEKS PANJANG (About, Experience, Education, Skills) - Lebar Nyaman max-w-2xl */}
      <div className="w-full max-w-2xl mx-auto px-6 flex flex-col gap-14 my-4">
        <section id="about">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h2 className="text-xl font-bold">Tentang Saya</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
                <Markdown>{data.profile.summary}</Markdown>
              </div>
            </BlurFade>
          </div>
        </section>

        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-xl font-bold">Pengalaman</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 6}>
              <WorkSection data={data.experiences} />
            </BlurFade>
          </div>
        </section>

        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Pendidikan</h2>
            </BlurFade>
            <div className="flex flex-col gap-8">
              {data.education.map((education, index) => (
                <BlurFade
                  key={`${education.school}-${index}`}
                  delay={BLUR_FADE_DELAY * 8 + index * 0.05}
                >
                  <div className="flex items-center gap-x-3 justify-between group">
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                      {education.logoUrl ? (
                        <img
                          src={education.logoUrl}
                          alt={education.school}
                          className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                        />
                      ) : (
                        <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                      )}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="font-semibold leading-none flex items-center gap-2">
                          {education.school}
                          {education.href && (
                            <Link
                              href={education.href}
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
                          {education.degree}
                        </div>
                      </div>
                    </div>
                    {((education.start && education.start.trim() !== "") ||
                      (education.end && education.end.trim() !== "")) && (
                      <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                        <span>
                          {education.start
                            ? education.end
                              ? `${education.start} - ${education.end}`
                              : `${education.start} - Sekarang`
                            : education.end}
                        </span>
                      </div>
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Keahlian</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, id) => {
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
      </div>

      {/* 3. PROYEK UNGGULAN DENGAN BENTO GRID - Lebar max-w-5xl (Sekitar 1040px) */}
      {data.projects && data.projects.length > 0 && (
        <section id="projects" className="w-full max-w-5xl mx-auto px-4 sm:px-6 my-10 sm:my-14">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <ProjectsSection data={data.projects} />
          </BlurFade>
        </section>
      )}

      {/* 4. LISENSI & SERTIFIKASI (Sertifikat Khusus & Sertifikat Umum) - Lebar max-w-5xl */}
      {data.certificates && data.certificates.length > 0 && (
        <section id="certificates" className="w-full max-w-5xl mx-auto px-4 sm:px-6 my-10 sm:my-14">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <CertificatesSection data={data.certificates} />
          </BlurFade>
        </section>
      )}

      {/* 5. HACKATHONS, KONTAK, DAN FOOTER - Lebar Nyaman max-w-2xl */}
      <div className="w-full max-w-2xl mx-auto px-6 flex flex-col gap-14 my-4">
        {data.hackathons && data.hackathons.length > 0 && (
          <section id="hackathons">
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <HackathonsSection data={data.hackathons} />
            </BlurFade>
          </section>
        )}

        <section id="contact">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <ContactSection
              twitterUrl={data.siteSettings.social?.x}
              whatsappUrl={whatsappUrl}
              email={data.siteSettings.email}
              githubUrl={data.siteSettings.social?.github}
            />
          </BlurFade>
        </section>

        <footer className="mt-8 text-center text-xs text-muted-foreground border-t border-border/40 pt-6">
          <p>© {new Date().getFullYear()} {owner}.</p>
        </footer>
      </div>

      {/* Navigasi Floating Dock Bawah (Beranda) */}
      <Navbar social={data.siteSettings.social} ownerName={owner} />
    </div>
  );
}
