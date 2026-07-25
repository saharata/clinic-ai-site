import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // PWA "Sahawan Clinic" (แอปวัดใจ) — static ใน public/app/
    return [
      { source: "/app", destination: "/app/index.html", permanent: false },
    ];
  },
};

export default nextConfig;
