import { EncryptJWT, jwtDecrypt } from "jose";
import { createHash } from "node:crypto";
export const COOKIE = "hydra_session";
function key(secret: string) {
  if (secret.length < 32)
    throw new Error("SESSION_SECRET must contain at least 32 characters");
  return createHash("sha256").update(secret).digest();
}
export async function seal(apiKey: string, secret: string) {
  return new EncryptJWT({ apiKey })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .setIssuer("hydra-frontend")
    .setAudience("hydra-api")
    .encrypt(key(secret));
}
export async function unseal(token: string, secret: string) {
  try {
    const { payload } = await jwtDecrypt(token, key(secret), {
      issuer: "hydra-frontend",
      audience: "hydra-api",
    });
    return typeof payload.apiKey === "string" ? payload.apiKey : null;
  } catch {
    return null;
  }
}
export function sameOrigin(request: Request, origin: string) {
  return request.headers.get("origin") === new URL(origin).origin;
}
export function validApiKey(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length >= 16 &&
    value.length <= 512 &&
    !/[\s\x00-\x1f]/.test(value)
  );
}
