import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import type { Project } from "@/types";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
];

function pickImage(name: string): string {
  const hash = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return HERO_IMAGES[hash % HERO_IMAGES.length];
}

function BentoCard({ project, className }: { project: Project; className?: string }) {
  return (
    <motion.a href={project.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`relative group overflow-hidden rounded-2xl bg-[#111] ${className ?? ""}`}>
      <img src={pickImage(project.name)} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[11px] text-white/80 font-mono bg-white/10 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg font-bold text-white">{project.name}</h3>
      </div>
    </motion.a>
  );
}

export default function Portfolio() {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  const { projects, loading, error } = useGithubRepos(username);
  const top = projects.slice(0, 5);

  return (
    <SectionWrapper id="portfolio">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Portfolio</h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">Project-project yang pernah saya kerjakan</p>
      </motion.div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`bg-[#111] border border-white/10 rounded-2xl animate-pulse ${i === 0 ? "md:col-span-2 md:row-span-2 min-h-[420px]" : "md:col-span-2 min-h-[200px]"}`} />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1 — Featured large */}
          {top[0] && <BentoCard project={top[0]} className="md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[420px]" />}

          {/* Card 2 — Right top */}
          {top[1] && <BentoCard project={top[1]} className="md:col-span-2 min-h-[200px]" />}

          {/* Card 3 — Right bottom */}
          {top[2] && <BentoCard project={top[2]} className="md:col-span-2 min-h-[200px]" />}

          {/* Card 4 — Bottom left */}
          {top[3] && <BentoCard project={top[3]} className="md:col-span-2 min-h-[200px]" />}

          {/* Card 5 — Bottom right */}
          {top[4] && <BentoCard project={top[4]} className="md:col-span-2 min-h-[200px]" />}
        </div>
      )}
    </SectionWrapper>
  );
}
