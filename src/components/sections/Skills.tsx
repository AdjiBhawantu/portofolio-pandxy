"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/index";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { key: "Frontend" as const, icon: "code", title: "Frontend" },
  { key: "Backend" as const, icon: "dns", title: "Backend" },
  { key: "Tools" as const, icon: "build", title: "Tools" },
  { key: "Design" as const, icon: "brush", title: "Design" },
];

// Warna per bahasa/tech untuk language bar
const langColors: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#ffffff",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#38BDF8",
  "Framer Motion": "#BB4BFF",
  GSAP: "#88CE02",
  Lenis: "#a0a0a0",
  "Node.js": "#8CC84B",
  Express: "#c0c0c0",
  PHP: "#777BB4",
  MySQL: "#4479A1",
  Supabase: "#3ECF8E",
  PostgreSQL: "#336791",
  "Git & GitHub": "#F1502F",
  Vite: "#646CFF",
  Vercel: "#ffffff",
  "VS Code": "#007ACC",
  Postman: "#FF6C37",
  Figma: "#F24E1E",
  Spline: "#ff5cad",
  Framer: "#0055FF",
};

const staggerMap: Record<number, string> = {
  0: "stagger-1",
  1: "stagger-2",
  2: "stagger-3",
  3: "stagger-4",
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal cards
      gsap.utils.toArray<HTMLElement>(".skill-card").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      // Animate progress bars
      gsap.utils.toArray<HTMLElement>(".progress-fill").forEach((bar) => {
        const target = bar.dataset.level ?? "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${target}%`,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 92%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-gutter py-section-padding-y max-w-container-max mx-auto" id="skills">
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-12 text-center skill-card">Tech Stack</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => {
          const catSkills = skills.filter((s) => s.category === cat.key);
          return (
            <div key={cat.key} className={`skill-card card-bento p-6 ${staggerMap[i]} card-hover card-hover-103`}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-white/70">{cat.icon}</span>
                <h3 className="font-headline-md text-lg text-on-surface">{cat.title}</h3>
                <span className="ml-auto font-label-mono text-[10px] text-white/20">{catSkills.length} techs</span>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {catSkills.map((skill) => (
                  <span key={skill.name} className="px-3 py-1 font-label-mono text-xs bg-white/5 border border-white/10 rounded-lg text-secondary">
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/5 mb-4" />

              {/* Language proficiency bars */}
              <div className="flex flex-col gap-3">
                {catSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label-mono text-[11px] text-white/50">{skill.name}</span>
                      <span className="font-label-mono text-[11px] text-white/30">{skill.level}%</span>
                    </div>
                    <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="progress-fill h-full rounded-full"
                        data-level={skill.level}
                        style={{
                          width: "0%",
                          backgroundColor: langColors[skill.name] ?? "#ffffff",
                          boxShadow: `0 0 8px ${langColors[skill.name] ?? "#ffffff"}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Currently Learning row */}
      <div className="mt-8 card-bento p-6 reveal card-hover card-hover-102">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-white/40 text-sm">auto_awesome</span>
          <span className="font-label-mono text-xs text-white/30 uppercase tracking-widest">Currently Exploring</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Three.js", "Docker", "GraphQL", "React Native"].map((tech) => (
            <span key={tech} className="px-3 py-1 font-label-mono text-xs bg-white/[0.03] border border-white/[0.06] rounded-lg text-white/25">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
