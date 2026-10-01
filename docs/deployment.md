# Dominios y tres servidores

`boqueronlabs.com` es el sitio corporativo. Este repositorio sirve la landing y la aplicación de `hydra.boqueronlabs.com`. Su publicación en Git no configura DNS, certificados ni servidores.

| Servidor         | Responsabilidad                                    | Acceso permitido                                                                 |
| ---------------- | -------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1. Frontend      | Next.js, landing, consola y BFF `/api/*`           | HTTPS público; salida hacia la API privada                                       |
| 2. Backend       | API Hydra, permisos, scope y ejecución de trabajos | Entrada desde el FE por red privada y HTTPS; salida a BD y servicios autorizados |
| 3. Base de datos | PostgreSQL del plano de control                    | Red privada, únicamente desde el backend; sin acceso desde FE o navegador        |

El backend conserva sus controles de autenticación y autorización aunque la red solo admita al FE. Los checks de la interfaz se pueden eludir; cada recurso y acción requiere controles de tenant, rol y scope en el servidor que los procesa. Los workers de escaneo también necesitan el confinamiento y la política de egreso definidos por Hydra.

## Variables del frontend

Configura en el gestor de secretos/entorno del servidor 1:

```dotenv
APP_ORIGIN=https://hydra.boqueronlabs.com
HYDRA_API_URL=https://NOMBRE-PRIVADO-DEL-BACKEND
SESSION_SECRET=VALOR-ALEATORIO-GENERADO-POR-EL-OPERADOR
```

Los valores de ejemplo no son utilizables. Genera `SESSION_SECRET` con `openssl rand -base64 32`, mantenlo fuera de Git y usa el mismo secreto entre réplicas del FE. Rotarlo invalida las sesiones. El FE rechaza HTTP remoto en producción; la excepción HTTP loopback solo sirve para desarrollo o un proxy TLS local. No desactives la verificación de certificados.

No declares API keys ni credenciales de BD como `NEXT_PUBLIC_*`. Cada usuario introduce la API key de su propia cuenta. El FE no recibe credenciales de PostgreSQL. Mantén `APP_ORIGIN` exacto; no añadas comodines ni el origen corporativo como origen autorizado para mutaciones.

## Build y ejecución

Node 24 o superior. En una copia limpia del commit aprobado:

```bash
npm ci --ignore-scripts
npm run check
npm audit --audit-level=low
npx playwright install --with-deps chromium
npm run test:e2e
npm start -- --hostname 127.0.0.1 --port 3000
```

Un ingress en el mismo servidor termina TLS y reenvía a Next. Si el ingress está en otra máquina, adapta el bind y firewall a esa red privada. Mantén el proceso bajo un supervisor y usuario sin privilegios. Sirve únicamente el host esperado y configura límites de cuerpo/tiempo y rate limiting, especialmente para `/api/session` y `/api/command`, antes de exposición pública.

El HTML usa un nonce CSP nuevo por petición y `Cache-Control: private, no-store`. No lo caches en CDN/ingress ni retires las cabeceras de seguridad. `/_next/static/*` puede conservar su caché de assets. La landing no requiere backend, pero entrar a la aplicación sí requiere una API accesible y compatible.

## Persistencia del backend

Hydra ya incluye PostgreSQL para el plano de control mediante `HYDRA_API_DATABASE_URL`. Referencia revisada: [`api/db.py` en `5b654b7`](https://github.com/Andres-Montoya-SV/hydra/blob/5b654b7aba86e3f4d4111d1f9098bdfb51a6f561/api/db.py) y [`api/.env.example`](https://github.com/Andres-Montoya-SV/hydra/blob/5b654b7aba86e3f4d4111d1f9098bdfb51a6f561/api/.env.example). Esa variable pertenece al servidor 2, no a Next.

Separar PostgreSQL no mueve automáticamente los resultados y artefactos de escaneo. Define su volumen/almacenamiento duradero, retención, permisos y copias de seguridad junto con la base de datos, y prueba la restauración. Este cambio no migra bases de datos ni configura los workers.

## Validación de staging pendiente del entorno

Las pruebas del repositorio usan un backend fixture. Antes de servir cuentas reales, comprueba con dos cuentas distintas la denegación de lectura y mutaciones cruzadas, revocación de API keys, límites de uso y scope de escaneos contra el backend desplegado. Comprueba también cookies Secure sobre HTTPS, origen corporativo rechazado para mutaciones, headers CSP/HSTS preservados por ingress, rate limiting y logs sin secretos/reportes privados.

La sesión cifrada expira en ocho horas. Logout elimina la cookie del navegador, pero no revoca una copia robada: sigue haciendo falta revocar la API key para invalidarla antes del vencimiento. La aplicación aún no tiene registro público ni un almacén de revocación por sesión. No se afirma ausencia de vulnerabilidades ni preparación de toda la infraestructura por completar estas pruebas locales.
