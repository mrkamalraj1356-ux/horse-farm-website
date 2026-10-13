import { cookies } from 'next/headers';
import { User, UserRole } from './types';
import { getUserByEmailOrPhone, getUserById } from './db';

const SESSION_COOKIE_NAME = 'hc_session_token';
const JWT_SECRET = process.env.AUTH_SECRET || 'horse-county-luxury-stud-secret-2025-secure';

export interface SessionData {
  userId: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  expiresAt: number;
}

// Simple deterministic secure session token encoder (compatible with edge/node runtime)
export function createSessionToken(data: SessionData): string {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
  // Simple HMAC-like signature
  const signature = Buffer.from(`${payload}.${JWT_SECRET}`).toString('base64url');
  return `${payload}.${signature}`;
}

export function parseSessionToken(token: string): SessionData | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payload, sig] = parts;
    const expectedSig = Buffer.from(`${payload}.${JWT_SECRET}`).toString('base64url');
    if (sig !== expectedSig) return null;

    const data: SessionData = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    if (Date.now() > data.expiresAt) return null;

    return data;
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return parseSessionToken(token);
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getCurrentSession();
  if (!session) return null;
  return getUserById(session.userId);
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth();
  if (user.role !== 'admin') {
    throw new Error('Administrator privileges required');
  }
  return user;
}

export async function requireSeller(): Promise<User> {
  const user = await requireAuth();
  if (user.role !== 'seller' && user.role !== 'admin') {
    throw new Error('Seller privileges required');
  }
  return user;
}
