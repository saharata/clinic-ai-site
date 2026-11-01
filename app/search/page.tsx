import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import MobileMenu from "../MobileMenu";
import LineLink from "../LineLink";
import SearchBox from "./SearchBox";

const pageUrl = "https://www.sahawanclinic.clinic/search";

export const metadata: Metadata = {
  title: "ค้นหาในเว็บ",
  description: "ค้นหาอาการ วัคซีน บทเรียน Body 101 และคำตอบจากประสาทแพทย์ ทั่วเว็บสหวรรณคลินิก",
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
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
            <a href="tel:0654808771" className="btn btn-call">
              โทร 065-480-8771
            </a>
            <LineLink message="สวัสดี สนใจนัดตรวจ" className="btn btn-line">
              แอด LINE
            </LineLink>
            <MobileMenu />
          </nav>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        <section className="section">
          <div className="container srch-page">
            <h1>ค้นหาในเว็บ</h1>
            <Suspense fallback={null}>
              <SearchBox />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
