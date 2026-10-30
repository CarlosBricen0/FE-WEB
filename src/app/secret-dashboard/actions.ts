'use server';
import { api } from '@/lib/backend';
import type { Product, Dashboard } from '@/lib/types';
export async function createPostAction(args: {text:string;mediaUrl?:string;mediaType?:'image'|'video';isPublic:boolean}) { return api<{success:boolean}>('/v1/admin/posts','POST',args); }
export async function getAllProductsAction() { return api<Product[]>('/v1/admin/products'); }
export async function addNewProductToStoreAction(args: {name:string;image:string;price:string}) { return api<{success:boolean;product:Product}>('/v1/admin/products','POST',args); }
export async function toggleProductArchiveAction(id: string) { return api<{success:boolean;product:Product}>(`/v1/admin/products/${encodeURIComponent(id)}/archive`,'POST'); }
export async function getDashboardData() { return api<Dashboard>('/v1/admin/analytics'); }
