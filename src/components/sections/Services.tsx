"use client";

import { useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePortfolioData } from "@/context/PortfolioContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { services, loading } = usePortfolioData();

  // Pass services.length sebagai dep agar GSAP re-init setelah data DB datang
  useScrollReveal(sectionRef, {}, [services.length]);

  // Juga refresh ScrollTrigger setelah data tersedia agar posisi trigger akurat
  useEffect(() => {
    if (!loading && services.length > 0) {
      // Kecil delay agar DOM sudah ter-render sebelum refresh
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [services.length, loading]);

  return (
    <section ref={sectionRef} className="px-gutter py-section-padding-y max-w-container-max mx-auto" id="services">
      <h2 className="font-headline-lg text-headline-lg text-on-surface text-center reveal">Services</h2>
      <p className="text-secondary text-center max-w-2xl mx-auto text-body-lg reveal mt-2 mb-12">Whether you need a storefront, a system, or a full web presence — I&apos;ve got you covered from design to deployment.</p>

      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service) => (
            <div key={service.id} className="card-bento p-8 reveal card-hover card-hover-103">
              <span className="material-symbols-outlined text-4xl text-white/70 mb-6 block">{service.icon}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-3">{service.title}</h3>
              <p className="text-secondary text-sm">{service.description}</p>
            </div>
          ))}
          {services.slice(3).map((service, i) => (
            <div key={service.id} className={`card-bento p-8 reveal card-hover card-hover-103 ${i === 0 ? "md:col-span-2" : ""}`}>
              <span className="material-symbols-outlined text-4xl text-white/70 mb-6 block">{service.icon}</span>
              <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-3">{service.title}</h3>
              <p className="text-secondary text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
