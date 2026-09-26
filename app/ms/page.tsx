import Link from "next/link";
import type { Metadata } from "next";

// หน้าปลายทาง QR ของงานให้ความรู้ผู้ป่วย MS/NMOSD 9 พ.ย. 2569 — URL ต้องเป็น /ms ห้ามเปลี่ยน
// ข้อมูลสิทธิ ณ ก.ย. 2569 (ที่มา: ms_talk_2026_11_09/BRIEFING_ประกันสังคม_MS.md)
// กติกาเนื้อหา: ไม่ใส่ชื่อยา ไม่มีตัวเลขรับประกันผล · จุดที่ยังยืนยันไม่ได้ให้ "สอบถาม สปส."

const lineUrl = "https://lin.ee/7Y8onWN";
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";
const channelUrl = "https://www.youtube.com/@saharatau";
const pageUrl = "https://www.sahawanclinic.clinic/ms";

const pageTitle = "MS · NMOSD ดูแลตัวเองได้ รู้สิทธิไม่ให้ขาด";
const pageDesc =
  "คู่มือสั้นสำหรับผู้ป่วยโรคปลอกประสาทเสื่อมแข็ง (MS) และ NMOSD: ดูแลตัวเองในชีวิตประจำวัน " +
  "และสรุปสิทธิประกันสังคม ม.33 ม.39 ม.40 ที่ต้องรู้เพื่อไม่ให้สิทธิขาด โดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  keywords: [
    "MS",
    "NMOSD",
    "โรคปลอกประสาทเสื่อมแข็ง",
    "ประกันสังคม ม.39",
    "สิทธิประกันสังคม โรคเรื้อรัง",
    "ประสาทแพทย์",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: pageUrl,
    siteName: "สหวรรณคลินิก",
    title: pageTitle,
    description: "ดูแลตัวเองเมื่อเป็น MS / NMOSD + สิทธิประกันสังคมที่ต้องรู้ โดยประสาทแพทย์",
    images: [{ url: "/doctor1.jpg", width: 700, height: 900, alt: "นพ. สหรัฐ อังศุมาศ ประสาทแพทย์" }],
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: "ดูแลตัวเองเมื่อเป็น MS / NMOSD + สิทธิประกันสังคมที่ต้องรู้",
  },
};

const selfCare = [
  {
    icon: "💊",
    title: "ใช้ยาต่อเนื่อง ห้ามหยุดยาเอง",
    text: "ยาควบคุมโรคช่วยลดการกำเริบในระยะยาว แม้ช่วงที่รู้สึกสบายดีก็ควรใช้ต่อ ถ้ามีผลข้างเคียงหรืออยากปรับยา ให้คุยกับแพทย์ก่อนทุกครั้ง",
  },
  {
    icon: "📅",
    title: "มาตามนัด และตรวจ MRI ตามที่แพทย์แนะนำ",
    text: "MRI ช่วยให้เห็นการเปลี่ยนแปลงที่ยังไม่มีอาการ แพทย์ใช้ประกอบการปรับการรักษา เก็บผลตรวจและประวัติยาไว้ให้ครบ",
  },
  {
    icon: "🚨",
    title: "อาการใหม่ที่เป็นนานเกิน 24 ชั่วโมง ติดต่อแพทย์",
    text: "เช่น ตามัวหรือปวดตาเวลากลอกตา ชาหรืออ่อนแรงครึ่งตัว เดินเซ ปัสสาวะผิดปกติ สะอึกหรืออาเจียนไม่หยุด ถ้าอาการใหม่เป็นต่อเนื่องเกิน 24 ชั่วโมง อาจเป็นการกำเริบ ควรติดต่อแพทย์โดยเร็ว",
  },
  {
    icon: "🌡️",
    title: "ร่างกายร้อน อาการเดิมอาจแย่ลงชั่วคราว",
    text: "อากาศร้อน อาบน้ำร้อน มีไข้ หรือออกกำลังหนัก อาจทำให้อาการเดิมเป็นมากขึ้นชั่วคราว (เรียกว่า Uhthoff) เมื่อพักให้ร่างกายเย็นลงมักดีขึ้น ไม่จำเป็นต้องเป็นการกำเริบใหม่ แต่ถ้าไม่ดีขึ้น ปรึกษาแพทย์",
  },
  {
    icon: "🚶",
    title: "ออกกำลังกายสม่ำเสมอตามที่ไหว",
    text: "เดิน ว่ายน้ำ ยืดเหยียด หรือฝึกการทรงตัว ช่วยเรื่องแรง ความล้า และอารมณ์ เลือกช่วงอากาศเย็น ดื่มน้ำ และพักเป็นระยะ",
  },
  {
    icon: "😴",
    title: "นอนให้พอ จัดการความล้า",
    text: "ความล้าพบบ่อยในโรคนี้ นอนเป็นเวลา แบ่งงานเป็นช่วง ๆ และพักก่อนหมดแรง บอกครอบครัวหรือที่ทำงานให้เข้าใจ",
  },
  {
    icon: "🚭",
    title: "งดบุหรี่",
    text: "การสูบบุหรี่สัมพันธ์กับโรคที่แย่ลง เลิกได้เมื่อไรก็เป็นประโยชน์ ขอความช่วยเหลือเรื่องการเลิกบุหรี่ได้",
  },
  {
    icon: "💚",
    title: "ดูแลใจ",
    text: "ความเครียด ความกังวล หรืออารมณ์เศร้าพบได้บ่อย และดูแลได้ ถ้ารู้สึกหมดกำลังใจนาน ๆ บอกแพทย์ได้เสมอ",
  },
  {
    icon: "💉",
    title: "วัคซีน ปรึกษาแพทย์ก่อน",
    text: "ยาบางกลุ่มมีผลต่อการเลือกชนิดและจังหวะการฉีดวัคซีน ก่อนฉีดวัคซีนทุกครั้งแจ้งแพทย์ที่ดูแลโรคนี้",
  },
];

const rightsSummary = [
  "ประกันสังคมเริ่มใช้สิทธิรักษาได้เมื่อส่งเงินสมทบครบ 3 เดือน ภายใน 15 เดือนก่อนรับบริการ",
  "ลาออกจากงาน สิทธิรักษายังคุ้มครองต่อ 6 เดือน",
  "อยากรักษาสิทธิต่อ สมัคร ม.39 ภายใน 6 เดือนหลังลาออก (ต้องเคยส่ง ม.33 มาแล้วอย่างน้อย 12 เดือน) จ่าย 432 บาทต่อเดือน",
  "ม.39 ขาดส่ง 3 เดือนติดกัน หรือส่งไม่ครบ 9 ใน 12 เดือน สิทธิสิ้นสุด และกลับเข้า ม.39 ไม่ได้อีก",
  "เลือก รพ.ประกันสังคมที่มีประสาทแพทย์ เปลี่ยนได้ปีละครั้ง ช่วง 16 ธ.ค. ถึง 31 มี.ค.",
  "ป่วยจนทำงานไม่ได้ มีเงินทดแทนการขาดรายได้ 50% ของค่าจ้าง · ทุพพลภาพรุนแรงได้ 50% ของค่าจ้างทุกเดือนตลอดชีวิต",
];

const faqs = [
  {
    q: "เป็น MS หรือ NMOSD มาก่อนเข้างาน ใช้สิทธิประกันสังคมได้ไหม?",
    a: "ใช้ได้ ประกันสังคมไม่มีข้อยกเว้นโรคที่เป็นมาก่อน เมื่อส่งเงินสมทบครบ 3 เดือนภายใน 15 เดือน ก็ใช้สิทธิรักษาที่ รพ.ตามบัตรได้",
  },
  {
    q: "ลาออกจากงาน สิทธิรักษาหายทันทีไหม?",
    a: "ไม่หายทันที สิทธิรักษายังคุ้มครองต่อ 6 เดือนหลังออกจากงาน ถ้าเคยส่ง ม.33 มาแล้วอย่างน้อย 12 เดือน สมัคร ม.39 ได้ภายใน 6 เดือน จ่ายเดือนละ 432 บาท หรือเลือกกลับไปใช้บัตรทองหลังพ้นช่วงคุ้มครอง",
  },
  {
    q: "ม.39 สิทธิสิ้นสุดเมื่อไร?",
    a: "เมื่อไม่ส่งเงินสมทบ 3 เดือนติดต่อกัน หรือใน 12 เดือนส่งไม่ครบ 9 เดือน และจะกลับเข้า ม.39 ไม่ได้อีก แนะนำตั้งหักบัญชีอัตโนมัติ และให้ญาติรู้ไว้ เผื่อช่วงที่นอนโรงพยาบาล",
  },
  {
    q: "ป่วยกำเริบจนต้องหยุดงานนาน ได้เงินชดเชยไหม?",
    a: "ได้เงินทดแทนการขาดรายได้ 50% ของค่าจ้าง ครั้งละไม่เกิน 90 วัน ปีละไม่เกิน 180 วัน โดยต้องมีใบรับรองแพทย์ ถ้าต้องหยุดนานกว่านั้น ให้สอบถาม สปส. 1506 ว่าเข้าเกณฑ์โรคเรื้อรังหรือไม่",
  },
  {
    q: "อาการแย่ลงตอนอากาศร้อน แปลว่าโรคกำเริบไหม?",
    a: "ไม่เสมอไป ร่างกายที่ร้อนขึ้นทำให้อาการเดิมเป็นมากชั่วคราวได้ และมักดีขึ้นเมื่อร่างกายเย็นลง แต่ถ้าเป็นอาการใหม่ที่เป็นต่อเนื่องเกิน 24 ชั่วโมง ควรติดต่อแพทย์",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const playlists = [
  {
    id: "PLW27p6f-jwTM",
    title: "MS & NMOSD สิ่งที่คุณทำเองได้",
    text: "การดูแลตัวเองในชีวิตประจำวัน อธิบายทีละเรื่อง ฟังง่าย",
  },
  {
    id: "PLNNOPtwSQnBIhJHpYvtUKqU00yoxn_sT6",
    title: "สิทธิประกันสังคม ม.33 · 39 · 40",
    text: "สิทธิรักษา เงินทดแทน ทุพพลภาพ และการรักษาสิทธิไม่ให้ขาด",
  },
  {
    id: "PLZGz0hNxgK4c",
    title: "หน้าหัวเราะ ขณะที่สมองร้องไห้",
    text: "เล่าเรื่องสี่สิบปีของการตามหาความเข้าใจโรคปลอกประสาทเสื่อมแข็ง",
  },
];

export default function MsPage() {
  return (
    <div className="ms-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          <nav className="nav-links" aria-label="เมนูหลัก">
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
        <section className="hero small">
          <div className="container">
            <p className="eyebrow">สำหรับผู้ป่วยและครอบครัว</p>
            <h1 className="hero-title">
              MS · NMOSD
              <br />
              <span className="ms-nowrap">ดูแลตัวเองได้</span>{" "}
              <span className="ms-nowrap">รู้สิทธิไม่ให้ขาด</span>
            </h1>
            <p className="ms-byline">นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์</p>
            <p className="hero-text narrow">
              สรุปสั้น ๆ สิ่งที่ทำเองได้ทุกวัน และสิทธิประกันสังคมที่ควรรู้ เพื่อให้การรักษาต่อเนื่อง
              ไม่สะดุดเพราะสิทธิขาด
            </p>
            <nav className="ms-jump" aria-label="ไปยังหัวข้อ">
              <a href="#selfcare" className="btn btn-outline">ดูแลตัวเอง</a>
              <a href="#rights" className="btn btn-outline">สิทธิประกันสังคม</a>
              <a href="#equipment" className="btn btn-outline">ยืมอุปกรณ์ฟรี</a>
              <a href="#videos" className="btn btn-outline">คลิปเรียนรู้ต่อ</a>
              <a href="#appointment" className="btn btn-outline">นัดตรวจ</a>
            </nav>
          </div>
        </section>

        <section id="selfcare" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">ส่วนที่ 1</p>
              <h2>ดูแลตัวเองในชีวิตประจำวัน</h2>
              <p>เรื่องพื้นฐานที่ช่วยได้จริง ทำได้เองที่บ้าน รายละเอียดการรักษาของแต่ละคนให้คุยกับแพทย์ที่ดูแล</p>
            </div>
            <ul className="ms-care-list">
              {selfCare.map((c) => (
                <li key={c.title} className="card ms-care">
                  <h3>
                    <span aria-hidden="true">{c.icon}</span> {c.title}
                  </h3>
                  <p>{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="rights" className="section alt">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">ส่วนที่ 2</p>
              <h2>สิทธิประกันสังคม สรุปที่ต้องรู้</h2>
              <p>
                ปัจจุบันยาควบคุมโรคเข้าถึงได้ผ่านสิทธิการรักษาหลัก โจทย์สำคัญจึงอยู่ที่
                <strong> &ldquo;อย่าให้สิทธิขาด&rdquo;</strong> โดยเฉพาะประกันสังคม ซึ่งต้องมีการส่งเงินสมทบ
              </p>
            </div>

            <div className="card ms-key">
              <h3>สรุป 1 นาที</h3>
              <ol>
                {rightsSummary.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
            </div>

            <div className="cards two top-gap">
              <div className="card ms-rights">
                <h3>ม.33 ลูกจ้าง: สิทธิรักษา</h3>
                <ul>
                  <li>ส่งเงินสมทบครบ 3 เดือน ภายใน 15 เดือน ก่อนรับบริการ</li>
                  <li>รักษาที่ รพ.ตามบัตร เป็นโรคมาก่อนเข้างานก็ใช้สิทธิได้</li>
                  <li>เพิ่งได้งานใหม่ ช่วงที่ยังสมทบไม่ครบ 3 เดือน ให้ถามฝ่ายสิทธิของ รพ. ล่วงหน้า ว่าช่วงนี้ใช้สิทธิไหน เพื่อไม่ให้ยาหรือนัดขาด</li>
                  <li>ย้าย รพ. ขอเอกสารสรุปการรักษา ผล MRI และประวัติยาจาก รพ.เดิมไปด้วย</li>
                </ul>
              </div>

              <div className="card ms-rights">
                <h3>เลือกและเปลี่ยนโรงพยาบาล</h3>
                <ul>
                  <li>เลือก รพ.ที่มีประสาทแพทย์และเข้าถึง MRI ได้</li>
                  <li>เปลี่ยนได้ปีละ 1 ครั้ง ช่วง <strong>16 ธ.ค. ถึง 31 มี.ค.</strong> มีผลวันที่ 1 ของเดือนถัดไป</li>
                  <li>ย้ายบ้านหรือย้ายที่ทำงาน ยื่นเปลี่ยนนอกรอบได้ภายใน 30 วัน</li>
                  <li>ช่องทาง: LINE @ssothai · แอป SSO Plus · แอปทางรัฐ · www.sso.go.th · สำนักงานประกันสังคม</li>
                </ul>
              </div>

              <div className="card ms-rights">
                <h3>ลาออก ถูกเลิกจ้าง หรือป่วยจนทำงานไม่ไหว</h3>
                <ul>
                  <li>สิทธิรักษาคุ้มครองต่อ <strong>6 เดือน</strong> หลังออกจากงาน</li>
                  <li>
                    <strong>ม.39</strong>: ต้องเคยส่ง ม.33 อย่างน้อย 12 เดือน สมัครภายใน 6 เดือน จ่าย{" "}
                    <strong>432 บาทต่อเดือน</strong>
                  </li>
                  <li>
                    ม.39 สิ้นสภาพเมื่อ <strong>ขาดส่ง 3 เดือนติดกัน</strong> หรือ
                    <strong> ส่งไม่ครบ 9 ใน 12 เดือน</strong> จุดนี้พลาดกันบ่อยที่สุด
                  </li>
                  <li>ตั้งหักบัญชีอัตโนมัติ และให้ญาติรู้ไว้ เผื่อช่วงที่ต้องนอนโรงพยาบาล</li>
                  <li>หรือกลับไปใช้บัตรทอง หลังพ้นช่วงคุ้มครอง 6 เดือน เลือกแบบไหนดี ขึ้นกับอาการและแผนชีวิตของแต่ละคน</li>
                </ul>
              </div>

              <div className="card ms-rights">
                <h3>เงินทดแทนเมื่อป่วยจนต้องหยุดงาน</h3>
                <ul>
                  <li>ได้ <strong>50% ของค่าจ้าง</strong> ต้องมีใบรับรองแพทย์ให้หยุดงาน</li>
                  <li>ครั้งละไม่เกิน <strong>90 วัน</strong> ปีละไม่เกิน <strong>180 วัน</strong></li>
                  <li>ช่วงที่นายจ้างจ่ายค่าจ้างวันลาป่วยแล้ว สปส. ไม่จ่ายซ้ำ</li>
                  <li>ต้องหยุดงานนานกว่า 180 วัน ให้สอบถาม สปส. 1506 ว่าเข้าเกณฑ์โรคเรื้อรังหรือไม่</li>
                </ul>
              </div>

              <div className="card ms-rights">
                <h3>ทุพพลภาพ</h3>
                <ul>
                  <li>เงื่อนไข: ส่งสมทบครบ 3 เดือน ภายใน 15 เดือนก่อนทุพพลภาพ ประเมินโดยแพทย์ที่ สปส. กำหนด</li>
                  <li>
                    <strong>รุนแรง</strong> (สูญเสียสมรรถภาพตั้งแต่ร้อยละ 50) ได้ <strong>50% ของค่าจ้างทุกเดือน ตลอดชีวิต</strong>
                  </li>
                  <li>ไม่รุนแรง ได้เป็นระยะเวลาตามระดับการสูญเสีย สอบถามรายละเอียดกับ สปส.</li>
                  <li>ค่าพาหนะไปโรงพยาบาลไม่เกิน <strong>500 บาทต่อเดือน</strong> และค่าอุปกรณ์หรือฟื้นฟูสมรรถภาพ</li>
                  <li>ทุพพลภาพแล้วสิทธิไม่หาย ยังได้รับความคุ้มครองต่อ แม้ไม่ได้ทำงานแล้ว</li>
                  <li>ยื่นแบบ สปส. 2-01 พร้อมใบรับรองแพทย์ สำเนาเวชระเบียน และสมุดบัญชี</li>
                </ul>
              </div>

              <div className="card ms-rights">
                <h3>ม.40 อาชีพอิสระ</h3>
                <ul>
                  <li>ไม่มีสิทธิรักษา ใช้บัตรทองรักษา แต่ได้เงินชดเชยตามทางเลือก</li>
                  <li>ทางเลือก 1: 70 บาท/เดือน · ทางเลือก 2: 100 บาท/เดือน · ทางเลือก 3: 300 บาท/เดือน</li>
                  <li>จ่ายมากขึ้น ได้ความคุ้มครองมากขึ้น เช่น เงินชราภาพ</li>
                </ul>
              </div>
            </div>

            <div className="card ms-hotline top-gap">
              <h3>ไม่แน่ใจเรื่องสิทธิ ถามได้ที่</h3>
              <p>
                สายด่วนประกันสังคม <a href="tel:1506">โทร 1506</a> · LINE @ssothai · แอป SSO Plus
              </p>
            </div>
          </div>
        </section>

        <section id="equipment" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">ส่วนที่ 3</p>
              <h2>ยืมอุปกรณ์การแพทย์ฟรี</h2>
              <p>
                สำหรับผู้สูงอายุ คนพิการ และผู้ป่วยที่มีภาวะพึ่งพิง เช่น เตียงผู้ป่วย รถเข็น เครื่องผลิตออกซิเจน
                เครื่องดูดเสมหะ ไม้เท้า walker ไม้ค้ำยัน
              </p>
            </div>

            <div className="cards two">
              <div className="card ms-rights">
                <h3>อยู่ในกรุงเทพฯ</h3>
                <ul>
                  <li>ยื่นคำขอทางเว็บ หรือที่ศูนย์บริการสาธารณสุขใกล้บ้าน</li>
                  <li>นักสังคมสงเคราะห์ประเมินความจำเป็น</li>
                  <li>รับอุปกรณ์พร้อมคำแนะนำการใช้ คืนเมื่อไม่จำเป็นต้องใช้แล้ว</li>
                  <li>นำบัตรประชาชนผู้ป่วยไปด้วย (ถ้าผู้ป่วยมาเองไม่ได้ ให้นำบัตรของผู้ป่วยและของตัวเองไป)</li>
                </ul>
                <p className="top-gap">
                  <a
                    href="https://fa-equipment.bangkok.go.th"
                    className="btn btn-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ยื่นคำขอ fa-equipment.bangkok.go.th
                  </a>
                </p>
              </div>

              <div className="card ms-rights">
                <h3>อยู่ต่างจังหวัด</h3>
                <ul>
                  <li>ถาม รพ.สต. หรือ รพ.ชุมชนใกล้บ้าน ผ่านทีมเยี่ยมบ้าน</li>
                  <li>
                    อบจ. เทศบาล อบต. หลายแห่งมี &ldquo;ธนาคารกายอุปกรณ์&rdquo; หรือศูนย์ยืมอุปกรณ์ ร่วมกับ สปสช.
                    (เช่น นครราชสีมา ชลบุรี สมุทรสงคราม)
                  </li>
                  <li>มีบัตรคนพิการและใช้บัตรทอง ขอรถเข็นหรือกายอุปกรณ์ผ่านโรงพยาบาลได้ โดยไม่ต้องสำรองจ่าย</li>
                  <li>ทำบัตรคนพิการได้ที่ พมจ. หรือศูนย์บริการคนพิการจังหวัด</li>
                </ul>
              </div>
            </div>

            <div className="card ms-hotline top-gap">
              <h3>ไม่รู้จะเริ่มที่ไหน ถามได้ที่</h3>
              <p>
                สายด่วน สปสช. <a href="tel:1330">โทร 1330</a> · สายด่วน พม. <a href="tel:1300">โทร 1300</a>
              </p>
            </div>
          </div>
        </section>

        <section id="videos" className="section alt">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">ส่วนที่ 4</p>
              <h2>คลิปเรียนรู้ต่อ</h2>
              <p>ฟังต่อที่บ้านได้ อธิบายโดย นพ. สหรัฐ อังศุมาศ</p>
            </div>

            <div className="ms-video">
              <iframe
                src="https://www.youtube-nocookie.com/embed/videoseries?list=PLW27p6f-jwTM"
                title="เพลย์ลิสต์ MS & NMOSD สิ่งที่คุณทำเองได้"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <ul className="cards three top-gap ms-playlists">
              {playlists.map((p) => (
                <li key={p.id} className="card">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <a
                    href={`https://www.youtube.com/playlist?list=${p.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-dark big"
                  >
                    เปิดเพลย์ลิสต์<span className="sr-only"> {p.title} (เปิดใน YouTube)</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="cta-actions top-gap">
              <a href={channelUrl} target="_blank" rel="noreferrer" className="btn btn-outline big">
                ไปที่ช่อง YouTube @saharatau
              </a>
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">คำถามที่พบบ่อย</p>
              <h2>ถามบ่อยเรื่อง MS · NMOSD และสิทธิ</h2>
            </div>
            <div className="faq-list">
              {faqs.map((f) => (
                <details key={f.q} className="faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="appointment" className="section alt">
          <div className="container cta-box">
            <div>
              <p className="eyebrow">นัดตรวจ</p>
              <h2>ปรึกษาประสาทแพทย์ที่ <span className="ms-nowrap">สหวรรณคลินิก</span></h2>
              <p>นัดตรวจหรือสอบถามเวลาทำการ ทักผ่าน LINE หรือโทรได้เลย</p>
            </div>
            <div className="cta-actions">
              <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line big">
                นัดตรวจผ่าน LINE
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
            <p>นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์</p>
            <p>101 หมู่บ้านประชานิเวศน์ 3 ถนนประชานิเวศน์ ต.ท่าทราย อ.เมืองนนทบุรี จ.นนทบุรี 11000</p>
            <p>
              เนื้อหาเพื่อความรู้ทั่วไป ไม่ใช่คำแนะนำเฉพาะบุคคล · ข้อมูลสิทธิ ณ ก.ย. 2569
              ตรวจสอบล่าสุดที่ สปส. 1506
            </p>
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

      <div className="mobile-bar">
        <a href={phoneTel} className="mobile-bar-btn call">
          โทร
        </a>
        <a href={lineUrl} target="_blank" rel="noreferrer" className="mobile-bar-btn line">
          แอด LINE
        </a>
        <a href="#rights" className="mobile-bar-btn hours">
          สิทธิ
        </a>
      </div>
    </div>
  );
}
