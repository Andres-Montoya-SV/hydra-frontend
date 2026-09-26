# Validación local — 2026-09-26

- `npm test`: 12 pruebas aprobadas (cifrado, manipulación de sesión, origen/CSRF, comandos permitidos, autorización de scan/Speed 2, inyección de rutas/cabeceras, aislamiento de campos de tenant, contrato de reportes, límites y validación upstream).
- `npm run build`: compilación de producción aprobada.
- `npm run typecheck`: aprobado.
- `npm run test:e2e`: 8 pruebas aprobadas (4 flujos × desktop/mobile) contra build de producción y backend fixture.
- Axe WCAG A/AA/2.1 AA: cero violaciones detectadas en las seis vistas autenticadas, desktop y móvil. Esto no sustituye una revisión manual completa de accesibilidad.
- `npm audit --audit-level=low`: cero vulnerabilidades reportadas.
- Revisión visual de captura desktop y pruebas de ausencia de overflow móvil.

Los fixtures no ejecutan scans ni llaman a servicios externos. La respuesta 404 a un recurso ajeno está simulada conforme al contrato; debe verificarse además con dos cuentas reales contra staging. No se recibió URL de despliegue ni credenciales reales de Hydra, por lo que no se declara validación end-to-end contra backend vivo.
