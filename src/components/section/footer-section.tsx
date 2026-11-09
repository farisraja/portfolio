"use client";

import { useLanguage } from "@/i18n/language-context";

interface FooterSectionProps {
  ownerName: string;
}

export function FooterSection({ ownerName }: FooterSectionProps) {
  const { t } = useLanguage();

  return (
    <footer className="mt-8 text-center text-xs text-muted-foreground border-t border-border/40 pt-6">
      <p>
        © {new Date().getFullYear()} {ownerName}. {t.footer.rightsReserved}
      </p>
    </footer>
  );
}
