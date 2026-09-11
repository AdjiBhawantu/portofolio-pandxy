import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const services = await query<any[]>('SELECT * FROM services ORDER BY sort_order ASC, id ASC');
    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    const { slug, title, description, icon, sort_order, is_active } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const result = await query<any>(
      'INSERT INTO services (slug, title, description, icon, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [generatedSlug, title, description, icon || 'web', sort_order || 0, is_active !== false ? 1 : 0]
    );

    return NextResponse.json({
      success: true,
      message: 'Service created successfully',
      serviceId: result.insertId,
    });
  } catch (error: any) {
    console.error('Create service error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
