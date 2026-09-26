import type { Metadata } from "next";
import "@hydra-security/ui/styles.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Hydra · Attack Surface",
  description: "Hydra Security — conoce y protege tu superficie de ataque.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="nocturne">
      <body>{children}</body>
    </html>
  );
}
