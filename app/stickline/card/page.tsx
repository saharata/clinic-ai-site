import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { StrokeCards } from "../strokeArt";
import CardActions from "./CardActions";

// บัตร BE FAST ติดตู้เย็น — หน้าเดียว พิมพ์ได้ แชร์เป็นรูปได้ มี QR กลับมาหน้า /stickline
// ข้อความทุกบรรทัดเหมือนในแถบ BE FAST (strokeArt.tsx) ไม่มีเนื้อหาใหม่
const siteUrl = "https://www.sahawanclinic.clinic";
const pageUrl = `${siteUrl}/stickline/card`;
const title = "บัตร BE FAST สัญญาณเตือนสโตรก พิมพ์ติดตู้เย็น";
const description =
  "บัตรสัญญาณเตือนสโตรก BE FAST หน้าเดียว พิมพ์ติดตู้เย็นหรือแชร์เป็นรูปใน LINE ให้ทุกคนในบ้านจำได้ว่าอาการแบบไหนต้องโทร 1669 ทันที โดยประสาทแพทย์ สหวรรณคลินิก นนทบุรี";

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
    images: [{ url: "/stickline/befast-card.png", width: 1016, height: 1678, alt: "บัตร BE FAST สัญญาณเตือนสโตรก" }],
  },
};

export default function BefastCardPage() {
  return (
    <>
      <header className="navbar print-hide">
        <div className="container nav-inner">
          <Link href="/" className="brand">
            <div className="brand-badge" aria-hidden="true">N</div>
            <div>
              <div className="brand-title">สหวรรณคลินิก</div>
              <div className="brand-subtitle">คลินิกเวชกรรมเด็กและระบบประสาท</div>
            </div>
          </Link>
          <nav className="nav-links">
            <Link href="/stickline">ประสาทแพทย์วาดเส้น</Link>
            <Link href="/" className="btn btn-outline">
              หน้าแรก
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="sl-page card-page">
        <section className="section">
          <div className="container">
            <div className="section-head print-hide">
              <p className="eyebrow">พิมพ์ได้ แชร์ได้</p>
              <h1>บัตร BE FAST ติดตู้เย็น</h1>
              <p>
                สโตรกรักษาได้ผลดีที่สุดเมื่อถึงโรงพยาบาลเร็ว บัตรนี้ช่วยให้ทุกคนในบ้านจำสัญญาณเตือนได้
                พิมพ์ติดตู้เย็น หรือส่งรูปเข้ากลุ่ม LINE ครอบครัว
              </p>
              <CardActions />
            </div>

            <article className="befast-card" aria-label="บัตร BE FAST">
              <header className="befast-head">
                <p className="befast-kicker">สัญญาณเตือนสโตรก จำว่า</p>
                <h2 className="befast-title" lang="en">
                  BE FAST
                </h2>
                <p className="befast-sub">มีอาการเหล่านี้แบบเฉียบพลัน ควรไปห้องฉุกเฉินทันที</p>
              </header>
              <StrokeCards compact />
              <div className="befast-call">
                <span className="befast-call-label">โทรเรียกรถฉุกเฉิน</span>
                <span className="befast-call-num" lang="en">
                  1669
                </span>
              </div>
              <footer className="befast-foot">
                <div>
                  <strong>สหวรรณคลินิก</strong> คลินิกเวชกรรมเด็กและระบบประสาท นนทบุรี
                  <br />
                  โดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ · โทร 065-480-8771
                  <br />
                  <span lang="en">sahawanclinic.clinic/stickline</span>
                </div>
                <Image src="/stickline/befast-qr.svg" alt="QR code ไปหน้าประสาทแพทย์วาดเส้น" width={96} height={96} unoptimized />
              </footer>
            </article>

            <p className="vaccine-note print-hide">
              * ข้อมูลนี้เพื่อความเข้าใจเบื้องต้น ไม่ใช่การวินิจฉัย หากมีอาการเฉียบพลันให้โทร 1669 ทันที ·{" "}
              <Link href="/stickline#stroke">ดูภาพเคลื่อนไหวและคำอธิบายแต่ละอาการ</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
