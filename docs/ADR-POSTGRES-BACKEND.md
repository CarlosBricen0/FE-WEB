# ADR · PostgreSQL y extracción a BE-Node

Estado: decisión actual, 30 de octubre de 2026. Sustituye la decisión inicial de conservar todo el backend en Next, por la solicitud explícita de separar responsabilidades antes de continuar la preparación productiva.

Se conserva PostgreSQL 16: el motor no exige pagar una licencia comercial bajo su [licencia permisiva](https://www.postgresql.org/about/licence/). Hosting, operación y soporte sí pueden costar. SQL Server dispone de ediciones gratuitas con restricciones y comerciales; ver [licenciamiento oficial](https://www.microsoft.com/licensing/guidance/SQL). No se cambió de motor ni se recreó la información.

BE-Node pasa del ejemplo Express/Mongoose a una API Express 5/TypeScript/PostgreSQL. Es dueño de dominio, persistencia, migraciones e integraciones. Next conserva sesión Kinde y adaptadores de UI. FE-React conserva los componentes. A cambio de operar dos procesos de aplicación, las reglas de negocio ya no crecen dentro del frontend y pueden consumirse mediante un contrato versionado.

La API verifica access tokens Kinde mediante JWKS y exige issuer/audience; no acepta userId de confianza del navegador. ADMIN_USER_ID se resuelve en BE y es obligatorio para administrar en producción. Los secretos de pagos, archivos y correo se retiran de FE.

Las tres migraciones se trasladan sin modificar SQL/checksums. En el equipo local se verifica un respaldo, se detiene la instancia privada, se mueve su estado a BE-Node/.local y se reinicia con el mismo puerto/datos. En producción se debe hacer un corte coordinado de escritores y URLs de webhook/cron; no resetear la base.

El ejemplo anterior incluía una credencial MongoDB incrustada. Se retiró del código actual; el titular debe revocarla/rotarla porque permanece en el historial Git. No se usó ni se publica aquí.

Prisma continúa en 5.22 fijado en lockfile. La instancia local y sus respaldos son desarrollo; no sustituyen una base administrada, copias externas o redundancia productiva.
