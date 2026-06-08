import type { Service, Skill, Testimonial, PortfolioItem } from '@/types'

export const services: Service[] = [
  {
    id: 'company-profile',
    title: 'Company Profile',
    description:
      'Website profesional untuk meningkatkan kredibilitas brand Anda dan menarik lebih banyak klien potensial.',
    icon: 'business',
    features: [],
  },
  {
    id: 'toko-online',
    title: 'Toko Online',
    description:
      'Platform e-commerce yang aman dan mudah digunakan untuk memaksimalkan penjualan produk Anda secara online.',
    icon: 'storefront',
    features: [],
  },
  {
    id: 'web-app',
    title: 'Aplikasi Web',
    description:
      'Sistem web kustom yang kompleks untuk mendigitalisasi dan mengotomatisasi proses bisnis Anda.',
    icon: 'web',
    features: [],
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description:
      'Halaman yang dioptimalkan untuk konversi tinggi, dirancang khusus untuk kampanye pemasaran atau peluncuran produk baru Anda.',
    icon: 'flight_takeoff',
    features: [],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description:
      'Desain antarmuka yang intuitif dan menarik untuk memberikan pengalaman pengguna terbaik.',
    icon: 'design_services',
    features: [],
  },
]

export const skills: Skill[] = [
  { name: 'React', category: 'Frontend', level: 95 },
  { name: 'Next.js', category: 'Frontend', level: 90 },
  { name: 'TypeScript', category: 'Frontend', level: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 95 },
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
    name: 'Budi Santoso',
    role: 'CEO',
    company: 'Tech Indo',
    content:
      'Pandxy memberikan hasil yang luar biasa. Website company profile kami terlihat sangat profesional dan proses pembuatannya sangat cepat.',
    avatar_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_I6A1_5O0GbVFx48YcD2Km_cJf9fhALVglAP1r5dNQcOAWduIUQK4daEYInqGB-5OELt9xL1XUO8WctdEzvdu-MV9FVASo0OezN3CChDzXDyFfdVmzWOQwUI3YQjZ1W9qO0fgaeqwX857mb7xhwLfaKblryiGKh8NIko0YWRKZCM6cl-HVugH5e6Xuu3M1waDi6D8VeHavDduSTMebTXbhlY_g8MFHZEszLlaoSlN2gGdNRRhCKnHe5b_5h53_RAL0bWt9AbJaj0h',
    rating: 5,
  },
  {
    id: '2',
    name: 'Rina Melati',
    role: 'Owner',
    company: 'Fashionista',
    content:
      'Toko online kami sekarang jauh lebih responsif. Konversi penjualan meningkat 30% sejak di-redesign oleh tim Pandxy.',
    avatar_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAb6Pdgvy43RRX48WZXTx4hnA5uAtppCwdv0RsoeslCH8Ex7L6w9tpp8z32-4ot_He4_LywF_Lp_m9ADY1abfqutcaHF-MPHeJRtOHy3uuC_eAbvWi8piS93msr9rkRgK8nTDk_Z36R1rbbhg1CSQI50rDDxW3pOcQ9umR1cF77vN8IJiNsJBQbE3H9E49kCns8whFQUe4CGUkYI2wILfpC3yYRSYThdN2vyAIj474jQZ6zVfRJkJwupfO3SQVaFI5zS8xnM5QjKwaE',
    rating: 5,
  },
  {
    id: '3',
    name: 'Ahmad Rizki',
    role: 'Founder',
    company: 'Kopi Nusantara',
    content:
      'Pandxy berhasil membuat website company profile untuk kedai kopi saya. Desainnya modern dan bikin kafe kami terlihat lebih premium!',
    avatar_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkm6U6z2OETGiPNvLdUeb-w3cfhlP4_zHu1rZjPE4IxJJ6m7zosA0gr4WNIIPF9xUhElRSSUDWdSoeNrWGrSDsaEy4-aNchkKnU3SOorkjiNb-CknGzLoRGftegE_QK0rLnh2yyxN5jgu0veYyvLQgiWm-toXzLEAnOqPNCnmp8rUGAcvJybyUcbNCdpZEWWdd-5HrtpH_JsFZ2AU6JnQ1Kn_7GlkwdkzpexuKNo9hoP0nteqV0tHSduw_4R4FBKz7l8zO_lWL_f5w',
    rating: 5,
  },
  {
    id: '4',
    name: 'Sari Dewi',
    role: 'Owner',
    company: 'Butik Syifa',
    content:
      'Toko online yang dibuat Pandxy sangat membantu bisnis fashion saya. Sekarang 70% orders datang dari website. Prosesnya cepat dan hasilnya memuaskan!',
    avatar_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYEnTQXHWd5cOoTUKNjtdzxa8ouoryOOjtx1EGkNqPrs7oKmsHICIONlqXQAvn0HVUv-Z6jkCzCX_fF5xlfLbTx-kVCkkJww0AmyqnyfW1xYzagymbhZBnb1isRiFu6lgTJJhyvZXnCs8iUauKX7YAzhqbpgN5ypTuT0lh9TYfGxgyXXDo3SXCZ-lYEPvJKWjT-hxuM1AopAe6xevLAFcn0pm9oipgq5yvR_iWOvIUxNb7-er3SXTyqt-mWYCa2snYetQkdy0pPxGI',
    rating: 5,
  },
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description:
      'Full-stack e-commerce solution with Next.js, Stripe integration, and Supabase backend.',
    language: 'TypeScript',
    stars: 42,
    color: 'bg-blue-400',
  },
  {
    id: '2',
    title: 'Task Management App',
    description:
      'A sleek task manager built with React, Framer Motion for animations, and local storage.',
    language: 'JavaScript',
    stars: 18,
    color: 'bg-yellow-400',
  },
  {
    id: '3',
    title: 'Portfolio Template',
    description:
      'Minimalist portfolio template for developers using Tailwind CSS and Vite.',
    language: 'TypeScript',
    stars: 156,
    color: 'bg-blue-400',
  },
]
