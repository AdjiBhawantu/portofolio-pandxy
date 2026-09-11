"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";

interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "web",
    sort_order: 0,
    is_active: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const json = await res.json();
        setServices(json.services || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      icon: "web",
      sort_order: services.length + 1,
      is_active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      icon: service.icon,
      sort_order: service.sort_order,
      is_active: Boolean(service.is_active),
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const url = editingService
        ? `/api/admin/services/${editingService.id}`
        : "/api/admin/services";
      const method = editingService ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          is_active: formData.is_active ? 1 : 0,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan layanan");

      setFeedback({
        text: editingService ? "Layanan berhasil diperbarui!" : "Layanan baru berhasil ditambahkan!",
        type: "success",
      });
      setModalOpen(false);
      fetchServices();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setFeedback({ text: err.message || "Terjadi kesalahan", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus layanan "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedback({ text: `Layanan "${title}" telah dihapus`, type: "success" });
        fetchServices();
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
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span>Manajemen Layanan (Services)</span>
          </h1>
          <p className="text-sm text-secondary mt-1">
            Kelola daftar layanan spesialisasi yang Anda tawarkan kepada klien di landing page.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-white text-black font-button font-bold text-xs hover:bg-white/90 active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan</span>
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

      {/* Services List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-44 bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <Briefcase className="w-10 h-10 text-secondary/40 mx-auto mb-3" />
          <p className="text-secondary text-sm">Belum ada layanan yang tersimpan.</p>
          <button
            onClick={openCreateModal}
            className="mt-4 px-4 py-2 rounded-xl bg-white text-black font-button text-xs font-bold"
          >
            Tambah Layanan Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="testimonial-card-glass p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <span className="material-symbols-outlined text-xl">
                      {service.icon || "web"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        service.is_active
                          ? "bg-whatsapp-green/20 text-whatsapp-green border border-whatsapp-green/30"
                          : "bg-white/10 text-secondary border border-white/15"
                      }`}
                    >
                      {service.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                    <span className="text-[11px] font-label-mono text-secondary/60">
                      Urutan: {service.sort_order}
                    </span>
                  </div>
                </div>

                <h3 className="font-headline-lg text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-secondary/80 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-white/5">
                <button
                  onClick={() => openEditModal(service)}
                  className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-secondary hover:text-white transition-all text-xs flex items-center gap-1.5"
                  title="Edit"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(service.id, service.title)}
                  className="p-2 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-400 transition-all text-xs flex items-center gap-1.5"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#121414] p-6 md:p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-headline-lg text-lg font-bold text-white">
                {editingService ? "Edit Layanan" : "Tambah Layanan Baru"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg border border-white/10 text-secondary hover:text-white hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  Judul Layanan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Company Profile"
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  Icon Material Symbols
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="business, storefront, web, flight_takeoff, point_of_sale"
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
                <span className="text-[10px] text-secondary/50 mt-1 block">
                  Nama icon Material Symbols (misal: business, web, storefront, terminal)
                </span>
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-1.5 uppercase">
                  Deskripsi Layanan *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan value proposition dan hasil yang didapatkan klien..."
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded border-white/10 bg-black/40 text-blue-500 focus:ring-0"
                  />
                  <label htmlFor="is_active" className="text-xs text-white font-medium cursor-pointer">
                    Aktifkan Layanan Ini
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-secondary hover:text-white text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-white text-black font-button text-xs font-bold hover:bg-white/90 disabled:opacity-50"
                >
                  {submitting ? "Menyimpan..." : "Simpan Layanan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
