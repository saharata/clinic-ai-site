"use client";

import { usePlaying } from "./usePlaying";

// MS กับปลอกประสาท แบบ 3 มิติ — ใยประสาท 2 เส้นสร้างจากวงแหวน CSS ซ้อนกันบนแกน X (ไม่ใช้ไลบรารี)
// แถวบน = ปลอกประสาทปกติ สัญญาณวิ่งเร็ว · แถวล่าง = ปลอกประสาทเสียหาย 2 ช่วง สัญญาณช้าลงและสะดุด
// กดเล่น: ฉากหมุนช้า ๆ และสัญญาณวิ่ง · ไม่กดหรือตั้งลดภาพเคลื่อนไหว: ภาพนิ่งมุมเอียง อ่านได้ครบ
// ข้อความในคำบรรยายคือประโยคที่เผยแพร่แล้วใน FAQ หน้าแรก
const RINGS = 30;
const STEP = 20; // px ระหว่างวงแหวน
const SEGMENT = 5; // วงแหวนต่อปลอก 1 ช่วง
const GAP_AT = new Set([4, 9, 14, 19, 24]); // ตำแหน่งช่องว่างระหว่างปลอก (node of Ranvier)
const DAMAGED = new Set([2, 3]); // ปลอกช่วงที่เสียหายในเส้นล่าง

function Fiber({ damaged }: { damaged: boolean }) {
  return (
    <div className="nf-fiber">
      <div className="nf-axon" />
      {Array.from({ length: RINGS }, (_, i) => {
        const seg = Math.floor(i / SEGMENT);
        const node = GAP_AT.has(i);
        const lost = damaged && DAMAGED.has(seg);
        return (
          <i
            key={i}
            className={"nf-ring" + (node ? " node" : lost ? " lost" : "")}
            style={{ transform: `translateX(${i * STEP}px) rotateY(90deg)` }}
          />
        );
      })}
      <div className={"nf-signal" + (damaged ? " slow" : " fast")} />
    </div>
  );
}

export default function NerveFiber3D() {
  const { playing, button, label } = usePlaying();
  return (
    <figure className="sl-anim nf-fig" data-playing={playing}>
      <div className="nf-stage" role="img" aria-labelledby="nf-cap">
        <div className="nf-scene" aria-hidden="true">
          <div className="nf-row">
            <p className="nf-label">ปลอกประสาทปกติ สัญญาณส่งต่อได้เร็ว</p>
            <Fiber damaged={false} />
          </div>
          <div className="nf-row">
            <p className="nf-label">ปลอกประสาทถูกทำลาย สัญญาณช้าลงหรือสะดุด</p>
            <Fiber damaged />
          </div>
        </div>
      </div>
      <figcaption id="nf-cap">
        MS และ NMOSD เป็นกลุ่มโรคที่ระบบภูมิคุ้มกันทำลายปลอกประสาทในระบบประสาทส่วนกลาง ทำให้เกิดอาการ
        เช่น ตามัว ชา อ่อนแรง เดินเซ · ภาพบน: ปลอกประสาทปกติ สัญญาณส่งต่อได้เร็ว · ภาพล่าง:
        ปลอกประสาทถูกทำลาย สัญญาณช้าลงหรือสะดุด
      </figcaption>
      <div className="sl-controls">
        <button {...button}>
          <span aria-hidden="true">{playing ? "⏸" : "▶"}</span> {label} (3 มิติ)
        </button>
      </div>
    </figure>
  );
}
