import { z } from "zod";
const domain = z
  .string()
  .trim()
  .toLowerCase()
  .max(253)
  .regex(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/);
const id = z.string().regex(/^[a-zA-Z0-9_-]{1,128}$/);
export const command = z.discriminatedUnion("action", [
  z.object({ action: z.literal("subscription") }),
  z.object({ action: z.literal("branding") }),
  z.object({
    action: z.literal("saveBranding"),
    company_name: z.string().trim().min(1).max(160),
  }),
  z.object({ action: z.literal("registerDomain"), domain }),
  z.object({
    action: z.literal("verifyDomain"),
    domain,
    method: z.enum(["dns_txt", "well_known_file"]),
  }),
  z.object({ action: z.literal("scan"), domain, authorized: z.literal(true) }),
  z.object({ action: z.literal("scanStatus"), id }),
  z.object({ action: z.literal("report"), id }),
  z.object({
    action: z.literal("clientReport"),
    id,
    language: z.enum(["es", "en"]),
  }),
  z.object({ action: z.literal("monitoring"), domain }),
  z.object({
    action: z.literal("enableMonitoring"),
    domain,
    speed2: z.boolean(),
    authorized: z.literal(true),
  }),
  z.object({ action: z.literal("disableMonitoring"), domain }),
  z.object({
    action: z.literal("acknowledge"),
    domain,
    authorized: z.literal(true),
  }),
  z.object({ action: z.literal("webhooks") }),
  z.object({ action: z.literal("resend") }),
  z.object({
    action: z.literal("verifyEmail"),
    token: z.string().min(1).max(512),
  }),
]);
export type Command = z.infer<typeof command>;
export function endpoint(c: Command): {
  path: string;
  method: string;
  body?: unknown;
} {
  switch (c.action) {
    case "subscription":
      return { path: "/account/subscription", method: "GET" };
    case "branding":
      return { path: "/account/branding", method: "GET" };
    case "saveBranding":
      return {
        path: "/account/branding",
        method: "PUT",
        body: { company_name: c.company_name },
      };
    case "registerDomain":
      return { path: "/domains", method: "POST", body: { domain: c.domain } };
    case "verifyDomain":
      return {
        path: `/domains/${c.domain}/verify`,
        method: "POST",
        body: { method: c.method },
      };
    case "scan":
      return { path: "/scans", method: "POST", body: { domain: c.domain } };
    case "scanStatus":
      return { path: `/scans/${c.id}`, method: "GET" };
    case "report":
      return { path: `/scans/${c.id}/report`, method: "GET" };
    case "clientReport":
      return {
        path: `/scans/${c.id}/client-report`,
        method: "POST",
        body: { format: "markdown", language: c.language, white_label: false },
      };
    case "monitoring":
      return { path: `/domains/${c.domain}/monitoring`, method: "GET" };
    case "enableMonitoring":
      return {
        path: `/domains/${c.domain}/monitoring`,
        method: "POST",
        body: { speed2: c.speed2 },
      };
    case "disableMonitoring":
      return { path: `/domains/${c.domain}/monitoring`, method: "DELETE" };
    case "acknowledge":
      return {
        path: `/domains/${c.domain}/monitoring/acknowledge`,
        method: "POST",
      };
    case "webhooks":
      return { path: "/webhooks", method: "GET" };
    case "resend":
      return { path: "/accounts/resend-verification", method: "POST" };
    case "verifyEmail":
      return {
        path: "/accounts/verify-email",
        method: "POST",
        body: { token: c.token },
      };
  }
}
