# Hydra Frontend

Next.js App Router + TypeScript, construido sobre Hydra UI Vitral. Landing pública y consola de Hydra en **hydra.boqueronlabs.com**; **boqueronlabs.com** es el sitio corporativo independiente.

La portada está disponible en español (`/`), inglés (`/?lang=en`) y portugués de Brasil (`/?lang=pt-BR`), con temas claro/oscuro y movimiento reducido. El vitral y su grafo de puntos son una ilustración identificada como tal; no representan activos de una cuenta. La consola conserva datos reales y su interfaz en español.

## Ejecutar

Node.js 24 o superior.

```bash
npm ci
cp .env.example .env.local
# Completa SESSION_SECRET con: openssl rand -base64 32
# Configura HYDRA_API_URL y APP_ORIGIN
npm run dev
```

La landing funciona sin backend ni sesión. Para entrar a la consola, el backend Hydra debe estar activo: inicia sesión con una API key de la cuenta. No introduzcas una clave global compartida: cada sesión utiliza la clave de su propia cuenta. Ninguna variable de autenticación lleva el prefijo NEXT_PUBLIC_.

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

Esta consola implementa el subconjunto de contratos documentado en [docs/contracts.md](docs/contracts.md). Aún no integra listados paginados, inventario consolidado, organizaciones/roles, registro web ni login por contraseña; esto describe el alcance del frontend, no la ausencia de esas capacidades en el backend actual. Conserva los IDs de los escaneos. No se inventan conteos de assets ni gráficos de riesgo.

## Integración y seguridad

Lee [docs/architecture.md](docs/architecture.md), [docs/deployment.md](docs/deployment.md), [docs/contracts.md](docs/contracts.md) y [SECURITY.md](SECURITY.md).

Hydra UI todavía no está publicado en npm: `vendor/hydra-ui` contiene fuentes originales fijadas al commit documentado en [UPSTREAM.md](vendor/hydra-ui/UPSTREAM.md). Es un workspace local, no una dependencia flotante de GitHub. Se puede reemplazar por el paquete oficial al publicarse. No se incluyeron modificaciones locales pendientes de hydra-styling.

Los tests de navegador usan un backend fixture local, exclusivamente durante las pruebas. No sustituyen la validación de staging con el servicio Hydra y una cuenta real.
