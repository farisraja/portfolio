"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // 1. Cek apakah pengguna saat ini mengaktifkan filter admin di browsernya
    if (typeof window === "undefined") return;

    if (window.location.hash === "#no-track") {
      try {
        localStorage.setItem("faris_analytics_disabled", "true");
        console.log("[Analytics] Tracking dinonaktifkan untuk perangkat ini.");
      } catch {}
    }

    try {
      if (localStorage.getItem("faris_analytics_disabled") === "true") {
        return; // Jangan lacak kunjungan pemilik sendiri
      }
    } catch {}

    const fullPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Hindari duplikasi pelacakan ganda untuk path yang sama dalam satu transisi halaman
    if (lastTrackedPath.current === fullPath) return;
    lastTrackedPath.current = fullPath;

    // Batasi pengiriman untuk path yang sama dalam rentang 30 detik (debounce reload)
    const sessionKey = `tracked_${fullPath}`;
    const now = Date.now();
    try {
      const lastSessionTrack = sessionStorage.getItem(sessionKey);
      if (lastSessionTrack && now - parseInt(lastSessionTrack, 10) < 30000) {
        return;
      }
      sessionStorage.setItem(sessionKey, String(now));
    } catch {}

    const payload = JSON.stringify({
      pathname: fullPath,
      referrer: typeof document !== "undefined" ? document.referrer || "" : "",
    });

    // Kirim via sendBeacon (asinkron & non-blocking), dengan fallback fetch keepalive
    try {
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/track", blob);
      } else {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {}
  }, [pathname, searchParams]);

  return null;
}
