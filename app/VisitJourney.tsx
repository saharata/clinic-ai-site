"use client";

import { usePlaying } from "./stickline/usePlaying";

// ขั้นตอนมาพบหมอ 5 ขั้น — ข้อมูลทุกขั้นมีอยู่แล้วในหน้าแรก (นัดหมาย / เตรียมตัว / ที่อยู่ / ติดตามผ่าน LINE)
// กดเล่น = ตัวเส้นเดินไปทีละขั้น · ภาพนิ่ง = ครบทั้ง 5 ขั้นพร้อมข้อความ สื่อความหมายเท่ากัน
const steps = [
  { icon: "pose_phone", title: "นัดหมาย", text: "ทัก LINE หรือโทร 065-480-8771 เพื่อจองเวลา", href: "#contact" },
  { icon: "prop_checklist", title: "เตรียมตัว", text: "นำวิดีโอตอนมีอาการ รายการยา และผลตรวจเก่ามาด้วย", href: "#prepare" },
  { icon: "prop_hospital", title: "มาที่คลินิก", text: "หมู่บ้านประชานิเวศน์ 3 นนทบุรี ตามเวลาที่นัด", href: "#location" },
  { icon: "pose_doctor", title: "พบแพทย์", text: "แพทย์ซักประวัติ ตรวจร่างกาย และอธิบายแนวทางดูแล", href: "#doctors" },
  { icon: "prop_phone", title: "ติดตามอาการ", text: "ติดตามอาการต่อเนื่องผ่าน LINE ของคลินิก", href: "#contact" },
];

export default function VisitJourney() {
  const { playing, button, label } = usePlaying();
  return (
    <div className="sl-anim vj" data-playing={playing}>
      <ol className="vj-steps">
        {steps.map((s, i) => (
          <li key={s.title} style={{ "--i": i } as React.CSSProperties}>
            <a href={s.href} className="vj-link">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/stickline/icons/${s.icon}.png`} alt="" width={72} height={72} />
              <span className="vj-num" aria-hidden="true">
                {i + 1}
              </span>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </a>
          </li>
        ))}
      </ol>
      <div className="vj-road" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="vj-walker" src="/stickline/icons/pose_walk.png" alt="" width={56} height={56} />
      </div>
      <div className="sl-controls">
        <button {...button}>
          <span aria-hidden="true">{playing ? "⏸" : "▶"}</span> {label}
        </button>
      </div>
    </div>
  );
}
