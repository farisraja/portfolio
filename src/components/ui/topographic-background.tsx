"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TopographicBackgroundProps {
  className?: string;
}

/**
 * TopographicBackground
 * 
 * Menghadirkan latar belakang bergaris kontur topografi (Topographic Contour Waves)
 * futuristik dan elegan ala portofolio engineering Silicon Valley / cyber-tech.
 * 
 * Dioptimasi dengan GPU hardware acceleration via translate3d & requestAnimationFrame
 * (Zero React Re-render saat mouse bergerak, 60fps mulus tanpa beban CPU).
 */
export function TopographicBackground({ className }: TopographicBackgroundProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMoving) {
        isMoving = true;
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = "1";
        }
      }
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${e.clientX - 240}px, ${e.clientY - 240}px, 0)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Latar Belakang Gradasi Radial Ambien */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(147,51,234,0.06),transparent_65%)] dark:bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(147,51,234,0.05),transparent_65%)]" />

      {/* 2. Topographic SVG Vector Lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60 dark:opacity-85 transition-opacity duration-700"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <defs>
          <linearGradient id="topo-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--topo-line, rgba(0,0,0,0.02))" />
            <stop offset="30%" stopColor="var(--topo-line-mid, rgba(0,0,0,0.10))" />
            <stop offset="70%" stopColor="var(--topo-line-bright, rgba(0,0,0,0.07))" />
            <stop offset="100%" stopColor="var(--topo-line, rgba(0,0,0,0.02))" />
          </linearGradient>

          <linearGradient id="topo-grad-accent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="45%" stopColor="rgba(59, 130, 246, 0.25)" />
            <stop offset="55%" stopColor="rgba(147, 51, 234, 0.20)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <filter id="topo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Layer Gelombang 1 */}
        <path
          d="M -100 90 C 260 20, 540 160, 820 90 C 1100 20, 1320 130, 1540 80"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-slow"
        />
        <path
          d="M -100 115 C 270 45, 550 185, 830 115 C 1110 45, 1330 155, 1540 105"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="1.0"
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-slow opacity-60"
        />

        {/* Layer Gelombang 2 */}
        <path
          d="M -100 240 C 220 310, 500 190, 800 270 C 1100 350, 1320 220, 1540 260"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-reverse"
        />
        <path
          d="M -100 255 C 230 325, 510 205, 810 285 C 1110 365, 1330 235, 1540 275"
          fill="none"
          stroke="url(#topo-grad-accent)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-reverse"
        />

        {/* Layer Gelombang 3 */}
        <path
          d="M -100 410 C 310 350, 620 480, 940 400 C 1220 330, 1380 430, 1540 390"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-slow"
        />
        <path
          d="M -100 435 C 320 375, 630 505, 950 425 C 1230 355, 1390 455, 1540 415"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-slow opacity-50"
        />

        {/* Layer Gelombang 4 */}
        <path
          d="M -100 580 C 240 680, 600 520, 920 630 C 1200 720, 1400 580, 1540 610"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="1.3"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-reverse"
        />
        <path
          d="M -100 600 C 250 700, 610 540, 930 650 C 1210 740, 1410 600, 1540 630"
          fill="none"
          stroke="url(#topo-grad-accent)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-reverse"
        />
        <path
          d="M -100 620 C 260 720, 620 560, 940 670 C 1220 760, 1420 620, 1540 650"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="0.8"
          strokeDasharray="6 6"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-reverse opacity-40"
        />

        {/* Layer Gelombang 5 */}
        <path
          d="M -100 740 C 290 690, 640 820, 960 730 C 1240 650, 1390 770, 1540 720"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-slow"
        />
        <path
          d="M -100 760 C 300 710, 650 840, 970 750 C 1250 670, 1400 790, 1540 740"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-slow opacity-60"
        />

        {/* Layer Gelombang 6 */}
        <path
          d="M -100 860 C 250 920, 580 810, 890 890 C 1170 960, 1370 850, 1540 880"
          fill="none"
          stroke="url(#topo-grad-1)"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
          className="topo-wave-reverse"
        />
      </svg>

      {/* 3. GPU Hardware-Accelerated Spotlight (Zero Re-render) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full transition-opacity duration-300 opacity-0 will-change-transform"
        style={{
          width: "480px",
          height: "480px",
          background:
            "radial-gradient(circle closest-side, rgba(59, 130, 246, 0.12), rgba(147, 51, 234, 0.04) 50%, transparent 80%)",
          filter: "blur(20px)",
        }}
      />

      {/* 4. Lapisan Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.18)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.50)_100%)]" />
    </div>
  );
}
