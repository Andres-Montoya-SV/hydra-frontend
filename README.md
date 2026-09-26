# Hydra Frontend

Next.js App Router + TypeScript, construido sobre Hydra UI. Interfaz en español, responsive, sin datos ficticios en producción.

## Ejecutar

Node.js 24 o superior.

```bash
npm ci
cp .env.example .env.local
# Completa SESSION_SECRET con: openssl rand -base64 32
# Configura HYDRA_API_URL y APP_ORIGIN
npm run dev
```

El backend Hydra debe estar activo. Inicia sesión con una API key de la cuenta. No introduzcas una clave global compartida: cada sesión utiliza la clave de su propia cuenta. Ninguna variable de autenticación lleva el prefijo NEXT_PUBLIC_.

```bash
npm run check
npx playwright install chromium
npm run test:e2e
npm audit --audit-level=low
npm run build
npm start
```

## Funciones conectadas

- Panorama: suscripción, consumo de cuota y dominios verificados.
- Scope: instrucciones DNS/archivo y verificación de propiedad.
- Escaneos: solicitud explícita y consulta por ID.
- Monitoreo: consulta, configuración Speed 1/2, revisión humana y desactivación.
- Reportes: evidencia JSON y generación/descarga Markdown sin ejecutar HTML.
- Ajustes: verificación de correo, identidad de reportes y consulta de webhooks.

La API actual no ofrece listados de scans/dominios ni endpoints públicos del inventario consolidado. Conserva los IDs de los escaneos. No se inventan conteos de assets ni gráficos de riesgo. Login de contraseña, invitaciones, edición de perfil, eliminación de cuenta, registro web y administración de usuarios están pendientes de contratos seguros del backend.

## Integración y seguridad

Lee [docs/architecture.md](docs/architecture.md), [docs/contracts.md](docs/contracts.md) y [SECURITY.md](SECURITY.md).

Hydra UI todavía no está publicado en npm: `vendor/hydra-ui` contiene fuentes originales fijadas al commit documentado en [UPSTREAM.md](vendor/hydra-ui/UPSTREAM.md). Es un workspace local, no una dependencia flotante de GitHub. Se puede reemplazar por el paquete oficial al publicarse. No se incluyeron modificaciones locales pendientes de hydra-styling.

Los tests de navegador usan un backend fixture local, exclusivamente durante las pruebas. No sustituyen la validación de staging con el servicio Hydra y una cuenta real.
