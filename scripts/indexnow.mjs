// แจ้ง Bing (และ search engine อื่นที่ใช้ IndexNow: Yandex, Seznam, Naver) ว่าเว็บเปลี่ยน → เก็บหน้าใหม่ภายในไม่กี่นาที
// ChatGPT Search และ Copilot ใช้ดัชนีของ Bing จึงเห็นเนื้อหาใหม่เร็วขึ้นด้วย
// รันอัตโนมัติจาก .github/workflows/indexnow.yml หลัง Vercel deploy production สำเร็จ
// ไฟล์ยืนยัน key อยู่ที่ public/<key>.txt (key นี้ไม่ใช่ความลับ ใครก็เปิดดูได้ตามสเปก IndexNow)
const site = process.env.SITE_URL || "https://www.sahawanclinic.clinic";
const key = "5c7d032ac5109e23394609dcd30857c7";

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("sitemap ว่าง");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(site).host,
    key,
    keyLocation: `${site}/${key}.txt`,
    urlList,
  }),
});
// 200 = รับแล้ว, 202 = รับแล้วรอตรวจ key
console.log(`IndexNow: ส่ง ${urlList.length} URL → HTTP ${res.status}`);
if (res.status >= 300) {
  console.log(await res.text());
  process.exit(1);
}
