'use server';
import { getKindeServerSession, requireUser } from '@/lib/auth';
export async function checkAuthStatus() { if (!(await getKindeServerSession().getUser())) return {success:false};await requireUser();return {success:true}; }
