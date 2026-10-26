"use client";

import { useState } from "react";
import Link from "next/link";
import LineLink from "../LineLink";
import { symptoms } from "../symptoms/symptomsData";

// ไปห้องฉุกเฉิน หรือนัดพบแพทย์ — ใช้เฉพาะข้อความที่แพทย์เผยแพร่แล้ว ไม่มีเกณฑ์ใหม่
//   ข้อฉุกเฉิน: FAQ หน้าแรก (สโตรก) · redFlag หน้าลมชัก · red_flags ของแพ็ก EP01
//   ข้อควรพบแพทย์: redFlag ของแต่ละหน้าอาการ (symptomsData.ts)
// เครื่องมือนี้ไม่เคยบอกว่า "ไม่เป็นไร" — ผลที่เบาที่สุดคือ "ยังไม่พบจากรายการนี้ ถ้ากังวลปรึกษาแพทย์"
const emergency = [
  "แขนขาอ่อนแรงครึ่งซีก ปากเบี้ยว หรือพูดไม่ชัด ที่เกิดขึ้นเฉียบพลัน",
  "ชักหรือหมดสตินานเกินห้านาที ไม่ฟื้น หรือเกิดซ้ำติดกัน",
  "ชักครั้งแรก",
  "ล้มแล้วบาดเจ็บที่ศีรษะ",
  "เป็นลมขณะออกกำลังกาย หรือเป็นลมโดยไม่มีเรื่องนำเลย โดยเฉพาะคนที่มีโรคหัวใจ หรือมีคนในครอบครัวเสียชีวิตกะทันหันตั้งแต่อายุน้อย",
];

type Result = "er" | "doctor" | "none" | null;

export default function ErCheck() {
  const [checked, setChecked] = useState<boolean[]>(() => emergency.map(() => false));
  const [slug, setSlug] = useState<string | null>(null);
  const [result, setResult] = useState<Result>(null);
  const anyEmergency = checked.some(Boolean);
  const symptom = symptoms.find((s) => s.slug === slug);

  function toggle(i: number) {
    const next = checked.map((c, j) => (j === i ? !c : c));
    setChecked(next);
    setResult(next.some(Boolean) ? "er" : null);
  }

  return (
    <div className="sl-er">
      <fieldset className="sl-er-step">
        <legend>1. ตอนนี้มีอาการเหล่านี้ไหม (เลือกได้หลายข้อ)</legend>
        <ul>
          {emergency.map((e, i) => (
            <li key={e}>
              <label>
                <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} />
                <span>{e}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {!anyEmergency && (
        <fieldset className="sl-er-step">
          <legend>2. ถ้าไม่มีข้อไหนเลย อาการหลักคืออะไร</legend>
          <div className="sl-er-chips">
            {symptoms.map((s) => (
              <label key={s.slug} className={"sl-er-chip" + (slug === s.slug ? " on" : "")}>
                <input
                  type="radio"
                  name="sl-er-symptom"
                  value={s.slug}
                  checked={slug === s.slug}
                  onChange={() => {
                    setSlug(s.slug);
                    setResult(null);
                  }}
                />
                <span aria-hidden="true">{s.icon}</span> {s.topic}
              </label>
            ))}
          </div>
          {symptom && (
            <div className="sl-er-question">
              <p>{symptom.redFlag}</p>
              <p className="sl-er-ask">มีอย่างน้อยหนึ่งข้อในประโยคข้างบนไหม</p>
              <div className="sl-controls">
                <button type="button" className="btn btn-dark" onClick={() => setResult("doctor")}>
                  มี
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setResult("none")}>
                  ไม่มี
                </button>
              </div>
            </div>
          )}
        </fieldset>
      )}

      <div aria-live="polite" className="sl-er-result-wrap">
        {result === "er" && (
          <div className="sl-er-result er">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/stickline/icons/pose_phone.png" alt="" width={96} height={96} />
            <div>
              <p className="sl-er-headline">ไปห้องฉุกเฉิน หรือโทร 1669 ทันที</p>
              <p>ถ้ามีคนอยู่ด้วย ให้ช่วยจับเวลาตั้งแต่เริ่มมีอาการ</p>
              <a href="tel:1669" className="btn btn-call big">
                โทร 1669
              </a>
            </div>
          </div>
        )}
        {result === "doctor" && symptom && (
          <div className="sl-er-result doctor">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/stickline/icons/pose_doctor.png" alt="" width={96} height={96} />
            <div>
              <p className="sl-er-headline">ควรพบแพทย์</p>
              <p>ถ้าอาการรุนแรง เกิดเฉียบพลัน หรือแย่ลงเร็ว ไปห้องฉุกเฉินหรือโทร 1669</p>
              <div className="sl-controls">
                <LineLink message={`สวัสดี สนใจนัดตรวจคลินิกประสาท เรื่อง${symptom.topic}`} className="btn btn-line">
                  นัดตรวจผ่าน LINE
                </LineLink>
                <Link href={`/symptoms/${symptom.slug}`} className="btn btn-outline">
                  อ่านเรื่อง{symptom.topic}
                </Link>
              </div>
            </div>
          </div>
        )}
        {result === "none" && symptom && (
          <div className="sl-er-result none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/stickline/icons/pose_doctor.png" alt="" width={96} height={96} />
            <div>
              <p className="sl-er-headline">ยังไม่พบสัญญาณอันตรายจากรายการนี้</p>
              <p>รายการนี้ไม่ใช่การวินิจฉัย ถ้ายังกังวล อาการไม่ดีขึ้น หรือแย่ลง ปรึกษาแพทย์ได้</p>
              <div className="sl-controls">
                <Link href={`/symptoms/${symptom.slug}`} className="btn btn-outline">
                  อ่านเรื่อง{symptom.topic}
                </Link>
                <LineLink message={`สวัสดี อยากปรึกษาเรื่อง${symptom.topic}`} className="btn btn-line">
                  ปรึกษาผ่าน LINE
                </LineLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
