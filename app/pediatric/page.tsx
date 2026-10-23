import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import MobileMenu from "../MobileMenu";
import LineLink from "../LineLink";
import { clinics, hhmm, thaiDays } from "../clinicHours";
import { siteUrl } from "../doctorData";
import { vaccineSchedule } from "../vaccine/vaccineData";

// หน้าคลินิกเด็ก — ข้อความทั้งหมดมาจากที่มีอยู่แล้วในหน้าแรก (การ์ดบริการ การ์ดแพทย์ FAQ) ไม่ได้เขียนเนื้อหาทางการแพทย์ใหม่
const pageUrl = `${siteUrl}/pediatric`;
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";

const pediatric = clinics.find((c) => c.key === "pediatric")!;
const hours = `${pediatric.days.map((d) => thaiDays[d]).join(" และ ")} ${hhmm(pediatric.open)}–${hhmm(pediatric.close)} น.`;

const title = "คลินิกเด็ก กุมารแพทย์ นนทบุรี · วัคซีนเด็ก";
const description =
  `คลินิกเด็ก (กุมารเวช) สหวรรณคลินิก นนทบุรี โดย พญ. วรรณวรา อังศุมาศ กุมารแพทย์ ` +
  `ดูแลไข้ ไอ ท้องเสีย วัคซีน การเจริญเติบโตและพัฒนาการเด็ก · เปิดวัน${hours}`;

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
    images: [{ url: "/og-vaccine.jpg", width: 1200, height: 630, alt: "คลินิกเด็ก สหวรรณคลินิก" }],
  },
};

const vaccineAges = vaccineSchedule
  .map((g) => g.age)
  .filter((a) => !a.startsWith("ทุก"))
  .join(" · ");

const services = ["ไข้", "ไอ", "ท้องเสีย", "วัคซีนตามช่วงวัย", "การเจริญเติบโต", "พัฒนาการเด็ก"];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": pageUrl,
      url: pageUrl,
      name: title,
      inLanguage: "th",
      about: {
        "@type": "MedicalClinic",
        name: "สหวรรณคลินิก — คลินิกเด็ก (กุมารเวช)",
        url: pageUrl,
        parentOrganization: { "@type": "MedicalClinic", name: "สหวรรณคลินิก", url: siteUrl },
        medicalSpecialty: "Pediatric",
        telephone: "+66654808771",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Saturday"],
          opens: hhmm(pediatric.open),
          closes: hhmm(pediatric.close),
        },
        employee: {
          "@type": "Physician",
          name: "พญ. วรรณวรา อังศุมาศ",
          medicalSpecialty: "Pediatric",
          image: `${siteUrl}/doctor2.jpg`,
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "หน้าแรก", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "คลินิกเด็ก", item: pageUrl },
      ],
    },
  ],
};

export default function PediatricPage() {
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
            <Link href="/vaccine">ราคาวัคซีน</Link>
            <a href={phoneTel} className="btn btn-call">
              โทร {phoneDisplay}
            </a>
            <LineLink message="สวัสดี สนใจนัดตรวจคลินิกเด็ก" className="btn btn-line">
              แอด LINE
            </LineLink>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero small">
          <div className="container">
            <nav aria-label="ตำแหน่งของหน้านี้" className="breadcrumb">
              <ol>
                <li>
                  <Link href="/">หน้าแรก</Link>
                </li>
                <li aria-current="page">คลินิกเด็ก</li>
              </ol>
            </nav>
            <div className="profile-grid">
              <div>
                <p className="eyebrow">คลินิกเด็ก (กุมารเวช)</p>
                <h1 className="hero-title">คลินิกเด็ก โดยกุมารแพทย์</h1>
                <p className="hero-text narrow">
                  ดูแลสุขภาพเด็กทั่วไป เช่น ไข้ ไอ ท้องเสีย ตรวจการเจริญเติบโตและพัฒนาการ
                  รวมถึงให้คำปรึกษาและบริการวัคซีนตามช่วงวัย โดยกุมารแพทย์
                </p>
                <p className="profile-hours">
                  เปิดทำการ <strong>วัน{hours}</strong>
                </p>
                <div className="hero-actions">
                  <LineLink message="สวัสดี สนใจนัดตรวจคลินิกเด็ก" className="btn btn-line big">
                    นัดหมายผ่าน LINE
                  </LineLink>
                  <a href={phoneTel} className="btn btn-call big">
                    โทร {phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="doctor-photo-card">
                <Image
                  src="/doctor2.jpg"
                  alt="พญ. วรรณวรา อังศุมาศ กุมารแพทย์"
                  width={500}
                  height={650}
                  className="doctor-photo"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container cards two">
            <div className="card">
              <h2 className="profile-h2">บริการ</h2>
              <ul className="profile-list">
                {services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="profile-h2">กุมารแพทย์</h2>
              <p>
                <strong>พญ. วรรณวรา อังศุมาศ</strong>
              </p>
              <p>
                ดูแลสุขภาพเด็กทั่วไป การเจริญเติบโต พัฒนาการ วัคซีน
                และอาการเจ็บป่วยทั่วไปของเด็กในทุกช่วงวัย
              </p>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>วัคซีนเด็กตามช่วงอายุ</h2>
              <p>ดูรายการวัคซีนและราคาของแต่ละช่วงอายุได้ในตารางวัคซีน</p>
            </div>
            <p className="profile-hours">มีวัคซีนสำหรับช่วงอายุ {vaccineAges}</p>
            <p>
              <Link href="/vaccine" className="btn btn-dark">
                ดูตารางราคาวัคซีนทั้งหมด
              </Link>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Body 101 สื่อการเรียนรู้สำหรับเด็กประถม</h2>
              <p>รู้จักร่างกายตั้งแต่เซลล์จนถึงอวัยวะ มีทั้งภาษาไทยและอังกฤษ ใช้ฟรี ไม่ต้องสมัคร</p>
            </div>
            <p>
              <Link href="/learn" className="btn btn-outline">
                เปิด Body 101
              </Link>
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
                <LineLink message="สวัสดี สนใจนัดตรวจคลินิกเด็ก">LINE Official</LineLink>
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
