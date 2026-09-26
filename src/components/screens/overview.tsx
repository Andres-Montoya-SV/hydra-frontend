"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input, Card, CardContent } from "../ui";
import type { Command } from "@/lib/contracts";
import { Title, useOperation, Outcome } from "../operation";
export function Overview() {
  const op = useOperation();
  useEffect(() => {
    void op.run({ action: "subscription" });
  }, []);
  return (
    <>
      <Title
        eyebrow="TU PERÍMETRO, EN PERSPECTIVA"
        title="Una mirada más profunda."
        description="Conecta el descubrimiento con decisiones. Empieza por lo que sabes que es tuyo."
      />
      <div className="hero-grid">
        <Card className="hero-card">
          <CardContent>
            <span className="pill">CONTROL DE SUPERFICIE</span>
            <h2>
              Todo empieza
              <br />
              con un dominio.
            </h2>
            <p>
              Verifica tu propiedad antes de explorar. Hydra conserva la
              autorización y la evidencia de cada paso.
            </p>
            <Link className="action-link" href="/scope">
              Configurar mi scope <span>↗</span>
            </Link>
          </CardContent>
          <div className="radar" aria-hidden="true">
            <div />
            <div />
            <div />
            <span>✳</span>
            <i />
            <b />
          </div>
        </Card>
        <Card>
          <CardContent>
            <p className="eyebrow">TU PLAN</p>
            <h2>
              {typeof op.data?.tier === "string"
                ? op.data.tier.toUpperCase()
                : "Cuenta Hydra"}
            </h2>
            {op.data ? (
              <>
                <div className="metric">
                  {String(op.data.scans_used_this_period)}
                  <small> / {String(op.data.scans_limit)}</small>
                </div>
                <p>Escaneos utilizados en este período</p>
                <p className="pill">{String(op.data.status)}</p>
                <p>
                  {String(op.data.verified_domains_count)} dominios verificados
                </p>
              </>
            ) : (
              <Outcome op={op} />
            )}
            <Button
              variant="ghost"
              onClick={() => op.run({ action: "subscription" })}
              disabled={op.busy}
            >
              Actualizar cuenta ↻
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="section-heading">
        <h2>Tu siguiente movimiento</h2>
        <span>UN FLUJO, CON CONTEXTO</span>
      </div>
      <div className="three-grid">
        {[
          [
            "01",
            "Verifica el scope",
            "Prueba la propiedad con un registro DNS o un archivo de verificación.",
            "scope",
          ],
          [
            "02",
            "Explora con intención",
            "Inicia un escaneo sobre un dominio autorizado y sigue su estado.",
            "scans",
          ],
          [
            "03",
            "Convierte evidencia en acción",
            "Consulta los resultados y genera un reporte para tu equipo.",
            "reports",
          ],
        ].map(([n, t, d, url]) => (
          <Card key={n}>
            <CardContent>
              <span className="step">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <Link className="text-link" href={"/" + url}>
                Abrir herramienta ↗
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="note roadmap">
        <strong>El inventario consolidado está en camino.</strong>
        <p>
          Assets candidatos, exposures y el grafo durable requieren los
          endpoints de las siguientes fases del backend. Esta consola trabaja
          con dominios, escaneos y reportes disponibles hoy; no presenta conteos
          simulados.
        </p>
      </div>
    </>
  );
}
