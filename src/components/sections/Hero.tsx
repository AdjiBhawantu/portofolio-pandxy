import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <>
      <Helmet>
        <title>Pandxy — Jasa Pembuatan Website & Aplikasi Profesional</title>
        <meta name="description" content="Pandxy menyediakan jasa pembuatan website dan aplikasi profesional untuk UMKM, Cafe, Instansi, dan Bisnis. Modern, cepat, dan sesuai kebutuhan Anda." />
        <meta property="og:title" content="Pandxy — Jasa Pembuatan Website & Aplikasi" />
        <meta property="og:description" content="Website dan aplikasi profesional untuk bisnis yang ingin tampil berbeda." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://pandxy.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto px-6 w-full relative z-10"
        >
          <div className="max-w-3xl">
            <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }} className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm text-neutral-400 font-medium">
                Available for work
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] text-white"
            >
              Wujudkan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                Website Impian
              </span>{' '}
              Bisnis Anda
            </motion.h1>

            <motion.p
              variants={itemVariants}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-xl leading-relaxed"
            >
              Saya membantu UMKM, Cafe, dan Instansi untuk memiliki website dan aplikasi 
              profesional yang modern, cepat, dan sesuai kebutuhan bisnis Anda.
            </motion.p>

            <motion.div variants={itemVariants} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }} className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition-all duration-200"
              >
                Mulai Project
                <ArrowRight size={18} />
              </a>
              <a
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[rgba(255,255,255,0.12)] text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-200"
              >
                Lihat Portfolio
              </a>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
            className="w-5 h-8 border-2 border-neutral-600 rounded-full flex justify-center"
          >
            <div className="w-1 h-2 bg-neutral-400 rounded-full mt-2" />
          </motion.div>
        </div>
      </section>
    </>
  )
}
