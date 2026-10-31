import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LineLink from "../../LineLink";
import { doctorPath } from "../../doctorData";
import LiteYouTube from "../../symptoms/LiteYouTube";
import { Brain60Footer, Brain60Header } from "../Shell";
import { publishedPosts } from "../posts";
import { thaiDate } from "../date";

const siteUrl = "https://www.sahawanclinic.clinic";

// มีเฉพาะตอนที่แพทย์ตรวจทานแล้ว — slug อื่น (รวมร่างที่ยังไม่ reviewed) เป็น 404
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts.map((p) => ({ slug: p.slug }));
}

function findPost(slug: string) {
  const p = publishedPosts.find((x) => x.slug === slug);
  if (!p) notFound();
  return p;
}

export async function generateMetadata(props: PageProps<"/brain60/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = findPost(slug);
  const url = `${siteUrl}/brain60/${p.slug}`;
  const description = p.body.join(" ").slice(0, 155);
  return {
    title: `${p.title} · สมองใน 60 วินาที`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "th_TH",
      url,
      siteName: "สหวรรณคลินิก",
      title: p.title,
      description,
      publishedTime: p.date,
      images: [{ url: "/doctor1.jpg", width: 700, height: 900, alt: "นพ. สหรัฐ อังศุมาศ ประสาทแพทย์" }],
    },
  };
}

export default async function Brain60PostPage(props: PageProps<"/brain60/[slug]">) {
  const { slug } = await props.params;
  const p = findPost(slug);
  const url = `${siteUrl}/brain60/${p.slug}`;
  const idx = publishedPosts.findIndex((x) => x.slug === p.slug);
  const newer = publishedPosts[idx - 1];
  const older = publishedPosts[idx + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": url,
        url,
        headline: p.title,
        inLanguage: "th",
        datePublished: p.date,
        dateModified: p.reviewed,
        author: { "@id": `${siteUrl}/#physician-saharat` },
        reviewedBy: { "@id": `${siteUrl}/#physician-saharat` },
        articleBody: p.body.join("\n"),
      },
      {
        "@type": "FAQPage",
        mainEntity: [{ "@type": "Question", name: p.title, acceptedAnswer: { "@type": "Answer", text: p.body.join(" ") } }],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "หน้าแรก", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "สมองใน 60 วินาที", item: `${siteUrl}/brain60` },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
    ],
  };

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
                <li>
                  <Link href="/brain60">สมองใน 60 วินาที</Link>
                </li>
                <li aria-current="page">{p.title}</li>
              </ol>
            </nav>
            <p className="eyebrow">สมองใน 60 วินาที</p>
            <h1 className="hero-title">{p.title}</h1>
            <p className="symptom-byline">
              โดย <Link href={doctorPath}>นพ. สหรัฐ อังศุมาศ</Link> · ประสาทแพทย์ ·{" "}
              <time dateTime={p.date}>{thaiDate(p.date)}</time>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container b60-post">
            <div className="b60-answer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/stickline/icons/${p.icon ?? "prop_brain"}.png`} alt="" width={96} height={96} />
              <div>
                {p.body.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>
            {p.videoId && (
              <div className="symptom-video">
                <LiteYouTube videoId={p.videoId} title={p.title} />
              </div>
            )}
            <div className="sl-controls">
              {p.related && (
                <Link href={p.related} className="btn btn-dark">
                  อ่านต่อ
                </Link>
              )}
              <LineLink message={`สวัสดี อยากปรึกษาเรื่อง ${p.title}`} className="btn btn-line">
                ปรึกษาผ่าน LINE
              </LineLink>
            </div>
            <p className="vaccine-note">* เพื่อความเข้าใจเบื้องต้น ไม่ใช่การวินิจฉัยหรือทดแทนการพบแพทย์</p>
            <nav className="b60-nav" aria-label="ตอนอื่น">
              {older && (
                <Link href={`/brain60/${older.slug}`}>
                  <span>ตอนก่อนหน้า</span>
                  {older.title}
                </Link>
              )}
              {newer && (
                <Link href={`/brain60/${newer.slug}`}>
                  <span>ตอนถัดไป</span>
                  {newer.title}
                </Link>
              )}
            </nav>
          </div>
        </section>
      </main>
      <Brain60Footer />
    </>
  );
}
