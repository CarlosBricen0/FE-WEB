'use client';
import { useState } from 'react';
import { Product } from '@prisma/client';
import ZoomedImage from '@/components/ZoomedImage';
import { Button } from 'components-front-end/creator/ui/button';
import { Input } from 'components-front-end/creator/ui/input';
import { formatMoney } from '@/lib/money';
import { createCheckoutSessionAction } from './actions';
export default function ProductCheckout({ product }: { product: Product }) {
  const [size,setSize] = useState('M');
  const [requestKey] = useState(() => crypto.randomUUID());
  const [pending,setPending] = useState(false);
  const [error,setError] = useState('');
  return <div className="flex flex-col md:flex-row gap-6"><ZoomedImage imgSrc={product.image} /><form className="w-full space-y-4" onSubmit={async event => {
    event.preventDefault(); setPending(true); setError('');
    const data = new FormData(event.currentTarget);
    try { const result = await createCheckoutSessionAction({ productId: product.id, size, requestKey, shipping: { address: String(data.get('address')), city: String(data.get('city')), state: String(data.get('state')), postalCode: String(data.get('postalCode')) } }); window.location.assign(result.url); }
    catch (problem) { setError(problem instanceof Error ? problem.message : 'No se pudo iniciar el pago'); setPending(false); }
  }}><h1 className="text-3xl font-bold">{product.name}</h1><p>{formatMoney(product.price,product.currency)} {product.currency}</p><label className="block">Talla<select className="block rounded border p-2 bg-background" value={size} onChange={event => setSize(event.target.value)}>{['XS','S','M','L','XL','XXL'].map(item => <option key={item}>{item}</option>)}</select></label>{[['address','Dirección'],['city','Comuna o ciudad'],['state','Región'],['postalCode','Código postal']].map(([name,label]) => <label className="block" key={name}>{label}<Input name={name} required maxLength={name === 'address' ? 200 : 100} /></label>)}<p>Despacho dentro de Chile.</p><Button type="submit" disabled={pending || product.currency !== 'CLP'}>{pending ? 'Preparando pago…' : 'Pagar con Mercado Pago'}</Button>{error && <p role="alert" className="text-red-600">{error}</p>}</form></div>;
}
