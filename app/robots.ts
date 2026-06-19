import type { MetadataRoute } from "next";

const siteUrl = "https://www.sahawanclinic.clinic";

// เปิดให้ทั้ง search engine และ AI crawler เข้าถึงได้ชัดเจน
// (Google, Bing + GPTBot/OAI-SearchBot ของ OpenAI, PerplexityBot, ClaudeBot ฯลฯ)
export default function robots(): MetadataRoute.Robots {
  const aiAndSearchBots = [
    "*",
    "Googlebot",
    "Bingbot",
    "Google-Extended", // อนุญาตให้ Google ใช้เนื้อหากับ AI (Gemini/AI Overviews)
    "GPTBot", // OpenAI training/crawl
    "OAI-SearchBot", // ChatGPT Search
    "ChatGPT-User", // เมื่อผู้ใช้ ChatGPT เปิดลิงก์
    "PerplexityBot", // Perplexity index
    "Perplexity-User", // Perplexity เปิดลิงก์ตามคำถามผู้ใช้
    "ClaudeBot", // Anthropic
    "Claude-Web",
    "Applebot",
    "Applebot-Extended",
  ];

  return {
    rules: aiAndSearchBots.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
