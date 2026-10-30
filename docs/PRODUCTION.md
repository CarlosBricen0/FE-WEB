# Preparación de producción · Chile / Mercado Pago

Estado actual: [ROADMAP.md](ROADMAP.md). Guía de cuentas y variables: [SERVICES.md](SERVICES.md). Mercado Pago está elegido; la habilitación de la cuenta comercial y sus pruebas reales siguen pendientes del titular.

## Antes de staging

1. Completar las cuentas Kinde, Mercado Pago Chile, Cloudinary y Resend; definir precios de negocio en pesos enteros CLP.
2. Cerrar los flujos reales de Checkout Pro y suscripciones con test users; comprobar firma, estado, duplicados, renovación, cancelación y reembolsos. No cambiar a live para saltarse errores de prueba.
3. Revisar las dependencias heredadas de FE-React/Storybook y los avisos residuales de FE-WEB. El build no acredita seguridad de producción.
4. Definir y ensayar el nivel de protección de contenido premium; las URLs públicas actuales no impiden compartir enlaces.
5. Configurar ADMIN_USER_ID con la identidad Kinde real y MFA. En producción no se autoriza administración por email únicamente.
6. Publicar una versión de FE-React o construir un artefacto con ambos repositorios fijados a commits. El file:../FE-React local no aparece automáticamente en un hosting que solo descarga FE-WEB.
7. Completar revisión visual, responsive, teclado y foco. Reemplazar contenido de demostración, acordar despacho/soporte y condiciones de cancelación.

## Entorno de staging

- Elegir hosting y un dominio HTTPS estable. Una opción a evaluar es alojamiento administrado para Next con PostgreSQL administrado; un VPS requiere además supervisor, proxy HTTPS y mantenimiento. No se ha contratado ningún proveedor.
- Usar bases, claves, cuentas de pruebas y remitentes separados de producción.
- Registrar callbacks de Kinde sobre el mismo origen desde el que se inicia login.
- Configurar MERCADOPAGO_MODE=test, su access token, collector Chile, secreto y webhook `/api/webhooks/mercadopago`. Para usar un comprador de prueba distinto al correo Kinde, existe MERCADOPAGO_TEST_PAYER_EMAIL, solo en modo test.
- Configurar las credenciales de archivos/correo en el gestor de secretos del hosting. Nunca compartirlas por chat ni versionarlas.
- Instalar con Node 22 y lockfiles. Generar Prisma mediante el postinstall existente. Para migraciones, usar la conexión directa que requiera el proveedor en un job controlado; el esquema actual solo lee DATABASE_URL y no se configura por crear una variable DIRECT_URL sin código adicional.
- Ejecutar `npm run db:deploy` antes de promover la release y comprobar migraciones. No ejecutar `migrate dev`, `migrate reset` ni el seed de demostración contra datos de clientes.
- Programar `/api/cron/billing` y `/api/cron/emails`, autenticados con CRON_SECRET en cabecera. El código está preparado; el programador externo aún debe configurarse.
- Ejecutar los escenarios de VALIDATION.md con cuentas externas reales de prueba. Los fixtures no prueban la habilitación comercial del proveedor.

## Producción

1. Confirmar que el comercio chileno tiene habilitados los productos necesarios de Mercado Pago y completar las condiciones comerciales con el proveedor.
2. Crear una base productiva administrada, credenciales distintas, política de pooling y acceso restringido. El PostgreSQL nativo creado en este equipo solo es desarrollo.
3. Preparar dominio, DNS y HTTPS; configurar callbacks y notificaciones de producción. Mantener staging aislado para que no escriba en producción.
4. Respaldar y ensayar recuperación antes de migrar. Guardar backups fuera de la máquina/base, con cifrado y retención. La restauración local ya comprobada no acredita recuperación del proveedor productivo.
5. Aplicar migraciones de forma serializada y compatible con la versión anterior. Revertir una aplicación no revierte automáticamente su esquema.
6. Desplegar el artefacto/commit exacto que pasó staging. Revisar los precios CLP y cambiar a MERCADOPAGO_MODE=live solo en el entorno correspondiente, con claves de producción y revisión del titular.
7. Activar cron y alertas: disponibilidad, errores de aplicación, fallos de webhook, recursos needs_review, demora de conciliación, correos pendientes y uso/costo de proveedores. Los endpoints devuelven fallo para permitir monitorización; todavía no existe un servicio de alertas externo conectado.
8. Ejecutar una verificación controlada con supervisión del titular, comprobar acceso/recibos y preparar soporte antes de abrir ventas.
9. Conservar una release anterior y un procedimiento probado de rollback/recuperación. Documentar quién atiende incidentes y conciliaciones ambiguas.

## Hosting pendiente de elección

Si se elige Vercel, usar un plan compatible con actividad comercial. Hobby es personal/no comercial y su cron no admite la frecuencia de cinco minutos propuesta. Una alternativa es un programador externo autenticado o un plan compatible. No se ha creado vercel.json ni un despliegue porque el proveedor no está definido.

Si se elige VPS, preparar Dockerfile de aplicación o supervisor Node, proxy TLS, actualizaciones del sistema y backups externos. compose.yaml actual solo sirve para base de desarrollo, no constituye esa infraestructura.

Fuentes oficiales consultadas:
- PostgreSQL y licencia: https://www.postgresql.org/about/licence/
- Mercado Pago y contratos de API: https://github.com/mercadopago/openapi
- Kinde: https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/
- Presets Cloudinary: https://cloudinary.com/documentation/upload_presets
- Dominios Resend: https://resend.com/docs/dashboard/domains/introduction
- Vercel: https://vercel.com/docs/plans/hobby y https://vercel.com/docs/cron-jobs/usage-and-pricing

Los costos de hosting, base, almacenamiento/tráfico, correo, identidad y comisiones son independientes de la licencia gratuita de PostgreSQL y del uso de ChatGPT. No se contrataron servicios ni se ejecutaron cobros reales durante esta implementación.
