'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/index'

gsap.registerPlugin(ScrollTrigger)

const staggerMap: Record<number, string> = {
  0: 'stagger-1',
  1: 'stagger-2',
  2: 'stagger-3',
  3: 'stagger-4',
  4: 'stagger-5',
}

export default function Services() {
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
      id="services"
    >
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-12 text-center reveal">
        Layanan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.slice(0, 3).map((service, i) => (
          <div
            key={service.id}
            className={`card-bento p-8 reveal card-hover-103 ${staggerMap[i]}`}
          >
            <span className="material-symbols-outlined text-4xl text-white/70 mb-6 block">
              {service.icon}
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-3">
              {service.title}
            </h3>
            <p className="text-secondary text-sm">{service.description}</p>
          </div>
        ))}
        {services.slice(3).map((service, i) => (
          <div
            key={service.id}
            className={`card-bento p-8 reveal hover:scale-[1.03] transition-all duration-300 ease-out ${staggerMap[i + 3]} ${i === 0 ? 'md:col-span-2' : ''}`}
          >
            <span className="material-symbols-outlined text-4xl text-white/70 mb-6 block">
              {service.icon}
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface text-xl mb-3">
              {service.title}
            </h3>
            <p className="text-secondary text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
