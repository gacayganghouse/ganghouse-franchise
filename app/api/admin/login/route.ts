import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!expected || !secret) {
      return NextResponse.json({ error: 'Admin authentication is not configured.' }, { status: 503 });
    }
    if (typeof password !== 'string' || !safeEqual(password, expected)) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
    const token = createHmac('sha256', secret).update('ganghouse-admin-session-v1').digest('hex');
    const res = NextResponse.json({ ok: true });
    res.cookies.set('gh_admin', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8,
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
