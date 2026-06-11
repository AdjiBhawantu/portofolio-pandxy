'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'

const navLinks = [
  { label: 'Hero', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const navMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const indicator = indicatorRef.current
    const navMenu = navMenuRef.current
    if (!indicator || !navMenu) return

    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const links = document.querySelectorAll<HTMLAnchorElement>('.nav-link')

    function updateIndicator(link: HTMLAnchorElement | null) {
      if (!link) {
        gsap.to(indicator, { opacity: 0, duration: 0.3 })
        return
      }
      gsap.to(indicator, { opacity: 1, duration: 0.3 })

      const linkRect = link.getBoundingClientRect()
      const menuRect = navMenu!.getBoundingClientRect()

      const offsetLeft = linkRect.left - menuRect.left

      gsap.to(indicator, {
        width: linkRect.width,
        x: offsetLeft,
        duration: 0.3,
        ease: 'power2.out',
      })

      links.forEach((l) => {
        l.classList.remove('active', 'text-white')
        l.classList.add('text-neutral-400')
      })
      link.classList.add('active', 'text-white')
      link.classList.remove('text-neutral-400')
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          const activeLink = document.querySelector<HTMLAnchorElement>(
            `.nav-link[href="#${id}"]`
          )
          if (activeLink) updateIndicator(activeLink)
        }
      })
    }, observerOptions)

    sections.forEach((section) => observer.observe(section))

    const initialActive =
      document.querySelector<HTMLAnchorElement>('.nav-link.active') ||
      (navLinks.length > 0
        ? document.querySelector<HTMLAnchorElement>('.nav-link')
        : null)
    if (initialActive) {
      setTimeout(() => updateIndicator(initialActive), 100)
    }

    links.forEach((link) => {
      link.addEventListener('click', function () {
        updateIndicator(this)
      })
    })

    const handleResize = () => {
      const activeLink = document.querySelector<HTMLAnchorElement>(
        '.nav-link.active'
      )
      if (activeLink) updateIndicator(activeLink)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleClick = (href: string) => {
    setOpen(false)
    
    // Use Lenis for smooth scrolling if available
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.scrollTo(href, {
        offset: 0,
        duration: 1.2,
      })
    } else {
      // Fallback to native scrollIntoView
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 glass-nav"
    >
      <nav className="flex justify-between items-center h-16 px-gutter max-w-container-max mx-auto">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleClick('#hero')
          }}
          className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight hover:scale-95 transition-transform"
        >
          Pandxy
        </a>

        <div
          ref={navMenuRef}
          className="hidden md:flex gap-2 relative items-center"
          id="nav-menu"
        >
          <div ref={indicatorRef} className="nav-indicator" id="nav-indicator" />
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleClick(link.href)
              }}
              className="nav-link text-neutral-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            handleClick('#contact')
          }}
          className="hidden md:flex items-center self-center px-4 py-2 bg-white text-black font-button text-button rounded hover:-translate-y-0.5 transition-transform"
        >
          Let&apos;s Talk
        </a>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          onTouchEnd={(e) => {
            e.preventDefault()
            setOpen((prev) => !prev)
          }}
          className="md:hidden text-on-surface p-2 -mr-2 cursor-pointer z-50 relative touch-manipulation select-none"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 z-50 relative overflow-hidden"
          >
            <ul className="px-gutter py-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleClick(link.href)
                    }}
                    className="block text-sm text-neutral-400 hover:text-white py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick('#contact')
                  }}
                  className="block text-sm text-white bg-white/10 hover:bg-white/20 py-2 px-4 rounded-lg transition-colors mt-2"
                >
                  Let&apos;s Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
