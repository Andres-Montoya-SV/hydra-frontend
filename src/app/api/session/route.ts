import { readBounded, PayloadTooLarge } from "@/lib/limits";
import { subscription } from "@/lib/responses";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE, seal, sameOrigin, validApiKey } from "@/lib/security";
import { upstream, messages } from "@/lib/upstream";
export async function POST(req: Request) {
  if (!sameOrigin(req, process.env.APP_ORIGIN ?? "http://localhost:3000"))
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  try {
    const text = await readBounded(req.body, 2048);
    if (text.length > 2048) return new Response(null, { status: 413 });
    const { apiKey } = JSON.parse(text);
    if (!validApiKey(apiKey))
      return NextResponse.json({ error: "API key inválida" }, { status: 400 });
    const check = await upstream(apiKey, "/account/subscription");
    if (!check.ok)
      return NextResponse.json(
        { error: messages[check.status] ?? "No fue posible validar la cuenta" },
        { status: check.status },
      );
    subscription.parse(JSON.parse(await readBounded(check.body, 16384)));
    const token = await seal(apiKey, process.env.SESSION_SECRET ?? "");
    (await cookies()).set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 28800,
    });
    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof PayloadTooLarge)
      return new Response(null, { status: 413 });
    return NextResponse.json(
      {
        error:
          "No fue posible conectar con Hydra. Revisa la configuración del servidor.",
      },
      { status: 503 },
    );
  }
}
export async function DELETE(req: Request) {
  if (!sameOrigin(req, process.env.APP_ORIGIN ?? "http://localhost:3000"))
    return new Response(null, { status: 403 });
  (await cookies()).delete(COOKIE);
  return new Response(null, { status: 204 });
}
