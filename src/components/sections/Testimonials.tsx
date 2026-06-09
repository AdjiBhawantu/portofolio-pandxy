"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal heading & subtitle
      gsap.utils.toArray<HTMLElement>(".testi-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      // Seamless marquee — GSAP infinite loop
      const setupMarquee = () => {
        const track = track1Ref.current;
        if (!track) return;

        const totalWidth = track.scrollWidth;

        // Set track2 tepat di sebelah kanan track1
        gsap.set(track2Ref.current, { x: totalWidth });

        // Animasi keduanya bersamaan ke kiri
        tweenRef.current = gsap.to([track1Ref.current, track2Ref.current], {
          x: `-=${totalWidth}`,
          duration: 30,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => {
              // Wrap: kalau sudah habis, reset ke 0
              return parseFloat(x) % totalWidth;
            }),
          },
        });
      };

      setupMarquee();
    }, sectionRef);

    // Pause on hover
    const container = sectionRef.current?.querySelector(".marquee-wrapper");
    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();
    container?.addEventListener("mouseenter", pause);
    container?.addEventListener("mouseleave", resume);

    return () => {
      ctx.revert();
      container?.removeEventListener("mouseenter", pause);
      container?.removeEventListener("mouseleave", resume);
    };
  }, []);

  const cards = (
    <>
      {testimonials.map((t, i) => (
        <div key={`${t.id}-${i}`} className="testimonial-card-glass p-8 w-[380px] md:w-[420px] shrink-0">
          <div className="quote-bg">&quot;</div>
          <div className="flex text-[#FFD700] mb-6 gap-0.5">
            {Array.from({ length: t.rating }).map((_, j) => (
              <span key={j} className="material-symbols-outlined fill-1 text-base">
                star
              </span>
            ))}
          </div>
          <p className="text-secondary italic mb-8 relative z-10 leading-relaxed text-sm">&quot;{t.content}&quot;</p>
          <div className="flex items-center gap-4 border-t border-white/5 pt-6">
            {t.avatar_url ? (
              <Image alt={t.name} className="w-12 h-12 rounded-full border border-white/10" src={t.avatar_url} width={48} height={48} />
            ) : (
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-secondary text-sm">{t.name.charAt(0)}</div>
            )}
            <div>
              <h4 className="font-headline-md text-base text-white">{t.name}</h4>
              <p className="font-label-mono text-xs text-secondary/60">
                {t.role}, {t.company}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <section ref={sectionRef} className="py-section-padding-y overflow-hidden" id="testimonials">
      <div className="max-w-container-max mx-auto px-gutter mb-16">
        <h2 className="font-headline-lg text-headline-lg text-on-surface text-center testi-reveal">Testimonials</h2>
        <p className="text-secondary text-center max-w-lg mx-auto mt-4 testi-reveal">Dengarkan apa kata mereka yang telah bekerjasama dengan saya dalam membangun produk digital berkualitas tinggi.</p>
      </div>

      {/* Wrapper dengan edge fade */}
      <div
        className="marquee-wrapper relative py-8"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}>
        {/* Dua track identik — GSAP wrap seamless */}
        <div className="flex" style={{ willChange: "transform" }}>
          <div ref={track1Ref} className="flex gap-6 absolute top-0 left-2">
            {cards}
          </div>
          <div ref={track2Ref} className="flex gap-6 absolute top-0 left-8">
            {cards}
          </div>
          {/* Spacer untuk tinggi container */}
          <div className="flex gap-6 opacity-0 pointer-events-none">{cards}</div>
        </div>
      </div>
    </section>
  );
}
