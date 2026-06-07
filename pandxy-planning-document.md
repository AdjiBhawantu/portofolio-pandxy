# 📋 WEBSITE PLANNING DOCUMENT
## Pandxy — Jasa Pembuatan Website & Aplikasi

> Versi: 1.0 | Dibuat: Juni 2026 | Status: Draft

---

## 1. Project Overview

| Field | Detail |
|-------|--------|
| **Nama Project** | Pandxy Portfolio Website |
| **Domain** | pandxy.com |
| **Jenis Website** | Portfolio + Company Profile (Solo Developer) |
| **Tujuan Utama** | Menarik klien potensial (UMKM, Cafe, Instansi, Pebisnis) untuk memesan jasa pembuatan website/aplikasi |
| **Target Audience** | Pemilik usaha/UMKM, Cafe, Instansi, Pebisnis usia 18–35 tahun |
| **Tone & Vibe** | Modern · High-Tech · Premium · Minimalis — seperti landing page SaaS (Framer-style) |
| **Timeline** | 1 minggu (MVP harus live) |

---

## 2. Sitemap

```
pandxy.com
├── / (Home — One Page)
│   ├── #hero          → Hero section + tagline + CTA
│   ├── #about         → About / Profil singkat
│   ├── #services      → Layanan yang ditawarkan
│   ├── #skills        → Tech stack & skill
│   ├── #portfolio     → Showcase project (pull dari GitHub)
│   ├── #testimonial   → Testimoni klien
│   └── #contact       → Form kontak + WhatsApp button
│
└── /admin (Panel Admin — Protected)
    ├── /admin/projects    → Kelola project portfolio
    ├── /admin/services    → Kelola daftar layanan
    ├── /admin/skills      → Kelola skill/tech stack
    └── /admin/testimonials → Kelola testimoni
```

> **Catatan:** Website ini adalah one-page scroll dengan navigasi anchor link. Panel admin terpisah dan diproteksi dengan auth.

---

## 3. Fitur & Fungsionalitas

| Fitur | Prioritas | Deskripsi | Kompleksitas |
|-------|-----------|-----------|-------------|
| Hero Section + Animasi | 🔴 Wajib | Headline bold, tagline, CTA button, animasi 3D/particle background | Tinggi |
| About / Profil | 🔴 Wajib | Foto profil (opsional), bio singkat, highlight pengalaman | Rendah |
| Services Section | 🔴 Wajib | Card layanan: Website, Aplikasi, UI/UX — dengan hover animasi | Sedang |
| Skills Section | 🔴 Wajib | Tech stack visual (React, Next.js, TypeScript, dll) dengan animasi | Sedang |
| Portfolio Gallery | 🔴 Wajib | Grid project cards, pull data dari GitHub API, filter by kategori | Tinggi |
| Testimonial Section | 🔴 Wajib | Carousel/marquee testimoni klien | Sedang |
| Contact + WhatsApp | 🔴 Wajib | Form kontak sederhana + floating WhatsApp button | Rendah |
| Scroll Animations | 🔴 Wajib | Framer Motion scroll-reveal, stagger, fade in up | Sedang |
| 3D Elements | 🟡 Penting | Three.js atau Spline 3D object di hero section | Tinggi |
| Glassmorphism Navbar | 🟡 Penting | Navbar sticky dengan backdrop blur | Rendah |
| Panel Admin | 🟡 Fase 2 | CRUD untuk project, testimoni, layanan, skill | Tinggi |
| Dark Mode Only | 🟢 Nice | Default dark, tidak perlu toggle | Rendah |
| GitHub API Integration | 🟡 Penting | Auto-pull repo dari GitHub untuk portfolio | Sedang |
| SEO Basic | 🟡 Penting | Meta tags, OG image, sitemap | Rendah |

---

## 4. Tech Stack Recommendation

### Stack Utama

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| **Framework** | React + Vite | SPA murni, ringan, build cepat, perfect untuk portfolio statis. Deploy semudah drag & drop ke Vercel |
| **Language** | TypeScript | Sudah kamu sebutkan bisa TS, lebih aman dan maintainable |
| **Styling** | Tailwind CSS v3 | Utility-first, cepat, cocok dengan desain system dari design.md |
| **Animasi** | Framer Motion | Library animasi React terbaik, sesuai referensi Framer-style |
| **3D Elements** | Spline (spline.design) | Lebih mudah dari Three.js, bisa embed langsung ke React tanpa coding 3D dari nol |
| **Database** | Supabase (PostgreSQL) | Free tier cukup, ada auth bawaan untuk admin panel, realtime, mudah diintegrasikan dengan Next.js |
| **Auth Admin** | Supabase Auth | Built-in, gratis, aman untuk proteksi panel admin |
| **Hosting** | Vercel (Free Tier) | Zero config deploy dari GitHub, custom domain gratis, edge network cepat |
| **Domain** | pandxy.com (sudah ada) | Tinggal pointing ke Vercel |
| **GitHub API** | GitHub REST API v3 | Pull data repo public otomatis untuk portfolio section |
| **Icons** | Lucide React | Clean, lightweight, cocok dengan aesthetic minimalis |
| **Font** | Geist + Syne | Geist untuk body (modern, bersih), Syne untuk heading (distinctive, tech-feel) via Google Fonts |

### Catatan Penting React + Vite vs Next.js

| Aspek | React + Vite | Next.js |
|-------|-------------|---------|
| **SEO** | Terbatas (CSR) — bisa diatasi dengan react-helmet | Built-in SSR/SSG |
| **Build speed** | Sangat cepat ⚡ | Lebih lambat |
| **Kompleksitas** | Lebih sederhana ✅ | Lebih kompleks |
| **Deploy** | Static files — super mudah | Butuh Node.js runtime |
| **Cocok untuk** | Portfolio SPA ✅ | App kompleks + blog |

> **Rekomendasi:** Untuk portfolio one-page seperti Pandxy, React + Vite sudah lebih dari cukup. Tambahkan `react-helmet-async` untuk basic SEO meta tags.

### Alternatif yang Bisa Dipertimbangkan

| Alternatif | Kapan Pakai |
|------------|-------------|
| **Next.js** | Jika ke depan mau tambah blog atau butuh SEO lebih kuat |
| **Three.js** | Jika mau 3D yang lebih custom & kompleks (butuh waktu lebih) |
| **Contentlayer / JSON file** | Alternatif Supabase — simpan data project/testimoni di file JSON lokal |

---

## 5. Visual Direction

### Color Palette

```
Background Utama  → #0a0a0a  (Hitam pekat, lembut)
Background Card   → #111111  (Sedikit lebih terang)
Border            → rgba(255,255,255,0.08)  (Border putih transparan)
Teks Utama        → #FFFFFF  (Putih murni)
Teks Sekunder     → #A3A3A3  (Abu-abu netral)
Teks Subtle       → #525252  (Abu-abu gelap)
Accent Utama      → #FFFFFF  (Putih — clean, no color accent)
Accent Glow       → rgba(255,255,255,0.05)  (Untuk efek glow halus)
CTA Button        → #FFFFFF text on #FFFFFF bg dengan shadow glow putih
```

> **Improved dari design.md:** Dihilangkan warna ungu/A78BFA — diganti full hitam-putih untuk kesan lebih premium dan timeless seperti Framer.com sendiri.

### Typography

| Peran | Font | Weight | Catatan |
|-------|------|--------|---------|
| **Display / Hero** | Syne | 700–800 | Distinctive, tech-feel, tersedia di Google Fonts |
| **Heading** | Syne | 600–700 | Konsisten dengan display |
| **Body / Paragraf** | Geist | 400–500 | Clean, modern, dibuat Vercel khusus untuk UI |
| **Code / Tech Label** | Geist Mono | 400 | Untuk menampilkan nama teknologi |

### Mood & Style Keywords

`Premium` · `Minimal` · `High-Tech` · `Dark` · `Confident` · `Clean` · `Immersive` · `Framer-like`

### Animasi Direction

| Tipe | Implementasi |
|------|-------------|
| **Page Load** | Staggered fade-in-up semua elemen (delay 0.1s per item) |
| **Scroll Reveal** | `whileInView` Framer Motion, threshold 0.2 |
| **Hover Cards** | `whileHover={{ scale: 1.02, y: -4 }}` |
| **Hero 3D** | Spline object — rotating/floating 3D shape |
| **Marquee Testimonial** | Auto-scroll horizontal, pause on hover |
| **Navbar** | Glassmorphism + shadow muncul saat scroll |
| **Cursor** | Custom cursor dot (opsional, nice touch) |

### Referensi Visual

- framer.com — layout dan animasi
- linear.app — card design dan spacing
- vercel.com — hero section dan tipografi

---

## 6. Timeline & Milestones

| Fase | Hari | Deliverable |
|------|------|-------------|
| **Setup & Foundation** | Hari 1 | Init Next.js + TS + Tailwind + Framer Motion, deploy awal ke Vercel, setup Supabase |
| **Hero + Navbar** | Hari 2 | Glassmorphism navbar, hero section dengan animasi + 3D Spline object |
| **About + Services + Skills** | Hari 3 | About section, services card, skills grid dengan animasi |
| **Portfolio** | Hari 4 | GitHub API integration, portfolio grid, filter kategori |
| **Testimonial + Contact** | Hari 5 | Testimonial marquee/carousel, form kontak, WhatsApp button |
| **Polish & SEO** | Hari 6 | Animasi fine-tuning, responsive mobile, meta tags, OG image |
| **Launch** | Hari 7 | Final testing, pointing domain pandxy.com → Vercel, **LIVE** 🚀 |

> **Panel Admin** dijadwalkan di **Fase 2** (setelah MVP live), agar tidak menghambat deadline 1 minggu.

---

## 7. Content Checklist

Konten yang perlu disiapkan sebelum atau selama development:

### Sudah Ada ✅
- [x] Logo Pandxy (minta format PNG transparan + SVG)
- [x] Domain pandxy.com
- [x] Project di GitHub (akan di-pull via API)

### Perlu Dibuat / Disiapkan ⏳

**About Section**
- [ ] Bio singkat (3–4 kalimat): siapa kamu, apa yang kamu kerjakan, apa yang kamu tawarkan
- [ ] Foto profil (opsional — bisa diganti ilustrasi/avatar)
- [ ] Tahun mulai kerja / pengalaman

**Services Section**
- [ ] Daftar layanan (contoh: Website Company Profile, Toko Online, Aplikasi Web, Landing Page, UI/UX Design)
- [ ] Deskripsi singkat tiap layanan (1–2 kalimat)
- [ ] Estimasi harga (opsional)

**Skills Section**
- [ ] Daftar teknologi yang dikuasai (React, Next.js, TypeScript, Tailwind, Node.js, dll)
- [ ] Level/kategori per skill (Frontend / Backend / Tools)

**Testimonial Section**
- [ ] Minimal 3–5 testimoni klien (nama, jabatan/usaha, isi testimoni)
- [ ] Foto klien (opsional)

**Contact Section**
- [ ] Nomor WhatsApp aktif untuk tombol WA
- [ ] Email kontak (opsional)
- [ ] Link sosial media (Instagram, LinkedIn, GitHub)

**Meta & SEO**
- [ ] Tagline / headline utama (contoh: "Pandxy — Wujudkan Website Impian Bisnis Anda")
- [ ] Deskripsi singkat untuk meta description (160 karakter)
- [ ] OG Image (gambar preview saat link dibagikan di WA/sosmed)

---

## 8. Struktur Folder Rekomendasi (React + Vite)

```
pandxy/
├── public/
│   ├── logo.svg
│   └── og-image.png
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Root component + routing
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── Navbar.tsx
│   │       ├── Footer.tsx
│   │       └── WhatsAppButton.tsx
│   ├── lib/
│   │   ├── supabase.ts       # Supabase client
│   │   └── github.ts         # GitHub API helper
│   ├── data/
│   │   └── fallback.ts       # Data fallback jika API gagal
│   ├── hooks/
│   │   └── useGithubRepos.ts # Custom hook fetch GitHub
│   └── types/
│       └── index.ts          # TypeScript interfaces
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

> **Tip:** Untuk panel admin di Fase 2, bisa pakai React Router dengan route `/admin` yang diproteksi Supabase Auth.

---

## 9. Estimasi Biaya Bulanan

| Layanan | Biaya |
|---------|-------|
| Vercel (Free Tier) | Rp 0 |
| Supabase (Free Tier) | Rp 0 |
| Domain pandxy.com | Sudah ada |
| **Total** | **Rp 0 / bulan** |

> Free tier Vercel dan Supabase lebih dari cukup untuk portfolio personal dengan traffic normal.

---

*Dokumen ini siap digunakan sebagai acuan development. Simpan dan gunakan sebagai referensi di setiap fase pembangunan website.*
