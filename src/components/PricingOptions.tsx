'use client';
import { useState } from 'react';
import { Button } from 'components-front-end/creator/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'components-front-end/creator/ui/card';
import { startMembershipAction } from '@/app/billing/actions';
import { formatMoney } from '@/lib/money';
export default function PricingOptions({ plans }: { plans: { id: string; name: string; months: number; amount: number | null }[] }) {
  const [selected, setSelected] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const plan = plans[selected];
  return <div className="space-y-6"><div className="flex justify-center gap-3" role="group" aria-label="Frecuencia de membresía">{plans.map((item,index) => <Button key={item.id} variant={index === selected ? 'default' : 'outline'} aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.name}</Button>)}</div><Card><CardHeader><CardTitle>{plan.name}</CardTitle></CardHeader><CardContent className="space-y-5"><p className="text-3xl font-bold">{plan.amount ? `${formatMoney(plan.amount)} CLP` : 'Precio por confirmar'}</p><ul className="list-disc pl-5 space-y-2"><li>Publicaciones, imágenes y videos exclusivos.</li><li>Comentarios y favoritos de la comunidad.</li><li>Cancela la renovación desde tu cuenta; conserva el período pagado.</li></ul><Button disabled={pending || !plan.amount} onClick={async () => { setPending(true); setError(''); try { const result = await startMembershipAction(plan.id); window.location.assign(result.url); } catch (problem) { setError(problem instanceof Error ? problem.message : 'No se pudo iniciar el pago'); setPending(false); } }}>{pending ? 'Preparando pago…' : 'Suscribirme con Mercado Pago'}</Button>{error && <p role="alert" className="text-red-600">{error}</p>}</CardContent></Card></div>;
}
