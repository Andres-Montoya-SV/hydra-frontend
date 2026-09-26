# Arquitectura

Next.js 16.3.6 App Router con límites client/server explícitos. Las páginas protegidas validan la sesión desde el servidor; cada operación vuelve a validarla. El frontend no define un segundo sistema de autorización: Hydra determina propiedad, plan, cuotas, scope y acceso a cada recurso.

## Sesión

El login valida X-API-Key consultando GET /account/subscription. La credencial se guarda cifrada con JWE A256GCM en una cookie HttpOnly, Secure en producción, SameSite=Strict, con expiración de 8 horas. SESSION_SECRET debe tener al menos 32 caracteres aleatorios. No hay claves en localStorage, URLs, logs ni props de React. La revocación en Hydra se aplica en cada llamada. Cerrar sesión elimina la cookie; no revoca la API key. Un token de sesión robado puede reutilizarse hasta su expiración o revocación de la clave: no existe un almacén de revocación de sesiones en este MVP.

El BFF usa un catálogo cerrado de acciones validado con Zod. El cliente no elige URL, cabeceras, account_id u organization_id. Se rechazan redirecciones upstream. Cada POST/DELETE exige Origin igual a APP_ORIGIN, incluyendo login/logout. Todas las respuestas de datos privados usan no-store. Los errores upstream se traducen sin reenviar trazas ni detalles internos.

## Operación

En producción usa HTTPS, SESSION_SECRET estable entre réplicas y APP_ORIGIN exacto. HYDRA_API_URL es configuración del operador, nunca entrada del usuario. La conexión remota al backend exige HTTPS; se permite HTTP loopback para un sidecar. No despliegues un backend públicamente accesible sin sus controles de acceso y red.

Configura límites de cuerpo y rate limiting en el ingress (login y solicitudes). El BFF utiliza timeouts y límites de lectura. El backend limita peticiones por API key. No se implementa un rate limiter en memoria que falle al desplegar múltiples réplicas.

Registro público no habilitado: el endpoint de creación de cuenta limita por IP TCP. Con un BFF todas las cuentas compartirían esa IP. Antes de habilitarlo se requiere una política explícita de proxies confiables/rate limiting en el backend; no se falsifica X-Forwarded-For para saltar el límite.

## Siguiente integración

Agregar contratos para listado paginado de scans/dominios, identidad de cuenta, organizaciones/roles, assets/candidatos/exposures y grafo. La existencia de tablas internas no significa que haya API pública. Firebase Auth por sí solo no autentica contra X-API-Key: requiere un puente verificado del backend antes de habilitar usuarios con contraseña.
