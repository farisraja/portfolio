"use client";

import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { useLanguage } from "@/i18n/language-context";
import { FileText, ArrowUpRight, Download } from "lucide-react";

export type ContactSectionProps = {
  twitterUrl?: string | null;
  whatsappUrl?: string | null;
  email?: string | null;
  githubUrl?: string | null;
};

export default function ContactSection({
  twitterUrl,
  whatsappUrl,
  email,
  githubUrl,
}: ContactSectionProps = {}) {
  const { t, locale } = useLanguage();
  const hasTwitter = Boolean(twitterUrl && twitterUrl.trim() !== "");
  const hasWhatsapp = Boolean(whatsappUrl && whatsappUrl.trim() !== "");
  const hasEmail = Boolean(email && email.trim() !== "");
  const hasGithub = Boolean(githubUrl && githubUrl.trim() !== "");
  const hasAnyContact = hasTwitter || hasWhatsapp || hasEmail || hasGithub;

  return (
    <div className="border rounded-xl p-6 sm:p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">{t.contact.badge}</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={4}
          gridGap={5}
          flickerChance={0.15}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          {t.contact.title}
        </h2>
        {hasAnyContact ? (
          <p className="mx-auto max-w-lg text-muted-foreground text-balance">
            {t.contact.descriptionPrefix}
            {hasEmail && (
              <>
                {" "}
                <Link
                  href={`mailto:${email}`}
                  className="text-primary font-medium hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Email
                </Link>
              </>
            )}
            {hasWhatsapp && (
              <>
                {hasEmail ? ` ${t.contact.orText} ` : " "}
                <Link
                  href={whatsappUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 font-medium hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  WhatsApp
                </Link>
              </>
            )}
            {hasTwitter && (
              <>
                {hasEmail || hasWhatsapp ? ` ${t.contact.orText} ` : " "}
                <Link
                  href={twitterUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  Twitter / X
                </Link>
              </>
            )}
            {hasGithub && (
              <>
                {hasEmail || hasWhatsapp || hasTwitter ? ` ${t.contact.orProfileText} ` : " "}
                <Link
                  href={githubUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Profil GitHub Faris Raja Ardana"
                  className="text-foreground font-semibold hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  GitHub
                </Link>
              </>
            )}
            {t.contact.period}
          </p>
        ) : (
          <p className="mx-auto max-w-lg text-muted-foreground text-balance">
            {locale === "en"
              ? "Interested in collaborating or discussing opportunities? Direct contact channels will be updated shortly."
              : "Tertarik untuk berdiskusi atau berkolaborasi? Saluran kontak langsung akan segera diperbarui."}
          </p>
        )}

        {/* Recruiter Fast-Track Card (Harvard CV Access) */}
        <div className="mt-3 pt-3 border-t border-border/60 w-full max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-muted/30 dark:bg-muted/15 backdrop-blur-xs p-3.5 rounded-2xl border border-border/80">
          <div className="text-center sm:text-left text-xs">
            <p className="font-semibold text-foreground flex items-center justify-center sm:justify-start gap-1.5">
              <FileText className="size-3.5 text-primary shrink-0" />
              <span>{locale === "en" ? "Looking for my verified CV?" : "Butuh resume kualifikasi lengkap?"}</span>
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {locale === "en"
                ? "Harvard format • ATS-compliant 2-page PDF"
                : "Format Harvard 2 Halaman ramah sistem ATS"}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/cv?lang=${locale}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-2xs cursor-pointer"
            >
              <span>{locale === "en" ? "View CV" : "Buka CV"}</span>
              <ArrowUpRight className="size-3" />
            </Link>
            <a
              href={locale === "en" ? "/cv-faris-raja-ardana-en.pdf" : "/cv-faris-raja-ardana-id.pdf"}
              download={locale === "en" ? "Faris_Raja_Ardana_CV_EN.pdf" : "Faris_Raja_Ardana_CV_ID.pdf"}
              title={locale === "en" ? "Download Vector PDF" : "Unduh Berkas PDF"}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground text-xs transition-colors cursor-pointer"
            >
              <Download className="size-3" />
              <span>PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
