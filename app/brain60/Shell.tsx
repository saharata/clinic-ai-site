import Link from "next/link";
import MobileMenu from "../MobileMenu";
import LineLink from "../LineLink";

// ส่วนหัว/ท้ายของหน้า "สมองใน 60 วินาที" (รายการและแต่ละตอน) — รูปแบบเดียวกับหน้าอาการ
const phoneDisplay = "065-480-8771";
const phoneTel = "tel:0654808771";

export function Brain60Header() {
  return (
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
          <Link href="/brain60">สมองใน 60 วินาที</Link>
          <a href={phoneTel} className="btn btn-call">
            โทร {phoneDisplay}
          </a>
          <LineLink message="สวัสดี สนใจนัดตรวจคลินิกประสาท" className="btn btn-line">
            แอด LINE
          </LineLink>
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}

export function Brain60Footer() {
  return (
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
              <LineLink message="สวัสดี สนใจนัดตรวจคลินิกประสาท">LINE Official</LineLink>
            </li>
            <li>
              <a href="/brain60/feed.xml">ติดตามผ่าน RSS</a>
            </li>
            <li>
              <Link href="/">กลับหน้าแรก</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
