'use server';
import { api } from '@/lib/backend';
import type { Shipping } from '@/lib/types';
export async function createCheckoutSessionAction(args:{productId:string;size:string;requestKey:string;shipping:Shipping}) { return api<{url:string}>('/v1/orders/checkout','POST',args); }
