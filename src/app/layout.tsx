import type { Metadata } from "next";
import { headers } from "next/headers";
import { language } from "@/components/landing/copy";
import "@hydra-security/ui/styles.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://hydra.boqueronlabs.com"),
  title: "Hydra · Boqueron Labs",
  description:
    "Hydra, la plataforma EASM de Boqueron Labs. Descubrimiento, contexto y evidencia para tu superficie de ataque.",
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // headers() opts every HTML page into request-time rendering for nonce CSP.
  const locale = language((await headers()).get("x-hydra-language"));
  return (
    <html lang={locale} data-hydra-theme="nocturne">
      <body>{children}</body>
    </html>
  );
}
