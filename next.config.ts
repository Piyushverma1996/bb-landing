import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the ultra-premium static homepage at "/".
  // The detailed lead-gen page lives at /book, courses at /courses.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/premium.html" }],
    };
  },

  // Security headers. Not ranking factors, but they are part of a technical
  // audit and cost nothing. Deliberately no CSP: the homepage uses inline
  // styles and scripts, so a policy strict enough to be useful would break it
  // and a policy loose enough to pass would be theatre.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
