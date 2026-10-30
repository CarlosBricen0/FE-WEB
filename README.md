# FE-WEB · OnlyHorse / Mercado Pago Chile

Aplicación Next.js que consume el kit de FE-React y mantiene su lógica de servidor en el mismo proyecto: Kinde, Prisma/PostgreSQL, Mercado Pago, Cloudinary y Resend. Los repositorios y ramas Git permanecen independientes.

- [Seguimiento punto por punto](docs/ROADMAP.md)
- [Activar servicios y probar](docs/SERVICES.md)
- [Decisión PostgreSQL / backend](docs/ADR-POSTGRES-BACKEND.md)
- [Validación y límites](docs/VALIDATION.md)
- [Preparación de producción](docs/PRODUCTION.md)

## Arranque local

Node 22. Las carpetas FE-React y FE-WEB deben ser hermanas. Primero, en FE-React:

```sh
npm ci
npm run build:creator-css
npm run sb
```

Después, en FE-WEB, con PostgreSQL 16 instalado:

```sh
npm ci --no-install-links
npm run db:local
npm run db:deploy
npm run db:seed
npm run check:services
npm run dev
```

Web: http://localhost:3001. Storybook: http://localhost:6007. `check:services` devuelve salida 1 mientras falten servicios; no es un fallo de la base si PostgreSQL aparece OK. Las cuentas externas todavía deben configurarse en `.env.local`, generado desde el ejemplo sin inventar credenciales. Los precios de membresía deben definirse explícitamente.

`db:local` inicia una instancia privada en 127.0.0.1:5433 con bases onlyhorse/onlyhorse_test y credenciales aleatorias ignoradas. El rol de aplicación no es superusuario. Para detenerla: `npm run db:local:stop`. El script no sobrescribe una URL de base externa.

`compose.yaml` se conserva como alternativa de desarrollo con Docker; elegir un solo servidor en el puerto 5433. La instancia verificada en esta entrega es la nativa. No se ha creado infraestructura productiva.

## Pagos y moneda

Mercado Pago usa Checkout Pro para productos y preapproval para membresías mensual/anual. Los registros nuevos usan CLP en pesos enteros; los datos históricos USD conservan su moneda/unidad, sin conversión automática. El checkout de productos USD históricos queda bloqueado hasta que se configure un catálogo CLP.

El webhook `/api/webhooks/mercadopago` valida firma y consulta el recurso real. Se verifican comercio, modo, moneda, monto y referencia interna. Un retorno del navegador o una autorización de suscripción no equivale a pago aprobado. La página `/billing` permite actualizar estado y cancelar renovación; ya no se usa el portal de Stripe. El webhook Stripe devuelve 410 y no hay un cliente Stripe activo.

La integración está probada con fixtures de API y PostgreSQL real, no con cobros de una cuenta externa. Seguir SERVICES.md para preparar la aplicación Mercado Pago Chile, test users, HTTPS y notificaciones. Nunca usar tarjetas reales para suplir pruebas pendientes.

## Comprobaciones

```sh
npm run typecheck
npm run lint
npm test
npm run test:integration
npm run db:backup:verify
npm run build
npm start
```

Detener `npm run dev` antes de `npm start`, porque ambos usan el puerto 3001. `npm run test:http` está diseñado para el entorno sin autenticación/proveedores configurados; debe adaptarse al conectar Kinde. `npm run check:env` imprime nombres de campos faltantes sin sus valores.

Los backups locales se guardan en `.local/backups`, fuera de Git. `db:backup:verify` restaura una copia en una base temporal aislada y la elimina tras comprobar las tablas. Esto no sustituye almacenamiento externo, retención y pruebas de recuperación de producción.

## Componentes y CI

FE-WEB consume `components-front-end: file:../FE-React`. Next transpila el paquete y resuelve React del consumidor en cliente. Tras cambios de la biblioteca, ejecutar `npm run sync:components`.

El workflow del PR prepara ambos repositorios y PostgreSQL de pruebas. El ref de FE-React está fijado a un commit compatible; puede especificarse otro al ejecutar manualmente el workflow. Ese workflow valida, no despliega. Para un hosting que descargue solo FE-WEB falta publicar la biblioteca o preparar un artefacto completo; ver ROADMAP.md.

La aplicación activa está en `src/app`. El starter anterior permanece en `legacy/pages`, fuera de las rutas productivas; no restaurar el listado de contraseñas de ese starter. Adaptación inicial del [tutorial de Codesistency](https://www.youtube.com/watch?v=mduqkHlJujA), con [licencia MIT conservada](LICENSE.onlyhorse).
