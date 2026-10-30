'use server';
import { requireUser } from '@/lib/auth';
import { createProductCheckout, type Shipping } from '@/lib/payments/checkout';
export async function createCheckoutSessionAction(args: { productId: string; size: string; requestKey: string; shipping: Shipping }) {
  const user = await requireUser();
  return createProductCheckout(user, args);
}
