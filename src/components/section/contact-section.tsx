"use client";

import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { useLanguage } from "@/i18n/language-context";

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
          squareSize={2}
          gridGap={2}
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
      </div>
    </div>
  );
}
