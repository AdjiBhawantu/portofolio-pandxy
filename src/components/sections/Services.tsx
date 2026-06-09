'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { services } from '@/data/index'

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useScrollReveal(sectionRef)

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
        {services.slice(0, 3).map((service) => (
          <div
            key={service.id}
            className="card-bento p-8 reveal card-hover card-hover-103"
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
            className={`card-bento p-8 reveal card-hover card-hover-103 ${i === 0 ? 'md:col-span-2' : ''}`}
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
