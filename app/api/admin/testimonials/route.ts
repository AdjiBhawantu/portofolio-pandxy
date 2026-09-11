import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const testimonials = await query<any[]>('SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC');
    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { name, role, company, username, content, avatar_url, rating, sort_order, is_active } = await req.json();

    if (!name || !content) {
      return NextResponse.json({ error: 'Name and content are required' }, { status: 400 });
    }

    const result = await query<any>(
      `INSERT INTO testimonials
       (name, role, company, username, content, avatar_url, rating, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        role || 'Client',
        company || '',
        username || '',
        content,
        avatar_url || null,
        rating ? parseInt(rating, 10) : 5,
        sort_order || 0,
        is_active !== false ? 1 : 0,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Testimonial created successfully',
      testimonialId: result.insertId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
