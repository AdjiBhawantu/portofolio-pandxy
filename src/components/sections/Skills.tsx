'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '@/data/index'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { key: 'Frontend' as const, icon: 'code', title: 'Frontend' },
  { key: 'Backend' as const, icon: 'dns', title: 'Backend' },
  { key: 'Tools' as const, icon: 'build', title: 'Tools' },
  { key: 'Design' as const, icon: 'brush', title: 'Design' },
]

const staggerMap: Record<number, string> = {
  0: 'stagger-1',
  1: 'stagger-2',
  2: 'stagger-3',
  3: 'stagger-4',
}

export default function Skills() {
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
      id="skills"
    >
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-12 text-center reveal">
        Tech Stack
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => {
          const catSkills = skills.filter((s) => s.category === cat.key)
          return (
            <div
              key={cat.key}
              className={`card-bento p-6 reveal ${staggerMap[i]} active`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-white/70">
                  {cat.icon}
                </span>
                <h3 className="font-headline-md text-lg text-on-surface">
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1 font-label-mono text-xs bg-white/5 border border-white/10 rounded-lg text-secondary"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
