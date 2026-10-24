import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import LineLink from "../LineLink";
import { clinics, hhmm } from "../clinicHours";
import { physicianId } from "../doctorData";
import {
  EnFooter,
  EnHeader,
  clinicAddressEn,
  clinicName,
  mapsUrl,
  phoneDisplay,
  phoneTel,
  siteUrl,
} from "./enShared";

// หน้าแรกภาษาอังกฤษ — แปลจากหน้าแรกภาษาไทย (บริการ เวลาทำการ ทีมแพทย์ ที่อยู่) ไม่มีเนื้อหาทางการแพทย์ใหม่
const pageUrl = `${siteUrl}/en`;
const title = "Sahawan Clinic | Pediatric & Neurology Clinic in Nonthaburi, Thailand";
const description =
  "Pediatric and neurology clinic in Nonthaburi (Pracha Niwet 3), Thailand. Neurologist Dr. Saharat Aungsumart " +
  "sees headache, migraine, dizziness, seizures, numbness, weakness, MS and NMOSD. Evening clinics; book via LINE or phone.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: pageUrl,
    languages: { th: siteUrl, en: pageUrl, "x-default": siteUrl },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: pageUrl,
    siteName: clinicName,
    title,
    description,
    images: [{ url: "/place.jpg", alt: "Sahawan Clinic" }],
  },
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hoursOf = (key: "pediatric" | "neuro") => {
  const c = clinics.find((x) => x.key === key)!;
  return {
    days: c.days.map((d) => dayNames[d]),
    time: `${hhmm(c.open)}–${hhmm(c.close)}`,
    opens: hhmm(c.open),
    closes: hhmm(c.close),
  };
};
const pediatric = hoursOf("pediatric");
const neuro = hoursOf("neuro");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${pageUrl}#clinic`,
  name: "Sahawan Clinic — Pediatric & Neurology Clinic",
  alternateName: "สหวรรณคลินิก",
  url: pageUrl,
  inLanguage: "en",
  image: `${siteUrl}/place.jpg`,
  telephone: "+66654808771",
  medicalSpecialty: ["Neurology", "Pediatric"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "101 Pracha Niwet 3 Village, Pracha Niwet Road, Tha Sai",
    addressLocality: "Mueang Nonthaburi",
    addressRegion: "Nonthaburi",
    postalCode: "11000",
    addressCountry: "TH",
  },
  geo: { "@type": "GeoCoordinates", latitude: "13.872989003444337", longitude: "100.53161461121242" },
  hasMap: mapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: pediatric.days,
      opens: pediatric.opens,
      closes: pediatric.closes,
      description: "Pediatric clinic",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: neuro.days,
      opens: neuro.opens,
      closes: neuro.closes,
      description: "Neurology clinic (adults)",
    },
  ],
  physician: { "@id": physicianId },
  sameAs: [siteUrl],
};

export default function EnglishHome() {
  return (
    <div lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnHeader thaiHref="/" />

      <main id="main-content" tabIndex={-1}>
        <section className="hero small">
          <div className="container profile-grid">
            <div>
              <p className="eyebrow">{clinicName} · Nonthaburi, Thailand</p>
              <h1 className="hero-title">Pediatric &amp; Neurology Clinic</h1>
              <p className="hero-text narrow">
                General pediatric care and neurological problems such as headache, dizziness,
                seizures, numbness and weakness, with continuous follow-up through LINE.
              </p>
              <div className="hero-actions">
                <LineLink
                  message="Hello, I would like to make an appointment."
                  className="btn btn-line big"
                >
                  Book via LINE
                </LineLink>
                <a href={phoneTel} className="btn btn-call big">
                  Call {phoneDisplay}
                </a>
              </div>
            </div>
            <div className="doctor-photo-card">
              <Image
                src="/doctor1.jpg"
                alt="Dr. Saharat Aungsumart, neurologist"
                width={700}
                height={900}
                className="doctor-photo"
                priority
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Services and opening hours</h2>
              <p>Please book in advance via LINE or phone to reduce waiting time.</p>
            </div>
            <div className="cards two">
              <div className="card">
                <h3>Neurology clinic (adults)</h3>
                <p>
                  Headache, migraine, dizziness, seizures, numbness, weakness, Parkinson&apos;s
                  disease and dementia.
                </p>
                <p className="card-hours">
                  {neuro.days.join(" and ")}, {neuro.time}
                </p>
                <div className="card-actions">
                  <Link href="/en/doctors/saharat-aungsumart" className="btn btn-dark">
                    About the neurologist
                  </Link>
                  <LineLink
                    message="Hello, I would like to make an appointment at the neurology clinic."
                    className="btn btn-line"
                  >
                    Book via LINE
                  </LineLink>
                </div>
              </div>
              <div className="card">
                <h3>Pediatric clinic</h3>
                <p>
                  General child health: fever, cough, diarrhea, vaccines, growth and development.
                </p>
                <p className="card-hours">
                  {pediatric.days.join(" and ")}, {pediatric.time}
                </p>
                <div className="card-actions">
                  <Link href="/vaccine" className="btn btn-dark" hrefLang="th">
                    Vaccine prices (Thai)
                  </Link>
                  <LineLink
                    message="Hello, I would like to make an appointment at the pediatric clinic."
                    className="btn btn-line"
                  >
                    Book via LINE
                  </LineLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>Our doctors</h2>
            </div>
            <div className="cards two">
              <div className="card">
                <h3>Dr. Saharat Aungsumart</h3>
                <p className="doctor-role">Neurologist · MD, Ph.D.</p>
                <p>
                  Cares for patients with neurological symptoms such as headache, migraine,
                  dizziness, seizures, numbness and weakness, and for neurological conditions
                  that need continuous follow-up, including MS and NMOSD.
                </p>
                <Link href="/en/doctors/saharat-aungsumart" className="btn btn-outline">
                  Qualifications and publications
                </Link>
              </div>
              <div className="card">
                <h3>Pediatrician</h3>
                <p className="doctor-role" lang="th">
                  พญ. วรรณวรา อังศุมาศ
                </p>
                <p>
                  General child health, growth, development, vaccines and common childhood
                  illnesses at every age.
                </p>
                <Link href="/pediatric" className="btn btn-outline" hrefLang="th">
                  Pediatric clinic (Thai)
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>Location</h2>
            </div>
            <div className="hero-card">
              <p>{clinicAddressEn}</p>
              <div className="card-actions top-gap">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">
                  Directions in Google Maps
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href={phoneTel} className="btn btn-call">
                  Call {phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <EnFooter thaiHref="/" />
    </div>
  );
}
