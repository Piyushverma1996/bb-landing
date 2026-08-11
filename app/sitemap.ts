import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";
import { SERVICES } from "./services/serviceData";
import { AREAS } from "./areas/areaData";
import { GUIDES } from "./(guides)/guidesData";
import { lastMod } from "./lib/contentDates";

const BASE = "https://blushesnbrushes.com";

// Google uses <lastmod> for crawl scheduling and ignores <changefreq> and
// <priority> entirely. This sitemap previously sent only the two ignored
// signals for every page except blog posts - and blog posts were the only
// pages getting crawled. Dates come from git history via
// scripts/gen-content-dates.py, so they stay honest; a lastmod that always
// says "today" gets discounted as unreliable.
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string): MetadataRoute.Sitemap[number] => ({
    url: `${BASE}${path}`,
    lastModified: lastMod(path),
  });

  const staticRoutes = [
    "/", "/services", "/areas", "/book", "/courses", "/blog",
    "/gallery", "/nails", "/faq", "/contact", "/about", "/privacy-policy", "/terms",
  ].map(entry);

  const serviceRoutes = SERVICES.map((s) => entry(`/services/${s.slug}`));

  // Noindexed areas are excluded: listing a page we tell Google not to index
  // is a contradictory signal.
  const areaRoutes = AREAS.filter((a) => !a.noindex).map((a) => entry(`/areas/${a.slug}`));

  const guideRoutes = GUIDES.map((g) => entry(`/${g.slug}`));

  // Posts carry an editorial date, which is more meaningful than the commit
  // that happened to touch the file.
  const postRoutes: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes, ...guideRoutes, ...postRoutes];
}
