```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/horse-farm-website",
  assetPrefix: "/horse-farm-website/",
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
```
