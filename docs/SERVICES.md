# Servicios · FE-WEB + BE-Node

La separación backend es la etapa previa a retomar el [seguimiento de producción](ROADMAP.md). Los secretos se guardan localmente o en el gestor del hosting, nunca en Git ni en el chat.

## Responsabilidades y archivos

| Configuración | Ubicación |
|---|---|
| Sesión Kinde: client ID/secret, issuer, redirects y audience | FE-WEB/.env.local |
| URL privada del backend BACKEND_API_URL | FE-WEB/.env.local |
| Nombre/API key/preset públicos Cloudinary para widget | FE-WEB/.env.local |
| DATABASE_URL, TEST_DATABASE_URL, ADMIN_USER_ID y CRON_SECRET | BE-Node/.env |
| KINDE_ISSUER_URL y KINDE_AUDIENCE (sin client secret) | BE-Node/.env |
| Mercado Pago, precios, Cloudinary secret y Resend | BE-Node/.env |
| PostgreSQL privado, respaldos y credenciales del bootstrap local | BE-Node/.local/ |

Los ejemplos están en FE-WEB/.env.local.example y BE-Node/.env.example. Conservar los archivos existentes; no reemplazarlos con ejemplos. La base de desarrollo escucha en 127.0.0.1:5433; API 4000 y Next 3001. Los comandos `db:*`, `test:integration` y respaldos se ejecutan **en BE-Node**. Ver README de ambos repos para arrancar.

## 1. Kinde: siguiente punto a cerrar

1. Crear tenant y aplicación Next; copiar el client ID/secret y configurar issuer y callback `http://localhost:3001/api/auth/kinde_callback`, logout `http://localhost:3001`. Configurar las URLs públicas equivalentes cuando haya dominio.
2. Registrar una API con audience `urn:onlyhorse:api`, autorizar la aplicación Next para esa API y definir `KINDE_AUDIENCE=urn:onlyhorse:api` en ambos repos. Definir exactamente el mismo issuer HTTPS en ambos.
3. Iniciar sesión de nuevo para obtener un access token con esa audiencia. FE usa `getAccessTokenRaw`; BE verifica firma y claims y obtiene el perfil en Kinde. No usar un ID token ni inventar JWT/userId.
4. Iniciar sesión como titular y guardar su ID inmutable en BE `ADMIN_USER_ID`. El email alternativo solo sirve en desarrollo. Verificar usuario normal → API admin 403; administrador → dashboard; sin token → 401.

Fuentes: [API Kinde](https://docs.kinde.com/developer-tools/your-apis/protect-your-api/) y [SDK Next](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/).

## 2. Mercado Pago Chile

El titular debe confirmar habilitación de Checkout Pro y Suscripciones en su aplicación Chile; aún no está acreditada. En BE configurar `MERCADOPAGO_MODE=test`, access token, collector ID Chile, webhook secret, `WEB_APP_URL` público HTTPS y `MERCADOPAGO_WEBHOOK_URL=https://API/webhooks/mercadopago`. No usar la antigua ruta `/api/webhooks/mercadopago` de FE: devuelve 410.

Definir precios enteros CLP en `MEMBERSHIP_MONTHLY_CLP` y `MEMBERSHIP_YEARLY_CLP`; no se inventan valores comerciales. Para compras, el precio viene de la base, no del navegador. Usar usuarios/compradores de prueba conforme a Mercado Pago; `MERCADOPAGO_TEST_PAYER_EMAIL` solo modifica pagador en modo test. Registrar notificaciones de payment, subscription_preapproval y subscription_authorized_payment según los productos habilitados.

Probar compra física con despacho, autorización sin pago (no da acceso), pago aprobado, notificación repetida, renovación, cancelación conservando período, rechazo, reembolso y contracargo. Confirmar comercio/importe/moneda/modo, separar cuentas de prueba/live y acreditar el webhook real. Las pruebas locales actuales usan fixtures del proveedor, no cobros reales.

## 3. Archivos y correo

En BE configurar `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` y `CLOUDINARY_AVATAR_PRESET`; en FE los equivalentes públicos del widget. Definir preset de avatares firmado, restringido a la carpeta `onlyhorse/avatars/<id>`, y verificar usuario normal frente a admin. La firma se genera en BE, donde se validan parámetros/fecha y límite por usuario.

La protección de contenido premium frente a enlaces Cloudinary compartidos sigue pendiente: no basta ocultar la URL en el feed. Resolver entrega autorizada antes de vender acceso.

Configurar dominio verificado en Resend, `RESEND_API_KEY` y `EMAIL_FROM` en BE. Probar entrega e idempotencia con un destinatario controlado; la cola durable evita depender de que el webhook pueda enviar inmediatamente.

## 4. Diagnóstico y operaciones

Desde BE: `npm run check:env`, `npm run check:services`, `npm run test:integration`, `npm run db:backup:verify`. Desde FE: `npm run check:env`, `npm run check:services`, `npm run check:architecture`. Los diagnósticos muestran nombres de variables y errores sanitizados, no secretos. Salida 1 por falta de cuentas es un pendiente real.

Programar en BE `/internal/cron/billing` cada 5 minutos y `/internal/cron/emails` cada minuto con Bearer CRON_SECRET. El programador y las alertas externas aún deben configurarse. Ver BE-Node/docs/DEPLOYMENT.md y [producción](PRODUCTION.md).
