import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/invoice"], // keep internal tools out of search
    },
    sitemap: "https://blushesnbrushes.com/sitemap.xml",
  };
}
