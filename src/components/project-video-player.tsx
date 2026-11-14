"use client";

import React from "react";
import { Play, Video as VideoIcon } from "lucide-react";

interface ProjectVideoPlayerProps {
  url: string;
  poster?: string;
  title?: string;
  className?: string;
}

export function parseVideoUrl(url: string) {
  if (!url) return null;
  const trimmed = url.trim();

  // YouTube match: watch, short url, embed, shorts
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: "youtube" as const,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`,
    };
  }

  // Loom match: loom.com/share/ID
  const loomMatch = trimmed.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/i);
  if (loomMatch && loomMatch[1]) {
    return {
      type: "loom" as const,
      embedUrl: `https://www.loom.com/embed/${loomMatch[1]}`,
    };
  }

  // Vimeo match: vimeo.com/ID
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "vimeo" as const,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // Direct video file (mp4, webm, ogg, etc.)
  return {
    type: "direct" as const,
    embedUrl: trimmed,
  };
}

export function ProjectVideoPlayer({
  url,
  poster,
  title = "Video Perkenalan Aplikasi",
  className = "",
}: ProjectVideoPlayerProps) {
  const parsed = parseVideoUrl(url);

  if (!parsed) return null;

  return (
    <div className={`relative w-full overflow-hidden rounded-xl border border-border bg-black/5 dark:bg-black/30 shadow-xs ${className}`}>
      <div className="relative w-full aspect-video">
        {parsed.type === "youtube" || parsed.type === "loom" || parsed.type === "vimeo" ? (
          <iframe
            src={parsed.embedUrl}
            title={title}
            className="size-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <video
            src={parsed.embedUrl}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="size-full object-cover"
          >
            Browser Anda tidak mendukung tag pemutar video.
          </video>
        )}
      </div>
    </div>
  );
}
