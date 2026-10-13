import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/db';
import { createSessionToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { role } = await req.json();
    const users = await getUsers();
    const targetUser = users.find((u) => u.role === role);

    if (!targetUser) {
      return NextResponse.json({ error: `No demo account for role ${role}` }, { status: 404 });
    }

    const sessionData = {
      userId: targetUser.id,
      email: targetUser.email,
      phone: targetUser.phone,
      name: targetUser.name,
      role: targetUser.role,
      expiresAt: Date.now() + 86400000 * 7
    };

    const token = createSessionToken(sessionData);

    const response = NextResponse.json({
      user: {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        phone: targetUser.phone,
        role: targetUser.role,
        city: targetUser.city
      }
    });

    response.cookies.set('hc_session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Demo login error' }, { status: 500 });
  }
}
