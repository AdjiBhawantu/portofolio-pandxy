🎨 Design System & Layout Guideline: Framer-Style Portfolio

1. Konsep Utama (Core Concept)

Tema: Modern, Minimalis, High-Tech, Premium.

Mode: Dark Mode sebagai default (karena cocok dengan warna aksen ungu/A78BFA dari GitHub README).

Vibe: Menyerupai landing page produk SaaS modern (seperti Framer.com).

Animasi: Halus, berbasis scroll (scroll-reveal), hover efek membesar (scale up), dan elemen mengambang (floating).

2. Palet Warna (Color Palette)

Menggunakan standar Tailwind CSS:

Background Utama: bg-neutral-950 (Hitam pekat namun lembut) atau #0a0a0a.

Background Card/Grid: bg-neutral-900 dengan border tipis border-neutral-800.

Teks Utama (Heading): text-white (Putih murni).

Teks Sekunder (Paragraph): text-neutral-400 (Abu-abu terang).

3. Tipografi (Typography)

Font Family: Inter, SF Pro Display, atau sistem Sans-serif bawaan.

Heading: Font-weight Bold (700) atau ExtraBold (800) dengan tracking sedikit rapat (letter-spacing tight).

Body: Font-weight Regular (400) atau Medium (500) dengan line-height yang lega (leading-relaxed).

4. Efek Visual (Visual Effects)

Glassmorphism: Digunakan pada Navbar. Background transparan dengan efek blur (backdrop-blur-md, bg-black/50).

Borders: Sudut sangat melengkung pada card/bento box (rounded-2xl atau rounded-3xl). Border tipis 1px transparan putih (border border-white/10).

Shadows: Bayangan lembut bergaya glow (Cahaya memudar) untuk tombol CTA utama.

5. Referensi Animasi (Framer Motion)

Initial Load: Semua elemen muncul dari bawah ke atas dengan transparansi (Fade In Up).

Hover on Cards: whileHover={{ scale: 1.02 }} - efek mengangkat sedikit ke arah pengguna.

Scroll Reveal: Setiap masuk section baru, elemen muncul secara bertahap (Staggered fade in).
