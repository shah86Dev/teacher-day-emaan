import type { NextConfig } from "next";

// The whole card is one self-contained page in public/card.html.
// The site root serves it directly.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Old page links from the previous version now open the card.
  async redirects() {
    return ["/letter", "/memories", "/thank-you"].map((source) => ({
      source,
      destination: "/",
      permanent: false
    }));
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/card.html" }],
      afterFiles: [],
      fallback: []
    };
  }
};

export default nextConfig;
