"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  services as fallbackServices,
  skills as fallbackSkills,
  testimonials as fallbackTestimonials,
  portfolioItems as fallbackProjects,
} from "@/data/index";
import type { Service, Skill, Testimonial, PortfolioItem } from "@/types";

interface PortfolioContextType {
  settings: Record<string, string>;
  services: Service[];
  skills: Skill[];
  projects: PortfolioItem[];
  testimonials: Testimonial[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const defaultSettings: Record<string, string> = {
  hero_name: "ADJI BHAWANTU",
  hero_badge: "Full-Stack",
  hero_title_1: "Web & App",
  hero_title_2: "Developer Based",
  hero_title_3: "In Indonesia",
  hero_subtitle:
    "I help businesses grow through fast, secure, and high-performing websites and applications built with modern technology.",
  availability_status: "Available for Freelance & Full-time",
  about_title: "Building High-Impact Web & Mobile Systems",
  about_description_1:
    "I'm Adji Bhawantu — a developer who doesn't just write code, but builds products that are actually used. Every project starts with one question: what does the client truly need? The result isn't just a website — it's a digital solution that works.",
  about_description_2:
    "With experience across diverse project types, from business systems to modern web platforms, I ensure every product is not only functional but also intuitive and enjoyable for its users.",
  stat_experience_years: "3+",
  stat_projects_completed: "25+",
  stat_client_satisfaction: "99%",
  contact_email: "adjibhawantu@gmail.com",
  contact_whatsapp: "62895604169544",
  contact_phone: "+62 895 6041 69544",
  contact_location: "Lampung, Indonesia",
  social_github: "https://github.com/AdjiBhawantu",
  social_linkedin: "https://linkedin.com/in/adjibhawantu",
  social_instagram: "https://instagram.com/pandxy_",
};

const PortfolioContext = createContext<PortfolioContextType>({
  settings: defaultSettings,
  services: fallbackServices,
  skills: fallbackSkills,
  projects: fallbackProjects,
  testimonials: fallbackTestimonials,
  loading: false,
  refreshData: async () => {},
});

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [projects, setProjects] = useState<PortfolioItem[]>(fallbackProjects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/portfolio-data");
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          if (json.data.settings && Object.keys(json.data.settings).length > 0) {
            setSettings({ ...defaultSettings, ...json.data.settings });
          }
          if (Array.isArray(json.data.services) && json.data.services.length > 0) {
            setServices(json.data.services);
          }
          if (Array.isArray(json.data.skills) && json.data.skills.length > 0) {
            setSkills(json.data.skills);
          }
          if (Array.isArray(json.data.projects) && json.data.projects.length > 0) {
            setProjects(json.data.projects);
          }
          if (Array.isArray(json.data.testimonials) && json.data.testimonials.length > 0) {
            setTestimonials(json.data.testimonials);
          }
        }
      }
    } catch (err) {
      console.warn("Using fallback static portfolio data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        settings,
        services,
        skills,
        projects,
        testimonials,
        loading,
        refreshData: fetchData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData() {
  return useContext(PortfolioContext);
}
