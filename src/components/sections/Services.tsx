import { motion } from 'framer-motion'
import {
  Building2,
  ShoppingCart,
  LayoutDashboard,
  MousePointerClick,
  Palette,
} from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { services } from '@/data/fallback'
import type { Service } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  Building2,
  ShoppingCart,
  LayoutDashboard,
  MousePointerClick,
  Palette,
}

export default function Services() {
  return (
    <SectionWrapper id="services">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          Layanan Saya
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Solusi digital yang saya tawarkan untuk mengembangkan bisnis Anda
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: Service, index: number) => {
          const Icon = iconMap[service.icon] || Building2
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                <Icon className="text-white" size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                {service.description}
              </p>
              <ul className="space-y-1.5">
                {service.features.map((f) => (
                  <li key={f} className="text-xs text-neutral-500 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
