"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Code2,
  FolderGit2,
  MessageSquareQuote,
  Mail,
  ArrowUpRight,
  Database,
  CheckCircle2,
  Sparkles,
  Plus,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      const res = await fetch("/api/admin/overview");
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
      }
    } catch (err) {
      console.error("Failed to load overview data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const markMessageAsRead = async (id: number) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: 1 }),
      });
      fetchOverview();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 bg-white/5 rounded-2xl" />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 bg-white/5 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentMessages = data?.recentMessages || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.01] backdrop-blur-xl">
        <div className="quote-bg select-none opacity-20">&quot;</div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-whatsapp-green animate-pulse" />
              <span className="font-label-mono text-xs text-secondary/80 uppercase tracking-widest font-bold">
                SISTEM AKTIF & TERKONEKSI MYSQL
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl md:text-3xl text-white font-bold tracking-tight">
              Selamat Datang di Panel Admin Portofolio
            </h1>
            <p className="text-secondary text-sm mt-1 max-w-xl">
              Kelola seluruh konten website Anda mulai dari informasi profil, layanan, keahlian teknologi, galeri proyek, hingga testimoni klien secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects"
              className="px-4 py-2.5 rounded-xl bg-white text-black font-button font-bold text-xs hover:bg-white/90 transition-all flex items-center gap-1.5 shadow-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Proyek</span>
            </Link>
            <Link
              href="/admin/settings"
              className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-button font-bold text-xs transition-all"
            >
              Edit Profil
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Services */}
        <Link
          href="/admin/services"
          className="testimonial-card-glass p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all group"
        >
          <div className="flex items-center justify-between mb-3 text-secondary">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="block text-2xl font-bold font-headline-lg text-white">
            {stats.services || 0}
          </span>
          <span className="text-xs text-secondary/70">Layanan Ditawarkan</span>
        </Link>

        {/* Skills */}
        <Link
          href="/admin/skills"
          className="testimonial-card-glass p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all group"
        >
          <div className="flex items-center justify-between mb-3 text-secondary">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Code2 className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="block text-2xl font-bold font-headline-lg text-white">
            {stats.skills || 0}
          </span>
          <span className="text-xs text-secondary/70">Keahlian & Tech Stack</span>
        </Link>

        {/* Projects */}
        <Link
          href="/admin/projects"
          className="testimonial-card-glass p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all group"
        >
          <div className="flex items-center justify-between mb-3 text-secondary">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="block text-2xl font-bold font-headline-lg text-white">
            {stats.projects || 0}
          </span>
          <span className="text-xs text-secondary/70">Proyek Portofolio</span>
        </Link>

        {/* Testimonials */}
        <Link
          href="/admin/testimonials"
          className="testimonial-card-glass p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all group"
        >
          <div className="flex items-center justify-between mb-3 text-secondary">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="block text-2xl font-bold font-headline-lg text-white">
            {stats.testimonials || 0}
          </span>
          <span className="text-xs text-secondary/70">Testimoni Klien</span>
        </Link>

        {/* Messages */}
        <Link
          href="/admin/messages"
          className="testimonial-card-glass p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all group col-span-2 md:col-span-1"
        >
          <div className="flex items-center justify-between mb-3 text-secondary">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Mail className="w-4 h-4" />
            </div>
            {stats.unreadMessages > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-[10px] text-red-400 font-bold">
                {stats.unreadMessages} baru
              </span>
            )}
          </div>
          <span className="block text-2xl font-bold font-headline-lg text-white">
            {stats.totalMessages || 0}
          </span>
          <span className="text-xs text-secondary/70">Pesan Pengunjung</span>
        </Link>
      </div>

      {/* Two Column Layout: Recent Messages & Quick Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <h3 className="font-headline-lg text-base font-bold text-white">
                Pesan Kontak Terbaru
              </h3>
              <p className="text-xs text-secondary">
                Pesan yang dikirim oleh pengunjung melalui form kontak landing page.
              </p>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs font-label-mono text-secondary hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Lihat Semua</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-12 text-center text-secondary/60 text-sm">
              Belum ada pesan kontak yang masuk.
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg: any) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                    msg.is_read
                      ? "border-white/5 bg-white/[0.01]"
                      : "border-blue-500/30 bg-blue-500/[0.04]"
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white truncate">
                        {msg.name}
                      </span>
                      {!msg.is_read && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          Baru
                        </span>
                      )}
                      <span className="text-xs text-secondary/50 font-label-mono">
                        {msg.email}
                      </span>
                    </div>
                    {msg.subject && (
                      <div className="text-xs text-secondary font-medium">
                        {msg.subject}
                      </div>
                    )}
                    <p className="text-xs text-secondary/70 line-clamp-1 italic">
                      &quot;{msg.message}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {!msg.is_read && (
                      <button
                        onClick={() => markMessageAsRead(msg.id)}
                        className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] text-secondary hover:text-white transition-all flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-whatsapp-green" />
                        <span>Tandai Dibaca</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System / Tech Status Card (1 Col) */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-5">
          <h3 className="font-headline-lg text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-whatsapp-green" />
            <span>Status Backend & Server</span>
          </h3>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/40">
              <span className="text-secondary">Database Engine</span>
              <span className="font-label-mono text-white font-semibold">MySQL 8.0 (Laragon)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/40">
              <span className="text-secondary">Database Name</span>
              <span className="font-label-mono text-whatsapp-green font-semibold">portfolio_pandxy</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/40">
              <span className="text-secondary">Database Host</span>
              <span className="font-label-mono text-white">localhost:3306</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/40">
              <span className="text-secondary">API Status</span>
              <span className="inline-flex items-center gap-1.5 text-whatsapp-green font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-whatsapp-green animate-pulse" />
                Online & Connected
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-black/40">
              <span className="text-secondary">Next.js Version</span>
              <span className="font-label-mono text-white">v15.5+ App Router</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <Link
              href="/admin/settings"
              className="w-full py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Kelola Info Profil & Kontak</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
