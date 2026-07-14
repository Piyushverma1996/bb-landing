import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";

const BASE = "https://blushesnbrushes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/book`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/courses`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];
  const postRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticRoutes, ...postRoutes];
}
