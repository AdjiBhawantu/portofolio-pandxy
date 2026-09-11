"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  Code2,
  FolderGit2,
  MessageSquareQuote,
  Mail,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const navigationItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Settings & Profil", href: "/admin/settings", icon: Settings },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Code2 },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "Pesan Masuk", href: "/admin/messages", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) return;

    let isMounted = true;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/admin/login");
          return;
        }
        const data = await res.json();
        if (isMounted) {
          setAdminUser(data.user);
          setCheckingAuth(false);
        }
      } catch (err) {
        if (isMounted) {
          router.replace("/admin/login");
        }
      }
    }
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  // Login page doesn't need admin dashboard chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <p className="font-label-mono text-xs text-secondary tracking-widest uppercase">
          Memeriksa Autentikasi...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row antialiased">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0f1010]/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-whatsapp-green animate-pulse" />
          <span className="font-headline-lg text-lg font-bold tracking-tight">
            PANDXY <span className="text-secondary/60 text-xs font-label-mono">ADMIN</span>
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg border border-white/10 bg-white/5 text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Desktop & Mobile Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 border-r border-white/10 bg-[#0c0d0d]/90 backdrop-blur-xl flex flex-col z-40 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 hidden md:flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-whatsapp-green animate-pulse" />
            <div>
              <h2 className="font-headline-lg text-lg font-bold tracking-wider leading-none">
                PANDXY
              </h2>
              <span className="font-label-mono text-[10px] text-secondary/60 tracking-widest uppercase">
                Content Manager
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-label-mono uppercase tracking-widest text-secondary/40 font-semibold">
            Menu Utama
          </div>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-lg shadow-white/5"
                    : "text-secondary hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-secondary"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-black/20">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-lg border border-white/10 text-xs font-medium text-secondary hover:text-white hover:bg-white/5 transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Website Live</span>
            </span>
            <span className="text-[10px] font-label-mono bg-white/10 px-1.5 py-0.5 rounded">
              Tab baru
            </span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top bar Desktop */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#0c0d0d]/40 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-label-mono text-secondary/60 uppercase tracking-wider">
              Admin Panel
            </span>
            <span className="text-secondary/40">/</span>
            <span className="text-xs font-medium text-white capitalize">
              {pathname.replace("/admin", "").replace("/", "") || "Dashboard Overview"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold text-white">
                {adminUser?.name?.charAt(0) || "A"}
              </div>
              <div className="flex flex-col pr-2 text-left">
                <span className="text-xs font-medium text-white leading-none">
                  {adminUser?.name || "Admin"}
                </span>
                <span className="text-[10px] font-label-mono text-secondary/60 leading-tight">
                  @{adminUser?.username || "admin"}
                </span>
              </div>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white font-medium transition-all flex items-center gap-1.5"
            >
              <span>Preview Web</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
