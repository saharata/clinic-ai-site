import Image from "next/image";
import Link from "next/link";

const lineUrl = "https://lin.ee/7Y8onWN";
const facebookUrl = "https://facebook.com/saharat.aungsumart.52";
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";

// พิกัดคลินิก (จาก Google Maps) — TODO: อาจารย์ใส่ที่อยู่เต็มเป็นข้อความได้ทีหลัง
const clinicLat = "13.872989003444337";
const clinicLng = "100.53161461121242";
const clinicAddress =
  "101 หมู่บ้านประชานิเวศน์ 3 ถนนประชานิเวศน์ ต.ท่าทราย อ.เมืองนนทบุรี จ.นนทบุรี 11000";
const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${clinicLat},${clinicLng}`;
const mapEmbedSrc = `https://www.google.com/maps?q=${clinicLat},${clinicLng}&z=16&hl=th&output=embed`;

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "สหวรรณคลินิก — คลินิกเวชกรรมเด็กและระบบประสาท",
  url: "https://www.sahawanclinic.clinic",
  image: "https://www.sahawanclinic.clinic/place.jpg",
  telephone: "+66654808771",
  medicalSpecialty: ["Neurology", "Pediatric"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "101 หมู่บ้านประชานิเวศน์ 3 ถนนประชานิเวศน์ ตำบลท่าทราย",
    addressLocality: "อำเภอเมืองนนทบุรี",
    addressRegion: "นนทบุรี",
    postalCode: "11000",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: clinicLat,
    longitude: clinicLng,
  },
  hasMap: mapsDirectionsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Saturday"],
      opens: "17:00",
      closes: "20:00",
      description: "คลินิกเด็ก (กุมารเวช)",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday", "Friday"],
      opens: "17:00",
      closes: "20:00",
      description: "คลินิกระบบประสาท (ผู้ใหญ่)",
    },
  ],
  sameAs: [facebookUrl],
};

const faqs = [
  {
    q: "คลินิกเปิดทำการวันไหน เวลาอะไรบ้าง",
    a: "คลินิกเด็ก (กุมารเวช) เปิดวันจันทร์และวันเสาร์ เวลา 17:00–20:00 น. ส่วนคลินิกระบบประสาทสำหรับผู้ใหญ่ โดย นพ. สหรัฐ อังศุมาศ เปิดวันพุธและวันศุกร์ เวลา 17:00–20:00 น. แนะนำให้นัดหมายล่วงหน้าผ่าน LINE หรือโทร 065-480-8771 เพื่อลดเวลารอ",
  },
  {
    q: "คลินิกอยู่ที่ไหน เดินทางอย่างไร",
    a: "คลินิกตั้งอยู่เลขที่ 101 หมู่บ้านประชานิเวศน์ 3 ถนนประชานิเวศน์ ตำบลท่าทราย อำเภอเมืองนนทบุรี จังหวัดนนทบุรี 11000 สามารถกดปุ่ม “ขอเส้นทางใน Google Maps” บนหน้าเว็บเพื่อนำทางได้ทันที",
  },
  {
    q: "นัดหมายเข้าตรวจอย่างไร",
    a: "นัดหมายได้ 2 ช่องทาง คือ แอด LINE ของคลินิกเพื่อสอบถามและจองเวลา หรือโทรนัดที่เบอร์ 065-480-8771 ในเวลาทำการ",
  },
  {
    q: "อาการแบบไหนควรพบประสาทแพทย์",
    a: "อาการที่ควรปรึกษาประสาทแพทย์ เช่น ปวดศีรษะเรื้อรังหรือปวดศีรษะรุนแรงผิดปกติ ไมเกรน เวียนศีรษะ มือเท้าชาหรืออ่อนแรง ชัก เกร็งกระตุก มือสั่น เดินเซ หลงลืมผิดปกติ หากมีอาการเฉียบพลัน เช่น แขนขาอ่อนแรงครึ่งซีก ปากเบี้ยว พูดไม่ชัด ควรไปห้องฉุกเฉินทันที",
  },
  {
    q: "ปวดศีรษะหรือไมเกรนแบบไหนที่ควรมาตรวจ",
    a: "ควรมาตรวจเมื่อปวดศีรษะบ่อยขึ้นหรือรุนแรงขึ้นกว่าเดิม ปวดจนรบกวนการใช้ชีวิตหรือการทำงาน ใช้ยาแก้ปวดบ่อยแต่ไม่ดีขึ้น หรือมีอาการร่วม เช่น ตามัว อาเจียนพุ่ง ชา อ่อนแรง ประสาทแพทย์จะช่วยวินิจฉัยชนิดของอาการปวดศีรษะและวางแผนการดูแลที่เหมาะสม",
  },
  {
    q: "พาเด็กมาตรวจสุขภาพและฉีดวัคซีนได้ไหม",
    a: "ได้ คลินิกเด็กดูแลสุขภาพเด็กทั่วไป เช่น ไข้ ไอ ท้องเสีย ตรวจการเจริญเติบโตและพัฒนาการ รวมถึงให้คำปรึกษาและบริการวัคซีนตามช่วงวัย โดยกุมารแพทย์",
  },
  {
    q: "มีระบบติดตามอาการต่อเนื่องหรือไม่",
    a: "มี คลินิกมีระบบติดตามอาการต่อเนื่องผ่าน LINE และระบบช่วยจัดการข้อมูล เหมาะสำหรับผู้ป่วยโรคทางระบบประสาทที่ต้องดูแลและติดตามอาการในระยะยาว",
  },
  {
    q: "ควรเตรียมอะไรมาบ้างก่อนพบแพทย์",
    a: "แนะนำให้นำบัตรประชาชน ยาหรือรายการยาที่ใช้อยู่ ผลตรวจหรือเอกสารทางการแพทย์เดิม (ถ้ามี) และจดบันทึกอาการ เช่น เริ่มเป็นเมื่อไร ความถี่ และสิ่งกระตุ้น มาด้วย เพื่อให้แพทย์ประเมินได้ครบถ้วน",
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

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="navbar">
        <div className="container nav-inner">
          <div className="brand">
            <div className="brand-badge">N</div>
            <div>
              <div className="brand-title">คลินิกเวชกรรมเด็กและระบบประสาท</div>
              <div className="brand-subtitle">Pediatrics • Neurology • AI Care</div>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#services">บริการ</a>
            <a href="#hours">เวลาทำการ</a>
            <a href="#vaccine">ราคาวัคซีนเด็ก</a>
            <a href="#doctors">แพทย์</a>
            <a href="#location">สถานที่</a>
            <a href="#faq">คำถามที่พบบ่อย</a>
            <a href="#contact">ติดต่อ</a>
            <Link href="/ai" className="btn btn-outline">
              AI Tools
            </Link>
            <a href={phoneTel} className="btn btn-call">
              โทร {phoneDisplay}
            </a>
            <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line">
              แอด LINE
            </a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">ดูแลโดยแพทย์ พร้อมระบบติดตามต่อเนื่อง</p>
            <h1 className="hero-title">คลินิกเวชกรรมเด็กและระบบประสาท</h1>
            <p className="hero-text">
              ดูแลสุขภาพเด็กทั่วไปและปัญหาระบบประสาท เช่น ปวดศีรษะ เวียนศีรษะ ชัก ชา
              อ่อนแรง และการติดตามอาการอย่างต่อเนื่องผ่าน LINE และระบบ AI
            </p>

            <div className="hero-actions">
              <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line big">
                ปรึกษา / นัดตรวจผ่าน LINE
              </a>
              <a href={phoneTel} className="btn btn-call big">
                โทร {phoneDisplay}
              </a>
            </div>

            <div className="hero-actions secondary">
              <a href="#hours" className="btn btn-outline big">
                ดูเวลาทำการ
              </a>
              <a href="#services" className="btn btn-outline big">
                ดูบริการคลินิก
              </a>
            </div>
          </div>

          <div className="hero-side">
            <div className="doctor-photo-card">
              <Image
                src="/doctor1.jpg"
                alt="คุณหมอ สหรัฐ อังศุมาศ"
                width={700}
                height={900}
                className="doctor-photo"
                priority
              />
            </div>

            <div className="hero-card">
              <h3>จุดเด่นของคลินิก</h3>
              <ul>
                <li>ดูแลทั้งกุมารแพทย์ทั่วไปและประสาทแพทย์</li>
                <li>ติดตามอาการต่อเนื่องผ่าน LINE</li>
                <li>มีระบบ AI ช่วยสรุปและจัดการข้อมูล</li>
                <li>เหมาะสำหรับผู้ป่วยที่ต้องติดตามอาการระยะยาว</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">บริการหลัก</p>
            <h2>บริการของคลินิก</h2>
            <p>
              แยกเป็น 2 กลุ่มชัดเจน เพื่อให้ผู้ป่วยเข้าใจง่ายและติดต่อได้ตรงความต้องการ
            </p>
          </div>

          <div className="cards two">
            <div className="card">
              <h3>กุมารแพทย์ทั่วไป</h3>
              <p>
                ดูแลสุขภาพเด็กทั่วไป เช่น ไข้ ไอ ท้องเสีย วัคซีน การเจริญเติบโต
                และพัฒนาการเด็ก
              </p>
              <p className="card-hours">เปิดทำการ จันทร์ &amp; เสาร์ 17:00–20:00 น.</p>
              <div className="card-actions">
                <a href="#vaccine" className="btn btn-dark">
                  ดูราคาวัคซีนเด็ก
                </a>
                <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line">
                  นัดหมายผ่าน LINE
                </a>
              </div>
            </div>

            <div className="card">
              <h3>ประสาทแพทย์</h3>
              <p>
                ดูแลอาการทางระบบประสาท เช่น ปวดศีรษะ ไมเกรน เวียนศีรษะ ชัก ชา
                อ่อนแรง Parkinson&apos;s และภาวะสมองเสื่อม
              </p>
              <p className="card-hours">เปิดทำการ พุธ &amp; ศุกร์ 17:00–20:00 น.</p>
              <div className="card-actions">
                <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line">
                  นัดหมายผ่าน LINE
                </a>
                <a href={phoneTel} className="btn btn-outline">
                  โทรนัด
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vaccine" className="section alt">
        <div className="container cta-box">
          <div>
            <p className="eyebrow">วัคซีนเด็ก</p>
            <h2>ราคาวัคซีนเด็กตามช่วงอายุ</h2>
            <p>
              ตารางราคาวัคซีนเด็กครบทุกช่วงอายุ ตั้งแต่ 2 เดือน ถึง 12 ปี · ราคารวมค่าแพทย์และค่าบริการแล้ว
            </p>
          </div>
          <div className="cta-actions">
            <Link href="/vaccine" className="btn btn-dark big">
              ดูราคาวัคซีนทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      <section id="hours" className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">เวลาทำการ</p>
            <h2>เปิดทำการ</h2>
            <p>แนะนำให้นัดหมายล่วงหน้าผ่าน LINE หรือโทร เพื่อความสะดวกและลดเวลารอ</p>
          </div>

          <div className="cards two">
            <div className="hours-card">
              <h3>คลินิกเด็ก (กุมารเวช)</h3>
              <ul className="hours-list">
                <li>
                  <span>จันทร์</span>
                  <span>17:00–20:00 น.</span>
                </li>
                <li>
                  <span>เสาร์</span>
                  <span>17:00–20:00 น.</span>
                </li>
              </ul>
            </div>

            <div className="hours-card">
              <h3>คลินิกระบบประสาท (ผู้ใหญ่)</h3>
              <p className="hours-doctor">โดย นพ. สหรัฐ อังศุมาศ · ประสาทแพทย์</p>
              <ul className="hours-list">
                <li>
                  <span>พุธ</span>
                  <span>17:00–20:00 น.</span>
                </li>
                <li>
                  <span>ศุกร์</span>
                  <span>17:00–20:00 น.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="hours-actions">
            <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line big">
              นัดหมายผ่าน LINE
            </a>
            <a href={phoneTel} className="btn btn-call big">
              โทร {phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section id="doctors" className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Our Doctors</p>
            <h2>ทีมแพทย์ของเรา</h2>
            <p>ดูแลผู้ป่วยด้วยแนวทางที่เป็นระบบ เข้าใจง่าย และต่อเนื่อง</p>
          </div>

          <div className="doctor-grid">
            <div className="doctor-card">
              <div className="doctor-image-wrap">
                <Image
                  src="/doctor1.jpg"
                  alt="นพ. สหรัฐ อังศุมาศ ประสาทแพทย์"
                  width={500}
                  height={650}
                  className="doctor-image"
                />
              </div>
              <div className="doctor-content">
                <h3>นพ. สหรัฐ อังศุมาศ</h3>
                <p className="doctor-role">ประสาทแพทย์ (อายุรกรรมโรคระบบประสาท)</p>
                <p>
                  ดูแลผู้ป่วยที่มีอาการทางระบบประสาท เช่น ปวดศีรษะ ไมเกรน เวียนศีรษะ
                  ชัก ชา อ่อนแรง และโรคระบบประสาทที่ต้องติดตามต่อเนื่อง
                </p>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-image-wrap">
                <Image
                  src="/doctor2.jpg"
                  alt="พญ. วรรณวรา อังศุมาศ กุมารแพทย์"
                  width={500}
                  height={650}
                  className="doctor-image"
                />
              </div>
              <div className="doctor-content">
                <h3>พญ. วรรณวรา อังศุมาศ</h3>
                <p className="doctor-role">กุมารแพทย์</p>
                <p>
                  ดูแลสุขภาพเด็กทั่วไป การเจริญเติบโต พัฒนาการ วัคซีน
                  และอาการเจ็บป่วยทั่วไปของเด็กในทุกช่วงวัย
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="section alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Location</p>
            <h2>สถานที่และการเดินทาง</h2>
            <p>คลินิกออกแบบให้สะอาด สงบ และเหมาะกับการดูแลผู้ป่วยและครอบครัว</p>
          </div>

          <div className="location-grid">
            <div className="place-card">
              {mapEmbedSrc ? (
                <iframe
                  src={mapEmbedSrc}
                  className="map-frame"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="แผนที่คลินิก"
                  allowFullScreen
                />
              ) : (
                <Image
                  src="/place.jpg"
                  alt="สถานที่คลินิก"
                  width={1400}
                  height={900}
                  className="place-image"
                />
              )}
            </div>

            <div className="location-info hero-card">
              <h3>ที่อยู่คลินิก</h3>
              <p>{clinicAddress}</p>
              <ul>
                <li>โทร {phoneDisplay}</li>
                <li>คลินิกเด็ก: จันทร์ &amp; เสาร์ 17:00–20:00 น.</li>
                <li>คลินิกประสาท: พุธ &amp; ศุกร์ 17:00–20:00 น.</li>
              </ul>
              <div className="card-actions top-gap">
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-dark"
                >
                  ขอเส้นทางใน Google Maps
                </a>
                <a href={phoneTel} className="btn btn-call">
                  โทร {phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-box">
          <div>
            <p className="eyebrow">AI for doctors</p>
            <h2>เครื่องมือ AI สำหรับประสาทแพทย์</h2>
            <p>
              เรามีเครื่องมือที่สามารถลงทะเบียนและใช้งานได้ เพื่อช่วยประหยัดเวลาในการดูแลผู้ป่วยและงานคลินิก
            </p>
          </div>
          <div className="cta-actions">
            <Link href="/ai" className="btn btn-dark big">
              เข้าสู่หน้า AI Tools
            </Link>
          </div>
        </div>
      </section>

      <section id="faq" className="section alt">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>คำถามที่พบบ่อย</h2>
            <p>รวมคำถามที่ผู้ป่วยและผู้ปกครองสอบถามบ่อย หากต้องการสอบถามเพิ่มเติม ทักผ่าน LINE หรือโทรได้เลย</p>
          </div>

          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          <div className="hours-actions">
            <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line big">
              สอบถามผ่าน LINE
            </a>
            <a href={phoneTel} className="btn btn-call big">
              โทร {phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container footer-grid">
          <div>
            <h3>คลินิกเวชกรรมเด็กและระบบประสาท</h3>
            <p>ดูแลโดยแพทย์ พร้อมระบบติดตามอาการต่อเนื่องผ่าน LINE และ AI</p>
            <p>{clinicAddress}</p>
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

      <div className="mobile-bar">
        <a href={phoneTel} className="mobile-bar-btn call">
          โทร
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noreferrer"
          className="mobile-bar-btn line"
        >
          แอด LINE
        </a>
        <a href="#hours" className="mobile-bar-btn hours">
          เวลาทำการ
        </a>
      </div>
    </main>
  );
}
