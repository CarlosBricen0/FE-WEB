import { NextResponse } from 'next/server';
// GET links never create payment sessions: checkout is an authenticated Server Action.
export function GET(request: Request) {
  const plan = new URL(request.url).searchParams.get('plan');
  if (!['monthly','yearly'].includes(plan || '')) return NextResponse.json({ error: 'Plan inválido' }, { status: 400 });
  return NextResponse.redirect(new URL(`/pricing?plan=${plan}`, request.url));
}
