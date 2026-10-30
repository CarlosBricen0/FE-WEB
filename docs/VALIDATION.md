# Validación actual · extracción backend, 30 de octubre de 2026

- FE-WEB: arquitectura sin Prisma/SDK/secretos backend, TypeScript, ESLint, dos pruebas de transporte y build Next comprobados.
- BE-Node: TypeScript, compilación Node independiente y 13 pruebas unitarias/HTTP sin proveedores externos. Las pruebas de integración se omiten explícitamente en npm test.
- PostgreSQL desde BE: tres migraciones sin pendientes ni cambios de SQL; diez escenarios del ciclo de pagos y un recorrido HTTP de aislamiento/autorización contra onlyhorse_test.
- Seguridad: JWT RS256 válido frente a firma/issuer/audience/expiración inválidos, credenciales ausentes, cabeceras x-user falsas, permisos admin, actor concurrente aislado, ocultación premium, autor derivado del token y pedidos ajenos inaccesibles.
- Estado PostgreSQL trasladado a BE-Node/.local con parada controlada, conservando datos, puerto 5433 y bases. Backup restaurado en base temporal con 14 tablas antes y después del traslado.
- FE-React no cambia en esta extracción; mantiene la validación anterior y sus pendientes Sonar/herramientas.

No se acredita login Kinde real, carga Cloudinary real, correo Resend entregado, habilitación o cobros Mercado Pago reales, revisión visual completa ni despliegue productivo: faltan cuentas/configuración del titular y hosting. Los tokens y respuestas de proveedor de las pruebas son fixtures; la persistencia de integración sí usa PostgreSQL real.

Los comandos DB, integración y respaldo descritos históricamente bajo FE-WEB ahora se ejecutan en BE-Node. Los endpoints antiguos de FE para webhook/cron retornan 410. Ver SERVICES.md para las rutas vigentes.

---

## Evidencia histórica previa a la extracción

# Validación · actualización Mercado Pago y PostgreSQL

## Evidencia de esta iteración

- PostgreSQL 16 instalado e iniciado como instancia propia del proyecto en 127.0.0.1:5433; bases onlyhorse y onlyhorse_test creadas con autenticación SCRAM y credenciales aleatorias ignoradas.
- Tres migraciones versionadas aplicadas a las bases de aplicación y pruebas. Se conservan moneda/valores USD históricos; no se ejecutó conversión de divisas.
- Dos productos de demostración CLP cargados. Los precios comerciales de membresía no se inventaron: deben configurarse explícitamente.
- `check:services`: PostgreSQL OK por conexión y tablas; identidad/administración, Mercado Pago, Cloudinary y Resend bloqueados por las credenciales/configuración pendientes del titular.
- `npm test`: nueve pruebas unitarias/contrato correctas; la suite de base está omitida explícitamente en este comando y se ejecuta por separado.
- `npm run test:integration`: diez escenarios transaccionales y su suite contenedora correctos sobre PostgreSQL real: autorización sin pago, duplicados concurrentes, renovación, cancelación, reembolso antiguo, contracargo actual, comercio inválido, restricciones SQL y límites persistentes, además de compra única. Mercado Pago usa fixtures; no son pagos externos reales.
- `npm run db:backup:verify`: backup creado y restaurado en una base temporal aislada con catorce tablas; la base temporal se elimina después de verificarla.
- `npm run lint`, `npm run typecheck` y `npm run build`: correctos.
- FE-React: tres pruebas, typecheck del kit, CSS y build completo de Storybook correctos.
- Las diecisiete comprobaciones HTTP sin proveedores pasaron sobre el build final: incluyen Mercado Pago, /billing, cron de conciliación y el endpoint Stripe retirado. Se reproducen con `npm run test:http`.

## Qué acreditan estas pruebas

Las transacciones, firmas, correlaciones, importes y reglas se ensayan con contratos oficiales y respuestas simuladas. Esto no demuestra habilitación comercial, autenticación real en Kinde, funcionamiento real del widget, envío de correo ni un cobro aprobado por Mercado Pago Chile. Tampoco hubo despliegue productivo.

Pruebas externas pendientes: ver ROADMAP.md y SERVICES.md. El modo test requiere cuentas y medios de pruebas del proveedor. Se admite un correo de comprador de pruebas diferente a Kinde mediante MERCADOPAGO_TEST_PAYER_EMAIL, exclusivamente en modo test.

El backup comprobado es local; faltan almacenamiento externo, retención, alertas y ensayo de recuperación en el proveedor productivo. La herramienta de navegador se intentó nuevamente y respondió que el host no está disponible. La comprobación visual interactiva sigue pendiente.

## CI de FE-React

El job validate del PR de FE-React pasó en GitHub. El análisis SonarCloud heredado falló: scanner con Java antiguo incompatible y argumentos sonar.projectKey/sonar.organization vacíos. No se desactivó ese control ni se afirma que el PR tenga todos sus checks verdes. Ver https://github.com/CarlosBricen0/FE-React/pull/13.

## Límites y riesgos que siguen abiertos

Persisten las alertas heredadas de dependencias de FE-React/Storybook y los avisos bajos del renderizador de email. Debe repetirse la auditoría antes de producción y planificar su resolución; no se presume que hayan desaparecido por compilar.

El límite del contenido premium mediante URLs públicas sigue descrito en ROADMAP.md. La distribución publicada/artefacto de la biblioteca y el despliegue externo no están cerrados. Los nuevos límites por usuario persisten en PostgreSQL; no sustituyen las cuotas de proveedor ni la protección de infraestructura.

---

# Registro histórico de la primera implementación (Stripe / sin servicios)

El registro siguiente describe una etapa anterior y no el estado actual de PostgreSQL ni el proveedor activo:

# Validación local · 29 de octubre de 2026

## Comprobaciones realizadas

| Área | Comando/comprobación | Resultado |
|---|---|---|
| FE-React | `npm run typecheck:creator` | Kit compartido y átomos que consume: sin errores de tipos. |
| FE-React | `npm test` | Compatibilidad del botón anterior, props nativas y etiqueta accesible: 3 pruebas. |
| FE-React | `npm run build:creator-css` | Tema compilado. |
| FE-React | `npm run build-storybook -- --disable-telemetry` | Compilación estática completa. Ocho historias nuevas del kit. |
| FE-WEB | `npm run lint` | Sin errores ni advertencias en `src`. |
| FE-WEB | `npm run typecheck` | Sin errores de tipos. |
| FE-WEB | `npm test` | 4 pruebas: vigencia de membresías, redacción de datos premium, precios y validación de entradas. |
| FE-WEB | `npm run build` | Compilación de producción Next 16 con webpack completada. |
| Prisma | `prisma validate` | Esquema válido usando la URL de desarrollo de ejemplo, sin conectar a PostgreSQL. |
| Prisma | `prisma generate` | Cliente generado correctamente. |
| Prisma | `prisma migrate diff --from-empty ... --script` | SQL inicial generado y versionado, sin conexión a una base real. |
| Entorno | `npm run check:env` | Salida 1 esperada: identifica variables faltantes y no imprime secretos. |
| Git | `git diff --check` en ambos repositorios | Sin errores de whitespace. |

No se afirmó una cobertura completa del código a partir de estas pruebas. Las pruebas unitarias comprueban reglas concretas; no sustituyen las pruebas de integración con identidad, base de datos y proveedores.

## Smoke HTTP sin credenciales

Con `npm start` en FE-WEB, ejecutar `npm run test:http`:

| Solicitud | Resultado comprobado |
|---|---|
| GET `/` | 200, contenido OnlyHorse, video local y sin marcadores de error de renderizado. |
| GET `/pricing` | 200. |
| GET `/setup` | 200. |
| GET `/merch` | Redirección a inicio. |
| GET `/merch/not-a-product` | Redirección a inicio. |
| GET `/update-profile` | Redirección a inicio. |
| GET `/secret-dashboard` | Página no encontrada, sin panel administrativo. |
| GET `/api/checkout?plan=invalid` | 400. |
| GET `/api/checkout?plan=monthly` | 307 a autenticación. |
| GET `/api/billing` | 307 a autenticación. |
| GET `/api/auth/login` | 307 a configuración cuando Kinde falta. |
| GET `/api/cron/emails` | 401 sin secreto. |
| POST `/api/sign-image` | 401 sin sesión. |
| POST `/api/webhooks/stripe` | 400 sin firma/configuración. |

Next puede enviar las redirecciones y `notFound` de páginas después de iniciar el streaming, con estado HTTP 200 y marcadores de redirección/noindex en HTML. El script verifica ese comportamiento explícitamente, en vez de interpretar cualquier 200 como acceso concedido. Los endpoints API devuelven los códigos indicados.

## Seguridad de dependencias

- FE-WEB, `npm audit --omit=dev`: 0 avisos críticos, altos o moderados; 4 bajos en la cadena de renderizado de React Email (`@react-email/components`, `@react-email/render`, `html-to-text`, `deepmerge`).
- FE-React, auditoría completa de herramientas y dependencias: 87 avisos (12 bajos, 27 moderados, 47 altos, 1 crítico) en el último informe. Entre las cadenas afectadas están Storybook 7, semantic-release y sus herramientas npm/tar. No se ejecutó `audit fix --force`, que propone saltos mayores. Las correcciones compatibles se intentaron y no resolvieron esas cadenas.
- El build de Storybook también advierte sobre un export ya ausente en los componentes Shelf heredados (`AddToCartAndQuantity`) y sobre tamaño de bundles. El kit de OnlyHorse no usa ese componente; no se afirma haber reparado todo el catálogo anterior.
- React 18 se conserva para compatibilidad con la biblioteca/Storybook. Next 16 lo admite con aviso de deprecación; una migración futura de Storybook y React debe coordinarse entre ambos repositorios.

El resultado no se declara listo para producción únicamente por compilar. Antes de exponer Storybook o habilitar pagos live, completar la actualización de herramientas, revisión de dependencias y pruebas con cuentas reales.

## No realizado por falta de servicios configurados

El usuario confirmó que aún no dispone de configuración para Kinde, PostgreSQL, Stripe, Cloudinary y Resend. Docker está instalado, pero el daemon no estaba ejecutándose. No se crearon cuentas, cargos, suscripciones, correos ni un despliegue. No se aplicó la migración ni el seed contra una base real.

La herramienta de navegador informó que el host no estaba disponible. No hubo comprobación visual interactiva, capturas de la aplicación ni prueba manual de responsive/teclado. La imagen de demostración de la referencia sí se inspeccionó como apoyo al análisis.

## Checklist de aceptación al conectar los servicios

1. Ejecutar `check:env`, `db:deploy` y `db:seed`. Confirmar que repetir el seed no duplica productos. Entrar con ADMIN_EMAIL por Kinde y comprobar que se crea el perfil real del creador.
2. Con una segunda cuenta sin membresía, confirmar que no accede a `/secret-dashboard` ni a sus acciones. Verificar que un payload de feed no contiene texto, comentarios ni URL multimedia privada.
3. Crear un post público y otro privado con imagen/video desde el administrador. Comprobar orden, carga, vacío y mensajes de error. Borrar un post con comentarios/likes y verificar cascadas.
4. Comprar membresía mensual de prueba. Confirmar que visitar `/?subscription=success` por sí solo no concede acceso, y que el webhook firmado sí lo concede. Repetir con el plan anual en otra cuenta.
5. Reenviar el mismo evento Stripe y verificar una sola recepción efectiva, un solo pago registrado y un solo correo de bienvenida. Entregar eventos fuera de orden y verificar que se conserva el estado actual consultado a Stripe.
6. Usar el portal para cancelar al final del período y comprobar acceso hasta su vencimiento. Probar cancelación inmediata, impago y renovación; comprobar estado/fecha y total de suscripciones vigentes.
7. Como miembro, dar/quitar like y comentar. Simular solicitudes concurrentes y confirmar unicidad y conteo consistente. Intentar ambas acciones sin membresía y comprobar rechazo del servidor.
8. Comprar producto con talla válida; intentar precio/talla/producto archivado manipulados y comprobar rechazo o uso del precio real. Confirmar que la página de éxito espera `isPaid` y que otra cuenta no puede leer el pedido.
9. Cambiar nombre/foto del perfil. Verificar preset firmado de avatar, formatos y límites en Cloudinary; probar un preset/carpeta manipulados y una firma anónima. Comprobar que email/rol no son modificables desde el formulario.
10. Deshabilitar temporalmente Resend, completar un pago de prueba y comprobar que se mantiene en la cola. Restaurar Resend y ejecutar cron autenticado; verificar envío y marcado de entrega.
11. Confirmar que ingresos se basan en `Payment`, que pedidos impagos no cuentan y que productos archivados no pueden comprarse.
12. Revisar visualmente móvil/escritorio, claro/oscuro, teclado, foco de diálogos y errores. Reemplazar testimonios/equipo de demostración antes de publicación comercial.
13. Configurar callbacks/webhooks HTTPS, secretos del proveedor y tarea cron en despliegue; repetir pruebas en Stripe test antes de pasar a live.
