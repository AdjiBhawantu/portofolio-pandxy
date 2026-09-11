import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    const { name, category, level, sort_order } = await req.json();

    await query(
      `UPDATE skills SET
        name = COALESCE(?, name),
        category = COALESCE(?, category),
        level = COALESCE(?, level),
        sort_order = COALESCE(?, sort_order)
       WHERE id = ?`,
      [name, category, level, sort_order, id]
    );

    return NextResponse.json({ success: true, message: 'Skill updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = await params;
    await query('DELETE FROM skills WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Skill deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
