import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
const violations=[];
function scan(dir) { for(const item of readdirSync(dir,{withFileTypes:true})) {const file=path.join(dir,item.name);if(item.isDirectory())scan(file);else if(/\.(tsx?|mjs)$/.test(file)) {const s=readFileSync(file,'utf8');if(/@prisma|@\/db\/|from ['"](?:cloudinary|resend)['"]|(?:DATABASE_URL|MERCADOPAGO_ACCESS_TOKEN|CLOUDINARY_API_SECRET|CRON_SECRET|RESEND_API_KEY|ADMIN_USER_ID)/.test(s))violations.push(file);} } }
scan('src');if(violations.length)throw new Error(`Backend ownership violations: ${violations.join(', ')}`);console.log('FE-WEB: no database, provider secret or backend SDK imports.');
