import { api } from '@/lib/backend';
import type { Plan } from '@/lib/types';
import PricingOptions from './PricingOptions';
export default async function Pricing() {
 let plans: Plan[];
 try { plans = await api<Plan[]>('/v1/plans','GET',undefined,false); }
 catch { return <section className="p-12 text-center"><h2 className="text-3xl font-bold">Membresía OnlyHorse</h2><p>Las membresías estarán disponibles cuando se conecte BE-Node.</p></section>; }
 return <section className="max-w-3xl mx-auto px-6 py-24"><h2 className="text-4xl font-bold text-center mb-4">Membresía OnlyHorse</h2><p className="text-center mb-8">Cobros en pesos chilenos mediante Mercado Pago.</p><PricingOptions plans={plans} /></section>;
}
