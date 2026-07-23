import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";
import { SERVICES } from "./services/serviceData";
import { AREAS } from "./areas/areaData";
import { GUIDES } from "./(guides)/guidesData";

const BASE = "https://blushesnbrushes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/areas`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/book`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/courses`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.7 },
  ];
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));
  const areaRoutes: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${BASE}/areas/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${BASE}/${g.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));
  const postRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...guideRoutes, ...postRoutes];
}
