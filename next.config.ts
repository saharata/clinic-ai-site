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
      { source: "/learn/senses", destination: "/learn/senses/th.html" },
      { source: "/learn/virus", destination: "/learn/virus/th.html" },
      { source: "/learn/life", destination: "/learn/life/th.html" },
      { source: "/learn/senses/en", destination: "/learn/senses/en.html" },
      { source: "/learn/virus/en", destination: "/learn/virus/en.html" },
      { source: "/learn/life/en", destination: "/learn/life/en.html" },
      { source: "/learn/play", destination: "/learn/play/th.html" },
      { source: "/learn/play/en", destination: "/learn/play/en.html" },
    ];
  },
};

export default nextConfig;
