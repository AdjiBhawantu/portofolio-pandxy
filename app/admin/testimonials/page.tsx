"use client";

import { useEffect, useState } from "react";
import {
  MessageSquareQuote,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  AlertCircle,
  Star,
} from "lucide-react";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  username?: string;
  content: string;
  avatar_url?: string;
  rating: number;
  sort_order: number;
  is_active: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    username: "",
    content: "",
    avatar_url: "",
    rating: 5,
    sort_order: 0,
    is_active: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const json = await res.json();
        setTestimonials(json.testimonials || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "Client",
      company: "",
      username: "",
      content: "",
      avatar_url: "",
      rating: 5,
      sort_order: testimonials.length + 1,
      is_active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      company: item.company,
      username: item.username || "",
      content: item.content,
      avatar_url: item.avatar_url || "",
      rating: item.rating || 5,
      sort_order: item.sort_order,
      is_active: Boolean(item.is_active),
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const url = editingItem
        ? `/api/admin/testimonials/${editingItem.id}`
        : "/api/admin/testimonials";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          is_active: formData.is_active ? 1 : 0,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan testimoni");

      setFeedback({
        text: editingItem ? "Testimoni berhasil diperbarui!" : "Testimoni baru berhasil ditambahkan!",
        type: "success",
      });
      setModalOpen(false);
      fetchTestimonials();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({ text: err.message || "Terjadi kesalahan", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus testimoni dari "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback({ text: `Testimoni dari "${name}" telah dihapus`, type: "success" });
        fetchTestimonials();
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
            <MessageSquareQuote className="w-5 h-5 text-amber-400" />
            <span>Manajemen Testimoni (Testimonials)</span>
          </h1>
          <p className="text-sm text-secondary mt-1">
            Ulasan dan pengalaman klien yang ditampilkan pada marquee animasi landing page.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-white text-black font-button font-bold text-xs hover:bg-white/90 active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni</span>
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

      {/* Testimonials List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <MessageSquareQuote className="w-10 h-10 text-secondary/40 mx-auto mb-3" />
          <p className="text-secondary text-sm">Belum ada testimoni tersimpan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="testimonial-card-glass p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#FFD700] gap-0.5">
                    {Array.from({ length: item.rating || 5 }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.is_active
                        ? "bg-whatsapp-green/20 text-whatsapp-green border border-whatsapp-green/30"
                        : "bg-white/10 text-secondary border border-white/15"
                    }`}
                  >
                    {item.is_active ? "Tampil" : "Disembunyikan"}
                  </span>
                </div>

                <p className="text-xs text-secondary/90 italic leading-relaxed line-clamp-4 mb-4">
                  &quot;{item.content}&quot;
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {item.avatar_url ? (
                      <img
                        src={item.avatar_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{item.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-secondary/60 truncate">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                <span className="text-[10px] font-label-mono text-secondary/40">
                  Urutan: {item.sort_order}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-secondary hover:text-white text-xs flex items-center gap-1"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1"
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
                {editingItem ? "Edit Testimoni" : "Tambah Testimoni Baru"}
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
                  Nama Klien *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                    Jabatan / Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="CEO, Founder, Owner"
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                    Perusahaan / Bisnis
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Tech Indo, Kopi Nusantara"
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  URL Foto Avatar (Unsplash atau Google URL)
                </label>
                <input
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  Isi Testimoni / Ulasan *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Pandxy delivered outstanding results..."
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                    Rating Bintang (1-5)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                  >
                    <option value={5} className="bg-[#121414]">⭐⭐⭐⭐⭐ (5 Bintang)</option>
                    <option value={4} className="bg-[#121414]">⭐⭐⭐⭐ (4 Bintang)</option>
                    <option value={3} className="bg-[#121414]">⭐⭐⭐ (3 Bintang)</option>
                  </select>
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

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="is_active_testi"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-white/10 bg-black/40 text-blue-500"
                />
                <label htmlFor="is_active_testi" className="text-xs text-white cursor-pointer font-medium">
                  Tampilkan pada Animasi Marquee Landing Page
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
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
                  {submitting ? "Menyimpan..." : "Simpan Testimoni"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
