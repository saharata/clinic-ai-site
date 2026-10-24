import Link from "next/link";
import LineLink from "../LineLink";

// ส่วนหัว/ท้ายของหน้าภาษาอังกฤษ (/en/...) — แปลจากข้อความภาษาไทยที่มีอยู่แล้วเท่านั้น
// ทั้งหน้าครอบด้วย <div lang="en"> เพราะ <html lang="th"> มาจาก root layout ที่ใช้ร่วมกันทั้งเว็บ

export const siteUrl = "https://www.sahawanclinic.clinic";
export const phoneDisplay = "+66 65 480 8771";
export const phoneTel = "tel:+66654808771";
export const clinicName = "Sahawan Clinic";
export const clinicAddressEn =
  "101 Pracha Niwet 3 Village, Pracha Niwet Road, Tha Sai, Mueang Nonthaburi, Nonthaburi 11000, Thailand";
export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=13.872989003444337,100.53161461121242";

export function EnHeader({ thaiHref }: { thaiHref: string }) {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/en" className="brand">
          <div className="brand-badge" aria-hidden="true">N</div>
          <div>
            <div className="brand-title">{clinicName}</div>
            <div className="brand-subtitle">Pediatric &amp; Neurology Clinic</div>
          </div>
        </Link>
        <nav className="nav-links" aria-label="Main">
          <Link href="/en">Home</Link>
          <a href={phoneTel} className="btn btn-call">
            Call
          </a>
          <LineLink message="Hello, I would like to make an appointment." className="btn btn-line">
            LINE
          </LineLink>
          <Link href={thaiHref} className="btn btn-lang" hrefLang="th" lang="th" aria-label="ภาษาไทย">
            ไทย
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function EnFooter({ thaiHref }: { thaiHref: string }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2 className="footer-title">{clinicName}</h2>
          <p>Pediatric &amp; Neurology Clinic</p>
          <p>{clinicAddressEn}</p>
        </div>
        <div>
          <h3 className="footer-subtitle">Contact</h3>
          <ul className="footer-links">
            <li>
              <a href={phoneTel}>Call {phoneDisplay}</a>
            </li>
            <li>
              <LineLink message="Hello, I would like to make an appointment.">LINE Official</LineLink>
            </li>
            <li>
              <Link href={thaiHref} hrefLang="th" lang="th">
                ภาษาไทย
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
