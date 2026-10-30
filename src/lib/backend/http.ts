export class BackendError extends Error { constructor(public status: number, message: string) { super(message); } }
export async function requestBackend<T>(path: string, options: { method?: string; body?: unknown; token?: string; origin: string; fetcher?: typeof fetch }): Promise<T> {
  if (!path.startsWith('/v1/')) throw new Error('Invalid backend path');
  const origin = new URL(options.origin);
  if (origin.username || origin.password || !['http:','https:'].includes(origin.protocol) || origin.pathname !== '/') throw new Error('Invalid backend origin');
  if (process.env.NODE_ENV === 'production' && origin.protocol !== 'https:' && !['127.0.0.1','localhost'].includes(origin.hostname)) throw new Error('Backend requires HTTPS');
  let response: Response;
  try { response = await (options.fetcher || fetch)(new URL(path,origin), { method: options.method || 'GET', cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(30000), headers: { 'Content-Type': 'application/json', ...(options.token ? {Authorization: `Bearer ${options.token}`} : {}) }, ...(options.body !== undefined ? {body: JSON.stringify(options.body)} : {}) }); }
  catch { throw new BackendError(503,'El backend no está disponible. Revisa BE-Node.'); }
  if (!response.ok) throw new BackendError(response.status, response.status === 401 ? 'Tu sesión no autoriza la API. Inicia sesión nuevamente.' : response.status === 403 ? 'No tienes permisos para esta operación.' : 'No se pudo completar la operación en BE-Node.');
  return response.json() as Promise<T>;
}
