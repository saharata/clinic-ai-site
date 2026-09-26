# รายงานตรวจ Accessibility (WCAG 2.2 AA) — `public/learn/`

วันที่ตรวจ: 2026-09-26 · ขอบเขต: ไฟล์ HTML ที่ generate แล้ว 41 ไฟล์ใน `public/learn/` (ตรวจแบบอ่านอย่างเดียว ไม่ได้แก้ไฟล์ใด ๆ ใน `public/learn/`)
ผู้ใช้เป้าหมาย: ผู้ป่วยระบบประสาทชาวไทย ได้แก่ MS/NMOSD ที่เคยมี optic neuritis (มองมัว สีผิดเพี้ยน contrast sensitivity ต่ำ), Parkinson's/tremor (กดเป้าเล็กไม่แม่น ลากหรือ hover ลำบาก) และผู้สูงอายุ

---

## 1. สรุปสั้น

**ภาพรวม:** โครงพื้นฐานดีกว่าที่คาด `<html lang>` ถูกทุกไฟล์ (th/en) มี `:focus-visible` ทุกเทมเพลต ไม่มี `outline:none` แบบเหมารวม เทมเพลตบทเรียนมี `prefers-reduced-motion` แบบ catch-all ส่วนหมากล้อมกับหมากรุกไทยเล่นด้วยแป้นพิมพ์ได้ครบ และ axe ในโหมดมืดเจอปัญหาน้อย แต่ยังมีปัญหาสำคัญ 10 ข้อที่กระทบกลุ่มผู้ใช้นี้โดยตรง

| # | ปัญหา | ระดับ | แก้ที่ |
|---|---|---|---|
| 1 | **ปุ่มอ่านออกเสียงไม่ทำงานเลยใน body (th/en) และ cells (th/en)** เพราะ selector ผูกกับ `.wrap3` ซึ่งไม่มีในสองเทมเพลตนี้ | Critical | readaloud.js |
| 2 | read-aloud: หลังกดปุ่ม 🔊 และหลังกด "ปิด" **โฟกัสหลุดไปที่ `<body>`** และวงโฟกัสของปุ่มในแถบมี contrast แค่ **1.80:1** ในโหมดสว่าง | Serious | readaloud.js |
| 3 | จุดแตะบนภาพ SVG (hotspot) เล็ก **12–19 px บนมือถือ** และใน body มีวงกลม 51 วงที่ `role="button"` แต่**ไม่มีชื่อ** | Critical (body) / Serious | template บทเรียน (แก้ผ่าน polish.js ได้บางส่วน) |
| 4 | SVG ที่ห่อ hotspot ใช้ `role="img"` ทำให้ screen reader โดยเฉพาะ VoiceOver **มองไม่เห็นปุ่มข้างใน** (axe `nested-interactive` เจอใน 30 ไฟล์) | Serious | template (แก้ผ่าน polish.js ได้) |
| 5 | **หมากรุกสากลเล่นด้วยแป้นพิมพ์ไม่ได้เลย** (`role="application"` แต่ไม่มี keydown) และเกณฑ์แยก "แตะ" กับ "ลาก" คือ 6 px (เมาส์) / 8 px (นิ้ว) มือสั่นเพียงนิดเดียวก็กลายเป็นหมุนกระดานแทนการเลือกตัว | Critical / Serious | chess/th.html |
| 6 | สีตัวหนังสือหัวข้อ "รู้หรือไม่" ในการ์ดข้อมูล (`.infocard .city b`) ใช้สีประจำหัวข้อ ได้ contrast แค่ **1.32–4.09:1** และเป็นแบบนี้ในเกือบทุกบท | Serious | template (override ใน polish.css ได้) |
| 7 | footer ถูก polish.css ใส่ `opacity:.9` ทำให้ contrast ตกเป็น **4.41:1** (ต่ำกว่า 4.5) ใน 32 ไฟล์ | Serious | polish.css |
| 8 | ที่ความกว้าง 320px (เท่ากับซูม 400%) **เลื่อนแนวนอนได้ 22 ไฟล์** (EN แย่กว่า TH เพราะ `.remember b{white-space:nowrap}` และ grid child ขาด `min-width:0`) | Serious | template (override ใน polish.css ได้) |
| 9 | แถบนำทางแบบ sticky ของ polish **บังเมนูบท (rail) ของ cells ทั้งแถบ** และบังหัวข้อบทเมื่อกดลิงก์ anchor ส่วนแถบอ่านออกเสียงสูง 172–218px บนมือถือ (บังจอราว 34% หรือ 51% ที่ซูม 200%) | Serious | polish.css / readaloud.js |
| 10 | ไม่มี skip link ในไฟล์ใดเลย และ **ไม่มี `<main>`** ใน 38/41 ไฟล์ | Moderate | chunk nav ที่ site_build แทรก |

### วิธีตรวจ
1. **อ่านโค้ด:** แยก `<style>`/`<script>` ทุกบล็อกของทั้ง 41 ไฟล์ แล้วทำ md5 เพื่อดูว่าบล็อกไหนใช้ร่วมกัน (รายละเอียดในหัวข้อ 1.1)
2. **axe-core 4.x** ผ่าน Playwright + Chromium headless (`/opt/pw-browsers`, `chromium_headless_shell-1194`) โดยเสิร์ฟ `public/` ด้วย `python3 -m http.server` ตั้ง tags เป็น `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa` ตรวจ**ครบทั้ง 41 ไฟล์** ทั้ง `colorScheme: light` และ `dark` ที่ viewport 1280×900 และรอ 3.5 วินาทีหลังโหลดเพื่อให้ reveal ทำงานจบก่อน
3. **DOM probe** (สคริปต์ Playwright ของผู้ตรวจเอง) ใช้ตรวจ heading order, landmark, skip link, alt, ชื่อ SVG, ขนาด target (ที่ 1280px และ 390px แบบ touch), การเลื่อนแนวนอนที่ 320×640, focus style (focus ทีละตัว ตัวละไม่เกิน 150 ตัว), สภาพ reveal ทันทีหลังโหลด, จำนวน infinite animation เทียบระหว่าง `reducedMotion: no-preference` กับ `reduce`, ขนาดของแถบ sticky/fixed และพฤติกรรมโฟกัสของ read-aloud
4. **คำนวณ contrast เอง** ด้วยสูตร WCAG relative luminance (Python) รวมกรณี opacity/alpha ที่ axe คำนวณไม่ได้ เช่น canvas ของเกม, `opacity:.9` และ `color-mix()`

> ข้อจำกัด: axe ตรวจได้เฉพาะสถานะที่แสดงอยู่ตอนตรวจ (เช่น การ์ดข้อมูลที่เลือกไว้เริ่มต้น) สีของ hotspot อื่นจึงอาจตกเพิ่มอีก ส่วน canvas (เกม, กราฟ) axe ตรวจไม่ได้เลย และ axe รายงาน "incomplete" สำหรับ color-contrast ไว้อีกมาก (เช่น airobot 533 จุด, dna 66, cells 52) ซึ่งต้องตรวจด้วยตาต่อ

### ผล axe (จำนวน node ที่ violation; light / dark)

| ไฟล์ | Light | Dark |
|---|---|---|
| ai/en.html | 27 (contrast 27) | 2 (contrast 2) |
| ai/th.html | 27 (contrast 27) | 2 (contrast 2) |
| airobot/en.html | 21 (contrast 18, scrollable-region-focusable 3) | 3 (scrollable 3) |
| airobot/th.html | 20 (contrast 18, scrollable 2) | 2 (scrollable 2) |
| airobot/kit/index.html | 0 | 0 |
| airobot/kit/ai-driver.html | 0 | 0 |
| animals/en.html · th.html | 3 (contrast 2, nested-interactive 1) | 1 (nested 1) |
| body/en.html · th.html | **63** (aria-command-name 51, contrast 11, nested 1) | **52** (aria-command-name 51, nested 1) |
| brain/en.html · th.html | 7 (contrast 5, nested 2) | 3 (contrast 1, nested 2) |
| cells/en.html | 9 (nested 2, target-size 7) | 9 (nested 2, target-size 7) |
| cells/th.html | 11 (nested 2, target-size 9) | 11 (nested 2, target-size 9) |
| chess/th.html | 0 | 0 |
| dna/en.html · th.html | 4 (contrast 3, nested 1) | 1 (nested 1) |
| go/th.html | 0 | 0 |
| growth/en.html · th.html | 3 (contrast 2, nested 1) | 1 (nested 1) |
| heart/en.html · th.html | 6 (contrast 5, nested 1) | 2 (contrast 1, nested 1) |
| hormones/en.html · th.html | 4 (contrast 3, nested 1) | 1 (nested 1) |
| life/en.html · th.html | 10 (contrast 9, nested 1) | 5 (contrast 4, nested 1) |
| makruk/th.html | 0 | 0 |
| mind/en.html · th.html | 3 (contrast 3) | 1 (contrast 1) |
| neurologist/en.html · th.html | 4 (contrast 3, nested 1) | 2 (contrast 1, nested 1) |
| play/en.html · th.html | 11 (contrast 11) | 9 (contrast 9) |
| robot/en.html · th.html | 22 (contrast 21, nested 1) | 2 (contrast 1, nested 1) |
| senses/en.html · th.html | 7 (contrast 3, nested 4) | 4 (nested 4) |
| space/en.html · th.html | 4 (contrast 3, nested 1) | 2 (contrast 1, nested 1) |
| virus/en.html · th.html | 5 (contrast 4, nested 1) | 2 (contrast 1, nested 1) |

> ไฟล์ en/th ของบทเดียวกันได้ผลเหมือนกัน ยกเว้นที่แยกแถวไว้ **เกมทั้ง 3 ได้ 0 จาก axe ก็จริง แต่ปัญหาหลักอยู่ใน canvas ซึ่ง axe มองไม่เห็น** (ดูหัวข้อ 4)

### 1.1 โค้ดไหนใช้ร่วมกัน และโค้ดไหนเป็นของแต่ละบท (ยืนยันด้วย md5)

| บล็อก | hash | ใช้ใน | หมายเหตุ |
|---|---|---|---|
| `<style>` แถบนำทาง `.sw-bar` (บรรทัด ~23) | `ce24608d` | 36 ไฟล์บทเรียน + kit ไม่มี | เกมใช้ของตัวเอง: `f68dac73` (go, makruk) และ `48418682` (chess) |
| **polish.css** — `<style>` ที่ขึ้นต้นด้วย `.wrap3{--pg1..}` + tap-gallery + "Body 101 visual polish" | ต่างกันเฉพาะค่า `--pg1/--pg2` บรรทัดแรก ส่วนที่เหลือเหมือนกันทุกไฟล์ | 36 ไฟล์บทเรียน | body/th.html บรรทัด 1422–1510 |
| **polish.js** — "Body 101 visual polish behaviour" | `76dc628a` | 36 ไฟล์ | body/th.html บรรทัด 1512–1552 |
| **readaloud.js** — "Body 101 read-aloud bar" | `1de99cf8` | 36 ไฟล์ | body/th.html บรรทัด 1554–1725 |
| tokens CSS ของบทเรียน | ต่างกันทุกบท แต่แบ่งได้ 3 เทมเพลต | — | ดูหัวข้อ 3 |

**3 เทมเพลตบทเรียน:**
- **เทมเพลต A "wrap3"** (32 ไฟล์): ai, airobot, animals, brain, dna, growth, heart, hormones, life, mind, neurologist, play, robot, senses, space, virus (th+en) ใช้ token ชุดเดียวกัน (`--glass:#EDF1F4`, `--ink-2:#586176`, `--accent:#5A3E9E` …)
- **เทมเพลต B "body"** (2 ไฟล์): body/th, body/en มี token ของตัวเอง (`--paper`, `--accent:#0E7C86`) และ**ไม่มี `.wrap3`**
- **เทมเพลต C "cells"** (2 ไฟล์): cells/th, cells/en ใช้ token แบบ A แต่ใช้ `.shell` + `.rail` + `<main>` และ**ไม่มี `.wrap3`**

ข้อสังเกตสำคัญ: selector ของ polish.css ที่ขึ้นต้นด้วย `.wrap3 ...` **ไม่มีผลกับ body และ cells** ส่วน `.wrap3 .hero` ไม่มีผลกับไฟล์ไหนเลย เพราะไม่มีไฟล์ใดมี `class="hero"` (เป็น CSS ที่ไม่ถูกใช้)

---

## 2. ปัญหาในไฟล์ร่วม (polish.css / polish.js / readaloud.js) — แก้ที่ site_build.py ที่เดียวได้ทุกบท

> บรรทัดที่อ้างอิงเป็นของ `public/learn/body/th.html` ส่วนไฟล์อื่นดูได้จากตาราง 1.1 (บล็อกเดียวกัน แต่เลขบรรทัดต่างกัน)

### S1. read-aloud ไม่ทำงานใน body และ cells (4 ไฟล์) — **Critical** · WCAG 4.1.2 / functional
- **ปัญหา:** `collect()` ค้นหาเฉพาะ `".wrap3 h1, .wrap3 h2, … .wrap3 li"` (บรรทัด 1607) แต่ body กับ cells ไม่มี `.wrap3` ผลคือ `blocks.length === 0` ทำให้ `play()` return ทันที ผู้ใช้กดปุ่ม "🔊 อ่านออกเสียง" แล้วแถบเปิดขึ้น ปุ่มเปลี่ยนเป็น "เล่น" แต่**ไม่มีเสียงและไม่มีข้อความบอกอะไรเลย** (ยืนยันแล้วใน Playwright: body/th, cells/en มี block ที่อ่านได้ = 0)
- **แก้:**
```js
// แทน selector ที่ผูกกับ .wrap3
var ROOT = document.querySelector(".wrap3") || document.querySelector("main") || document.querySelector(".shell") || document.body;
function collect(){
  blocks = Array.prototype.slice.call(ROOT.querySelectorAll(
    "h1, h2, h3, p, li, .lede, .remember span, .life"))
    .filter(function(el){
      if (el.closest("footer, nav, .sw-bar, .ra-bar, [aria-hidden='true']")) return false;
      if (el.offsetParent === null) return false;
      var t = (el.textContent || "").trim();
      return t.length > 1 && !el.querySelector("h1,h2,h3,p,li");
    });
}
// และถ้ายังว่างอยู่ ให้แจ้งผู้ใช้แทนการเงียบ
if (!blocks.length) { announce(LANG==="en" ? "Nothing to read on this page" : "หน้านี้ไม่มีข้อความให้อ่าน"); return; }
```

### S2. read-aloud: โฟกัสหลุดเมื่อเปิดหรือปิดแถบ — **Serious** · WCAG 2.4.3 Focus Order, 2.1.1
- **ปัญหา:** ปุ่ม fab ถูกซ่อน (`.ra-fab.hide{display:none}`) ตอนที่ตัวเองมีโฟกัสอยู่ โฟกัสจึงหลุดไปที่ `BODY` (ยืนยันแล้ว: `document.activeElement` = BODY หลังกด Enter) กด Tab ต่อไปจะไปโผล่กลางหน้า (ใน brain/th ไปที่ลิงก์ "เล่นเกมเฉพาะเรื่องนี้") ไม่ใช่แถบควบคุม ปุ่ม "ปิด" ก็หลุดโฟกัสแบบเดียวกัน และไม่มีปุ่ม Esc สำหรับปิด (บรรทัด 1712–1716)
- **แก้:**
```js
fab.addEventListener("click", function(){
  bar.classList.add("on"); fab.classList.add("hide");
  bPlay.focus();            // ย้ายโฟกัสเข้าแถบ
  play();
});
function closeBar(){ stop(); bar.classList.remove("on"); fab.classList.remove("hide"); fab.focus(); }
bClose.addEventListener("click", closeBar);
bar.addEventListener("keydown", function(e){ if (e.key === "Escape") closeBar(); });
```

### S3. read-aloud: วงโฟกัสในแถบมองไม่เห็น — **Serious** · WCAG 2.4.7, 1.4.11 (2.4.13 AAA)
- **ปัญหา:** ปุ่มในแถบใช้ `:focus-visible{outline:3px solid var(--accent)}` ของหน้า ซึ่งตกลงบนพื้น `#0f172a`
  - เทมเพลต A โหมดสว่าง: `#5A3E9E` บน `#0f172a` (ปนพื้นปุ่ม 8% ขาว) = **1.80:1**
  - body โหมดสว่าง: `#0E7C86` บนพื้นเดียวกัน = **2.91:1**
  - โหมดมืด 5.76–5.80:1 ผ่าน
- **แก้:** (ใส่ใน `css.textContent`)
```css
.ra-bar button:focus-visible{outline:3px solid #fde047;outline-offset:2px}   /* 10.9:1 บนแถบ */
.ra-fab:focus-visible{outline:3px solid #0f172a;outline-offset:3px;box-shadow:0 0 0 6px #fff}
@media (prefers-color-scheme:dark){.ra-fab:focus-visible{outline-color:#fde047;box-shadow:0 0 0 6px #0f172a}}
```

### S4. read-aloud: สถานะไม่ถูกประกาศ และปุ่มความเร็วไม่มีบริบท — **Moderate** · WCAG 4.1.3 Status Messages
- **ปัญหา:**
  - ข้อความ "เครื่องนี้ยังไม่มีเสียงภาษาไทย…" (`hint.textContent = T.novoice`) ไม่อยู่ใน live region ผู้ใช้ screen reader กับผู้สูงอายุจึงไม่รู้ว่าทำไมไม่มีเสียง
  - เมื่อกด "ช้าลง/เร็วขึ้น" ค่า `×1.1` เปลี่ยน แต่ไม่ถูกประกาศ และ span `.ra-rate` ไม่มีป้ายกำกับ (screen reader อ่านว่า "คูณ 1.0")
  - ข้อความบนปุ่ม fab มีอีโมจิ "🔊" ซึ่ง screen reader จะอ่านชื่ออีโมจิออกมาด้วย (Minor)
- **แก้:**
```js
hint.setAttribute("role","status"); hint.setAttribute("aria-live","polite");
rate.setAttribute("aria-hidden","true");
function setRate(v){ /* …เดิม… */
  bSlow.setAttribute("aria-label", T.slower + " (" + T.speed + " " + speed.toFixed(1) + ")");
  bFast.setAttribute("aria-label", T.faster + " (" + T.speed + " " + speed.toFixed(1) + ")");
  hint.textContent = T.speed + " " + speed.toFixed(1) + (LANG==="en" ? "×" : " เท่า");
}
fab.innerHTML = '<span aria-hidden="true">🔊</span> ' + T.open.replace("🔊 ","");
```

### S5. read-aloud: ปุ่มในแถบสูง 40px, แถบบังจอมาก, และไฮไลต์ประโยคที่กำลังอ่านจางเกินไป — **Moderate** · WCAG 2.5.8 (ผ่าน AA ที่ 24px แต่ต่ำกว่าเป้าหมาย 44px), 1.4.10, 2.4.11, 1.4.11
- **ปัญหา:**
  - `.ra-bar button{min-height:40px}`: ปุ่ม "ปิด" กว้าง 44 สูง 40 และปุ่มอื่นสูง 40
  - เมื่อเปิดแถบ ที่ 320×640 แถบสูง **218px** (brain) หรือ 172px (body) รวมกับ sw-bar ที่ sticky อีก 53px จะบังจอราว 42% ส่วนที่ 640×360 (= จอ 1280×720 ซูม 200%) แถบสูง 126px + 57px = **51% ของจอ** เนื้อหาที่มีโฟกัสจึงถูกบังได้ทั้งหมด
  - ไฮไลต์ `.ra-on`: พื้น `rgba(15,118,110,.16)` เทียบพื้นหน้าได้แค่ **1.24:1** และวง `0 0 0 3px rgba(15,118,110,.22)` ได้ **1.35:1** (มืด 1.78:1) ผู้ป่วยที่ contrast sensitivity ต่ำแทบมองไม่เห็นว่ากำลังอ่านบรรทัดไหน
- **แก้:**
```css
.ra-bar button{min-height:44px;min-width:44px}
@media (max-width:520px),(max-height:500px){ .ra-hint{display:none} .ra-bar{gap:4px;padding:6px 8px;bottom:8px} }
body.ra-open{padding-bottom:calc(var(--ra-h,120px) + 24px)}
html.ra-open{scroll-padding-bottom:calc(var(--ra-h,120px) + 24px)}
.ra-on{background:rgba(15,118,110,.12);outline:3px solid #0f766e;outline-offset:4px;border-radius:6px} /* 4.82:1 */
@media (prefers-color-scheme:dark){.ra-on{outline-color:#5eead4;background:rgba(94,234,212,.12)}}      /* 13.0:1 */
```
```js
// ตอนเปิดหรือปิดแถบ
document.documentElement.classList.toggle("ra-open", on); document.body.classList.toggle("ra-open", on);
document.documentElement.style.setProperty("--ra-h", bar.offsetHeight + "px");
```

### S6. read-aloud: auto-scroll แบบ smooth ไม่สนใจ reduced motion — **Moderate** · WCAG 2.3.3 (AAA) / 2.2.2
- **ปัญหา:** `cur.scrollIntoView({ block:"center", behavior:"smooth" })` (บรรทัด 1643) เลื่อนหน้าเองทุกย่อหน้า และเลื่อนแบบ smooth แม้ผู้ใช้จะตั้ง reduce motion ไว้ (ค่า `behavior` ที่ใส่ใน JS ไม่ถูก CSS `scroll-behavior:auto` override) ถ้าผู้ใช้เลื่อนหน้าไปดูที่อื่น หน้าจะถูกดึงกลับมาเอง
- **แก้:**
```js
var RM = false; try { RM = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){}
var r = cur.getBoundingClientRect();
if (r.top < 70 || r.bottom > innerHeight - (bar.offsetHeight + 20))   // เลื่อนเฉพาะเมื่อหลุดจอ
  cur.scrollIntoView({ block:"center", behavior: RM ? "auto" : "smooth" });
```

### S7. polish.css: footer `opacity:.9` ทำให้ contrast ตก — **Serious** · WCAG 1.4.3
- **ที่:** `.wrap3 footer{…;opacity:.9}` (บรรทัด 1503)
- **ปัญหา:** `--ink-2 #586176` บน `#EDF1F4` = 5.46:1 แต่เมื่อคูณ opacity .9 จะเหลือ **4.41:1** (axe วัดได้ 4.42 คือ `#676f83` บน `#edf1f4`) กระทบทั้ง 32 ไฟล์ของเทมเพลต A ในโหมดสว่าง (โหมดมืด 6.63:1 ผ่าน)
- **แก้:** ลบ `opacity:.9` ออก ถ้าต้องการให้ดูเบาลง ให้ลดขนาดตัวอักษรหรือเส้นแทน
```css
.wrap3 footer{margin-top:36px;padding-top:20px;border-top:1px solid var(--line)}
```

### S8. polish.css: `.sw-bar` sticky บังเมนูบทของ cells และบังหัวข้อเมื่อกด anchor — **Serious** · WCAG 2.4.11 Focus Not Obscured (Minimum), 1.4.10
- **ที่:** `.sw-bar{position:sticky;top:0;z-index:60;…}` (บรรทัด 1437)
- **ปัญหา:**
  1. ใน cells ที่ ≤1060px `.rail` (เมนูบท) เป็น `position:sticky;top:0;z-index:10` ตรงกับ sw-bar ที่ `top:0` แต่ z-index สูงกว่า ผลคือ **rail ถูกบังทั้งแถบเมื่อเลื่อนหน้า** (ยืนยันแล้ว: `elementFromPoint` ที่กลาง rail ได้ลิงก์ใน sw-bar)
  2. `.ch{scroll-margin-top:16px}` แต่ sw-bar สูง 48–57px เมื่อกดลิงก์สารบัญ หัวข้อบทจึงไปอยู่ใต้แถบ และเมื่อกด Shift+Tab กลับขึ้นไป องค์ประกอบที่มีโฟกัสก็ถูกบังได้
  3. เมื่อซูม 200–400% แถบ sticky กินพื้นที่แนวตั้งมาก
- **แก้:**
```css
html{scroll-padding-top:72px}
.ch,[id]{scroll-margin-top:72px}
@media (max-width:1060px){ .shell .rail{top:52px} }                  /* cells: ให้ rail อยู่ใต้ sw-bar */
@media (max-height:500px),(max-width:360px){ .sw-bar{position:static!important} }  /* จอเตี้ยหรือซูมมาก: ไม่ต้อง sticky */
```

### S9. polish.js: "section reveal" ทำให้เนื้อหาโปร่งใส (opacity 0) — **Moderate** · WCAG 1.3.2 / 2.4.7 (ความเสี่ยง), best practice
- **ที่:** CSS `.bp-reveal{opacity:0;transform:translateY(14px)}` (บรรทัด 1495) และ JS บรรทัด 1541–1551
- **ผลที่วัดได้:** ทันทีหลัง `load` ทุก `.wrap3 .ch` ยกเว้นบทแรกจะ**มองไม่เห็นทั้งหมด** (เช่น ai 12/12, airobot 14/14, senses 13/13, virus 11/11) และจะมองเห็นเมื่อ IntersectionObserver ทำงาน หรือเมื่อ timeout ครบ 3 วินาที
- **สิ่งที่ทำถูกแล้ว:** ถ้าตั้ง `prefers-reduced-motion: reduce` JS จะ `return` ก่อนใส่ class (ยืนยันแล้ว: reveal = 0 ทุกไฟล์) และถ้าไม่มี IntersectionObserver ก็ไม่ซ่อน และมี fallback 3 วินาที
- **ความเสี่ยงที่เหลือ:**
  1. ภายใน 3 วินาทีแรก ถ้าผู้ใช้กด Tab, ใช้ Find-in-page, กด anchor หรือสั่งพิมพ์ จะเจอเนื้อหาที่มีโฟกัสหรือไฮไลต์ค้นหา แต่มองไม่เห็น
  2. screen reader ยังอ่านเนื้อหาที่ opacity 0 ได้ ผู้ช่วยที่มองจอกับผู้ใช้ที่มองเห็นเลือนรางจะเห็นไม่ตรงกัน
  3. การ fade ขึ้นมา 0.55 วินาทีทำให้ผู้ที่ contrast sensitivity ต่ำเห็นข้อความ "จาง" ระหว่างทาง
- **แก้:** อย่าซ่อนเนื้อหาให้มองไม่เห็นทั้งหมด ให้เหลือเฉพาะการเลื่อนเล็กน้อย และเปิดทันทีเมื่อมีโฟกัสหรือตอนพิมพ์
```css
.bp-reveal{transform:translateY(14px)}                   /* ไม่ใช้ opacity:0 */
.bp-reveal.bp-in{transform:none;transition:transform .45s cubic-bezier(.2,.7,.3,1)}
.bp-reveal:focus-within,.bp-reveal:target{transform:none}
@media print{.bp-reveal{transform:none!important;opacity:1!important}}
```

### S10. polish.css: reduced motion ยังไม่ครอบคลุม hover ของตัวเลือกคำตอบและปุ่มแกลเลอรี — **Minor** · WCAG 2.3.3 (AAA)
- **ปัญหา:** บล็อก `@media (prefers-reduced-motion:reduce)` ที่บรรทัด 1505 ปิดแค่ `.card/.btn/.ch-art` ส่วน `.opt:hover, .gal button:hover, .vlist button:hover, .gbins button:hover{transform:translateY(-1px)}` ยังขยับอยู่ (เทมเพลต A/B/C มี catch-all ที่ตัด transition ให้แล้ว จึงเป็นแค่ Minor)
- **แก้:** เพิ่มใน reduce block
```css
.opt:hover,.gal button:hover,.vlist button:hover,.gbins button:hover{transform:none}
html{scroll-behavior:auto!important}
```

### S11. ไม่มี skip link และไม่มี landmark `<main>` — **Moderate** · WCAG 2.4.1 Bypass Blocks, 1.3.1
- **ปัญหา:** ไม่มี skip link ในไฟล์ใดเลย และมี `<main>` แค่ใน cells th/en กับ kit/index ส่วนอีก 38 ไฟล์ไม่มี ก่อนถึงเนื้อหามี sw-bar 3–6 ลิงก์ ในบางบทมีสารบัญ 11 ระดับหรือ rail หลายลิงก์ต่อจากนั้น และผู้ใช้ VoiceOver ใช้ rotor "Landmarks" ไปที่เนื้อหาหลักไม่ได้
- **แก้ (ใน chunk sw-bar ที่ site_build แทรกอยู่แล้ว):**
```html
<a class="skip" href="#main">ข้ามไปที่เนื้อหา</a>   <!-- EN: Skip to content -->
<nav class="sw-bar" …>…</nav>
```
```css
.skip{position:absolute;left:8px;top:-60px;z-index:100;background:#0f172a;color:#fff;padding:12px 16px;border-radius:10px;font:600 16px/1.2 system-ui}
.skip:focus{top:8px;outline:3px solid #fde047}
```
และให้ site_build เปลี่ยน `<div class="wrap3"` เป็น `<main class="wrap3" id="main"` (body: เนื้อหาหลักหลัง sw-bar, เกม: `.wrap`) หรือใช้ fallback ใน polish.js:
```js
var m = document.querySelector("main") || document.querySelector(".wrap3, .shell, .wrap");
if (m){ if (!m.id) m.id = "main"; if (m.tagName !== "MAIN") m.setAttribute("role","main"); m.setAttribute("tabindex","-1"); }
```

### S12. (แก้ผ่าน polish ได้ แม้ต้นเหตุจะอยู่ในเทมเพลต) override ที่แนะนำให้ใส่ใน polish.css / polish.js
ปัญหาต่อไปนี้มาจาก CSS/HTML ของแต่ละบท (หัวข้อ 3) แต่ pattern ซ้ำกันทุกบท จึง**แก้ครั้งเดียวใน chunk ร่วมได้เร็วที่สุด**

```css
/* 3.A1 สีหัวข้อ "รู้หรือไม่" ใช้สีเนื้อหา แล้วย้ายสีประจำหัวข้อไปเป็นแถบข้าง */
.infocard .city{border-left:5px solid var(--hue,var(--accent))}
.infocard .city b{color:var(--ink)!important}
/* 3.A3 ป้ายระดับ l1 (4.34:1) */
.term .lv.l1,.l1.lv{color:#17603F}                          /* 6.36:1 บน #DDF0E6 */
@media (prefers-color-scheme:dark){.term .lv.l1,.l1.lv{color:var(--good)}}
/* 3.A4 reflow ที่ 320px */
.remember b{white-space:normal}
.sens>*,.demo,.demo>*,.grid2>*,.zoom>*,.lm-row>*{min-width:0}
.wrap3 p,.wrap3 li,.wrap3 span,.wrap3 b{overflow-wrap:anywhere}
```
```js
/* 3.A2 SVG ที่มีปุ่มข้างใน ห้ามเป็น role=img */
document.querySelectorAll("svg[role='img']").forEach(function(s){
  if (s.querySelector("[tabindex],[role='button'],a")) s.setAttribute("role","group");
});
/* 3.A5 การ์ดข้อมูลและคำตอบ quiz ให้ screen reader อ่านเมื่อเปลี่ยน */
document.querySelectorAll(".infocard,[id$='Info'],.fb,#info").forEach(function(el){
  el.setAttribute("aria-live","polite");
});
/* 3.A6 กล่อง code หรือตารางที่เลื่อนแนวนอนได้ ต้องโฟกัสด้วยแป้นพิมพ์ได้ */
document.querySelectorAll("pre, [style*='overflow-x:auto']").forEach(function(el){
  if (el.scrollWidth > el.clientWidth && !el.querySelector("a,button,input,[tabindex]")){
    el.tabIndex = 0; el.setAttribute("role","region");
    el.setAttribute("aria-label", document.documentElement.lang==="en" ? "Scrollable box" : "กล่องเลื่อนดูได้");
  }
});
```

### สิ่งที่ตรวจในไฟล์ร่วมแล้วผ่าน
- `.bp-progress` มี `aria-hidden="true"` ✓
- read-aloud: `.ra-bar` มี `role="group"` + `aria-label` ✓ ทุกปุ่มเป็น `<button type="button">` ✓ fab สูง 48px ✓ contrast fab 5.47:1 (สว่าง) / 6.67:1 (มืด) ✓ ปุ่มในแถบ 14.4:1 ✓ `.ra-hint` 10.3:1 ✓ `.ra-rate` 13.0:1 ✓ หยุดเสียงเมื่อออกจากหน้า ✓ ใช้ `<html lang>` เลือกภาษา ✓ มีปุ่มหยุดและปรับความเร็ว 0.6–1.4 ✓
- sw-bar (chunk ร่วม): ลิงก์ `min-height:44px` ✓ ลิงก์เปลี่ยนภาษามี `lang`/`hreflang` ✓ contrast ลิงก์ 5.35:1 (สว่าง, พื้น polish โปร่ง .82) / 12.7:1 (มืด) ✓ ตัวคั่น "/" เป็น `aria-hidden` ✓
- `.btn` gradient: `--accent-ink` บนสีปลาย gradient ได้ 9.35:1 (A สว่าง) / 5.84:1 (A มืด) / 6.05:1 และ 5.01:1 (body) ✓ `.ch-num` 6.35:1 และ 6.45:1 ✓
- `.opt.right/.opt.wrong` ไม่ได้บอกผลด้วยสีอย่างเดียว เพราะมีข้อความ "ถูกต้อง · / คำตอบคือ …" และ line-through ✓

---

## 3. ปัญหารายเทมเพลตและรายไฟล์

### 3.A เทมเพลต A "wrap3" — ai, airobot, animals, brain, dna, growth, heart, hormones, life, mind, neurologist, play, robot, senses, space, virus (th+en รวม 32 ไฟล์)

| # | ปัญหา | ที่ (อ้างอิง brain/th.html) | ระดับ · SC | วิธีแก้ |
|---|---|---|---|---|
| A1 | หัวข้อ "รู้หรือไม่" ในการ์ดข้อมูลใช้สีประจำหัวข้อ (`--hue`) บนพื้น `--panel-2` | `.infocard .city b{color:var(--hue,var(--accent))}` บรรทัด 305 | **Serious** · 1.4.3 | ดู S12 (ใช้ `--ink` แล้วย้ายสีไปเป็นเส้นขอบ) ค่าที่วัดได้ (สว่าง): brain `#f2c94c` **1.32**, `#b8860b` 2.7, `#dd6630` 2.9 · heart `#f2c94c` 1.32, `#9fc4dc` 1.53, `#c05b4a` 3.61 · senses `#e8a33a` 1.79 · life `#7fb98f` 1.89, `#dd9a30` 1.99, `#5faad2` 2.13, `#b5724a` 3.19, `#8b6b3a` 4.09 · robot `#10b981` 2.11, `#0ea5e9` 2.3, `#6366f1` 3.71 · dna `#e8c98f` 1.32 · hormones `#c9a9e8` 1.69 · virus `#7fa8c9` 2.09, `#dd6630` 2.9 · ai `#6366f1` 3.71, `#dc2626` 4.01 · space `#3b82f6` 3.06 · mind/neurologist `#8f6cc6` 3.4 · โหมดมืดก็ตก เช่น ai `#dc2626` 3.21, life `#8b6b3a` 3.14 |
| A2 | `<svg role="img">` ที่มี hotspot `role="button" tabindex="0"` อยู่ข้างใน ทำให้ VoiceOver/TalkBack ถือทั้ง SVG เป็นภาพเดียว | เช่น `#neuSvg` บรรทัด 623, `#brainSvg` 715 | **Serious** · 4.1.2, 1.3.1 (axe `nested-interactive` 1–4 จุดต่อไฟล์) | เปลี่ยนเป็น `role="group"` แล้วคง `aria-label` ไว้ (หรือใช้ JS ใน S12) |
| A3 | ป้ายระดับ `.term .lv.l1` สีเขียว `#1F7C55` บน `#DDF0E6` ตัว 11px | ai/th บรรทัด 690 (ai, robot, airobot) | Serious · 1.4.3 (**4.34:1**) | `#17603F` (6.36:1) ขยายเป็น ≥12px |
| A4 | เลื่อนแนวนอนที่ 320px | `.remember b{white-space:nowrap}` บรรทัด 196 · grid child ของ `.sens`/`.demo` ไม่มี `min-width:0` · `.qgrid minmax(290px,1fr)` | **Serious** · 1.4.10 Reflow | S12 + `.qgrid{grid-template-columns:repeat(auto-fit,minmax(min(290px,100%),1fr))}` · scrollWidth ที่ 320px: **brain/en 643**, heart/en 567, dna/en 545, life/en 521, mind/en 497, ai/en 467, virus/en 461, senses/en 428, neurologist/en 423, space/en 407, airobot/en 389, dna/th 376, robot th/en 366, life/th 364, space/th 359, brain/th 356, hormones/en 351, mind/th 338, neurologist/th 335, heart/th 326 · ไฟล์ที่ผ่าน (=320): ai/th, airobot/th, animals, growth, hormones/th, play, senses/th, virus/th |
| A5 | ผลของการกด hotspot หรือตอบ quiz ไม่ถูกประกาศ (มีแค่ `#toast` ที่เป็น live) และ option ถูก `disabled` ทันทีหลังตอบ ทำให้โฟกัสหลุด | quiz บรรทัด 1095–1101 · `info.innerHTML = …` บรรทัด 833 | Moderate · 4.1.3, 2.4.3 | ใส่ `aria-live="polite"` ที่ `.fb` และการ์ดข้อมูล (S12) แทนการ `disabled` ให้ใช้ `aria-disabled="true"` และคงโฟกัสไว้ หรือย้ายโฟกัสไปที่ `.fb` (`tabindex=-1`) |
| A6 | hotspot บน SVG เล็ก: ที่ 390px (มือถือ) brain `g.hot` 16px, senses 18px, heart 18px, robot 19px, neurologist 27px และที่ 1280px ก็แค่ 29–35px | `.sens .hot circle.dot` | **Serious** · 2.5.8 (<24px ถ้าไม่มีปุ่มทดแทน) + เป้า 44px สำหรับผู้ป่วยมือสั่น | ขยายพื้นที่แตะด้วยวงกลมใส: `<circle class="hit" r="22" fill="transparent"/>` ใน `g.hot` และทำรายการปุ่ม (legend) ข้างภาพที่สูง ≥44px ทำหน้าที่เดียวกัน |
| A7 | play: เหรียญรางวัลที่ยังล็อก `.badge{opacity:.38}` ทำให้ชื่อเหรียญ (`.nm`) ได้ **1.78:1** (สว่าง) / **2.02:1** (มืด) | play/th บรรทัด 540 | Serious · 1.4.3 (เป็นข้อความ ไม่ใช่ control ที่ disabled จึงไม่ได้รับยกเว้น) | ให้ข้อความเป็นสี `--ink-2` (5.66:1) แล้วลด opacity เฉพาะไอคอน และเติมคำ "ยังไม่ได้" หรือไอคอนกุญแจ เพื่อไม่ให้บอกสถานะด้วยความจางอย่างเดียว (1.4.1) |
| A8 | airobot: `pre.code` และ `div[style=overflow-x:auto]` เลื่อนได้แต่โฟกัสไม่ได้ | axe `scrollable-region-focusable` (th 2, en 3) | Moderate · 2.1.1 | `tabindex="0" role="region" aria-label="โค้ด…"` (S12) |
| A9 | airobot: `#ch-layers .ly-reg:focus{outline:none}` แต่มี `:focus-visible .ly-ring` เป็นวงประทดแทน ✓ · `.tm-fb:focus{outline:none}` และ `.wr-demo[tabindex=-1]:focus{outline:none}` เป็นเป้าโฟกัสแบบโปรแกรม ใช้ได้ | airobot บรรทัด 962, 1486, 1783 | Minor | ตรวจด้วยตาว่าวงประของ `.ly-ring` (stroke 2.2px) เห็นชัดบนพื้นภาพ |
| A10 | robot: ปุ่ม attention ที่ถูกเลือก `.attn button.sel{outline:3px solid var(--accent-wash)}` ไปทับวงโฟกัส (`#E8E2F5` บนพื้นอ่อน ≈1.1:1) และพื้นปุ่มเป็น heatmap `rgba(99,102,241,x)` ทำให้ contrast ของตัวหนังสือไม่แน่นอน | robot/th บรรทัด 737, 1770 | Minor · 2.4.7, 1.4.3 | `.attn button.sel:focus-visible{outline-color:var(--accent)}` และจำกัด alpha ให้ไม่เกิน .45 หรือใช้ตัวหนังสือสีขาวเมื่อ alpha สูง |
| A11 | ข้ามระดับ heading: airobot และ robot `h1 → h3` ("สารบัญ 11 ระดับ") ส่วน ai, cells, robot มี `h2 → h4` ใน DOM ที่ JS สร้าง | — | Minor · 1.3.1 | สารบัญใช้ `h2` การ์ดที่ JS สร้างใช้ `h3` |
| A12 | mini-game แบบจับเวลา (ai g15 45 วินาที, life g7, neurologist g13, robot g16, senses g5, space g14, virus g6) ไม่มีตัวเลือกไม่จับเวลา | เช่น ai/th บรรทัด 1452 | Moderate · 2.2.1 Timing Adjustable | เพิ่มปุ่ม "เล่นแบบไม่จับเวลา" หรือ "เพิ่มเวลา ×2" (play มีโหมด practice ที่ไม่จับเวลาแล้ว ✓) |
| A13 | ขนาดตัวอักษรทั้งหมดเป็น px (176–495 จุดต่อไฟล์ ไม่มี rem เลย) | ทุกไฟล์ | Minor · 1.4.4 (ผ่านเพราะซูมเบราว์เซอร์ใช้ได้) | ผู้ที่ตั้ง "ขนาดตัวอักษร" ในเบราว์เซอร์ Chrome/Firefox desktop จะไม่ได้ผล ในระยะยาวควรเปลี่ยน `body{font-size:17px}` เป็น `1.0625rem` และค่าย่อยเป็น `em`/`rem` ข้อความเล็ก 11–12.5px (เช่น `.rail-title`, `.lvl-size`, `.level-tag`, `.ch-num`) ควรเป็นอย่างน้อย 14px สำหรับผู้ป่วยที่มองมัว |
| A14 | ปุ่มตอบ `.opt` สูง 43px และปุ่มทั่วไปสูง 36–39px | — | Minor (ผ่าน 2.5.8 AA) | `min-height:48px` สำหรับผู้ป่วยมือสั่น |

**สิ่งที่ผ่านในเทมเพลต A:** `lang` ถูกทุกไฟล์ · ทุกหน้ามี h1 เดียว · `<img>` มี alt ภาษาไทยที่มีความหมายครบ (0 รูปที่ขาด alt) · hotspot ส่วนใหญ่มี `role=button` + `aria-label` + Enter/Space · `:focus-visible` 3px (`#5A3E9E` บนพื้น = 6.35–7.7:1) · reduced-motion catch-all (`*{animation-duration:.001ms…}`) ตรวจแล้วไม่มี infinite animation ค้างเมื่อตั้ง reduce · `html{scroll-behavior:smooth}` ถูกปิดเมื่อ reduce · ไม่มี iframe · form control มี label ครบ (axe `label` ผ่าน)

### 3.B เทมเพลต B "body" — body/th.html, body/en.html

| # | ปัญหา | ที่ (body/th.html) | ระดับ · SC | วิธีแก้ |
|---|---|---|---|---|
| B1 | วงกลม hotspot 51 วง `role="button" tabindex="0"` **ไม่มีชื่อ** screen reader อ่านได้แค่ "ปุ่ม" 51 ครั้ง | JS บรรทัด 878–884 | **Critical** · 4.1.2 (axe `aria-command-name` 51) | `h.setAttribute("aria-label", FACTS[h.dataset.key].title)` |
| B2 | hotspot เล็กมาก: `r=9` แสดงผล **17px ที่ 1280** และ **14px ที่มือถือ** ไม่มีปุ่มทดแทน | `.hot{…}` บรรทัด 209 | **Serious** · 2.5.8 | เพิ่มวงใส `r≥20` สำหรับรับการแตะ และทำรายการปุ่มของอวัยวะในระบบที่เลือก |
| B3 | `svg.bodysvg role="img"` มีปุ่มอยู่ข้างใน | บรรทัด 408 | Serious · 4.1.2 | `role="group"` |
| B4 | การ์ด `#info` เปลี่ยนเนื้อหาแต่ไม่ประกาศ (หน้านี้ไม่มี live region เลย) | บรรทัด 435 | Moderate · 4.1.3 | `aria-live="polite"` |
| B5 | contrast โหมดสว่าง: `.eyebrow` `#0E7C86`/`#F1F4F3` **4.47** · `.lede` `#5B7481` **4.45** · `.tag`/`.fig .v` `#63798A`/`#FBFCFB` **4.41** · `.wow>b` `#63798A`/`#E7ECEB` **3.79** | บรรทัด 142, 144 | Serious · 1.4.3 | `--ink-2:#4A6270` (5.8:1), `--c-bone:#56697A` (4.76:1 บน #E7ECEB), eyebrow ใช้ `#0B6E77` (5.4:1) |
| B6 | ไม่มี `.wrap3` จึงไม่ได้ทั้ง reveal และ read-aloud (ดู **S1**) | — | Critical (ผ่าน S1) | — |
| B7 | ไม่มี `<main>` และ skip link | — | Moderate · 2.4.1 | S11 |

ผ่าน: ไม่เลื่อนแนวนอนที่ 320px ✓ · โหมดมืด axe ไม่เจอ contrast ✓ · infinite animation (`.dot@blip`, `.hotring@ring`) หยุดเมื่อตั้ง reduce ✓

### 3.C เทมเพลต C "cells" — cells/th.html, cells/en.html

| # | ปัญหา | ที่ | ระดับ · SC | วิธีแก้ |
|---|---|---|---|---|
| C1 | read-aloud อ่านไม่ได้ (ไม่มี `.wrap3`) | — | **Critical** | S1 |
| C2 | rail (เมนูบท) ถูก sw-bar บังทั้งแถบที่ ≤1060px | `.rail{position:sticky;top:0;z-index:10}` บรรทัด 456 | **Serious** · 2.4.11 | S8 (`.shell .rail{top:52px}`) |
| C3 | ลิงก์ใน rail (desktop) สูง **23.6px** ระยะห่าง 23.2px | `.lvl a{…padding:2px 0;line-height:1.45}` บรรทัด 178 | Serious · 2.5.8 (axe `target-size` 7–9) | `padding:10px 0; min-height:44px` |
| C4 | จุด pin ของ organelle `g.pin` เล็ก 12–17px (มี `g.org` คลิกได้แทน แต่ใช้ได้เฉพาะเมาส์ และ `.chip` 39px ซึ่งเป็นทางเลือกที่ดี) | — | Moderate · 2.5.8 | ถ้า `.chip` ทำหน้าที่เดียวกันครบ ให้ระบุในคำแนะนำว่า "แตะชื่อในรายการได้" และขยาย `.chip` เป็น 44px |
| C5 | rail เลื่อนแนวนอนที่ 320px (en: scrollWidth 421, th: 338) เพราะ `.rail{margin:0 -24px}` กว้างกว่าจอ | บรรทัด 456–457 | Moderate · 1.4.10 | `margin-inline:0`; `max-width:100%` |
| C6 | `svg#animalSvg/#plantSvg role="img"` มี focusable ข้างใน | — | Serious · 4.1.2 | `role="group"` |

ผ่าน: มี `<main>` ✓ · `g.wobble` infinite animation หยุดเมื่อตั้ง reduce ✓ · contrast ผ่านทั้งสองโหมด (axe 0)

### 3.D เกม (แยกตามไฟล์)

#### chess/th.html — หมากรุกสากล 3 มิติ (three.js)
| # | ปัญหา | ที่ | ระดับ · SC | วิธีแก้ |
|---|---|---|---|---|
| G1 | **เล่นด้วยแป้นพิมพ์ไม่ได้เลย:** `#stage tabindex="0" role="application"` แต่ไม่มี `keydown` ใดเลย (มีแค่ mouse/touch/wheel) ผู้ใช้ screen reader กับผู้ที่ใช้เมาส์ไม่ได้จึงเล่นไม่ได้ และ `role="application"` ยังปิดโหมดอ่านของ screen reader ด้วย | บรรทัด 550–580 | **Critical** · 2.1.1 | ทำ cursor 8×8 แบบเดียวกับ makruk (ลูกศร/Enter/U) วาด `addMark(cursor,"cursor")` และประกาศช่องผ่าน `say()` ที่มีอยู่แล้ว |
| G2 | **แตะหรือคลิกกลายเป็นหมุนกระดาน:** เลือกตัวหมากได้เฉพาะเมื่อ `moved<6` px (เมาส์) หรือ `<8` px (นิ้ว) ผู้ป่วย tremor เคลื่อนเกินนี้เป็นปกติ | บรรทัด 566–578 | **Serious** · 2.5.1/2.5.2 (ผลลัพธ์ผิดจากเจตนา) | ขยายเกณฑ์เป็น 20–24px และเพิ่มปุ่ม "ล็อกกระดาน (ไม่หมุนเมื่อลาก)" การหมุนมีปุ่มทดแทนแล้ว (มุมมองฝ่ายตรงข้าม / รีเซ็ต / มองจากด้านบน ✓ ผ่าน 2.5.7) แต่การซูมใช้ได้เฉพาะ wheel ควรเพิ่มปุ่ม +/− |
| G3 | ช่องกระดานเล็ก: stage 258×194 ที่ 320px และ 328×246 ที่ 390px ในมุมมองเอียง แถวไกลเล็กราว 20–25px | — | Serious · 2.5.8 | บนจอสัมผัสหรือจอแคบ ให้เริ่มที่ "มองจากด้านบน" และเพิ่ม `aspect-ratio:1` |
| G4 | เครื่องหมายบนกระดานต่างกันแค่สี: risk วงแดง `#d4452f` / capture วงเขียว `#3ec98a` (สองสีนี้ต่างกันแค่ **2.12:1**) / hint วงฟ้า / selected วงเหลือง และ last move เป็นแผ่นเหลือง opacity **.18** | `addMark` บรรทัด 509–530 | Moderate · 1.4.1, 1.4.11 | ใช้รูปทรงต่างกัน (risk เป็นกากบาท ×, hint เป็นเส้นประ, capture เป็นมุมสี่มุม) และให้ last move มีขอบทึบ ≥3:1 |
| G5 | กล้องหมุน 180° เองทุกตาในโหมดสองคน และตัวหมากมีแอนิเมชัน โดยไม่เช็ก reduced motion (ไม่มี `prefers-reduced-motion` ในไฟล์เลย) | บรรทัด 468, 665 | Moderate · 2.3.3 (AAA) · vestibular | `if (RM) camYaw = camTargetYaw;` (snap) และข้ามแอนิเมชันการเดิน |
| G6 | กล่องเลื่อนขั้นเบี้ย `#promoBox` ไม่มี `role="dialog"`/`aria-modal` และไม่ย้ายโฟกัส | บรรทัด 292, 651 | Moderate · 4.1.2, 2.4.3 | `role="dialog" aria-modal="true" aria-labelledby` และ focus ปุ่ม "ควีน" |
| G7 | ปุ่มสูง 38px (viewbar, help), 34px (coach-head), 40px (seg) | CSS บรรทัด ~65–110 | Minor (ผ่าน 2.5.8 AA) | `min-height:44px` |
| G8 | ไม่มี `<main>` และ skip link | — | Moderate · 2.4.1 | S11 |

ผ่าน: มี live region `#live` ประกาศการเดินเป็นภาษาไทย ✓ · contrast ข้อความ `--muted` 5.44:1 บน panel และ 4.71:1 บน ground ✓ · focus-visible `--seal` 3px ✓ · ไม่เลื่อนแนวนอนที่ 320px ✓

#### go/th.html — หมากล้อม 9×9 (canvas)
| # | ปัญหา | ระดับ · SC | วิธีแก้ |
|---|---|---|---|
| G9 | ช่องจุดตัดเล็ก: ≈27px ที่ 320px, ≈34px ที่ 390px วางหมากทันทีโดยไม่ยืนยัน (`วางแล้ววางเลยไม่ต้องยืนยัน`) ผู้ป่วยมือสั่นจึงวางพลาดง่าย แม้จะมีปุ่มย้อนกลับ | Serious · 2.5.8 (ผ่าน AA ที่ 24 แต่ต่ำกว่า 44 มาก) | เพิ่มโหมด "แตะเพื่อเล็ง แตะซ้ำเพื่อวาง" (แสดงหมากโปร่งตรงจุดที่แตะครั้งแรก) และให้บอร์ดกว้างเต็มจอ (ลด padding ของ `.stagewrap`) |
| G10 | พิกัดบนขอบกระดานวาดด้วย `--board-rim` × alpha .6 ได้ **1.77:1** (สว่าง) / **1.87:1** (มืด) ตัวอักษรเล็กสุด 8px | Serious · 1.4.3 | ใช้ `--line` ที่ alpha 1 และตัวอักษร ≥12px |
| G11 | โหมดมืด: เส้นกระดาน `#261608` บน `#6D4A26` ได้ **2.21:1** และหมากดำ `#0C0C11` บนกระดานมืด 2.47:1 | Moderate · 1.4.11 | ใช้เส้นสีอ่อนกว่า (เช่น `#E8D3B0`) และขอบหมากดำสีอ่อน 1.5px |
| G12 | เครื่องหมาย atari แยกฝ่ายด้วยสีเท่านั้น (`--seal` แดง กับ `--good` เขียว ต่างกันแค่ 1.26:1) | Moderate · 1.4.1 | ใช้รูปทรงต่างกัน หรือบอกด้วยข้อความในแผงข้าง |
| G13 | ปุ่มสูง 38px | Minor | 44px |

ผ่าน: canvas `tabindex=0` + `aria-label` ที่อธิบายวิธีใช้ ✓ · ลูกศร/Enter/P/U ใช้งานได้ (ตัวอักษรเดี่ยวทำงานเฉพาะตอน canvas มีโฟกัส จึงผ่าน 2.1.4) ✓ · ประกาศตำแหน่ง cursor ✓ · เล่นด้วยการคลิกอย่างเดียว ไม่ต้องลาก ✓ · hover preview มีเทียบเท่าบน keyboard cursor ✓ · มี `prefers-reduced-motion` ✓

#### makruk/th.html — หมากรุกไทย (canvas)
| # | ปัญหา | ระดับ · SC | วิธีแก้ |
|---|---|---|---|
| G14 | ช่อง ≈31px ที่ 320px, ≈39px ที่ 390px | Moderate · 2.5.8 (ผ่าน AA) | ขยายบอร์ดเต็มความกว้างบนมือถือ |
| G15 | พิกัดบนขอบ alpha .65 ได้ **1.87:1** (สว่าง) / **1.92:1** (มืด) | Serious · 1.4.3 | เหมือน G10 |
| G16 | last move ใช้ alpha .20 | Moderate · 1.4.11 | ใช้ขอบทึบ |
| G17 | ไม่มี `prefers-reduced-motion` | Minor | เพิ่มเงื่อนไขตัดแอนิเมชันการเดิน |

ผ่าน: เลือกตัวแล้วแตะปลายทาง (click-click) ไม่ต้องลาก ✓ · ลูกศร/Enter/U ✓ · จุดเดินได้เป็นจุด ส่วนช่องกินได้เป็นวง จึงแยกด้วยรูปทรงได้ ✓

### 3.E airobot/kit

#### airobot/kit/index.html (ชุดโครงงาน, สองภาษาในหน้าเดียว)
ผ่านส่วนใหญ่: axe 0 ทั้งสองโหมด · `<main>` ✓ · `<section lang="th">` / `<section lang="en">` ถูกต้อง ✓ · ลิงก์และปุ่ม ≥44px ✓ · ไม่เลื่อนแนวนอนที่ 320px (ตารางอยู่ในกล่อง `overflow-x:auto` ซึ่งมีลิงก์ร้านค้าที่โฟกัสได้อยู่ข้างใน)
- **Minor · 2.4.1:** ไม่มีแถบนำทาง sw-bar หรือลิงก์กลับไปที่ "Body 101" ด้านบน (มีแค่ในเนื้อหา) และไม่มี skip link ไป `#en` ซึ่งอยู่ท้ายหน้า (มีลิงก์ "English version below" ✓)
- **Minor:** มี h1 สองตัว (ภาษาละตัว) ยอมรับได้ แต่ควรให้ h1 ของ EN เป็น h2 หรือแยกเป็นสองหน้า
- **Minor · 1.4.12:** `.parts td:last-child{white-space:nowrap}` ทำให้ตารางต้องเลื่อนแนวนอนบนจอแคบ

#### airobot/kit/ai-driver.html
- **Minor · 3.3.2 Labels:** ช่องใส่ลิงก์โมเดลมีแค่ `aria-label` + placeholder ไม่มี label ที่มองเห็น → เพิ่ม `<label for="url">`
- **Minor · 4.1.3:** `#ai` ("AI: waiting") เปลี่ยนตลอดแต่ไม่ได้เป็น live ซึ่งก็ถูกแล้ว เพราะถ้าเป็น live จะประกาศถี่เกินไป แต่ควรประกาศเฉพาะตอนเปลี่ยนคำสั่งผ่าน `#status`
- ผ่าน: `lang="en"` ✓ · ปุ่ม 48px ✓ · STOP `#fff/#b91c1c` 6.5:1 ✓ · Esc หยุดได้ ✓ · `#status` เป็น `role=status` ✓

---

## 4. สิ่งที่ต้องทดสอบด้วยคน / อุปกรณ์จริง (manual)

1. **VoiceOver บน iPhone/iPad (Safari)**
   - หลังแก้ A2 (`role="group"`) ให้ปัดผ่าน hotspot ใน brain, senses, body และฟังว่าอ่านชื่อครบ
   - ทดสอบ read-aloud ร่วมกับ VoiceOver (เสียงสองชุดชนกันหรือไม่ และควรหยุด TTS เมื่อ VoiceOver เริ่มพูด)
   - ใช้ rotor Landmarks/Headings หลังเพิ่ม `<main>`
2. **TalkBack บน Android (Chrome)**: ข้อ 1 ทั้งหมด และตรวจว่ามีเสียงภาษาไทย (Google TTS) หรือไม่ ถ้าไม่มี ข้อความ `novoice` ถูกประกาศหรือเปล่า
3. **read-aloud บนอุปกรณ์จริง** (Safari iOS, Chrome Android, Edge/Chrome Windows ที่ไม่มีเสียงไทย): ทดสอบ pause/resume (แฮ็ก pause/resume ทุก 9 วินาทีอาจทำให้เสียงสะดุดบน Safari), การข้ามย่อหน้า, และตำแหน่งแถบเมื่อมีคีย์บอร์ดหรือ home indicator (safe-area)
4. **ซูม 200% และ 400%** บน desktop Chrome/Safari และ **iOS Safari "ขนาดข้อความ" (aA)**: ดูว่าแถบ sticky กับแถบ read-aloud บังเนื้อหามากแค่ไหน และตรวจ reflow ของ `.demo`, `.sim`, `.zoom` ในแต่ละบท
5. **ตั้งค่าขนาดตัวอักษรของเบราว์เซอร์** (Chrome Settings → Font size = Very large) ยืนยันว่าข้อความเป็น px จึงไม่ขยาย (A13) และ **Android "ขนาดแบบอักษร" + "ซูมการแสดงผล"**
6. **Text spacing (1.4.12)**: ใช้ bookmarklet text-spacing (line-height 1.5, letter-spacing .12em, word-spacing .16em) ดูว่าป้าย `.level-tag`, `.lvl-name` (nowrap) และปุ่มที่ `white-space:nowrap` ถูกตัดหรือไม่ (ภาษาไทยที่มีสระบนและล่างเสี่ยงถูกตัดเมื่อ line-height แคบ)
7. **Windows High Contrast / Forced Colors**: ตรวจ hotspot SVG (`fill:var(--…)`), วงโฟกัส `.ly-ring`, เครื่องหมายบน canvas ของเกม (canvas ไม่ตอบสนอง forced colors เลย) และ `.ra-on`
8. **จำลองตาบอดสี / contrast ต่ำ** (Chrome DevTools → Rendering → Emulate vision deficiencies: protanopia, deuteranopia, blurred vision): ภาพประกอบ (chapter art), แผนภาพ SVG ที่ใช้สีแยกส่วน (legend ต้องมีตัวเลขหรือชื่อกำกับ), เครื่องหมายบนกระดานเกม
9. **ผู้ป่วยมือสั่นจริงหรือ switch control / Voice Control (iOS "แตะ [ชื่อปุ่ม]")**: ปุ่มที่ไม่มีชื่อ (body hotspot) จะสั่งด้วยเสียงไม่ได้ · ทดสอบการแตะช่องหมากรุก 3 มิติ และจุดตัดหมากล้อมบนมือถือ
10. **Keyboard-only ทั้งหน้า** (Tab/Shift+Tab/Enter/Space/Esc): ลำดับโฟกัสผ่าน rail, สารบัญ, เกมในบท (drag-and-drop ในเกมจัดกลุ่ม เช่น `.gbins`, cells `drop(bin)` มีทางเลือกเป็นปุ่มหรือคีย์แล้ว ให้ยืนยันว่าทุกเกมมี) และการ์ดที่ JS สร้างใหม่
11. **ภาพประกอบ**: ตรวจความหมายของ alt ภาษาไทยทุกภาพด้วยคน (อัตโนมัติยืนยันได้แค่ว่าไม่มีภาพที่ขาด alt) โดยดูว่าภาพไหนตกแต่งล้วน ควร `alt=""` หรือไม่
12. **axe "incomplete"** (สีบน gradient, ภาพ, ข้อความซ้อน): airobot 533, dna 66, cells 52, senses 53, robot 50, heart 47, animals 43 ต้องใช้ตาหรือ Colour Contrast Analyser ตรวจเพิ่ม

---

### ภาคผนวก: ค่า contrast ที่คำนวณเอง (WCAG relative luminance)

| คู่สี | ค่า | ผล |
|---|---|---|
| footer `#586176` × opacity .9 บน `#EDF1F4` | 4.41 | ✗ (ถ้าไม่มี opacity ได้ 5.46 ✓) |
| วงโฟกัส `#5A3E9E` บน ra-bar (`#0f172a` + ขาว 8%) | 1.80 | ✗ |
| วงโฟกัส `#0E7C86` (body) บน ra-bar | 2.91 | ✗ |
| ไฮไลต์ `.ra-on` พื้น / วง บน `#EDF1F4` | 1.24 / 1.35 | ✗ (indicator) |
| ra-fab `#fff`/`#0f766e` · มืด `#04231f`/`#14b8a6` | 5.47 · 6.67 | ✓ |
| ra-bar ปุ่ม `#fff` · hint (α.75) · rate (α.85) | 14.41 · 10.34 · 13.04 | ✓ |
| sw-bar ลิงก์ `#0f766e` บนพื้น polish (ขาว .82) · มืด `#5eead4` | 5.35 · 12.73 | ✓ |
| `.l1.lv` `#1F7C55`/`#DDF0E6` | 4.34 | ✗ (แก้เป็น `#17603F` = 6.36) |
| body `.lede` `#5B7481`/`#F1F4F3` · `.wow b` | 4.45 · 3.79 | ✗ |
| go พิกัด (rim α.6) สว่าง/มืด · makruk (α.65) | 1.77/1.87 · 1.87/1.92 | ✗ |
| go เส้นกระดานโหมดมืด `#261608`/`#6D4A26` | 2.21 | ✗ (1.4.11) |
| chess risk `#d4452f` เทียบ capture `#3ec98a` | 2.12 | แยกด้วยสีอย่างเดียว ✗ (1.4.1) |
| chess `--muted` `#6F5E4A` บน panel/ground | 5.44 / 4.71 | ✓ |
