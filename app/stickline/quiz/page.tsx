import Link from "next/link";
import type { Metadata } from "next";
import MobileMenu from "../../MobileMenu";
import LineLink from "../../LineLink";
import { doctorPath } from "../../doctorData";
import Quiz from "./Quiz";
import { questions } from "./quizData";

const siteUrl = "https://www.sahawanclinic.clinic";
const pageUrl = `${siteUrl}/stickline/quiz`;
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";

const title = `แบบฝึกสังเกตอาการ: คนนี้เป็นลมหรือชัก (${questions.length} ข้อ)`;
const description =
  "ลองดูสถานการณ์แล้วทายว่าเป็นลมหรือชัก พร้อมคำอธิบายจากประสาทแพทย์ทุกข้อ แชร์คะแนนให้คนในบ้านลองทำได้ · สหวรรณคลินิก นนทบุรี";

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
    images: [{ url: "/stickline/poster_EP01.jpg", width: 1280, height: 720, alt: "เป็นลม หรือ ชัก" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: title,
  description,
  url: pageUrl,
  inLanguage: "th",
  educationalLevel: "beginner",
  author: { "@id": `${siteUrl}/#physician-saharat` },
  about: { "@type": "MedicalCondition", name: "เป็นลม (Syncope) และลมชัก (Seizure)" },
};

export default function QuizPage() {
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
            <Link href="/stickline">ประสาทแพทย์วาดเส้น</Link>
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
                <li>
                  <Link href="/stickline">ประสาทแพทย์วาดเส้น</Link>
                </li>
                <li aria-current="page">แบบฝึกสังเกตอาการ</li>
              </ol>
            </nav>
            <p className="eyebrow">แบบฝึก {questions.length} ข้อ · ใช้เวลา 2 นาที</p>
            <h1 className="hero-title">คนนี้เป็นลมหรือชัก</h1>
            <p className="hero-text narrow">
              ดูสิ่งที่คนรอบข้างเห็น แล้วทายว่าเป็นลม ชัก หรือยังตัดสินไม่ได้ ทุกข้อมีคำอธิบายจากตอน
              &ldquo;เป็นลม หรือ ชัก&rdquo; ของประสาทแพทย์
            </p>
            <p className="symptom-byline">
              โดย <Link href={doctorPath}>นพ. สหรัฐ อังศุมาศ</Link> · ประสาทแพทย์
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Quiz />
            <p className="vaccine-note">
              * แบบฝึกนี้เพื่อความเข้าใจเบื้องต้น ไม่ใช่การวินิจฉัย เมื่อเจอเหตุการณ์จริง จับเวลา และโทร 1669
              ถ้านานเกินห้านาที ไม่ฟื้น หรือเกิดซ้ำติดกัน
            </p>
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
