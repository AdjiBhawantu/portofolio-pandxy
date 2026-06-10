'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const stats = [
  {
    icon: 'schedule',
    value: '2+',
    label: 'Years of Experience',
  },
  {
    icon: 'rocket_launch',
    value: '10+',
    label: 'Projects Done',
  },
  {
    icon: 'handshake',
    value: '10+',
    label: 'Happy Clients',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="px-gutter py-section-padding-y max-w-container-max mx-auto" id="about">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 reveal">
        <div className="md:col-span-7 card-bento p-8 md:p-12 flex flex-col justify-center card-hover card-hover-102">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">About Me</h2>
          <p className="text-secondary leading-relaxed mb-6">
            I&apos;m Adji Bhawantu — a developer who doesn&apos;t just write code, but builds products that are actually used. Every project starts with one question: what does the client truly need? The result isn&apos;t just a website — it&apos;s a digital solution that works.
          </p>
          <p className="text-secondary leading-relaxed">With experience across diverse project types, from business systems to modern web platforms, I ensure every product is not only functional but also intuitive and enjoyable for its users.</p>
        </div>

        <div className="md:col-span-5 grid grid-rows-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card-bento p-6 flex items-center gap-6 reveal card-hover card-hover-103">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-on-surface">
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <div>
                <div className="font-headline-md text-headline-md text-on-surface">{stat.value}</div>
                <div className="font-label-mono text-label-mono text-secondary">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
