"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-gutter py-section-padding-y max-w-container-max mx-auto" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal">
        <div className="reveal stagger-1 active">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Let&apos;s Work Together</h2>
          <p className="text-secondary mb-8">Punya ide proyek atau butuh bantuan dengan website Anda? Jangan ragu untuk menghubungi saya.</p>

          <form action="#" className="space-y-4" method="POST">
            <div>
              <label className="block font-label-mono text-sm text-secondary mb-2" htmlFor="name">
                Nama Lengkap
              </label>
              <input className="w-full px-4 py-3 rounded-lg input-glass text-white focus:ring-1 focus:ring-white/40" id="name" placeholder="John Doe" type="text" />
            </div>
            <div>
              <label className="block font-label-mono text-sm text-secondary mb-2" htmlFor="email">
                Email
              </label>
              <input className="w-full px-4 py-3 rounded-lg input-glass text-white focus:ring-1 focus:ring-white/40" id="email" placeholder="john@example.com" type="email" />
            </div>
            <div>
              <label className="block font-label-mono text-sm text-secondary mb-2" htmlFor="message">
                Pesan
              </label>
              <textarea className="w-full px-4 py-3 rounded-lg input-glass text-white focus:ring-1 focus:ring-white/40" id="message" placeholder="Ceritakan tentang proyek Anda..." rows={4} />
            </div>
            <button className="w-full py-4 bg-white text-black font-button text-button rounded-lg hover:bg-white/90 transition-colors" type="submit">
              Kirim Pesan
            </button>
          </form>
        </div>

        <div className="space-y-6 reveal stagger-2 active">
          <div className="card-bento p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-whatsapp-green/10 flex items-center justify-center text-whatsapp-green shrink-0">
              <span className="material-symbols-outlined">chat</span>
            </div>
            <div>
              <h4 className="font-headline-md text-lg text-on-surface">Chat via WhatsApp</h4>
              <p className="text-secondary text-sm mb-2">Respon cepat 1x24 jam</p>
              <a className="text-whatsapp-green hover:underline font-button text-sm" href="https://wa.me/1234567890">
                Hubungi Sekarang &rarr;
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <a className="card-bento flex-1 p-6 flex flex-col items-center justify-center gap-3 group" target="_blank" rel="noreferrer" href="https://github.com/AdjiBhawantu">
              <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-white">code</span>
              <span className="font-label-mono text-sm text-secondary group-hover:text-white">GitHub</span>
            </a>
            <a className="card-bento flex-1 p-6 flex flex-col items-center justify-center gap-3 group" target="_blank" rel="noreferrer" href="https://instagram.com/pandxy.ocs">
              <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-white">photo_camera</span>
              <span className="font-label-mono text-sm text-secondary group-hover:text-white">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
