# Producción · tres repositorios

La separación backend está implementada localmente; todavía no hay despliegue productivo. El seguimiento completo sigue en [ROADMAP.md](ROADMAP.md).

1. Revisar [arquitectura](ARCHITECTURE.md) y habilitar cuentas mediante [SERVICES.md](SERVICES.md). BE-Node administra PostgreSQL, pagos, archivos, correos y cron; Next mantiene sesión y adaptadores.
2. Elegir hosting/dominios para Next y API, y PostgreSQL administrado. El equipo local no es infraestructura productiva. Definir presupuesto de base, cómputo, archivos, tráfico, correo, identidad y comisiones.
3. Seguir BE-Node/docs/DEPLOYMENT.md: secretos por servicio, HTTPS, migraciones como job previo, backups externos/PITR, ensayo de restauración y health checks. Aplicar las mismas tres migraciones conservadas; no ejecutar reset, migrate dev ni seed demo contra clientes.
4. Publicar/empaquetar FE-React o preparar checkouts fijados a commit. FE-WEB necesita la biblioteca al compilar; BE solo necesita su propio repositorio. No usar dependencias locales ausentes en el hosting.
5. Desplegar BE primero, verificar conectividad y configurar BACKEND_API_URL en FE. Trasladar webhook Mercado Pago a /webhooks/mercadopago de BE y cron a /internal/cron/billing y /internal/cron/emails. Los antiguos endpoints de FE devuelven 410. Coordinar el corte para evitar escritores/cron duplicados.
6. Probar staging completo: Kinde API/audiencia, perfiles y roles, contenido premium, uploads, correo, compra, renovación, cancelación, reembolso/contracargo y recuperación de notificaciones. Resolver entrega premium autorizada frente a URLs compartidas.
7. Configurar alertas de disponibilidad, 5xx/webhook, intents needs_review, pagos sin conciliar, atraso del outbox y uso/costo de proveedores. Confirmar restauración con un respaldo externo y responsables/tiempos de recuperación.
8. Solo tras esa evidencia: credenciales live, habilitación comercial Chile, dominio y verificación supervisada antes de abrir ventas. Nunca considerar un redirect del navegador como prueba de pago.

Se mantiene pendiente corregir Sonar heredado de FE-React (scanner incompatible con Java y projectKey/organization vacíos), modernizar sus herramientas vulnerables y completar pruebas visuales. Los builds y las pruebas locales no cierran esos puntos.

Referencias: [licencia PostgreSQL](https://www.postgresql.org/about/licence/), [API Kinde](https://docs.kinde.com/developer-tools/your-apis/protect-your-api/), [Mercado Pago Chile](https://www.mercadopago.cl/developers/es/docs), [Cloudinary](https://cloudinary.com/documentation), [Resend](https://resend.com/docs). No se contrataron servicios ni se hicieron cobros reales.
