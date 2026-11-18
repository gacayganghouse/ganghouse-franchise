import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function GET(req: Request) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const cookieHeader = req.headers.get('cookie') || '';
  const token = cookieHeader.split(';').map(v => v.trim()).find(v => v.startsWith('gh_admin='))?.slice('gh_admin='.length);
  const expected = secret ? createHmac('sha256', secret).update('ganghouse-admin-session-v1').digest('hex') : '';
  if (!secret || !token || !safeEqual(decodeURIComponent(token), expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: 'Storage is not configured' }, { status: 503 });
  const r = await fetch(`${url}/rest/v1/franchise_enquiries?select=*&order=created_at.desc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: 'no-store',
  });
  if (!r.ok) return NextResponse.json({ error: 'Could not load enquiries' }, { status: 502 });
  return NextResponse.json(await r.json());
}
