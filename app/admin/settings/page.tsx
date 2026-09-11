"use client";

import { useEffect, useState } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  User,
  Sparkles,
  Share2,
  Phone,
  BarChart3,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "stats" | "contact">("hero");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const json = await res.json();
          setSettings(json.settings || {});
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan pengaturan");

      setMessage({ text: "Pengaturan berhasil disimpan!", type: "success" });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ text: err.message || "Gagal menyimpan", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-white/5 rounded-2xl" />
        <div className="h-96 bg-white/5 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-white tracking-tight">
            Pengaturan Konten & Profil
          </h1>
          <p className="text-sm text-secondary mt-1">
            Ubah teks Hero, informasi Tentang Saya (About), statistik angka, dan kontak portofolio Anda.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-white text-black font-button font-bold text-xs hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </>
          )}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl border text-sm flex items-center gap-3 transition-all ${
            message.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === "hero"
              ? "bg-white text-black font-bold shadow-md"
              : "text-secondary hover:text-white"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hero Banner</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === "about"
              ? "bg-white text-black font-bold shadow-md"
              : "text-secondary hover:text-white"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Tentang Saya (About)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === "stats"
              ? "bg-white text-black font-bold shadow-md"
              : "text-secondary hover:text-white"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Statistik Counter</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            activeTab === "contact"
              ? "bg-white text-black font-bold shadow-md"
              : "text-secondary hover:text-white"
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Kontak & Sosial Media</span>
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* HERO TAB */}
        {activeTab === "hero" && (
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-6">
            <h3 className="font-headline-lg text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Pengaturan Tampilan Hero</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Nama Lengkap (Background Marquee & Watermark)
                </label>
                <input
                  type="text"
                  value={settings.hero_name || ""}
                  onChange={(e) => handleChange("hero_name", e.target.value)}
                  placeholder="ADJI BHAWANTU"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Badge Spesialisasi
                </label>
                <input
                  type="text"
                  value={settings.hero_badge || ""}
                  onChange={(e) => handleChange("hero_badge", e.target.value)}
                  placeholder="Full-Stack"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Status Ketersediaan (Floating Badge)
                </label>
                <input
                  type="text"
                  value={settings.availability_status || ""}
                  onChange={(e) => handleChange("availability_status", e.target.value)}
                  placeholder="Available for Freelance & Full-time"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Headline Baris 1
                </label>
                <input
                  type="text"
                  value={settings.hero_title_1 || ""}
                  onChange={(e) => handleChange("hero_title_1", e.target.value)}
                  placeholder="Web & App"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Headline Baris 2
                </label>
                <input
                  type="text"
                  value={settings.hero_title_2 || ""}
                  onChange={(e) => handleChange("hero_title_2", e.target.value)}
                  placeholder="Developer Based"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Headline Baris 3
                </label>
                <input
                  type="text"
                  value={settings.hero_title_3 || ""}
                  onChange={(e) => handleChange("hero_title_3", e.target.value)}
                  placeholder="In Indonesia"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Sub-judul / Deskripsi Singkat Hero
                </label>
                <textarea
                  rows={3}
                  value={settings.hero_subtitle || ""}
                  onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                  placeholder="I help businesses grow through fast, secure, and high-performing websites..."
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-6">
            <h3 className="font-headline-lg text-lg font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Pengaturan Section Tentang Saya (About)</span>
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Judul Section About
                </label>
                <input
                  type="text"
                  value={settings.about_title || ""}
                  onChange={(e) => handleChange("about_title", e.target.value)}
                  placeholder="Building High-Impact Web & Mobile Systems"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Paragraf Deskripsi 1
                </label>
                <textarea
                  rows={4}
                  value={settings.about_description_1 || ""}
                  onChange={(e) => handleChange("about_description_1", e.target.value)}
                  placeholder="I am a dedicated software developer passionate about building scalable..."
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Paragraf Deskripsi 2
                </label>
                <textarea
                  rows={4}
                  value={settings.about_description_2 || ""}
                  onChange={(e) => handleChange("about_description_2", e.target.value)}
                  placeholder="From enterprise software and POS systems to responsive e-commerce stores..."
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === "stats" && (
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-6">
            <h3 className="font-headline-lg text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Angka Statistik Pengalaman & Reputasi</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Pengalaman (Years Exp)
                </label>
                <input
                  type="text"
                  value={settings.stat_experience_years || ""}
                  onChange={(e) => handleChange("stat_experience_years", e.target.value)}
                  placeholder="3+"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm font-headline-lg text-lg focus:outline-none focus:border-white/40"
                />
                <span className="text-[11px] text-secondary/60 mt-1 block">Tahun Pengalaman Coding</span>
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Proyek Terselesaikan (Projects)
                </label>
                <input
                  type="text"
                  value={settings.stat_projects_completed || ""}
                  onChange={(e) => handleChange("stat_projects_completed", e.target.value)}
                  placeholder="25+"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm font-headline-lg text-lg focus:outline-none focus:border-white/40"
                />
                <span className="text-[11px] text-secondary/60 mt-1 block">Total Project Selesai</span>
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Kepuasan Klien (Satisfaction)
                </label>
                <input
                  type="text"
                  value={settings.stat_client_satisfaction || ""}
                  onChange={(e) => handleChange("stat_client_satisfaction", e.target.value)}
                  placeholder="99%"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm font-headline-lg text-lg focus:outline-none focus:border-white/40"
                />
                <span className="text-[11px] text-secondary/60 mt-1 block">Persentase Kepuasan</span>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT & SOCIALS TAB */}
        {activeTab === "contact" && (
          <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-6">
            <h3 className="font-headline-lg text-lg font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-purple-400" />
              <span>Informasi Kontak & Link Sosial Media</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Email Kontak
                </label>
                <input
                  type="email"
                  value={settings.contact_email || ""}
                  onChange={(e) => handleChange("contact_email", e.target.value)}
                  placeholder="adjibhawantu@gmail.com"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Nomor WhatsApp (Format: 628xxx)
                </label>
                <input
                  type="text"
                  value={settings.contact_whatsapp || ""}
                  onChange={(e) => handleChange("contact_whatsapp", e.target.value)}
                  placeholder="62895604169544"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Nomor Telepon Tampilan
                </label>
                <input
                  type="text"
                  value={settings.contact_phone || ""}
                  onChange={(e) => handleChange("contact_phone", e.target.value)}
                  placeholder="+62 895 6041 69544"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Lokasi Domisili
                </label>
                <input
                  type="text"
                  value={settings.contact_location || ""}
                  onChange={(e) => handleChange("contact_location", e.target.value)}
                  placeholder="Lampung, Indonesia"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Link GitHub
                </label>
                <input
                  type="url"
                  value={settings.social_github || ""}
                  onChange={(e) => handleChange("social_github", e.target.value)}
                  placeholder="https://github.com/AdjiBhawantu"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Link LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.social_linkedin || ""}
                  onChange={(e) => handleChange("social_linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/adjibhawantu"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-label-mono text-secondary mb-2 uppercase tracking-wider">
                  Link Instagram
                </label>
                <input
                  type="url"
                  value={settings.social_instagram || ""}
                  onChange={(e) => handleChange("social_instagram", e.target.value)}
                  placeholder="https://instagram.com/pandxy_"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-white text-black font-button font-bold text-sm hover:bg-white/90 active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Semua Pengaturan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
