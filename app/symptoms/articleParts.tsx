import Link from "next/link";

// ส่วนที่ใช้ร่วมกันของหน้าบทความอาการ (/symptoms/<slug>)

export const siteUrl = "https://www.sahawanclinic.clinic";
export const lineUrl = "https://lin.ee/7Y8onWN";
export const phoneDisplay = "065-480-8771";
export const phoneTel = "tel:0654808771";
export const physicianRef = { "@id": `${siteUrl}/#physician-saharat` };

export type Faq = { q: string; a: string };

export function faqJsonLd(pageUrl: string, faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function videoJsonLd(videoId: string, name: string, description: string) {
  return {
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    author: physicianRef,
  };
}

export function breadcrumbJsonLd(pageUrl: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "อาการทางระบบประสาท", item: `${siteUrl}/symptoms` },
      { "@type": "ListItem", position: 3, name, item: pageUrl },
    ],
  };
}

export function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

export function ArticleHeader() {
  return (
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
          <Link href="/symptoms">อาการอื่นๆ</Link>
          <a href={phoneTel} className="btn btn-call">
            โทร {phoneDisplay}
          </a>
          <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line">
            แอด LINE
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Breadcrumb({ name }: { name: string }) {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <Link href="/">หน้าแรก</Link>
      <span aria-hidden="true">›</span>
      <Link href="/symptoms">อาการทางระบบประสาท</Link>
      <span aria-hidden="true">›</span>
      <span>{name}</span>
    </nav>
  );
}

export function ArticleMeta({ updated, updatedThai }: { updated: string; updatedThai: string }) {
  return (
    <p className="article-meta">
      โดย นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์ · ปรับปรุงล่าสุด <time dateTime={updated}>{updatedThai}</time>
    </p>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="faq-list">
      {faqs.map((f) => (
        <details className="faq-item" key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function NeuroBookingCta({ heading }: { heading: string }) {
  return (
    <div className="cta-box top-gap">
      <div>
        <p className="eyebrow">คลินิกระบบประสาท (ผู้ใหญ่)</p>
        <h2>{heading}</h2>
        <p>
          นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์ · ตรวจวันพุธและศุกร์ 17:00–20:00 น.
          <br />
          แนะนำนัดล่วงหน้าผ่าน LINE หรือโทร เพื่อลดเวลารอ
        </p>
      </div>
      <div className="cta-actions">
        <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line big">
          นัดผ่าน LINE
        </a>
        <a href={phoneTel} className="btn btn-call big">
          โทร {phoneDisplay}
        </a>
      </div>
    </div>
  );
}

export function MedicalDisclaimer() {
  return (
    <p className="vaccine-note">
      * ข้อมูลนี้เพื่อความเข้าใจเบื้องต้น ไม่ใช่การวินิจฉัยหรือทดแทนการพบแพทย์
      การวินิจฉัยและการรักษาขึ้นกับการตรวจประเมินรายบุคคลโดยแพทย์ ผลการรักษาแตกต่างกันในแต่ละบุคคล ·
      หากมีอาการเฉียบพลันรุนแรง ควรไปห้องฉุกเฉินทันที
    </p>
  );
}

export function ArticleFooter() {
  return (
    <>
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
                <Link href="/symptoms">อาการทางระบบประสาทอื่นๆ</Link>
              </li>
              <li>
                <Link href="/">กลับหน้าแรก</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="mobile-bar">
        <a href={phoneTel} className="mobile-bar-btn call">
          โทร
        </a>
        <a href={lineUrl} target="_blank" rel="noreferrer" className="mobile-bar-btn line">
          แอด LINE
        </a>
        <Link href="/#hours" className="mobile-bar-btn hours">
          เวลาทำการ
        </Link>
      </div>
    </>
  );
}
