"use client";

import { useRef } from "react";
import { testimonials as portfolioTestimonials } from "@/data/index";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePortfolioData } from "@/context/PortfolioContext";
import {
  TestimonialMarquee,
  type Testimonial,
} from "@/components/ui/testimonial-marquee";

const additionalTestimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    username: "sarahbuilds",
    role: "Product Lead, TechNova",
    text: "Pandxy is hands down the smoothest developer to collaborate with. Delivered pixel-perfect responsive design and zero jank out of the box.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Marcus Lee",
    username: "marcuscodes",
    role: "Founder, GrowthStack",
    text: "Shipped our new landing page in record time. The social proof and interactive sections alone converted way better than our previous setup.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Priya Nair",
    username: "priyadesigns",
    role: "Creative Director, Studio X",
    text: "Beautiful attention to detail, glassmorphism aesthetics, and the smooth hover interactions make the whole portfolio feel exceptionally premium.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Tom Alvarez",
    username: "toma",
    role: "Engineering Manager, CloudPulse",
    text: "Highly optimized bundle and flawless CSS marquee animation. Performance across mobile and desktop is buttery smooth.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Elena Rossi",
    username: "elenar",
    role: "Brand Strategist, Lumina",
    text: "Clean code structure, modern UI sensibilities, and top-tier responsiveness. Exceeded our expectations on every milestone.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "David Kim",
    username: "davidk",
    role: "Senior Frontend Architect",
    text: "The infinite scroll and hover pause mechanics work like a charm. Genuinely impressed with the engineering quality and aesthetic polish.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { testimonials: liveTestimonials } = usePortfolioData();

  useScrollReveal(sectionRef, {
    selector: ".testi-reveal",
    headingY: 80,
  });

  const sourceTestimonials = liveTestimonials && liveTestimonials.length > 0 ? liveTestimonials : portfolioTestimonials;

  // Combine client portfolio testimonials with curated industry feedback
  const clientTestimonials: Testimonial[] = sourceTestimonials.map((t: any) => ({
    name: t.name,
    text: t.content || t.text,
    avatar: t.avatar_url || t.avatar || "",
    role: `${t.role || ""}${t.company ? `, ${t.company}` : ""}`,
    username: t.username || (t.company ? t.company.toLowerCase().replace(/\s+/g, "") : ""),
    company: t.company,
    rating: t.rating || 5,
  }));

  const allTestimonials = [...clientTestimonials, ...additionalTestimonials];

  return (
    <section
      ref={sectionRef}
      className="py-section-padding-y overflow-hidden"
      id="testimonials"
    >
      <div className="max-w-container-max mx-auto px-gutter mb-12">
        <h2 className="font-headline-lg text-headline-lg text-on-surface text-center testi-reveal">
          Testimonials
        </h2>
        <p className="text-secondary text-center max-w-lg mx-auto mt-4 testi-reveal">
          Hear what clients and collaborators say about working with me to build high-quality digital products.
        </p>
      </div>

      <div
        className="relative py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <TestimonialMarquee items={allTestimonials} speed={32} />
      </div>
    </section>
  );
}
