import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import MobileMenu from "../../MobileMenu";
import LineLink from "../../LineLink";
import { clinics, hhmm, thaiDays } from "../../clinicHours";
import {
  doctorUrl,
  orcidUrl,
  physicianJsonLd,
  publications,
  scholarlyArticles,
  siteUrl,
} from "../../doctorData";
import { symptoms } from "../../symptoms/symptomsData";

const lineUrl = "https://lin.ee/7Y8onWN";
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";
const channelUrl = "https://www.youtube.com/@saharatau";

const title = "นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ นนทบุรี";
const description =
  "ประวัติและคุณวุฒิของ นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ สหวรรณคลินิก นนทบุรี " +
  "แพทยศาสตรบัณฑิตเกียรตินิยม Ph.D. 2 สาขา และผลงานวิชาการด้าน MS / NMOSD · ตรวจวันพุธและศุกร์ 17:00–20:00 น.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: doctorUrl,
    languages: { th: doctorUrl, en: `${siteUrl}/en/doctors/saharat-aungsumart`, "x-default": doctorUrl },
  },
  openGraph: {
    type: "profile",
    locale: "th_TH",
    url: doctorUrl,
    siteName: "สหวรรณคลินิก",
    title,
    description,
    images: [{ url: "/doctor1.jpg", width: 700, height: 900, alt: "นพ. สหรัฐ อังศุมาศ ประสาทแพทย์" }],
  },
};

const neuro = clinics.find((c) => c.key === "neuro")!;
const neuroHours = `${neuro.days.map((d) => thaiDays[d]).join(" และ ")} ${hhmm(neuro.open)}–${hhmm(neuro.close)} น.`;

const profileJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": doctorUrl,
      url: doctorUrl,
      name: title,
      inLanguage: "th",
      mainEntity: {
        ...physicianJsonLd,
        image: `${siteUrl}/doctor1.jpg`,
        worksFor: { "@type": "MedicalClinic", name: "สหวรรณคลินิก", url: siteUrl },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "หน้าแรก", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "ทีมแพทย์", item: `${siteUrl}/#doctors` },
        { "@type": "ListItem", position: 3, name: "นพ. สหรัฐ อังศุมาศ", item: doctorUrl },
      ],
    },
    ...scholarlyArticles,
  ],
};

export default function DoctorProfilePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />

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
            <nav aria-label="ตำแหน่งของหน้านี้" className="breadcrumb">
              <ol>
                <li>
                  <Link href="/">หน้าแรก</Link>
                </li>
                <li>
                  <Link href="/#doctors">ทีมแพทย์</Link>
                </li>
                <li aria-current="page">นพ. สหรัฐ อังศุมาศ</li>
              </ol>
            </nav>
            <div className="profile-grid">
              <div>
                <p className="eyebrow">ประสาทแพทย์ (อายุรกรรมโรคระบบประสาท)</p>
                <h1 className="hero-title">นพ. สหรัฐ อังศุมาศ</h1>
                <p className="hero-text narrow">
                  ดูแลผู้ป่วยที่มีอาการทางระบบประสาท เช่น ปวดศีรษะ ไมเกรน เวียนศีรษะ ชัก ชา อ่อนแรง
                  และโรคระบบประสาทที่ต้องติดตามต่อเนื่อง
                </p>
                <p className="profile-hours">
                  ตรวจที่สหวรรณคลินิก <strong>วัน{neuroHours}</strong>
                </p>
                <div className="hero-actions">
                  <LineLink message="สวัสดี สนใจนัดตรวจกับ นพ. สหรัฐ (คลินิกประสาท)" className="btn btn-line big">
                    นัดตรวจผ่าน LINE
                  </LineLink>
                  <a href={phoneTel} className="btn btn-call big">
                    โทร {phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="doctor-photo-card">
                <Image
                  src="/doctor1.jpg"
                  alt="นพ. สหรัฐ อังศุมาศ ประสาทแพทย์"
                  width={700}
                  height={900}
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
              <h2 className="profile-h2">คุณวุฒิ</h2>
              <ul className="profile-list">
                {physicianJsonLd.hasCredential.map((c) => (
                  <li key={c.name}>
                    <strong>{c.name}</strong>
                    <span>{c.recognizedBy.name}</span>
                  </li>
                ))}
              </ul>
              <p className="profile-note">
                ตัวตนนักวิจัยตรวจสอบได้ที่{" "}
                <a href={orcidUrl} target="_blank" rel="noreferrer">
                  ORCID 0000-0002-8183-348X
                </a>
              </p>
            </div>

            <div className="card">
              <h2 className="profile-h2">ความเชี่ยวชาญ</h2>
              <ul className="profile-list">
                {physicianJsonLd.knowsAbout.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>ผลงานวิชาการตีพิมพ์</h2>
              <p>บทความวิจัยที่ตรงกับงานของคลินิก (MS, NMOSD และภูมิคุ้มกันของระบบประสาท)</p>
            </div>
            <ul className="profile-pubs">
              {[...publications]
                .sort((a, b) => Number(b.year) - Number(a.year))
                .map((p) => (
                  <li key={p.title} lang="en">
                    <span className="profile-pub-year">{p.year}</span>
                    <span>
                      <strong>{p.title}</strong>
                      <span className="profile-pub-journal">{p.journal}</span>
                    </span>
                  </li>
                ))}
            </ul>
            <p className="profile-note">
              รายการทั้งหมดดูได้ที่{" "}
              <a href={orcidUrl} target="_blank" rel="noreferrer">
                ORCID
              </a>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>ความรู้จากหมอ</h2>
              <p>วิดีโอและคำอธิบายอาการทางระบบประสาทที่พบบ่อย</p>
            </div>
            <ul className="symptom-related">
              {symptoms.map((s) => (
                <li key={s.slug}>
                  <Link href={`/symptoms/${s.slug}`}>
                    <span aria-hidden="true">{s.icon}</span> {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/ms">MS · NMOSD ดูแลตัวเองได้ รู้สิทธิไม่ให้ขาด</Link>
              </li>
            </ul>
            <p>
              <a href={channelUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                ช่อง YouTube ของหมอ
              </a>
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
                <a href={lineUrl} target="_blank" rel="noreferrer">
                  LINE Official
                </a>
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
