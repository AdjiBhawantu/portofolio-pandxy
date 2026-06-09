'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const stats = [
  {
    icon: 'schedule',
    value: '2+',
    label: 'Tahun Pengalaman',
  },
  {
    icon: 'rocket_launch',
    value: '10+',
    label: 'Project Selesai',
  },
  {
    icon: 'handshake',
    value: '10+',
    label: 'Klien Puas',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useScrollReveal(sectionRef)

  return (
    <section ref={sectionRef} className="px-gutter py-section-padding-y max-w-container-max mx-auto" id="about">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 reveal">
        <div className="md:col-span-7 card-bento p-8 md:p-12 flex flex-col justify-center card-hover card-hover-102">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Tentang Saya</h2>
          <p className="text-secondary leading-relaxed mb-6">
            Saya Adji Bhawantu, seorang Web & App Developer dengan fokus pada pembuatan produk digital yang performatif, skalabel, dan berdampak nyata bagi bisnis. Saya percaya bahwa teknologi yang baik seharusnya mempercepat pertumbuhan — bukan mempersulit operasional.
          </p>
          <p className="text-secondary leading-relaxed">Dengan keahlian di seluruh lapisan pengembangan, dari antarmuka yang intuitif hingga sistem backend yang solid, saya hadir sebagai mitra teknis yang tidak hanya mengeksekusi, tapi juga memahami tujuan bisnis di balik setiap project.</p>
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
