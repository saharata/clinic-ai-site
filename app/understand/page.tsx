import Link from "next/link";
import type { Metadata } from "next";
import MobileMenu from "../MobileMenu";
import LineLink from "../LineLink";
import { diseases3d } from "./diseases3d";

// หน้ารวมแบบจำลองสามมิติ "เข้าใจโรค" — ตัวแบบจำลองเป็น static ใน public/learn/{brain-3d,migraine-3d}/
// เพิ่มโรคใหม่: เพิ่มรายการใน diseases3d.ts (เมนูหน้าแรกและเมนูมือถืออ่านจากไฟล์เดียวกัน)

const lineUrl = "https://lin.ee/7Y8onWN";
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";
const pageUrl = "https://www.sahawanclinic.clinic/understand";

const pageTitle = "เข้าใจโรคด้วยภาพสามมิติ";
const pageDesc =
  "แบบจำลองสามมิติที่หมุนและแตะดูได้ อธิบายว่าโรคทางระบบประสาทเกิดขึ้นที่ไหนในสมอง ไมเกรน MS NMOSD " +
  "และพื้นฐานสมองกับระบบประสาท ใช้ฟรีในเบราว์เซอร์ โดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: pageUrl,
    siteName: "สหวรรณคลินิก",
    title: `${pageTitle} | สหวรรณคลินิก`,
    description: pageDesc,
    images: [{ url: "https://www.sahawanclinic.clinic/understand/migraine.jpg", width: 600, height: 352, alt: "แบบจำลองไมเกรนสามมิติ" }],
  },
};

export default function UnderstandPage() {
  return (
    <div className="ud-page">
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
            <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line">
              แอด LINE
            </a>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero small">
          <div className="container">
            <p className="eyebrow">ความรู้จากประสาทแพทย์ · ใช้ฟรี ไม่ต้องติดตั้ง</p>
            <h1 className="hero-title">เข้าใจโรคด้วยภาพสามมิติ</h1>
            <p className="ud-lead">
              หมุนดูและแตะดูทีละจุด ว่าโรคทางระบบประสาทเกิดขึ้นที่ไหนในสมอง ทุกจุดมีคำอธิบายภาษาไทย
              เขียนและตรวจเนื้อหาโดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์
            </p>
            <nav className="ud-sub" aria-label="เลือกโรค">
              {diseases3d.map((d) => (
                <a key={d.id} href={`#${d.id}`}>
                  {d.menu}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {diseases3d.map((d, i) => (
          <section key={d.id} id={d.id} className={i % 2 ? "section" : "section alt"} aria-labelledby={`${d.id}-h`}>
            <div className="container ud-row">
              <a href={d.model} className="ud-shot" aria-label={`เปิดแบบจำลองสามมิติ ${d.menu}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image} alt={d.imageAlt} width={600} height={352} loading={i ? "lazy" : "eager"} decoding="async" />
              </a>
              <div className="ud-text">
                <p className="eyebrow">{d.eyebrow}</p>
                <h2 id={`${d.id}-h`}>{d.title}</h2>
                <p>{d.text}</p>
                <ul className="ud-points">
                  {d.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="card-actions">
                  <a href={d.model} className="btn btn-dark big">
                    เปิดภาพสามมิติ
                  </a>
                  {d.related.map((r) => (
                    <a key={r.href} href={r.href} className="btn btn-outline">
                      {r.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>อยากปรึกษาอาการของตัวเอง</h2>
              <p>ภาพสามมิติช่วยให้เข้าใจโรค แต่การวินิจฉัยต้องอาศัยการซักประวัติและตรวจร่างกายโดยแพทย์</p>
            </div>
            <div className="card-actions">
              <LineLink message="สวัสดี สนใจนัดตรวจคลินิกประสาท" className="btn btn-line big">
                ปรึกษา / นัดตรวจผ่าน LINE
              </LineLink>
              <a href={phoneTel} className="btn btn-call big">
                โทร {phoneDisplay}
              </a>
            </div>
            <p className="vaccine-note">
              * สื่อการเรียนรู้ ไม่ใช่การวินิจฉัยหรือคำแนะนำการรักษา · รูปทรงในแบบจำลองเป็นค่าประมาณ ·
              หากมีอาการเฉียบพลันรุนแรง ควรไปห้องฉุกเฉินทันที
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
