import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the ultra-premium static homepage at "/".
  // The detailed lead-gen page lives at /book, courses at /courses.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/premium.html" }],
    };
  },
};

export default nextConfig;
