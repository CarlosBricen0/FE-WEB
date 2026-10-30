import { createHash } from 'node:crypto';
import prisma from '@/db/prisma';
export async function enforceLimit(scope: string, userId: string, maximum: number, windowMs: number, db = prisma) {
  const window = Math.floor(Date.now() / windowMs);
  const id = createHash('sha256').update(`${scope}:${userId}:${window}`).digest('hex');
  const record = await db.rateLimit.upsert({ where: { id }, create: { id, count: 1, expiresAt: new Date((window + 1) * windowMs) }, update: { count: { increment: 1 } } });
  if (record.count > maximum) throw new Error('Demasiadas solicitudes. Espera unos minutos e intenta nuevamente.');
}
