# Contratos verificados

Fuente: Andres-Montoya-SV/hydra, commit `35749f6cec830315840d20da2185ccce2ccd83ec`, archivos api/auth.py, api/schemas.py y api/routers/*.py.

| Vista            | Endpoint upstream                             |
| ---------------- | --------------------------------------------- |
| Login / panorama | GET /account/subscription                     |
| Scope            | POST /domains                                 |
| Scope            | POST /domains/{domain}/verify                 |
| Escaneos         | POST /scans                                   |
| Escaneos         | GET /scans/{id}                               |
| Reportes         | GET /scans/{id}/report                        |
| Reportes         | POST /scans/{id}/client-report                |
| Monitoreo        | GET /domains/{domain}/monitoring              |
| Monitoreo        | POST /domains/{domain}/monitoring             |
| Monitoreo        | POST /domains/{domain}/monitoring/acknowledge |
| Monitoreo        | DELETE /domains/{domain}/monitoring           |
| Ajustes          | GET /account/branding                         |
| Ajustes          | PUT /account/branding                         |
| Ajustes          | POST /accounts/verify-email                   |
| Ajustes          | POST /accounts/resend-verification            |
| Ajustes          | GET /webhooks                                 |

POST /scans requiere el dominio; el frontend añade su propia confirmación explícita, pero siempre conserva los gates del backend. No hay ejecución automática, promoción de candidatos ni heurística de autorización. Speed 2 no se activa por defecto. Acknowledge solo se ofrece tras recibir needs_review para el mismo dominio visible.

Los reportes se muestran como texto estructurado o texto plano. Nunca dangerouslySetInnerHTML. No se cargan recursos remotos incluidos en reportes. El BFF no expone endpoints admin, facturación mutante ni URLs arbitrarias.
