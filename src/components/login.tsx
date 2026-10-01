"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Input,
  HydraMark,
  OceanBackground,
  MotionProvider,
} from "./ui";
export function Login() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  return (
    <MotionProvider>
      <OceanBackground />
      <main className="login">
        <section className="login-story">
          <Link href="/" aria-label="Hydra — Boqueron Labs">
            <HydraMark width={72} />
          </Link>
          <p className="eyebrow">HYDRA SECURITY / EASM</p>
          <h1>
            Una perspectiva clara.
            <br />
            Un alcance definido.
          </h1>
          <p>
            Una perspectiva clara de tu superficie de ataque. Del descubrimiento
            a la evidencia, con el control siempre en tus manos.
          </p>
          <div className="ornament" aria-hidden="true">
            ✳
          </div>
          <small>Hecho para explorar. Diseñado para proteger.</small>
        </section>
        <section className="login-form panel">
          <p className="eyebrow">TU ESPACIO DE TRABAJO</p>
          <h2>Bienvenido a Hydra</h2>
          <p>Conecta tu cuenta con una API key existente.</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setError("");
              const form = e.currentTarget;
              const apiKey = new FormData(form).get("apiKey");
              try {
                const res = await fetch("/api/session", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ apiKey }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                form.reset();
                router.replace("/overview");
                router.refresh();
              } catch (err) {
                setError(
                  err instanceof Error ? err.message : "No se pudo conectar",
                );
              } finally {
                setBusy(false);
              }
            }}
          >
            <label htmlFor="key">API key de tu cuenta</label>
            <Input
              id="key"
              name="apiKey"
              type="password"
              autoComplete="off"
              required
              minLength={16}
              maxLength={512}
              placeholder="Ingresa tu API key"
            />
            <small>
              Tu clave se utiliza exclusivamente para autenticar esta sesión y
              las solicitudes a Hydra.
            </small>
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            <Button type="submit" disabled={busy}>
              {busy ? "Conectando…" : "Entrar al workspace →"}
            </Button>
          </form>
          <div className="note">
            <strong>¿Primera vez aquí?</strong>
            <p>
              Solicita acceso al administrador de tu organización. Cada cuenta
              utiliza su propia API key.
            </p>
          </div>
          <Link href="/" className="text-link">
            ← Conocer Hydra
          </Link>
        </section>
      </main>
    </MotionProvider>
  );
}
