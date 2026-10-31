import Link from "next/link";
import type { Metadata } from "next";
import MobileMenu from "../../MobileMenu";
import { lessonsL1, lessonsL2, lessonsX } from "../lessons";

// Body 101 สำหรับครู — วิธีใช้ในห้องเรียน บทไหนเหมาะกับชั้นไหน และใบงานพิมพ์ได้
// ระดับชั้นของแต่ละบทมาจากหน้าบทเรียนใน public/learn (ที่ระบุ ป.3–ม.1 หรือช่วงอายุไว้แล้ว)
const siteUrl = "https://www.sahawanclinic.clinic";
const pageUrl = `${siteUrl}/learn/teachers`;
const title = "Body 101 สำหรับครู · สื่อการสอนเรื่องร่างกาย ใช้ในห้องเรียนได้ฟรี";
const description =
  "สื่อการเรียนรู้เรื่องร่างกายและวิทยาศาสตร์สำหรับเด็กประถมถึง ม.1 เรียบเรียงโดยประสาทแพทย์ ใช้ในห้องเรียนได้ฟรี ไม่ต้องสมัคร พร้อมแนวการจัดชั่วโมงเรียนและใบงานพิมพ์ได้";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: pageUrl,
    siteName: "สหวรรณคลินิก",
    title,
    description,
    images: [{ url: "/learn/og-learn.jpg", width: 1200, height: 630, alt: "Body 101" }],
  },
};

const grade: Record<string, string> = {
  cells: "ป.3 – ม.1",
  body: "ป.3 – ป.6",
  animals: "ป.3 – ม.1",
  growth: "ป.3 – ม.1",
  senses: "ป.3 – ม.1",
  virus: "ป.3 – ม.1",
  life: "ป.3 – ม.1",
  play: "ป.3 – ม.1",
  brain: "อายุ 11 – 12 ปี",
  heart: "อายุ 11 – 12 ปี",
  dna: "อายุ 11 – 12 ปี",
  hormones: "อายุ 10 – 16 ปี",
  mind: "อายุ 11 – 12 ปี",
  neurologist: "ป.3 – ม.1",
  space: "อายุ 10 – 13 ปี",
  ai: "อายุ 10 – 13 ปี",
  robot: "อายุ 10 – 13 ปี",
  airobot: "อายุ 10 – 13 ปี",
};

const groups = [
  { name: "ระดับหนึ่ง · ประถม", lessons: lessonsL1 },
  { name: "ระดับสอง · ฉบับเจาะลึก", lessons: lessonsL2 },
  { name: "บทพิเศษ", lessons: lessonsX },
];

const plan = [
  { min: "5 นาที", what: "นำเข้าบทเรียน", how: "ถามคำถามเปิด เช่น “ร่างกายเรามีเซลล์กี่ล้านตัว” แล้วเปิดหน้าบทเรียนบนจอ" },
  { min: "20 นาที", what: "ให้เด็กสำรวจเอง", how: "แบ่งกลุ่ม 2–3 คนต่อเครื่อง ให้เล่นของเล่นทดลองและเกมในบท ครูเดินดูและตั้งคำถามต่อ" },
  { min: "10 นาที", what: "สรุปร่วมกัน", how: "ให้แต่ละกลุ่มเล่า 1 สิ่งที่เพิ่งรู้ ครูเชื่อมกับเนื้อหาในหลักสูตร" },
  { min: "10 นาที", what: "แบบทดสอบและใบงาน", how: "ทำแบบทดสอบท้ายบทบนจอ หรือพิมพ์ใบงานให้เขียนสิ่งที่ได้เรียนรู้" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Body 101",
  url: `${siteUrl}/learn`,
  inLanguage: ["th", "en"],
  educationalLevel: "ป.3 – ม.1",
  audience: { "@type": "EducationalAudience", educationalRole: "teacher" },
  learningResourceType: "interactive lesson",
  isAccessibleForFree: true,
  provider: { "@type": "MedicalClinic", name: "สหวรรณคลินิก", url: siteUrl },
  author: { "@id": `${siteUrl}/#physician-saharat` },
};

export default function TeachersPage() {
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
            <Link href="/learn">Body 101</Link>
            <Link href="/learn/teachers/worksheet" className="btn btn-outline">
              ใบงานพิมพ์ได้
            </Link>
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
                <li>
                  <Link href="/learn">Body 101</Link>
                </li>
                <li aria-current="page">สำหรับครู</li>
              </ol>
            </nav>
            <p className="eyebrow">สำหรับครูและโรงเรียน</p>
            <h1 className="hero-title">Body 101 ใช้ในห้องเรียนได้ฟรี</h1>
            <p className="hero-text narrow">
              บทเรียนเรื่องร่างกาย 18 บท มีกล้องจุลทรรศน์จำลอง ของเล่นทดลอง เกม และแบบทดสอบท้ายบท
              เรียบเรียงโดยประสาทแพทย์ ใช้ได้ทั้งบนจอห้องเรียนและโทรศัพท์ของนักเรียน ไม่ต้องสมัคร
              ไม่มีโฆษณา มีทั้งภาษาไทยและอังกฤษ
            </p>
            <div className="hero-actions">
              <Link href="/learn" className="btn btn-dark big">
                เปิด Body 101
              </Link>
              <Link href="/learn/teachers/worksheet" className="btn btn-outline big">
                พิมพ์ใบงาน
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>จัดชั่วโมงเรียน 45 นาที</h2>
              <p>แนวทางที่ใช้ได้กับทุกบท ปรับเวลาได้ตามชั้นเรียน</p>
            </div>
            <ol className="tc-plan">
              {plan.map((s) => (
                <li key={s.what}>
                  <span className="tc-min">{s.min}</span>
                  <div>
                    <strong>{s.what}</strong>
                    <span>{s.how}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>บทไหนเหมาะกับชั้นไหน</h2>
              <p>ทุกบทมีแบบทดสอบท้ายบทและฉบับภาษาอังกฤษ</p>
            </div>
            {groups.map((g) => (
              <div key={g.name} className="tc-group">
                <h3>{g.name}</h3>
                <ul className="tc-cards">
                  {g.lessons.map((l) => (
                    <li key={l.key} className="tc-card">
                      <h4>{l.title}</h4>
                      <p className="tc-level">{l.level}</p>
                      <p className="tc-grade">
                        <span>ระดับชั้น</span> {grade[l.key]}
                      </p>
                      <ul>
                        {l.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                      <p className="tc-links">
                        <a href={l.th} className="btn btn-dark">
                          เปิดบทนี้
                        </a>
                        <a href={l.en} className="btn btn-outline" hrefLang="en" lang="en">
                          English
                        </a>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container cta-box tc-cta">
            <div>
              <p className="eyebrow">สำหรับโรงเรียน</p>
              <h2>ใช้ในโรงเรียนได้เลย ไม่ต้องขออนุญาต</h2>
              <p>
                ลิงก์ไปที่ sahawanclinic.clinic/learn จากเว็บหรือกลุ่ม LINE ของโรงเรียนได้ทันที
                ถ้าต้องการให้แพทย์ไปพูดคุยกับนักเรียนเรื่องสมองและระบบประสาท ติดต่อคลินิกได้
              </p>
            </div>
            <div className="cta-actions">
              <a href="tel:0654808771" className="btn btn-call big">
                โทร 065-480-8771
              </a>
              <Link href="/learn/neurologist" className="btn btn-outline big">
                บท “ประสาทแพทย์คือใคร”
              </Link>
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
                <a href="tel:0654808771">โทร 065-480-8771</a>
              </li>
              <li>
                <Link href="/learn">Body 101</Link>
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
