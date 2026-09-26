import Link from "next/link";
import type { Metadata } from "next";
import { vaccineSchedule } from "./vaccineData";

const lineUrl = "https://lin.ee/7Y8onWN";
const facebookUrl = "https://facebook.com/saharat.aungsumart.52";
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";

const vaccineTitle = "ราคาวัคซีนเด็กตามช่วงอายุ 2026 | สหวรรณคลินิก";
const vaccineDesc =
  "ตารางราคาวัคซีนเด็กตามช่วงอายุ (2 เดือน - 12 ปี) ของสหวรรณคลินิก จ.นนทบุรี " +
  "ราคารวมค่าแพทย์และค่าบริการแล้ว ฉีดและประเมินพัฒนาการโดยกุมารแพทย์ นัดหมายโทร 065-480-8771";

export const metadata: Metadata = {
  title: "ราคาวัคซีนเด็กตามช่วงอายุ 2026",
  description: vaccineDesc,
  alternates: { canonical: "https://www.sahawanclinic.clinic/vaccine" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.sahawanclinic.clinic/vaccine",
    siteName: "สหวรรณคลินิก",
    title: vaccineTitle,
    description: vaccineDesc,
    images: [
      {
        url: "/og-vaccine.jpg",
        width: 1200,
        height: 630,
        alt: "ราคาวัคซีนเด็กตามช่วงอายุ สหวรรณคลินิก",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: vaccineTitle,
    description: vaccineDesc,
    images: ["/og-vaccine.jpg"],
  },
};

export default function VaccinePage() {
  return (
    <>
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
            <a href={phoneTel} className="btn btn-call">
              โทร {phoneDisplay}
            </a>
            <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line">
              แอด LINE
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>

      <section className="vaccine-hero">
        <div className="container">
          <p className="vaccine-eyebrow">รายการวัคซีนเด็กตามช่วงอายุ 2026</p>
          <h1 className="vaccine-title">ราคาวัคซีนเด็ก · สหวรรณคลินิก</h1>
          <p className="vaccine-sub">
            ฉีดวัคซีนและประเมินพัฒนาการเบื้องต้นโดยกุมารแพทย์ · ราคารวมค่าแพทย์และค่าบริการแล้ว
          </p>
          <div className="vaccine-legend">
            <span>
              <i className="dot core" aria-hidden="true" /> วัคซีนหลัก
            </span>
            <span>
              <i className="dot optional" aria-hidden="true" /> วัคซีนเสริม
            </span>
          </div>
        </div>
      </section>

      <section className="section vaccine-section">
        <div className="container">
          {/* a11y (screen reader): ช่วงอายุเป็นหัวข้อ (กระโดดทีละช่วงอายุได้) และรายการวัคซีนเป็น list
              แถวหัวตารางเป็นป้ายสำหรับตาเท่านั้น จึงซ่อนจาก screen reader แล้วอ่าน "ราคา … บาท" ในแต่ละบรรทัดแทน */}
          <div className="vaccine-table">
            <div className="vaccine-row vaccine-head" aria-hidden="true">
              <div className="vaccine-age">อายุ</div>
              <div className="vaccine-items">
                <span>รายการวัคซีน</span>
                <span className="vaccine-head-price">ราคา (บาท)</span>
              </div>
            </div>

            {vaccineSchedule.map((group, gi) => (
              <section className="vaccine-row" key={group.age} aria-labelledby={`age-${gi}`}>
                <h2 className="vaccine-age" id={`age-${gi}`}>
                  {group.age}
                </h2>
                <ul className="vaccine-items">
                  {group.items.map((item, i) => (
                    <li className="vaccine-line" key={i}>
                      <span className="vaccine-name">
                        <i className={`dot ${item.type}`} aria-hidden="true" /> {item.name}
                        <span className="sr-only">
                          {item.type === "core" ? " (วัคซีนหลัก)" : " (วัคซีนเสริม)"}
                        </span>
                      </span>
                      <span className="vaccine-line-price">
                        <span className="sr-only">ราคา </span>
                        {item.price}
                        <span className="sr-only"> บาท</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="vaccine-note">
            * ราคาวัคซีนอาจมีการปรับเปลี่ยนขึ้นอยู่กับราคาต้นทุนวัคซีนในตลาด
            กรุณาสอบถามราคาล่าสุดก่อนเข้ารับบริการ · การฉีดวัคซีนพิจารณาตามความเหมาะสมรายบุคคลโดยกุมารแพทย์
          </p>

          <div className="hours-actions">
            <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line big">
              สอบถาม / นัดฉีดวัคซีนผ่าน LINE
            </a>
            <a href={phoneTel} className="btn btn-call big">
              โทร {phoneDisplay}
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
                <a href={lineUrl} target="_blank" rel="noreferrer">
                  LINE Official
                </a>
              </li>
              <li>
                <a href={facebookUrl} target="_blank" rel="noreferrer">
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
