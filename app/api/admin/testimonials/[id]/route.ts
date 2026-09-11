import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const { name, role, company, username, content, avatar_url, rating, sort_order, is_active } = await req.json();

    await query(
      `UPDATE testimonials SET
        name = COALESCE(?, name),
        role = COALESCE(?, role),
        company = COALESCE(?, company),
        username = COALESCE(?, username),
        content = COALESCE(?, content),
        avatar_url = ?,
        rating = COALESCE(?, rating),
        sort_order = COALESCE(?, sort_order),
        is_active = COALESCE(?, is_active)
       WHERE id = ?`,
      [name, role, company, username, content, avatar_url, rating, sort_order, is_active, id]
    );

    return NextResponse.json({ success: true, message: 'Testimonial updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    await query('DELETE FROM testimonials WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Testimonial deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
