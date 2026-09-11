import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // PWA "Sahawan Clinic" (แอปวัดใจ) — static ใน public/app/
    return [
      { source: "/app", destination: "/app/index.html", permanent: false },
    ];
  },
  async rewrites() {
    // สื่อการเรียนรู้สำหรับเด็ก — static ใน public/learn/
    return [
      { source: "/learn/cells", destination: "/learn/cells/th.html" },
      { source: "/learn/cells/en", destination: "/learn/cells/en.html" },
      { source: "/learn/body", destination: "/learn/body/th.html" },
      { source: "/learn/body/en", destination: "/learn/body/en.html" },
      { source: "/learn/animals", destination: "/learn/animals/th.html" },
      { source: "/learn/animals/en", destination: "/learn/animals/en.html" },
      { source: "/learn/growth", destination: "/learn/growth/th.html" },
      { source: "/learn/growth/en", destination: "/learn/growth/en.html" },
    ];
  },
};

export default nextConfig;
