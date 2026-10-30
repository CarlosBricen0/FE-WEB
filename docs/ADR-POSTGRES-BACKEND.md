# ADR · PostgreSQL y backend Next.js

Decisión: PostgreSQL 16 para esta iteración. El coste de licencia del motor es cero bajo su licencia permisiva; alojamiento, operación, respaldos y soporte pueden tener coste. SQL Server tiene ediciones gratuitas con condiciones y ediciones comerciales; no afirmamos que todas sus ediciones requieran pago. PostgreSQL evita añadir una licencia comercial del motor al crecer y aprovecha el esquema y Prisma ya implementados.

Fuentes oficiales consultadas:
- https://www.postgresql.org/about/licence/
- https://www.microsoft.com/licensing/guidance/SQL

La base se creó localmente con las herramientas oficiales de PostgreSQL instaladas mediante Homebrew porque había CLI de Docker pero no un daemon utilizable. El script del proyecto crea su propia instancia, escucha solo en 127.0.0.1:5433, usa SCRAM y guarda credenciales aleatorias en archivos ignorados. No se instaló un servicio que exponga PostgreSQL a Internet.

No se introduce otro backend en esta etapa. Next.js ya atiende autenticación, Server Actions, webhooks, Prisma y cron autenticado. Dividir ahora duplicaría configuración de identidad/autorización y comunicación entre procesos sin resolver un requisito actual.

Se inspeccionó BE-Node, que es un ejemplo Express/Mongoose de CRUD y no el backend PostgreSQL de esta aplicación. Contiene una credencial incrustada que el titular debe revocar/rotar en su proveedor. No se usó esa credencial, no se conectó a ese MongoDB, no se importó el código y no se modificó BE-Node. No se reproduce el secreto en este documento.

Reevaluar BE-Node si aparecen clientes independientes, una API pública versionada, procesos de larga duración, colas dedicadas u otras necesidades que excedan las rutas y tareas programadas de Next. Si se extrae lógica, la autenticación debe validar tokens/identidad y los permisos en ese servicio; no confiar en userId enviado por el navegador.

Prisma permanece en su versión 5 instalada y fijada por lockfile. No se aplicaron instrucciones incompatibles de versiones mayores. El script local es de desarrollo, no un sustituto de PostgreSQL administrado, redundancia o copias externas para producción.
