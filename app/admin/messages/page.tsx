"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  CheckCircle2,
  Clock,
  X,
  Send,
  MessageSquare,
} from "lucide-react";

interface MessageItem {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: number;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const json = await res.json();
        setMessages(json.messages || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (id: number, currentStatus: number) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: currentStatus ? 0 : 1 }),
      });
      fetchMessages();
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: currentStatus ? 0 : 1 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;

    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        if (selectedMessage?.id === id) setSelectedMessage(null);
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openMessageDetail = (msg: MessageItem) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      toggleReadStatus(msg.id, 0);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === "unread") return !m.is_read;
    if (filter === "read") return Boolean(m.is_read);
    return true;
  });

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-red-400" />
            <span>Pesan Masuk (Inquiries)</span>
          </h1>
          <p className="text-sm text-secondary mt-1">
            Pesan dan penawaran proyek yang dikirimkan oleh klien melalui form kontak website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span>{unreadCount} pesan belum dibaca</span>
            </span>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            filter === "all"
              ? "bg-white text-black font-bold shadow-md"
              : "text-secondary hover:text-white"
          }`}
        >
          Semua ({messages.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            filter === "unread"
              ? "bg-white text-black font-bold shadow-md"
              : "text-secondary hover:text-white"
          }`}
        >
          Belum Dibaca ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("read")}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
            filter === "read"
              ? "bg-white text-black font-bold shadow-md"
              : "text-secondary hover:text-white"
          }`}
        >
          Sudah Dibaca ({messages.length - unreadCount})
        </button>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 bg-white/5 rounded-2xl" />
          ))}
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <MessageSquare className="w-10 h-10 text-secondary/40 mx-auto mb-3" />
          <p className="text-secondary text-sm">Tidak ada pesan pada kategori ini.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => openMessageDetail(msg)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                msg.is_read
                  ? "border-white/5 bg-white/[0.01] hover:border-white/15 hover:bg-white/[0.03]"
                  : "border-blue-500/30 bg-blue-500/[0.03] hover:border-blue-500/50 hover:bg-blue-500/[0.06]"
              }`}
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
                    msg.is_read
                      ? "border-white/10 bg-white/5 text-secondary"
                      : "border-blue-500/30 bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {msg.is_read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-white">
                      {msg.name}
                    </span>
                    {!msg.is_read && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        BARU
                      </span>
                    )}
                    <span className="text-xs text-secondary/60 font-label-mono">
                      {msg.email}
                    </span>
                  </div>

                  {msg.subject && (
                    <h4 className="text-xs font-medium text-secondary truncate">
                      {msg.subject}
                    </h4>
                  )}

                  <p className="text-xs text-secondary/70 line-clamp-1 italic">
                    &quot;{msg.message}&quot;
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                <span className="text-[11px] font-label-mono text-secondary/40 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(msg.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                </span>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleReadStatus(msg.id, msg.is_read)}
                    className="p-1.5 rounded-lg text-secondary hover:text-white hover:bg-white/10 transition-colors"
                    title={msg.is_read ? "Tandai Belum Dibaca" : "Tandai Dibaca"}
                  >
                    {msg.is_read ? <Mail className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 text-whatsapp-green" />}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    title="Hapus Pesan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#121414] p-6 md:p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                  {selectedMessage.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-headline-lg text-base font-bold text-white">
                    {selectedMessage.name}
                  </h3>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-xs text-blue-400 hover:underline font-label-mono"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-lg border border-white/10 text-secondary hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedMessage.subject && (
              <div className="p-3 rounded-xl border border-white/5 bg-black/40">
                <span className="text-[10px] font-label-mono text-secondary/60 block uppercase mb-0.5">
                  Subjek
                </span>
                <span className="text-sm font-medium text-white">
                  {selectedMessage.subject}
                </span>
              </div>
            )}

            <div className="p-4 rounded-xl border border-white/5 bg-black/40 space-y-2">
              <span className="text-[10px] font-label-mono text-secondary/60 block uppercase">
                Isi Pesan
              </span>
              <p className="text-sm text-secondary/90 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            <div className="text-[11px] font-label-mono text-secondary/40 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Diterima pada {new Date(selectedMessage.created_at).toLocaleString("id-ID")}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "Pesan dari Website")}`}
                className="px-4 py-2 rounded-xl bg-white text-black font-button text-xs font-bold hover:bg-white/90 transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Balas via Email</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReadStatus(selectedMessage.id, selectedMessage.is_read)}
                  className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-secondary hover:text-white"
                >
                  {selectedMessage.is_read ? "Tandai Belum Dibaca" : "Tandai Dibaca"}
                </button>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="p-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
