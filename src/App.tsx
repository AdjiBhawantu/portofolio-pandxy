import { HelmetProvider } from 'react-helmet-async'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Skills from '@/components/sections/Skills'
import Portfolio from '@/components/sections/Portfolio'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/ui/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Skills />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  )
}

export default App
