import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const projects = await query<any[]>('SELECT * FROM projects ORDER BY sort_order ASC, id ASC');
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { title, description, language, stars, color, link, demo_url, image_url, sort_order, is_featured } = await req.json();

    if (!title || !description || !link) {
      return NextResponse.json({ error: 'Title, description, and link are required' }, { status: 400 });
    }

    const result = await query<any>(
      `INSERT INTO projects
       (title, description, language, stars, color, link, demo_url, image_url, sort_order, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        language || 'TypeScript',
        stars || 0,
        color || 'bg-blue-400',
        link,
        demo_url || null,
        image_url || null,
        sort_order || 0,
        is_featured !== false ? 1 : 0,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Project created successfully',
      projectId: result.insertId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
