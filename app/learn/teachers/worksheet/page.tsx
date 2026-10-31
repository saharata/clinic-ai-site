import Link from "next/link";
import type { Metadata } from "next";
import PrintButton from "./PrintButton";

// ใบงาน Body 101 — หน้าเดียว ใช้ได้กับทุกบท พิมพ์แจกนักเรียน
const siteUrl = "https://www.sahawanclinic.clinic";
const pageUrl = `${siteUrl}/learn/teachers/worksheet`;

export const metadata: Metadata = {
  title: "ใบงาน Body 101 พิมพ์ได้",
  description: "ใบงานหน้าเดียวสำหรับทุกบทของ Body 101 ให้นักเรียนบันทึกสิ่งที่ได้เรียนรู้ วาดภาพ และคะแนนแบบทดสอบ",
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
};

export default function WorksheetPage() {
  return (
    <main id="main-content" tabIndex={-1} className="ws-page">
      <div className="container">
        <div className="print-hide ws-top">
          <nav aria-label="ตำแหน่งของหน้านี้" className="breadcrumb">
            <ol>
              <li>
                <Link href="/learn">Body 101</Link>
              </li>
              <li>
                <Link href="/learn/teachers">สำหรับครู</Link>
              </li>
              <li aria-current="page">ใบงาน</li>
            </ol>
          </nav>
          <PrintButton />
        </div>

        <article className="ws" aria-label="ใบงาน Body 101">
          <header className="ws-head">
            <div>
              <p className="ws-kicker">ใบงาน Body 101 · รู้จักร่างกายตั้งแต่เซลล์จนถึงอวัยวะ</p>
              <h1>วันนี้ฉันได้เรียนรู้อะไร</h1>
            </div>
            <p className="ws-site" lang="en">
              sahawanclinic.clinic/learn
            </p>
          </header>

          <div className="ws-fields">
            <p className="ws-field ws-field-lg">ชื่อ</p>
            <p className="ws-field">ชั้น</p>
            <p className="ws-field">วันที่</p>
          </div>
          <p className="ws-field ws-field-full">บทที่เรียนวันนี้</p>

          <section className="ws-box">
            <h2>1. สามสิ่งที่ฉันเพิ่งรู้วันนี้</h2>
            <ol>
              <li><span className="ws-blank" /></li>
              <li><span className="ws-blank" /></li>
              <li><span className="ws-blank" /></li>
            </ol>
          </section>

          <section className="ws-box ws-draw">
            <h2>2. วาดสิ่งที่ชอบที่สุดในบทนี้ และเขียนชื่อส่วนต่าง ๆ</h2>
            <div className="ws-canvas" aria-hidden="true" />
          </section>

          <section className="ws-box">
            <h2>3. คำถามที่ฉันยังสงสัย</h2>
            <p><span className="ws-blank" /></p>
            <p><span className="ws-blank" /></p>
          </section>

          <section className="ws-box ws-score">
            <h2>4. แบบทดสอบท้ายบท</h2>
            <p>ได้ <span className="ws-blank ws-blank-sm" /> จาก <span className="ws-blank ws-blank-sm" /> ข้อ</p>
            <p className="ws-field">ข้อที่อยากลองอีกครั้ง</p>
          </section>

          <footer className="ws-foot">
            Body 101 เรียบเรียงโดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ · สหวรรณคลินิก นนทบุรี · ใช้ในห้องเรียนได้ฟรี
          </footer>
        </article>
      </div>
    </main>
  );
}
