import http from "node:http";
http
  .createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.headers["x-api-key"] !== "hydra_test_account_a_key") {
      res.writeHead(401);
      return res.end(JSON.stringify({ detail: "Invalid key" }));
    }
    let body = "";
    for await (const c of req) body += c;
    const data = body ? JSON.parse(body) : {};
    if (req.url === "/account/subscription")
      return res.end(
        JSON.stringify({
          tier: "pro",
          status: "active",
          scans_used_this_period: 2,
          scans_limit: 10,
          verified_domains_count: 1,
          retention_days: 90,
        }),
      );
    if (req.url === "/domains") {
      res.writeHead(201);
      return res.end(
        JSON.stringify({
          domain: data.domain,
          dns_instructions: {
            name: "_hydra-verify." + data.domain,
            value: "verification-token",
            record_type: "TXT",
          },
          file_instructions: {
            path: "/.well-known/hydra",
            content: "verification-token",
          },
        }),
      );
    }
    if (req.url === "/scans") {
      res.writeHead(202);
      return res.end(JSON.stringify({ scan_id: "scan123", status: "queued" }));
    }
    if (req.url === "/scans/scan123")
      return res.end(
        JSON.stringify({
          scan_id: "scan123",
          domain: "example.com",
          status: "completed",
          created_at: "2026-09-25T00:00:00Z",
          updated_at: "2026-09-25T00:05:00Z",
        }),
      );
    if (req.url === "/scans/scan123/client-report") {
      res.setHeader("Content-Type", "text/markdown");
      return res.end("# Hydra\n<script>alert(1)</script>");
    }
    res.writeHead(404);
    res.end(JSON.stringify({ detail: "Not found" }));
  })
  .listen(4100, "127.0.0.1");
