"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioItems } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

const staggerMap: Record<number, string> = {
  0: "stagger-1",
  1: "stagger-2",
  2: "stagger-3",
};

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-gutter py-section-padding-y max-w-container-max mx-auto" id="portfolio">
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-12 text-center reveal">Portfolio</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item, i) => (
          <div key={item.id} className={`card-bento p-6 flex flex-col h-full reveal ${staggerMap[i]} active card-hover card-hover-103`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline-md text-xl text-on-surface">{item.title}</h3>
              <a href={`${item.link}`} target="_blank" rel="noreferrer" className="text-secondary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-xl">open_in_new</span>
              </a>
            </div>
            <p className="text-secondary text-sm mb-6 flex-grow">{item.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="font-label-mono text-xs text-secondary">{item.language}</span>
              </div>
              <div className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="font-label-mono text-xs">{item.stars}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
