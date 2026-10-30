# Seguimiento para producción · Mercado Pago Chile

Fecha de revisión: 30 de octubre de 2026. Esta lista es el punto de seguimiento actual; los documentos del tutorial conservan contexto histórico. Una casilla solo se cierra con evidencia. Conectar una API en código no acredita que la cuenta comercial esté habilitada.

| Punto | Estado | Evidencia actual | Pendiente para cerrar |
|---|---|---|---|
| Elegir pasarela y confirmar habilitación | Selección cerrada / habilitación bloqueada | Mercado Pago elegido para operación en Chile. | Titular debe crear la aplicación, habilitar productos y suministrar credenciales de pruebas en archivos locales. |
| 1. Adaptar pagos y moneda | Código y pruebas locales listos; aceptación externa pendiente | Checkout Pro, preapproval mensual/anual, CLP entero, cancelación, HMAC, consulta autoritativa, conciliación y tratamiento de reembolsos/contracargos. | Confirmar precios reales; probar cuenta Chile, test users y notificaciones reales. |
| 2. Conectar servicios de pruebas | Parcial | PostgreSQL 16 ejecutándose, bases de aplicación/pruebas, migraciones aplicadas y catálogo de demostración. check:services acredita la conexión. | Kinde, Mercado Pago, Cloudinary y Resend: faltan cuentas/credenciales del titular. No se fabricaron claves. |
| 3. Seguridad y distribución | Parcial | Admin por identidad inmutable en producción, límites persistentes, pagos validados, secretos ignorados y CI con ambos repos fijados a commit. | Corregir el Sonar heredado (scanner Java incompatible y projectKey/organization vacíos); modernizar herramientas vulnerables; cerrar protección frente a enlaces premium compartidos y estrategia de paquete publicado/artefacto para hosting. |
| 4. Pruebas funcionales y visuales | Parcial | Unitarias, contratos simulados y ciclo transaccional real de PostgreSQL; builds de Next/Storybook. | Navegación visual y recorridos completos con proveedores reales. |
| 5. Producción, migraciones, respaldos y alertas | Preparación local comprobada | Migraciones versionadas; backup local y restauración en base temporal; endpoints cron protegidos y diagnósticos. | Base productiva administrada, almacenamiento externo de backups, restauración de producción ensayada, programador y alertas operativas. |
| 6. Desplegar y verificar antes de vender | Pendiente | Código y PR revisables; no hay despliegue ni cuentas live. | Elegir hosting/dominio, pasar staging, desplegar, verificar y habilitar cobros supervisados. |

## Entregables cerrados en esta iteración

- [x] PostgreSQL elegido por licencia y compatibilidad; ver ADR-POSTGRES-BACKEND.md.
- [x] Instancia local privada en 127.0.0.1:5433 con SCRAM y credenciales aleatorias ignoradas.
- [x] Bases onlyhorse y onlyhorse_test creadas; rol de aplicación sin superusuario/creación de roles o bases.
- [x] Migraciones aplicadas y cliente Prisma generado; valores USD históricos preservados, sin conversión automática de moneda.
- [x] Integración Mercado Pago implementada y Stripe desactivado para nuevos cobros (webhook anterior devuelve 410).
- [x] Webhook consulta al proveedor y valida comercio, importe, moneda, referencia y modo; no confía en el retorno del navegador.
- [x] Autorizar preapproval no concede acceso; se exige un pago aprobado. Cancelar renovación conserva el período pagado; reembolso total/contracargo del período vigente revoca su acceso.
- [x] Notificaciones repetidas se procesan transaccionalmente; los límites de solicitudes no dependen de memoria de un proceso.
- [x] Conciliación programable para recuperar notificaciones perdidas y cola de correo durable.
- [x] Backup de la aplicación restaurado correctamente en una base temporal aislada.
- [x] Flujo de PR/CI preparado con PostgreSQL de pruebas, sin claves de servicios externos.

## Bloqueos que requieren participación del titular

1. Crear/habilitar las cuentas e integraciones indicadas en SERVICES.md. Guardar secretos en `.env.local` y/o el gestor de secretos del hosting, nunca en chat ni en Git.
2. Definir MEMBERSHIP_MONTHLY_CLP y MEMBERSHIP_YEARLY_CLP. Los precios demo de productos no son precios comerciales aprobados.
3. Obtener el ID Kinde del administrador para ADMIN_USER_ID. En producción no basta coincidir por email.
4. Elegir hosting y dominio. Checkout/notificaciones requieren el origen HTTPS y el webhook público configurados.
5. Revisar las condiciones de operación/cancelación/despacho y habilitación de Mercado Pago para el negocio real.

## Orden de trabajo siguiente

Configurar Kinde y probar identidad → conectar Mercado Pago en pruebas → completar archivos y correo → pruebas de extremo a extremo → cerrar seguridad/paquete → staging público → producción y verificación controlada.

Para revisar avances: `npm run check:env` informa campos faltantes; `npm run check:services` acredita conexión de los servicios que puede comprobar. Las pruebas con fixtures están separadas de la validación externa real en VALIDATION.md.
