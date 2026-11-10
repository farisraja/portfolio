"use client";

import React, { useEffect, useState } from "react";
import { Activity, Globe, Eye } from "lucide-react";
import { useLanguage } from "@/i18n/language-context";

interface StatsData {
  totalVisits: number;
  sampleUnique: number;
  recentVisits: Array<{
    pathname: string;
    countryCode?: string;
    country?: string;
    city?: string;
    createdAt?: string;
  }>;
}

function getFlagEmoji(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2 || countryCode === "LOCAL") return "🌐";
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return "🌐";
  }
}

export function VisitorBadge() {
  const { locale } = useLanguage();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/analytics/stats")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data.success) {
          setStats(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading || !stats || stats.totalVisits === 0) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-muted/30 text-[11px] text-muted-foreground/80 backdrop-blur-sm animate-pulse">
        <Activity className="size-3 text-primary animate-spin" />
        <span>{locale === "en" ? "Connecting visitor logs..." : "Menghubungkan riwayat..."}</span>
      </div>
    );
  }

  const latest = stats.recentVisits[0];
  const flag = latest?.countryCode ? getFlagEmoji(latest.countryCode) : "🌐";
  const locationLabel = latest?.city && latest?.city !== "Lokal Dev"
    ? `${latest.city}, ${latest.country || latest.countryCode}`
    : latest?.country || "Global";

  return (
    <div
      className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-border/60 bg-background/80 dark:bg-card/70 backdrop-blur-md text-[11px] text-muted-foreground shadow-xs transition-all hover:border-primary/40 group"
      title={
        locale === "en"
          ? `Total visits: ${stats.totalVisits} across public pages`
          : `Total kunjungan: ${stats.totalVisits} di seluruh halaman portofolio`
      }
    >
      <span className="flex items-center gap-1.5 font-medium text-foreground">
        <Eye className="size-3 text-primary group-hover:scale-110 transition-transform" />
        <span>{stats.totalVisits.toLocaleString("id-ID")}</span>
        <span className="text-muted-foreground font-normal">
          {locale === "en" ? "visits" : "kunjungan"}
        </span>
      </span>

      <span className="text-border/80 font-light">•</span>

      <span className="flex items-center gap-1.5">
        <span className="text-xs leading-none">{flag}</span>
        <span className="truncate max-w-[180px]">
          {locale === "en" ? "Last visited from" : "Terakhir dari"}{" "}
          <strong className="font-medium text-foreground">{locationLabel}</strong>
        </span>
      </span>
    </div>
  );
}
