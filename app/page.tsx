import Image from "next/image";
import Link from "next/link";
const lineUrl = "https://lin.ee/7Y8onWN";
const facebookUrl = "https://facebook.com/saharat.aungsumart.52";
export default function HomePage() {
  return (
    <main>
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
            <a href="#doctors">แพทย์</a>
            <a href="#location">สถานที่</a>
            <a href="#contact">ติดต่อ</a>
            <Link href="/ai" className="btn btn-outline">
              AI Tools
            </Link>
            <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line">
              แอด LINE
            </a>
            <a href={facebookUrl} target="_blank" rel="noreferrer" className="btn btn-facebook">
              Facebook
            </a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">ดูแลโดยแพทย์ พร้อมระบบติดตามต่อเนื่อง</p>
            <h1 className="hero-title">
              คลินิกเวชกรรมเด็กและระบบประสาท
            </h1>
            <p className="hero-text">
              ดูแลสุขภาพเด็กทั่วไปและปัญหาระบบประสาท เช่น ปวดศีรษะ เวียนศีรษะ ชัก ชา
              อ่อนแรง และการติดตามอาการอย่างต่อเนื่องผ่าน LINE และระบบ AI
            </p>

            <div className="hero-actions">
              <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line big">
                ปรึกษา / นัดตรวจผ่าน LINE
              </a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" className="btn btn-facebook big">
                Facebook คลินิก
              </a>
            </div>

            <div className="hero-actions secondary">
              <a href="#services" className="btn btn-outline big">
                ดูบริการคลินิก
              </a>
              <Link href="/ai" className="btn btn-dark big">
                ดูเครื่องมือ AI สำหรับแพทย์
              </Link>
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
              <div className="card-actions">
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
              <div className="card-actions">
                <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-line">
                  นัดหมายผ่าน LINE
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="doctors" className="section alt">
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
                  alt="คุณหมอ สหรัฐ อังศุมาศ"
                  width={500}
                  height={650}
                  className="doctor-image"
                />
              </div>
              <div className="doctor-content">
                <h3>คุณหมอ สหรัฐ อังศุมาศ</h3>
                <p className="doctor-role">แพทย์อายุรกรรมโรคระบบประสาท</p>
                <p>
                  ดูแลผู้ป่วยที่มีอาการทางระบบประสาท เช่น ปวดศีรษะ เวียนศีรษะ ชัก ชา
                  อ่อนแรง และโรคระบบประสาทที่ต้องติดตามต่อเนื่อง
                </p>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-image-wrap">
                <Image
                  src="/doctor2.jpg"
                  alt="คุณหมอ วรรณวรา อังศุมาศ"
                  width={500}
                  height={650}
                  className="doctor-image"
                />
              </div>
              <div className="doctor-content">
                <h3>คุณหมอ วรรณวรา อังศุมาศ</h3>
                <p className="doctor-role">แพทย์กุมารเวชศาสตร์</p>
                <p>
                  ดูแลสุขภาพเด็กทั่วไป การเจริญเติบโต พัฒนาการ วัคซีน
                  และอาการเจ็บป่วยทั่วไปของเด็กในทุกช่วงวัย
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Clinic Place</p>
            <h2>บรรยากาศและสถานที่</h2>
            <p>คลินิกออกแบบให้สะอาด สงบ และเหมาะกับการดูแลผู้ป่วยและครอบครัว</p>
          </div>

          <div className="place-card">
            <Image
              src="/place.jpg"
              alt="สถานที่คลินิก"
              width={1400}
              height={900}
              className="place-image"
            />
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

      <footer id="contact" className="footer">
        <div className="container footer-grid">
          <div>
            <h3>คลินิกเวชกรรมเด็กและระบบประสาท</h3>
            <p>ดูแลโดยแพทย์ พร้อมระบบติดตามอาการต่อเนื่องผ่าน LINE และ AI</p>
          </div>

          <div>
            <h4>ช่องทางติดต่อ</h4>
            <ul className="footer-links">
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