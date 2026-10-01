import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hydra.boqueronlabs.com",
      alternates: {
        languages: {
          es: "https://hydra.boqueronlabs.com",
          en: "https://hydra.boqueronlabs.com/?lang=en",
          "pt-BR": "https://hydra.boqueronlabs.com/?lang=pt-BR",
        },
      },
    },
  ];
}
