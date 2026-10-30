import { loadEnvConfig } from '@next/env';
import { serviceVariables } from '../src/lib/services-config';
loadEnvConfig(process.cwd());
async function main() {
 let pending=0;
 for (const [name,keys] of Object.entries(serviceVariables)) { const missing=keys.filter(key=>!process.env[key]); if(missing.length) {console.log(`${name}: pendiente ${missing.join(', ')}`);pending++;} else console.log(`${name}: variables presentes; prueba real pendiente`); }
 try {const response=await fetch(new URL('/health/ready',process.env.BACKEND_API_URL || 'http://127.0.0.1:4000'),{signal:AbortSignal.timeout(5000)});if(!response.ok)throw new Error();console.log('BE-Node: listo');}catch{console.log('BE-Node: no disponible o pendiente de configurar Kinde');pending++;}
 process.exitCode=pending?1:0;
}
main();
