'use client'

import { useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { usePortfolioData } from '@/context/PortfolioContext'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { settings } = usePortfolioData()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useScrollReveal(sectionRef)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Gagal mengirim pesan')

      setFeedback({
        text: 'Pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda.',
        type: 'success',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err: any) {
      setFeedback({ text: err.message || 'Terjadi kesalahan', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const whatsappNumber = settings.contact_whatsapp || '62895604169544'
  const githubUrl = settings.social_github || 'https://github.com/AdjiBhawantu'
  const instagramUrl = settings.social_instagram || 'https://instagram.com/pandxy_'

  return (
    <section ref={sectionRef} className="px-gutter py-section-padding-y max-w-container-max mx-auto" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal">
        <div className="reveal">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Let&apos;s Work Together</h2>
          <p className="text-secondary mb-8">Have a project idea or need help with your website? Don&apos;t hesitate to reach out.</p>

          {feedback && (
            <div
              className={`p-4 rounded-lg mb-6 text-sm border ${
                feedback.type === 'success'
                  ? 'border-whatsapp-green/40 bg-whatsapp-green/10 text-whatsapp-green'
                  : 'border-red-500/40 bg-red-500/10 text-red-400'
              }`}
            >
              {feedback.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-label-mono text-sm text-secondary mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                required
                className="w-full px-4 py-3 rounded-lg input-glass text-white focus:ring-1 focus:ring-white/40"
                id="name"
                placeholder="John Doe"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-label-mono text-sm text-secondary mb-2" htmlFor="email">
                Email
              </label>
              <input
                required
                className="w-full px-4 py-3 rounded-lg input-glass text-white focus:ring-1 focus:ring-white/40"
                id="email"
                placeholder="john@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-label-mono text-sm text-secondary mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg input-glass text-white focus:ring-1 focus:ring-white/40"
                id="subject"
                placeholder="Project Inquiry / Collaboration"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-label-mono text-sm text-secondary mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                required
                className="w-full px-4 py-3 rounded-lg input-glass text-white focus:ring-1 focus:ring-white/40"
                id="message"
                placeholder="Tell me about your project..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              disabled={loading}
              className="w-full py-4 bg-white text-black font-button text-button rounded-lg hover:bg-white/90 transition-colors font-bold disabled:opacity-50"
              type="submit"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="space-y-6 reveal">
          <div className="card-bento p-6 flex items-start gap-4 card-hover card-hover-103">
            <div className="w-12 h-12 rounded-full bg-whatsapp-green/10 flex items-center justify-center text-whatsapp-green shrink-0">
              <span className="material-symbols-outlined">chat</span>
            </div>
            <div>
              <h4 className="font-headline-md text-lg text-on-surface">Chat via WhatsApp</h4>
              <p className="text-secondary text-sm mb-2">Response within 24 hours</p>
              <a
                className="text-whatsapp-green hover:underline font-button text-sm"
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                Contact Now &rarr;
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              className="card-bento flex-1 p-6 flex flex-col items-center justify-center gap-3 group card-hover card-hover-103"
              target="_blank"
              rel="noreferrer"
              href={githubUrl}
            >
              <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-white">code</span>
              <span className="font-label-mono text-sm text-secondary group-hover:text-white">GitHub</span>
            </a>
            <a
              className="card-bento flex-1 p-6 flex flex-col items-center justify-center gap-3 group card-hover card-hover-103"
              target="_blank"
              rel="noreferrer"
              href={instagramUrl}
            >
              <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-white">photo_camera</span>
              <span className="font-label-mono text-sm text-secondary group-hover:text-white">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
