import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { symptoms } from "../symptomsData";
import PrepareChecklist from "../../PrepareChecklist";

const siteUrl = "https://www.sahawanclinic.clinic";
const lineUrl = "https://lin.ee/7Y8onWN";
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";

// มีเฉพาะอาการที่อยู่ใน symptomsData — slug อื่นเป็น 404
export const dynamicParams = false;

export function generateStaticParams() {
  return symptoms.map((s) => ({ slug: s.slug }));
}

function findSymptom(slug: string) {
  const s = symptoms.find((x) => x.slug === slug);
  if (!s) notFound();
  return s;
}

export async function generateMetadata(props: PageProps<"/symptoms/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = findSymptom(slug);
  const url = `${siteUrl}/symptoms/${s.slug}`;
  const title = `${s.title} · ประสาทแพทย์อธิบาย`;
  return {
    title,
    description: s.blurb,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "th_TH",
      url,
      siteName: "สหวรรณคลินิก",
      title,
      description: s.blurb,
      images: [{ url: `https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`, alt: s.videoTitle }],
    },
  };
}

export default async function SymptomPage(props: PageProps<"/symptoms/[slug]">) {
  const { slug } = await props.params;
  const s = findSymptom(slug);
  const url = `${siteUrl}/symptoms/${s.slug}`;
  const others = symptoms.filter((x) => x.slug !== s.slug);

  const author = {
    "@type": "Physician",
    name: "นพ. สหรัฐ อังศุมาศ",
    medicalSpecialty: "Neurology",
    url: siteUrl,
  };

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": url,
        url,
        name: s.title,
        description: s.blurb,
        inLanguage: "th",
        author,
        ...(s.reviewed ? { lastReviewed: s.reviewed, reviewedBy: author } : {}),
        video: {
          "@type": "VideoObject",
          name: s.videoTitle,
          description: s.blurb,
          thumbnailUrl: `https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`,
          contentUrl: `https://www.youtube.com/watch?v=${s.videoId}`,
          embedUrl: `https://www.youtube.com/embed/${s.videoId}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "หน้าแรก", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "อาการที่พบบ่อย", item: `${siteUrl}/symptoms` },
          { "@type": "ListItem", position: 3, name: s.title, item: url },
        ],
      },
      ...(s.faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: s.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
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
                  <Link href="/symptoms">อาการที่พบบ่อย</Link>
                </li>
                <li aria-current="page">{s.title}</li>
              </ol>
            </nav>
            <p className="eyebrow">ความรู้จากประสาทแพทย์</p>
            <h1 className="hero-title symptom-page-title">
              <span className="symptom-icon" aria-hidden="true">
                {s.icon}
              </span>{" "}
              {s.title}
            </h1>
            <p className="hero-text narrow">{s.blurb}</p>
            <p className="symptom-byline">
              โดย นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์
              {s.reviewed && (
                <>
                  {" "}
                  · ตรวจทานล่าสุด{" "}
                  <time dateTime={s.reviewed}>
                    {new Date(s.reviewed).toLocaleDateString("th-TH", { dateStyle: "long" })}
                  </time>
                </>
              )}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container symptom-page">
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

            <p className="symptom-redflag symptom-page-block">
              <strong>ควรพบแพทย์เมื่อไร:</strong> {s.redFlag}
            </p>

            {s.details?.length ? (
              <div className="symptom-details symptom-page-block">
                <h2>คำอธิบายจากแพทย์</h2>
                {s.details.map((d, i) => (
                  <p key={i}>{d}</p>
                ))}
              </div>
            ) : null}

            {s.faq?.length ? (
              <div className="symptom-page-block">
                <h2>คำถามที่พบบ่อย</h2>
                <div className="faq-list">
                  {s.faq.map((f) => (
                    <details key={f.q} className="faq-item">
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="symptom-page-block">
              <PrepareChecklist />
            </div>

            <div className="card-actions symptom-page-block">
              <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line big">
                ปรึกษา / นัดตรวจผ่าน LINE
              </a>
              <a href={phoneTel} className="btn btn-call big">
                โทร {phoneDisplay}
              </a>
            </div>

            <p className="vaccine-note">
              * ข้อมูลนี้เพื่อความเข้าใจเบื้องต้น ไม่ใช่การวินิจฉัยหรือทดแทนการพบแพทย์
              การวินิจฉัยและการรักษาขึ้นกับการตรวจประเมินรายบุคคลโดยแพทย์ · หากมีอาการเฉียบพลันรุนแรง ควรไปห้องฉุกเฉินทันที
            </p>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>อาการอื่นที่พบบ่อย</h2>
            </div>
            <ul className="symptom-related">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/symptoms/${o.slug}`}>
                    <span aria-hidden="true">{o.icon}</span> {o.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              <Link href="/symptoms" className="btn btn-outline">
                ดูอาการทั้งหมดและคลิปสั้น
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
