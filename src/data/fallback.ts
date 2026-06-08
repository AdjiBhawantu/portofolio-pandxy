import type { Service, Skill, Testimonial } from '@/types'

export const services: Service[] = [
  {
    id: 'company-profile',
    title: 'Website Company Profile',
    description: 'Website profesional untuk memperkenalkan bisnis Anda secara online dengan desain modern dan responsif.',
    icon: 'Building2',
    features: ['Desain responsif mobile & tablet', 'Halaman about, services, contact', 'Integrasi Google Maps', 'Form kontak otomatis', 'SEO dasar'],
  },
  {
    id: 'toko-online',
    title: 'Toko Online',
    description: 'Solusi e-commerce lengkap untuk memulai jualan online dengan sistem pembayaran terintegrasi.',
    icon: 'ShoppingCart',
    features: ['Manajemen produk & kategori', 'Keranjang belanja', 'Integrasi payment gateway', 'Dashboard penjualan', 'Notifikasi order otomatis'],
  },
  {
    id: 'web-app',
    title: 'Aplikasi Web',
    description: 'Aplikasi web kustom sesuai kebutuhan bisnis Anda — dari sistem inventaris hingga CRM sederhana.',
    icon: 'LayoutDashboard',
    features: ['Autentikasi user', 'Dashboard interaktif', 'Database terintegrasi', 'API endpoints', 'Deploy & maintenance'],
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Halaman satu halaman yang fokus mengkonversi pengunjung menjadi pelanggan atau lead.',
    icon: 'MousePointerClick',
    features: ['Desain high-conversion', 'Animasi Framer Motion', 'Optimasi loading cepat', 'CTA strategis', 'Integrasi analytics'],
  },
  {
    id: 'pos-system',
    title: 'POS System',
    description: 'Sistem kasir dan manajemen inventaris digital yang terintegrasi untuk mencatat transaksi dan memantau bisnis Anda secara real-time.',
    icon: 'point_of_sale',
    features: ['Manajemen transaksi', 'Inventory tracking', 'Laporan penjualan', 'Multi-payment', 'Integrasi dengan platform lain'],
  },
]

export const skills: Skill[] = [
  { name: 'React', category: 'Frontend', level: 95 },
  { name: 'Next.js', category: 'Frontend', level: 90 },
  { name: 'TypeScript', category: 'Frontend', level: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
  { name: 'Framer Motion', category: 'Frontend', level: 85 },
  { name: 'Node.js', category: 'Backend', level: 85 },
  { name: 'Express', category: 'Backend', level: 80 },
  { name: 'Supabase', category: 'Backend', level: 80 },
  { name: 'PostgreSQL', category: 'Backend', level: 75 },
  { name: 'Git & GitHub', category: 'Tools', level: 90 },
  { name: 'Vite', category: 'Tools', level: 90 },
  { name: 'Vercel', category: 'Tools', level: 85 },
  { name: 'Figma', category: 'Design', level: 85 },
  { name: 'Spline', category: 'Design', level: 70 },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmad Rizki',
    role: 'Founder',
    company: 'Kopi Nusantara',
    content: 'Pandxy berhasil membuat website company profile untuk kedai kopi saya. Desainnya modern dan bikin kafe kami terlihat lebih premium. Pelanggan baru sering datang karena lihat website kami!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sari Dewi',
    role: 'Owner',
    company: 'Butik Syifa',
    content: 'Toko online yang dibuat Pandxy sangat membantu bisnis fashion saya. Sekarang 70% orders datang dari website. Prosesnya cepat dan hasilnya memuaskan!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Fiki Aulia',
    role: 'Manager',
    company: 'Warung Sehat',
    content: 'Aplikasi web untuk inventaris dan kasir yang dibuat Pandxy sangat memudahkan operasional sehari-hari. Recommended banget untuk UMKM yang mau go-digital!',
    rating: 4,
  },
]
