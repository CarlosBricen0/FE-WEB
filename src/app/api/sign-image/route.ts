import { api } from '@/lib/backend';
import { BackendError } from '@/lib/backend/http';
export async function POST(request: Request) {
 try { const body=await request.json();return Response.json(await api<{signature:string}>('/v1/uploads/sign','POST',body)); }
 catch(error) { return Response.json({error:error instanceof BackendError ? error.message : 'Solicitud inválida'},{status:error instanceof BackendError?error.status:400}); }
}
