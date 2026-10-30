// Historical Stripe records are retained; Stripe checkout/webhooks are no longer active.
export function POST() { return Response.json({ error: 'Proveedor reemplazado por Mercado Pago' }, { status: 410 }); }
