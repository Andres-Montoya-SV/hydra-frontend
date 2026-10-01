/** A nonce authorizes Next's scripts; inline event handlers remain forbidden. */
export function contentSecurityPolicy(
  nonce: string,
  development = false,
  https = true,
) {
  if (!/^[A-Za-z0-9+/]{22,}={0,2}$/.test(nonce))
    throw new Error("Invalid CSP nonce");
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${development ? " 'unsafe-eval'" : ""}`,
    "script-src-attr 'none'",
    `style-src 'self' 'nonce-${nonce}'`,
    // React and Hydra use style attributes for sizing and positioned surfaces.
    "style-src-attr 'unsafe-inline'",
    `connect-src 'self'${development ? " ws: wss:" : ""}`,
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
    "manifest-src 'self'",
    ...(https ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}
