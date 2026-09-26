# Seguridad

No publiques API keys, SESSION_SECRET ni reportes privados en issues. Reporta vulnerabilidades por el canal privado del propietario del repositorio.

- Sesión cifrada y HttpOnly; autorización real en Hydra.
- Validación de comandos, origen exacto, timeout, no-store, rechazo de redirects.
- Sin escaneo automático ni promoción implícita de candidatos.
- Dependencias exactas, lockfile, npm ci --ignore-scripts, auditoría y Actions fijadas por SHA.
- Los fixtures de pruebas son ficticios y no se usan en la aplicación.

Antes de exposición pública: configurar TLS, rate limits del ingress, manejo de secretos, alertas y probar aislamiento con dos cuentas reales en staging. No se declara este frontend listo para producción por pasar pruebas de fixtures.
