"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealOptions {
  selector?: string;
  headingSelector?: string;
  start?: string;
  end?: string;
  scrub?: number;
  y?: number;
  scale?: number;
  stagger?: number;
  headingY?: number;
  cardStagger?: number;
  cardY?: number;
  cardScale?: number;
}

export function useScrollReveal(sectionRef: React.RefObject<HTMLElement | null>, options: ScrollRevealOptions = {}) {
  const { selector = ".reveal", headingSelector = "h2", start = "top 88%", end = "top 40%", scrub = 1.2, y: baseY = 60, scale: baseScale = 0.95, stagger = 0.05, headingY = 80, cardStagger = 0.08, cardY = 40, cardScale = 0.95 } = options;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const all = gsap.utils.toArray<HTMLElement>(selector, section) as HTMLElement[];
      if (!all.length) return;

      const headingEls: HTMLElement[] = [];
      const cardEls: HTMLElement[] = [];
      const otherEls: HTMLElement[] = [];

      const seen = new Set<HTMLElement>();

      for (const el of all) {
        if (seen.has(el)) continue;
        seen.add(el);

        if (el.matches(headingSelector)) {
          headingEls.push(el);
        } else if (el.matches(".card-bento, .skill-card, .testimonial-card-glass")) {
          cardEls.push(el);
        } else {
          otherEls.push(el);
        }
      }

      // Set initial state langsung di DOM sebelum animasi
      // autoAlpha = opacity + visibility sekaligus, mencegah FOUC
      gsap.set([...headingEls, ...cardEls, ...otherEls], {
        autoAlpha: 0,
        y: baseY,
        scale: baseScale,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start,
          end,
          scrub,
          invalidateOnRefresh: true,
        },
      });

      if (headingEls.length) {
        tl.fromTo(
          headingEls,
          { y: headingY, autoAlpha: 0, scale: baseScale },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
          },
          0,
        );
      }

      if (cardEls.length) {
        tl.fromTo(
          cardEls,
          { y: cardY, autoAlpha: 0, scale: cardScale, transformOrigin: "bottom center" },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            stagger: cardStagger,
            ease: "power2.out",
          },
          0,
        );
      }

      if (otherEls.length) {
        tl.fromTo(
          otherEls,
          { y: baseY, autoAlpha: 0, scale: baseScale },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            stagger,
            ease: "power2.out",
          },
          0,
        );
      }

      // Refresh setelah semua trigger terdaftar
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);
}
