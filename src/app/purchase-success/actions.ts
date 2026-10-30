'use server';
import { api } from '@/lib/backend';
import type { OrderSummary } from '@/lib/types';
export async function checkProductPaidStatus(id:string) { return api<OrderSummary | false>(`/v1/orders/${encodeURIComponent(id)}`); }
