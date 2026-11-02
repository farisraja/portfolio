"use client";

import React, { useState, useEffect, useTransition } from "react";

interface ProjectOption {
  id: string | number;
  title: string;
  slug: string;
  status?: "published" | "draft";
  active?: boolean;
  featured?: boolean;
  githubRepoId?: number;
}

interface RepoData {
  id: string | number;
  repoId: number;
  name: string;
  fullName: string;
  url: string;
  description?: string | null;
  language?: string | null;
  topics?: string[];
  homepage?: string | null;
  stars: number;
  forks: number;
  isFork: boolean;
  isArchived: boolean;
  pushedAt?: string | null;
  syncedAt?: string | null;
  availability: "available" | "unavailable";
  project?: any;
}

export function GitHubSyncControls() {
  const [activeTab, setActiveTab] = useState<"projects" | "github">("projects");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

  // Visibility state & Batch Save
  const [visibilityMap, setVisibilityMap] = useState<Record<string | number, boolean>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSavingVisibility, setIsSavingVisibility] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [hideForks, setHideForks] = useState(true);
  const [hideArchived, setHideArchived] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "unlinked">("all");

  // Action states
  const [actionLoadingId, setActionLoadingId] = useState<string | number | null>(null);
  const [isImportingAll, setIsImportingAll] = useState(false);
  const [selectedProjectMap, setSelectedProjectMap] = useState<Record<number, string>>({});
  const [, startTransition] = useTransition();

  const loadData = async () => {
    setIsLoadingRepos(true);
    try {
      // 1. Fetch repositories
      const repoRes = await fetch("/api/github-repositories?limit=100&sort=-pushedAt");
      if (repoRes.ok) {
        const repoJson = await repoRes.json();
        if (repoJson?.docs) {
          setRepos(repoJson.docs);
        }
      }

      // 2. Fetch projects list for linking and status management
      const projRes = await fetch("/api/github-repositories/projects-list");
      if (projRes.ok) {
        const projJson = await projRes.json();
        if (projJson?.projects) {
          setProjects(projJson.projects);

          // Inisialisasi visibility map dari status database
          const initMap: Record<string | number, boolean> = {};
          projJson.projects.forEach((p: ProjectOption) => {
            initMap[p.id] = p.status === "published" && p.active !== false;
          });
          setVisibilityMap(initMap);
          setHasUnsavedChanges(false);
        }
      }
    } catch (err: any) {
      console.error("Gagal memuat data sinkronisasi:", err);
    } finally {
      setIsLoadingRepos(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Ubah status centang visibilitas proyek
  const handleToggleCheckbox = (projectId: string | number) => {
    setVisibilityMap((prev) => {
      const nextVal = !prev[projectId];
      const updated = { ...prev, [projectId]: nextVal };
      setHasUnsavedChanges(true);
      return updated;
    });
  };

  // Pilih Semua Tampil
  const handleSelectAllVisible = () => {
    const updated: Record<string | number, boolean> = {};
    projects.forEach((p) => {
      updated[p.id] = true;
    });
    setVisibilityMap(updated);
    setHasUnsavedChanges(true);
  };

  // Sembunyikan Semua
  const handleSelectAllHidden = () => {
    const updated: Record<string | number, boolean> = {};
    projects.forEach((p) => {
      updated[p.id] = false;
    });
    setVisibilityMap(updated);
    setHasUnsavedChanges(true);
  };

  // BATALKAN perubahan (kembalikan ke database awal)
  const handleResetChanges = () => {
    const resetMap: Record<string | number, boolean> = {};
    projects.forEach((p) => {
      resetMap[p.id] = p.status === "published" && p.active !== false;
    });
    setVisibilityMap(resetMap);
    setHasUnsavedChanges(false);
  };

  // SIMPAN PERUBAHAN VISIBILITAS KE DATABASE (Batch Save)
  const handleSaveVisibility = async () => {
    setIsSavingVisibility(true);
    setSyncMessage(null);

    try {
      const updates = projects.map((p) => ({
        projectId: p.id,
        isVisible: Boolean(visibilityMap[p.id]),
      }));

      const res = await fetch("/api/github-repositories/save-visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal menyimpan perubahan visibilitas.");
      }

      setSyncMessage({
        type: "success",
        text: `✓ ${data.message}`,
      });

      setHasUnsavedChanges(false);
      await loadData();
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: `Gagal menyimpan: ${err.message}`,
      });
    } finally {
      setIsSavingVisibility(false);
    }
  };

  // Sinkronkan data dari REST API GitHub
  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage({ type: "info", text: "Menghubungi GitHub API dan menyinkronkan repository..." });

    try {
      const res = await fetch("/api/github-repositories/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setSyncMessage({
        type: "success",
        text: `${data.message} (Sisa kuota API: ${data.rateLimit?.remaining}/${data.rateLimit?.limit})`,
      });

      await loadData();
      startTransition(() => {});
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: `Gagal menyinkronkan: ${err.message || "Terjadi kesalahan koneksi"}`,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleImportAllDrafts = async () => {
    setIsImportingAll(true);
    setSyncMessage({ type: "info", text: "Mengimpor seluruh repository non-fork & non-arsip sebagai draf..." });

    try {
      const res = await fetch("/api/github-repositories/import-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setSyncMessage({
        type: "success",
        text: data.message,
      });

      await loadData();
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: `Gagal mengimpor semua: ${err.message}`,
      });
    } finally {
      setIsImportingAll(false);
    }
  };

  // Import sebagai Draf (Disembunyikan)
  const handleImportDraft = async (repoId: number) => {
    setActionLoadingId(`import-draft-${repoId}`);
    setSyncMessage(null);

    try {
      const res = await fetch("/api/github-repositories/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengimpor repository.");
      }

      setSyncMessage({
        type: "success",
        text: `${data.message} Proyek tersimpan sebagai DRAF (Disembunyikan).`,
      });

      await loadData();
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: `Gagal mengimpor: ${err.message}`,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Import dan Langsung Tampilkan di Website
  const handleImportAndPublish = async (repoId: number) => {
    setActionLoadingId(`import-publish-${repoId}`);
    setSyncMessage(null);

    try {
      const res = await fetch("/api/github-repositories/import-publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengimpor & mempublikasikan repository.");
      }

      setSyncMessage({
        type: "success",
        text: data.message,
      });

      await loadData();
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: `Gagal mengimpor & mempublikasikan: ${err.message}`,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Lepas Hubungan Repository dengan Proyek
  const handleUnlink = async (repoId: number) => {
    if (!confirm("Apakah Anda yakin ingin melepas hubungan repository ini dengan proyek? Proyek tidak akan terhapus.")) {
      return;
    }

    setActionLoadingId(`unlink-${repoId}`);
    setSyncMessage(null);

    try {
      const res = await fetch("/api/github-repositories/unlink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal melepas hubungan.");
      }

      setSyncMessage({
        type: "success",
        text: data.message,
      });

      await loadData();
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: `Gagal melepas hubungan: ${err.message}`,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleLinkProject = async (repoId: number) => {
    const targetProjectId = selectedProjectMap[repoId];
    if (!targetProjectId) {
      alert("Silakan pilih proyek tujuan terlebih dahulu.");
      return;
    }

    setActionLoadingId(`link-${repoId}`);
    setSyncMessage(null);

    try {
      const res = await fetch("/api/github-repositories/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId, targetProjectId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal menghubungkan repository.");
      }

      setSyncMessage({
        type: "success",
        text: data.message,
      });

      await loadData();
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: `Gagal menghubungkan: ${err.message}`,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Hitung status saat ini dari visibilityMap
  const currentVisibleCount = Object.values(visibilityMap).filter(Boolean).length;
  const currentHiddenCount = projects.length - currentVisibleCount;

  // Filter repositories untuk Tab 2
  const filteredRepos = repos.filter((r) => {
    if (hideForks && r.isFork) return false;
    if (hideArchived && r.isArchived) return false;

    const connectedProjectId = r.project && typeof r.project === "object" ? r.project.id : r.project;
    const connectedProject = projects.find((p) => String(p.id) === String(connectedProjectId));
    const isVisible = connectedProject ? Boolean(visibilityMap[connectedProject.id]) : false;

    if (statusFilter === "published" && (!connectedProject || !isVisible)) return false;
    if (statusFilter === "draft" && (!connectedProject || isVisible)) return false;
    if (statusFilter === "unlinked" && connectedProject) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchLang = r.language?.toLowerCase().includes(q);
      const matchDesc = r.description?.toLowerCase().includes(q);
      const matchProject = connectedProject?.title?.toLowerCase().includes(q);
      return matchName || matchLang || matchDesc || matchProject;
    }

    return true;
  });

  return (
    <div
      style={{
        marginBottom: "28px",
        padding: "24px",
        background: "var(--theme-elevation-50, #f8fafc)",
        border: "1px solid var(--theme-elevation-150, #e2e8f0)",
        borderRadius: "14px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top Banner Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          borderBottom: "1px solid var(--theme-elevation-150, #e2e8f0)",
          paddingBottom: "18px",
          marginBottom: "18px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "1.25rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>Pilihan Proyek yang Ditampilkan di Website</span>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "2px 8px",
                borderRadius: "999px",
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              @farisraja
            </span>
          </h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.875rem", color: "var(--theme-elevation-500, #64748b)" }}>
            Centang proyek yang ingin <strong>DITAMPILKAN</strong> di website, lalu klik tombol <strong>&quot;Simpan Perubahan Tampilan&quot;</strong>.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Tombol Simpan Utama */}
          <button
            type="button"
            onClick={handleSaveVisibility}
            disabled={isSavingVisibility}
            style={{
              padding: "10px 20px",
              backgroundColor: hasUnsavedChanges ? "#16a34a" : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.875rem",
              cursor: isSavingVisibility ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: hasUnsavedChanges ? "0 0 0 3px rgba(34, 197, 94, 0.3)" : "none",
              transition: "all 0.2s",
            }}
          >
            <span>{isSavingVisibility ? "Menyimpan ke Database..." : "💾 Simpan Perubahan Tampilan"}</span>
            {hasUnsavedChanges && (
              <span style={{ fontSize: "0.7rem", padding: "1px 6px", borderRadius: "999px", background: "#ffffff", color: "#16a34a", fontWeight: 800 }}>
                Ada Perubahan
              </span>
            )}
          </button>

          <a
            href="http://localhost:3002#projects"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "9px 14px",
              backgroundColor: "var(--theme-elevation-200, #e2e8f0)",
              color: "inherit",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>🌐 Buka Website ↗</span>
          </a>
        </div>
      </div>

      {/* Sync / Success Message Alert */}
      {syncMessage && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: 500,
            backgroundColor:
              syncMessage.type === "success"
                ? "#ecfdf5"
                : syncMessage.type === "error"
                ? "#fef2f2"
                : "#eff6ff",
            color:
              syncMessage.type === "success"
                ? "#065f46"
                : syncMessage.type === "error"
                ? "#991b1b"
                : "#1e40af",
            border: `1px solid ${
              syncMessage.type === "success"
                ? "#a7f3d0"
                : syncMessage.type === "error"
                ? "#fecaca"
                : "#bfdbfe"
            }`,
          }}
        >
          {syncMessage.text}
        </div>
      )}

      {/* Peringatan jika ada perubahan yang belum disimpan */}
      {hasUnsavedChanges && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: 600,
            backgroundColor: "#fffbeb",
            color: "#92400e",
            border: "1px solid #fde68a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>⚠️</span>
            <span>Anda memiliki perubahan pilihan proyek yang belum disimpan.</span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={handleResetChanges}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                color: "#475569",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Batalkan
            </button>
            <button
              type="button"
              onClick={handleSaveVisibility}
              disabled={isSavingVisibility}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "none",
                background: "#16a34a",
                color: "#ffffff",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {isSavingVisibility ? "Menyimpan..." : "💾 Simpan Sekarang"}
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigasi Utama */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          type="button"
          onClick={() => setActiveTab("projects")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: "1px solid",
            borderColor: activeTab === "projects" ? "#2563eb" : "var(--theme-elevation-200, #cbd5e1)",
            backgroundColor: activeTab === "projects" ? "#2563eb" : "var(--theme-elevation-100, #ffffff)",
            color: activeTab === "projects" ? "#ffffff" : "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>📋 Pilihan Tampilan Proyek ({projects.length})</span>
          <span style={{ fontSize: "0.75rem", padding: "1px 6px", borderRadius: "999px", background: "#10b981", color: "#ffffff" }}>
            {currentVisibleCount} Tampil
          </span>
          <span style={{ fontSize: "0.75rem", padding: "1px 6px", borderRadius: "999px", background: "#6b7280", color: "#ffffff" }}>
            {currentHiddenCount} Sembunyi
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("github")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: "1px solid",
            borderColor: activeTab === "github" ? "#2563eb" : "var(--theme-elevation-200, #cbd5e1)",
            backgroundColor: activeTab === "github" ? "#2563eb" : "var(--theme-elevation-100, #ffffff)",
            color: activeTab === "github" ? "#ffffff" : "inherit",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>🐙 Hubungkan Repository GitHub ({repos.length})</span>
        </button>
      </div>

      {/* TAB 1: PILIHAN TAMPILAN PROYEK (DENGAN CHECKBOX & TOMBOL SIMPAN) */}
      {activeTab === "projects" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Quick Toolbar */}
          <div
            style={{
              padding: "12px 16px",
              background: "var(--theme-elevation-100, #ffffff)",
              border: "1px solid var(--theme-elevation-150, #e2e8f0)",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                type="button"
                onClick={handleSelectAllVisible}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--theme-elevation-200, #cbd5e1)",
                  background: "var(--theme-elevation-50, #f8fafc)",
                  color: "inherit",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Pilih Semua Tampil
              </button>

              <button
                type="button"
                onClick={handleSelectAllHidden}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--theme-elevation-200, #cbd5e1)",
                  background: "var(--theme-elevation-50, #f8fafc)",
                  color: "inherit",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Sembunyikan Semua
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "0.8125rem", color: "var(--theme-elevation-600, #475569)" }}>
                Total: <strong>{currentVisibleCount}</strong> proyek dipilih untuk tampil di website.
              </span>

              <button
                type="button"
                onClick={handleSaveVisibility}
                disabled={isSavingVisibility}
                style={{
                  padding: "6px 14px",
                  backgroundColor: hasUnsavedChanges ? "#16a34a" : "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  cursor: isSavingVisibility ? "not-allowed" : "pointer",
                }}
              >
                {isSavingVisibility ? "Menyimpan..." : "💾 Simpan Pilihan"}
              </button>
            </div>
          </div>

          {/* Project Items List with Checkboxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "650px", overflowY: "auto" }}>
            {projects.map((proj) => {
              const isChecked = Boolean(visibilityMap[proj.id]);

              return (
                <div
                  key={proj.id}
                  onClick={() => handleToggleCheckbox(proj.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    background: isChecked ? "#f0fdf4" : "var(--theme-elevation-100, #ffffff)",
                    border: "2px solid",
                    borderColor: isChecked ? "#86efac" : "var(--theme-elevation-150, #e2e8f0)",
                    borderRadius: "10px",
                    gap: "14px",
                    cursor: "pointer",
                    transition: "all 0.15s ease-in-out",
                  }}
                >
                  {/* Left: Checkbox & Title */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
                    {/* Custom Large Checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleCheckbox(proj.id)}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        accentColor: "#16a34a",
                        flexShrink: 0,
                      }}
                    />

                    <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: "999px",
                            backgroundColor: isChecked ? "#dcfce7" : "#f1f5f9",
                            color: isChecked ? "#15803d" : "#64748b",
                            border: `1px solid ${isChecked ? "#86efac" : "#cbd5e1"}`,
                          }}
                        >
                          {isChecked ? "🟢 Tampil di Web" : "⚪ Disembunyikan"}
                        </span>

                        {proj.featured && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              padding: "2px 8px",
                              borderRadius: "999px",
                              backgroundColor: "#fef3c7",
                              color: "#b45309",
                            }}
                          >
                            ⭐ Unggulan
                          </span>
                        )}

                        <strong style={{ fontSize: "0.9375rem" }}>{proj.title}</strong>
                      </div>

                      <span style={{ fontSize: "0.75rem", color: "var(--theme-elevation-400, #94a3b8)", fontFamily: "monospace" }}>
                        URL Slug: /{proj.slug} (ID: {proj.id})
                      </span>
                    </div>
                  </div>

                  {/* Right: Status Label & Edit Link */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: isChecked ? "#15803d" : "#64748b",
                      }}
                    >
                      {isChecked ? "Dipilih untuk Tampil" : "Akan Disembunyikan"}
                    </span>

                    <a
                      href={`/admin/collections/projects/${proj.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "6px 12px",
                        fontSize: "0.75rem",
                        background: "var(--theme-elevation-200, #e2e8f0)",
                        borderRadius: "6px",
                        color: "inherit",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      Edit Konten ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Bottom Save Bar */}
          <div
            style={{
              padding: "16px 20px",
              background: "#1e293b",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#ffffff",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9375rem" }}>
                Siap menerapkan tampilan ke website?
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
                {currentVisibleCount} proyek akan muncul di website, {currentHiddenCount} proyek akan disembunyikan.
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                type="button"
                onClick={handleSaveVisibility}
                disabled={isSavingVisibility}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#22c55e",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  cursor: isSavingVisibility ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>{isSavingVisibility ? "Menyimpan..." : "💾 Simpan Perubahan Sekarang"}</span>
              </button>

              <a
                href="http://localhost:3002#projects"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#334155",
                  color: "#ffffff",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Lihat di Web ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REPOSITORY GITHUB */}
      {activeTab === "github" && (
        <>
          {/* Controls & Filters Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              marginBottom: "16px",
              padding: "12px 16px",
              background: "var(--theme-elevation-100, #ffffff)",
              borderRadius: "8px",
              border: "1px solid var(--theme-elevation-150, #e2e8f0)",
            }}
          >
            <div style={{ flex: "1 1 240px", minWidth: "200px" }}>
              <input
                type="text"
                placeholder="Cari nama repository atau proyek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "7px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--theme-elevation-200, #cbd5e1)",
                  fontSize: "0.875rem",
                  background: "inherit",
                  color: "inherit",
                }}
              />
            </div>

            {/* Filter Status Pills */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "0.8125rem", color: "var(--theme-elevation-500, #64748b)", marginRight: "4px" }}>
                Filter:
              </span>
              {(
                [
                  { key: "all", label: "Semua" },
                  { key: "published", label: "🟢 Tampil di Web" },
                  { key: "draft", label: "⚪ Disembunyikan" },
                  { key: "unlinked", label: "Belum Terhubung" },
                ] as const
              ).map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setStatusFilter(f.key)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    border: "1px solid",
                    borderColor: statusFilter === f.key ? "#2563eb" : "var(--theme-elevation-200, #cbd5e1)",
                    backgroundColor: statusFilter === f.key ? "#eff6ff" : "transparent",
                    color: statusFilter === f.key ? "#1d4ed8" : "inherit",
                    cursor: "pointer",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "center", fontSize: "0.8125rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={hideForks}
                  onChange={(e) => setHideForks(e.target.checked)}
                />
                <span>Sembunyikan Fork</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={hideArchived}
                  onChange={(e) => setHideArchived(e.target.checked)}
                />
                <span>Sembunyikan Diarsipkan</span>
              </label>
            </div>
          </div>

          {/* Repositories Quick Action Grid / List */}
          {isLoadingRepos ? (
            <div style={{ padding: "32px", textAlign: "center", color: "var(--theme-elevation-500, #64748b)" }}>
              Memuat daftar repository GitHub...
            </div>
          ) : filteredRepos.length === 0 ? (
            <div
              style={{
                padding: "32px",
                textAlign: "center",
                background: "var(--theme-elevation-100, #ffffff)",
                borderRadius: "8px",
                border: "1px dashed var(--theme-elevation-200, #cbd5e1)",
              }}
            >
              <p style={{ margin: 0, fontWeight: 500 }}>Tidak ada repository yang sesuai dengan filter.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "600px", overflowY: "auto" }}>
              {filteredRepos.map((repo) => {
                const connectedProjectId =
                  repo.project && typeof repo.project === "object"
                    ? repo.project.id
                    : repo.project;

                const connectedProject = projects.find((p) => String(p.id) === String(connectedProjectId));
                const isChecked = connectedProject ? Boolean(visibilityMap[connectedProject.id]) : false;
                const isUnlinking = actionLoadingId === `unlink-${repo.repoId}`;
                const isImportingDraft = actionLoadingId === `import-draft-${repo.repoId}`;
                const isImportingPublish = actionLoadingId === `import-publish-${repo.repoId}`;

                return (
                  <div
                    key={repo.repoId}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      padding: "14px 18px",
                      background: "var(--theme-elevation-100, #ffffff)",
                      border: "1px solid",
                      borderColor: connectedProject
                        ? isChecked
                          ? "#86efac"
                          : "#cbd5e1"
                        : "var(--theme-elevation-150, #e2e8f0)",
                      borderRadius: "8px",
                    }}
                  >
                    {/* Repo Info */}
                    <div style={{ flex: "1 1 320px", minWidth: "260px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontWeight: 600,
                            fontSize: "0.9375rem",
                            color: "#2563eb",
                            textDecoration: "none",
                          }}
                        >
                          {repo.name} ↗
                        </a>

                        {repo.language && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              background: "var(--theme-elevation-200, #e2e8f0)",
                              fontWeight: 500,
                            }}
                          >
                            {repo.language}
                          </span>
                        )}

                        {repo.isFork && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              background: "#fef3c7",
                              color: "#92400e",
                              fontWeight: 500,
                            }}
                          >
                            Fork
                          </span>
                        )}

                        {repo.isArchived && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              background: "#f1f5f9",
                              color: "#64748b",
                              fontWeight: 500,
                            }}
                          >
                            Archived
                          </span>
                        )}
                      </div>

                      <p
                        style={{
                          margin: "4px 0 0 0",
                          fontSize: "0.8125rem",
                          color: "var(--theme-elevation-600, #475569)",
                          lineHeight: "1.4",
                        }}
                      >
                        {repo.description || "Tanpa deskripsi."}
                      </p>

                      <div
                        style={{
                          marginTop: "4px",
                          fontSize: "0.75rem",
                          color: "var(--theme-elevation-400, #94a3b8)",
                          display: "flex",
                          gap: "12px",
                        }}
                      >
                        <span>⭐ {repo.stars} stars</span>
                        <span>🍴 {repo.forks} forks</span>
                        {repo.pushedAt && (
                          <span>Push: {new Date(repo.pushedAt).toLocaleDateString("id-ID")}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions & Status */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      {connectedProjectId ? (
                        <>
                          {/* Centang Cepat */}
                          <label
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "0.8125rem",
                              fontWeight: 600,
                              padding: "6px 12px",
                              borderRadius: "6px",
                              border: "1px solid",
                              backgroundColor: isChecked ? "#ecfdf5" : "#f1f5f9",
                              borderColor: isChecked ? "#a7f3d0" : "#cbd5e1",
                              color: isChecked ? "#065f46" : "#64748b",
                              cursor: "pointer",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleCheckbox(connectedProjectId)}
                              style={{ width: "16px", height: "16px", accentColor: "#16a34a" }}
                            />
                            <span>{isChecked ? "🟢 Tampil di Web" : "⚪ Disembunyikan"}</span>
                          </label>

                          {/* Link Buka Proyek */}
                          <a
                            href={`/admin/collections/projects/${connectedProjectId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: "0.8125rem",
                              padding: "6px 10px",
                              background: "var(--theme-elevation-200, #e2e8f0)",
                              borderRadius: "6px",
                              color: "inherit",
                              textDecoration: "none",
                              fontWeight: 500,
                            }}
                          >
                            Edit Proyek ↗
                          </a>

                          {/* Lepas Hubungan */}
                          <button
                            type="button"
                            onClick={() => handleUnlink(repo.repoId)}
                            disabled={isUnlinking}
                            title="Lepas hubungan repository dengan proyek ini"
                            style={{
                              padding: "6px 8px",
                              fontSize: "0.75rem",
                              background: "transparent",
                              border: "1px solid var(--theme-elevation-200, #cbd5e1)",
                              borderRadius: "6px",
                              color: "var(--theme-elevation-600, #64748b)",
                              cursor: isUnlinking ? "not-allowed" : "pointer",
                            }}
                          >
                            {isUnlinking ? "..." : "✕ Lepas"}
                          </button>
                        </>
                      ) : (
                        <>
                          {/* Tombol: Impor sebagai Draf (Disembunyikan) */}
                          <button
                            type="button"
                            onClick={() => handleImportDraft(repo.repoId)}
                            disabled={isImportingDraft || isImportingPublish}
                            style={{
                              padding: "6px 12px",
                              background: "#64748b",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              cursor: isImportingDraft ? "not-allowed" : "pointer",
                            }}
                          >
                            {isImportingDraft ? "Memproses..." : "➕ Simpan Draf"}
                          </button>

                          {/* Tombol: Impor & Langsung Tampilkan */}
                          <button
                            type="button"
                            onClick={() => handleImportAndPublish(repo.repoId)}
                            disabled={isImportingDraft || isImportingPublish}
                            style={{
                              padding: "6px 12px",
                              background: "#10b981",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              cursor: isImportingPublish ? "not-allowed" : "pointer",
                            }}
                          >
                            {isImportingPublish ? "Memproses..." : "🚀 Impor & Tampilkan"}
                          </button>

                          {/* Hubungkan ke Proyek yang Sudah Ada */}
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <select
                              value={selectedProjectMap[repo.repoId] || ""}
                              onChange={(e) =>
                                setSelectedProjectMap((prev) => ({
                                  ...prev,
                                  [repo.repoId]: e.target.value,
                                }))
                              }
                              style={{
                                padding: "5px 8px",
                                borderRadius: "6px",
                                border: "1px solid var(--theme-elevation-200, #cbd5e1)",
                                fontSize: "0.75rem",
                                background: "inherit",
                                color: "inherit",
                                maxWidth: "150px",
                              }}
                            >
                              <option value="">-- Pilih Proyek --</option>
                              {projects.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.title}
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              onClick={() => handleLinkProject(repo.repoId)}
                              disabled={actionLoadingId === `link-${repo.repoId}` || !selectedProjectMap[repo.repoId]}
                              style={{
                                padding: "5px 10px",
                                background: selectedProjectMap[repo.repoId] ? "#0f172a" : "#cbd5e1",
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                cursor: selectedProjectMap[repo.repoId] ? "pointer" : "not-allowed",
                              }}
                            >
                              Hubungkan
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
