# Configuración de servicios y pruebas

## Base creada y comandos

Desde FE-WEB, Node 22 y PostgreSQL 16 instalado:

```sh
npm ci --no-install-links
npm run db:local
npm run db:deploy
npm run db:seed
npm run check:services
npm run dev
```

`db:local` es repetible: inicia la instancia propia y crea onlyhorse/onlyhorse_test si faltan. Conserva las otras variables del usuario al completar las faltantes desde el ejemplo. `.env`, `.env.local`, `.local/`, datos y backups están ignorados. Las contraseñas no se imprimen. Para detener solo esta instancia: `npm run db:local:stop`.

Prisma CLI lee la conexión de `.env`; Next y los diagnósticos cargan `.env.local`. No cambiar una URL de producción por una de desarrollo a ciegas: el bootstrap rechaza sobreescribir una conexión externa.

Pruebas:

```sh
npm run lint
npm run typecheck
npm test
npm run test:integration
npm run db:backup:verify
npm run build
```

La integración ejecuta migraciones y pruebas únicamente contra `onlyhorse_test` en localhost. Nunca habilita usuarios ficticios en el login real ni llama a Mercado Pago para simular cobros. Usa fixtures de API con PostgreSQL real.

## Mercado Pago Chile

1. El titular crea su aplicación en el panel de desarrolladores de Mercado Pago Chile y confirma habilitación de Checkout Pro y Suscripciones para su cuenta. Seleccionar la pasarela no acredita aprobación comercial.
2. Preparar vendedor/comprador y medios de pago de pruebas según el proveedor. Si el comprador de prueba tiene otro correo que la identidad Kinde, definir MERCADOPAGO_TEST_PAYER_EMAIL; solo se utiliza en modo test y la correlación de identidad sigue siendo la intención de pago del usuario. No utilizar tarjetas reales en esta fase.
3. Configurar MERCADOPAGO_MODE=test, MERCADOPAGO_ACCESS_TOKEN, MERCADOPAGO_COLLECTOR_ID y MERCADOPAGO_WEBHOOK_SECRET. El collector debe coincidir con la cuenta vendedora Chile; check:services puede comprobar `/users/me` cuando existan credenciales.
4. Definir MEMBERSHIP_MONTHLY_CLP y MEMBERSHIP_YEARLY_CLP como pesos enteros positivos. No se eligieron precios comerciales automáticamente ni se convirtieron USD del tutorial a CLP.
5. Configurar NEXT_PUBLIC_BASE_URL con el origen público HTTPS del entorno y MERCADOPAGO_WEBHOOK_URL con `https://<dominio>/api/webhooks/mercadopago`. Para pruebas locales se necesita un túnel HTTPS o staging público; Kinde debe usar el mismo dominio de inicio/retorno. No hay un túnel externo creado por esta entrega.
6. En el panel de notificaciones configurar los temas `payment`, `subscription_preapproval` y `subscription_authorized_payment`. Se valida `x-signature` sobre `data.id`, `x-request-id` y timestamp; el body debe identificar el mismo recurso. El secreto del webhook es distinto del access token.
7. Consultar el recurso real tras la notificación. Los retornos success/pending no marcan una compra pagada ni conceden membresía.
8. Probar compra, rechazo, membresía mensual/anual, renovación, cancelación, duplicados, retrasos y reembolsos. Confirmar que `live_mode` de pagos coincide con el modo configurado. Las restricciones específicas de test users y del producto de suscripciones deben verificarse con la cuenta habilitada; no están acreditadas por mocks.

Se usa Checkout Pro para productos y preapproval pendiente con autorización alojada para membresías. Las tarjetas quedan en el proveedor; la aplicación no recibe PAN/CVV. Las suscripciones se gestionan en `/billing`; el portal de Stripe ya no participa. Autorizar una membresía sin un pago aprobado no habilita el contenido.

Para cancelación, se detienen futuros cobros y se conserva el período confirmado. Un reembolso total o contracargo del pago que sostiene el período vigente revoca ese acceso. Los reembolsos parciales reducen el ingreso neto y conservan acceso; confirmar que esta política coincide con el negocio. No hay botón interno para emitir reembolsos: se efectúan en el proveedor y se concilian sus estados.

Ante un timeout de creación se conserva una intención `needs_review`; no se reintenta un nuevo cargo automáticamente. La conciliación intenta recuperar suscripciones por referencia y pagos asociados. Recursos ambiguos o preferencias sin confirmar requieren revisión operativa antes de crear otro cobro.

Contrato técnico consultado: repositorio oficial https://github.com/mercadopago/openapi, commit 4bf7b8751434d29f5a1d9a2dfe498c69ce50d3cb. Documentación de producto:
- https://www.mercadopago.cl/developers/es/docs/subscriptions/overview
- https://www.mercadopago.cl/developers/en/docs/checkout-pro-preferences/additional-content/notifications/webhooks

## Kinde

Crear una aplicación web, completar KINDE_CLIENT_ID, KINDE_CLIENT_SECRET y KINDE_ISSUER_URL. En local sin túnel:

- KINDE_SITE_URL=http://localhost:3001
- KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3001/auth/callback
- KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3001
- Callback permitido: http://localhost:3001/api/auth/kinde_callback

Al usar dominio HTTPS para pagos, configurar esos valores y callbacks para ese mismo dominio. No mezclar cookies de localhost con callbacks de staging.

El primer login crea el perfil con la identidad real. Definir ADMIN_EMAIL y el identificador inmutable en ADMIN_USER_ID, que puede consultarse en el panel de usuarios de Kinde. En producción la autorización no depende únicamente del correo; habilitar MFA en la cuenta administrativa. No se crearon cuentas Kinde desde los fixtures de pruebas.

## Cloudinary

Completar NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET. Crear un preset firmado para avatares (jpg/png/webp, máximo 5 MB) y asignarlo a NEXT_PUBLIC_CLOUDINARY_AVATAR_PRESET. El servidor firma una lista limitada de parámetros y la carpeta del usuario; el endpoint está limitado por usuario.

Comprobar foto de perfil y carga administrativa de imagen/video en la cuenta real. El ping acredita credenciales, no las restricciones del preset ni el flujo completo del widget. Los archivos premium actuales siguen usando URLs de Cloudinary; la entrega privada con enlaces temporales es un punto de seguridad pendiente si se requiere impedir enlaces compartidos.

## Resend y tareas

Verificar un dominio de envío y completar RESEND_API_KEY/EMAIL_FROM. La verificación de correo no se acredita por tener variables presentes: deben ensayarse entregas y fallos reales con destinatarios controlados.

Configurar dos tareas, con el mismo CRON_SECRET privado en la cabecera `Authorization: Bearer <secreto>`:

- `/api/cron/emails`: reintentar correo pendiente, por ejemplo cada cinco minutos.
- `/api/cron/billing`: conciliar recursos y recuperar notificaciones perdidas, por ejemplo cada cinco minutos; procesa lotes limitados y alterna por fecha de revisión.

No colocar secretos en URLs. La instancia local genera CRON_SECRET cuando falta, pero no crea tareas en un proveedor externo. El programador y las alertas se configuran al elegir hosting. Un error de conciliación devuelve 503 para que la monitorización pueda detectarlo; los correos permanecen en la cola.

## Producción

Usar claves, bases y dominios separados de pruebas. Ver PRODUCTION.md y ROADMAP.md antes de cambiar a live. Las cuentas y credenciales comerciales deben ser suministradas por el titular; esta entrega no las inventa ni acredita cobros reales.
