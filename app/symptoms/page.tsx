import Link from "next/link";
import type { Metadata } from "next";
import { symptoms, shorts } from "./symptomsData";

const lineUrl = "https://lin.ee/7Y8onWN";
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";
const channelUrl = "https://www.youtube.com/@saharatau";

export const metadata: Metadata = {
  title: "อาการทางระบบประสาทที่พบบ่อย · ประสาทแพทย์อธิบาย",
  description:
    "ปวดศีรษะ ไมเกรน เวียนศีรษะบ้านหมุน มือชา ลมชัก กล้ามเนื้อกระตุก หน้ามืดใจสั่น — " +
    "อาการแบบไหนอันตราย ควรพบแพทย์เมื่อไร อธิบายโดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ สหวรรณคลินิก นนทบุรี",
  alternates: { canonical: "https://www.sahawanclinic.clinic/symptoms" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://www.sahawanclinic.clinic/symptoms",
    siteName: "สหวรรณคลินิก",
    title: "อาการทางระบบประสาทที่พบบ่อย · ประสาทแพทย์อธิบาย",
    description:
      "ปวดศีรษะ เวียนศีรษะ มือชา ลมชัก — อาการแบบไหนอันตราย ควรพบแพทย์เมื่อไร โดยประสาทแพทย์",
  },
};

const publisher = {
  "@type": "Organization",
  name: "นพ. สหรัฐ อังศุมาศ · สหวรรณคลินิก",
};

const videoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...symptoms.map((s) => ({
      "@type": "VideoObject",
      name: s.videoTitle,
      description: s.blurb,
      thumbnailUrl: `https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`,
      contentUrl: `https://www.youtube.com/watch?v=${s.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${s.videoId}`,
      publisher,
    })),
    ...shorts.map((s) => ({
      "@type": "VideoObject",
      name: s.title,
      description: s.title,
      thumbnailUrl: `https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`,
      contentUrl: `https://www.youtube.com/watch?v=${s.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${s.videoId}`,
      publisher,
    })),
  ],
};

export default function SymptomsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />

      <header className="navbar">
        <div className="container nav-inner">
          <Link href="/" className="brand">
            <div className="brand-badge">N</div>
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

      <section className="hero small">
        <div className="container">
          <p className="eyebrow">ความรู้จากประสาทแพทย์</p>
          <h1 className="hero-title">อาการทางระบบประสาทที่พบบ่อย</h1>
          <p className="hero-text narrow">
            อาการแบบไหนไม่ต้องกังวล และแบบไหนที่ควรรีบพบแพทย์ — อธิบายโดย นพ. สหรัฐ อังศุมาศ
            ประสาทแพทย์ พร้อมวิดีโอสั้นให้เข้าใจง่าย หากมีอาการที่กังวล ปรึกษาหรือนัดตรวจได้ที่คลินิก
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="symptom-list">
            {symptoms.map((s) => (
              <article id={s.slug} key={s.slug} className="symptom-card">
                <div className="symptom-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${s.videoId}`}
                    title={s.videoTitle}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="symptom-body">
                  <h2>
                    <span className="symptom-icon">{s.icon}</span> {s.title}
                  </h2>
                  <p>{s.blurb}</p>
                  <p className="symptom-redflag">
                    <strong>ควรพบแพทย์เมื่อไร:</strong> {s.redFlag}
                  </p>
                  <div className="card-actions">
                    <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line">
                      ปรึกษา / นัดตรวจผ่าน LINE
                    </a>
                    <a href={phoneTel} className="btn btn-outline">
                      โทร {phoneDisplay}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="vaccine-note">
            * ข้อมูลนี้เพื่อความเข้าใจเบื้องต้น ไม่ใช่การวินิจฉัยหรือทดแทนการพบแพทย์
            การวินิจฉัยและการรักษาขึ้นกับการตรวจประเมินรายบุคคลโดยแพทย์ · หากมีอาการเฉียบพลันรุนแรง ควรไปห้องฉุกเฉินทันที
          </p>

          <div className="shorts-block top-gap">
            <div className="section-head">
              <p className="eyebrow">คลิปสั้น 1 นาที</p>
              <h2>ถามหมอประสาท</h2>
              <p>คำถามที่พบบ่อย ตอบสั้น ๆ เข้าใจง่ายโดยประสาทแพทย์</p>
            </div>
            <div className="shorts-row">
              {shorts.map((s) => (
                <div className="short-card" key={s.videoId}>
                  <div className="short-video">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${s.videoId}`}
                      title={s.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <p className="short-title">{s.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-box top-gap">
            <div>
              <p className="eyebrow">ช่องของหมอ</p>
              <h2>ดูความรู้เพิ่มเติมได้ที่ YouTube</h2>
              <p>วิดีโอความรู้โรคระบบประสาทและการดูแลสุขภาพ โดย นพ. สหรัฐ อังศุมาศ</p>
            </div>
            <div className="cta-actions">
              <a href={channelUrl} target="_blank" rel="noreferrer" className="btn btn-dark big">
                ไปที่ช่อง YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h3>สหวรรณคลินิก</h3>
            <p>คลินิกเวชกรรมเด็กและระบบประสาท</p>
            <p>101 หมู่บ้านประชานิเวศน์ 3 ถนนประชานิเวศน์ ต.ท่าทราย อ.เมืองนนทบุรี จ.นนทบุรี 11000</p>
          </div>
          <div>
            <h4>ช่องทางติดต่อ</h4>
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
    </main>
  );
}
