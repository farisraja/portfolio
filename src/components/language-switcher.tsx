"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/language-context";
import { Globe, Check, X, Languages, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Supported Google Translate language options
const GOOGLE_LANGUAGES = [
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "zh-CN", name: "Chinese (Simplified)", native: "简体中文", flag: "🇨🇳" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
];

/**
 * 1. Segmented Glass Pill Switcher untuk TopNavbar (ID | EN + More)
 */
export function LanguageSegmentedPill({ className }: { className?: string }) {
  const { locale, setLocale, setIsOtherLanguageOpen } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center p-0.5 rounded-xl border border-border/70 bg-background/70 dark:bg-card/70 backdrop-blur-md shadow-2xs",
        className
      )}
      role="group"
      aria-label="Pilihan Bahasa / Language Selection"
    >
      {/* Tombol ID */}
      <button
        type="button"
        onClick={() => setLocale("id")}
        className={cn(
          "px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          locale === "id"
            ? "bg-primary text-primary-foreground shadow-xs scale-100"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
        )}
        aria-pressed={locale === "id"}
        title="Ubah ke Bahasa Indonesia"
      >
        ID
      </button>

      {/* Tombol EN */}
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          locale === "en"
            ? "bg-primary text-primary-foreground shadow-xs scale-100"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
        )}
        aria-pressed={locale === "en"}
        title="Switch to English"
      >
        EN
      </button>

      {/* Tombol More / Bahasa Lainnya */}
      <button
        type="button"
        onClick={() => setIsOtherLanguageOpen(true)}
        className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors ml-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        title="Bahasa Lainnya / Other Languages"
        aria-label="Buka pilihan semua bahasa"
      >
        <Globe className="size-3.5" />
      </button>
    </div>
  );
}

/**
 * 2. Dock Button untuk Floating Navbar Bawah (Tersinkronisasi)
 */
export function LanguageDockButton({ className }: { className?: string }) {
  const { locale, toggleLocale, setIsOtherLanguageOpen } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsOtherLanguageOpen(true);
      }}
      className={cn(
        "relative size-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 group focus-visible:outline-none",
        className
      )}
      aria-label={`Ganti Bahasa (Bahasa aktif: ${locale.toUpperCase()})`}
      title={`Bahasa saat ini: ${locale.toUpperCase()} (Klik untuk ganti ID ⇄ EN, klik kanan untuk bahasa lain)`}
    >
      <Languages className="size-4.5 sm:size-5 transition-transform duration-200 group-hover:scale-110" />
      <span className="absolute -top-1 -right-1 text-[9px] font-mono font-bold bg-primary text-primary-foreground px-1 py-0.2 rounded-full border border-background shadow-xs">
        {locale.toUpperCase()}
      </span>
    </button>
  );
}

/**
 * 3. Modal Pilihan Semua Bahasa (Dual Native + Google Translate Widget)
 */
export function OtherLanguagesModal() {
  const { locale, setLocale, isOtherLanguageOpen, setIsOtherLanguageOpen, t } = useLanguage();
  const [selectedAutoLang, setSelectedAutoLang] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOtherLanguageOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOtherLanguageOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOtherLanguageOpen, setIsOtherLanguageOpen]);

  // Google Translate cookie trigger
  const applyGoogleTranslate = useCallback((langCode: string) => {
    setSelectedAutoLang(langCode);
    try {
      // Set the standard Google Translate cookie: /auto/langCode
      document.cookie = `googtrans=/auto/${langCode}; path=/; SameSite=Lax`;
      document.cookie = `googtrans=/auto/${langCode}; domain=${window.location.hostname}; path=/; SameSite=Lax`;

      // Trigger translate element if already initialized
      const scriptId = "google-translate-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        (window as any).googleTranslateElementInit = () => {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "id",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        };
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.warn("Google translate trigger error:", e);
    }
  }, []);

  const resetGoogleTranslate = useCallback(() => {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    setSelectedAutoLang(null);
  }, []);

  if (!isOtherLanguageOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pilihan Bahasa Portofolio"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsOtherLanguageOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-card border border-border/80 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 text-foreground animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-2 border-b border-border/40">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Globe className="size-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                {locale === "id" ? "Pilihan Bahasa" : "Language Settings"}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {locale === "id"
                  ? "Pilih bahasa tampilan portofolio"
                  : "Choose your preferred portfolio language"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOtherLanguageOpen(false)}
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Tutup modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* 1. Bahasa Utama (Kualitas Native Terkurasi) */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-muted-foreground">
            {locale === "id" ? "BAHASA UTAMA (TERKURASI RESMI)" : "PRIMARY LANGUAGES (OFFICIAL)"}
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Indonesian Option */}
            <button
              type="button"
              onClick={() => {
                resetGoogleTranslate();
                setLocale("id");
                setIsOtherLanguageOpen(false);
              }}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200",
                locale === "id" && !selectedAutoLang
                  ? "border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary/20"
                  : "border-border/70 hover:border-border hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🇮🇩</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">Indonesia</span>
                  <span className="text-[10px] text-muted-foreground">Bahasa Asli</span>
                </div>
              </div>
              {locale === "id" && !selectedAutoLang && <Check className="size-4 text-primary" />}
            </button>

            {/* English Option */}
            <button
              type="button"
              onClick={() => {
                resetGoogleTranslate();
                setLocale("en");
                setIsOtherLanguageOpen(false);
              }}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200",
                locale === "en" && !selectedAutoLang
                  ? "border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary/20"
                  : "border-border/70 hover:border-border hover:bg-muted/50"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🇬🇧</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">English</span>
                  <span className="text-[10px] text-muted-foreground">Professional</span>
                </div>
              </div>
              {locale === "en" && !selectedAutoLang && <Check className="size-4 text-primary" />}
            </button>
          </div>
        </div>

        {/* 2. Bahasa Internasional Lainnya (Google Translate Integration) */}
        <div className="flex flex-col gap-2 pt-1 border-t border-border/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-muted-foreground">
              {locale === "id" ? "SEMUA BAHASA LAINNYA" : "ALL OTHER LANGUAGES"}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
              <Sparkles className="size-3 text-amber-500" />
              Auto-Translate
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {GOOGLE_LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  applyGoogleTranslate(item.code);
                  setIsOtherLanguageOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition-colors",
                  selectedAutoLang === item.code
                    ? "border-primary bg-primary/10 font-bold text-primary"
                    : "border-border/60 hover:bg-muted/60 text-foreground"
                )}
                title={`Terjemahkan ke ${item.name}`}
              >
                <span className="text-base">{item.flag}</span>
                <span className="truncate text-[11px]">{item.native}</span>
              </button>
            ))}
          </div>

          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            {locale === "id"
              ? "Catatan: Opsi ID dan EN menggunakan kurasi kalimat profesional. Bahasa lainnya diterjemahkan otomatis melalui Google Cloud Translation."
              : "Note: ID and EN offer professional human-curated translations. Other languages are translated automatically via Google Cloud Translation."}
          </p>
        </div>

        {/* Hidden Google Translate Mount Container */}
        <div id="google_translate_element" className="hidden" aria-hidden="true" />
      </div>
    </div>
  );
}
