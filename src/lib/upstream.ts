import "server-only";
export async function upstream(
  apiKey: string,
  path: string,
  method = "GET",
  body?: unknown,
) {
  const base = new URL(process.env.HYDRA_API_URL ?? "http://127.0.0.1:8000");
  if (
    base.username ||
    base.password ||
    base.search ||
    base.hash ||
    !["http:", "https:"].includes(base.protocol)
  )
    throw new Error("Invalid API configuration");
  if (
    process.env.NODE_ENV === "production" &&
    base.protocol !== "https:" &&
    !["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)
  )
    throw new Error("HTTPS required");
  return fetch(new URL(path, base), {
    method,
    headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(20000),
  });
}
export const messages: Record<number, string> = {
  401: "La sesión expiró o la API key fue revocada. Inicia sesión nuevamente.",
  403: "La cuenta no tiene permiso, verificación o plan suficiente para esta operación.",
  404: "No se encontró este recurso para tu cuenta.",
  409: "La operación entra en conflicto con el estado actual.",
  422: "Revisa los datos y los requisitos de esta operación.",
  429: "Alcanzaste un límite de solicitudes o de tu plan. Intenta más tarde.",
};
