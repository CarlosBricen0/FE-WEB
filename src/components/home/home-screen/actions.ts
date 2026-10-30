'use server';
import { api } from '@/lib/backend';
import type { FeedPost } from '@/lib/types';
import { revalidatePath } from 'next/cache';
export async function getPostsAction() { return api<FeedPost[]>('/v1/feed'); }
export async function deletePostAction(id: string) { const result=await api<{success:boolean}>(`/v1/posts/${encodeURIComponent(id)}`,'DELETE'); revalidatePath('/'); return result; }
export async function likePostAction(id: string) { return api<{success:boolean}>(`/v1/posts/${encodeURIComponent(id)}/likes`,'POST'); }
export async function commentOnPostAction(id: string,text: string) { return api<{success:boolean}>(`/v1/posts/${encodeURIComponent(id)}/comments`,'POST',{text}); }
