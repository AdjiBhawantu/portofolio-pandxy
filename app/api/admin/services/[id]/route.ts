import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const { slug, title, description, icon, sort_order, is_active } = await req.json();

    await query(
      `UPDATE services SET
        slug = COALESCE(?, slug),
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        icon = COALESCE(?, icon),
        sort_order = COALESCE(?, sort_order),
        is_active = COALESCE(?, is_active)
       WHERE id = ?`,
      [slug, title, description, icon, sort_order, is_active, id]
    );

    return NextResponse.json({ success: true, message: 'Service updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    await query('DELETE FROM services WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
