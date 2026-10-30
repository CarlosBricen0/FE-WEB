'use server';
import prisma from '@/db/prisma';
import { getKindeServerSession, requireUser, isAdminUser } from '@/lib/auth';
import { hasAccess, validText, validMedia } from '@/lib/policy';
import { revalidatePath } from 'next/cache';
export async function getUserProfileAction() {
  if (!(await getKindeServerSession().getUser())) return null;
  const user = await requireUser();
  const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });
  return { id: user.id, name: user.name, email: user.email, image: user.image, isSubscribed: isAdminUser(user) || hasAccess(subscription) };
}
export async function updateUserProfileAction({ name, image }: { name: string; image: string }) {
  const user = await requireUser();
  await prisma.user.update({ where: { id: user.id }, data: { name: validText(name, 100), ...(image ? { image: validMedia(image) } : {}) } });
  revalidatePath('/');
  revalidatePath('/update-profile');
  return { success: true };
}
