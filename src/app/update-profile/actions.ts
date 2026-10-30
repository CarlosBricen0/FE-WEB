'use server';
import { api } from '@/lib/backend';
import { getKindeServerSession } from '@/lib/auth';
import type { Profile } from '@/lib/types';
import { revalidatePath } from 'next/cache';
export async function getUserProfileAction() { if (!(await getKindeServerSession().getUser())) return null;return api<Profile>('/v1/me'); }
export async function updateUserProfileAction(args:{name:string;image:string}) { const result=await api<{success:boolean}>('/v1/me','PATCH',args);revalidatePath('/');revalidatePath('/update-profile');return result; }
