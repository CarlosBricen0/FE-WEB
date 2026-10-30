import { getKindeServerSession as kindeSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { api } from './backend';
import type { Profile } from './types';
export function getKindeServerSession() {
  if (!process.env.KINDE_CLIENT_ID || !process.env.KINDE_ISSUER_URL) return {getUser:async()=>null,isAuthenticated:async()=>false,getAccessTokenRaw:async()=>null};
  return kindeSession();
}
export async function requireUser() { return api<Profile>('/v1/me'); }
export function isAdminUser(user: {isAdmin?: boolean} | null | undefined) { return user?.isAdmin === true; }
export async function requireAdmin() { return api<Profile>('/v1/admin/check'); }
