"use client";

import { useState, useEffect, useCallback } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { type CertificateItem } from "@/lib/payload-data";
import { DATA } from "@/data/resume";
import {
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Hash,
  Maximize2,
  ShieldCheck,
  X,
  ZoomIn,
  FileCheck2,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/i18n/language-context";

const BLUR_FADE_DELAY = 0.04;

interface CertificatesSectionProps {
  data?: CertificateItem[];
}

function CertificateThumbnailImage({
  image,
  thumbnail,
  alt,
  onClick,
}: {
  image: string;
  thumbnail?: string | null;
  alt: string;
  onClick: () => void;
}) {
  const getInitialSrc = () => {
    if (thumbnail) return thumbnail;
    if (image.includes("-300x300.") || image.startsWith("data:")) return image;
    const dotIndex = image.lastIndexOf(".");
    if (dotIndex !== -1) {
      return `${image.substring(0, dotIndex)}-300x300${image.substring(dotIndex)}`;
    }
    return image;
  };

  const [src, setSrc] = useState(getInitialSrc);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (src !== image) {
          setSrc(image);
        }
      }}
      className="size-full object-cover object-center transition-transform duration-300 ease-out group-hover/img:scale-105 cursor-pointer"
      onClick={onClick}
    />
  );
}

export default function CertificatesSection({ data }: CertificatesSectionProps) {
  const { t, locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"khusus" | "umum">("khusus");
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
    issuer: string;
    credentialId?: string | null;
  } | null>(null);

  const certificatesList =
    data && data.length > 0
      ? data
      : ((DATA.certificates || []) as unknown as CertificateItem[]);

  if (certificatesList.length === 0) {
    return null;
  }

  const khususCertificates = certificatesList.filter(
    (c) => c.category === "khusus" || !c.category
  );
  const umumCertificates = certificatesList.filter((c) => c.category === "umum");

  const activeCertificates =
    selectedCategory === "khusus" ? khususCertificates : umumCertificates;

  // Handle ESC key to close modal
  const handleCloseModal = useCallback(() => {
    setPreviewImage(null);
  }, []);

  useEffect(() => {
    if (!previewImage) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewImage, handleCloseModal]);

  const getCertData = (cert: CertificateItem) => {
    if (locale !== "en") {
      return {
        title: cert.title,
        description: cert.description,
      };
    }
    const trans = t.certificates.certTranslations?.[cert.title];
    return {
      title: trans?.title || cert.title,
      description: trans?.description || cert.description,
    };
  };

  return (
    <div className="flex min-h-0 flex-col gap-y-8 w-full">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full max-w-[600px]">
          <div className="section-divider-shimmer" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1 mx-3 shrink-0">
            <span className="text-background text-sm font-medium">
              {t.certificates.badge}
            </span>
          </div>
          <div className="section-divider-shimmer" />
        </div>
        <div className="flex flex-col gap-y-2 items-center justify-center text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
            {t.certificates.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-[600px] text-pretty">
            {t.certificates.description}
          </p>
        </div>
      </div>

      {/* 2. Interactive Segmented Tabs (2 Pilihan: Sertifikat Khusus & Sertifikat Umum) */}
      <div className="flex flex-col items-center gap-3 w-full max-w-xl mx-auto">
        <div className="inline-flex p-1.5 rounded-2xl bg-muted/60 border border-border/80 backdrop-blur-md shadow-xs w-full sm:w-auto">
          {/* Tab 1: Sertifikat Khusus */}
          <button
            type="button"
            onClick={() => setSelectedCategory("khusus")}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              selectedCategory === "khusus"
                ? "bg-background text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            }`}
          >
            <ShieldCheck
              className={`size-4 transition-colors ${
                selectedCategory === "khusus" ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <span>{t.certificates.tabKhusus}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-mono font-medium transition-colors ${
                selectedCategory === "khusus"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {khususCertificates.length}
            </span>
          </button>

          {/* Tab 2: Sertifikat Umum */}
          <button
            type="button"
            onClick={() => setSelectedCategory("umum")}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              selectedCategory === "umum"
                ? "bg-background text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            }`}
          >
            <GraduationCap
              className={`size-4 transition-colors ${
                selectedCategory === "umum" ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <span>{t.certificates.tabUmum}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-mono font-medium transition-colors ${
                selectedCategory === "umum"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {umumCertificates.length}
            </span>
          </button>
        </div>

        {/* Tab Description helper */}
        <p className="text-xs text-muted-foreground text-center max-w-md animate-in fade-in duration-300">
          {selectedCategory === "khusus" ? (
            <span>
              <strong>{t.certificates.tabKhusus}:</strong> {t.certificates.tabKhususDesc}
            </span>
          ) : (
            <span>
              <strong>{t.certificates.tabUmum}:</strong> {t.certificates.tabUmumDesc}
            </span>
          )}
        </p>
      </div>

      {/* 3. Certificate Cards Grid */}
      {activeCertificates.length === 0 ? (
        <div className="w-full py-12 px-4 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center">
          <div className="size-12 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground mb-3">
            <Award className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            {t.certificates.noCertificates}
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mt-1">
            {t.certificates.noCertificatesDesc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {activeCertificates.map((cert, index) => {
            const isKhusus = cert.category === "khusus" || !cert.category;
            const certData = getCertData(cert);
            const categoryBadgeLabel = isKhusus
              ? locale === "en"
                ? "Specialized"
                : "Khusus"
              : locale === "en"
              ? "General"
              : "Umum";

            return (
              <BlurFade
                key={`${cert.title}-${selectedCategory}-${index}`}
                delay={BLUR_FADE_DELAY * 12 + index * 0.05}
                className="h-full"
              >
                <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-border/80 bg-card/60 hover:bg-card/90 backdrop-blur-xs overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-border">
                  {/* === FOTO / GAMBAR SERTIFIKAT === */}
                  {cert.image ? (
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted/40 border-b border-border/70 group/img">
                      <CertificateThumbnailImage
                        image={cert.image}
                        thumbnail={cert.thumbnailUrl}
                        alt={`Sertifikat ${certData.title} - ${cert.issuer}`}
                        onClick={() =>
                          setPreviewImage({
                            url: cert.image!,
                            title: certData.title,
                            issuer: cert.issuer,
                            credentialId: cert.credentialId,
                          })
                        }
                      />
                      {/* Overlay Tombol Perbesar */}
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImage({
                            url: cert.image!,
                            title: certData.title,
                            issuer: cert.issuer,
                            credentialId: cert.credentialId,
                          })
                        }
                        aria-label={t.certificates.clickToEnlarge}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-xs cursor-pointer"
                      >
                        <div className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                          <Maximize2 className="size-4" />
                        </div>
                        <span>{t.certificates.clickToEnlarge}</span>
                      </button>

                      {/* Badge terapung di atas gambar */}
                      <div className="absolute top-3 left-3 z-10">
                        <Badge
                          variant="outline"
                          className={`text-[11px] font-semibold backdrop-blur-md px-2.5 py-0.5 rounded-lg shadow-xs ${
                            isKhusus
                              ? "border-primary/40 bg-background/90 text-primary"
                              : "border-emerald-500/40 bg-background/90 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {categoryBadgeLabel}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    /* Mockup Placeholder jika belum ada gambar yang diunggah */
                    <div className="relative w-full aspect-[16/10] bg-linear-to-br from-muted/70 via-muted/40 to-muted/80 border-b border-border/70 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
                      <div className="size-12 rounded-2xl bg-background/90 border border-border shadow-xs flex items-center justify-center text-primary mb-2.5">
                        <FileCheck2 className="size-6" />
                      </div>
                      <span className="text-xs font-semibold text-foreground/90 max-w-[85%] line-clamp-1">
                        {certData.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                        {cert.issuer}
                      </span>
                      <div className="absolute top-3 left-3 z-10">
                        <Badge
                          variant="outline"
                          className={`text-[11px] font-semibold backdrop-blur-md px-2.5 py-0.5 rounded-lg ${
                            isKhusus
                              ? "border-primary/40 bg-background/90 text-primary"
                              : "border-emerald-500/40 bg-background/90 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {categoryBadgeLabel}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* === KONTEN TEKS & METADATA === */}
                  <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 gap-4">
                    <div className="flex flex-col gap-2.5">
                      {/* Penerbit & Icon */}
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="size-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                          {isKhusus ? (
                            <Award className="size-3.5" />
                          ) : (
                            <GraduationCap className="size-3.5" />
                          )}
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground truncate">
                          {cert.issuer}
                        </span>
                      </div>

                      {/* Judul Sertifikat */}
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
                        {certData.title}
                      </h3>

                      {/* Metadata: Tanggal & Kredensial ID */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground pt-0.5">
                        <div className="inline-flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-muted-foreground/70" />
                          <span>{cert.issueDate}</span>
                          {cert.expiryDate && <span>• {cert.expiryDate}</span>}
                        </div>

                        {cert.credentialId && (
                          <div className="inline-flex items-center gap-1 font-mono text-[11px] bg-muted/60 px-2 py-0.5 rounded-md border border-border/40">
                            <Hash className="size-3 text-muted-foreground/70" />
                            <span className="truncate max-w-[200px]">
                              {cert.credentialId}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Deskripsi */}
                      {certData.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 pt-1 text-pretty">
                          {certData.description}
                        </p>
                      )}
                    </div>

                    {/* Skill Tags & Actions */}
                    <div className="flex flex-col gap-3 pt-3 border-t border-border/40">
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skills.map((skill, sIdx) => (
                            <span
                              key={`${skill}-${sIdx}`}
                              className="text-[11px] px-2 py-0.5 rounded-md bg-muted/80 text-foreground/80 font-medium border border-border/40"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Baris Tombol Aksi */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          {cert.image && (
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewImage({
                                  url: cert.image!,
                                  title: certData.title,
                                  issuer: cert.issuer,
                                  credentialId: cert.credentialId,
                                })
                              }
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors py-1 px-2.5 rounded-lg bg-muted/70 hover:bg-muted border border-border/60 cursor-pointer"
                            >
                              <ZoomIn className="size-3.5" />
                              <span>{locale === "en" ? "View Certificate" : "Lihat Sertifikat"}</span>
                            </button>
                          )}

                          {cert.credentialUrl && cert.credentialUrl.trim() !== "" ? (
                            <Link
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors py-1 px-2 rounded-md group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <span>{t.certificates.verifyOnline}</span>
                              <ExternalLink className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </Link>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground py-1">
                              <CheckCircle2 className="size-3.5 text-emerald-500" />
                              <span>{locale === "en" ? "Verified" : "Terverifikasi"}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground/60 select-none">
                          {isKhusus ? "Specialized" : "Foundational"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      )}

      {/* === 4. LIGHTBOX / FULL MODAL PREVIEW === */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            locale === "en"
              ? `Certificate Preview: ${previewImage.title}`
              : `Pratinjau Sertifikat: ${previewImage.title}`
          }
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-w-4xl w-full max-h-[92vh] rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-card/95">
              <div className="flex flex-col min-w-0 pr-4">
                <span className="text-xs font-semibold text-muted-foreground">
                  {previewImage.issuer}
                </span>
                <h4 className="text-base font-bold text-foreground truncate">
                  {previewImage.title}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
                >
                  <ExternalLink className="size-3.5" />
                  <span className="hidden sm:inline">
                    {locale === "en" ? "Open Original File" : "Buka Berkas Asli"}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  aria-label={t.certificates.closePreview}
                  className="size-8 rounded-xl bg-muted/80 hover:bg-muted flex items-center justify-center text-foreground transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Gambar Sertifikat Full */}
            <div className="flex-1 overflow-auto bg-black/40 flex items-center justify-center p-2 sm:p-4 min-h-[300px]">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-lg select-none"
              />
            </div>

            {/* Footer Modal */}
            {previewImage.credentialId && (
              <div className="px-5 py-2.5 border-t border-border/80 bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
                <span>
                  {t.certificates.credentialIdLabel}:{" "}
                  <strong className="font-mono text-foreground">
                    {previewImage.credentialId}
                  </strong>
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {locale === "en" ? (
                    <>
                      Press <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px]">ESC</kbd> to close
                    </>
                  ) : (
                    <>
                      Tekan <kbd className="px-1.5 py-0.5 rounded bg-muted border text-[10px]">ESC</kbd> untuk menutup
                    </>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
