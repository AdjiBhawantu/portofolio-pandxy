import type { Service, Skill, Testimonial, PortfolioItem } from "@/types";

export const services: Service[] = [
  {
    id: "company-profile",
    title: "Company Profile",
    description: "A professional website that elevates your brand credibility and turns visitors into potential clients.",
    icon: "business",
    features: [],
  },
  {
    id: "toko-online",
    title: "Online Store",
    description: "A secure, conversion-ready e-commerce platform built to maximize your sales and scale with your business.",
    icon: "storefront",
    features: [],
  },
  {
    id: "web-app",
    title: "Web Application",
    description: "Custom web systems that digitize and automate your business operations — built for real workflows, not just demos.",
    icon: "web",
    features: [],
  },
  {
    id: "landing-page",
    title: "Landing Page",
    description: "High-converting pages engineered for marketing campaigns and product launches that drive measurable results.",
    icon: "flight_takeoff",
    features: [],
  },
  {
    id: "pos-system",
    title: "POS System",
    description: "An integrated point-of-sale and inventory management system that keeps your transactions recorded and your business running in real-time.",
    icon: "point_of_sale",
    features: [],
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "Boostrap", category: "Frontend", level: 95 },
  { name: "React", category: "Frontend", level: 90 },
  { name: "Next.js", category: "Frontend", level: 85 },
  { name: "TypeScript", category: "Frontend", level: 88 },
  { name: "Tailwind CSS", category: "Frontend", level: 95 },
  { name: "Framer Motion", category: "Frontend", level: 80 },
  { name: "GSAP", category: "Frontend", level: 75 },
  { name: "Lenis", category: "Frontend", level: 78 },

  // Backend
  { name: "Node.js", category: "Backend", level: 82 },
  { name: "Express", category: "Backend", level: 80 },
  { name: "PHP", category: "Backend", level: 92 },
  { name: "Laravel", category: "Backend", level: 90 },
  { name: "MySQL", category: "Backend", level: 88 },
  { name: "Supabase", category: "Backend", level: 78 },
  { name: "PostgreSQL", category: "Backend", level: 75 },

  // Tools
  { name: "Git & GitHub", category: "Tools", level: 90 },
  { name: "Vite", category: "Tools", level: 88 },
  { name: "Vercel", category: "Tools", level: 85 },
  { name: "VS Code", category: "Tools", level: 95 },
  { name: "Postman", category: "Tools", level: 80 },

  // Design
  { name: "Figma", category: "Design", level: 85 },
  { name: "Spline", category: "Design", level: 70 },
  { name: "Framer", category: "Design", level: 72 },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Budi Santoso",
    role: "CEO",
    company: "Tech Indo",
    content: "Pandxy delivered outstanding results. Our company profile website looks incredibly professional and the turnaround was impressively fast.",
    avatar_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_I6A1_5O0GbVFx48YcD2Km_cJf9fhALVglAP1r5dNQcOAWduIUQK4daEYInqGB-5OELt9xL1XUO8WctdEzvdu-MV9FVASo0OezN3CChDzXDyFfdVmzWOQwUI3YQjZ1W9qO0fgaeqwX857mb7xhwLfaKblryiGKh8NIko0YWRKZCM6cl-HVugH5e6Xuu3M1waDi6D8VeHavDduSTMebTXbhlY_g8MFHZEszLlaoSlN2gGdNRRhCKnHe5b_5h53_RAL0bWt9AbJaj0h",
    rating: 5,
  },
  {
    id: "2",
    name: "Rina Melati",
    role: "Owner",
    company: "Fashionista",
    content: "Our online store is now much more responsive. Sales conversion increased by 30% since Pandxy redesigned it.",
    avatar_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAb6Pdgvy43RRX48WZXTx4hnA5uAtppCwdv0RsoeslCH8Ex7L6w9tpp8z32-4ot_He4_LywF_Lp_m9ADY1abfqutcaHF-MPHeJRtOHy3uuC_eAbvWi8piS93msr9rkRgK8nTDk_Z36R1rbbhg1CSQI50rDDxW3pOcQ9umR1cF77vN8IJiNsJBQbE3H9E49kCns8whFQUe4CGUkYI2wILfpC3yYRSYThdN2vyAIj474jQZ6zVfRJkJwupfO3SQVaFI5zS8xnM5QjKwaE",
    rating: 5,
  },
  {
    id: "3",
    name: "Ahmad Rizki",
    role: "Founder",
    company: "Kopi Nusantara",
    content: "Pandxy created a stunning company profile website for my coffee shop. The modern design makes our cafe look truly premium!",
    avatar_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkm6U6z2OETGiPNvLdUeb-w3cfhlP4_zHu1rZjPE4IxJJ6m7zosA0gr4WNIIPF9xUhElRSSUDWdSoeNrWGrSDsaEy4-aNchkKnU3SOorkjiNb-CknGzLoRGftegE_QK0rLnh2yyxN5jgu0veYyvLQgiWm-toXzLEAnOqPNCnmp8rUGAcvJybyUcbNCdpZEWWdd-5HrtpH_JsFZ2AU6JnQ1Kn_7GlkwdkzpexuKNo9hoP0nteqV0tHSduw_4R4FBKz7l8zO_lWL_f5w",
    rating: 5,
  },
  {
    id: "4",
    name: "Sari Dewi",
    role: "Owner",
    company: "Butik Syifa",
    content: "The online store Pandxy built has been a game-changer for my fashion business. Now 70% of orders come through the website. Fast delivery and exceptional results!",
    avatar_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYEnTQXHWd5cOoTUKNjtdzxa8ouoryOOjtx1EGkNqPrs7oKmsHICIONlqXQAvn0HVUv-Z6jkCzCX_fF5xlfLbTx-kVCkkJww0AmyqnyfW1xYzagymbhZBnb1isRiFu6lgTJJhyvZXnCs8iUauKX7YAzhqbpgN5ypTuT0lh9TYfGxgyXXDo3SXCZ-lYEPvJKWjT-hxuM1AopAe6xevLAFcn0pm9oipgq5yvR_iWOvIUxNb7-er3SXTyqt-mWYCa2snYetQkdy0pPxGI",
    rating: 5,
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "portofolio-pandxy",
    description: "A personal portfolio built from scratch with TypeScript and a modern architecture — showcasing UI/UX capability, high performance, and design precision down to the last pixel.",
    language: "TypeScript",
    stars: 0,
    color: "bg-blue-400",
    link: "https://github.com/AdjiBhawantu/portofolio-pandxy",
  },
  {
    id: "2",
    title: "jalungwangi-POS",
    description: "A web-based Point of Sale system built for local small businesses — handling transactions, inventory, and sales reports in one clean, responsive dashboard.",
    language: "Blade / PHP",
    stars: 1,
    color: "bg-red-400",
    link: "https://github.com/AdjiBhawantu/jalungwangi-POS",
  },
  {
    id: "3",
    title: "sekolah-muhammadiyah",
    description: "An official school website built with PHP — covering institutional profile, academic information, and announcements that non-technical admins can manage with ease.",
    language: "PHP",
    stars: 0,
    color: "bg-purple-400",
    link: "https://smamdabdl.sch.id",
  },
  {
    id: "4",
    title: "javatech",
    description: "A dedicated POS system for Javatech Sablon — managing print order transactions, production records, and sales summaries in one streamlined, easy-to-operate system.",
    language: "PHP",
    stars: 0,
    color: "bg-indigo-400",
    link: "https://github.com/AdjiBhawantu/javatech",
  },
  {
    id: "5",
    title: "kasirpintar",
    description: "A lightweight and intuitive Android cashier app for small retailers — real-time transaction logging, sales history, and an interface ready to use without any training.",
    language: "Java",
    stars: 0,
    color: "bg-orange-400",
    link: "https://github.com/AdjiBhawantu/kasirpintar",
  },
  {
    id: "6",
    title: "perpustakaan",
    description: "A digital library management system that simplifies book cataloging, borrowing, and returns — a practical solution for institutions ready to go digital without the complexity.",
    language: "CSS / Web",
    stars: 0,
    color: "bg-teal-400",
    link: "https://github.com/AdjiBhawantu/perpustakaan",
  },
  {
    id: "7",
    title: "radio-darmajaya",
    description: "A streaming landing page for Darmajaya campus radio — modern design in pure HTML, lightweight, and accessible on any device without heavy dependencies.",
    language: "HTML",
    stars: 0,
    color: "bg-yellow-400",
    link: "https://radio.darmajaya.ac.id",
  },
  {
    id: "8",
    title: "pi-apps-tekindomall",
    description: "A Pi Network-based payment gateway for a local e-commerce platform — exploring blockchain integration and next-generation payment technology in Indonesia's digital ecosystem.",
    language: "TypeScript",
    stars: 0,
    color: "bg-blue-400",
    link: "https://github.com/AdjiBhawantu/pi-apps-tekindomall",
  },
  {
    id: "9",
    title: "Sari-Budaya",
    description: "A local cultural heritage website built with SCSS — presenting the richness of regional arts and traditions through a modern, elegant, and easily explorable interface.",
    language: "SCSS",
    stars: 0,
    color: "bg-amber-400",
    link: "https://saribudaya.org",
  },
];
