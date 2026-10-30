import { plans } from '@/lib/payments/config';
import PricingOptions from './PricingOptions';
export default function Pricing() { return <section className="max-w-3xl mx-auto px-6 py-24"><h2 className="text-4xl font-bold text-center mb-4">Membresía OnlyHorse</h2><p className="text-center text-muted-foreground mb-8">Contenido exclusivo y comunidad. Cobros en pesos chilenos mediante Mercado Pago.</p><PricingOptions plans={plans()} /></section>; }
