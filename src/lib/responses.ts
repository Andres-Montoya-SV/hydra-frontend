import { z } from "zod";
import type { Command } from "./contracts";
export const subscription = z
  .object({
    tier: z.enum(["free", "medium", "pro", "ultra"]),
    status: z.enum(["active", "past_due", "suspended"]),
    scans_used_this_period: z.number().int().nonnegative(),
    scans_limit: z.number().int(),
    verified_domains_count: z.number().int().nonnegative(),
    retention_days: z.number().int(),
  })
  .passthrough();
const monitoring = z
  .object({
    domain: z.string(),
    status: z.enum(["active", "paused_verification_lapsed", "needs_review"]),
    speed2_enabled: z.boolean(),
    needs_review: z.boolean(),
  })
  .passthrough();
export function validateResponse(c: Command, data: unknown) {
  switch (c.action) {
    case "subscription":
      return subscription.parse(data);
    case "registerDomain":
      return z
        .object({
          domain: z.string(),
          dns_instructions: z.object({
            name: z.string(),
            value: z.string(),
            record_type: z.literal("TXT"),
          }),
          file_instructions: z.object({
            path: z.string(),
            content: z.string(),
          }),
        })
        .parse(data);
    case "verifyDomain":
      return z
        .object({
          domain: z.string(),
          status: z.literal("verified"),
          method: z.enum(["dns_txt", "well_known_file"]),
          verified_at: z.string(),
          expires_at: z.string(),
        })
        .parse(data);
    case "scan":
      return z
        .object({ scan_id: z.string(), status: z.literal("queued") })
        .parse(data);
    case "scanStatus":
      return z
        .object({
          scan_id: z.string(),
          domain: z.string(),
          status: z.enum(["queued", "running", "completed", "failed"]),
          created_at: z.string(),
          updated_at: z.string(),
          error_message: z.string().nullable().optional(),
        })
        .parse(data);
    case "monitoring":
    case "enableMonitoring":
    case "acknowledge":
      return monitoring.parse(data);
    case "branding":
    case "saveBranding":
      return z.object({ company_name: z.string().nullable() }).parse(data);
    case "webhooks":
      return z
        .array(
          z.object({
            webhook_id: z.string(),
            url: z.string(),
            status: z.enum(["active", "disabled"]),
            event_types: z.array(z.string()),
            consecutive_failures: z.number().int(),
            last_delivery_at: z.string().nullable(),
            last_success_at: z.string().nullable(),
            last_error: z.string().nullable(),
            created_at: z.string(),
          }),
        )
        .parse(data);
    case "verifyEmail":
      return z
        .object({ account_id: z.string(), status: z.literal("verified") })
        .parse(data);
    case "resend":
      return z
        .object({
          account_id: z.string(),
          status: z.literal("verification_email_resent"),
        })
        .parse(data);
    default:
      return z.record(z.string(), z.unknown()).parse(data);
  }
}
