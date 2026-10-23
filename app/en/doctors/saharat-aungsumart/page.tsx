import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import LineLink from "../../../LineLink";
import { clinics, hhmm } from "../../../clinicHours";
import {
  doctorUrl,
  orcidUrl,
  physicianId,
  physicianJsonLd,
  publications,
  scholarlyArticles,
} from "../../../doctorData";
import { EnFooter, EnHeader, phoneDisplay, phoneTel, siteUrl } from "../../enShared";

// หน้าประวัติแพทย์ภาษาอังกฤษ — คุณวุฒิและผลงานมาจาก doctorData.ts (แหล่งเดียวกับหน้าภาษาไทย)
const pageUrl = `${siteUrl}/en/doctors/saharat-aungsumart`;
const name = "Dr. Saharat Aungsumart";
const title = `${name}, Neurologist in Nonthaburi, Thailand`;
const description =
  "Neurologist Dr. Saharat Aungsumart (MD with honors, Ph.D. ×2, Mahidol University) at Sahawan Clinic, Nonthaburi. " +
  "Headache, migraine, dizziness, seizures, MS and NMOSD. Clinic on Wednesday and Friday evenings.";

export const metadata: Metadata = {
  title: { absolute: `${title} | Sahawan Clinic` },
  description,
  alternates: {
    canonical: pageUrl,
    languages: { th: doctorUrl, en: pageUrl, "x-default": doctorUrl },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: pageUrl,
    siteName: "Sahawan Clinic",
    title,
    description,
    images: [{ url: "/doctor1.jpg", width: 700, height: 900, alt: name }],
  },
};

// ชื่อในข้อมูลเป็นสองภาษา "ไทย — English" / "ไทย (English)" → ใช้ส่วนภาษาอังกฤษ
const english = (s: string) => s.match(/\(([^)]+)\)\s*$/)?.[1] ?? s.split(" — ").pop()!;
const credentials = physicianJsonLd.hasCredential.map((c) => ({
  name: c.name.includes(" — ") ? c.name.split(" — ").pop()! : c.name,
  by: english(c.recognizedBy.name),
}));

// ความเชี่ยวชาญ (ตรงกับ physicianJsonLd.knowsAbout ทีละรายการ)
const expertise = [
  "Functional Neurological Disorder (FND)",
  "Migraine and headache",
  "Multiple Sclerosis (MS)",
  "Neuromyelitis Optica Spectrum Disorder (NMOSD)",
  "Neuroimmunology",
  "Epilepsy",
  "Dizziness and balance disorders",
];

const neuro = clinics.find((c) => c.key === "neuro")!;
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hours = `${neuro.days.map((d) => dayNames[d]).join(" and ")}, ${hhmm(neuro.open)}–${hhmm(neuro.close)}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": pageUrl,
      url: pageUrl,
      name: title,
      inLanguage: "en",
      mainEntity: {
        "@type": "Physician",
        "@id": physicianId,
        name,
        alternateName: physicianJsonLd.name,
        url: pageUrl,
        image: `${siteUrl}/doctor1.jpg`,
        jobTitle: "Neurologist",
        medicalSpecialty: "Neurologic",
        honorificSuffix: "MD, Ph.D.",
        sameAs: [orcidUrl, doctorUrl],
        knowsAbout: expertise,
        hasCredential: physicianJsonLd.hasCredential.map((c, i) => ({
          ...c,
          name: credentials[i].name,
          recognizedBy: { "@type": "CollegeOrUniversity", name: credentials[i].by },
        })),
        worksFor: { "@type": "MedicalClinic", name: "Sahawan Clinic", url: `${siteUrl}/en` },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/en` },
        { "@type": "ListItem", position: 2, name, item: pageUrl },
      ],
    },
    ...scholarlyArticles,
  ],
};

export default function EnglishDoctorProfile() {
  return (
    <div lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EnHeader thaiHref="/doctors/saharat-aungsumart" />

      <main id="main-content" tabIndex={-1}>
        <section className="hero small">
          <div className="container">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <ol>
                <li>
                  <Link href="/en">Home</Link>
                </li>
                <li aria-current="page">{name}</li>
              </ol>
            </nav>
            <div className="profile-grid">
              <div>
                <p className="eyebrow">Neurologist (internal medicine – neurology)</p>
                <h1 className="hero-title">{name}</h1>
                <p className="hero-text narrow">
                  Cares for patients with neurological symptoms such as headache, migraine,
                  dizziness, seizures, numbness and weakness, and for neurological conditions
                  that need continuous follow-up.
                </p>
                <p className="profile-hours">
                  Clinic at Sahawan Clinic: <strong>{hours}</strong>
                </p>
                <div className="hero-actions">
                  <LineLink
                    message="Hello, I would like to make an appointment with Dr. Saharat (neurology)."
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
                  alt={`${name}, neurologist`}
                  width={700}
                  height={900}
                  className="doctor-photo"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container cards two">
            <div className="card">
              <h2 className="profile-h2">Qualifications</h2>
              <ul className="profile-list">
                {credentials.map((c) => (
                  <li key={c.name}>
                    <strong>{c.name}</strong>
                    <span>{c.by}</span>
                  </li>
                ))}
              </ul>
              <p className="profile-note">
                Researcher identity:{" "}
                <a href={orcidUrl} target="_blank" rel="noreferrer">
                  ORCID 0000-0002-8183-348X
                </a>
              </p>
            </div>
            <div className="card">
              <h2 className="profile-h2">Areas of expertise</h2>
              <ul className="profile-list">
                {expertise.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <div className="section-head">
              <h2>Selected publications</h2>
              <p>Research related to the clinic&apos;s work (MS, NMOSD and neuroimmunology)</p>
            </div>
            <ul className="profile-pubs">
              {[...publications]
                .sort((a, b) => Number(b.year) - Number(a.year))
                .map((p) => (
                  <li key={p.title}>
                    <span className="profile-pub-year">{p.year}</span>
                    <span>
                      <strong>{p.title}</strong>
                      <span className="profile-pub-journal">{p.journal}</span>
                    </span>
                  </li>
                ))}
            </ul>
            <p className="profile-note">
              Full list on{" "}
              <a href={orcidUrl} target="_blank" rel="noreferrer">
                ORCID
              </a>
            </p>
          </div>
        </section>
      </main>

      <EnFooter thaiHref="/doctors/saharat-aungsumart" />
    </div>
  );
}
