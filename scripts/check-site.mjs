// ตรวจเว็บทั้งเว็บหลัง build: การเข้าถึง (axe, WCAG 2.2 AA) · จอ 320px ตัวอักษร 200% ต้องไม่เลื่อนซ้ายขวา · ลิงก์ภายในเสีย
// ใช้: npm run build && npm start (อีกหน้าต่าง) แล้ว npm run check:site
// BASE_URL เปลี่ยนเครื่องที่ตรวจได้ (ค่าเริ่มต้น http://localhost:3000)
import { readFileSync, appendFileSync } from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const base = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

// หน้าที่สร้างจากสคริปต์นอก repo (public/learn, public/cyber, public/fnd-book) แก้ใน repo นี้ไม่ได้
// → แสดงผลเป็นคำเตือน ไม่ทำให้การตรวจล้ม (ลิงก์เสียยังนับเป็นความผิดพลาด)
const generated = (path) => /^\/(learn|cyber|fnd-book)(\/|$)/.test(path);

// หน้าที่ไม่อยู่ใน sitemap แต่ต้องตรวจด้วย
const extraPages = [
  "/privacy",
  "/ai/eeg",
  "/ai/eeg/methods",
  "/ai/soap",
  "/ai/mri",
  "/ai/login",
  "/ai/register",
];

const errors = [];
const warnings = [];

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const pages = [
  ...new Set([
    ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname),
    ...extraPages,
  ]),
];

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const narrow = await (await browser.newContext({ viewport: { width: 320, height: 800 } })).newPage();

const links = new Map(); // path → หน้าแรกที่พบลิงก์

for (const path of pages) {
  const report = generated(path) ? warnings : errors;
  const res = await page.goto(base + path, { waitUntil: "load" });
  if (!res || res.status() >= 400) {
    errors.push(`${path}: เปิดไม่ได้ (HTTP ${res?.status()})`);
    continue;
  }

  await page.addScriptTag({ content: axeSource });
  const violations = await page.evaluate(async () => {
    const r = await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
    });
    return r.violations.map((v) => `${v.id} (${v.nodes.length}) ${v.help}`);
  });
  for (const v of violations) report.push(`${path}: axe ${v}`);

  for (const href of await page.$$eval("a[href]", (as) => as.map((a) => a.href))) {
    const u = new URL(href);
    if (u.origin !== new URL(base).origin) continue;
    if (!links.has(u.pathname)) links.set(u.pathname, path);
  }

  // WCAG 1.4.10 Reflow + 1.4.4 ขยายตัวอักษร 200%
  await narrow.goto(base + path, { waitUntil: "load" });
  const width = await narrow.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
    return document.documentElement.scrollWidth;
  });
  if (width > 322) report.push(`${path}: จอ 320px ตัวอักษร 200% กว้างเกินจอ (${width}px)`);
}

await browser.close();

for (const [path, from] of links) {
  const res = await fetch(base + path, { method: "HEAD", redirect: "follow" });
  if (res.status >= 400) errors.push(`${from}: ลิงก์เสีย ${path} (HTTP ${res.status})`);
}

const lines = [
  `ตรวจ ${pages.length} หน้า · ลิงก์ภายใน ${links.size} ลิงก์`,
  "",
  `ผิดพลาด ${errors.length} รายการ`,
  ...errors.map((e) => `- ${e}`),
  "",
  `คำเตือน (หน้าที่สร้างจากสคริปต์นอก repo) ${warnings.length} รายการ`,
  ...warnings.map((w) => `- ${w}`),
];
console.log(lines.join("\n"));
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## ตรวจเว็บ\n\n${lines.join("\n")}\n`);
}
process.exit(errors.length ? 1 : 0);
