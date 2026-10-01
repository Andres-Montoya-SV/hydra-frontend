"use client";
import {
  ThemeProvider,
  LocaleProvider,
  MotionProvider,
  HydraMark,
  useHydraTheme,
} from "@hydra-security/ui";
import { copy, type Language } from "./copy";
import type { ReactNode } from "react";
export function LandingFrame({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Language;
}) {
  return (
    <LocaleProvider
      locale={locale === "es" ? "es-SV" : locale === "en" ? "en-US" : locale}
    >
      <ThemeProvider storageKey="hydra:theme">
        <MotionProvider>
          <div className="landing">{children}</div>
        </MotionProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
export function BrandMark() {
  return <HydraMark aria-hidden="true" width={40} height={40} />;
}
export function ThemeSwitch({ locale }: { locale: Language }) {
  const { theme, setTheme } = useHydraTheme();
  const dark = theme === "nocturne",
    t = copy[locale];
  return (
    <button
      className="landing-theme"
      type="button"
      onClick={() => setTheme(dark ? "daylight" : "nocturne")}
      aria-label={dark ? t.light : t.dark}
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </>
        ) : (
          <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />
        )}
      </svg>
    </button>
  );
}
