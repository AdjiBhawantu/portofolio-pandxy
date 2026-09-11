import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const { title, description, language, stars, color, link, demo_url, image_url, sort_order, is_featured } = await req.json();

    await query(
      `UPDATE projects SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        language = COALESCE(?, language),
        stars = COALESCE(?, stars),
        color = COALESCE(?, color),
        link = COALESCE(?, link),
        demo_url = ?,
        image_url = ?,
        sort_order = COALESCE(?, sort_order),
        is_featured = COALESCE(?, is_featured)
       WHERE id = ?`,
      [title, description, language, stars, color, link, demo_url, image_url, sort_order, is_featured, id]
    );

    return NextResponse.json({ success: true, message: 'Project updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    await query('DELETE FROM projects WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
