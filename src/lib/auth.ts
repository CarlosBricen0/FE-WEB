import { getKindeServerSession as kindeSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/db/prisma';

export function getKindeServerSession() {
  if (!process.env.KINDE_CLIENT_ID || !process.env.KINDE_ISSUER_URL) {
    return { getUser: async () => null, isAuthenticated: async () => false };
  }
  return kindeSession();
}
export async function requireUser() {
  const user = await getKindeServerSession().getUser();
  if (!user?.id || !user.email) throw new Error('Unauthorized');
  return prisma.user.upsert({ where: { id: user.id }, update: { email: user.email.toLowerCase() }, create: {
    id: user.id, email: user.email.toLowerCase(),
    name: [user.given_name, user.family_name].filter(Boolean).join(' ') || 'Member', image: user.picture,
  }});
}
export function isAdminUser(user: { id?: string; email?: string | null } | null | undefined) {
  if (!user?.id) return false;
  if (process.env.ADMIN_USER_ID) return user.id === process.env.ADMIN_USER_ID;
  // Email fallback is restricted to local development; production requires immutable identity.
  return process.env.NODE_ENV !== 'production' && Boolean(user.email && process.env.ADMIN_EMAIL && user.email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase());
}
export async function requireAdmin() {
  const user = await requireUser();
  if (!isAdminUser(user)) throw new Error('Forbidden');
  return user;
}
