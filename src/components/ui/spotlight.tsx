"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

/**
 * Spotlight component delivering a subtle, soft blue ambient light beam
 * across the hero area, inspired by Aceternity UI Spotlight.
 *
 * - Dark mode: low-intensity soft blue glow.
 * - Light mode: dominant clean background with whisper-thin blue gradient tint.
 * - Pure SVG & CSS gradients, zero heavy runtime dependencies, pointer-events-none, aria-hidden.
 */
export function Spotlight({ className, fill = "#3b82f6" }: SpotlightProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[450px] sm:h-[540px] select-none overflow-hidden z-0",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Ambient soft radial gradient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[680px] sm:w-[920px] lg:w-[1100px] h-[300px] sm:h-[400px] rounded-full blur-[90px] sm:blur-[130px] opacity-45 dark:opacity-25 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 10%, rgba(59, 130, 246, 0.32), rgba(147, 197, 253, 0.1) 45%, transparent 75%)",
        }}
      />

      {/* 2. Directional soft spotlight beam */}
      <svg
        className="absolute -top-10 sm:-top-16 left-1/2 -translate-x-1/2 w-[760px] sm:w-[1000px] lg:w-[1200px] h-[440px] sm:h-[520px] opacity-65 dark:opacity-30 pointer-events-none transition-opacity duration-500"
        viewBox="0 0 1000 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#hero-spotlight-filter)">
          <ellipse
            cx="500"
            cy="110"
            rx="420"
            ry="150"
            fill="url(#hero-spotlight-grad)"
          />
        </g>
        <defs>
          <filter
            id="hero-spotlight-filter"
            x="-50"
            y="-50"
            width="1100"
            height="600"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="75" />
          </filter>
          <radialGradient
            id="hero-spotlight-grad"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(500 70) rotate(90) scale(180 430)"
          >
            <stop stopColor="rgb(59 130 246)" stopOpacity="0.25" />
            <stop offset="0.55" stopColor="rgb(147 197 253)" stopOpacity="0.07" />
            <stop offset="1" stopColor="rgb(59 130 246)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
