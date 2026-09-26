"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input, Card, CardContent } from "../ui";
import type { Command } from "@/lib/contracts";
import { Title, useOperation, Outcome } from "../operation";
export function Settings() {
  const op = useOperation();
  const [name, setName] = useState(""),
    [token, setToken] = useState("");
  return (
    <>
      <Title
        eyebrow="WORKSPACE / CONFIGURACIÓN"
        title="Tu cuenta, bajo control."
        description="Verificación, identidad de reportes e integraciones disponibles para tu cuenta."
      />
      <div className="two-grid">
        <Card>
          <CardContent>
            <h2>Correo de la cuenta</h2>
            <p>
              Confirma tu correo usando el token recibido. Hydra requiere esta
              verificación antes de escanear.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void op.run({ action: "verifyEmail", token });
                setToken("");
              }}
            >
              <label htmlFor="token">Token de verificación</label>
              <Input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                autoComplete="off"
              />
              <Button type="submit" disabled={op.busy}>
                Confirmar correo
              </Button>
            </form>
            <Button
              variant="ghost"
              disabled={op.busy}
              onClick={() => op.run({ action: "resend" })}
            >
              Reenviar correo
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2>Identidad de reportes</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void op.run({ action: "saveBranding", company_name: name });
              }}
            >
              <label htmlFor="company">Nombre de empresa</label>
              <Input
                id="company"
                maxLength={160}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Button type="submit" disabled={op.busy}>
                Guardar identidad
              </Button>
            </form>
            <Button
              variant="ghost"
              disabled={op.busy}
              onClick={() => op.run({ action: "branding" })}
            >
              Consultar identidad actual
            </Button>
            <p>El uso de reportes white-label depende del plan Ultra.</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
          <h2>Integraciones</h2>
          <p>
            Consulta los webhooks registrados, su estado y sus últimos
            resultados.
          </p>
          <Button
            disabled={op.busy}
            variant="secondary"
            onClick={() => op.run({ action: "webhooks" })}
          >
            Consultar webhooks
          </Button>
        </CardContent>
      </Card>
      <Outcome op={op} />
      <div className="note">
        <strong>Gestión de usuarios</strong>
        <p>
          El backend aún no expone edición de perfil, contraseñas, invitaciones
          ni eliminación de cuenta. Estas acciones requieren contratos del
          servidor; no se simulan en el navegador.
        </p>
      </div>
    </>
  );
}
