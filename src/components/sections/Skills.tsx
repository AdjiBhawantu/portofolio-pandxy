import { motion } from 'framer-motion'
import {
  Code2,
  Server,
  Wrench,
  Paintbrush,
} from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { skills } from '@/data/fallback'
import type { Skill } from '@/types'

const categoryConfig: Record<string, { icon: React.ElementType; label: string }> = {
  Frontend: { icon: Code2, label: 'Frontend' },
  Backend: { icon: Server, label: 'Backend' },
  Tools: { icon: Wrench, label: 'Tools' },
  Design: { icon: Paintbrush, label: 'Design' },
}

export default function Skills() {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <SectionWrapper id="skills">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          Tech Stack
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Teknologi yang saya kuasai untuk membangun produk digital
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(grouped).map(([category, items], catIndex) => {
          const config = categoryConfig[category] || { icon: Code2, label: category }
          const Icon = config.icon
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <Icon className="text-neutral-300" size={18} />
                </div>
                <h3 className="font-display text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                  {config.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 text-xs font-mono text-neutral-400 bg-white/5 rounded-lg border border-[rgba(255,255,255,0.06)]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
