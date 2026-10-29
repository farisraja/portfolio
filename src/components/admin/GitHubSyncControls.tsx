"use client";

import React, { useState, useEffect, useTransition } from "react";

interface ProjectOption {
  id: string | number;
  title: string;
  slug: string;
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
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [hideForks, setHideForks] = useState(true);
  const [hideArchived, setHideArchived] = useState(true);

  // Action states
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
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

      // 2. Fetch projects list for linking
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

      // Reload data and refresh page table
      await loadData();
      startTransition(() => {
        // Soft refresh if supported
      });
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
        throw new Error(data.error || "Gagal mengimpor seluruh repository.");
      }

      setSyncMessage({
        type: "success",
        text: data.message,
      });

      await loadData();
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: `Gagal mengimpor seluruh repository: ${err.message}`,
      });
    } finally {
      setIsImportingAll(false);
    }
  };

  const handleImportDraft = async (repoId: number) => {
    setActionLoadingId(repoId);
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
        text: `${data.message} Proyek berhasil disimpan sebagai DRAF.`,
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

  const handleLinkProject = async (repoId: number) => {
    const targetProjectId = selectedProjectMap[repoId];
    if (!targetProjectId) {
      alert("Silakan pilih proyek tujuan terlebih dahulu.");
      return;
    }

    setActionLoadingId(repoId);
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

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchLang = r.language?.toLowerCase().includes(q);
      const matchDesc = r.description?.toLowerCase().includes(q);
      return matchName || matchLang || matchDesc;
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
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
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
            <span>GitHub Sync & Integration</span>
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
            Kelola sinkronisasi REST API GitHub ke Payload CMS, impor sebagai draf, atau hubungkan ke proyek yang sudah ada.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing || isImportingAll}
            style={{
              padding: "10px 18px",
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
              padding: "10px 18px",
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
            {isImportingAll ? "Mengimpor..." : "➕ Impor Semua (Non-Fork & Non-Arsip)"}
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

      {/* Controls & Filters Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
          padding: "12px 16px",
          background: "var(--theme-elevation-100, #ffffff)",
          borderRadius: "8px",
          border: "1px solid var(--theme-elevation-150, #e2e8f0)",
        }}
      >
        <div style={{ flex: 1, minWidth: "220px" }}>
          <input
            type="text"
            placeholder="Cari nama, bahasa, atau deskripsi repository..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid var(--theme-elevation-200, #cbd5e1)",
              fontSize: "0.875rem",
              background: "inherit",
              color: "inherit",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center", fontSize: "0.875rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={hideForks}
              onChange={(e) => setHideForks(e.target.checked)}
            />
            <span>Sembunyikan Fork</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={hideArchived}
              onChange={(e) => setHideArchived(e.target.checked)}
            />
            <span>Sembunyikan Diarsipkan</span>
          </label>
        </div>

        <div style={{ fontSize: "0.8125rem", color: "var(--theme-elevation-500, #64748b)" }}>
          Menampilkan <strong>{filteredRepos.length}</strong> dari {repos.length} repository
        </div>
      </div>

      {/* Repositories Quick Action Grid / List */}
      {isLoadingRepos ? (
        <div style={{ padding: "32px", textAlign: "center", color: "var(--theme-elevation-500, #64748b)" }}>
          Memuat daftar repository GitHub...
        </div>
      ) : repos.length === 0 ? (
        <div
          style={{
            padding: "32px",
            textAlign: "center",
            background: "var(--theme-elevation-100, #ffffff)",
            borderRadius: "8px",
            border: "1px dashed var(--theme-elevation-200, #cbd5e1)",
          }}
        >
          <p style={{ margin: 0, fontWeight: 500 }}>Belum ada repository yang tersinkronkan.</p>
          <p style={{ margin: "6px 0 0 0", fontSize: "0.875rem", color: "var(--theme-elevation-500, #64748b)" }}>
            Klik tombol <strong>&quot;Sinkronkan GitHub&quot;</strong> di atas untuk mengambil repository publik dari akun @farisraja.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "500px", overflowY: "auto" }}>
          {filteredRepos.map((repo) => {
            const isActing = actionLoadingId === repo.repoId;
            const connectedProjectId =
              repo.project && typeof repo.project === "object"
                ? repo.project.id
                : repo.project;

            const connectedProject = projects.find((p) => String(p.id) === String(connectedProjectId));

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
                  border: "1px solid var(--theme-elevation-150, #e2e8f0)",
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

                    {repo.availability === "unavailable" && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          padding: "1px 6px",
                          borderRadius: "4px",
                          background: "#fee2e2",
                          color: "#991b1b",
                          fontWeight: 500,
                        }}
                      >
                        Tidak Tersedia
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

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  {connectedProjectId ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          color: "#059669",
                          background: "#ecfdf5",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "1px solid #a7f3d0",
                        }}
                      >
                        ✓ Terhubung ke: {connectedProject?.title || `Proyek #${connectedProjectId}`}
                      </span>
                      <a
                        href={`/admin/collections/projects/${connectedProjectId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.8125rem",
                          padding: "6px 12px",
                          background: "var(--theme-elevation-200, #e2e8f0)",
                          borderRadius: "6px",
                          color: "inherit",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        Buka Proyek ↗
                      </a>
                    </div>
                  ) : (
                    <>
                      {/* Button: Import as Draft */}
                      <button
                        type="button"
                        onClick={() => handleImportDraft(repo.repoId)}
                        disabled={isActing}
                        style={{
                          padding: "6px 14px",
                          background: "#2563eb",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                          cursor: isActing ? "not-allowed" : "pointer",
                        }}
                      >
                        {isActing ? "Memproses..." : "➕ Impor sebagai Draf"}
                      </button>

                      {/* Dropdown & Button: Link to Existing Project */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <select
                          value={selectedProjectMap[repo.repoId] || ""}
                          onChange={(e) =>
                            setSelectedProjectMap((prev) => ({
                              ...prev,
                              [repo.repoId]: e.target.value,
                            }))
                          }
                          style={{
                            padding: "6px 10px",
                            borderRadius: "6px",
                            border: "1px solid var(--theme-elevation-200, #cbd5e1)",
                            fontSize: "0.8125rem",
                            background: "inherit",
                            color: "inherit",
                            maxWidth: "180px",
                          }}
                        >
                          <option value="">-- Pilih Proyek --</option>
                          {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.title} (ID: {p.id})
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => handleLinkProject(repo.repoId)}
                          disabled={isActing || !selectedProjectMap[repo.repoId]}
                          style={{
                            padding: "6px 12px",
                            background: selectedProjectMap[repo.repoId] ? "#0f172a" : "#94a3b8",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                            cursor: selectedProjectMap[repo.repoId] && !isActing ? "pointer" : "not-allowed",
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
    </div>
  );
}
