import {test} from 'node:test';
import assert from 'node:assert/strict';
import {requestBackend,BackendError} from '../src/lib/backend/http';
test('server transport forwards bearer credentials in headers and disables cached cross-user responses',async()=>{
 const fetcher:typeof fetch=async(input,init)=>{assert.equal(String(input),'http://127.0.0.1:4000/v1/me');assert.equal((init?.headers as Record<string,string>).Authorization,'Bearer fixture');assert.equal(init?.cache,'no-store');assert.equal(init?.redirect,'error');return Response.json({id:'member'});};
 assert.deepEqual(await requestBackend('/v1/me',{origin:'http://127.0.0.1:4000',token:'fixture',fetcher}),{id:'member'});
});
test('backend errors never expose database or provider payloads',async()=>{
 await assert.rejects(requestBackend('/v1/me',{origin:'http://127.0.0.1:4000',fetcher:async()=>Response.json({secret:'private database error'},{status:500})}),error=>error instanceof BackendError && error.status===500 && !error.message.includes('private'));
 await assert.rejects(requestBackend('/v1/me',{origin:'http://127.0.0.1:4000',fetcher:async()=>{throw new Error('token=secret');}}),error=>error instanceof BackendError && error.status===503 && !error.message.includes('secret'));
});
