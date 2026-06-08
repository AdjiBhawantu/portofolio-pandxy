'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    icon: 'schedule',
    value: '3+',
    label: 'Tahun Pengalaman',
    stagger: 'stagger-1',
  },
  {
    icon: 'rocket_launch',
    value: '25+',
    label: 'Project Selesai',
    stagger: 'stagger-2',
  },
  {
    icon: 'handshake',
    value: '20+',
    label: 'Klien Puas',
    stagger: 'stagger-3',
  },
]

export default function About() {
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
      className="px-gutter py-section-padding-y max-w-container-max mx-auto"
      id="about"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 reveal">
        <div className="md:col-span-7 card-bento p-8 md:p-12 flex flex-col justify-center">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            Tentang Saya
          </h2>
          <p className="text-secondary leading-relaxed mb-6">
            Saya seorang Full-Stack Developer yang bersemangat menciptakan
            pengalaman digital yang luar biasa. Dengan fokus pada kode yang
            bersih dan desain yang intuitif, saya membangun solusi web yang
            tidak hanya terlihat bagus tetapi juga memberikan hasil nyata bagi
            klien.
          </p>
          <p className="text-secondary leading-relaxed">
            Keahlian saya mencakup pengembangan frontend modern dengan
            React/Next.js dan backend tangguh dengan Node.js/Python, memastikan
            setiap proyek dioptimalkan untuk performa dan skalabilitas.
          </p>
        </div>

        <div className="md:col-span-5 grid grid-rows-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`card-bento p-6 flex items-center gap-6 reveal ${stat.stagger} active`}
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-on-surface">
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <div>
                <div className="font-headline-md text-headline-md text-on-surface">
                  {stat.value}
                </div>
                <div className="font-label-mono text-label-mono text-secondary">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
