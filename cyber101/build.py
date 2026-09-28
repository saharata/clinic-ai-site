# -*- coding: utf-8 -*-
"""Assemble Cyber 101 lesson pages into public/cyber/ and wire routes.

Each lesson body fragment lives in cyber101/frag/<slug>.html (authored separately).
This wraps every fragment in a shared, WCAG 2.2 AA shell (rem fonts, light/dark,
44px targets, skip link, sticky nav, card styling, hero with image slot) and
builds the hub at /cyber. Safe to re-run: route/sitemap patches check first.
Hero images (optional) go in public/cyber/img/<slug>.jpg; a gradient shows until then.
"""
import html, json, re
from pathlib import Path

SCR = Path(__file__).resolve().parent
SITE = SCR.parent
BASE = "https://www.sahawanclinic.clinic"
OUT = SITE / "public" / "cyber"
DATA = json.loads((SCR / "lessons.json").read_text(encoding="utf-8"))
LESSONS = DATA["lessons"]
COURSE = DATA["course"]
SUBTITLE = DATA["subtitle"]

CSS = """
*{box-sizing:border-box}
:root{
  --bg:#f6f8fb; --panel:#ffffff; --panel-2:#eef2f7; --ink:#0f172a; --ink-2:#475569;
  --line:#d0d8e2; --accent:#1d4ed8; --accent-ink:#ffffff;
  --def-bg:#e7f6ee; --def-line:#15803d; --def-title:#14532d;
  --lab-bg:#e7f0fb; --lab-line:#1d4ed8; --lab-title:#1e3a8a;
  --warn-bg:#fdf0d9; --warn-line:#b45309; --warn-title:#7c2d12;
  --code-bg:#0f172a; --code-ink:#e6edf6;
  --hero-a:#0b2447; --hero-b:#123a6b; --hero-gold:#f7c948;
  --f-body:"IBM Plex Sans Thai Looped","IBM Plex Sans Thai",system-ui,-apple-system,"Segoe UI",sans-serif;
  --f-mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  color-scheme:light dark;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --bg:#0b1220; --panel:#131c2e; --panel-2:#1b2740; --ink:#e6edf6; --ink-2:#a9b6c9;
  --line:#26324a; --accent:#7aa2ff; --accent-ink:#08131f;
  --def-bg:rgba(34,197,94,.12); --def-line:#4ade80; --def-title:#86efac;
  --lab-bg:rgba(59,130,246,.12); --lab-line:#60a5fa; --lab-title:#93c5fd;
  --warn-bg:rgba(245,158,11,.12); --warn-line:#fbbf24; --warn-title:#fcd34d;
  --code-bg:#060b16; --code-ink:#e6edf6;
  --hero-a:#060d1c; --hero-b:#0e2647;
}}
:root[data-theme="dark"]{
  --bg:#0b1220; --panel:#131c2e; --panel-2:#1b2740; --ink:#e6edf6; --ink-2:#a9b6c9;
  --line:#26324a; --accent:#7aa2ff; --accent-ink:#08131f;
  --def-bg:rgba(34,197,94,.12); --def-line:#4ade80; --def-title:#86efac;
  --lab-bg:rgba(59,130,246,.12); --lab-line:#60a5fa; --lab-title:#93c5fd;
  --warn-bg:rgba(245,158,11,.12); --warn-line:#fbbf24; --warn-title:#fcd34d;
  --code-bg:#060b16; --code-ink:#e6edf6;
  --hero-a:#060d1c; --hero-b:#0e2647;
}
html{scroll-padding-top:4.5rem}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--f-body);
  font-size:1.0625rem;line-height:1.7;overflow-wrap:break-word;-webkit-font-smoothing:antialiased}
h1,h2,h3{overflow-wrap:anywhere;line-height:1.25}
a{color:var(--accent)}
main :is(p,li) a{text-decoration:underline;text-underline-offset:3px}
.skip-link{position:absolute;left:8px;top:-80px;z-index:100;background:#0f172a;color:#fff;
  padding:0.8rem 1rem;border-radius:10px;font-weight:700;text-decoration:underline}
.skip-link:focus{top:8px;outline:3px solid #fde047;outline-offset:2px}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:4px}
#main:focus{outline:none}

/* top bar */
.sw-bar{position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:0.4rem 1rem;flex-wrap:wrap;
  padding:0.4rem 1.1rem;min-height:3rem;background:var(--panel);border-bottom:1px solid var(--line);
  font-weight:600;font-size:0.9375rem}
.sw-bar a{color:var(--accent);text-decoration:none;display:inline-flex;align-items:center;min-height:44px;padding:0 0.3rem}
.sw-bar a:hover{text-decoration:underline}
.sw-bar .brand{color:var(--ink);font-weight:700}
.sw-bar .sep{color:var(--ink-2)}
@media (max-width:520px){.sw-bar .sep{display:none}}

.wrap{width:min(52rem,calc(100% - 2rem));margin:0 auto;padding:1.5rem 0 4rem}
.container{width:min(60rem,calc(100% - 2rem));margin:0 auto}

/* hero */
.hero{position:relative;border-radius:1.25rem;overflow:hidden;margin:1rem 0 1.5rem;
  min-height:11rem;display:flex;align-items:flex-end;
  background:linear-gradient(135deg,var(--hero-a),var(--hero-b))}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.hero .veil{position:absolute;inset:0;z-index:1;
  background:linear-gradient(180deg,rgba(6,13,28,.15) 0%,rgba(6,13,28,.55) 60%,rgba(6,13,28,.85) 100%)}
.hero .htext{position:relative;z-index:2;padding:1.4rem 1.5rem;color:#fff}
.hero .eyebrow{font-family:var(--f-mono);font-size:0.8125rem;letter-spacing:.12em;text-transform:uppercase;
  color:var(--hero-gold);margin:0 0 0.35rem}
.hero h1{margin:0;font-size:clamp(1.5rem,4.5vw,2.1rem);color:#fff}
.hero .byline{margin:0.5rem 0 0;font-size:0.9375rem;color:#e6edf6}
@media (max-width:600px){.hero{min-height:8.5rem}}

section.ch{margin:2rem 0}
section.ch>h2{font-size:1.5rem;margin:0 0 0.4rem;padding-bottom:0.3rem;border-bottom:3px solid var(--accent);display:inline-block}
.lede{font-size:1.125rem;color:var(--ink-2);margin:0.6rem 0 1rem}
h3{font-size:1.15rem;margin:0 0 0.4rem}

.card{background:var(--panel);border:1px solid var(--line);border-radius:0.9rem;padding:1.1rem 1.2rem;margin:1rem 0;
  box-shadow:0 10px 26px -22px rgba(15,23,42,.5)}
.card.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(14rem,100%),1fr));gap:0.9rem;background:none;border:0;box-shadow:none;padding:0}
.card.grid .tile{background:var(--panel);border:1px solid var(--line);border-radius:0.8rem;padding:1rem;min-width:0}
.card.grid .tile h3{margin-top:0}
.card.defend{background:var(--def-bg);border:1px solid var(--def-line);border-left:5px solid var(--def-line)}
.card.defend h3{color:var(--def-title)}
.card.lab{background:var(--lab-bg);border:1px solid var(--lab-line);border-left:5px solid var(--lab-line)}
.card.lab h3{color:var(--lab-title)}
.card.warn{background:var(--warn-bg);border:1px solid var(--warn-line);border-left:5px solid var(--warn-line)}
.card.warn h3{color:var(--warn-title)}
.card :last-child{margin-bottom:0}
.card :first-child{margin-top:0}

.code-cap{font-size:0.9375rem;color:var(--ink-2);margin:1rem 0 0.3rem}
pre{background:var(--code-bg);color:var(--code-ink);border-radius:0.7rem;padding:0.9rem 1rem;overflow-x:auto;
  font-family:var(--f-mono);font-size:0.875rem;line-height:1.55;margin:0.3rem 0 1rem}
pre code{font-family:inherit}
:not(pre)>code{background:var(--panel-2);border-radius:0.3rem;padding:0.1rem 0.35rem;font-family:var(--f-mono);font-size:0.9em}

.tscroll{overflow-x:auto;margin:1rem 0}
table{border-collapse:collapse;width:100%;font-size:0.9375rem}
th,td{border:1px solid var(--line);padding:0.5rem 0.7rem;text-align:left;vertical-align:top;min-width:0}
th{background:var(--panel-2)}

details.q{background:var(--panel);border:1px solid var(--line);border-radius:0.7rem;margin:0.6rem 0}
details.q summary{cursor:pointer;padding:0.85rem 1rem;font-weight:600;min-height:44px;display:flex;align-items:center}
details.q summary:focus-visible{outline:3px solid var(--accent);outline-offset:-3px}
details.q .a{padding:0 1rem 1rem;color:var(--ink-2)}

ul,ol{padding-left:1.4rem}
li{margin:0.25rem 0}

/* lesson nav */
.lnav{display:flex;flex-wrap:wrap;gap:0.7rem;justify-content:space-between;margin:2.5rem 0 0;border-top:1px solid var(--line);padding-top:1.3rem}
.lnav a,.hub-back{display:inline-flex;align-items:center;min-height:44px;padding:0.5rem 1rem;border:1px solid var(--line);
  border-radius:999px;text-decoration:none;color:var(--accent);font-weight:600;background:var(--panel)}
.lnav a:hover,.hub-back:hover{border-color:var(--accent)}

footer.credit{border-top:1px solid var(--line);margin-top:2.5rem;padding:1.3rem 0 0;color:var(--ink-2);font-size:0.875rem}

/* hub */
.hub-hero{background:linear-gradient(135deg,var(--hero-a),var(--hero-b));color:#fff;border-radius:1.25rem;padding:2rem 1.6rem;margin:1rem 0 1.5rem}
.hub-hero .eyebrow{font-family:var(--f-mono);font-size:0.8125rem;letter-spacing:.12em;text-transform:uppercase;color:var(--hero-gold);margin:0 0 0.4rem}
.hub-hero h1{margin:0 0 0.6rem;font-size:clamp(1.7rem,5vw,2.4rem);color:#fff}
.hub-hero p{margin:0.3rem 0;color:#e6edf6;max-width:44rem}
.lesson-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(17rem,100%),1fr));gap:1rem;margin:1.3rem 0}
.lcard{display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--line);border-radius:0.9rem;
  overflow:hidden;text-decoration:none;color:inherit;box-shadow:0 10px 26px -22px rgba(15,23,42,.5)}
.lcard:hover{border-color:var(--accent)}
.lcard:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.lcard .thumb{aspect-ratio:16/9;background:linear-gradient(135deg,var(--hero-a),var(--hero-b));position:relative;display:flex;align-items:flex-end}
.lcard .thumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.lcard .thumb .num{position:relative;z-index:1;margin:0.6rem 0.8rem;font-family:var(--f-mono);font-weight:600;color:var(--hero-gold);
  background:rgba(6,13,28,.6);padding:0.15rem 0.6rem;border-radius:999px;font-size:0.8125rem}
.lcard .body{padding:0.9rem 1rem}
.lcard .body h2{font-size:1.1rem;margin:0 0 0.35rem;border:0;display:block}
.lcard .body p{margin:0;color:var(--ink-2);font-size:0.9375rem}

@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
"""

DISCLAIMER = (
    "คอร์สนี้จัดทำเพื่อการศึกษาด้านความมั่นคงปลอดภัยไซเบอร์เชิงป้องกัน (ethical security) "
    "ให้ฝึกเฉพาะกับระบบหรือแล็บที่เป็นของคุณเอง หรือที่ได้รับอนุญาตเป็นลายลักษณ์อักษรเท่านั้น "
    "การเข้าถึงหรือทดสอบระบบของผู้อื่นโดยไม่ได้รับอนุญาตผิดกฎหมาย เนื้อหาเป็นความรู้ทั่วไป ไม่ใช่คำแนะนำทางกฎหมาย · "
    "จัดทำโดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ · สหวรรณคลินิก"
)


def head(title, desc, url, extra=""):
    t, d = html.escape(title), html.escape(desc)
    return f"""<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>{t} | สหวรรณคลินิก</title>
<meta name="description" content="{d}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="สหวรรณคลินิก">
<meta property="og:locale" content="th_TH">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{t}">
<meta property="og:description" content="{d}">
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>{CSS}</style>{extra}
</head>
<body>
<a class="skip-link" href="#main">ข้ามไปยังเนื้อหาหลัก</a>
<nav class="sw-bar" aria-label="เมนูหลัก">
  <a class="brand" href="/">สหวรรณคลินิก</a><span class="sep" aria-hidden="true">/</span>
  <a href="/cyber">{html.escape(COURSE)} ทุกบท</a>
</nav>
"""


def hero(L):
    img = OUT / "img" / f"{L['slug']}.jpg"
    imgtag = (f'<img src="/cyber/img/{L["slug"]}.jpg" alt="ภาพประกอบบท {L["n"]} {html.escape(L["title"])}">'
              if img.exists() else "")
    return f"""  <div class="hero">
    {imgtag}<div class="veil"></div>
    <div class="htext">
      <p class="eyebrow">{html.escape(COURSE)} · บทที่ {L['n']}</p>
      <h1>{html.escape(L['title'])}</h1>
      <p class="byline">นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์</p>
    </div>
  </div>
"""


def lesson_nav(i):
    prev_l = LESSONS[i - 1] if i > 0 else None
    next_l = LESSONS[i + 1] if i < len(LESSONS) - 1 else None
    left = (f'<a href="/cyber/{prev_l["slug"]}" rel="prev">← บทที่ {prev_l["n"]}: {html.escape(prev_l["title"])}</a>'
            if prev_l else '<a href="/cyber">← กลับหน้าคอร์ส</a>')
    right = (f'<a href="/cyber/{next_l["slug"]}" rel="next">บทที่ {next_l["n"]}: {html.escape(next_l["title"])} →</a>'
             if next_l else '<a href="/cyber">จบคอร์ส · กลับหน้ารวม →</a>')
    return f'  <nav class="lnav" aria-label="ไปบทเรียนอื่น">{left}{right}</nav>\n'


def a11y_scroll(body):
    # scrollable code/tables must be keyboard-focusable (WCAG 2.1.1 scrollable-region-focusable)
    body = re.sub(r"<pre>", '<pre tabindex="0" role="group" aria-label="ตัวอย่างโค้ด เลื่อนแนวนอนเพื่อดูเพิ่มได้">', body)
    body = re.sub(
        r"<table(\s[^>]*)?>(.*?)</table>",
        lambda m: '<div class="tscroll" tabindex="0" role="region" aria-label="ตาราง เลื่อนแนวนอนเพื่อดูเพิ่มได้">'
        f"<table{m.group(1) or ''}>{m.group(2)}</table></div>",
        body,
        flags=re.S,
    )
    return body


def build_lesson(i):
    L = LESSONS[i]
    frag_path = SCR / "frag" / f"{L['slug']}.html"
    if frag_path.exists():
        body = a11y_scroll(frag_path.read_text(encoding="utf-8").strip())
    else:
        body = '<section class="ch"><div class="card warn"><h3>เนื้อหากำลังจัดทำ</h3><p>บทนี้ยังไม่พร้อม</p></div></section>'
    url = f"{BASE}/cyber/{L['slug']}"
    out = head(L["title"], L["desc"], url)
    out += '<main id="main" tabindex="-1">\n<div class="wrap">\n'
    out += hero(L)
    out += body + "\n"
    out += lesson_nav(i)
    out += f'  <footer class="credit">{DISCLAIMER}</footer>\n'
    out += "</div>\n</main>\n</body>\n</html>\n"
    dest = OUT / f"{L['slug']}.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(out, encoding="utf-8")
    return dest


def build_hub():
    url = f"{BASE}/cyber"
    out = head(COURSE, SUBTITLE, url)
    out += '<main id="main" tabindex="-1">\n<div class="container">\n'
    out += f"""  <div class="hub-hero">
    <p class="eyebrow">สื่อการเรียนรู้ · วัยรุ่นถึงผู้ใหญ่</p>
    <h1>{html.escape(COURSE)}</h1>
    <p>{html.escape(SUBTITLE)}</p>
    <p>เรียนความมั่นคงปลอดภัยไซเบอร์ตั้งแต่ศูนย์จนถึงระดับลงสนาม CTF โดยยึดหลัก เข้าใจการโจมตีเพื่อป้องกันตัว ฝึกเฉพาะในแล็บของคุณเอง และรู้ขอบเขตทางกฎหมาย</p>
  </div>
  <div class="card warn"><h3>⚠️ ก่อนเริ่ม อ่านให้ชัด</h3><p>ทุกบทให้ฝึกกับระบบหรือแล็บที่เป็นของคุณเอง หรือที่ได้รับอนุญาตเป็นลายลักษณ์อักษรเท่านั้น การเข้าถึงหรือทดสอบระบบของผู้อื่นโดยไม่ได้รับอนุญาตผิดกฎหมายตาม พ.ร.บ.คอมพิวเตอร์ คอร์สนี้เน้นการป้องกัน ไม่ใช่การไปโจมตีใคร</p></div>
  <div class="lesson-grid">
"""
    for L in LESSONS:
        img = OUT / "img" / f"{L['slug']}.jpg"
        imgtag = (f'<img src="/cyber/img/{L["slug"]}.jpg" alt="">' if img.exists() else "")
        out += f"""    <a class="lcard" href="/cyber/{L['slug']}">
      <span class="thumb">{imgtag}<span class="num">บทที่ {L['n']}</span></span>
      <span class="body"><h2>{html.escape(L['title'])}</h2><p>{html.escape(L['desc'])}</p></span>
    </a>
"""
    out += "  </div>\n"
    out += f'  <footer class="credit">{DISCLAIMER}</footer>\n'
    out += "</div>\n</main>\n</body>\n</html>\n"
    (OUT / "index.html").write_text(out, encoding="utf-8")
    return OUT / "index.html"


def patch(path, marker, anchor, block):
    s = path.read_text(encoding="utf-8")
    if marker in s:
        return "already"
    assert anchor in s, f"anchor not found in {path.name}"
    path.write_text(s.replace(anchor, block, 1), encoding="utf-8")
    return "patched"


def wire_routes():
    # next.config.ts rewrites
    nc = SITE / "next.config.ts"
    routes = [("/cyber", "/cyber/index.html")] + [(f"/cyber/{L['slug']}", f"/cyber/{L['slug']}.html") for L in LESSONS]
    lines = "".join(f'      {{ source: "{s}", destination: "{d}" }},\n' for s, d in routes)
    # insert into rewrites() — anchor on the first existing rewrite entry, not the redirects return
    anchor = '      { source: "/learn/cells", destination: "/learn/cells/th.html" },\n'
    block = lines + anchor
    print("next.config:", patch(nc, 'source: "/cyber"', anchor, block))
    # sitemap.ts
    sm = SITE / "app" / "sitemap.ts"
    s = sm.read_text(encoding="utf-8")
    if "/cyber" not in s:
        m = re.search(r"(\n\s*\];)", s)
        entries = "".join(
            f'    {{ url: `${{siteUrl}}/cyber{"" if L is None else "/" + L["slug"]}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 }},\n'
            for L in [None] + LESSONS
        )
        s = s[: m.start()] + "\n" + entries + s[m.start():]
        # ensure a `now` exists; if not, fall back to new Date()
        if "const now" not in s and "lastModified: now" in s:
            s = s.replace("export default function sitemap", "const now = new Date();\nexport default function sitemap", 1)
        sm.write_text(s, encoding="utf-8")
        print("sitemap: patched")
    else:
        print("sitemap: already")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for i in range(len(LESSONS)):
        d = build_lesson(i)
        print("wrote", d.relative_to(SITE), f"{d.stat().st_size // 1024} KB")
    build_hub()
    print("wrote hub")
    wire_routes()


if __name__ == "__main__":
    main()
