import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves this site as static files from the `out` directory.
  output: "export",
};

export default nextConfig;
