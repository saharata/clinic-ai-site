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
    images: [{ url: `${pageUrl}/og-learn.jpg`, width: 1200, height: 630, alt: "Body 101 สื่อการเรียนรู้เรื่องร่างกายสำหรับเด็ก" }],
  },
};

const lessonsL1 = [
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

const lessonsL2 = [
  {
    key: "brain",
    th: "/learn/brain",
    en: "/learn/brain/en",
    level: "เซลล์ประสาท ไซแนปส์ สมอง",
    title: "สมองและระบบประสาท ฉบับเจาะลึก",
    enTitle: "The Brain and Nervous System, in depth",
    text:
      "ลงลึกถึงระดับเซลล์ประสาทหนึ่งเซลล์ ศักย์ไฟฟ้า ช่องไอออน สารสื่อประสาท และแผนที่สมองแต่ละกลีบ",
    points: [
      "เซลล์ประสาท 7 จุดแตะ พร้อมกราฟศักย์ไฟฟ้าเคลื่อนไหว",
      "ทดลองกฎทั้งหมดหรือไม่มีเลย ด้วยแถบความแรงของสิ่งเร้า",
      "สารสื่อประสาท 7 ชนิด และสมอง 6 ส่วน กดดูได้",
      "วงจรรีเฟล็กซ์แบบเคลื่อนไหว และแบบวัดช่วงความจำตัวเลข",
    ],
  },
  {
    key: "heart",
    th: "/learn/heart",
    en: "/learn/heart/en",
    level: "วงจรเลือด ไฟฟ้าหัวใจ ปอด",
    title: "หัวใจ เลือด และปอด ฉบับเจาะลึก",
    enTitle: "Heart, Blood and Lungs, in depth",
    text:
      "เดินตามเลือดหนึ่งหยดผ่านหัวใจสี่ห้องและปอด ดูคลื่นไฟฟ้าหัวใจของจริง และเข้าใจว่าความดันโลหิตคืออะไร",
    points: [
      "วงจรเลือดสองวงแบบเคลื่อนไหว และหัวใจ 6 จุดแตะ",
      "กราฟคลื่นไฟฟ้าหัวใจที่วิ่งจริง ปรับอัตราการเต้นได้",
      "ความดันโลหิตใน 4 สถานการณ์ และการแลกแก๊สที่ถุงลม",
      "ส่วนประกอบของเลือด 5 อย่าง และตารางหมู่เลือดแบบกดได้",
    ],
  },
  {
    key: "dna",
    th: "/learn/dna",
    en: "/learn/dna/en",
    level: "ดีเอ็นเอ ยีน การแบ่งเซลล์",
    title: "ดีเอ็นเอ พันธุกรรม และการแบ่งเซลล์",
    enTitle: "DNA, Genetics and Cell Division",
    text:
      "ตั้งแต่การจับคู่เบส ไปจนถึงการแปลรหัสเป็นโปรตีน ไมโทซิสกับไมโอซิส และการทำนายโอกาสของรุ่นลูก",
    points: [
      "เกมจับคู่เบส และเครื่องแปลรหัสสามตัวอักษรครบทั้ง 64 รหัส",
      "โครโมโซม 23 คู่ สลับดู XX กับ XY ได้",
      "เทียบไมโทซิสกับไมโอซิสทีละขั้น",
      "ตารางพันเนตต์คำนวณโอกาส ใช้ตัวอย่างธาลัสซีเมียซึ่งพบบ่อยในไทย",
    ],
  },
  {
    key: "hormones",
    th: "/learn/hormones",
    en: "/learn/hormones/en",
    level: "ต่อมไร้ท่อ วัยแรกรุ่น การนอน",
    title: "ฮอร์โมนและร่างกายวัยรุ่น",
    enTitle: "Hormones and the Teenage Body",
    text:
      "ต่อมไร้ท่อส่งข่าวอย่างไร ทำไมช่วง 10 ถึง 16 ปีร่างกายเปลี่ยนเร็วมาก และทำไมวัยรุ่นถึงง่วงดึก",
    points: [
      "ต่อมไร้ท่อ 6 ต่อม และตารางเทียบกับระบบประสาท",
      "กราฟน้ำตาลในเลือดหลังกินข้าว พร้อมอินซูลินและกลูคากอน",
      "ไทม์ไลน์วัยแรกรุ่นตามอายุ เลือกดูได้ทั้งสามชุด",
      "นาฬิกาชีวภาพที่เลื่อนไปดึก และเรื่องที่ควรบอกผู้ใหญ่",
    ],
  },
  {
    key: "mind",
    th: "/learn/mind",
    en: "/learn/mind/en",
    level: "การเรียนรู้ อารมณ์ และโรคทางสมอง",
    title: "สมองกับการเรียนรู้ อารมณ์ และการดูแลสมอง",
    enTitle: "The Brain: Learning, Emotion and Brain Care",
    text:
      "ต่อยอดจากบทที่ 8 คราวนี้เน้นการใช้สมองให้ดีขึ้น ทำไมฝึกซ้ำแล้วเก่งขึ้นจริง ทำไมอ่านรวดเดียวก่อนสอบไม่ได้ผล และถ้าเจอคนชักตรงหน้าต้องทำอย่างไร",
    points: [
      "ทดลองฝึกซ้ำแล้วดูเส้นทางประสาทหนาขึ้นจริง",
      "เส้นโค้งการลืม กับตารางทบทวนวันที่ 1 3 7 14",
      "วัดค่าใช้จ่ายของการสลับงานด้วยตัวเอง และวงกลมฝึกหายใจ",
      "ระยะการนอนตลอดคืน และ 6 ภาวะทางสมองที่ควรรู้",
      "ขั้นตอนช่วยคนชัก 6 ข้อ และเมื่อไรต้องโทร 1669",
    ],
  },
];

const lessonsX = [
  {
    key: "neurologist",
    th: "/learn/neurologist",
    en: "/learn/neurologist/en",
    level: "บทพิเศษ · อาชีพ",
    title: "ประสาทแพทย์คือใคร ทำอะไร",
    enTitle: "Who Is a Neurologist, and What Do They Do?",
    text:
      "หมอที่ดูแลสายไฟทั้งระบบของร่างกาย ตั้งแต่สมองถึงปลายนิ้ว ดูแลอะไร ตรวจอย่างไรโดยไม่ต้องเจาะอะไรเลย ใช้เครื่องอะไรมองเข้าไปในสมอง วันหนึ่งทำอะไร และกว่าจะเป็นได้ต้องเรียนกี่ปี",
    points: [
      "แผนที่ระบบประสาท 5 จุดแตะ และเกมส่งคนไข้หาหมอที่ใช่ 5 สาย",
      "ทดลองค้อนเคาะเข่า ไฟฉายกับรูม่านตา ส้อมเสียง และเกมแตะจมูก",
      "อ่านคลื่นสมอง 4 แบบ ตารางเทียบ EEG MRI CT และเกมนักสืบหาตำแหน่งรอยโรค",
      "ภาพประกอบสอน 16 ภาพ เส้นทางการเรียน 12 ปี สัญญาณหลอดเลือดสมอง และแบบทดสอบ 12 ข้อ",
    ],
  },
];

const img = (key: string) => `/learn/img/${key}.webp`;

const heroAlt =
  "ร่างกายมนุษย์โปร่งแสงเรืองแสงสีฟ้า เห็นอวัยวะภายใน มีเซลล์ ดีเอ็นเอ สมอง หัวใจ ไวรัส ใบไม้ และปลาทองลอยโคจรอยู่รอบตัว";
const level1Alt =
  "โต๊ะเรียนวิทยาศาสตร์ยามค่ำ มีกล้องจุลทรรศน์ทองเหลือง ขวดแก้วต้นถั่วงอกที่เห็นราก โหลปลาทอง แว่นขยาย และหุ่นโครงกระดูกไม้ ใต้แสงโคมไฟ";
const level2Alt =
  "สมอง หัวใจพร้อมหลอดเลือด เกลียวดีเอ็นเอ และขวดแก้วเรืองแสง ลอยเรียงกันเหนือโต๊ะทดลอง เชื่อมกันด้วยเส้นแสงสีทอง";
const arenaAlt =
  "ถ้วยรางวัลสีทองบนแท่นหินกลางสนามที่สาดแสงสีน้ำเงิน มีนาฬิกาจับเวลาและจอยเกมสองอันวางด้านหน้า พื้นเป็นแผ่นหกเหลี่ยมเรืองแสง";
const parentsAlt =
  "หนังสือวิทยาศาสตร์เปิดอยู่ข้างแท็บเล็ตที่หน้าจอแสดงภาพเซลล์ มีถ้วยชา แว่นอ่านหนังสือ และกระถางต้นไม้เล็ก บนโต๊ะไม้ใต้แสงโคม";

type Lesson = (typeof lessonsL1)[number];

function LessonCard({ l, n }: { l: Lesson; n: number }) {
  return (
    <article className="card lp-card" key={l.key}>
      <div className="lp-thumb-wrap">
        <img className="lp-thumb" src={img(l.key)} alt="" width={960} height={540} loading="lazy" decoding="async" />
      </div>
      <div className="lp-card-body">
        <p className="eyebrow">
          บทที่ {n} · {l.level}
        </p>
        <h3 className="lp-card-title">{l.title}</h3>
        <p lang="en" className="lp-card-en">
          {l.enTitle}
        </p>
        <p>{l.text}</p>
        <ul className="lp-points">
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
      </div>
    </article>
  );
}

export default function LearnPage() {
  return (
    <main className="learn-page">
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

      <section className="lp-hero" aria-labelledby="lp-title">
        <img
          className="lp-hero-img"
          src={img("hero")}
          alt={heroAlt}
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
        />
        <div className="container lp-hero-inner">
          <div className="lp-hero-copy">
            <p className="eyebrow lp-eyebrow">สื่อการเรียนรู้สำหรับเด็ก ป.3 ถึง ม.1 · ใช้ฟรี ไม่ต้องสมัคร</p>
            <h1 id="lp-title" className="lp-title">
              Body 101
            </h1>
            <p className="lp-tagline">รู้จักร่างกายตั้งแต่เซลล์เล็กจิ๋ว จนถึงอวัยวะและร่างกายทั้งตัว แบบกดแล้วเห็น</p>
            <p className="lp-lead">
              บทเรียนแบบกดเล่นได้ 13 บท สองระดับและบทพิเศษ ส่องกล้องจุลทรรศน์ เปิดร่างกายทีละชั้น ทดลองการระบาดของไวรัส
              แปลรหัสดีเอ็นเอ ดูคลื่นไฟฟ้าหัวใจวิ่งจริง ทุกบทมีปุ่มอ่านออกเสียง มีทั้งภาษาไทยและภาษาอังกฤษ
            </p>
            <div className="lp-hero-actions">
              <a href="/learn/cells" className="btn big lp-btn-light">
                เริ่มบทที่ 1
              </a>
              <a href="/learn/play" className="btn big lp-btn-ghost">
                เข้าสนามแข่ง
              </a>
              <a href="/learn/go" className="btn big lp-btn-ghost">
                เล่นหมากล้อม
              </a>
              <a href="/learn/makruk" className="btn big lp-btn-ghost">
                เล่นหมากรุกไทย
              </a>
            </div>
            <ul className="lp-stats" aria-label="สรุปเนื้อหา">
              <li>13 บท</li>
              <li>ไทย + อังกฤษ</li>
              <li>คำถาม 224 ข้อ</li>
              <li>อ่านออกเสียงได้</li>
              <li>มือถือ แท็บเล็ต คอม</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="l1-title">
        <div className="container">
          <div className="lp-band">
            <img src={img("level1")} alt={level1Alt} width={1200} height={675} loading="lazy" decoding="async" />
            <div className="lp-band-copy">
              <p className="eyebrow lp-eyebrow">ระดับหนึ่ง · 7 บท</p>
              <h2 id="l1-title">ป.3 ถึง ป.6</h2>
              <p>
                เริ่มจากเซลล์เล็กจิ๋ว ไปจนถึงกำแพงแห่งชีวิตทั้งกำแพง เล่นได้ตั้งแต่อ่านออกเขียนได้
                แต่ละบทมีของเล่นให้ทดลอง เกม และแบบทดสอบท้ายบท
              </p>
            </div>
          </div>
          <div className="cards three lp-grid">
            {lessonsL1.map((l, i) => (
              <LessonCard l={l} n={i + 1} key={l.key} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="l2-title">
        <div className="container">
          <div className="lp-band">
            <img src={img("level2")} alt={level2Alt} width={1200} height={675} loading="lazy" decoding="async" />
            <div className="lp-band-copy">
              <p className="eyebrow lp-eyebrow">ระดับสอง · 5 บท</p>
              <h2 id="l2-title">อายุ 11 ถึง 12 ปี</h2>
              <p>
                สำหรับเด็กโตที่อยากรู้ลึกกว่าเดิม ลงถึงระดับเซลล์ประสาท คลื่นไฟฟ้าหัวใจ รหัสพันธุกรรม
                ฮอร์โมนวัยรุ่น และวิธีใช้สมองให้เรียนรู้ได้ดีขึ้น
              </p>
            </div>
          </div>
          <div className="cards two lp-grid">
            {lessonsL2.map((l, i) => (
              <LessonCard l={l} n={i + 8} key={l.key} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="lx-title">
        <div className="container">
          <div className="section-head">
            <h2 id="lx-title">บทพิเศษ · รู้จักอาชีพ</h2>
            <p>บทที่ใช้ภาพประกอบเป็นสื่อการสอน พาไปดูห้องตรวจ เครื่องมือ และวันหนึ่งของหมอสมอง เหมาะกับ ป.3 ถึง ม.1</p>
          </div>
          <div className="cards two lp-grid">
            {lessonsX.map((l) => (
              <LessonCard l={l} n={13} key={l.key} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="arena-title">
        <div className="container">
          <div className="lp-arena">
            <img src={img("arena")} alt={arenaAlt} width={1200} height={675} loading="lazy" decoding="async" />
            <div className="lp-arena-copy">
              <p className="eyebrow lp-eyebrow">โหมดเกม</p>
              <h2 id="arena-title">สนามแข่ง Body 101</h2>
              <p>
                รวมคำถาม 224 ข้อจากทุกบทไว้ที่เดียว มี 5 โหมด แข่งกับเวลา 60 วินาที ปะทะสองคนบนจอเดียว
                ช่วยกันเป็นทีมโดยใช้หัวใจร่วมกัน ล้มบอส 3 ตัว และฝึกซ้อมแบบไม่จับเวลา เก็บเลเวล ตรา
                และสถิติความแม่นยำไว้ในเครื่อง
              </p>
              <div className="lp-hero-actions">
                <a href="/learn/play" className="btn big lp-btn-light">
                  เข้าสนามแข่ง
                </a>
                <a href="/learn/play/en" className="btn big lp-btn-ghost" lang="en">
                  English
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="go-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow lp-eyebrow">เกมฝึกคิด</p>
            <h2 id="go-title">กระดานสองอย่าง เล่นกับคอมพิวเตอร์</h2>
            <p>
              หมากล้อมเต็มรูปแบบ เลือกกระดาน 9×9 13×13 หรือ 19×19 และหมากรุกไทยครบกติกา
              ทั้งเบี้ยหงาย โคน เม็ด และกฎนับศักดิ์ ทั้งสองเกมมีโหมดโค้ชที่คอยบอกว่าตอนนี้เกิดอะไรขึ้น
              และแนะนำตาเดินให้เมื่อขอ เล่นด้วยการคลิกหรือแป้นพิมพ์ก็ได้
            </p>
          </div>
          <div className="lp-hero-actions">
            <a href="/learn/go" className="btn big btn-dark">
              เปิดกระดานหมากล้อม
            </a>
            <a href="/learn/makruk" className="btn big btn-dark">
              เปิดกระดานหมากรุกไทย
            </a>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="parents-title">
        <div className="container lp-parents">
          <img src={img("parents")} alt={parentsAlt} width={1200} height={675} loading="lazy" decoding="async" />
          <div>
            <div className="section-head">
              <h2 id="parents-title">สำหรับคุณพ่อคุณแม่และคุณครู</h2>
              <p>ใช้เป็นสื่อเสริมในห้องเรียนหรือให้เด็กเล่นเองที่บ้านได้</p>
            </div>
            <ul className="lp-points lp-points-lg">
              <li>เนื้อหาครอบคลุมเรื่องเซลล์ ระดับการจัดระบบของสิ่งมีชีวิต และระบบอวัยวะ เหมาะกับช่วงชั้น ป.3 ถึง ม.1</li>
              <li>ไม่ต้องสมัครสมาชิก ไม่ต้องติดตั้ง ความคืบหน้าและตราที่สะสมเก็บไว้ในเครื่องของผู้ใช้เท่านั้น</li>
              <li>แผนภาพที่กดได้วาดขึ้นอย่างง่ายเพื่อการเรียนรู้ ส่วนภาพประกอบหัวบทสร้างด้วย AI เพื่อความสวยงาม ไม่ใช่ภาพกายวิภาคเพื่ออ้างอิง</li>
              <li>เรียบเรียงโดย นพ. สหรัฐ อังศุมาศ ประสาทแพทย์ · สื่อนี้เพื่อการศึกษา ไม่ใช่คำแนะนำทางการแพทย์</li>
            </ul>
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
