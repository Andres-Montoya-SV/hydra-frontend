import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function login(page: import("@playwright/test").Page) {
  await page.goto("/login");
  await page
    .getByLabel("API key de tu cuenta")
    .fill("hydra_test_account_a_key");
  await page.getByRole("button", { name: "Entrar al workspace" }).click();
  await expect(page).toHaveURL("/overview");
}
test("protected routes, login, session cookie and logout", async ({
  page,
  context,
}) => {
  await page.goto("/scope");
  await expect(page).toHaveURL("/login");
  await login(page);
  await expect(page.getByText("PRO", { exact: true })).toBeVisible();
  const c = (await context.cookies()).find((c) => c.name === "hydra_session");
  expect(c?.httpOnly).toBe(true);
  expect(c?.secure).toBe(true);
  expect(c?.sameSite).toBe("Strict");
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.getByRole("button", { name: "Cerrar sesión" }).click();
  await expect(page).toHaveURL("/login");
});
test("domain instructions and explicit scan authorization", async ({
  page,
}) => {
  await login(page);
  await page.getByRole("link", { name: "Dominios y scope" }).click();
  await page.getByLabel("Dominio", { exact: true }).fill("example.com");
  await page.getByRole("button", { name: "Obtener instrucciones" }).click();
  await expect(page.getByText("_hydra-verify.example.com")).toBeVisible();
  await page.getByRole("link", { name: "Escaneos", exact: true }).click();
  await page.getByLabel("Dominio autorizado").fill("example.com");
  await expect(
    page.getByRole("button", { name: "Solicitar escaneo" }),
  ).toBeDisabled();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Solicitar escaneo" }).click();
  await expect(page.getByLabel("ID del escaneo")).toHaveValue("scan123");
  await page.getByRole("button", { name: "Consultar estado" }).click();
  await expect(page.getByText("completed", { exact: true })).toBeVisible();
});
test("reports are text, foreign resources fail and CSRF is blocked", async ({
  page,
  request,
}) => {
  await login(page);
  await page.getByRole("link", { name: "Reportes", exact: true }).click();
  await page.getByLabel("ID de escaneo").fill("foreign");
  await page.getByRole("button", { name: "Consultar evidencia JSON" }).click();
  await expect(page.locator("main").getByRole("alert")).toContainText(
    "No se encontró",
  );
  await page.getByLabel("ID de escaneo").fill("scan123");
  await page.getByRole("button", { name: "Generar reporte Markdown" }).click();
  await expect(
    page.getByText("<script>alert(1)</script>", { exact: false }),
  ).toBeVisible();
  const r = await request.post("/api/command", {
    headers: { Origin: "https://evil.test" },
    data: { action: "scan", domain: "example.com", authorized: true },
  });
  expect(r.status()).toBe(403);
  const unauth = await request.post("/api/command", {
    headers: { Origin: "http://localhost:3100" },
    data: { action: "subscription" },
  });
  expect(unauth.status()).toBe(401);
});
test("views are accessible and fit the viewport", async ({ page }, info) => {
  await login(page);
  for (const route of [
    "overview",
    "scope",
    "scans",
    "monitoring",
    "reports",
    "settings",
  ]) {
    await page.goto("/" + route);
    await expect(page.locator("h1")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/overview");
  await page.screenshot({
    path: `test-results/overview-${info.project.name}.png`,
    fullPage: true,
  });
});
