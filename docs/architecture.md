# Arquitectura

Next.js 16.3.6 App Router con límites client/server explícitos. Las páginas protegidas validan la sesión desde el servidor; cada operación vuelve a validarla. El frontend no define un segundo sistema de autorización: Hydra determina propiedad, plan, cuotas, scope y acceso a cada recurso.

## Sesión

El login valida X-API-Key consultando GET /account/subscription. La credencial se guarda cifrada con JWE A256GCM en una cookie HttpOnly, Secure en producción, SameSite=Strict, con expiración de 8 horas. En producción se llama `__Host-hydra_session`, con `Path=/` y sin `Domain`: el navegador impide compartirla con el sitio corporativo u otros subdominios. El cierre de sesión conserva esos atributos al expirar la cookie. En desarrollo se llama `hydra_session`. El cambio de nombre obliga a iniciar sesión otra vez después de actualizar una instalación anterior.

SESSION_SECRET debe tener al menos 32 caracteres aleatorios. No hay claves en localStorage, URLs, logs ni props de React. La revocación en Hydra se aplica en cada llamada. Cerrar sesión elimina la cookie; no revoca la API key. Un token de sesión robado puede reutilizarse hasta su expiración o revocación de la clave: no existe un almacén de revocación de sesiones en este MVP.

El BFF usa un catálogo cerrado de acciones validado con Zod. El cliente no elige URL, cabeceras, account_id u organization_id. Se rechazan redirecciones upstream. Cada POST/DELETE exige Origin igual a APP_ORIGIN, incluyendo login/logout. Todas las respuestas de datos privados usan no-store. Los errores upstream se traducen sin reenviar trazas ni detalles internos.

## Portada y navegador

`/` es pública y no consulta Hydra. Solo las traducciones estáticas de la landing usan `lang=es|en|pt-BR`; valores desconocidos o repetidos vuelven a español. El idioma del documento, metadata, canonical y alternates se renderizan en servidor. Los enlaces de acceso llevan a las rutas existentes, que conservan su validación de sesión. El tema se guarda como una preferencia no sensible en `localStorage`. Las preguntas frecuentes y los enlaces funcionan sin JavaScript.

`src/proxy.ts` crea un nonce aleatorio por respuesta, sobrescribe cualquier nonce/CSP enviado por el visitante y lo entrega a Next mediante las cabeceras de la petición. La CSP autoriza los scripts del framework con nonce y `strict-dynamic`, rechaza scripts inline sin nonce y manejadores de eventos HTML, limita conexiones al mismo origen y prohíbe frames, objetos y base URI. Solo el desarrollo admite `unsafe-eval` y WebSocket para HMR. Los atributos de estilo están permitidos porque React y Hydra los utilizan para dimensionar elementos; los bloques `<style>` requieren nonce u origen propio.

La lectura de cabeceras en el layout hace dinámico el HTML. No se debe habilitar caché compartida/ISR para esos documentos: cada CSP debe corresponder a sus scripts. Los assets compilados y metadata estática pueden cachearse. HTTPS de producción añade HSTS por un año, sin extenderlo a otros subdominios. Las rutas de la aplicación se marcan `noindex`; robots no es un control de acceso.

Referencia: [CSP en Next.js](https://nextjs.org/docs/app/guides/content-security-policy). La CSP, las cookies y el BFF reducen superficie de ataque; la autorización, el aislamiento de cuentas y el scope deben verificarse siempre en el backend.

## Operación

En producción usa HTTPS, SESSION_SECRET estable entre réplicas y APP_ORIGIN exacto. HYDRA_API_URL es configuración del operador, nunca entrada del usuario. La conexión remota al backend exige HTTPS; se permite HTTP loopback para un sidecar. No despliegues un backend públicamente accesible sin sus controles de acceso y red.

Configura límites de cuerpo y rate limiting en el ingress (login y solicitudes). El BFF utiliza timeouts y límites de lectura. El backend limita peticiones por API key. No se implementa un rate limiter en memoria que falle al desplegar múltiples réplicas.

Registro público no habilitado: el endpoint de creación de cuenta limita por IP TCP. Con un BFF todas las cuentas compartirían esa IP. Antes de habilitarlo se requiere una política explícita de proxies confiables/rate limiting en el backend; no se falsifica X-Forwarded-For para saltar el límite.

## Siguiente integración

Validar e integrar los contratos actuales para listado paginado de scans/dominios, identidad de cuenta, organizaciones/roles, assets/candidatos/exposures y grafo. El catálogo de acciones de este frontend sigue limitado al snapshot de integración documentado; actualizarlo requiere pruebas de permisos con el backend real. Firebase Auth por sí solo no autentica contra X-API-Key: requiere un puente verificado del backend antes de habilitar usuarios con contraseña.
