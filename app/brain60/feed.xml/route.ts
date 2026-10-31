import { publishedPosts } from "../posts";

// RSS ของ "สมองใน 60 วินาที" — ให้คนติดตามตอนใหม่ และให้ search engine/AI เห็นเนื้อหาใหม่เร็ว
const siteUrl = "https://www.sahawanclinic.clinic";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const dynamic = "force-static";

export function GET() {
  const items = publishedPosts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${siteUrl}/brain60/${p.slug}</link>
      <guid isPermaLink="true">${siteUrl}/brain60/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T09:00:00+07:00`).toUTCString()}</pubDate>
      <description>${esc(p.body.join(" "))}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>สมองใน 60 วินาที · สหวรรณคลินิก</title>
    <link>${siteUrl}/brain60</link>
    <atom:link href="${siteUrl}/brain60/feed.xml" rel="self" type="application/rss+xml" />
    <description>คำถามเรื่องสมองและระบบประสาทที่คนถามบ่อย ตอบสั้น ๆ โดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์</description>
    <language>th</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
