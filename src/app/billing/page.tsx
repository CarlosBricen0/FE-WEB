import { getKindeServerSession, requireUser } from '@/lib/auth';
import prisma from '@/db/prisma';
import { redirect } from 'next/navigation';
import BaseLayout from '@/components/BaseLayout';
import { formatMoney } from '@/lib/money';
import { hasAccess } from '@/lib/policy';
import BillingControls from './BillingControls';
import Link from 'next/link';
export default async function Billing() {
  if (!(await getKindeServerSession().isAuthenticated())) redirect('/');
  const user = await requireUser();
  const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });
  return <BaseLayout renderRightPanel={false}><section className="p-6 md:p-10 space-y-5"><h1 className="text-3xl font-bold">Mi membresía</h1><p>Los pagos y las renovaciones se gestionan con Mercado Pago.</p>{subscription ? <><p>Estado: {subscription.status}</p><p>Valor: {formatMoney(subscription.price, subscription.currency)} {subscription.currency}</p><p>{hasAccess(subscription) ? `Acceso pagado hasta ${subscription.endDate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' })}.` : 'Sin un período pagado vigente. Autorizar una suscripción no confirma el pago.'}</p></> : <p>Aún no hay una membresía confirmada. Si acabas de pagar, actualiza el estado.</p>}<BillingControls canCancel={Boolean(subscription?.providerSubscriptionId && ['authorized','pending','paused'].includes(subscription.status))} /><Link href="/pricing" className="text-primary underline">Ver membresías</Link></section></BaseLayout>;
}
