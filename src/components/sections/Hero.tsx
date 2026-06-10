"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const floatsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { opacity: 1 });
      gsap.set(["#hero h1", "#hero p", "#hero-buttons"], { autoAlpha: 0, y: 50 });
      gsap.set(imgRef.current, { autoAlpha: 0, y: 100 });
      gsap.set(".hero-float", { autoAlpha: 0, y: 30 });
      gsap.set(".fullstack-badge", { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        "#hero h1, #hero p, #hero-buttons",
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          clearProps: "opacity,visibility,y",
        },
      );

      tl.fromTo(
        imgRef.current,
        { y: 100, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.out",
          clearProps: "opacity,visibility,y",
        },
        "-=1",
      );

      tl.fromTo(
        ".hero-float",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "opacity,visibility,y",
        },
        "-=1.2",
      );

      tl.fromTo(
        ".fullstack-badge",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "opacity,visibility,y",
        },
        "-=0.8",
      );

      // Gradient animation tetap sama
      gsap.to(".fullstack-badge", {
        backgroundPosition: "200% 0",
        duration: 3,
        repeat: -1,
        ease: "none",
        backgroundImage: "linear-gradient(90deg, #fff, #60a5fa, #22d3ee, #fff)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      });

      // Mousemove parallax tetap sama
      const heroSection = sectionRef.current;
      if (heroSection) {
        heroSection.addEventListener("mousemove", (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 40;
          const y = (e.clientY / window.innerHeight - 0.5) * 40;
          gsap.to(".hero-float", {
            x: -x,
            y: -y,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[900px] w-full overflow-hidden flex items-center bg-[#0a0a0a]" id="hero">
      <div className="bg-marquee-container z-0">
        <div className="bg-marquee-content">
          <span className="hero-bg-text-marquee">ADJI BHAWANTU</span>
          <span className="hero-bg-text-marquee">ADJI BHAWANTU</span>
        </div>
      </div>

      <div className="circle-bg w-[500px] h-[500px] bg-white top-1/4 -left-24" />
      <div className="circle-bg w-[400px] h-[400px] bg-primary/20 bottom-1/4 -right-24" />

      <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter h-[900px]">
        <div ref={contentRef} className="absolute top-[20%] md:top-[28%] left-gutter z-30 max-w-2xl pointer-events-auto">
          <div className="flex flex-col gap-1">
            <h1 className="font-display-hero text-[3rem] md:text-[4.5rem] leading-[1.05] font-bold tracking-[-0.04em] text-white uppercase">Web &amp; App</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="font-display-hero text-[2.2rem] md:text-[3.5rem] leading-[1.05] font-bold tracking-[-0.04em] text-white uppercase">Developer Based</h1>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-element">
                <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 animate-pulse" />
                <span className="fullstack-badge font-label-mono text-[10px] md:text-xs text-white uppercase tracking-widest font-bold">Full-Stack</span>
              </div>
            </div>
            <h1 className="font-display-hero text-display-hero-mobile text-on-surface leading-[1.1] uppercase md:text-[3.5rem]">In Indonesia</h1>
          </div>

          <p className="font-body-md text-body-lg text-secondary max-w-md mt-6">I help businesses grow through fast, secure, and high-performing websites and applications built with modern technology.</p>

          <div id="hero-buttons" className="flex flex-wrap items-center gap-4 mt-8">
            <a className="px-8 py-4 bg-white text-black font-button rounded-full hover:-translate-y-1 transition-transform font-bold" href="#contact">
              Start a Project
            </a>
            <a className="px-8 py-4 border border-white/10 text-white font-button rounded-full hover:bg-white/5 hover:border-white/30 transition-colors font-bold" href="#portfolio">
              View Portfolio
            </a>
          </div>
        </div>

        <div ref={imgRef} className="absolute bottom-0 right-0 md:-right-10 w-full md:w-[65%] lg:w-[70%] h-full md:h-full top-0 md:top-10 z-20 pointer-events-none flex items-end">
          <Image
            alt="Adji Bhawantu Portrait"
            src="/PFP_ADJI.png"
            fill
            className="object-contain object-bottom opacity-90"
            style={{
              maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
            }}
          />
        </div>

        <div ref={floatsRef} className="absolute inset-0 z-30 pointer-events-none">
          <div className="hero-float absolute top-[18%] right-[10%] md:right-[35%] inline-flex items-center gap-2 px-4 py-2 rounded-full glass-element text-white pointer-events-auto shadow-2xl hover:-translate-y-1 transition-transform">
            <div className="w-2 h-2 rounded-full bg-whatsapp-green animate-pulse" />
            <span className="font-label-mono text-[10px] md:text-xs font-medium uppercase tracking-widest">Available for Freelance</span>
            <span className="material-symbols-outlined text-sm ml-1 text-white/70">terminal</span>
          </div>

          <div className="hero-float absolute top-[38%] right-gutter md:right-[5%] flex items-center gap-3 p-2 pr-5 rounded-full glass-element pointer-events-auto shadow-2xl hover:-translate-y-1 transition-transform">
            <div className="flex -space-x-3">
              <Image
                alt="C1"
                className="w-10 h-10 rounded-full border-2 border-surface"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDslN522ZIEE46ea2IZL2pPSycvuCTTBFSJOaWszmz9Djr_IL5I1TFbER171NYmTlO2rY_tooDi1UNslHNzBLYz9AWFB-U0zYBUYjw4-l8LSoc7GFQhZbn1FJ1RLutbX1qmFMBm9JFkt6tCKDvPkHVSRsUV_dlwVyoRSo7kY_OAymYkGdsD_X06YudDmjOwwvyByHpAjMMyxAERZJGnx7Ag2Xs9bMA0lNaMXqLcg2HX91uzeKgOZSZfpIOJigvh9jdleNv13qH4b9g"
                width={40}
                height={40}
              />
              <Image
                alt="C2"
                className="w-10 h-10 rounded-full border-2 border-surface"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEr__tc_s9PMDfPRKghnpZ4uj9CNLIIV-NkajbOnh_KuENvLd1kVoNIoIy8EsFKIYE98rUPj1m4qU76sZdy1kYKLjwtd2LxSHTcgCMVIjBHvIh9sHSUVH2ABDcah4R4r8G5OHIffvklCBNPCvhIboBAkA4_R81A8uyjatKUuEuJfgXQ2s98167OqajabqIn7Vxcy2JH6TjhVQhLZ4UPi9MvhfIbJFn0Mm7E6UkPVViBBp49MXWR0yumzhQa0N3Mhqu3FW-tvbPzgQJ"
                width={40}
                height={40}
              />
              <Image
                alt="C3"
                className="w-10 h-10 rounded-full border-2 border-surface"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALnD9XfdnqAIcChSD6blsLLS_r_xMT8_3V3HBqBcLwiA1QHpo5xeLYQqELzuOZsKxDCQkhQ2zmAJkjGRBHOURNBkTaEj4h9Y1_AB4HO33RCduh1FvwgP7Oeg6KdkC6Ykwk7R6x68JPoCncGFAjrV798-keSXhrt_R8KYe2giBNgCPvKvWS_MgkOEAinp0R4tP8MSBH9FDojma7ASs6n7BKUxKxTKdRDWQ4E14mrG1v9g0SxA3QX0uG2zZQKI39m1iWHvfNJmewK9nt"
                width={40}
                height={40}
              />
            </div>
            <span className="font-body-md text-xs text-white leading-tight font-bold">
              Happy
              <br />
              Clients
            </span>
          </div>

          <div ref={statsRef} className="absolute bottom-[12%] right-[5%] flex flex-col gap-4 pointer-events-auto">
            <div className="flex gap-4">
              <div className="w-[140px] p-4 rounded-2xl glass-element shadow-2xl hover:scale-105 transition-transform">
                <span className="font-headline-md text-2xl text-white font-bold block">100%</span>
                <span className="text-[10px] text-white/50 font-body-md uppercase tracking-widest">Clean Code</span>
              </div>
              <div className="w-[140px] p-4 rounded-2xl glass-element shadow-2xl hover:scale-105 transition-transform">
                <div className="flex justify-between">
                  <span className="font-headline-md text-2xl text-white font-bold">2+</span>
                  <span className="material-symbols-outlined text-white/50 text-sm">code</span>
                </div>
                <span className="text-[10px] text-white/50 font-body-md uppercase tracking-widest block mt-1">Years Exp.</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 max-w-[320px] justify-end">
              <span className="px-4 py-2 rounded-full glass-element text-[10px] text-white font-label-mono uppercase tracking-wider">Web Development</span>
              <span className="px-4 py-2 rounded-full glass-element text-[10px] text-white font-label-mono uppercase tracking-wider">Mobile App</span>
              <span className="px-4 py-2 rounded-full glass-element text-[10px] text-white font-label-mono uppercase tracking-wider">Backend API</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
