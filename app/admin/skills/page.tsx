"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";

interface SkillItem {
  id: number;
  name: string;
  category: "Frontend" | "Backend" | "Tools" | "Design";
  level: number;
  sort_order: number;
}

const categories = ["Frontend", "Backend", "Tools", "Design"] as const;

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend" as SkillItem["category"],
    level: 85,
    sort_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills");
      if (res.ok) {
        const json = await res.json();
        setSkills(json.skills || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({
      name: "",
      category: activeCategory !== "All" ? (activeCategory as any) : "Frontend",
      level: 85,
      sort_order: skills.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (skill: SkillItem) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      sort_order: skill.sort_order,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const url = editingSkill
        ? `/api/admin/skills/${editingSkill.id}`
        : "/api/admin/skills";
      const method = editingSkill ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan keahlian");

      setFeedback({
        text: editingSkill ? "Keahlian berhasil diperbarui!" : "Keahlian baru berhasil ditambahkan!",
        type: "success",
      });
      setModalOpen(false);
      fetchSkills();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({ text: err.message || "Terjadi kesalahan", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus keahlian "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback({ text: `Keahlian "${name}" telah dihapus`, type: "success" });
        fetchSkills();
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-purple-400" />
            <span>Manajemen Keahlian (Skills)</span>
          </h1>
          <p className="text-sm text-secondary mt-1">
            Kelola tech stack, bahasa pemrograman, tools, dan framework yang Anda kuasai.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-white text-black font-button font-bold text-xs hover:bg-white/90 active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Keahlian</span>
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

      {/* Category Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-x-auto">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeCategory === "All"
              ? "bg-white text-black font-bold shadow-md"
              : "text-secondary hover:text-white"
          }`}
        >
          Semua ({skills.length})
        </button>
        {categories.map((cat) => {
          const count = skills.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-secondary hover:text-white"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <Code2 className="w-10 h-10 text-secondary/40 mx-auto mb-3" />
          <p className="text-secondary text-sm">Tidak ada keahlian pada kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="testimonial-card-glass p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-semibold text-sm text-white">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-label-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-secondary">
                    {skill.category}
                  </span>
                </div>

                <div className="space-y-1.5 my-3">
                  <div className="flex justify-between text-xs font-label-mono">
                    <span className="text-secondary/60">Kemahiran</span>
                    <span className="text-white font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                <span className="text-[10px] font-label-mono text-secondary/40">
                  Urutan: {skill.sort_order}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(skill)}
                    className="p-1.5 rounded-lg text-secondary hover:text-white hover:bg-white/10 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id, skill.name)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#121414] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-headline-lg text-base font-bold text-white">
                {editingSkill ? "Edit Keahlian" : "Tambah Keahlian Baru"}
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
                  Nama Keahlian / Tech *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Next.js, React, Laravel"
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  Kategori *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#121414] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-label-mono text-secondary uppercase">
                    Tingkat Kemahiran (Level: {formData.level}%)
                  </label>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value, 10) })}
                  className="w-full accent-white cursor-pointer"
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
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
