/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export interface GalleryItem {
  url: string;
  alt?: string;
  caption?: string;
}

interface Props {
  items: GalleryItem[];
  projectTitle: string;
}

export function ProjectGalleryLightbox({ items, projectTitle }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = selectedIndex !== null;
  const currentItem = selectedIndex !== null ? items[selectedIndex] : null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % items.length);
  }, [items.length, selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + items.length) % items.length);
  }, [items.length, selectedIndex]);

  // Keyboard navigation & Escape support
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, handleClose, handleNext, handlePrev]);

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Thumbnail Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <figure
            key={`${item.url}-${idx}`}
            className="group relative rounded-xl border border-border bg-card overflow-hidden shadow-xs hover:border-primary/40 transition-colors"
          >
            <button
              type="button"
              ref={idx === selectedIndex ? triggerRef : undefined}
              onClick={() => setSelectedIndex(idx)}
              className="relative w-full aspect-video block overflow-hidden cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Perbesar tampilan: ${item.caption || item.alt || `${projectTitle} screenshot ${idx + 1}`}`}
            >
              <img
                src={item.url}
                alt={item.alt || `Tampilan ${projectTitle}`}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-250 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 size-8 rounded-full bg-black/60 text-white flex items-center justify-center shadow-md">
                  <Maximize2 className="size-4" />
                </span>
              </div>
            </button>
            {item.caption && (
              <figcaption className="p-2.5 text-xs text-muted-foreground text-center border-t border-border/50 bg-muted/20">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox Dialog Modal */}
      {isOpen && currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau Gambar: ${currentItem.caption || currentItem.alt || projectTitle}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Lightbox Container */}
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between text-white/80 px-2">
              <span className="text-xs font-mono tracking-wider">
                {items.length > 1
                  ? `${selectedIndex! + 1} / ${items.length}`
                  : "Pratinjau Screenshot"}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center size-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Tutup pratinjau gambar (Escape)"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Main Image Frame (Proporsi Asli) */}
            <div className="relative flex items-center justify-center max-w-full max-h-[78vh] overflow-hidden rounded-lg bg-black/40 border border-white/10 shadow-2xl">
              <img
                src={currentItem.url}
                alt={currentItem.alt || `Tampilan ${projectTitle}`}
                className="max-h-[78vh] max-w-full w-auto h-auto object-contain select-none"
              />

              {/* Prev / Next Buttons (if multiple images) */}
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Gambar sebelumnya (Panah Kiri)"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Gambar berikutnya (Panah Kanan)"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            {currentItem.caption && (
              <div className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs text-center backdrop-blur-xs max-w-lg">
                {currentItem.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
