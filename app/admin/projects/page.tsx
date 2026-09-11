"use client";

import { useEffect, useState } from "react";
import {
  FolderGit2,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  AlertCircle,
  ExternalLink,
  Star,
} from "lucide-react";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  language: string;
  stars: number;
  color: string;
  link: string;
  demo_url?: string;
  image_url?: string;
  sort_order: number;
  is_featured: number;
}

const colorOptions = [
  { label: "Indigo", value: "bg-indigo-400" },
  { label: "Orange", value: "bg-orange-400" },
  { label: "Teal", value: "bg-teal-400" },
  { label: "Yellow", value: "bg-yellow-400" },
  { label: "Blue", value: "bg-blue-400" },
  { label: "Amber", value: "bg-amber-400" },
  { label: "Emerald", value: "bg-emerald-400" },
  { label: "Rose", value: "bg-rose-400" },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "TypeScript",
    stars: 0,
    color: "bg-blue-400",
    link: "",
    demo_url: "",
    sort_order: 0,
    is_featured: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const json = await res.json();
        setProjects(json.projects || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      language: "TypeScript",
      stars: 0,
      color: "bg-blue-400",
      link: "https://github.com/AdjiBhawantu/",
      demo_url: "",
      sort_order: projects.length + 1,
      is_featured: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      language: project.language,
      stars: project.stars,
      color: project.color,
      link: project.link,
      demo_url: project.demo_url || "",
      sort_order: project.sort_order,
      is_featured: Boolean(project.is_featured),
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject.id}`
        : "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          is_featured: formData.is_featured ? 1 : 0,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan proyek");

      setFeedback({
        text: editingProject ? "Proyek berhasil diperbarui!" : "Proyek baru berhasil ditambahkan!",
        type: "success",
      });
      setModalOpen(false);
      fetchProjects();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({ text: err.message || "Terjadi kesalahan", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback({ text: `Proyek "${title}" telah dihapus`, type: "success" });
        fetchProjects();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FolderGit2 className="w-5 h-5 text-emerald-400" />
            <span>Manajemen Proyek (Portfolio)</span>
          </h1>
          <p className="text-sm text-secondary mt-1">
            Kelola repositori GitHub, deskripsi karya, dan tautan demo aplikasi yang dipamerkan.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-white text-black font-button font-bold text-xs hover:bg-white/90 active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border text-sm flex items-center gap-3 ${
            feedback.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-52 bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <FolderGit2 className="w-10 h-10 text-secondary/40 mx-auto mb-3" />
          <p className="text-secondary text-sm">Belum ada proyek yang tersimpan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="testimonial-card-glass p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${proj.color || "bg-blue-400"}`} />
                    <span className="text-xs font-label-mono text-secondary">
                      {proj.language}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-yellow-400 font-label-mono">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{proj.stars || 0}</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-headline-lg text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-secondary/80 leading-relaxed line-clamp-3 mb-4">
                  {proj.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-label-mono">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-white flex items-center gap-1 truncate max-w-[200px]"
                  >
                    <span>GitHub Repo</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                  <span className="text-secondary/40">Urutan: {proj.sort_order}</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-secondary hover:text-white text-xs flex items-center gap-1"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#121414] p-6 md:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-headline-lg text-lg font-bold text-white">
                {editingProject ? "Edit Proyek" : "Tambah Proyek Baru"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg border border-white/10 text-secondary hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  Nama / Judul Proyek *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: kasirpintar"
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  Deskripsi Proyek *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan fitur, tujuan sistem, dan teknologi yang digunakan..."
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                    Bahasa / Tech
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    placeholder="Java, TypeScript, HTML"
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                    Warna Badge
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                  >
                    {colorOptions.map((c) => (
                      <option key={c.value} value={c.value} className="bg-[#121414] text-white">
                        {c.label} ({c.value})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  Link GitHub Repo / Source Code *
                </label>
                <input
                  type="url"
                  required
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://github.com/AdjiBhawantu/..."
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  Link Live Demo (Opsional)
                </label>
                <input
                  type="url"
                  value={formData.demo_url}
                  onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                  placeholder="https://myapp.com"
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                    Jumlah Bintang GitHub
                  </label>
                  <input
                    type="number"
                    value={formData.stars}
                    onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value || "0", 10) })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value || "0", 10) })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-secondary hover:text-white text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-white text-black font-button text-xs font-bold hover:bg-white/90 disabled:opacity-50"
                >
                  {submitting ? "Menyimpan..." : "Simpan Proyek"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
