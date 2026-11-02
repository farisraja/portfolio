"use client";

import React, { useState, useEffect, useTransition } from "react";

interface ProjectOption {
  id: string | number;
  title: string;
  slug: string;
  status?: "published" | "draft";
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
  const [activeTab, setActiveTab] = useState<"github" | "projects">("github");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

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

  // Toggle Visibility: Tampilkan atau Sembunyikan Proyek
  const handleTogglePublish = async (projectId: string | number) => {
    setActionLoadingId(`toggle-${projectId}`);
    setSyncMessage(null);

    try {
      const res = await fetch("/api/github-repositories/toggle-publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengubah status publikasi.");
      }

      setSyncMessage({
        type: "success",
        text: data.message,
      });

      await loadData();
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: `Gagal mengubah status: ${err.message}`,
      });
    } finally {
      setActionLoadingId(null);
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
    if (!confirm("Apakah Anda yakin ingin melepas hubungan repository ini dengan proyek? Proyek tidak akan terhapus, hanya tidak terhubung lagi.")) {
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

  // Filter repositories
  const filteredRepos = repos.filter((r) => {
    if (hideForks && r.isFork) return false;
    if (hideArchived && r.isArchived) return false;

    const connectedProjectId = r.project && typeof r.project === "object" ? r.project.id : r.project;
    const connectedProject = projects.find((p) => String(p.id) === String(connectedProjectId));
    const isPublished = connectedProject?.status === "published";

    if (statusFilter === "published" && (!connectedProject || !isPublished)) return false;
    if (statusFilter === "draft" && (!connectedProject || isPublished)) return false;
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

  // Hitung Statistik
  const totalPublishedProjects = projects.filter((p) => p.status === "published").length;
  const totalDraftProjects = projects.filter((p) => p.status !== "published").length;

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
      {/* Top Banner */}
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
            <span>Kelola Tampilan & Sinkronisasi Proyek</span>
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
            Tentukan proyek apa saja yang ingin <strong>DITAMPILKAN</strong> atau <strong>DISEMBUNYIKAN</strong> dari website secara instan.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing || isImportingAll}
            style={{
              padding: "9px 16px",
              backgroundColor: isSyncing ? "#94a3b8" : "#0f172a",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: isSyncing || isImportingAll ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background-color 0.2s",
            }}
          >
            {isSyncing ? "Menyinkronkan..." : "🔄 Sinkronkan GitHub"}
          </button>

          <button
            type="button"
            onClick={handleImportAllDrafts}
            disabled={isSyncing || isImportingAll}
            style={{
              padding: "9px 16px",
              backgroundColor: isImportingAll ? "#94a3b8" : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: isSyncing || isImportingAll ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background-color 0.2s",
            }}
          >
            {isImportingAll ? "Mengimpor..." : "➕ Impor Semua Repository"}
          </button>
        </div>
      </div>

      {/* Sync Message Alert */}
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

      {/* Tab Navigasi: Repository GitHub vs Semua Proyek */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
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
          <span>Repository GitHub ({repos.length})</span>
        </button>

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
            gap: "6px",
          }}
        >
          <span>Daftar Semua Proyek ({projects.length})</span>
          <span style={{ fontSize: "0.75rem", padding: "1px 6px", borderRadius: "999px", background: "#10b981", color: "#ffffff" }}>
            {totalPublishedProjects} Tampil
          </span>
          <span style={{ fontSize: "0.75rem", padding: "1px 6px", borderRadius: "999px", background: "#6b7280", color: "#ffffff" }}>
            {totalDraftProjects} Draf
          </span>
        </button>
      </div>

      {/* TAB 1: REPOSITORY GITHUB */}
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
                const isPublished = connectedProject?.status === "published";
                const isToggling = actionLoadingId === `toggle-${connectedProjectId}`;
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
                        ? isPublished
                          ? "#86efac"
                          : "#fed7aa"
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
                          {/* Status Badge */}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              padding: "4px 10px",
                              borderRadius: "6px",
                              border: "1px solid",
                              backgroundColor: isPublished ? "#ecfdf5" : "#fefce8",
                              borderColor: isPublished ? "#a7f3d0" : "#fef08a",
                              color: isPublished ? "#065f46" : "#854d0e",
                            }}
                          >
                            <span>{isPublished ? "🟢 Tampil di Web" : "⚪ Disembunyikan (Draf)"}</span>
                          </div>

                          {/* Tombol Saklar Tampilkan / Sembunyikan */}
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(connectedProjectId)}
                            disabled={isToggling}
                            style={{
                              padding: "6px 12px",
                              fontSize: "0.8125rem",
                              fontWeight: 600,
                              borderRadius: "6px",
                              border: "none",
                              cursor: isToggling ? "not-allowed" : "pointer",
                              backgroundColor: isPublished ? "#fee2e2" : "#10b981",
                              color: isPublished ? "#991b1b" : "#ffffff",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              transition: "all 0.2s",
                            }}
                          >
                            {isToggling
                              ? "Memproses..."
                              : isPublished
                              ? "🚫 Sembunyikan"
                              : "👁️ Tampilkan di Web"}
                          </button>

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

      {/* TAB 2: SEMUA PROYEK PORTFOLIO */}
      {activeTab === "projects" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              padding: "10px 14px",
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "8px",
              fontSize: "0.8125rem",
              color: "#1e40af",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span>
              💡 <strong>Tips:</strong> Klik tombol <strong>&quot;Tampilkan di Web&quot;</strong> atau <strong>&quot;Sembunyikan&quot;</strong> untuk mengatur visibilitas proyek secara langsung.
            </span>
            <a
              href="/admin/collections/projects/create"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "4px 10px",
                background: "#2563eb",
                color: "#ffffff",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            >
              + Tambah Proyek Manual
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "600px", overflowY: "auto" }}>
            {projects.map((proj) => {
              const isPublished = proj.status === "published";
              const isToggling = actionLoadingId === `toggle-${proj.id}`;

              return (
                <div
                  key={proj.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: "var(--theme-elevation-100, #ffffff)",
                    border: "1px solid",
                    borderColor: isPublished ? "#86efac" : "var(--theme-elevation-150, #e2e8f0)",
                    borderRadius: "8px",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "999px",
                        backgroundColor: isPublished ? "#ecfdf5" : "#f1f5f9",
                        color: isPublished ? "#059669" : "#64748b",
                        border: `1px solid ${isPublished ? "#a7f3d0" : "#cbd5e1"}`,
                      }}
                    >
                      {isPublished ? "🟢 Tampil di Web" : "⚪ Draf (Tersembunyi)"}
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
                    <span style={{ fontSize: "0.75rem", color: "var(--theme-elevation-400, #94a3b8)", fontFamily: "monospace" }}>
                      /{proj.slug}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(proj.id)}
                      disabled={isToggling}
                      style={{
                        padding: "6px 14px",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        borderRadius: "6px",
                        border: "none",
                        cursor: isToggling ? "not-allowed" : "pointer",
                        backgroundColor: isPublished ? "#fee2e2" : "#10b981",
                        color: isPublished ? "#991b1b" : "#ffffff",
                        transition: "all 0.2s",
                      }}
                    >
                      {isToggling
                        ? "Memproses..."
                        : isPublished
                        ? "🚫 Sembunyikan dari Web"
                        : "👁️ Tampilkan di Web"}
                    </button>

                    <a
                      href={`/admin/collections/projects/${proj.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "6px 12px",
                        fontSize: "0.8125rem",
                        background: "var(--theme-elevation-200, #e2e8f0)",
                        borderRadius: "6px",
                        color: "inherit",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      Edit ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
