import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import { signToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const admins = await query<any[]>(
      'SELECT id, username, email, password_hash, name FROM admins WHERE username = ? OR email = ? LIMIT 1',
      [username, username]
    );

    if (!admins || admins.length === 0) {
      return NextResponse.json(
        { error: 'Kredensial tidak valid' },
        { status: 401 }
      );
    }

    const admin = admins[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Kredensial tidak valid' },
        { status: 401 }
      );
    }

    const token = signToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      name: admin.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
