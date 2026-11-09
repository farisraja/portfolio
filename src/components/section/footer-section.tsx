"use client";

interface FooterSectionProps {
  ownerName: string;
}

export function FooterSection({ ownerName }: FooterSectionProps) {
  return (
    <footer className="mt-8 text-center text-xs text-muted-foreground border-t border-border/40 pt-6">
      <p>© {new Date().getFullYear()} {ownerName}.</p>
    </footer>
  );
}
