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
      { source: "/learn/go", destination: "/learn/go/th.html" },
      { source: "/learn/makruk", destination: "/learn/makruk/th.html" },
      { source: "/learn/play", destination: "/learn/play/th.html" },
      { source: "/learn/play/en", destination: "/learn/play/en.html" },
      { source: "/learn/brain", destination: "/learn/brain/th.html" },
      { source: "/learn/heart", destination: "/learn/heart/th.html" },
      { source: "/learn/dna", destination: "/learn/dna/th.html" },
      { source: "/learn/hormones", destination: "/learn/hormones/th.html" },
      { source: "/learn/mind", destination: "/learn/mind/th.html" },
      { source: "/learn/brain/en", destination: "/learn/brain/en.html" },
      { source: "/learn/heart/en", destination: "/learn/heart/en.html" },
      { source: "/learn/dna/en", destination: "/learn/dna/en.html" },
      { source: "/learn/hormones/en", destination: "/learn/hormones/en.html" },
      { source: "/learn/mind/en", destination: "/learn/mind/en.html" },
      { source: "/learn/neurologist", destination: "/learn/neurologist/th.html" },
      { source: "/learn/neurologist/en", destination: "/learn/neurologist/en.html" },
    ];
  },
};

export default nextConfig;
