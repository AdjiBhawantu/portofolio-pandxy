import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  className?: string
  children: ReactNode
}

export default function SectionWrapper({ id, className = '', children }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`py-24 max-w-6xl mx-auto px-6 ${className}`}
    >
      {children}
    </motion.section>
  )
}
