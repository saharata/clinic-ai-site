import Link from "next/link";
import type { Metadata } from "next";

// หน้าต้นแบบ "หน้าอาการ" — หน้าอาการอื่น (เวียนศีรษะ ชา มือสั่น ชัก ฯลฯ) ใช้โครงเดียวกันนี้:
// hero → red flag → อาการเป็นอย่างไร → เทียบกับโรคที่คล้าย → ตัวกระตุ้น → ดูแลตัวเอง
// → การรักษา → เตรียมตัวก่อนพบแพทย์ → วิดีโอ → FAQ → นัดหมาย

const siteUrl = "https://www.sahawanclinic.clinic";
const pageUrl = `${siteUrl}/symptoms/migraine`;
const lineUrl = "https://lin.ee/7Y8onWN";
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";
const updated = "2026-09-26";

const pageTitle = "ไมเกรน: อาการ ตัวกระตุ้น และเมื่อไรควรพบประสาทแพทย์";
const pageDescription =
  "ไมเกรนต่างจากปวดหัวทั่วไปอย่างไร อาการเตือน (aura) ตัวกระตุ้นที่พบบ่อย การดูแลตัวเอง " +
  "ยาแก้ปวดกินบ่อยทำให้ปวดมากขึ้นได้อย่างไร และสัญญาณอันตรายที่ต้องรีบพบแพทย์ " +
  "อธิบายโดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ สหวรรณคลินิก นนทบุรี";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "ไมเกรน",
    "อาการไมเกรน",
    "ปวดหัวไมเกรน",
    "ไมเกรน รักษา",
    "ไมเกรน นนทบุรี",
    "ปวดหัวข้างเดียว",
    "ออร่า ไมเกรน",
    "ประสาทแพทย์ นนทบุรี",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    locale: "th_TH",
    url: pageUrl,
    siteName: "สหวรรณคลินิก",
    title: pageTitle,
    description:
      "ไมเกรนต่างจากปวดหัวทั่วไปอย่างไร ตัวกระตุ้น การดูแลตัวเอง และสัญญาณอันตราย — โดยประสาทแพทย์",
  },
};

const redFlags = [
  "ปวดศีรษะรุนแรงเฉียบพลันทันที ถึงจุดสูงสุดภายในไม่กี่วินาทีถึง 1 นาที (\"ปวดที่สุดในชีวิต\")",
  "ปวดร่วมกับแขนขาอ่อนแรง ปากเบี้ยว พูดไม่ชัด ชาครึ่งซีก หรือสับสน ซึม",
  "ปวดร่วมกับไข้ คอแข็ง หรือมีผื่น",
  "ปวดหลังศีรษะกระแทก หรือหลังหมดสติ",
  "อาการชัก หรือหมดสติร่วมกับปวดศีรษะ",
];

const seeDoctorSoon = [
  "ปวดศีรษะแบบใหม่ที่เริ่มเป็นครั้งแรกหลังอายุ 50 ปี",
  "รูปแบบการปวดเปลี่ยนไปจากเดิม หรือปวดถี่และรุนแรงขึ้นเรื่อยๆ",
  "ปวดจนตื่นกลางดึก หรือปวดมากขึ้นเมื่อไอ จาม เบ่ง",
  "อาการเตือน (aura) นานเกิน 1 ชั่วโมง หรือมีอาการอ่อนแรงร่วม",
  "ผู้ที่เป็นมะเร็ง ภูมิคุ้มกันต่ำ หรือกำลังตั้งครรภ์ แล้วมีอาการปวดศีรษะแบบใหม่",
  "ต้องกินยาแก้ปวดหลายวันต่อสัปดาห์ หรือปวดจนกระทบการเรียน การทำงาน",
];

const features = [
  {
    title: "ลักษณะการปวด",
    items: [
      "มักปวดข้างเดียว แต่สลับข้างหรือปวดทั้งสองข้างได้",
      "ปวดตุบๆ เป็นจังหวะ ระดับปานกลางถึงรุนแรง",
      "ปวดมากขึ้นเมื่อขยับตัว เดินขึ้นบันได หรือก้มศีรษะ",
      "แต่ละครั้งมักนาน 4–72 ชั่วโมง ถ้าไม่ได้รักษา",
    ],
  },
  {
    title: "อาการร่วม",
    items: [
      "คลื่นไส้ อาเจียน",
      "ไม่ชอบแสงจ้า ไม่ชอบเสียงดัง บางคนไวต่อกลิ่น",
      "อยากนอนพักในห้องมืดและเงียบ",
      "หลังหายปวดอาจอ่อนเพลีย มึนงงไปอีก 1 วัน",
    ],
  },
  {
    title: "อาการเตือน (Aura)",
    items: [
      "พบในผู้ป่วยไมเกรนประมาณ 1 ใน 4–1 ใน 3",
      "มักเห็นแสงวูบวาบ เส้นซิกแซก หรือภาพบางส่วนหายไป",
      "บางคนชาปลายมือแล้วลามขึ้นแขนหรือหน้า หรือพูดติดขัดชั่วคราว",
      "ค่อยๆ เกิดและหายไปเองใน 5–60 นาที ก่อนหรือระหว่างที่ปวด",
    ],
  },
];

const comparison = [
  {
    label: "ตำแหน่ง",
    migraine: "มักข้างเดียว",
    tension: "สองข้าง รัดรอบศีรษะ",
    cluster: "ข้างเดียวเสมอ รอบตา/ขมับ",
  },
  {
    label: "ลักษณะ",
    migraine: "ตุบๆ เป็นจังหวะ",
    tension: "ตื้อๆ บีบรัด",
    cluster: "แทง จี๊ด รุนแรงมาก",
  },
  {
    label: "ระยะเวลา",
    migraine: "4–72 ชั่วโมง",
    tension: "30 นาที–หลายวัน",
    cluster: "15 นาที–3 ชั่วโมง วันละหลายครั้ง",
  },
  {
    label: "ขยับตัวแล้ว",
    migraine: "ปวดมากขึ้น อยากนอนนิ่งๆ",
    tension: "ไม่ค่อยเปลี่ยน",
    cluster: "กระสับกระส่าย นั่งไม่ติด",
  },
  {
    label: "อาการร่วม",
    migraine: "คลื่นไส้ กลัวแสง กลัวเสียง",
    tension: "มักไม่มี",
    cluster: "น้ำตาไหล คัดจมูก ตาแดงข้างเดียวกัน",
  },
];

const triggers = [
  { title: "นอนไม่พอ หรือนอนมากเกินไป", text: "รวมถึงการตื่นสายในวันหยุด เวลานอนที่ไม่สม่ำเสมอเป็นตัวกระตุ้นที่พบบ่อยที่สุดตัวหนึ่ง" },
  { title: "ความเครียด และช่วงหลังเครียด", text: "บางคนปวดตอนผ่อนคลายหลังช่วงงานหนัก เช่น วันแรกของวันหยุด" },
  { title: "อดอาหาร หรือกินไม่ตรงเวลา", text: "ระดับน้ำตาลที่ต่ำลงและการขาดน้ำกระตุ้นไมเกรนได้" },
  { title: "ฮอร์โมน", text: "ผู้หญิงหลายคนปวดช่วงก่อนหรือระหว่างมีประจำเดือน" },
  { title: "แสง เสียง กลิ่น", text: "แสงจ้า แสงกะพริบ เสียงดัง กลิ่นน้ำหอมหรือควันบุหรี่" },
  { title: "คาเฟอีนและแอลกอฮอล์", text: "ทั้งดื่มมากเกินไป และการหยุดกาแฟกะทันหัน" },
];

const selfCare = [
  "จดบันทึกอาการปวดศีรษะ (headache diary): วันที่ เวลา ความรุนแรง 0–10 ยาที่กิน และสิ่งที่ทำก่อนปวด ช่วยหาตัวกระตุ้นและช่วยแพทย์วางแผนรักษา",
  "นอนและตื่นให้เป็นเวลาเดิมทุกวัน รวมวันหยุด",
  "กินอาหารให้ตรงเวลา ดื่มน้ำให้พอ",
  "ออกกำลังกายแบบแอโรบิกสม่ำเสมอ ระดับปานกลาง",
  "เมื่อเริ่มปวด ให้กินยาแก้ปวดตั้งแต่เนิ่นๆ แล้วพักในห้องที่มืดและเงียบ",
  "ไม่ควรกินยาแก้ปวดเกิน 2–3 วันต่อสัปดาห์ ถ้าต้องกินบ่อยกว่านั้นควรปรึกษาแพทย์",
];

const faqs = [
  {
    q: "ไมเกรนหายขาดได้ไหม",
    a: "ไมเกรนเป็นภาวะที่สมองไวต่อสิ่งกระตุ้นมากกว่าปกติ ซึ่งมักเกี่ยวกับพันธุกรรม จึงมักไม่ได้หายขาดแบบครั้งเดียวจบ แต่ส่วนใหญ่ควบคุมได้ด้วยการปรับพฤติกรรม หลีกเลี่ยงตัวกระตุ้น และใช้ยาที่เหมาะสม ในผู้หญิงหลายคนอาการลดลงหลังวัยหมดประจำเดือน ผลของการรักษาแตกต่างกันในแต่ละคน",
  },
  {
    q: "ปวดหัวข้างเดียว เป็นไมเกรนเสมอไหม",
    a: "ไม่เสมอไป การปวดข้างเดียวพบได้ในไมเกรน ปวดศีรษะแบบคลัสเตอร์ ปวดจากคอ ไซนัส หรือโรคอื่นๆ แพทย์จะแยกจากลักษณะการปวด อาการร่วม ระยะเวลา และการตรวจร่างกายทางระบบประสาท",
  },
  {
    q: "กินยาแก้ปวดบ่อย ทำไมยิ่งปวด",
    a: "ถ้ากินยาแก้ปวดทั่วไปตั้งแต่ประมาณ 15 วันต่อเดือน หรือยาเฉพาะไมเกรนบางกลุ่มตั้งแต่ประมาณ 10 วันต่อเดือน ติดต่อกันหลายเดือน สมองอาจไวต่อความปวดมากขึ้นจนปวดเกือบทุกวัน เรียกว่า medication-overuse headache ภาวะนี้แก้ได้ แต่ควรให้แพทย์วางแผนลดยาและให้ยาป้องกันแทน ไม่ควรหยุดยาเองทั้งหมดทันทีโดยไม่ปรึกษาแพทย์",
  },
  {
    q: "ต้องทำ CT หรือ MRI สมองทุกคนไหม",
    a: "ไม่จำเป็นทุกคน ถ้าอาการเข้าได้กับไมเกรนชัดเจนและตรวจร่างกายทางระบบประสาทปกติ มักไม่ต้องตรวจภาพสมอง แพทย์จะพิจารณาส่งตรวจเมื่อมีสัญญาณอันตราย รูปแบบการปวดเปลี่ยนไป หรือตรวจร่างกายพบความผิดปกติ",
  },
  {
    q: "เมื่อไรควรใช้ยาป้องกันไมเกรน",
    a: "แพทย์มักพิจารณายาป้องกันเมื่อปวดไมเกรนตั้งแต่ประมาณ 4 วันต่อเดือนขึ้นไป ปวดรุนแรงจนกระทบชีวิตประจำวัน หรือยาแก้ปวดใช้ไม่ได้ผล ยาป้องกันมีหลายกลุ่ม การเลือกขึ้นกับโรคร่วม อายุ การตั้งครรภ์ และผลข้างเคียงของแต่ละคน",
  },
  {
    q: "ไมเกรนกับออร่า เสี่ยงสโตรกไหม",
    a: "ไมเกรนชนิดมีออร่าสัมพันธ์กับความเสี่ยงหลอดเลือดสมองที่สูงขึ้นเล็กน้อย โดยเฉพาะเมื่อสูบบุหรี่ หรือผู้หญิงที่ใช้ยาคุมกำเนิดที่มีเอสโตรเจน ควรแจ้งแพทย์หากมีออร่า และถ้าอาการอ่อนแรงหรือพูดไม่ชัดเกิดขึ้นทันทีทันใดหรือเป็นนานผิดปกติ ต้องไปห้องฉุกเฉิน",
  },
];

const physicianRef = { "@id": `${siteUrl}/#physician-saharat` };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: "th",
      dateModified: updated,
      author: physicianRef,
      audience: { "@type": "PeopleAudience", audienceType: "ผู้ป่วยและครอบครัว" },
      about: {
        "@type": "MedicalCondition",
        name: "ไมเกรน",
        alternateName: "Migraine",
        code: { "@type": "MedicalCode", codeValue: "G43", codingSystem: "ICD-10" },
        signOrSymptom: [
          { "@type": "MedicalSignOrSymptom", name: "ปวดศีรษะข้างเดียวแบบตุบๆ" },
          { "@type": "MedicalSignOrSymptom", name: "คลื่นไส้ อาเจียน" },
          { "@type": "MedicalSignOrSymptom", name: "กลัวแสง กลัวเสียง" },
          { "@type": "MedicalSignOrSymptom", name: "อาการเตือน (aura) ทางการมองเห็น" },
        ],
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "หน้าแรก", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "อาการทางระบบประสาท", item: `${siteUrl}/symptoms` },
          { "@type": "ListItem", position: 3, name: "ไมเกรน", item: pageUrl },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "VideoObject",
      name: "ปวดหัวแบบไหนอันตราย? 10 สัญญาณที่ต้องรีบไปหาหมอ",
      description: "ประสาทแพทย์อธิบายวิธีแยกอาการปวดศีรษะที่ไม่อันตรายกับสัญญาณเตือนที่ควรรีบตรวจ",
      thumbnailUrl: "https://i.ytimg.com/vi/rLfKxBrIbKY/hqdefault.jpg",
      contentUrl: "https://www.youtube.com/watch?v=rLfKxBrIbKY",
      embedUrl: "https://www.youtube.com/embed/rLfKxBrIbKY",
      author: physicianRef,
    },
  ],
};

const shorts = [
  { videoId: "ud6jgVw4FcM", title: "ความเครียด ทำให้ไมเกรนจริงไหม?" },
  { videoId: "-6FdERlyqJY", title: "กินยาแก้ปวดหัวบ่อย ยิ่งกินยิ่งปวด?" },
];

function YouTube({ id, title }: { id: string; title: string }) {
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

export default function MigrainePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

      <section className="hero small">
        <div className="container">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href="/">หน้าแรก</Link>
            <span aria-hidden="true">›</span>
            <Link href="/symptoms">อาการทางระบบประสาท</Link>
            <span aria-hidden="true">›</span>
            <span>ไมเกรน</span>
          </nav>
          <p className="eyebrow">ความรู้จากประสาทแพทย์</p>
          <h1 className="hero-title">ไมเกรน</h1>
          <p className="hero-text narrow">
            ไมเกรนไม่ใช่แค่ &ldquo;ปวดหัวธรรมดา&rdquo; แต่เป็นโรคของระบบประสาทที่พบบ่อย
            ทำให้ปวดศีรษะเป็นพักๆ ร่วมกับคลื่นไส้ กลัวแสง กลัวเสียง จนหลายคนทำงานหรือเรียนไม่ได้
            หน้านี้อธิบายว่าไมเกรนต่างจากปวดหัวแบบอื่นอย่างไร อะไรเป็นตัวกระตุ้น ดูแลตัวเองอย่างไร
            และอาการแบบไหนที่ต้องรีบพบแพทย์
          </p>
          <p className="article-meta">
            โดย นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์ · ปรับปรุงล่าสุด{" "}
            <time dateTime={updated}>26 กันยายน 2569</time>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container article">
          <div className="redflag-box" role="note">
            <h2>ไปห้องฉุกเฉินทันที หรือโทร 1669 ถ้ามีอาการเหล่านี้</h2>
            <ul>
              {redFlags.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="card top-gap">
            <h2 className="article-h2">ควรนัดพบประสาทแพทย์ภายในไม่กี่วัน ถ้า</h2>
            <ul className="article-list">
              {seeDoctorSoon.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="article-block">
            <h2 className="article-h2">อาการไมเกรนเป็นอย่างไร</h2>
            <p className="article-p">
              ไมเกรนเกิดจากสมองและเส้นประสาทรอบหลอดเลือดศีรษะที่ไวต่อสิ่งกระตุ้นมากกว่าปกติ
              เมื่อถูกกระตุ้นจะมีการหลั่งสารที่ทำให้เกิดการอักเสบและความปวด มักเริ่มเป็นตั้งแต่วัยรุ่นหรือวัยทำงาน
              พบในผู้หญิงมากกว่าผู้ชายประมาณ 2–3 เท่า และมักมีคนในครอบครัวเป็นด้วย
            </p>
            <div className="cards three">
              {features.map((f) => (
                <div className="card" key={f.title}>
                  <h3>{f.title}</h3>
                  <ul className="article-list">
                    {f.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="article-block">
            <h2 className="article-h2">ไมเกรน ต่างจากปวดหัวแบบอื่นอย่างไร</h2>
            <p className="article-p">
              ปวดศีรษะที่พบบ่อยมี 3 แบบหลัก การรู้ว่าตัวเองเป็นแบบไหนช่วยให้ดูแลได้ถูกวิธี
              แต่การวินิจฉัยที่แน่นอนต้องอาศัยการซักประวัติและตรวจร่างกายโดยแพทย์
            </p>
            <div className="compare-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">ไมเกรน</th>
                    <th scope="col">ปวดตึงเครียด</th>
                    <th scope="col">คลัสเตอร์</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.migraine}</td>
                      <td>{row.tension}</td>
                      <td>{row.cluster}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="article-block">
            <h2 className="article-h2">ตัวกระตุ้นไมเกรนที่พบบ่อย</h2>
            <p className="article-p">
              ตัวกระตุ้นของแต่ละคนไม่เหมือนกัน และมักต้องมีหลายอย่างรวมกันจึงจะปวด
              การจดบันทึกอาการช่วยให้รู้ว่าอะไรเป็นตัวกระตุ้นของเราจริงๆ
            </p>
            <div className="cards three">
              {triggers.map((t) => (
                <div className="card" key={t.title}>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="article-block">
            <h2 className="article-h2">ดูแลตัวเองเบื้องต้น</h2>
            <div className="card">
              <ul className="article-list">
                {selfCare.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="article-block">
            <h2 className="article-h2">แพทย์รักษาไมเกรนอย่างไร</h2>
            <div className="cards two">
              <div className="card">
                <h3>ยาระงับอาการปวด</h3>
                <p>
                  ใช้เมื่อเริ่มปวด เช่น ยาแก้ปวดทั่วไป ยาต้านการอักเสบ ยาแก้คลื่นไส้
                  หรือยาเฉพาะไมเกรน แพทย์จะเลือกยาตามความรุนแรง โรคประจำตัว และยาที่ใช้อยู่
                  เพื่อให้ได้ผลดีและลดความเสี่ยงจากการใช้ยาเกินขนาด
                </p>
              </div>
              <div className="card">
                <h3>ยาป้องกัน</h3>
                <p>
                  กินหรือฉีดต่อเนื่องเพื่อลดความถี่และความรุนแรงของการปวด
                  มักพิจารณาเมื่อปวดบ่อยหรือปวดจนกระทบชีวิตประจำวัน
                  ต้องใช้เวลาหลายสัปดาห์จึงเห็นผล และควรติดตามกับแพทย์เป็นระยะ
                </p>
              </div>
            </div>
            <p className="article-p top-gap">
              นอกจากยาแล้ว การปรับการนอน การออกกำลังกาย และการจัดการความเครียด
              เป็นส่วนสำคัญของการรักษา ที่คลินิกสามารถติดตามอาการต่อเนื่องผ่าน LINE หลังพบแพทย์ได้
            </p>
          </div>

          <div className="article-block">
            <h2 className="article-h2">เตรียมตัวก่อนมาพบแพทย์</h2>
            <div className="card">
              <ul className="article-list">
                <li>บันทึกอาการปวดศีรษะย้อนหลังอย่างน้อย 2–4 สัปดาห์ (ถ้ามี)</li>
                <li>รายชื่อยาแก้ปวดที่เคยใช้ ขนาด และจำนวนวันที่กินต่อเดือน</li>
                <li>ยาประจำตัวอื่นๆ รวมถึงยาคุมกำเนิดและอาหารเสริม</li>
                <li>ผลตรวจภาพสมอง (CT/MRI) หรือผลเลือดเดิม ถ้าเคยตรวจ</li>
                <li>ประวัติไมเกรนหรือปวดศีรษะในครอบครัว</li>
              </ul>
            </div>
          </div>

          <div className="article-block">
            <h2 className="article-h2">วิดีโอจากประสาทแพทย์</h2>
            <div className="symptom-video article-video">
              <YouTube id="rLfKxBrIbKY" title="ปวดหัวแบบไหนอันตราย? 10 สัญญาณที่ต้องรีบไปหาหมอ" />
            </div>
            <div className="shorts-row top-gap">
              {shorts.map((s) => (
                <div className="short-card" key={s.videoId}>
                  <div className="short-video">
                    <YouTube id={s.videoId} title={s.title} />
                  </div>
                  <p className="short-title">{s.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="article-block">
            <h2 className="article-h2">คำถามที่พบบ่อยเกี่ยวกับไมเกรน</h2>
            <div className="faq-list">
              {faqs.map((f) => (
                <details className="faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="cta-box top-gap">
            <div>
              <p className="eyebrow">คลินิกระบบประสาท (ผู้ใหญ่)</p>
              <h2>ปรึกษาเรื่องไมเกรนกับประสาทแพทย์</h2>
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

          <p className="vaccine-note">
            * ข้อมูลนี้เพื่อความเข้าใจเบื้องต้น ไม่ใช่การวินิจฉัยหรือทดแทนการพบแพทย์
            การวินิจฉัยและการรักษาขึ้นกับการตรวจประเมินรายบุคคลโดยแพทย์ ผลการรักษาแตกต่างกันในแต่ละบุคคล ·
            หากมีอาการเฉียบพลันรุนแรง ควรไปห้องฉุกเฉินทันที
          </p>
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
    </main>
  );
}
