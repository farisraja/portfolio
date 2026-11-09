import BlurFade from "@/components/magicui/blur-fade";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import CertificatesSection from "@/components/section/certificates-section";
import WorkSection from "@/components/section/work-section";
import { AboutSection } from "@/components/section/about-section";
import { EducationSection } from "@/components/section/education-section";
import { SkillsSection } from "@/components/section/skills-section";
import { FooterSection } from "@/components/section/footer-section";
import Navbar from "@/components/navbar";
import { TopNavbar } from "@/components/top-navbar";
import { HeroSection } from "@/components/section/hero-section";
import { getPortfolioData, formatWhatsAppUrl } from "@/lib/payload-data";

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
        <AboutSection summary={data.profile.summary} />

        <section id="work">
          <WorkSection data={data.experiences} />
        </section>

        <EducationSection education={data.education} />

        <SkillsSection skills={data.skills} />
      </div>

      {/* 3. PROYEK UNGGULAN DENGAN BENTO GRID & 3D COVER FLOW - Lebar max-w-5xl */}
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

        <FooterSection ownerName={owner} />
      </div>

      {/* Navigasi Floating Dock Bawah (Beranda) */}
      <Navbar social={data.siteSettings.social} ownerName={owner} />
    </div>
  );
}
