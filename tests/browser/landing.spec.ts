import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("public landing has working navigation, FAQ and real access routes", async ({
  page,
  context,
}, info) => {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /Content Security Policy/i.test(message.text())
    )
      failures.push(message.text());
  });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Tu superficie de ataque,a la luz.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://hydra.boqueronlabs.com",
  );
  expect((await context.cookies()).length).toBe(0);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  await page
    .getByRole("navigation", { name: "Plataforma" })
    .getByRole("link", { name: "Cómo funciona" })
    .click();
  await expect(page).toHaveURL(/#method$/);
  await expect(page.locator("#method")).toBeInViewport();
  await page
    .locator("#questions summary")
    .filter({ hasText: "¿Cómo accedo a la aplicación?" })
    .click();
  await expect(page.locator("#questions details[open]")).toContainText(
    "API key de tu cuenta",
  );
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: `test-results/landing-nocturne-${info.project.name}.png`,
    fullPage: true,
  });
  await page
    .getByRole("link", { name: "Entrar a Hydra", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL("/login");
  await expect(page.getByLabel("API key de tu cuenta")).toBeVisible();
  expect(failures).toEqual([]);
});
test("landing is translated, accessible and responsive in both themes", async ({
  page,
}, info) => {
  test.setTimeout(90_000);
  for (const [lang, title, switchLabel] of [
    ["es", "Tu superficie de ataque", "Usar tema claro"],
    ["en", "Your attack surface", "Use light theme"],
    ["pt-BR", "Sua superfície de ataque", "Usar tema claro"],
  ]) {
    await page.goto(`/?lang=${lang}`);
    // Clear only this preference so every language starts in the same theme.
    await page.evaluate(() => localStorage.removeItem("hydra:theme"));
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(title);
    for (const theme of ["nocturne", "daylight"]) {
      if (theme === "daylight")
        await page
          .getByRole("button", { name: switchLabel, exact: true })
          .click();
      await expect(page.locator(".hydra-theme")).toHaveAttribute(
        "data-hydra-theme",
        theme,
      );
      await page.evaluate(async () => {
        for (let pass = 0; pass < 10; pass++) {
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
          const running = document
            .getAnimations()
            .filter(
              (a) =>
                (a.playState === "running" || a.pending) &&
                a.effect?.getComputedTiming().iterations !== Infinity,
            );
          if (!running.length) return;
          await Promise.all(running.map((a) => a.finished.catch(() => {})));
        }
        throw Error("Theme did not settle");
      });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations, `${lang}/${theme}`).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (lang === "es" && theme === "daylight")
        await page.screenshot({
          path: `test-results/landing-daylight-${info.project.name}.png`,
          fullPage: true,
        });
    }
  }
});
test("language menu changes document language and theme preference survives reload", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Usar tema claro" }).click();
  await page.locator(".landing-languages summary").click();
  await page.getByRole("link", { name: "English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".hydra-theme")).toHaveAttribute(
    "data-hydra-theme",
    "daylight",
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Use dark theme" }),
  ).toBeVisible();
  await page.goto("/?lang=unsupported");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});
test("nonce CSP blocks injected scripts and is fresh for each document", async ({
  page,
  request,
}) => {
  const a = await request.get("/", {
    headers: {
      "x-nonce": "attacker",
      "Content-Security-Policy": "script-src 'unsafe-inline'",
    },
  });
  const b = await request.get("/");
  const first = a.headers()["content-security-policy"],
    second = b.headers()["content-security-policy"];
  expect(first).toContain("'strict-dynamic'");
  expect(first).not.toContain("attacker");
  expect(first).not.toBe(second);
  expect(
    first.split(";").find((v) => v.trim().startsWith("script-src ")),
  ).not.toMatch(/unsafe-inline|unsafe-eval/);
  expect(a.headers()["cache-control"]).toContain("no-store");
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      document.documentElement.setAttribute(
        "data-policy-violation",
        event.effectiveDirective,
      );
    });
  });
  // Inject untrusted HTML before parsing. DevTools evaluate() is trusted execution.
  await page.route("http://localhost:3100/", async (route) => {
    const response = await route.fetch();
    const html = await response.text();
    await route.fulfill({
      response,
      body: html.replace(
        "</body>",
        '<script>window.hydraInjected=true</script><button id="csp-probe" onclick="window.hydraHandler=true">CSP probe</button></body>',
      ),
    });
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-policy-violation",
    "script-src-elem",
  );
  expect(await page.evaluate(() => "hydraInjected" in window)).toBe(false);
  await page.locator("#csp-probe").click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-policy-violation",
    "script-src-attr",
  );
  expect(await page.evaluate(() => "hydraHandler" in window)).toBe(false);
});
test("public metadata and reduced motion are available", async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-hydra-motion]")).toHaveAttribute(
    "data-hydra-motion",
    "off",
  );
  await page.getByRole("button", { name: "Usar tema claro" }).click();
  await expect(page.locator(".hydra-theme")).toHaveAttribute(
    "data-hydra-theme",
    "daylight",
  );
  const animated = await page.evaluate(
    () =>
      document
        .getAnimations()
        .filter(
          (a) =>
            a.playState === "running" &&
            (a.effect?.getComputedTiming().duration as number) > 1,
        ).length,
  );
  expect(animated).toBe(0);
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
  expect((await og.body()).subarray(0, 8).toString("hex")).toBe(
    "89504e470d0a1a0a",
  );
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /api/",
  );
  expect(await (await request.get("/sitemap.xml")).text()).toContain("pt-BR");
});
test("public content and native FAQ work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3100/?lang=pt-BR");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Sua superfície de ataque",
  );
  await page.locator("#questions summary").first().click();
  await expect(page.locator("#questions details[open]")).toContainText(
    "gestão da superfície",
  );
  await context.close();
});
