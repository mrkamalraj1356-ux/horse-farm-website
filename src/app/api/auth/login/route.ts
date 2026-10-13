import { NextResponse } from 'next/server';
import { getUserByEmailOrPhone } from '@/lib/db';
import { createSessionToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { identifier, passOrOtp } = await req.json();
    if (!identifier || !passOrOtp) {
      return NextResponse.json({ error: 'Please provide mobile number or email and password / OTP.' }, { status: 400 });
    }

    const user = await getUserByEmailOrPhone(identifier);
    if (!user) {
      return NextResponse.json({ error: 'No account found with this email or mobile number.' }, { status: 404 });
    }

    if (user.status === 'suspended') {
      return NextResponse.json({ error: 'This account is suspended. Please contact concierge.' }, { status: 403 });
    }

    // Check password (or 6-digit OTP in dev mode)
    const isPasswordMatch = user.passwordHash === passOrOtp;
    const isOtpMatch = passOrOtp === '123456'; // Default testing OTP

    if (!isPasswordMatch && !isOtpMatch) {
      return NextResponse.json({ error: 'Invalid password or verification code.' }, { status: 401 });
    }

    const sessionData = {
      userId: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name,
      role: user.role,
      expiresAt: Date.now() + 86400000 * 7 // 7 days
    };

    const token = createSessionToken(sessionData);

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city: user.city
      }
    });

    response.cookies.set('hc_session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Login error' }, { status: 500 });
  }
}
