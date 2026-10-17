// ข้อมูล นพ. สหรัฐ อังศุมาศ — แหล่งเดียวสำหรับ JSON-LD ในหน้าแรก และหน้าโปรไฟล์แพทย์
// ห้ามเพิ่มข้อมูลที่ไม่ได้มาจากแพทย์ (คุณวุฒิ ผลงาน ความเชี่ยวชาญ ต้องตรวจสอบได้)

export const siteUrl = "https://www.sahawanclinic.clinic";
export const doctorPath = "/doctors/saharat-aungsumart";
export const doctorUrl = `${siteUrl}${doctorPath}`;
export const physicianId = `${siteUrl}/#physician-saharat`;
export const orcidUrl = "https://orcid.org/0000-0002-8183-348X";

// E-E-A-T: ผูกคลินิกกับแพทย์ผู้เชี่ยวชาญ (Google/AI รู้ว่าใครดูแล + เชี่ยวชาญอะไร)
export const physicianJsonLd = {
  "@type": "Physician",
  "@id": physicianId,
  url: doctorUrl,
  name: "นพ. สหรัฐ อังศุมาศ",
  honorificPrefix: "นายแพทย์",
  honorificSuffix: "Ph.D. (Biochemistry), Ph.D. (Health Technology Assessment)",
  jobTitle: "ประสาทแพทย์ (Neurologist)",
  medicalSpecialty: "Neurologic",
  // ORCID: ยืนยันตัวตนนักวิจัย — Google/AI ตรวจสอบ author + publications ได้ (E-E-A-T แข็งสุด)
  sameAs: ["https://orcid.org/0000-0002-8183-348X"],
  identifier: {
    "@type": "PropertyValue",
    propertyID: "ORCID",
    value: "0000-0002-8183-348X",
    url: "https://orcid.org/0000-0002-8183-348X",
  },
  knowsAbout: [
    "Functional Neurological Disorder (FND)",
    "ไมเกรนและอาการปวดศีรษะ",
    "Multiple Sclerosis (MS) โรคปลอกประสาทเสื่อมแข็ง",
    "Neuromyelitis Optica Spectrum Disorder (NMOSD)",
    "Neuroimmunology",
    "โรคลมชัก",
    "เวียนศีรษะและความผิดปกติของการทรงตัว",
  ],
  // E-E-A-T: วุฒิการศึกษาจริง (MD เกียรตินิยม + PhD 2 ใบ) — จุดแข็งที่คลินิกทั่วไปไม่มี
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: "MD",
      name: "แพทยศาสตรบัณฑิต (เกียรตินิยม) — Doctor of Medicine, first-class honors",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "มหาวิทยาลัยมหิดล (Mahidol University)" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: "PhD",
      name: "Ph.D. in Biochemistry",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "มหาวิทยาลัยมหิดล (Mahidol University)" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      educationalLevel: "PhD",
      name: "Ph.D. in Health Technology Assessment",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "มหาวิทยาลัยมหิดล (Mahidol University)" },
    },
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "คณะแพทยศาสตร์วชิรพยาบาล มหาวิทยาลัยมหิดล" },
    { "@type": "CollegeOrUniversity", name: "มหาวิทยาลัยมหิดล (Mahidol University)" },
  ],
};

// ผลงานวิชาการตีพิมพ์นานาชาติ (เลือกที่ตรงสาขาคลินิก — MS / NMOSD / neuroimmunology)
// E-E-A-T "Expertise": หลักฐานความเชี่ยวชาญจริง ผูก author กับ Physician @id
export const publications = [
  {
    title: "Use of disease-modifying therapy to prevent disability progression in multiple sclerosis in Thailand",
    journal: "Journal of the Medical Association of Thailand",
    year: "2023",
  },
  {
    title: "Prevalence and predictive factors of painful tonic spasm in neuromyelitis optica spectrum disorder (NMOSD)",
    journal: "Journal of the Medical Association of Thailand",
    year: "2020",
  },
  {
    title: "Abnormal level of consciousness predicts outcomes of patients with anti-NMDA receptor encephalitis",
    journal: "Journal of Clinical Neuroscience",
    year: "2019",
  },
  {
    title: "Pilot study of GPO cannabis extract for spasticity in multiple sclerosis in Thailand",
    journal: "Journal of the Medical Association of Thailand",
    year: "2021",
  },
];

// ScholarlyArticle ไม่มี @context — ใช้ใน @graph ของหน้าโปรไฟล์
export const scholarlyArticles = publications.map((p) => ({
  "@type": "ScholarlyArticle",
  headline: p.title,
  isPartOf: { "@type": "Periodical", name: p.journal },
  datePublished: p.year,
  author: { "@id": physicianId },
}));

// แบบมี @context — ใช้เป็น <script> แยกทีละชิ้นในหน้าแรก
export const publicationsJsonLd = scholarlyArticles.map((a) => ({
  "@context": "https://schema.org",
  ...a,
}));
