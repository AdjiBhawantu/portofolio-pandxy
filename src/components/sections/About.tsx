import { motion } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'

const stats = [
  { value: '3+', label: 'Tahun Pengalaman' },
  { value: '25+', label: 'Project Selesai' },
  { value: '20+', label: 'Klien Puas' },
]

export default function About() {
  return (
    <SectionWrapper id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          Tentang Saya
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Mengenal lebih dekat siapa di balik Pandxy
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-neutral-300 leading-relaxed text-base sm:text-lg">
            Halo! Saya seorang <span className="text-white font-medium">Frontend Developer</span> yang 
            berfokus pada pembuatan website dan aplikasi web modern. Saya percaya bahwa setiap bisnis 
            berhak memiliki kehadiran digital yang profesional dan menarik.
          </p>
          <p className="text-neutral-400 leading-relaxed mt-4">
            Dengan pengalaman dalam berbagai teknologi seperti React, Next.js, dan TypeScript, 
            saya siap membantu mewujudkan website impian bisnis Anda — dari landing page sederhana 
            hingga aplikasi web yang kompleks.
          </p>
          <p className="text-neutral-400 leading-relaxed mt-4">
            Setiap project saya kerjakan dengan penuh perhatian terhadap detail, performa, dan 
            pengalaman pengguna. Karena bagi saya, website yang baik adalah yang membuat bisnis 
            Anda tumbuh.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 text-center"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
