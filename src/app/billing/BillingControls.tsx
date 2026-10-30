'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'components-front-end/creator/ui/button';
import { cancelMembershipAction, refreshMembershipAction } from './actions';
export default function BillingControls({ canCancel }: { canCancel: boolean }) {
  const router = useRouter();
  const [pending,setPending] = useState(false);
  const [message,setMessage] = useState('');
  async function run(cancel: boolean) {
    if (cancel && !window.confirm('¿Cancelar los próximos cobros de tu membresía? Conservarás el acceso al período ya pagado.')) return;
    setPending(true); setMessage('');
    try { await (cancel ? cancelMembershipAction() : refreshMembershipAction()); setMessage(cancel ? 'Renovación cancelada.' : 'Estado actualizado.'); router.refresh(); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo actualizar la membresía'); }
    finally { setPending(false); }
  }
  return <div className="space-y-4"><div className="flex flex-wrap gap-3"><Button disabled={pending} onClick={() => run(false)}>Actualizar estado del pago</Button>{canCancel && <Button variant="outline" disabled={pending} onClick={() => run(true)}>Cancelar renovación</Button>}</div>{message && <p role="status">{message}</p>}</div>;
}
