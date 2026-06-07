import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { testimonials } from '@/data/fallback'

export default function Testimonials() {
  return (
    <SectionWrapper id="testimonials">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          Testimonial
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Apa kata klien tentang project yang telah saya kerjakan
        </p>
      </motion.div>

      <div className="relative overflow-hidden">
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 w-[340px] sm:w-[380px] shrink-0"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-neutral-400 text-neutral-400" />
                ))}
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed mb-4 italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <div>
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="text-xs text-neutral-500">
                  {t.role} — {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
