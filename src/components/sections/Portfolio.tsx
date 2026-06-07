import { motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { useGithubRepos } from '@/hooks/useGithubRepos'

export default function Portfolio() {
  const username = import.meta.env.VITE_GITHUB_USERNAME
  const { projects, loading, error } = useGithubRepos(username)

  return (
    <SectionWrapper id="portfolio">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          Portfolio
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Project-project yang pernah saya kerjakan
        </p>
      </motion.div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 animate-pulse"
            >
              <div className="h-5 w-3/4 bg-white/5 rounded mb-3" />
              <div className="h-4 w-full bg-white/5 rounded mb-2" />
              <div className="h-4 w-2/3 bg-white/5 rounded mb-4" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-white/5 rounded" />
                <div className="h-6 w-16 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center text-neutral-500 py-12">
          <p>Gagal memuat portfolio: {error}</p>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="text-center text-neutral-500 py-12">
          <p>Belum ada project yang ditampilkan. Tambahkan VITE_GITHUB_USERNAME di .env.local</p>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="block bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-base font-semibold text-white group-hover:text-neutral-200 transition-colors">
                  {project.name}
                </h3>
                <ExternalLink size={14} className="text-neutral-600 group-hover:text-neutral-400 mt-1 shrink-0" />
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center gap-4">
                {project.language && (
                  <span className="text-xs text-neutral-500 font-mono">
                    {project.language}
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-neutral-500">
                  <Star size={12} />
                  {project.stars}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
