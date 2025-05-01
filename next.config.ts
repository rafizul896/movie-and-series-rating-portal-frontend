import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // file size limit for server actions. Default is 1mb
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};


export default nextConfig;
