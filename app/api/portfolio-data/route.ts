import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { services as fallbackServices, skills as fallbackSkills, testimonials as fallbackTestimonials, portfolioItems as fallbackProjects } from '@/data/index';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Fetch site settings
    const settingsRows = await query<any[]>('SELECT setting_key, setting_value FROM site_settings');
    const settings: Record<string, string> = {};
    if (Array.isArray(settingsRows)) {
      settingsRows.forEach((row) => {
        settings[row.setting_key] = row.setting_value;
      });
    }

    // 2. Fetch services
    const services = await query<any[]>(
      'SELECT id, slug, title, description, icon, sort_order FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );

    // 3. Fetch skills
    const skills = await query<any[]>(
      'SELECT id, name, category, level, sort_order FROM skills ORDER BY sort_order ASC, id ASC'
    );

    // 4. Fetch projects
    const projects = await query<any[]>(
      'SELECT id, title, description, language, stars, color, link, demo_url, image_url, sort_order, is_featured FROM projects ORDER BY sort_order ASC, id ASC'
    );

    // 5. Fetch testimonials
    const testimonials = await query<any[]>(
      'SELECT id, name, role, company, username, content, avatar_url, rating, sort_order FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );

    return NextResponse.json({
      success: true,
      data: {
        settings,
        services: services && services.length > 0 ? services : fallbackServices,
        skills: skills && skills.length > 0 ? skills : fallbackSkills,
        projects: projects && projects.length > 0 ? projects : fallbackProjects,
        testimonials: testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials,
      },
    });
  } catch (error) {
    console.warn('Database query failed, returning fallback data:', error);
    return NextResponse.json({
      success: true,
      fallback: true,
      data: {
        settings: {},
        services: fallbackServices,
        skills: fallbackSkills,
        projects: fallbackProjects,
        testimonials: fallbackTestimonials,
      },
    });
  }
}
