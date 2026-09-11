import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const [[servicesCount]] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as count FROM services'),
    ]);
    const [[skillsCount]] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as count FROM skills'),
    ]);
    const [[projectsCount]] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as count FROM projects'),
    ]);
    const [[testimonialsCount]] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as count FROM testimonials'),
    ]);
    const [[messagesCount]] = await Promise.all([
      query<any[]>('SELECT COUNT(*) as count, SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) as unread FROM contact_messages'),
    ]);

    const recentMessages = await query<any[]>(
      'SELECT id, name, email, subject, message, is_read, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5'
    );

    const recentProjects = await query<any[]>(
      'SELECT id, title, language, stars, link FROM projects ORDER BY id DESC LIMIT 5'
    );

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          services: servicesCount?.count || 0,
          skills: skillsCount?.count || 0,
          projects: projectsCount?.count || 0,
          testimonials: testimonialsCount?.count || 0,
          totalMessages: messagesCount?.count || 0,
          unreadMessages: messagesCount?.unread || 0,
        },
        recentMessages: recentMessages || [],
        recentProjects: recentProjects || [],
      },
    });
  } catch (error: any) {
    console.error('Overview API error:', error);
    return NextResponse.json({ error: 'Failed to fetch overview data' }, { status: 500 });
  }
}
