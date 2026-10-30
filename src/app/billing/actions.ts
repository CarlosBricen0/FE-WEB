'use server';
import { api } from '@/lib/backend';
import { getKindeServerSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
export async function startMembershipAction(plan: string) {
  if (!(await getKindeServerSession().getUser())) return {url:'/api/auth/login'};
  return api<{url:string}>('/v1/billing/checkout','POST',{plan});
}
export async function cancelMembershipAction() { const result=await api<{success:boolean}>('/v1/billing/cancel','POST');revalidatePath('/billing');revalidatePath('/');return result; }
export async function refreshMembershipAction() { const result=await api<{success:boolean}>('/v1/billing/refresh','POST');revalidatePath('/billing');return result; }
