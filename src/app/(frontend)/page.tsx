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
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { getPortfolioData, formatWhatsAppUrl } from "@/lib/payload-data";
import { getSkillIcon } from "@/lib/skill-icons";

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
      {!data.isFromDatabase && data.dbError && (
        <div className="w-full max-w-2xl px-6 pt-4">
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs px-3 py-2 rounded-xl text-center">
            <strong>Status CMS:</strong> {data.dbError}
          </div>
        </div>
      )}

      {/* 1. HERO DUA KOLOM (1040–1120px) DENGAN SPOTLIGHT HALUS */}
      <section id="hero" className="relative w-full overflow-hidden pt-8 pb-10 sm:pt-14 sm:pb-16 md:pt-18 md:pb-20">
        <Spotlight />
        <div className="relative z-10 w-full max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Kolom Kiri: Teks & Tombol Aksi */}
            <div className="flex flex-col gap-3.5 sm:gap-4 text-center md:text-left items-center md:items-start flex-1 min-w-0">
              <BlurFade delay={BLUR_FADE_DELAY} yOffset={10}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium w-fit mb-0.5">
                  <span className="size-2 rounded-full bg-primary" />
                  <span>Web & Software Developer</span>
                </div>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY + 0.06} yOffset={10}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                  {data.profile.name || "Faris Raja Ardana"}
                </h1>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY + 0.12} yOffset={10}>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-[560px] leading-relaxed text-pretty">
                  {data.profile.description ||
                    "Saya membangun website dan aplikasi yang mudah digunakan untuk kebutuhan sehari-hari."}
                </p>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY + 0.18} yOffset={10}>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span>Lihat Proyek</span>
                    <ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card/60 backdrop-blur-xs text-foreground text-sm font-medium hover:bg-muted hover:border-border/80 transition-all duration-200 shadow-2xs group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span>Hubungi Saya</span>
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </BlurFade>
            </div>

            {/* Kolom Kanan: Foto Profil Menonjol (160–200px di mobile, 220–280px di desktop) */}
            <BlurFade delay={BLUR_FADE_DELAY + 0.08} yOffset={12} className="shrink-0">
              <div className="group relative size-44 sm:size-52 md:size-60 lg:size-64 rounded-full border border-border/80 shadow-xl ring-4 ring-muted/60 dark:ring-muted/30 dark:shadow-[0_0_35px_-5px_rgba(59,130,246,0.18)] shrink-0 select-none overflow-hidden isolate mx-auto md:mx-0">
                <img
                  alt="Foto profil Faris Raja Ardana"
                  src={data.profile.avatarUrl}
                  className="profile-avatar-image size-full object-cover object-[50%_20%] transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transform-none"
                  style={{ objectPosition: "50% 20%" }}
                />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

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
                    delay={BLUR_FADE_DELAY * 10 + id * 0.05}
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
