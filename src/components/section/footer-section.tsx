"use client";

import { VisitorBadge } from "@/components/analytics/visitor-badge";

interface FooterSectionProps {
  ownerName: string;
}

export function FooterSection({ ownerName }: FooterSectionProps) {
  return (
    <footer className="mt-8 flex flex-col items-center justify-center gap-3.5 text-center text-xs text-muted-foreground border-t border-border/40 pt-6">
      <VisitorBadge />
      <p>© {new Date().getFullYear()} {ownerName}.</p>
    </footer>
  );
}
