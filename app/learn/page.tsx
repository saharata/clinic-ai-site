import Link from "next/link";
import type { Metadata } from "next";
import MobileMenu from "../MobileMenu";
import { lessonsL1, lessonsL2, lessonsX, type Lesson } from "./lessons";

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
    <div className="learn-page">
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
              บทเรียนแบบกดเล่นได้ 17 บท สองระดับและบทพิเศษ ส่องกล้องจุลทรรศน์ เปิดร่างกายทีละชั้น ทดลองการระบาดของไวรัส
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
              <a href="/learn/chess" className="btn big lp-btn-ghost">
                หมากรุกสากล 3 มิติ
              </a>
            </div>
            <ul className="lp-stats" aria-label="สรุปเนื้อหา">
              <li>17 บท</li>
              <li>ไทย + อังกฤษ</li>
              <li>คำถาม 344 ข้อ</li>
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
            <h2 id="lx-title">บทพิเศษ</h2>
            <p>บทที่ใช้ภาพประกอบเป็นสื่อการสอน พาไปรู้จักอาชีพหมอสมอง ออกไปสำรวจระบบสุริยะจนถึงขอบจักรวาล เปิดดูว่า AI เรียนรู้อย่างไร ลงมือสร้างหุ่นยนต์ตัวแรกของเราเอง และต่อสมอง AI เข้ากับร่างกายหุ่นยนต์</p>
          </div>
          <div className="cards two lp-grid">
            {lessonsX.map((l, i) => (
              <LessonCard l={l} n={13 + i} key={l.key} />
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
                รวมคำถาม 344 ข้อจากทุกบทไว้ที่เดียว มี 5 โหมด แข่งกับเวลา 60 วินาที ปะทะสองคนบนจอเดียว
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
            <h2 id="go-title">กระดานสามอย่าง เล่นกับคอมพิวเตอร์หรือสองคน</h2>
            <p>
              หมากล้อมเต็มรูปแบบ เลือกกระดาน 9×9 13×13 หรือ 19×19 · หมากรุกไทยครบกติกาทั้งเบี้ยหงาย โคน เม็ด และนับศักดิ์
              · และหมากรุกสากลกระดานสามมิติที่หมุนดูได้ เล่นกับคอมพิวเตอร์หรือสองคนบนจอเดียว
              ทุกเกมมีโหมดโค้ชที่บอกว่าตอนนี้เกิดอะไรขึ้นและแนะนำตาเดินให้เมื่อขอ
            </p>
          </div>
          <div className="lp-hero-actions">
            <a href="/learn/go" className="btn big btn-dark">
              เปิดกระดานหมากล้อม
            </a>
            <a href="/learn/makruk" className="btn big btn-dark">
              เปิดกระดานหมากรุกไทย
            </a>
            <a href="/learn/chess" className="btn big btn-dark">
              เปิดหมากรุกสากล 3 มิติ
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
            <p>
              <Link href="/learn/teachers" className="btn btn-dark">
                สำหรับครู: จัดชั่วโมงเรียนและใบงานพิมพ์ได้
              </Link>
            </p>
          </div>
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
                <a href={facebookUrl} target="_blank" rel="noreferrer">
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
