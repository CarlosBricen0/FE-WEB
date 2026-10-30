import assert from 'node:assert/strict';
const cases = [
 ['/',200], ['/pricing',200], ['/setup',200], ['/merch','redirect'], ['/merch/not-a-product','redirect'], ['/update-profile','redirect'], ['/secret-dashboard','notFound'],
 ['/api/checkout?plan=invalid',400], ['/api/checkout?plan=monthly',307], ['/api/billing',307], ['/api/auth/login',307], ['/api/cron/emails',410],
 ['/api/sign-image',401,'POST'], ['/api/webhooks/stripe',410,'POST'], ['/api/webhooks/mercadopago',410,'POST'], ['/api/cron/billing',410], ['/billing','redirect'],
];
for (const [path, expected, method = 'GET'] of cases) {
 const response = await fetch(`http://localhost:3001${path}`, { method, redirect: 'manual', headers: { 'content-type': 'application/json' }, ...(method === 'POST' ? { body: '{}' } : {}) });
 const html = await response.text();
 if (expected === 'redirect') assert.ok(response.status === 307 || (response.status === 200 && /http-equiv="refresh" content="1;url=\/"/.test(html)), `${path} must redirect home`);
 else if (expected === 'notFound') assert.ok(response.status === 404 || (response.status === 200 && html.includes('Page not found') && html.includes('noindex')), `${path} must deny admin access`);
 else assert.equal(response.status, expected, `${method} ${path}`);
 if (path === '/') { assert.match(html, /OnlyHorse/); assert.doesNotMatch(html, /data-dgst=|:E\{"digest":|Unable to load this page/); assert.match(html, /highlighted-vid.mp4/); }
 console.log(`${method} ${path}: ${response.status}${typeof expected === 'string' ? ` (${expected} verified)` : ''}`);
}
