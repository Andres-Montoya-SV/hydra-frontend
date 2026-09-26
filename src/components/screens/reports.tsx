"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input, Card, CardContent } from "../ui";
import type { Command } from "@/lib/contracts";
import { Title, useOperation, Outcome } from "../operation";
export function Reports() {
  const op = useOperation();
  const [id, setId] = useState("");
  return (
    <>
      <Title
        eyebrow="04 / EVIDENCIA"
        title="La historia detrás del hallazgo."
        description="Consulta un escaneo completado y genera su reporte de cliente en español."
      />
      <Card>
        <CardContent>
          <label htmlFor="report-id">ID de escaneo</label>
          <Input
            id="report-id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <div className="actions">
            <Button
              disabled={!id || op.busy}
              onClick={() => op.run({ action: "report", id })}
            >
              Consultar evidencia JSON
            </Button>
            <Button
              disabled={!id || op.busy}
              variant="secondary"
              onClick={() =>
                op.run({ action: "clientReport", id, language: "es" })
              }
            >
              Generar reporte Markdown
            </Button>
          </div>
          {op.data && (
            <Button
              variant="outline"
              onClick={() => {
                const text =
                  typeof op.data?.report === "string"
                    ? op.data.report
                    : JSON.stringify(op.data, null, 2);
                const url = URL.createObjectURL(
                  new Blob([text], { type: "text/plain" }),
                );
                const a = document.createElement("a");
                a.href = url;
                a.download =
                  "hydra-report." +
                  (typeof op.data?.report === "string" ? "md" : "json");
                a.click();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
              }}
            >
              Descargar resultado
            </Button>
          )}
        </CardContent>
      </Card>
      <Outcome op={op} />
    </>
  );
}
