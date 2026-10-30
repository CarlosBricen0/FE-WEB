# FE-WEB · OnlyHorse / Mercado Pago Chile

Interfaz Next.js que consume los componentes de FE-React y la API independiente de [BE-Node](https://github.com/CarlosBricen0/BE-Node). FE-WEB administra la sesión Kinde y adapta llamadas de UI a HTTP; base de datos, pagos, permisos, firmas de archivos, correo y conciliación pertenecen a BE-Node. Cada carpeta conserva su repositorio y rama.

- [Seguimiento de producción](docs/ROADMAP.md)
- [Servicios y configuración](docs/SERVICES.md)
- [Arquitectura](docs/ARCHITECTURE.md)
- [Decisión PostgreSQL/backend](docs/ADR-POSTGRES-BACKEND.md)
- [Validación](docs/VALIDATION.md)
- [Producción](docs/PRODUCTION.md)

## Arranque local

Node 22. FE-React y FE-WEB deben ser carpetas hermanas por la dependencia de componentes. BE-Node puede ejecutarse desde cualquier ubicación mediante su URL.

En FE-React:

```sh
npm ci
npm run build:creator-css
npm run sb
```

En BE-Node, con PostgreSQL 16 instalado y conservando `.env` si ya existe:

```sh
npm ci
# Solo en una instalación nueva: cp .env.example .env
npm run db:local
npm run db:deploy
# Solo demostración, no producción:
npm run db:seed
npm run dev
```

En FE-WEB, conservando `.env.local` si ya existe:

```sh
npm ci --no-install-links
# Solo en una instalación nueva: cp .env.local.example .env.local
npm run dev
```

Web http://localhost:3001, API http://127.0.0.1:4000 y Storybook http://localhost:6007. `BACKEND_API_URL` solo se usa en el servidor Next. Configurar Kinde y la misma audiencia en ambos repos para acceder a funciones privadas. Sin cuentas externas la landing permanece disponible; no se simulan usuarios ni pagos.

Los comandos `db:*`, `test:integration`, secretos de proveedores y el estado `.local/` se trasladaron a BE-Node. PostgreSQL conserva el puerto 5433, bases, datos y migraciones; FE-WEB ya no tiene cliente Prisma ni DATABASE_URL.

## Comprobaciones

```sh
npm run check:architecture
npm run typecheck
npm run lint
npm test
npm run build
npm start
npm run test:http
```

Detener `dev` antes de `start` (comparten 3001). `test:http` es para el entorno sin Kinde configurado; al conectar proveedores usar los recorridos de SERVICES.md. Las pruebas de negocio y de PostgreSQL se ejecutan desde BE-Node. `check:env` y `check:services` informan pendientes sin imprimir valores.

## Componentes y CI

Dependencia `components-front-end: file:../FE-React`; Next transpila el paquete y resuelve React del consumidor en cliente. Tras cambios en la biblioteca: `npm run sync:components`. CI descarga FE-React fijado a commit, valida arquitectura, tipos, lint, pruebas y build; no inicia PostgreSQL ni gestiona migraciones. BE-Node tiene su propio CI de API, pagos y base de datos.

Para hosting que descarga solo FE-WEB, aún debe resolverse la publicación de la biblioteca o un artefacto con ambos checkouts. La API sí se despliega independientemente. Ver ROADMAP.md antes de abrir ventas.

Aplicación activa en `src/app`; starter anterior en `legacy/pages`, fuera de rutas productivas. Adaptación del [tutorial de Codesistency](https://www.youtube.com/watch?v=mduqkHlJujA), con [licencia MIT conservada](LICENSE.onlyhorse).
