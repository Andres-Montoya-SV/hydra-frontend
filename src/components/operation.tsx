"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input, Card, CardContent } from "./ui";
import type { Command } from "@/lib/contracts";
type Result = Record<string, unknown>;
async function call(command: Command) {
  const response = await fetch("/api/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  if (response.status === 204) return { status: "Operación completada" };
  const json = response.headers.get("content-type")?.includes("json");
  const data = json ? await response.json() : { report: await response.text() };
  if (!response.ok)
    throw Error(data.error ?? "No se pudo completar la operación");
  return data;
}
export function Title({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title}
        <span className="heading-star" aria-hidden="true">
          ✳
        </span>
      </h1>
      <p>{description}</p>
    </div>
  );
}
function Display({ value }: { value: unknown }) {
  if (typeof value === "object" && value !== null)
    return (
      <dl className="results">
        {Object.entries(value).map(([key, v]) => (
          <div key={key}>
            <dt>{key.replaceAll("_", " ")}</dt>
            <dd>
              {v === null ? (
                "—"
              ) : typeof v === "object" ? (
                <Display value={v} />
              ) : (
                String(v)
              )}
            </dd>
          </div>
        ))}
      </dl>
    );
  return <span>{String(value ?? "—")}</span>;
}
export function useOperation() {
  const [data, setData] = useState<Result | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function run(c: Command) {
    setBusy(true);
    setError("");
    setData(null);
    try {
      setData(await call(c));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de conexión");
    } finally {
      setBusy(false);
    }
  }
  return { data, error, busy, run };
}
export function Outcome({ op }: { op: ReturnType<typeof useOperation> }) {
  return (
    <div aria-live="polite">
      {op.busy && <p role="status">Consultando Hydra…</p>}
      {op.error && (
        <p className="error" role="alert">
          {op.error}
        </p>
      )}
      {op.data && (
        <div className="output">
          <h3>Respuesta de Hydra</h3>
          <Display value={op.data} />
        </div>
      )}
    </div>
  );
}
