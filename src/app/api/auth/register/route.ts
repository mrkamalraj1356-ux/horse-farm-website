import { NextResponse } from 'next/server';
import { createUser, getUserByEmailOrPhone } from '@/lib/db';
import { createSessionToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, phone, city, role, password } = await req.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: 'Please provide full name, email, phone number, and password.' }, { status: 400 });
    }

    const existingUser = await getUserByEmailOrPhone(email) || await getUserByEmailOrPhone(phone);
    if (existingUser) {
      return NextResponse.json({ error: 'An account already exists with this email or mobile number.' }, { status: 409 });
    }

    const newUser = await createUser({
      name,
      email,
      phone,
      city: city || 'India',
      role: role === 'seller' ? 'seller' : 'customer',
      passwordHash: password
    });

    const sessionData = {
      userId: newUser.id,
      email: newUser.email,
      phone: newUser.phone,
      name: newUser.name,
      role: newUser.role,
      expiresAt: Date.now() + 86400000 * 7
    };

    const token = createSessionToken(sessionData);

    const response = NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        city: newUser.city
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
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 });
  }
}
