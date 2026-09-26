"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HydraMark, MotionProvider, OceanBackground, Button } from "./ui";
const nav = [
  ["overview", "◈", "Panorama"],
  ["scope", "◎", "Dominios y scope"],
  ["scans", "⌁", "Escaneos"],
  ["monitoring", "◷", "Monitoreo"],
  ["reports", "▤", "Reportes"],
  ["settings", "⚙", "Cuenta y ajustes"],
];
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [motion, setMotion] = useState(true);
  const [error, setError] = useState("");
  return (
    <MotionProvider enabled={motion}>
      <OceanBackground />
      <a href="#content" className="skip">
        Saltar al contenido
      </a>
      <div className="shell">
        <aside className="sidebar">
          <Link href="/overview" className="brand">
            <HydraMark width={43} />
            <span>
              Hydra<small>SECURITY</small>
            </span>
          </Link>
          <div className="workspace-badge">
            <span className="dot" /> Workspace privado
            <small>EXTERNAL ATTACK SURFACE</small>
          </div>
          <p className="nav-label">EXPLORAR</p>
          <nav aria-label="Navegación principal">
            {nav.map(([slug, icon, label]) => (
              <Link
                key={slug}
                href={"/" + slug}
                aria-current={path === "/" + slug ? "page" : undefined}
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <p>Visibilidad con propósito.</p>
            <small>Cada acción, dentro de tu scope.</small>
            <button onClick={() => setMotion((v) => !v)} aria-pressed={motion}>
              Animaciones: {motion ? "activas" : "pausadas"}
            </button>
          </div>
        </aside>
        <div className="main-column">
          <header className="topbar">
            <span>
              <span className="dot" /> CONSOLA EASM
            </span>
            <div>
              <span className="avatar">H</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  try {
                    const r = await fetch("/api/session", { method: "DELETE" });
                    if (!r.ok) throw Error();
                    router.replace("/login");
                    router.refresh();
                  } catch {
                    setError(
                      "No se pudo cerrar la sesión. Intenta nuevamente.",
                    );
                  }
                }}
              >
                Cerrar sesión ↗
              </Button>
            </div>
          </header>
          {error && <p role="alert">{error}</p>}
          <main id="content" className="content">
            {children}
          </main>
          <footer>
            <span>
              Hydra Security <b>✳</b> Una superficie. Toda la perspectiva.
            </span>
            <span>Scope explícito · Evidencia primero</span>
          </footer>
        </div>
      </div>
    </MotionProvider>
  );
}
