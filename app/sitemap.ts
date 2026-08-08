import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://mac-studio.example", changeFrequency: "monthly", priority: 1 }];
}
