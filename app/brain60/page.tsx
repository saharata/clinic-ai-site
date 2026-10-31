import Link from "next/link";
import type { Metadata } from "next";
import { doctorPath } from "../doctorData";
import { Brain60Footer, Brain60Header } from "./Shell";
import { publishedPosts } from "./posts";
import { thaiDate } from "./date";

const siteUrl = "https://www.sahawanclinic.clinic";
const pageUrl = `${siteUrl}/brain60`;
const title = "สมองใน 60 วินาที · ประสาทแพทย์ตอบ 1 คำถาม ทุกสัปดาห์";
const description =
  "คำถามเรื่องสมองและระบบประสาทที่คนถามบ่อย ตอบสั้น ๆ อ่านจบในหนึ่งนาที โดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ สหวรรณคลินิก นนทบุรี";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl, types: { "application/rss+xml": `${pageUrl}/feed.xml` } },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: pageUrl,
    siteName: "สหวรรณคลินิก",
    title,
    description,
    images: [{ url: "/doctor1.jpg", width: 700, height: 900, alt: "นพ. สหรัฐ อังศุมาศ ประสาทแพทย์" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": pageUrl,
  url: pageUrl,
  name: title,
  inLanguage: "th",
  author: { "@id": `${siteUrl}/#physician-saharat` },
  hasPart: publishedPosts.map((p) => ({
    "@type": "Article",
    headline: p.title,
    url: `${pageUrl}/${p.slug}`,
    datePublished: p.date,
  })),
};

export default function Brain60Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Brain60Header />
      <main id="main-content" tabIndex={-1} className="sl-page">
        <section className="hero small">
          <div className="container">
            <nav aria-label="ตำแหน่งของหน้านี้" className="breadcrumb">
              <ol>
                <li>
                  <Link href="/">หน้าแรก</Link>
                </li>
                <li aria-current="page">สมองใน 60 วินาที</li>
              </ol>
            </nav>
            <p className="eyebrow">ตอบ 1 คำถาม ทุกสัปดาห์</p>
            <h1 className="hero-title">สมองใน 60 วินาที</h1>
            <p className="hero-text narrow">
              คำถามเรื่องสมองและระบบประสาทที่คนถามบ่อย ตอบสั้น ๆ อ่านจบในหนึ่งนาที
            </p>
            <p className="symptom-byline">
              โดย <Link href={doctorPath}>นพ. สหรัฐ อังศุมาศ</Link> · ประสาทแพทย์
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <ol className="b60-list">
              {publishedPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/brain60/${p.slug}`} className="b60-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/stickline/icons/${p.icon ?? "prop_brain"}.png`} alt="" width={64} height={64} />
                    <span>
                      <strong>{p.title}</strong>
                      <time dateTime={p.date}>{thaiDate(p.date)}</time>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="vaccine-note">
              * เพื่อความเข้าใจเบื้องต้น ไม่ใช่การวินิจฉัยหรือทดแทนการพบแพทย์ ·{" "}
              <a href="/brain60/feed.xml">ติดตามตอนใหม่ผ่าน RSS</a>
            </p>
          </div>
        </section>
      </main>
      <Brain60Footer />
    </>
  );
}
