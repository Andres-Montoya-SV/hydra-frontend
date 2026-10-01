import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { contentSecurityPolicy } from "@/lib/browser-policy";
import { language } from "@/components/landing/copy";
/** Defense in depth only. Route handlers and protected layouts own authentication. */
export function proxy(request: NextRequest) {
  const development = process.env.NODE_ENV === "development";
  const https =
    request.nextUrl.protocol === "https:" ||
    (!development && process.env.APP_ORIGIN?.startsWith("https://") === true);
  const nonce = randomBytes(16).toString("base64");
  const csp = contentSecurityPolicy(nonce, development, https);
  const headers = new Headers(request.headers);
  // Always overwrite visitor-provided values before Next renders the document.
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", csp);
  const values = request.nextUrl.searchParams.getAll("lang");
  headers.set(
    "x-hydra-language",
    request.nextUrl.pathname === "/" && values.length === 1
      ? language(values[0])
      : "es",
  );
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", csp);
  // Per-response nonces must never be paired with a cached HTML document.
  response.headers.set("Cache-Control", "private, no-store");
  if (https && !development)
    response.headers.set("Strict-Transport-Security", "max-age=31536000");
  if (request.nextUrl.pathname !== "/")
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|icon.svg|opengraph-image|robots.txt|sitemap.xml).*)",
  ],
};
