import { test } from "node:test";
import assert from "node:assert/strict";
import { seal, unseal, sameOrigin, validApiKey } from "../src/lib/security";
import { command, endpoint } from "../src/lib/contracts";
const secret = "test-secret-32-characters-long-no-production";
test("session encrypts credentials and rejects tampering", async () => {
  const t = await seal("hydra-secret-api-key", secret);
  assert(!t.includes("hydra-secret"));
  assert.equal(await unseal(t, secret), "hydra-secret-api-key");
  assert.equal(await unseal(t + "x", secret), null);
  assert.equal(await unseal(t, secret + "wrong"), null);
});
test("session configuration fails closed", async () => {
  await assert.rejects(() => seal("key", "short"));
  assert.equal(await unseal("", secret), null);
});
test("CSRF requires the exact configured origin", () => {
  for (const origin of [
    "https://evil.test",
    "null",
    "https://hydra.test.evil.test",
  ])
    assert(
      !sameOrigin(
        new Request("https://hydra.test", { headers: { origin } }),
        "https://hydra.test",
      ),
    );
  assert(!sameOrigin(new Request("https://hydra.test"), "https://hydra.test"));
  assert(
    sameOrigin(
      new Request("https://hydra.test", {
        headers: { origin: "https://hydra.test" },
      }),
      "https://hydra.test",
    ),
  );
});
test("API keys cannot inject headers", () => {
  assert(validApiKey("hydra_1234567890123456"));
  for (const v of [
    "",
    null,
    "x".repeat(513),
    "x".repeat(20) + "\nInjected: yes",
  ])
    assert(!validApiKey(v));
});
test("active scan requires explicit authorization", () => {
  for (const authorized of [undefined, false])
    assert(
      !command.safeParse({ action: "scan", domain: "example.com", authorized })
        .success,
    );
  assert(
    command.safeParse({
      action: "scan",
      domain: "example.com",
      authorized: true,
    }).success,
  );
});
test("active monitoring and acknowledgement require authorization", () => {
  for (const action of ["enableMonitoring", "acknowledge"])
    assert(
      !command.safeParse({ action, domain: "example.com", speed2: true })
        .success,
    );
});
test("routing cannot become an arbitrary proxy", () => {
  for (const action of ["fetch", "https://evil.test", "admin"])
    assert(!command.safeParse({ action }).success);
  for (const id of ["../admin", "a/b", "a?x=y", "%2fadmin"])
    assert(!command.safeParse({ action: "report", id }).success);
});
test("domains cannot inject a path or scan arbitrary URLs", () => {
  for (const domain of [
    "localhost",
    "127.0.0.1",
    "https://example.com",
    "example.com/path",
    "evil.com?x=1",
  ])
    assert(!command.safeParse({ action: "registerDomain", domain }).success);
});
test("scope and tenant remain backend-owned", () => {
  const c = command.parse({
    action: "scan",
    domain: "EXAMPLE.COM",
    authorized: true,
    account_id: "victim",
    organization_id: "victim",
  });
  assert.deepEqual(endpoint(c), {
    path: "/scans",
    method: "POST",
    body: { domain: "example.com" },
  });
});
test("report request matches backend contract", () =>
  assert.deepEqual(
    endpoint(
      command.parse({ action: "clientReport", id: "abc123", language: "es" }),
    ),
    {
      path: "/scans/abc123/client-report",
      method: "POST",
      body: { format: "markdown", language: "es", white_label: false },
    },
  ));

import { readBounded, PayloadTooLarge } from "../src/lib/limits";
import { validateResponse } from "../src/lib/responses";
test("chunked request bodies cannot exceed the memory limit", async () => {
  const stream = new ReadableStream({
    start(c) {
      c.enqueue(new Uint8Array(9));
      c.enqueue(new Uint8Array(9));
      c.close();
    },
  });
  await assert.rejects(() => readBounded(stream, 10), PayloadTooLarge);
  assert.equal(await readBounded(new Response("á").body, 2), "á");
});
test("incompatible upstream data cannot become dashboard metrics", () => {
  assert.throws(() =>
    validateResponse({ action: "subscription" }, { tier: "pro" }),
  );
  assert.throws(() =>
    validateResponse(
      { action: "scan", domain: "example.com", authorized: true },
      { scan_id: "x", status: "completed" },
    ),
  );
});

import { contentSecurityPolicy } from "../src/lib/browser-policy";
import { sessionCookieName } from "../src/lib/security";
test("a sibling marketing origin cannot authorize an application mutation", () => {
  assert(
    !sameOrigin(
      new Request("https://hydra.boqueronlabs.com/api/command", {
        headers: { origin: "https://boqueronlabs.com" },
      }),
      "https://hydra.boqueronlabs.com",
    ),
  );
  assert(
    !sameOrigin(
      new Request("https://hydra.boqueronlabs.com/api/session", {
        headers: { origin: "https://other.boqueronlabs.com" },
      }),
      "https://hydra.boqueronlabs.com",
    ),
  );
});
test("production cookie uses browser-enforced host scope", () => {
  assert.equal(sessionCookieName(true), "__Host-hydra_session");
  assert.equal(sessionCookieName(false), "hydra_session");
});
test("production CSP rejects inline scripts, handlers, eval and external connections", () => {
  const csp = contentSecurityPolicy("u8wBYRhIT3psNJMDhMIang==");
  const script = csp.split("; ").find((d) => d.startsWith("script-src "))!;
  assert(!script.includes("unsafe-inline"));
  assert(!script.includes("unsafe-eval"));
  assert(csp.includes("script-src-attr 'none'"));
  assert(csp.includes("connect-src 'self';"));
  assert(csp.includes("frame-ancestors 'none'"));
  assert(csp.includes("upgrade-insecure-requests"));
  assert(
    !contentSecurityPolicy("u8wBYRhIT3psNJMDhMIang==", true, false).includes(
      "upgrade-insecure-requests",
    ),
  );
  assert.throws(() => contentSecurityPolicy("bad'; script-src *"));
});
