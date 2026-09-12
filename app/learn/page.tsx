import Link from "next/link";
import type { Metadata } from "next";

const lineUrl = "https://lin.ee/7Y8onWN";
const facebookUrl = "https://facebook.com/saharat.aungsumart.52";
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";

const pageUrl = "https://www.sahawanclinic.clinic/learn";
const learnTitle = "Body 101 · สื่อการเรียนรู้เรื่องร่างกายสำหรับเด็กประถม";
const learnDesc =
  "Body 101 สื่อการเรียนรู้แบบอินเทอร์แอคทีฟสำหรับเด็กประถม รู้จักร่างกายตั้งแต่เซลล์จนถึงอวัยวะ ส่องกล้องจุลทรรศน์ ดูข้างในเซลล์พืชและเซลล์สัตว์ " +
  "ทดลองจำลอง แล้วสำรวจอวัยวะในร่างกายทีละชั้น ภาษาไทยและอังกฤษ ใช้ฟรี ไม่ต้องสมัคร " +
  "เรียบเรียงโดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์";

export const metadata: Metadata = {
  title: learnTitle,
  description: learnDesc,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: pageUrl,
    siteName: "สหวรรณคลินิก",
    title: `${learnTitle} | สหวรรณคลินิก`,
    description: learnDesc,
  },
};

const lessons = [
  {
    key: "cells",
    th: "/learn/cells",
    en: "/learn/cells/en",
    level: "ออร์แกเนลล์ → เซลล์ → เนื้อเยื่อ",
    title: "จากเซลล์สู่ร่างกาย",
    enTitle: "From Cell to Body",
    text:
      "เริ่มจากส่องกล้องจุลทรรศน์ดูเซลล์ของจริง แล้วซูมเข้าไปดูข้างในเซลล์ ก่อนจะซูมออกทีละขั้นจนเห็นเนื้อเยื่อ อวัยวะ และร่างกายทั้งตัว",
    points: [
      "กล้องจุลทรรศน์จำลอง 4 สไลด์ กำลังขยาย ×40 ถึง ×1000",
      "ข้างในเซลล์พืชและเซลล์สัตว์ พร้อมโหมด “เมืองเซลล์”",
      "ห้องทดลอง 4 เรื่อง ออสโมซิส สังเคราะห์ด้วยแสง การหายใจ การแบ่งเซลล์",
      "เกมคัดแยก เกมจับคู่ แบบทดสอบ 14 ข้อ และสมุดสะสมตรา",
    ],
  },
  {
    key: "body",
    th: "/learn/body",
    en: "/learn/body/en",
    level: "อวัยวะ → ระบบอวัยวะ → ร่างกาย",
    title: "ร่างกายของเรา ทีละชั้น",
    enTitle: "Your Body, Layer by Layer",
    text:
      "เปิดร่างกายทีละชั้นเหมือนแผ่นใสในหนังสือกายวิภาค กดที่จุดวงกลมเพื่อดูว่าอวัยวะนั้นคืออะไรและทำงานอย่างไร",
    points: [
      "11 ชั้น: กระดูก กล้ามเนื้อ ผิวหนัง ปอด เลือด ทางเดินอาหาร ไต ประสาท ตา หู และสมอง",
      "จุดให้แตะดูข้อมูลกว่า 50 จุด",
      "ของเล่นทดลองประจำแต่ละระบบ เช่น วัดความไว ฟังเสียงสูงต่ำ",
      "แบบทดสอบ 12 ข้อ",
    ],
  },
  {
    key: "animals",
    th: "/learn/animals",
    en: "/learn/animals/en",
    level: "เปรียบเทียบสิ่งมีชีวิต",
    title: "ร่างกายของพืช ปลา และแมว",
    enTitle: "Plant, Fish and Cat",
    text:
      "สิ่งมีชีวิตทุกชนิดต้องหายใจ หาอาหาร และค้ำตัวเองไว้ แต่แก้โจทย์คนละวิธี เลือกพืช ปลา หรือแมว แล้วเปิดดูทีละระบบ",
    points: [
      "3 สิ่งมีชีวิต 9 ระบบ จุดให้แตะ 35 จุด",
      "ตารางเทียบกับร่างกายของคน",
      "เกม “ของใครเอ่ย” 12 ป้าย",
      "แบบทดสอบ 10 ข้อ",
    ],
  },
  {
    key: "growth",
    th: "/learn/growth",
    en: "/learn/growth/en",
    level: "เติบโตและดูแลตัวเอง",
    title: "โตขึ้นทุกวัน ดูแลตัวเองเป็น",
    enTitle: "Growing Up, Staying Well",
    text:
      "ร่างกายเราโตขึ้น ซ่อมตัวเอง และสู้กับเชื้อโรคทุกวัน ดูว่ามันเปลี่ยนไปอย่างไรตั้งแต่เป็นทารก และเราช่วยมันได้ด้วยการนอน กิน เล่น และล้างมือ",
    points: [
      "เลื่อนดูการเติบโต 6 วัย ความสูง ฟัน กระดูก การนอน",
      "คำนวณเวลาเข้านอน และจัดจานสุขภาพ 2:1:1",
      "จับเวลาล้างมือ 7 ขั้นตอน 20 วินาที",
      "ปราสาททีมป้องกันเชื้อโรค 6 ด่าน และแบบทดสอบ 10 ข้อ",
    ],
  },
  {
    key: "senses",
    th: "/learn/senses",
    en: "/learn/senses/en",
    level: "ประสาทสัมผัสและสมอง",
    title: "ห้าสัมผัส หน้าต่างของสมอง",
    enTitle: "Five Senses, Windows to the Brain",
    text:
      "สมองอยู่ในที่มืดสนิท ทุกอย่างที่เรารู้เกี่ยวกับโลกวิ่งเข้ามาทางตา หู จมูก ลิ้น และผิวหนัง บทนี้มีการทดลองให้ลองเองหลายอัน",
    points: [
      "ทดลองหาจุดบอด ภาพติดตา และผสมแสงสามสี",
      "ฟังเสียงสูงต่ำจริงในหน้าเว็บ และดูตารางความดังที่อันตราย",
      "วัดเวลาปฏิกิริยา แข่งกันได้สองคน",
      "สัมผัสที่เกินห้า การทรงตัว ความเจ็บสองจังหวะ และสัมผัสของสัตว์",
      "เกมจับเวลา 45 วินาที และแบบทดสอบ 12 ข้อ",
    ],
  },
  {
    key: "virus",
    th: "/learn/virus",
    en: "/learn/virus/en",
    level: "ไวรัสและเชื้อโรค",
    title: "ไวรัส สิ่งที่เล็กที่สุดที่ทำให้เราป่วย",
    enTitle: "Viruses and Germs",
    text:
      "ไวรัสไม่กิน ไม่หายใจ และทำอะไรเองไม่ได้เลย แต่พอเข้าเซลล์ได้ มันสั่งให้เซลล์ผลิตไวรัสใหม่เป็นพันตัว",
    points: [
      "ซูมเทียบขนาดจากเม็ดทรายลงไปถึงโมเลกุล",
      "โครงสร้างและรูปทรงไวรัส 4 แบบ พร้อมวงจรการเพิ่มจำนวนแบบเคลื่อนไหว",
      "ไวรัสที่พบบ่อยในไทย 12 ตัว และตารางเทียบกับแบคทีเรีย",
      "ห้องทดลองการระบาด ปรับวัคซีนและการล้างมือแล้วดูเส้นโค้ง",
      "เกมจับเวลา และแบบทดสอบ 12 ข้อ",
    ],
  },
  {
    key: "life",
    th: "/learn/life",
    en: "/learn/life/en",
    level: "ต้นไม้แห่งชีวิต",
    title: "กำแพงแห่งชีวิต",
    enTitle: "The Wall of Life",
    text:
      "ตั้งแต่แบคทีเรียในดินไปจนถึงต้นไม้ใหญ่และตัวเรา ทุกชีวิตใช้รหัสพันธุกรรมชุดเดียวกัน บทนี้พาไปดูทั้งกำแพงทีละกลุ่ม",
    points: [
      "ผังต้นไม้แห่งชีวิต 3 โดเมน กดดูได้ทีละกิ่ง",
      "แบคทีเรีย อาร์เคีย โปรทิสต์ ฟังไจ พืช และสัตว์ รวม 40 กว่าแบบ",
      "กุญแจไขจำแนกแบบที่นักชีววิทยาใช้จริง",
      "เกมจัดกลุ่มสิ่งมีชีวิต และแบบทดสอบ 12 ข้อ",
    ],
  },
];

export default function LearnPage() {
  return (
    <main>
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
          <p className="eyebrow">สื่อการเรียนรู้สำหรับเด็กประถม · ใช้ฟรี</p>
          <h1 className="hero-title">Body 101</h1>
          <p className="hero-text" style={{ fontWeight: 700, color: "#0f172a", marginTop: 0 }}>
            รู้จักร่างกายตั้งแต่เซลล์เล็กจิ๋ว จนถึงอวัยวะและร่างกายทั้งตัว
          </p>
          <p className="hero-text">
            บทเรียนแบบกดเล่นได้ 7 บท ต่อกันเป็นเส้นทางเดียว เริ่มจากเซลล์เล็กจิ๋วที่ต้องส่องกล้องถึงจะเห็น
            แล้วค่อยๆ ซูมออกจนถึงร่างกายทั้งตัว การดูแลตัวเอง ประสาทสัมผัส ไวรัส และจบที่กำแพงแห่งชีวิตทั้งกำแพง
            บทที่ 5 ถึง 7 มีเกมจับเวลาและการทดลองให้ลองเองด้วย มีทั้งภาษาไทยและภาษาอังกฤษ เล่นได้บนมือถือ แท็บเล็ต และคอมพิวเตอร์
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container cta-box">
          <div>
            <p className="eyebrow">ใหม่ · โหมดเกม</p>
            <h2 style={{ margin: "0 0 6px" }}>สนามแข่ง Body 101</h2>
            <p>
              รวมคำถาม 140 ข้อจากทั้ง 7 บทไว้ที่เดียว มี 4 โหมด แข่งกับเวลา 60 วินาที ปะทะสองคนบนจอเดียว
              ล้มบอส 3 ตัว และฝึกซ้อมแบบไม่จับเวลา เก็บเลเวล ตรา และสถิติความแม่นยำไว้ในเครื่อง
            </p>
          </div>
          <div className="cta-actions">
            <a href="/learn/play" className="btn btn-dark big">
              เข้าสนามแข่ง
            </a>
            <a href="/learn/play/en" className="btn btn-outline" lang="en">
              English
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards three">
            {lessons.map((l, i) => (
              <article className="card" key={l.key}>
                <p className="eyebrow">
                  บทที่ {i + 1} · {l.level}
                </p>
                <h2 style={{ margin: "0 0 4px" }}>{l.title}</h2>
                <p lang="en" style={{ marginTop: 0, color: "#64748b" }}>
                  {l.enTitle}
                </p>
                <p>{l.text}</p>
                <ul style={{ color: "#475569", lineHeight: 1.8, paddingLeft: 20 }}>
                  {l.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="card-actions">
                  <a href={l.th} className="btn btn-dark big">
                    เปิดบทเรียน (ภาษาไทย)
                  </a>
                  {l.en ? (
                    <a href={l.en} className="btn btn-outline" lang="en">
                      English
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <h2>สำหรับคุณพ่อคุณแม่และคุณครู</h2>
            <p>ใช้เป็นสื่อเสริมในห้องเรียนหรือให้เด็กเล่นเองที่บ้านได้</p>
          </div>
          <ul style={{ color: "#334155", lineHeight: 1.9, paddingLeft: 20, maxWidth: 760 }}>
            <li>เนื้อหาครอบคลุมเรื่องเซลล์ ระดับการจัดระบบของสิ่งมีชีวิต และระบบอวัยวะ เหมาะกับช่วงชั้น ป.3 ถึง ม.1</li>
            <li>ไม่ต้องสมัครสมาชิก ไม่ต้องติดตั้ง ความคืบหน้าและตราที่สะสมเก็บไว้ในเครื่องของผู้ใช้เท่านั้น</li>
            <li>แผนภาพเป็นภาพอย่างง่ายเพื่อการเรียนรู้ สีที่ใช้แต่งขึ้นให้ดูง่าย ภาพประกอบหัวบทบางภาพสร้างด้วย AI เพื่อความสวยงาม</li>
            <li>เรียบเรียงโดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ · สื่อนี้เพื่อการศึกษา ไม่ใช่คำแนะนำทางการแพทย์</li>
          </ul>
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
                <a href={facebookUrl} target="_blank" rel="noreferrer">
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
