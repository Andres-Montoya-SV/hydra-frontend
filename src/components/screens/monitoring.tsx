"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input, Card, CardContent } from "../ui";
import type { Command } from "@/lib/contracts";
import { Title, useOperation, Outcome } from "../operation";
export function Monitoring() {
  const op = useOperation();
  const [domain, setDomain] = useState(""),
    [speed2, setSpeed2] = useState(false),
    [authorized, setAuthorized] = useState(false);
  return (
    <>
      <Title
        eyebrow="03 / CONTINUIDAD"
        title="Mantén los ojos abiertos."
        description="Monitoreo pasivo diario y, con autorización y plan compatible, análisis activo semanal."
      />
      <Card>
        <CardContent>
          <label htmlFor="monitor-domain">Dominio verificado</label>
          <Input
            id="monitor-domain"
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);
              setAuthorized(false);
            }}
            placeholder="example.com"
          />
          <label className="check">
            <input
              type="checkbox"
              checked={speed2}
              onChange={(e) => {
                setSpeed2(e.target.checked);
                setAuthorized(false);
              }}
            />
            Activar Speed 2: escaneo activo semanal (Pro / Ultra)
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={authorized}
              onChange={(e) => setAuthorized(e.target.checked)}
            />
            Confirmo el scope y autorizo la configuración seleccionada.
          </label>
          <div className="actions">
            <Button
              disabled={!domain || op.busy}
              variant="secondary"
              onClick={() => op.run({ action: "monitoring", domain })}
            >
              Consultar estado
            </Button>
            <Button
              disabled={!domain || !authorized || op.busy}
              onClick={() =>
                op.run({
                  action: "enableMonitoring",
                  domain,
                  speed2,
                  authorized: true,
                })
              }
            >
              Guardar monitoreo
            </Button>
          </div>
          {op.data?.needs_review === true && op.data?.domain === domain && (
            <div className="note">
              <strong>Revisión humana requerida</strong>
              <p>Revisa el cambio de superficie antes de reactivar Speed 2.</p>
              <Button
                disabled={!authorized || op.busy}
                onClick={() =>
                  op.run({ action: "acknowledge", domain, authorized: true })
                }
              >
                Confirmar revisión del scope
              </Button>
            </div>
          )}
          <details>
            <summary>Desactivar monitoreo</summary>
            <p>
              Se detendrá la planificación de nuevas ejecuciones para este
              dominio.
            </p>
            <Button
              variant="danger"
              disabled={!domain || op.busy}
              onClick={() => op.run({ action: "disableMonitoring", domain })}
            >
              Desactivar para {domain || "este dominio"}
            </Button>
          </details>
        </CardContent>
      </Card>
      <Outcome op={op} />
    </>
  );
}
