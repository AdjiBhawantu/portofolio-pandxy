'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '@/data/index'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-section-padding-y overflow-hidden"
      id="testimonials"
    >
      <div className="max-w-container-max mx-auto px-gutter mb-16">
        <h2 className="font-headline-lg text-headline-lg text-on-surface text-center reveal">
          Testimonials
        </h2>
        <p className="text-secondary text-center max-w-lg mx-auto mt-4 reveal stagger-1 active">
          Dengarkan apa kata mereka yang telah bekerjasama dengan saya dalam
          membangun produk digital berkualitas tinggi.
        </p>
      </div>

      <div className="marquee-container reveal stagger-2 active">
        <div className="marquee-content py-8">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="testimonial-card-glass p-8 w-[380px] md:w-[420px] shrink-0"
            >
              <div className="quote-bg">&quot;</div>
              <div className="flex text-[#FFD700] mb-6 gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span
                    key={j}
                    className="material-symbols-outlined fill-1 text-base"
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-secondary italic mb-8 relative z-10 leading-relaxed text-sm">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                {t.avatar_url ? (
                  <Image
                    alt={t.name}
                    className="w-12 h-12 rounded-full border border-white/10"
                    src={t.avatar_url}
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-secondary text-sm">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-headline-md text-base text-white">
                    {t.name}
                  </h4>
                  <p className="font-label-mono text-xs text-secondary/60">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
