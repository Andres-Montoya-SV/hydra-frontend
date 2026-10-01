import type { Metadata } from "next";
import { copy, language, type Language } from "@/components/landing/copy";
import {
  LandingFrame,
  BrandMark,
  ThemeSwitch,
} from "@/components/landing/controls";
import { VitralArtwork, CapabilityIcon } from "@/components/landing/artwork";
import "./landing.css";
type Props = { searchParams: Promise<{ lang?: string | string[] }> };
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const locale = language((await searchParams).lang),
    t = copy[locale];
  const url = locale === "es" ? "/" : `/?lang=${locale}`;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        es: "/",
        en: "/?lang=en",
        "pt-BR": "/?lang=pt-BR",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url,
      siteName: "Hydra · Boqueron Labs",
      type: "website",
      locale: locale === "es" ? "es_SV" : locale === "en" ? "en_US" : "pt_BR",
    },
  };
}
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}
function LocaleMenu({ locale }: { locale: Language }) {
  return (
    <details className="landing-languages">
      <summary aria-label={copy[locale].langName}>
        {locale === "pt-BR" ? "PT" : locale.toUpperCase()}
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
        >
          <path d="m3 4 3 3 3-3" />
        </svg>
      </summary>
      <ul>
        {(
          [
            ["es", "Español"],
            ["en", "English"],
            ["pt-BR", "Português (Brasil)"],
          ] as const
        ).map(([code, name]) => (
          <li key={code}>
            <a
              href={code === "es" ? "/" : `/?lang=${code}`}
              hrefLang={code}
              lang={code}
              aria-current={locale === code ? "page" : undefined}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
export default async function Page({ searchParams }: Props) {
  const locale = language((await searchParams).lang),
    t = copy[locale];
  return (
    <LandingFrame locale={locale}>
      <a href="#main-content" className="landing-skip">
        {t.skip}
      </a>
      <header className="landing-header landing-container">
        <a
          href={locale === "es" ? "/" : `/?lang=${locale}`}
          className="landing-brand"
          aria-label="Hydra — Boqueron Labs"
        >
          <BrandMark />
          <span>
            Hydra<small>BY BOQUERON LABS</small>
          </span>
        </a>
        <nav aria-label={t.platform} className="landing-nav">
          <a href="#platform">{t.platform}</a>
          <a href="#method">{t.method}</a>
          <a href="#questions">{t.questions}</a>
        </nav>
        <div className="landing-tools">
          <ThemeSwitch locale={locale} />
          <LocaleMenu locale={locale} />
          <a href="/login" className="landing-signin">
            {t.login}
            <Arrow diagonal />
          </a>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section
          className="landing-hero landing-container"
          aria-labelledby="hero-title"
        >
          <div className="landing-hero-copy">
            <p className="landing-eyebrow">
              <span className="landing-line" />
              {t.eyebrow}
            </p>
            <h1 id="hero-title">
              {t.headline}
              <br />
              <em>{t.headlineAccent}</em>
            </h1>
            <p className="landing-description">{t.description}</p>
            <div className="landing-hero-actions">
              <a
                className="landing-button landing-button-primary"
                href="/overview"
              >
                {t.primary}
                <Arrow />
              </a>
              <a className="landing-secondary" href="#platform">
                {t.secondary}
                <Arrow diagonal />
              </a>
            </div>
            <p className="landing-access">
              <svg
                aria-hidden="true"
                width="13"
                height="15"
                viewBox="0 0 13 15"
                fill="none"
                stroke="currentColor"
              >
                <path d="M3 6V4a3.5 3.5 0 0 1 7 0v2M2 6h9v8H2ZM6.5 9v2" />
              </svg>
              {t.access}
            </p>
            <a className="landing-scroll" href="#platform">
              <span aria-hidden="true">↓</span>
              {t.scroll}
            </a>
          </div>
          <VitralArtwork t={t} />
        </section>
        <section
          className="landing-platform landing-container"
          id="platform"
          aria-labelledby="platform-title"
        >
          <div className="landing-section-heading">
            <div>
              <p className="landing-eyebrow">{t.introLabel}</p>
              <h2 id="platform-title">{t.introTitle}</h2>
            </div>
            <p>{t.introBody}</p>
          </div>
          <div className="landing-capabilities">
            {t.capabilities.map((item, i) => (
              <article key={item.tag}>
                <div className="landing-capability-top">
                  <CapabilityIcon index={i} />
                  <span>0{i + 1}</span>
                </div>
                <p className="landing-tag">{item.tag}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="landing-method landing-container"
          id="method"
          aria-labelledby="method-title"
        >
          <div className="landing-method-copy">
            <p className="landing-eyebrow">{t.methodLabel}</p>
            <h2 id="method-title">{t.methodTitle}</h2>
            <p>{t.methodBody}</p>
            <a href="/overview" className="landing-secondary">
              {t.primary}
              <Arrow diagonal />
            </a>
          </div>
          <ol className="landing-steps">
            {t.steps.map((step, i) => (
              <li key={step.title}>
                <span className="landing-step-number">0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section
          className="landing-principle landing-container"
          aria-labelledby="principle-title"
        >
          <div className="landing-principle-art" aria-hidden="true">
            <div />
            <div />
            <div />
            <span>✦</span>
          </div>
          <div>
            <p className="landing-eyebrow">{t.principleLabel}</p>
            <h2 id="principle-title">{t.principleTitle}</h2>
            <p>{t.principleBody}</p>
            <p className="landing-principle-note">{t.principleNote}</p>
          </div>
        </section>
        <section
          className="landing-faq landing-container"
          id="questions"
          aria-labelledby="questions-title"
        >
          <div>
            <p className="landing-eyebrow">{t.faqLabel}</p>
            <h2 id="questions-title">{t.faqTitle}</h2>
          </div>
          <div className="landing-faq-list">
            {t.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          className="landing-closing landing-container"
          aria-labelledby="closing-title"
        >
          <div>
            <p className="landing-eyebrow">HYDRA / BOQUERON LABS</p>
            <h2 id="closing-title">{t.closingTitle}</h2>
            <p>{t.closingBody}</p>
          </div>
          <a className="landing-button landing-button-primary" href="/overview">
            {t.primary}
            <Arrow />
          </a>
        </section>
      </main>
      <footer className="landing-footer landing-container">
        <div>
          <a href="https://boqueronlabs.com" className="landing-parent">
            BOQUERON<span>LABS</span>
            <Arrow diagonal />
          </a>
          <p>{t.footerLine}</p>
        </div>
        <div className="landing-footer-links">
          <a href="https://github.com/Andres-Montoya-SV/hydra">
            {t.source}
            <Arrow diagonal />
          </a>
          <small>
            © {new Date().getUTCFullYear()} Hydra. {t.copyright}
          </small>
        </div>
      </footer>
    </LandingFrame>
  );
}
