import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/horse-farm-website" : "",
  assetPrefix: isGithubPages ? "/horse-farm-website/" : undefined,
  images: {
    unoptimized: true,
  },

  allowedDevOrigins: [
    "192.168.1.8",
    "192.168.1.8:3000",
    "localhost",
    "localhost:3000",
  ],
};

export default nextConfig;
