"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input, Card, CardContent } from "../ui";
import type { Command } from "@/lib/contracts";
import { Title, useOperation, Outcome } from "../operation";
export function Scans() {
  const op = useOperation();
  const [domain, setDomain] = useState(""),
    [id, setId] = useState(""),
    [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    if (typeof op.data?.scan_id === "string") setId(op.data.scan_id);
  }, [op.data]);
  return (
    <>
      <Title
        eyebrow="02 / DESCUBRIMIENTO"
        title="Explora con permiso."
        description="Hydra valida la verificación, el plan y la cuota antes de poner un escaneo en cola."
      />
      <div className="two-grid">
        <Card>
          <CardContent>
            <h2>Nuevo escaneo</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void op.run({ action: "scan", domain, authorized: true });
              }}
            >
              <label htmlFor="target">Dominio autorizado</label>
              <Input
                id="target"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setAuthorized(false);
                }}
                placeholder="example.com"
                required
              />
              <label className="check">
                <input
                  type="checkbox"
                  required
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
                />
                Tengo autorización explícita para escanear este dominio.
              </label>
              <Button type="submit" disabled={!authorized || op.busy}>
                Solicitar escaneo
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2>Consultar un escaneo</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void op.run({ action: "scanStatus", id });
              }}
            >
              <label htmlFor="scan">ID del escaneo</label>
              <Input
                id="scan"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
              <Button type="submit" variant="secondary" disabled={op.busy}>
                Consultar estado
              </Button>
            </form>
            <p>
              Conserva el ID. El backend todavía no ofrece una lista paginada de
              escaneos.
            </p>
          </CardContent>
        </Card>
      </div>
      <Outcome op={op} />
    </>
  );
}
