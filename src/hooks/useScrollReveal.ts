"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealOptions {
  selector?: string;
  headingSelector?: string;
  start?: string;
  y?: number;
  scale?: number;
  stagger?: number;
  headingY?: number;
  cardStagger?: number;
  cardY?: number;
  cardScale?: number;
  duration?: number;
  ease?: string;
}

export function useScrollReveal(
  sectionRef: React.RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = []
) {
  const {
    selector = ".reveal",
    headingSelector = "h2",
    start = "top 88%",
    y: baseY = 50,
    scale: baseScale = 0.96,
    stagger = 0.06,
    headingY = 60,
    cardStagger = 0.1,
    cardY = 40,
    cardScale = 0.95,
    duration = 0.8,
    ease = "power3.out",
  } = options;

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

      // Set initial hidden state
      if (headingEls.length) {
        gsap.set(headingEls, { autoAlpha: 0, y: headingY, scale: baseScale });
      }
      if (cardEls.length) {
        gsap.set(cardEls, { autoAlpha: 0, y: cardY, scale: cardScale });
      }
      if (otherEls.length) {
        gsap.set(otherEls, { autoAlpha: 0, y: baseY, scale: baseScale });
      }

      // Heading — one-shot, tidak scrub
      if (headingEls.length) {
        gsap.to(headingEls, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration,
          stagger: 0.12,
          ease,
          scrollTrigger: {
            trigger: section,
            start,
            // once: true agar tidak reverse saat scroll naik
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
          clearProps: "transform",
        });
      }

      // Cards — one-shot, stagger cascade
      if (cardEls.length) {
        gsap.to(cardEls, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration,
          stagger: cardStagger,
          ease,
          scrollTrigger: {
            trigger: section,
            start,
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
          clearProps: "transform",
        });
      }

      // Other elements — one-shot
      if (otherEls.length) {
        gsap.to(otherEls, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: section,
            start,
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
          clearProps: "transform",
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef, ...deps]);
}
