import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const required = ['name','email','timing','role','area','budget'];
    if (required.some((key) => !body[key] || typeof body[key] !== 'string')) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    const url = process.env.SUPABASE_URL; const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return NextResponse.json({ error: 'Submission storage is not configured yet.' }, { status: 503 });
    const response = await fetch(`${url}/rest/v1/franchise_enquiries`, { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ name: body.name, email: body.email, phone: body.phone || null, timing: body.timing, role: body.role, area: body.area, budget: body.budget, message: body.message || null, language: body.language || 'en' }), cache: 'no-store' });
    if (!response.ok) { const detail = await response.text(); console.error('Supabase insert failed:', detail); return NextResponse.json({ error: 'Could not save enquiry.' }, { status: 502 }); }
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
}
