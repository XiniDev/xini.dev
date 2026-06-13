import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (apex domain xini.dev — no basePath needed).
  output: "export",
  trailingSlash: true,
  images: {
    // GitHub Pages has no server, so the next/image optimizer must be disabled.
    // Images ship at source resolution → see scripts/optimize-images.mjs.
    unoptimized: true,
  },
};

export default nextConfig;
