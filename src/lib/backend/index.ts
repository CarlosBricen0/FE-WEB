import 'server-only';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { requestBackend, BackendError } from './http';
export async function api<T>(path: string, method = 'GET', body?: unknown, authenticated = true): Promise<T> {
  let token: string | undefined;
  if (authenticated) {
    if (!process.env.KINDE_CLIENT_ID || !process.env.KINDE_ISSUER_URL) throw new BackendError(401,'Unauthorized');
    token = (await getKindeServerSession().getAccessTokenRaw()) || undefined;
    if (!token) throw new BackendError(401,'Unauthorized');
  }
  return requestBackend<T>(path,{method,body,token,origin:process.env.BACKEND_API_URL || 'http://127.0.0.1:4000'});
}
