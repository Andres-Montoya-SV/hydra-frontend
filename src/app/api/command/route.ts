import { readBounded, PayloadTooLarge } from "@/lib/limits";
import { validateResponse } from "@/lib/responses";
import { NextResponse } from "next/server";
import { session } from "@/lib/session";
import { sameOrigin } from "@/lib/security";
import { command, endpoint } from "@/lib/contracts";
import { upstream, messages } from "@/lib/upstream";
export async function POST(req: Request) {
  if (!sameOrigin(req, process.env.APP_ORIGIN ?? "http://localhost:3000"))
    return new Response(null, { status: 403 });
  const key = await session();
  if (!key)
    return NextResponse.json(
      { error: "Inicia sesión para continuar." },
      { status: 401 },
    );
  let input;
  try {
    const text = await readBounded(req.body, 8192);
    if (text.length > 8192) return new Response(null, { status: 413 });
    input = command.safeParse(JSON.parse(text));
  } catch (error) {
    return new Response(null, {
      status: error instanceof PayloadTooLarge ? 413 : 400,
    });
  }
  if (!input.success)
    return NextResponse.json(
      { error: "Datos inválidos. Revisa los campos y la autorización." },
      { status: 400 },
    );
  try {
    const e = endpoint(input.data);
    const res = await upstream(key, e.path, e.method, e.body);
    if (!res.ok)
      return NextResponse.json(
        {
          error:
            messages[res.status] ?? "Hydra no pudo completar esta operación.",
        },
        { status: res.status >= 400 && res.status < 600 ? res.status : 502 },
      );
    if (res.status === 204) return new Response(null, { status: 204 });
    const text = await readBounded(res.body, 8_000_000);
    if (input.data.action !== "clientReport") {
      const result = validateResponse(input.data, JSON.parse(text));
      return NextResponse.json(result, {
        status: res.status,
        headers: { "Cache-Control": "no-store" },
      });
    }
    return new Response(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type")?.includes("json")
          ? "application/json"
          : "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof PayloadTooLarge
            ? "El reporte supera el límite de visualización."
            : "Hydra no responde o devolvió datos incompatibles. Intenta nuevamente.",
      },
      { status: error instanceof PayloadTooLarge ? 413 : 502 },
    );
  }
}
