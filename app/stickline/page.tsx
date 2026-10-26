import Link from "next/link";
import type { Metadata } from "next";
import MobileMenu from "../MobileMenu";
import LineLink from "../LineLink";
import { doctorPath } from "../doctorData";
import pack from "./pack.json";
import StrokeSigns from "./StrokeSigns";
import SeizureTimer from "./SeizureTimer";
import ErCheck from "./ErCheck";
import MyelinAnimation from "./MyelinAnimation";
import EpisodeVideo from "./EpisodeVideo";

// "ประสาทแพทย์วาดเส้น" — เนื้อหาตอน EP01 มาจากแพ็กที่แพทย์เรียบเรียง (pack.json)
// ส่วนสโตรก / ห้องฉุกเฉิน / MS ใช้ข้อความที่เว็บเผยแพร่แล้วเท่านั้น (ดูหัวไฟล์ของแต่ละคอมโพเนนต์)
const siteUrl = "https://www.sahawanclinic.clinic";
const pageUrl = `${siteUrl}/stickline`;
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";
const { series } = pack;
const ep = pack.episodes[0];

const title = "ประสาทแพทย์วาดเส้น · สโตรก เป็นลมหรือชัก ห้องฉุกเฉิน และ MS";
const description =
  "อาการทางสมองที่คนในบ้านเจอบ่อย อธิบายด้วยภาพวาดเส้น: สัญญาณเตือนสโตรก BE FAST · เป็นลมหรือชัก แยกอย่างไร พร้อมนาฬิกาจับเวลา · " +
  "อาการแบบไหนไปห้องฉุกเฉิน · MS กับปลอกประสาท โดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    locale: "th_TH",
    url: pageUrl,
    siteName: "สหวรรณคลินิก",
    title,
    description,
    images: [{ url: `/stickline/${ep.files.poster}`, width: 1280, height: 720, alt: ep.alt_th.poster }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: title,
      description,
      inLanguage: "th",
      image: `${siteUrl}/stickline/${ep.files.poster}`,
      author: { "@id": `${siteUrl}/#physician-saharat` },
      about: [
        { "@type": "MedicalCondition", name: "โรคหลอดเลือดสมอง (สโตรก)" },
        { "@type": "MedicalCondition", name: "เป็นลม (Syncope)" },
        { "@type": "MedicalCondition", name: "ลมชัก (Seizure)" },
        { "@type": "MedicalCondition", name: "Multiple Sclerosis (MS)" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: ep.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "หน้าแรก", item: siteUrl },
        { "@type": "ListItem", position: 2, name: series.name_th, item: pageUrl },
      ],
    },
  ],
};

const toc = [
  { href: "#stroke", label: "สัญญาณเตือนสโตรก" },
  { href: "#faint-seizure", label: "เป็นลม หรือ ชัก" },
  { href: "#er-check", label: "ไปห้องฉุกเฉินไหม" },
  { href: "#ms", label: "MS กับปลอกประสาท" },
];

export default function StickLinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="navbar">
        <div className="container nav-inner">
          <Link href="/" className="brand">
            <div className="brand-badge" aria-hidden="true">N</div>
            <div>
              <div className="brand-title">สหวรรณคลินิก</div>
              <div className="brand-subtitle">คลินิกเวชกรรมเด็กและระบบประสาท</div>
            </div>
          </Link>
          <nav className="nav-links">
            <Link href="/">หน้าแรก</Link>
            <Link href="/symptoms">อาการที่พบบ่อย</Link>
            <a href={phoneTel} className="btn btn-call">
              โทร {phoneDisplay}
            </a>
            <LineLink message="สวัสดี สนใจนัดตรวจคลินิกประสาท" className="btn btn-line">
              แอด LINE
            </LineLink>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="sl-page">
        <section className="hero small">
          <div className="container">
            <nav aria-label="ตำแหน่งของหน้านี้" className="breadcrumb">
              <ol>
                <li>
                  <Link href="/">หน้าแรก</Link>
                </li>
                <li aria-current="page">{series.name_th}</li>
              </ol>
            </nav>
            <p className="eyebrow">ภาพวาดเส้น ตอนละไม่กี่นาที</p>
            <h1 className="hero-title">{series.name_th}</h1>
            <p className="hero-text narrow">{series.tagline_th}</p>
            <p className="symptom-byline">
              โดย <Link href={doctorPath}>นพ. สหรัฐ อังศุมาศ</Link> · ประสาทแพทย์
            </p>
            <ul className="sl-toc">
              {toc.map((t) => (
                <li key={t.href}>
                  <a href={t.href}>{t.label}</a>
                </li>
              ))}
            </ul>
            <p className="sl-emergency" role="note">
              <strong>ฉุกเฉิน</strong> {series.emergency_th}{" "}
              <a href="tel:1669">โทร 1669</a>
            </p>
          </div>
        </section>

        <section id="stroke" className="section" aria-labelledby="stroke-h">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">ข้อ 1</p>
              <h2 id="stroke-h">สัญญาณเตือนสโตรก จำว่า BE FAST</h2>
              <p>มีอาการเหล่านี้แบบเฉียบพลัน ควรไปห้องฉุกเฉินทันที</p>
            </div>
            <StrokeSigns />
          </div>
        </section>

        <section id="faint-seizure" className="section alt" aria-labelledby="ep-h">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">ข้อ 2 · {ep.ep}</p>
              <h2 id="ep-h">{ep.title_th}</h2>
              <p>{ep.summary_th}</p>
            </div>

            <EpisodeVideo
              videoId={ep.youtube_id}
              title={ep.title_th}
              publishAt={ep.publish_at_ict}
              poster={`/stickline/${ep.files.poster}`}
              posterAlt={ep.alt_th.poster}
              durationLabel={ep.duration_label}
            />

            <h3 className="sl-h3">ดูสามช่วง</h3>
            <div className="sl-phases">
              {ep.sections.map((s) => (
                <div key={s.heading} className="sl-phase">
                  <h4>{s.heading}</h4>
                  <p>
                    <strong>เป็นลม</strong> {s.faint}
                  </p>
                  <p>
                    <strong>ชัก</strong> {s.seizure}
                  </p>
                  {"note" in s && s.note && <p className="sl-note">{s.note}</p>}
                </div>
              ))}
            </div>

            <h3 className="sl-h3">คนรอบข้างทำได้สี่อย่าง</h3>
            <ol className="sl-actions">
              {ep.actions.map((a) => (
                <li key={a.n}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/stickline/icons/${a.icon}.png`} alt="" width={72} height={72} />
                  <div>
                    <strong>{a.title}</strong>
                    <span>{a.detail}</span>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="sl-h3">นาฬิกาจับเวลา</h3>
            <p>กดเริ่มทันทีที่เห็นคนชักหรือหมดสติ แล้ววางโทรศัพท์ไว้ใกล้ ๆ</p>
            <SeizureTimer />

            <div className="sl-red" role="note">
              <h3>ไปโรงพยาบาลทันทีเมื่อ</h3>
              <ul>
                {ep.red_flags.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>

            <h3 className="sl-h3">คำถามที่พบบ่อย</h3>
            <div className="faq-list">
              {ep.faq.map((f) => (
                <details key={f.q} className="faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>

            <details className="faq-item sl-transcript">
              <summary>อ่านแทนดู: บทพูดทั้งตอน</summary>
              {ep.transcript.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </details>
          </div>
        </section>

        <section id="er-check" className="section" aria-labelledby="er-h">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">ข้อ 3</p>
              <h2 id="er-h">อาการแบบนี้ ไปห้องฉุกเฉิน หรือนัดหมอ</h2>
              <p>ตอบทีละขั้น ใช้เกณฑ์เดียวกับหน้าอาการของคลินิก ไม่ใช่การวินิจฉัย</p>
            </div>
            <ErCheck />
          </div>
        </section>

        <section id="ms" className="section alt" aria-labelledby="ms-h">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">ข้อ 4</p>
              <h2 id="ms-h">MS กับปลอกประสาท ในภาพเดียว</h2>
              <p>
                อ่านต่อเรื่องการดูแลตัวเองและสิทธิประกันสังคมที่ <Link href="/ms">คู่มือ MS · NMOSD</Link>
              </p>
            </div>
            <MyelinAnimation />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <p className="vaccine-note">
              * {series.disclaimer_th} ข้อมูลนี้เพื่อความเข้าใจเบื้องต้น ไม่ใช่การวินิจฉัยหรือทดแทนการพบแพทย์
            </p>
            <div className="card-actions">
              <LineLink message="สวัสดี สนใจนัดตรวจคลินิกประสาท" className="btn btn-line big">
                ปรึกษา / นัดตรวจผ่าน LINE
              </LineLink>
              <a href={phoneTel} className="btn btn-call big">
                โทร {phoneDisplay}
              </a>
              <a href={series.playlist_url} target="_blank" rel="noreferrer" className="btn btn-outline big">
                ดูทุกตอนบน YouTube<span className="sr-only"> (เปิดในแท็บใหม่)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h2 className="footer-title">สหวรรณคลินิก</h2>
            <p>คลินิกเวชกรรมเด็กและระบบประสาท</p>
            <p>101 หมู่บ้านประชานิเวศน์ 3 ถนนประชานิเวศน์ ต.ท่าทราย อ.เมืองนนทบุรี จ.นนทบุรี 11000</p>
          </div>
          <div>
            <h3 className="footer-subtitle">ช่องทางติดต่อ</h3>
            <ul className="footer-links">
              <li>
                <a href={phoneTel}>โทร {phoneDisplay}</a>
              </li>
              <li>
                <LineLink message="สวัสดี สนใจนัดตรวจคลินิกประสาท">LINE Official</LineLink>
              </li>
              <li>
                <Link href="/">กลับหน้าแรก</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
