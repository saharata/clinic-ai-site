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
      { source: "/cyber", destination: "/cyber/index.html" },
      { source: "/cyber/foundations", destination: "/cyber/foundations.html" },
      { source: "/cyber/systems-networks", destination: "/cyber/systems-networks.html" },
      { source: "/cyber/how-web-works", destination: "/cyber/how-web-works.html" },
      { source: "/cyber/web-vulns-injection", destination: "/cyber/web-vulns-injection.html" },
      { source: "/cyber/web-vulns-auth", destination: "/cyber/web-vulns-auth.html" },
      { source: "/cyber/tools", destination: "/cyber/tools.html" },
      { source: "/cyber/security-coding", destination: "/cyber/security-coding.html" },
      { source: "/cyber/cryptography", destination: "/cyber/cryptography.html" },
      { source: "/cyber/defense-hardening", destination: "/cyber/defense-hardening.html" },
      { source: "/cyber/path-to-pro", destination: "/cyber/path-to-pro.html" },
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
      { source: "/learn/chess", destination: "/learn/chess/th.html" },
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
      { source: "/learn/space", destination: "/learn/space/th.html" },
      { source: "/learn/space/en", destination: "/learn/space/en.html" },
      { source: "/learn/ai", destination: "/learn/ai/th.html" },
      { source: "/learn/ai/en", destination: "/learn/ai/en.html" },
      { source: "/learn/robot", destination: "/learn/robot/th.html" },
      { source: "/learn/robot/en", destination: "/learn/robot/en.html" },
      { source: "/learn/airobot", destination: "/learn/airobot/th.html" },
      { source: "/learn/airobot/en", destination: "/learn/airobot/en.html" },
      { source: "/learn/airobot/kit", destination: "/learn/airobot/kit/index.html" },
    ];
  },
};

export default nextConfig;
