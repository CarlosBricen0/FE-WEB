import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest, context: { params: Promise<{ kindeAuth: string }> }) {
  if (!process.env.KINDE_CLIENT_ID || !process.env.KINDE_ISSUER_URL) return NextResponse.redirect(new URL('/setup', request.url));
  return handleAuth()(request, context);
}
