import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const skills = await query<any[]>('SELECT * FROM skills ORDER BY category ASC, sort_order ASC, id ASC');
    return NextResponse.json({ success: true, skills });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { name, category, level, sort_order } = await req.json();

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 });
    }

    const result = await query<any>(
      'INSERT INTO skills (name, category, level, sort_order) VALUES (?, ?, ?, ?)',
      [name, category, Math.min(100, Math.max(1, parseInt(level || 80, 10))), sort_order || 0]
    );

    return NextResponse.json({
      success: true,
      message: 'Skill created successfully',
      skillId: result.insertId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
