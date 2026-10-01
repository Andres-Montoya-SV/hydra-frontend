import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/login",
        "/overview",
        "/scope",
        "/scans",
        "/monitoring",
        "/reports",
        "/settings",
      ],
    },
    sitemap: "https://hydra.boqueronlabs.com/sitemap.xml",
  };
}
