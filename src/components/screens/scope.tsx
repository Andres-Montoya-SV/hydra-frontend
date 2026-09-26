"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input, Card, CardContent } from "../ui";
import type { Command } from "@/lib/contracts";
import { Title, useOperation, Outcome } from "../operation";
export function Scope() {
  const op = useOperation();
  const [domain, setDomain] = useState("");
  const [method, setMethod] = useState<"dns_txt" | "well_known_file">(
    "dns_txt",
  );
  return (
    <>
      <Title
        eyebrow="01 / AUTORIZACIÓN"
        title="Define tu territorio."
        description="Registrar un dominio genera instrucciones de verificación. No inicia un escaneo."
      />
      <div className="two-grid">
        <Card>
          <CardContent>
            <h2>Registrar dominio</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void op.run({ action: "registerDomain", domain });
              }}
            >
              <label htmlFor="domain">Dominio</label>
              <Input
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                required
              />
              <Button disabled={op.busy} type="submit">
                Obtener instrucciones
              </Button>
            </form>
            <p>
              Guarda el registro TXT o coloca el archivo que indica la
              respuesta. Después solicita la verificación.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2>Confirmar propiedad</h2>
            <label htmlFor="method">Método de verificación</label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value as typeof method)}
            >
              <option value="dns_txt">Registro DNS TXT</option>
              <option value="well_known_file">Archivo .well-known</option>
            </select>
            <p>
              Se verificará el dominio ingresado:{" "}
              <strong>{domain || "ninguno seleccionado"}</strong>.
            </p>
            <Button
              disabled={!domain || op.busy}
              onClick={() => op.run({ action: "verifyDomain", domain, method })}
            >
              Verificar dominio
            </Button>
          </CardContent>
        </Card>
      </div>
      <Outcome op={op} />
    </>
  );
}
